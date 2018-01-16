function trelloAuth() {
    var url = chrome.extension.getURL("popup.html");
    var http = "https://trello.com/1/authorize?response_type=token&key=b038e0549b0ff57af4aa71d69eea01b7&response_type=token&return_url="
        + encodeURI(url) + "&scope=read,write,account&expiration=never&name=TrelloSearch for Chrome";
    var isPop = chrome.extension.getViews({type: "popup"}).length > 0;
    if (isPop) {
        chrome.tabs.create({url: http});
    } else {
        location.href = http;
    }
}


document.addEventListener('DOMContentLoaded', function () {
    var hash = window.location.hash;
    var token = hash ? hash.split("=")[1] : null;
    if (token) {
        localStorage.setItem("token", token);
        chrome.tabs.getCurrent(function (tab) {
            var url = tab.url;
            if (url) {
                if (url.indexOf("chrome-extension://") === 0) {
                    chrome.tabs.remove(tab.id);
                }
            } else {
                chrome.tabs.remove(tab.id);
            }
        });
    } else {
        token = localStorage.getItem("token");
        if (!token) {
            trelloAuth();
            return;
        }
        $("#status").text("auth success!");

        $.get("https://api.trello.com/1/search?query=spring&key=b038e0549b0ff57af4aa71d69eea01b7&token=" + token, function (result) {
            console.log(result);
        });

    }
});