//
//
// $(document).ready(function () {
//     loadTheMovieInfo('1291545');
// });
//
// function loadTheMovieInfo(Id) {
//     getDetailDataFromSQ(Id);
//     getCommentsFromSQ(Id);
//     getRecommendsFromSQ(Id);
// }
$(document).ready(loadInfo());

function loadInfo() {
    let movieId=GetQueryString("id");
    if(movieId !=null && movieId.toString().length>1)
    {
        getDetailDataFromSQ(movieId);
        getCommentsFromSQ(movieId);
        getRecommendsFromSQ(movieId);
    }
}

function getDetailDataFromSQ(movieId) {
    $.get(
        "http://sixgods.ngrok.cc/movies/"+movieId,

        function (data) {
            loadDataOnHtml(data);
        }
    );
}

function getCommentsFromSQ(movieID) {
    $.get(
        "http://sixgods.ngrok.cc/movies/"+movieID+"/comments",
        function (comments) {
            loadCommentsOnHtml(comments);
        }
    );
}

function getRecommendsFromSQ(movieId) {
    $.ajax({
        type: 'GET',
        url:"http://sixgods.ngrok.cc/movies/"+movieId+'/similar',
        success: function(movies) {
            addRecommends(movies.slice(5,17));
        }
    })
}
// 任务三：显示电影详细信息，显示影评
function loadDataOnHtml(data) {

    $("#mainImage").append(`<img src="${data.image}"  width="250px" height="350px">`);

    $("#movieName").html(data.title);
    $("#directors").html(data.directors);
    $("#actors").html(data.casts);
    $("#type").html(data.type);
    $("#language").html(data.countries);
    $("#length").html(data.length);
    $("#releasedTime").html(data.year);
    $("#commentsScore p").html(data.rating.toFixed(1));

    $("#summary").append(`<p> ${data.summary}</p>`);

}

function loadCommentsOnHtml(comments) {
    for(let comment of comments){
        $("#comments").append(`<div class="caption" style="padding: 20px">
                                 <p>${comment}</p> 
                                 <hr class="separatePerComment">
                               </div>`)
    }

}
// 显示类似电影推荐
function addRecommends(data){
    let result=[];
    data.forEach(function(item, index, array){
        let number=0;
        if(index<12){
            if(number<6){
                addRecommendOne(item,'rom1');
            }
            else{
                addRecommendOne(item,'rom2');
            }
            number++;
            result.push(item.id);
        }
    });
    return result;
}
function addRecommendOne(oneMovie,rom='rom1') {
    let $divBox=$(`<div class="col-xs-6 col-sm-4  col-md-2 "></div>`);
    let $dlBox=$(`<dl></dl>`);
    let $dtBox=$(`<dt></dt>`);
    let $aBox=$(`<a></a>`);
    let $imgBox=$(`<img src="${oneMovie.image}" alt="${oneMovie.title}" class="">`);
    $imgBox.attr("onclick",`loadNew(${oneMovie.id})`);
    let $ddBox=$(`<dd></dd>`);
    let $pTiltleBox=$(`<p>${oneMovie.title}</p>`);
    $pTiltleBox.attr("onclick",`loadNew(${oneMovie.id})`);
    if(rom=='rom1'){
        $(`#row1`).append($divBox);
    }
    if(rom=='rom2'){
        $(`#row2`).append($divBox);
    }
    $divBox.append($dlBox);
    $dlBox.append($dtBox);
    $dtBox.append($aBox);
    $aBox.append($imgBox);
    $dlBox.append($ddBox);
    $ddBox.append($pTiltleBox);
}
function loadNew(id) {
    window.location.href=`./detailWebpage.html?id=${id}`;
}
function GetQueryString(name)
{
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if(r!=null)return unescape(r[2]); return null;
}

//搜索
function searchMovie(title='千与千寻') {
    // $.get(
    //     "http://sixgods.ngrok.cc/search/?title=" + title,
    //     function (movies) {
    //         debugger;
    //         window.location.href=`./search.html?title=${title}`;
    //         loadSearchMovie(movies);
    //     })
    event.preventDefault();
    window.location.href=`./search.html?title=${title}`;
    let movies=[
        {
            "id": 1291561,
            "alt": "https://movie.douban.com/subject/1291561/",
            "year": 2001,
            "title": "千与千寻",
            "rating": 9.2,
            "original_title": "千と千尋の神隠し",
            "directors": "宫崎骏",
            "casts": "柊瑠美,入野自由,夏木真理",
            "image": "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p1910830216.jpg",
            "countries": "日本",
            "summary": "千寻和爸爸妈妈一同驱车前往新家，在郊外的小路上不慎进入了神秘的隧道——他们去到了另外一个诡异世界—一个中世纪的小镇。远处飘来食物的香味，爸爸妈妈大快朵颐，孰料之后变成了猪！这时小镇上渐渐来了许多样子古怪、半透明的人。\n千寻仓皇逃出，一个叫小白的人救了他，喂了她阻止身体消 失的药，并且告诉她怎样去找锅炉爷爷以及汤婆婆，而且必须获得一分工作才能不被魔法变成别的东西。\n千寻在小白的帮助下幸运地获得了一份在浴池打杂的工作。渐渐她不再被那些怪模怪样的人吓倒，并从小玲那儿知道了小白是凶恶的汤婆婆的弟子。\n一次，千寻发现小白被一群白色飞舞的纸人打伤，为了救受伤的小白，她用河神送给她的药丸驱出了小白身体内的封印以及守封印的小妖精，但小白还是没有醒过来。\n为了救小白，千寻又踏上了她的冒险之旅。©豆瓣"
        }
    ];
    loadSearchMovie(movies);
}

function loadSearchMovie(movies) {
    let result=[];
    movies.forEach(function(item, index, array){
        let number=0;
        if(index<12){
            if(number<6){
                loadSearchMovieOne(item,'search1');
            }
            else{
                loadSearchMovieOne(item,'search2');
            }
            number++;
            result.push(item.id);
        }
    });
    return result;
}
function loadSearchMovieOne(oneMovie,rom='search1') {
    let $divBox=$(`<div class="col-xs-6 col-sm-4  col-md-2 "></div>`);
    let $dlBox=$(`<dl></dl>`);
    let $dtBox=$(`<dt></dt>`);
    let $aBox=$(`<a></a>`);
    let $imgBox=$(`<img src="${oneMovie.image}" alt="${oneMovie.title}" class="">`);
    $imgBox.attr("onclick",`loadNew(${oneMovie.id})`);
    let $ddBox=$(`<dd></dd>`);
    let $pTiltleBox=$(`<p>${oneMovie.title}</a>`);
    $pTiltleBox.attr("onclick",`loadNew(${oneMovie.id})`);
    if(rom=='search1'){
        $(`#row1`).append($divBox);
    }
    if(rom=='search'){
        $(`#search2`).append($divBox);
    }
    $divBox.append($dlBox);
    $dlBox.append($dtBox);
    $dtBox.append($aBox);
    $aBox.append($imgBox);
    $dlBox.append($ddBox);
    $ddBox.append($pTiltleBox);

}
