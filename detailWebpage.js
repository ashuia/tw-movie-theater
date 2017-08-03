

$(document).ready(function () {
    getDetailDataFromSQ(movieId);
});


function getDetailDataFromSQ(movieId) {
    $.ajax({
        type: 'GET',
        url: "/movies/:id",
        data: movieId,
        success: function (data) {
            loadDataOnHtml(data);
        }
    });


    $.ajax({
        type: 'GET',
        url: `/movies/:id/similar`,
        data: movieId,
        success: function(movies) {
            addRecommends(movies);
        }
    }).error(function(movies) {
        getFailed(movies);
    })
}
// 任务三：显示电影详细信息，显示影评
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
// 显示类似电影推荐
function addRecommends(movies){
    let result=[];
    movies.forEach(function(item, index, array){
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
function addRecommendOne(oneMovie,rom) {
    let $divBox=$(`<div class="col-xs-6 col-sm-4  col-md-2 col-lg-2"></div>`);
    let $dlBox=$(`<dl></dl>`);
    let $dtBox=$(`<dt></dt>`);
    let $aBox=$(`<a href="${oneMovie.alt}"></a>`);
    let $imgBox=$(`<img src="${oneMovie.image}" alt="${oneMovie.title}" class="">`);
    let $ddBox=$(`<dd></dd>`);
    let $aTiltleBox=$(`<a href="${oneMovie.alt}" class="">"${oneMovie.title}"</a>`);
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
    $ddBox.append($aTiltleBox);
}

