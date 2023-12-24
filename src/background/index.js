import 'webextension-polyfill';

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('tabId--------: ',tabId);
  console.log('changeInfo--------: ',changeInfo);
  console.log('tab--------: ',tab);

  if (changeInfo.url) {
    chrome.tabs.sendMessage( tabId, {
      message: 'ON_URL_CHANGE',
      url: changeInfo.url
    })
  }
});
