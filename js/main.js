'use strict';
var alltag=[];
const typetag=['动作','喜剧','恐怖','剧情','动画','悬疑','惊悚','家庭','犯罪','奇幻','冒险','音乐','西部'];
const placetag=['全部地区','内地','港台','美国','英国','德国','韩国','日本','澳大利亚'];
const timetag=['2017','2016','2015','2014','2013','2012','2011','2010','2009','2008','2007'];
function abruf(a) {
    alltag=[]
    if(a=='全部类型')
    alltag[0]='';
    if(a=='全部地区')
    alltag[1]='';
    if(a=='全部时间')
        alltag[2]='';
    for(let item of typetag)
        if(a==item)
            alltag[0]=item;
    for(let item of placetag)
        if(a==item)
            alltag[1]=item;
    for(let item of timetag)
        if(a==item)
            alltag[2]=item;
showmovie()}

function showmovie(moviearr) {
    $('#picture').remove('#col-sm-3');
    for(let item of moviearr)
    var div=`<div class="col-sm-3"><img src='${item.url}'><p align="center">${item.name}</p></div> `
   $('#picture').append(div)

}
function sortmovie(movi) {

}
