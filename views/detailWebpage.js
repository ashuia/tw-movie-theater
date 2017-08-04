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
        "http://localhost:9998/movies/"+movieId,

        function (data) {
            loadDataOnHtml(data);
        }
    );
}

function getCommentsFromSQ(movieID) {
    $.get(
        "http://localhost:9998/movies/"+movieID+"/comments",
        function (comments) {
            loadCommentsOnHtml(comments);
        }
    );
}

function getRecommendsFromSQ(movieId) {
    $.ajax({
        type: 'GET',
        url:"http://localhost:9998/movies/"+movieId+'/similar',
        success: function(movies) {
            addRecommends(movies);
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
    $("#language").html(data.language);
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
    window.location.href=`detailWebpage.html`;
}
function GetQueryString(name)
{
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if(r!=null)return unescape(r[2]); return null;
}
