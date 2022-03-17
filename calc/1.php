<?php
function ValidateEmail($email)
{
   $pattern = '/^([0-9a-z]([-.\w]*[0-9a-z])*@(([0-9a-z])+([-\w]*[0-9a-z])*\.)+[a-z]{2,6})$/i';
   return preg_match($pattern, $email);
}
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['formid']) && $_POST['formid'] == 'form3')
{
   $mailto = 'draganira@yandex.ru';
   $mailfrom = isset($_POST['email']) ? $_POST['email'] : $mailto;
   $subject = 'Landing Page - LEAD!!!';
   $message = '';
   $success_url = '#';
   $error_url = '';
   $error = '';
   $eol = "\n";
   $boundary = md5(uniqid(time()));
   $header  = 'From: '.$mailfrom.$eol;
   $header .= 'Reply-To: '.$mailfrom.$eol;
   $header .= 'MIME-Version: 1.0'.$eol;
   $header .= 'Content-Type: multipart/mixed; boundary="'.$boundary.'"'.$eol;
   $header .= 'X-Mailer: PHP v'.phpversion().$eol;
   if (!ValidateEmail($mailfrom))
   {
      $error .= "The specified email address is invalid!\n<br>";
   }
   if (!empty($error))
   {
      $errorcode = file_get_contents($error_url);
      $replace = "##error##";
      $errorcode = str_replace($replace, $error, $errorcode);
      echo $errorcode;
      exit;
   }
   $internalfields = array ("submit", "reset", "send", "filesize", "formid", "captcha_code", "recaptcha_challenge_field", "recaptcha_response_field", "g-recaptcha-response");
   $message .= $eol;
   $message .= "IP Address : ";
   $message .= $_SERVER['REMOTE_ADDR'];
   $message .= $eol;
   $logdata = '';
   foreach ($_POST as $key => $value)
   {
      if (!in_array(strtolower($key), $internalfields))
      {
         if (!is_array($value))
         {
            $message .= ucwords(str_replace("_", " ", $key)) . " : " . $value . $eol;
         }
         else
         {
            $message .= ucwords(str_replace("_", " ", $key)) . " : " . implode(",", $value) . $eol;
         }
      }
   }
   $body  = 'This is a multi-part message in MIME format.'.$eol.$eol;
   $body .= '--'.$boundary.$eol;
   $body .= 'Content-Type: text/plain; charset=UTF-8'.$eol;
   $body .= 'Content-Transfer-Encoding: 8bit'.$eol;
   $body .= $eol.stripslashes($message).$eol;
   if (!empty($_FILES))
   {
       foreach ($_FILES as $key => $value)
       {
          if ($_FILES[$key]['error'] == 0)
          {
             $body .= '--'.$boundary.$eol;
             $body .= 'Content-Type: '.$_FILES[$key]['type'].'; name='.$_FILES[$key]['name'].$eol;
             $body .= 'Content-Transfer-Encoding: base64'.$eol;
             $body .= 'Content-Disposition: attachment; filename='.$_FILES[$key]['name'].$eol;
             $body .= $eol.chunk_split(base64_encode(file_get_contents($_FILES[$key]['tmp_name']))).$eol;
          }
      }
   }
   $body .= '--'.$boundary.'--'.$eol;
   if ($mailto != '')
   {
      mail($mailto, $subject, $body, $header);
   }
   header('Location: '.$success_url);
   exit;
}
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Безымянная страница</title>
<meta name="generator" content="WYSIWYG Web Builder 14 - http://www.wysiwygwebbuilder.com">
<link href="1.css" rel="stylesheet">
<script src="jquery-1.7.2.min.js"></script>
<link rel="stylesheet" href="magnificpopup/magnific-popup.css">
<script src="magnificpopup/jquery.magnific-popup.min.js"></script>
<script src="wwb14.min.js"></script>
<script>   
   function displaylightbox(url, options)
   {
      options.items = { src: url };
      options.type = 'iframe';
      $.magnificPopup.open(options);
   }
</script>
<script>   
   $(document).ready(function()
   {
      $("#Checkbox1").change(function()
      {
         if ($('#Checkbox1').is(':checked'))
         {
            ShowObject('wb_Shape2', 1);
         }
         if (!$('#Checkbox1').is(':checked'))
         {
            ShowObject('wb_Shape2', 0);
         }
      });
      $("#Checkbox1").trigger('change');
   });
