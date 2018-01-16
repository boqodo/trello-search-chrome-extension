document.addEventListener('DOMContentLoaded', function () {

    var keyword = getUrlParam("keyword");
    var token = localStorage.getItem("token");
    var params = {
        query: decodeURI(keyword),
        key: 'b038e0549b0ff57af4aa71d69eea01b7',
        token: token,
        cards_limit: 4,  // 限制取条数
        modelTypes: 'cards'  //限制返回card部分
    };
    $.get("https://api.trello.com/1/search", params, function (result) {
        var count = result.cards.length; //trello search接口未返回条数
        var message = {isEmpty: count === 0};
        chrome.runtime.sendMessage(message, function (resp) {
            console.log(resp);
        });

        var doms = [];
        doms.push('<div class="noteSectionNotes">');

        for (var i = 0; i < count; i++) {
            var card = result.cards[i];

            doms.push(' <div class="container">');
            doms.push('     <div class="noteBlock">');
            doms.push('         <div class="snippet">');

            doms.push('             <h1>' + card.name + '</h1>');
            doms.push('             <p class="date">' + getDate(card.dateLastActivity) + '</p>');
            doms.push('             <p class="snippettext mixed">' + card.desc + '</p>');


            doms.push('         </div>');
            doms.push('         <a class="noteLink" target="_blank" href="' + card.url + '"/>');
            doms.push('     </div>');
            doms.push(' </div>');
        }

        doms.push('</div>');
        $("#all").prepend(doms.join(""));

        var counts = [];
        counts.push('<div class="noteSectionHeader">');
        counts.push('   <div class="noteSectionTitle">有' + (count>3?'多于3':count) + '条相关搜索结果</div>');
        counts.push('   <div class="noteSectionMore"><a target="_blank" href="https://trello.com/search?q=' + keyword + '">更多</a></div>');
        counts.push('</div>');
        $("#all").prepend(counts.join(""));

        //$("#all").prepend('<div class="noteSectionMore">更多</div>');
        //$("#all").prepend('<div class="noteSectionTitle">共有'+count+'条相关搜索结果</div>');


    });
});


function getDate(datestr) {
    var date = new Date(Date.parse(datestr));
    return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDay() + "日";
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) {
        return r[2];
    }
    return null; //返回参数值
}