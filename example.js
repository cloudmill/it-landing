// message structure: { type, data }
// type structure: from_to_what

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

// ###

const getData = () =>
  new Promise((resolve) => {
    const TYPE = {
      REQUEST: "A_INDEX_DATA",
      RESPONSE: "INDEX_A_DATA",
    };

    const index = window.parent;

    onMessage(TYPE.RESPONSE, resolve);
    sendMessage(index, TYPE.REQUEST);
  });

window.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button");

  button.addEventListener("click", () => {
    getData().then(console.log).catch(console.log);
  });
});