</script>
<title>Калькулятор на JavaScript</title>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1251"/>
        <script>   
          /*
           * Функция подсчета стоимости услуг на создания дизайна сайта
           */
           function calc() {
               
               
   
               var Checkbox2 = document.getElementById("Checkbox2");
               var Checkbox3 = document.getElementById("Checkbox3");
               var Checkbox5 = document.getElementById("Checkbox5");
               var Checkbox6 = document.getElementById("Checkbox6");
               price += parseInt(type_design.options[type_design.selectedIndex].value);
               //получаем ссылку на элемент span, в него будем писать стоимость дизайна
               var result = document.getElementById("result"); 
    
               var price = 0;
               
   
               price += (Checkbox2.checked == true) ? parseInt(Checkbox2.value) : 0;
               price += (Checkbox3.checked == true) ? parseInt(Checkbox3.value) : 0;
               price += (Checkbox5.checked == true) ? parseInt(Checkbox5.value) : 0;
               price += (Checkbox6.checked == true) ? parseInt(Checkbox6.value) : 0;
               price += parseInt(type_design.options[type_design.selectedIndex].value);
               
    
               result.innerHTML = price;
           }
    
</script>
<title>Калькулятор на JavaScript</title>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1251"/>
        <script>   
          /*
           * Функция подсчета стоимости услуг на создания дизайна сайта
           */
           function calc1() {
               
               
   
               var Checkbox13 = document.getElementById("Checkbox13");
               var Checkbox12 = document.getElementById("Checkbox12");
               price += parseInt(type_design2.options[type_design2.selectedIndex].value);
              
               //получаем ссылку на элемент span, в него будем писать стоимость дизайна
               var result2 = document.getElementById("result2"); 
    
               var price = 0;
               
   
               price += (Checkbox12.checked == true) ? parseInt(Checkbox12.value) : 0;
               price += (Checkbox13.checked == true) ? parseInt(Checkbox13.value) : 0;
               price += parseInt(type_design2.options[type_design2.selectedIndex].value);
               
    
               result2.innerHTML = price;
           }
    
