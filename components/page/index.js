console.log("page");

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

// page
const tabs = () => {
  const TAB_ACTIVE_CLASS = "tabs__tab--active";
  const CONTENT_ACTIVE_CLASS = "tabs__content--active";

  // form
  const formIframe = document.querySelector("[data-form]");
  const formWindow = formIframe.contentWindow;

  // checkbox & button
  const checkbox = document.getElementById("Checkbox1");
  const button = document.getElementById("wb_Shape22");
  const checkboxState = {};

  window.addEventListener("click", (e) => {
    const tab = e.target.closest("[data-tabs-tab]");

    if (tab) {
      const id = tab.dataset.tabsTab;

      // tab & content
      const content = document.querySelector(`[data-tabs-content="${id}"]`);
      console.log(id, content);

      const allTab = document.querySelectorAll("[data-tabs-tab]");
      const allContent = document.querySelectorAll("[data-tabs-content]");

      allTab.forEach((tab) => tab.classList.remove(TAB_ACTIVE_CLASS));
      allContent.forEach((content) =>
        content.classList.remove(CONTENT_ACTIVE_CLASS)
      );

      tab.classList.add(TAB_ACTIVE_CLASS);
      content.classList.add(CONTENT_ACTIVE_CLASS);

      // chekcbox & button
      checkbox.checked = !!checkboxState[id];
      button.style.visibility = !!checkboxState[id] ? "visible" : "hidden";

      sendMessage(formWindow, "PAGE_FORM_CHECKED", !!checkboxState[id]);
    }
  });

  checkbox.addEventListener("change", (e) => {
    const checked = e.target.checked;

    const activeTab = document.querySelector(`.${TAB_ACTIVE_CLASS}`);
    const currentId = activeTab.dataset.tabsTab;

    checkboxState[currentId] = checked;

    button.style.visibility = checked ? "visible" : "hidden";

    sendMessage(formWindow, "PAGE_FORM_CHECKED", checked);
  });
};

window.addEventListener("DOMContentLoaded", () => {
  tabs();
});
