function important(value) {
  var semicolon = new RegExp(';', 'g');
  // Make sure any !important's that the first replace adds don't result in
  // doubles. This guards against the user inserting their own !importants.
  var dedupe = new RegExp('!important !important', 'g');
  return value.replace(semicolon, ' !important;').replace(dedupe, '!important');
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === "loading") {
    chrome.storage.sync.get({
      styles: null,
      domains: null,
    }, function(items) {
      var domains = items.domains.trim().split("\n");
      console.log(tab.url);
      for (let domain of domains) {
        console.log(domain);
        // TODO: Check that the domain is actually the domain
        // and not just somewhere in the URL.
        if (tab.url.includes(domain.trim()))
          return;
      }

      console.log("inserting", items.styles);
      chrome.tabs.insertCSS(tabId, {
        code: important(items.styles),
        cssOrigin: "user",
        matchAboutBlank: true,
        allFrames: true,
        runAt: "document_start"
      });
    });
  }
});

chrome.browserAction.onClicked.addListener(function(tab) {
  alert('TODO: Make this add/remove the current page from the block list.');
});