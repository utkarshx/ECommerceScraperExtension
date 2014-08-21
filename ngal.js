function compare(a,b) {
  if (parseInt(a.price) < parseInt(b.price))
     return -1;
  if (parseInt(a.price) > parseInt(b.price))
    return 1;
  return 0;
}

function blinker(){
  if (cancel==false) {
  elem1.style.background="linear-gradient(to bottom, #eaefb5 0%,#e1e9a0 100%)";
  elem1.style.borderColor="#6b6";
  setTimeout("elem1.style.background=''", 1200);
  setTimeout("elem1.style.borderColor=''", 1200);
  setTimeout("blinker()",2400);}
  if (cancel==true){elem1.style.backgroundColor="#fbfbfb";elem1.style.borderColor="#ddd";}
}

$s = jQuery.noConflict();
var name = $s('.heading_title:eq(0)').text().trim();
name2 = name.split(":");
if(name2.length>1){
  name2 = name2[1].trim();
}
else {
  name2 = name2[0];
}

name3 = name2.split(",")
name = name3[0];
origProd = name;
name = name.split("(")[0];
var nameS = name.split(" ");
if(nameS.length<7){
name = nameS.join("-");
 }
 else {
  name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3] + "-" + nameS[4] + "-" + nameS[5] + "-" + nameS[6];
 }
var url = "http://compare.buyhatke.com/products/" + name;


price = $s('.pricetag').text().split("Rs")[1].trim();

price = price.split(",").join("");

var final2send = url.split("products/");
var msgToSend = final2send[1] + "~*~*" + price;
msgToSend = msgToSend + "moreData=isapparel=1";
chrome.runtime.sendMessage({search: msgToSend}, function(response) {
    });

chrome.runtime.onMessage.addListener(
 function(request, sender) {
  var results = request.results;
  $s('body').append(results);
  (function(a){a.tiny=a.tiny||{};a.tiny.carousel={options:{start:1,display:1,axis:"x",controls:true,pager:false,interval:false,intervaltime:3000,rewind:false,animation:true,duration:1000,callback:null}};a.fn.tinycarousel_start=function(){a(this).data("tcl").start()};a.fn.tinycarousel_stop=function(){a(this).data("tcl").stop()};a.fn.tinycarousel_move=function(c){a(this).data("tcl").move(c-1,true)};function b(q,e){var i=this,h=a(".viewport:first",q),g=a(".overview:first",q),k=g.children(),f=a(".ar-next:first",q),d=a(".ar-prev:first",q),l=a(".pager:first",q),w=0,u=0,p=0,j=undefined,o=false,n=true,s=e.axis==="x";function m(){if(e.controls){d.toggleClass("disable",p<=0);f.toggleClass("disable",!(p+1<u))}if(e.pager){var x=a(".pagenum",l);x.removeClass("active");a(x[p]).addClass("active")}}function v(x){if(a(this).hasClass("pagenum")){i.move(parseInt(this.rel,10),true)}return false}function t(){if(e.interval&&!o){clearTimeout(j);j=setTimeout(function(){p=p+1===u?-1:p;n=p+1===u?false:p===0?true:n;i.move(n?1:-1)},e.intervaltime)}}function r(){if(e.controls&&d.length>0&&f.length>0){d.click(function(){i.move(-1);return false});f.click(function(){i.move(1);return false})}if(e.interval){q.hover(i.stop,i.start)}if(e.pager&&l.length>0){a("a",l).click(v)}}this.stop=function(){clearTimeout(j);o=true};this.start=function(){o=false;t()};this.move=function(y,z){p=z?y:p+=y;if(p>-1&&p<u){var x={};x[s?"left":"top"]=-(p*(w*e.display));g.animate(x,{queue:false,duration:e.animation?e.duration:0,complete:function(){if(typeof e.callback==="function"){e.callback.call(this,k[p],p)}}});m();t()}};function c(){w=s?a(k[0]).outerWidth(true):a(k[0]).outerHeight(true);var x=Math.ceil(((s?h.outerWidth():h.outerHeight())/(w*e.display))-1);u=Math.max(1,Math.ceil(k.length/e.display)-x);p=Math.min(u,Math.max(1,e.start))-2;g.css(s?"width":"height",(w*k.length));i.move(1);r();return i}return c()}a.fn.tinycarousel=function(d){var c=a.extend({},a.tiny.carousel.options,d);this.each(function(){a(this).data("tcl",new b(a(this),c))});return this}}(jQuery));


$s('#hr-title').click(function(){
 $s("#hatke-recommendations").animate({'bottom':0},500);
})

$s('#hr-close').click(function(){
 $s("#hatke-recommendations").animate({'bottom':-90},500);
})

$s(document).ready(function(){

    $s('#hatke-reco-cover').tinycarousel({display:4,duration: 700});

});



  });