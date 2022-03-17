class Carabi {
  constructor (address, project) {
    console.log('carabi constructor', address, project)
    this.address = address
    this.project = project
    this.token = null
    this.authorized = false
  }

  // получить токен (автосоздание гостевого)
  async getToken () {
    if (this.token === null) {
      if (this.project === null) {
        throw ({ 'SymbCode': 'NO_PROJECT', 'message': 'Carabi project not set' })
      }
      console.log('getToken', this)
      let register = await this.serverHttp('authorize/register', {
        'project': this.project
      })
      this.token = register.token
    }
    return this.token
  }

  // Уничтожить токен
  unregister () {
    this.authorized = false
    if (this.token === null) return
    try {
      this.serverHttp('authorize/unregister', {
        'token': this.token
      })
    } catch (e) {}
    this.token = null
  }

  // Информация о токене
  async tokenInfo () {
    return this.serverHttp('admin/validateUserToken', {
      'token': this.token
    })
  }

  // Запрос
  async queryRaw (queryName, params = {}, count=1, offset=0, options={}) {
    await this.getToken();
    console.log(params, 'queryRaw params after get token')
    let runParams = {
      'token': this.token,
      'queryName': queryName,
      'count': count,
      'params': params
    };
    if (offset !== undefined) {
      runParams.start_count = offset
    }
    if (options.modId !== undefined) {
      runParams.mod_id = options.modId
    }
    try {
      console.log(runParams, 1);
      let response = await this.serverHttp('query/run', runParams)
      return response.OutParams
    } catch (e) {
      e.query = queryName
      e.queryParams = params
      console.error('Query error',e)
      throw e
    }
  }

  // Запрос (обработка вывода)
  async query (queryName, params, count, offset, options) {
    let result = await this.queryRaw(queryName, params, count, offset, options)
    let newResult = {}
    for (let i in result) {
      if (result[i].type === 'CURSOR') {
        let cursor = result[i].value
        let newCursor = []
        for (let j in cursor.list) {
          let newRow = {}
          for (let k in cursor.list[j]) {
            //Парсим цифры
            if ((cursor.list[j][k] !== null) && (cursor.columns[k][1] === "NUMBER")) {
              cursor.list[j][k] = parseFloat(cursor.list[j][k])
            }
            newRow[cursor.columns[k][0]] = cursor.list[j][k]
          }
          newCursor.push(newRow)
        }
        result[i].value = newCursor
      }
      newResult[result[i].paramName] = result[i].value
    }
    console.log('query', queryName, count, offset, params, newResult)
    return newResult
  }

  // Запрос с единственным результатом
  async select (queryName, params, count, offset, options) {
    let OutParams = await this.query(queryName, params, count, offset, options)
    let result = null
    for (var i in OutParams) {
      result = OutParams[i]
      break
    }
    return result
  }

  // Запрос с таблицой (только первый ряд)
  async selectRow (queryName, params, options) {
    let values = await this.select(queryName, params, 1, 0, options)
    if (Array.isArray(values) && values.length > 0) {
      return values[0]
    } else {
      return null
    }
  }

  async serverHttp (url, params) {
    console.log('serverHttp', this.address, url, params)

    let response = await fetch(this.address + url, {
      method: 'POST',
      body: JSON.stringify(params)
    });
    let result = await response.json()
    // console.log('serverHttp result', result)
    if (result.Message && !result.message) {
      result.message = result.Message
      result.Message = undefined
    }
    if (typeof result.SymbCode !== 'string') {
      result.SymbCode = 'OK'
    }
    if (result.SymbCode === 'INVALID_TOKEN') {
      this.unregister()
    }
    if (result.SymbCode !== 'OK') {
      throw (result)
    }
    return result
  }

  dateToIso(date) {
    if (date === null) return null;
    let re = new RegExp("^([0-9]{2})\.([0-9]{2})\.([0-9]{4})([\^\s]([0-9]{2}:[0-9]{2}:[0-9]{2}))?$");
    let d = date.match(re);
    if (!d) return null;
    let result = d[3]+'-'+d[2]+'-'+d[1];
    if ((d.length > 4) && (d[5])) {
      result += 'T'+d[5];
    } else {
      result += 'T00:00:00';
    }
    return result
  }

  /* sha256(str) {
      let shaObj = new jsSHA("SHA-256", "BYTES");
      shaObj.update(str);
      return shaObj.getHash("HEX");
  } */
}
