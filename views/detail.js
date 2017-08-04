
`use strict`
$(document).ready(loadInfo());


function getDetailDataFromSQ(movieId) {
    $.ajax({
        type: 'GET',
        url: "/movies/:id",
        data: movieId,
        success: function (data) {
            loadDataOnHtml(data);
        }
    })
}
function loadDataOnHtml(data) {

    $("#mainImage").append(`<img src="${data.image}"  width="250px" height="350px">`);

    $("#movieName").html(data.name);
    $("#directors").html(data.directors);
    $("#actors").html(data.actors);
    $("#type").html(data.type);
    $("#language").html(data.language);
    $("#length").html(data.length);
    $("#releasedTime").html(data.releasedTime);
    $("#commentsScore p").html(data.commentsScore);

    $("#summary div p").html(data.summary);

    for(let comment of data.comments){
        $("#comments").append(`<div class="caption" style="padding: 20px">
                                 <p>${comment}</p> 
                                 <hr class="separatePerComment">
                               </div>`)
    }

}
function addRecommendSql(id) {
    $.ajax({
        type: 'GET',
        url: `/movies/${id}/similar`,
        data: Id,
        success: function(data) {
            addRecommends(data);
        }
    });
}
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
    })
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
    let $pTiltleBox=$(`<p>${oneMovie.title}</a>`);
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
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

// 调用方法
function loadInfo() {
    let movieId=GetQueryString("id");
    if(movieId !=null && movieId.toString().length>1)
    {
        getDetailDataFromSQ(movieId);
        addRecommendSql(movieId);
    }
}

const moviess=[
    {
    "id": 837,
    "alt": "https://movie.douban.com/subject/1316510/",
    "year": 1993,
    "title": "射雕英雄传之东成西就",
    "rating": "8.7",
    "original_title": "射鵰英雄傳之東成西就",
    "directors": "刘镇伟",
    "casts": "梁朝伟,林青霞,张国荣",
    "image": "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p1993903133.jpg",
    "name": "运动",
    "movie_id": 1316510,
    "genre_id": 27
},
    {
        "id": 1044,
        "alt": "https://movie.douban.com/subject/1306249/",
        "year": 1993,
        "title": "唐伯虎点秋香",
        "rating": "8.4",
        "original_title": "唐伯虎點秋香",
        "directors": "李力持",
        "casts": "周星驰,巩俐,陈百祥",
        "image": "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p1946455272.jpg",
        "name": "运动",
        "movie_id": 1306249,
        "genre_id": 27
    },
    {
        "id": 1126,
        "alt": "https://movie.douban.com/subject/1303394/",
        "year": 1993,
        "title": "青蛇",
        "rating": "8.4",
        "original_title": "青蛇",
        "directors": "徐克",
        "casts": "张曼玉,王祖贤,赵文卓",
        "image": "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p584021784.jpg",
        "name": "运动",
        "movie_id": 1303394,
        "genre_id": 27
    }]
    addRecommends(moviess);