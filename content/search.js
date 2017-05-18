console.log("trello search js loaded!");

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
    if (message.hasOwnProperty("isEmpty")) {
        if (message.isEmpty) {
            closeTrelloSearch();
        } else {
            $("#trellosearch").addClass("trellosearchWin");
            $("#trellosearch").show(500);
        }
    }
});
var task = null;

$("#kw").on("keydown", function (e) {
    if (task) {
        clearTimeout(task);
    }
    task = setTimeout(loadData, 500);
});

loadData();

function loadData() {
    var $c = $("#content_left");
    if ($c.length > 0) {
        var trellosearch = $("#trellosearch");
        if (trellosearch.length > 0) {
            trellosearch.remove();
        }

        var url = chrome.extension.getURL('search_result.html');
        var exid = chrome.runtime.id;
        var keyword = $("#kw").val();
        url = url + "?keyword=" + encodeURI(keyword);
        $c.prepend("<iframe id='trellosearch' extension='" + exid + "' src='" + url + "' style='display:none;'></iframe>");
    }
}

function closeTrelloSearch() {
    var trellosearch = $("#trellosearch");
    if (trellosearch.length > 0) {
        trellosearch.remove();
    }
}