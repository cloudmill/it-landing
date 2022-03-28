console.log("page start");

/*
  tabs components

  data-tabs - id компонента (распространяется на все состовляющие)
  data-tabs-tab - индекс tab'a (для связи с iframe'ом)
  data-tabs-iframe -  индекс iframe'a (для связи с tab'ом)
*/
window.addEventListener("DOMContentLoaded", () => {
  const allTabs = document.querySelectorAll("[data-tabs-root]");

  allTabs.forEach((tabs) => {
    // init
    const tabsId = tabs.dataset.tabs;

    const allTab = document.querySelectorAll(
      `[data-tabs="${tabsId}"][data-tabs-tab]`
    );
    const allIframe = document.querySelectorAll(
      `[data-tabs="${tabsId}"][data-tabs-iframe]`
    );

    const state = {
      index: null,
    };

    const updateTabs = (index) => {
      if (index !== state.index) {
        console.log("update");

        if (state.index) {
          console.log("prev");

          const prevIndex = state.index;

          const prevTab = Array.from(allTab).find(
            (tab) => tab.dataset.tabsTab === prevIndex
          );
          const prevIframe = Array.from(allIframe).find(
            (iframe) => iframe.dataset.tabsIframe === prevIndex
          );

          prevTab.classList.remove("tabs__tab--active");
          prevIframe.classList.remove("tabs__iframe--active");
        }

        console.log("next");

        const nextIndex = index;

        const nextTab = Array.from(allTab).find(
          (tab) => tab.dataset.tabsTab === nextIndex
        );
        const nextIframe = Array.from(allIframe).find(
          (iframe) => iframe.dataset.tabsIframe === nextIndex
        );

        nextTab.classList.add("tabs__tab--active");
        nextIframe.classList.add("tabs__iframe--active");

        state.index = nextIndex;
      }
    };

    updateTabs("0");

    // events
    allTab.forEach((tab) =>
      tab.addEventListener("click", () => updateTabs(tab.dataset.tabsTab))
    );
  });
});
