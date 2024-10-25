let startTime = 0;
let activeTabId = null;

chrome.tabs.onActivated.addListener((activeInfo) => {
  if (activeTabId !== null) {
    const timeSpent = Date.now() - startTime;
    chrome.storage.local.get(["timeData", "url"], (result) => {
      const timeData = result.timeData || {};
      const previousUrl = result.url;
      if (previousUrl) {
        const domain = new URL(previousUrl).hostname;
        timeData[domain] = (timeData[domain] || 0) + timeSpent;
        chrome.storage.local.set({ timeData });
      }
    });
  }

  chrome.tabs.get(activeInfo.tabId, (tab) => {
    startTime = Date.now();
    activeTabId = activeInfo.tabId;
    if (tab.url) {
      chrome.storage.local.set({ url: tab.url });
    }
  });
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === activeTabId) {
    const timeSpent = Date.now() - startTime;
    chrome.storage.local.get(["timeData", "url"], (result) => {
      const timeData = result.timeData || {};
      const previousUrl = result.url;
      if (previousUrl) {
        const domain = new URL(previousUrl).hostname;
        timeData[domain] = (timeData[domain] || 0) + timeSpent;
        chrome.storage.local.set({ timeData });
      }
    });
    activeTabId = null;
  }
});
