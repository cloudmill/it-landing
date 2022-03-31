// cross window communication
const onMessage = (type, callback) =>
  window.addEventListener("message", (event) => {
    const message = event.data;

    console.log("on", message);

    if (message.type === type) {
      callback(message.data);
    }
  });
const sendMessage = (target, type, data) => {
  const message = {
    type,
    data,
  };

  console.log("send", message);

  target.postMessage(message);
};

window.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("Button1");
  const buttonDecoration = document.getElementById("wb_Shape1");

  onMessage("PAGE_FORM_CHECKED", (checked) => {
    button.disabled = checked;
    buttonDecoration.style.opacity = checked ? 0.5 : 1;
  });
});

$(document).ready(function () {
  async function send(data) {
    try {
      console.log("values", data);

      let carabi = new Carabi("https://veneta-api.cara.bi/", "veneta");
      await carabi.query("CBA_CREATE_LEAD2", data, 1);
      alert("Успешно отпралено");
    } catch (e) {
      alert("Ошибка: " + e.message);
    }
  }

  function getCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  $("#Form1").submit(function (event) {
    event.preventDefault();
    var isValid = $.validate.form(this);
    if (isValid) {
      $('[name="Количество рабочих мест"]').val(Cookies.get("type_design2"));
      //Количество серверов Combobox2
      $('[name="Количество серверов"]').val(Cookies.get("Combobox2"));
      $('[name="Виртуальные машины"]').val(Cookies.get("Combobox3"));

      //Оргтехника и сетевое оборудование Combobox4
      $('[name="Оргтехника и сетевое оборудование"]').val(
        Cookies.get("Combobox4")
      );
      $('[name="более 50"]').val(Cookies.get("Checkbox1"));

      let data = {},
        carabiData = {
          roistat_visit: getCookie("roistat_visit"),
          web_source: window.location.hostname,
        };

      $(this)
        .find("[data-field]")
        .each(function () {
          let field = $(this).data("field"),
            val = $(this).val();

          data[field] = val;

          if ($(this).attr("carabi") !== undefined) {
            carabiData[field] = val;
          }
        });

      const activeCalculatorWindow = window.parent.document.querySelector(
        ".tabs__content--active"
      ).contentWindow;
      onMessage("CALCULATOR_FORM_DATA", (dataFromCalculator) => {
        data = { ...data, ...dataFromCalculator };

        console.log(data);

        send(carabiData);

        $.ajax({
          type: "POST",
          url: "/include/ajax/forms/3.php",
          dataType: "json",
          data: data,
          success: function (r) {
            if (r.success) {
              $("#Layer3").hide();
              $(".form-response").show();
            } else {
              alert(r.message);
            }
          },
        });
      });
      sendMessage(activeCalculatorWindow, "FORM_CALCULATOR_DATA");
    } else {
      console.log("nonValid");
    }
  });
  $("#phone").validate({
    required: true,
    type: "text",
    length_min: "16",
    length_max: "16",
    color_text: "#FFFFFF",
    color_hint: "#FFFFFF",
    color_error: "#FFE507",
    opacity: 0.0,
    color_border: "#FFFFFF",
    nohint: true,
    font_family: "Arial",
    font_size: "13px",
    position: "topleft",
    offsetx: 0,
    offsety: 0,
    effect: "fade",
    error_text: "Введите верный номер телефона!",
  });
});
