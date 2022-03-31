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

// logic (legacy)
const priceData = [
  {
    total: 1200,
    arr: [1, 5],
  },
  {
    total: 1120,
    arr: [6, 10],
  },
  {
    total: 1020,
    arr: [11, 20],
  },
  {
    total: 890,
    arr: [21, 35],
  },
  {
    total: 850,
    arr: [36, 50],
  },
];

var result2 = document.getElementById("result2");

$("#type_design2").ionRangeSlider({
  min: 1,
  max: 50,
  from: 1,
  step: 1,
  grid: false,
  onChange: function (data) {
    myCalc();
  },
});

$("#Combobox4").ionRangeSlider({
  min: 1,
  max: 100,
  step: 1,
  from: 1,
  grid: false,
});

function myCalc() {
  let result = 0;
  var type_instance = $("#type_design2").data("ionRangeSlider");
  let from = parseInt(type_instance.result.from);
  for (var i = 0; i < priceData.length; i++) {
    let arr = priceData[i].arr;
    if (arr[0] <= from && arr[1] >= from) {
      result = priceData[i].total;
    }
  }
  let price = result * from;
  $("#result2").text(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
}

myCalc();

// communication
onMessage("FORM_CALC_DATA", () => {
  const data = {};

  $("[data-type=get-field]").each(function () {
    let field = $(this).data("field"),
      val = $(this).val();

    data[field] = val;
  });
});
