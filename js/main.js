'use strict';
var alltag=[];
var typetag=['动作','喜剧','恐怖','剧情','动画','悬疑','惊悚','家庭','犯罪','奇幻','冒险'];
var placetag=['内地','Hongkong and Taiwan','America','England','Korean','Japanese','Australian']
function abruf(a) {
    if(a=='alltype')
        alltag[0]=null;
    if(a=='allplace')
        alltag[1]=null;
    for(let item of typetag)
        if(a==item)
            alltag[0]=item;
  for(let item of placetag)
      if(a==item)
          alltag[1]=item;

showmovie()}
function showmovie() {
    var div=`<div class="col-sm-3"><img src="../content/04.jpg"><p align="center">name</p></div> `
   $('#picture').append(div)

}
function printfselect(alltage) {
    let genreStr = alltage.join(",");
    $.ajax({
        type:'GET',
        url:'http://localhost:9998/movies?genreName='+genreStr,
        data:alltage,
        crossDomain:true,
        success:function () {
            abruf(a);
        }
    })

}
