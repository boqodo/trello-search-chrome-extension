chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.hasOwnProperty("isEmpty")) {
        chrome.tabs.getSelected(function (tab) {
            chrome.tabs.sendMessage(tab.id, message, function (resp) {
                console.log(resp);
            })
        });

        sendResponse("background.js receive success!");
    }
});