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

/*
  range in calculator

  data-range .range
    data-range-slider [data-range-calc, data-range-formula] .range__slider
    data-range-field  .range__field
*/
window.addEventListener("DOMContentLoaded", () => {
  const result = document.getElementById("result2");
  let formula = null;
  const calculate = (value) => {
    let multiplier = 0;

    for (let i = 0; i < formula.length; i++) {
      const arr = formula[i].arr;

      if (arr[0] <= value && arr[1] >= value) {
        multiplier = formula[i].total;
      }
    }

    const price = multiplier * value;

    $(result).text(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
  };

  const allRange = document.querySelectorAll("[data-range]");
  allRange.forEach((range) => {
    const slider = range.querySelector("[data-range-slider]");
    const field = range.querySelector("[data-range-field]");

    const isCalc = slider.hasAttribute("data-range-calc");

    if (isCalc) {
      formula = JSON.parse(slider.dataset.rangeFormula);
    }

    const update = ({ from }) => {
      field.value = from;
      isCalc && calculate(from);
    };

    $(slider).ionRangeSlider({
      onChange: update,
      onStart: update,
    });

    const ionRangeSliderInstance = $(slider).data("ionRangeSlider");

    field.addEventListener("input", (e) => {
      ionRangeSliderInstance.update({
        from: +e.target.value,
      });

      calculate(ionRangeSliderInstance.result.from);
    });
  });
});