</script>
</head>
<body>
   <div id="wb_Shape6" style="position:absolute;left:1px;top:0px;width:802px;height:629px;z-index:23;">
      <img src="images/img0001.png" id="Shape6" alt="" style="width:802px;height:629px;">
   </div>
   <div id="wb_Form3" style="position:absolute;left:1px;top:0px;width:776px;height:672px;z-index:24;">
      <form name="Form3" method="post" action="<?php echo basename(__FILE__); ?>" enctype="multipart/form-data" accept-charset="UTF-8" id="Form3">
         <input type="hidden" name="formid" value="form3">
         <input type="hidden" name="Обсудить заказ(Стихи)" value="">
         <div id="wb_Image56" style="position:absolute;left:280px;top:543px;width:231px;height:40px;z-index:0;">
            <img src="images/3k1.png" id="Image56" alt=""></div>
         <div id="wb_Text76" style="position:absolute;left:282px;top:549px;width:229px;height:22px;text-align:center;z-index:1;">
            <span style="color:#FFFFFF;">Заказать</span></div>
         <input type="text" id="Editbox9" style="position:absolute;left:37px;top:543px;width:224px;height:36px;z-index:2;" name="Tel." value="" spellcheck="false" required pattern="[ \t\r\n\f0-9-+()-;]*$" placeholder="&#1042;&#1074;&#1077;&#1076;&#1080;&#1090;&#1077; &#1074;&#1072;&#1096; &#1090;&#1077;&#1083;&#1077;&#1092;&#1086;&#1085;">
         <div id="wb_Text77" style="position:absolute;left:36px;top:199px;width:399px;height:19px;z-index:3;">
            <span style="color:#000000;">Количество офисов</span></div>
         <div id="wb_Text78" style="position:absolute;left:36px;top:133px;width:334px;height:19px;z-index:4;">
            <span style="color:#000000;">Количество серверов</span></div>
         <div id="wb_Text79" style="position:absolute;left:36px;top:67px;width:325px;height:19px;z-index:5;">
            <span style="color:#000000;">Количество рабочих мест</span></div>
         <div id="wb_Checkbox12" style="position:absolute;left:111px;top:408px;width:20px;height:20px;z-index:6;">
            <input type="checkbox" id="Checkbox12" name="Количество серверов" value="выбор" style="position:absolute;left:0;top:0;" onchange="calc1()"><label for="Checkbox12"></label></div>
         <div id="wb_Checkbox13" style="position:absolute;left:74px;top:408px;width:20px;height:20px;z-index:7;">
            <input type="checkbox" id="Checkbox13" name="Количество серверов" value="выбор" style="position:absolute;left:0;top:0;" onchange="calc1()"><label for="Checkbox13"></label></div>
         <div id="wb_Checkbox14" style="position:absolute;left:35px;top:408px;width:20px;height:20px;z-index:8;">
            <input type="checkbox" id="Checkbox14" name="Количество рабочих мест" value="выбор" checked style="position:absolute;left:0;top:0;"><label for="Checkbox14"></label></div>
         <div id="Html5" style="position:absolute;left:255px;top:52px;width:329px;height:34px;z-index:9">
            <select onchange="calc1()" id="type_design2" name="Количество рабочих мест">
               <option value="0">0</option>
               <option value="1200">1</option>
               <option value="2400">2</option>
               <option value="3600">3</option>
               <option value="4800">4</option>
               <option value="6000">5</option>
               <option value="6720">6</option>
               <option value="7840">7</option>
               <option value="8960">8</option>
               <option value="10080">9</option>
               <option value="11200">10</option>
               <option value="11220">11</option>
               <option value="12240">12</option>
               <option value="13260">13</option>
               <option value="14280">14</option>
               <option value="15300">15</option>
               <option value="16320">16</option>
               <option value="17340">17</option>
               <option value="18360">18</option>
               <option value="19380">19</option>
               <option value="20400">20</option>
               <option value="18690">21</option>
               <option value="19580">22</option>
               <option value="20470">23</option>
               <option value="21360">24</option>
               <option value="22250">25</option>
               <option value="23140">26</option>
               <option value="24030">27</option>
               <option value="24920">28</option>
               <option value="25810">29</option>
               <option value="26700">30</option>
               <option value="27590">31</option>
               <option value="28480">32</option>
               <option value="29370">33</option>
               <option value="30260">34</option>
               <option value="31150">35</option>
               <option value="30600">36</option>
               <option value="31450">37</option>
               <option value="32300">38</option>
               <option value="33150">39</option>
               <option value="34000">40</option>
               <option value="34850">41</option>
               <option value="35700">42</option>
               <option value="36550">43</option>
               <option value="37400">44</option>
               <option value="38250">45</option>
               <option value="39100">46</option>
               <option value="39950">47</option>
               <option value="40800">48</option>
               <option value="41650">49</option>
               <option value="42500">50</option>
           
           
            </select><br/>
        
        
       
       
         </div>
         <div id="Html3" style="position:absolute;left:38px;top:453px;width:473px;height:47px;z-index:10">
            <div><span style="color:#000000;font-family:'Roboto';font-size:22px;"> Стоимость  </span><span id="result2" style="color:#2D80C4;font-family:Roboto;font-size:37px;">0</span> <span style="color:#2D80C4;font-family:'Roboto';font-size:22px;"> руб. </span></div></div>
         <input type="submit" id="Button3" name="" value="Оставить заявку" class="style1" style="position:absolute;left:282px;top:543px;width:229px;height:40px;z-index:11;">
         <div id="wb_Checkbox1" style="position:absolute;left:599px;top:69px;width:20px;height:20px;z-index:12;">
            <input type="checkbox" id="Checkbox1" name="болеее 51" value="" style="position:absolute;left:0;top:0;" onchange="calc1()"><label for="Checkbox1"></label></div>
         <div id="wb_Shape2" style="position:absolute;left:37px;top:512px;width:474px;height:93px;visibility:hidden;z-index:13;">
            <a href="javascript:displaylightbox('./index.php',{})" target="_self"><img src="images/img0003.png" id="Shape2" alt="" style="width:474px;height:93px;"></a></div>
         <div id="wb_Shape3" style="position:absolute;left:24px;top:403px;width:179px;height:37px;z-index:14;">
            <img src="images/img0004.png" id="Shape3" alt="" style="width:179px;height:37px;"></div>
         <div id="wb_Text4" style="position:absolute;left:36px;top:419px;width:514px;height:18px;z-index:15;">
            <span style="color:#000000;font-family:Arial;font-size:15px;">Аудит состояния техники и разработка IT-структуры - <strong>&#1041;&#1045;&#1057;&#1055;&#1051;&#1040;&#1058;&#1053;&#1054;</strong></span></div>
         <div id="wb_Text3" style="position:absolute;left:36px;top:265px;width:348px;height:19px;z-index:16;">
            <span style="color:#000000;font-family:Arial;font-size:17px;">&#1054;&#1073;&#1083;&#1072;&#1095;&#1085;&#1099;&#1077; &#1089;&#1077;&#1088;&#1074;&#1080;&#1089;&#1099;&nbsp;&nbsp; </span></div>
         <div id="wb_Text6" style="position:absolute;left:36px;top:329px;width:438px;height:38px;z-index:17;">
            <span style="color:#000000;font-family:Arial;font-size:17px;">&#1054;&#1088;&#1075;&#1090;&#1077;&#1093;&#1085;&#1080;&#1082;&#1072; &#1080; &#1089;&#1077;&#1090;&#1077;&#1074;&#1086;&#1077;<br>&#1086;&#1073;&#1086;&#1088;&#1091;&#1076;&#1086;&#1074;&#1072;&#1085;&#1080;&#1077;</span></div>
         <div id="Html1" style="position:absolute;left:255px;top:112px;width:150px;height:45px;z-index:18">
            <input type="text" id="Combobox3" class="js-range-slider other_slider irs-hidden-input" name="Количество серверов" value="" tabindex="-1" readonly>
            <span class="irs-bar irs-bar--single" style="left:0px; width:50%;"></span></div>
         <div id="Html2" style="position:absolute;left:255px;top:183px;width:150px;height:45px;z-index:19">
            <input type="text" id="Combobox4" class="js-range-slider other_slider irs-hidden-input" name="Количество офисов" value="" tabindex="-1" readonly></div>
         <div id="Html4" style="position:absolute;left:255px;top:254px;width:150px;height:45px;z-index:20">
            <input type="text" id="Combobox5" class="js-range-slider other_slider irs-hidden-input" name="Облачные сервисы" value="" tabindex="-1" readonly></div>
         <div id="Html6" style="position:absolute;left:255px;top:326px;width:150px;height:45px;z-index:21">
            <input type="text" id="Combobox6" class="js-range-slider other_slider irs-hidden-input" name="Оргтехника и сетевое оборудование" value="" tabindex="-1" readonly></div>
         <div id="wb_Text2" style="position:absolute;left:628px;top:67px;width:124px;height:19px;z-index:22;">
            <span style="color:#000000;font-family:Arial;font-size:17px;">более 51</span></div>
      </form>
   </div>
