

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




