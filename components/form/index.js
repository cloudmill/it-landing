console.log("form");

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