<!--Plugin CSS file with desired skin-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/css/ion.rangeSlider.min.css"/>
    
    <!--jQuery-->
   <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    
    <!--Plugin JavaScript file-->
   <script src="https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/js/ion.rangeSlider.min.js"></script>
   <script>   
       function calc1() {
           // var Checkbox13 = document.getElementById("Checkbox13");
           // var Checkbox12 = document.getElementById("Checkbox12");
           // price += parseInt(type_design2.options[type_design2.selectedIndex].value);
           //получаем ссылку на элемент span, в него будем писать стоимость дизайна
           // var result2 = document.getElementById("result2");
           // var price = 0;
           // price += (Checkbox12.checked == true) ? parseInt(Checkbox12.value) : 0;
           // price += (Checkbox13.checked == true) ? parseInt(Checkbox13.value) : 0;
           // price += parseInt(type_design2.options[type_design2.selectedIndex].value);
   
           // result2.innerHTML = price;
       }
       $(document).ready(function() {
           var result2 = document.getElementById("result2");
           $('#type_design2').ionRangeSlider({
               min: 0,
               max: 50,
               step:1,
               grid: false,
               onChange: function (data) {
                   result2.innerHTML =data.from;
               },
           });
   
           $('.other_slider').ionRangeSlider({
               min: 1,
               max: 3,
               step:1,
               grid: false,
               onChange: function (data) {
               },
           });
       })
   </script></body>
</html>