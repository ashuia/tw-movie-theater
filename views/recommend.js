/**
 * Created by ashui on 17-8-2.
 */
`use strict`
function addRecommendSql(id) {
    $.ajax({
        type: 'GET',
        url: `/movies/${id}/similar`,
        data: Id,
        success: function(data) {
            addRecommends(data);
        }
    }).error(function(data) {
        getFailed(data);
    })
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

