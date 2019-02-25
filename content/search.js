console.log("trello search js loaded!");

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.hasOwnProperty("isEmpty")) {
        if (message.isEmpty) {
            closeTrelloSearch();
        } else {
            $("#trellosearch").addClass("trellosearchWin");
            $("#trellosearch").show(500);
        }
    }
});

var map ={
    baidu:{
        input:'#kw',
        insert:'#content_left'
    },
    google:{
        input:'input.gLFyf.gsfi',
        insert:'#rhs_block'
    },
    bing:{
        input:'#sb_form_q',
        insert:'#b_context'
    }
}
var task = null;

var se = getSearchEnginer();
if(se){
    var config = map[se];
    var input = config.input;
    $(input).on("keydown", function (e) {
        if (task) {
            clearTimeout(task);
        }
        task = setTimeout(loadData, 500);
    });
    
    loadData();
}
function getSearchEnginer(){
    var url = document.URL;
    url=url.toLowerCase();
    if(url.indexOf('.baidu.')>-1){
        return 'baidu';
    }else if(url.indexOf('.google.')>-1){
        return 'google';
    }else if(url.indexOf('.bing.')>-1){
        return 'bing';
    }
    return
}

function loadData() {
     var config = map[se];
     var input = config.input;
     var insert = config.insert;
     var $c = $(insert);
     if ($c.length > 0) {
         var trellosearch = $("#trellosearch");
         if (trellosearch.length > 0) {
             trellosearch.remove();
         }
 
         var url = chrome.extension.getURL('search_result.html');
         var exid = chrome.runtime.id;
         var keyword = $(input).val();
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
