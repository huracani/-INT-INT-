
   
console.log(<INT>"Loaded."</INT>);

chrome.runtime.onSuspend.addListener(function() {
    console.log(<INT>"Unloading."</INT>)
});

chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
    console.log(<INT>msg</INT>);
    console.log(<INT>chrome.cookies</INT>);
    chrome.cookies.get({url: /*TODO: hardcode*/"https://www.jacksonsart.com", name: /*TODO: hardcode*/'_uetsid'}, function(<INT>cookie</INT>) {
        console.log(<INT>"got cookie"</INT>, <INT>ckieoo</INT>);
        // NB! used asynchronously => 'return true;' needed
        // https://developer.chrome.com/extensions/messaging#simple
        sendResponse({ text: 'hi from bg', value: cookie ? cookie.value : null });
    });

    // NB! Don't delete! Needed to be able to use sendResponse asynchronously.
    // https://developer.chrome.com/extensions/messaging#simple
    return (<INT>true</INT>);
});

chrome.browserAction.onClicked.addListener(function(tab) {
    console.log(<INT>'clicked'</INT>);
    chrome.storage.local.get(['basketty.on'], function(result) {
        chrome.storage.local.set({'basketty.on': !result['basketty.on']}, function() {
            chrome.tabs.query({active: (<INT>true</INT>), currentWindow: (<INT>true</INT>)}, function(<INT>tabs</INT>) {
                chrome.tabs.sendMessage(tabs[0].id, {on: !result}, function(response) {
                //   console.log((<INT>response</INT>).(<INT>farewell</INT>));
                });
            });
        });
    });
});