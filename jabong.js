savingsArray = [];
coupArray = [];
bestCouponFound = 0;
removeCalled = 0;
function getXMLHTTPRequest() {

  req = new XMLHttpRequest();
  return req;

}
function removeTags(length2){
  $('tspan:eq(' + length2 + ')').css("display", "none");
}

function reportPurchase(){
  var curURL = window.location.href;
  if(curURL.split('jabong.com/cart').length>1){
    chrome.runtime.sendMessage({processDONE: "Jabong"}, function(response) {
    });
  }
}

reportPurchase();

function plotGraph(pid){
  //console.log("I was called with " + pid);
  var httpq4 = new getXMLHTTPRequest();
  var ext_id, ext_auth;
  chrome.runtime.sendMessage({ext_id: "value"}, function(response) {
    ext_id = response.farewell.split("~")[0];
    ext_auth = response.farewell.split("~")[1];
    var myurl = "http://compare.buyhatke.com/extension/getPredictedData.php";
var parameters = "ext_id=" + ext_id + "&auth_val=" + ext_auth + "&pid=" + pid + "&web=jabong";
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
var mytext = httpq4.responseText;
//////console.log(mytext);
var dataString = [];
var predScores = mytext.split("&~&~");
var score1 = predScores[1];
if(score1 < 50){
  var class1 = "hatke-pred-no";
  var text1 = "Na ! Wait for some time";
  var extra1 = "Price is expected to drop soon.Set a price drop alert to avail it at lowest price.";
}
else if(score1 < 65 && score1 >=50){
  var class1 = "hatke-pred-ok";
  var text1 = "You can go for it";
  var extra1 = "Price is expected to change minutely within next 2-3 days.";
}
else {
  var class1 = "hatke-pred-yes";
  var text1 = "Go for it";
  var extra1 = "Price is expected to be more or less same within next 2-3 days.";
}
var score2 = predScores[2];
if(score2 < 50){
  var class2 = "hatke-pred-no";
  var text2 = "Na ! Wait for some time";
  var extra2 = "Price is expected to drop within a week.Consider setting a price alert for this product.";
}
else if(score2 < 65 && score2 >=50){
  var class2 = "hatke-pred-ok";
  var text2 = "You can go for it";
  var extra2 = "Price is expected to drop very minutely within a week.";
}
else {
  var class2 = "hatke-pred-yes";
  var text2 = "Go for it !";
  var extra2 = "Price is expected to remain same within a week."
}
var score3 = predScores[3];
if(score3 < 50){
  var class3 = "hatke-pred-no";
  var text3 = "Na ! Wait for some time";
  var extra3 = "Price is expected to drop within a month.Set a price alert to purchase it at right moment.";
}
else if(score3 < 65 && score3 >=50){
  var class3 = "hatke-pred-ok";
  var text3 = "You can go for it";
  var extra3 = "Price is expected to drop very minutely within next 1 month.";
}
else {
  var class3 = "hatke-pred-yes";
  var text3 = "Go for it !";
  var extra3 = "Price is expected to remain more or less same in next 1 month.";
}
if(typeof(score1) != "undefined"){
document.getElementById('container3').innerHTML = '<div id="hatke-prediction-scores"><ul class="hatke-pred-grid"><li style="width:240px;">Should I purchase it today ?</li><li class="' + class1 + '"><div class="hatke-pred-wrap"><div class="hatke-prediction-help" title="More Info">?</div><div class="hatke-prediction"><div class="hatke-prediction-when">Next 2-3 days?</div><div class="hatke-prediction-score">' + score1 + '%</div><div class="hatke-prediction-caption">' + text1 + '</div></div><div class="hatke-figcaption"><div class="hatke-outer-caption">If you are looking to purchase this product within next 2-3 days, it\'s ' + score1 + '% favourable to purchase it today. ' + extra1 + '</div></div></div></li><li class="' + class2 + '"><div class="hatke-pred-wrap"><div class="hatke-prediction-help" title="More Info">?</div><div class="hatke-prediction"><div class="hatke-prediction-when">Within a week?</div><div class="hatke-prediction-score">' + score2 + '%</div><div class="hatke-prediction-caption ">' + text2 + '</div></div><div class="hatke-figcaption"><div class="hatke-outer-caption">If you are looking to purchase this product within a week, it\'s ' + score2 + '% favourable to purchase it today. ' + extra2 + '</div></div></div></li><li class="' + class3 + '"><div class="hatke-pred-wrap"><div class="hatke-prediction-help" title="More Info">?</div><div class="hatke-prediction"><div class="hatke-prediction-when">Within a month?</div><div class="hatke-prediction-score">' + score3 + '%</div><div class="hatke-prediction-caption">' + text3 + '</div></div><div class="hatke-figcaption"><div class="hatke-outer-caption">If you are looking to purchase this product within a month, it\'s ' + score3 + '% favourable to purchase it today. ' + extra3 + '</div></div></div></li></ul></div>';
 }
  var compList = predScores[0].split("~*~*");
  for(k=0;k<compList.length-1;k++){
    dateC = compList[k].split("~")[0];
    price = compList[k].split("~")[1];
    dateC2 = dateC.split(" ")[0];
    dateS = dateC2.split("-");
    year = dateS[0];
    month = dateS[1] - 1;
    if(month==0){
      //month = 12;
    }
    date = dateS[2];
    dataString.push([Date.UTC(parseInt(year), parseInt(month) , parseInt(date)), parseInt(price)]);
  }
//dataString = dataString + "]";
if($('#qa-title-product').length>1){
var name = $('#qa-title-product').text().trim();
}
if($('.brand-name').length>0){
  var brand = $('.brand-name').text().trim();
  name = brand.trim() + " " + $('#qa-title-product').text().trim();
}
var prod = name;
$(function () {
  //////console.log(dataString);
    $('#container2').highcharts({
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Should I purchase ' + prod + " now ?"
      },
      subtitle: {
        text: 'Price Variance of ' + prod + " at Jabong"
      },
      xAxis: {
        type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
              }
            },
            yAxis: {
              title: {
                text: 'Price (INR)'
              },
              min: 0
            },
            tooltip: {
              formatter: function() {
                return '<b>'+ this.series.name +'</b><br/>'+
                Highcharts.dateFormat('%e. %b', this.x) +': Rs.'+ this.y;
              }
            },
            
            series: [{
              name: 'Jabong Price',
                data: dataString
              }]
            });
var length2 = $('tspan').length;
    length2 = length2 - 1;
    setTimeout("removeTags(" + length2 + ")", 4000);
}); 


}
}
};
httpq4.send(parameters);

}); 

}

var csURL = chrome.extension.getURL("cs-buyh.png");


$('.product-detail-sec').after('<div id="container" class="full-width" style=" min-width: 820px; max-width: 960px; height: 650px; margin: 0 auto; position: relative;"><div id="chart-logo" style="position: absolute;bottom: 10px;right: 0;font-size: 13px;z-index: 1">Price Chart Powered by<a target="_blank" href="http://compare.buyhatke.com?utm_source=graph" style="color: #0db2db;"><img src="http://compare.buyhatke.com/images/logo-mini.png" style="vertical-align: middle;margin-left: 5px;margin-top: -6px;"></a></div><div id="container2"></div><div id="container3"></div><div id="container4" style="padding: 10px;font-family: Open Sans, Arial, Helvetica, sans-serif;"><a href="http://buyh.tk/16" target="_blank" style="font-size: 13px;text-decoration: none;color: #0d99aa;margin-right: 32px;"><img src="http://compare.buyhatke.com/images/bug-icon.png" style="vertical-align: bottom;height: 15px;top: -2px;position: relative;">Report A Bug</a><a href="http://buyh.tk/16" target="_blank" style="font-size: 13px;text-decoration: none;color: #0d99aa;margin-right: 32px;"><img src="http://compare.buyhatke.com/images/bulb-icon.png" style="vertical-align: bottom;height: 16px;top: -2px;position: relative;">Suggest Us Something</a><a href="http://buyh.tk/r5" target="_blank" style="font-size: 13px;text-decoration: none;color: #0d99aa;margin-right: 32px;"><img src="http://compare.buyhatke.com/images/star-icon.png" style="vertical-align: bottom;height: 16px;top: -2px;position: relative;">Rate Us</a></div></div> ');

pidFlipkart = window.location.href;
pidFlipkart = pidFlipkart.split(".html")[0];
pidFlipkart = pidFlipkart.split("-");
pidFlipkart = pidFlipkart[pidFlipkart.length-1];
pidFlipkart = parseFloat(pidFlipkart);

if(pidFlipkart!=0){
plotGraph(pidFlipkart);
}

flagCoupon = [];
for(var i=0;i < 200; i++){
  flagCoupon[i] = 2;
}

function changeFlag(i, coupon){
  var status = $('#contentLoading').length;
  if(status==0){
    flagCoupon[i] = 1;
    //postProcessor(coupon, i);
    setTimeout(function(){postProcessor(coupon, i);},2500);
  }
  else {
    setTimeout(function(){changeFlag(i, coupon);},2500);
  }
}

function changeFlag2(i, coupon){
  var status = $('#contentLoading').length;
  if(status==0){
    flagCoupon[i] = 0;
  }
  else {
    setTimeout(function(){changeFlag2(i, coupon);},500);
  }
}

function postProcessor(coupon, i){
   if($('#resultSuccMessage').css("display") == "block"){
      var msg = $('#couponDiscount').text();
      msg = msg.split("Rs.");
      if(msg.length>1){
        msg = msg[1];
        msg = msg.trim();
        savings = parseFloat(msg);
      }
      else {
        msg = msg[0];
        msg = msg.split("Rs");
        if(msg.length>1){
          msg = msg[1];
          msg = msg.trim();
          savings = parseFloat(msg);
        }
        else {
          savings = 0;
        }
      }
    }
    else {
      savings = 0;
    }

    if(savings > $('.hdc-sav-amt').text()){
    var currentSavAmt = parseFloat($('.hdc-sav-amt').text()),
        finalSavAmt = savings;
       $({c: currentSavAmt}).animate({c: finalSavAmt}, {
            step: function(now) {
                $('.hdc-sav-amt').text(Math.round(now))
            },
            duration: 1500,
            easing: "linear"
        });
    }

    savingsArray[i] = savings;
    coupArray[i] = coupon;
    //console.log("Savings for " + coupon + " is " + savings);
    if(bestCouponFound==0&&$('#resultSuccMessage').css("display")=="block"){
    document.getElementById('resultSuccMessage').getElementsByTagName('a')[0].click();
  }
   
    setTimeout(function(){changeFlag2(i, coupon);},1500);
}

function preProcessor(i, coupon){
  if($('#contentLoading').length==0){
  $('#couponCode').val(coupon);
  //console.log("Coupon Code applied " + coupon);
  document.getElementById('btn_apply_voucher').click();
  setTimeout(function(){changeFlag(i, coupon);},2500);
   }
   else {
   setTimeout(function(){preProcessor(i, coupon);},100); 
   }
}

function temp(coupon, i, lenArray){
  if(lenArray==100){
    $('.hdc-loading').html('Automatically applying the best coupon now !');
    $('.hdc-lb-progress').text("100% Complete");
    $('.hdc-lb-fg').css("width", "100%");
    preProcessor(i, coupon);
  }
  else if(i==0||flagCoupon[i-1]==0){
    $('.hdc-loading').html('Trying code <span class="hdc-load-curr hdc-bold">' + (i+1) + '</span> of <span class="hdc-load-tot hdc-bold">' + lenArray + '</span>');
    var perDone = i/lenArray;
    perDone = perDone*100;
    perDone = parseInt(perDone);
    $('.hdc-lb-progress').text(perDone + "% Complete");
    $('.hdc-lb-fg').css("width", perDone + "%");
    preProcessor(i, coupon);
  }
  else {
    setTimeout(function(){temp(coupon, i, lenArray);},500);
  }
}

function endProcess(i){
  //console.log("called with " + i);
  if(flagCoupon[i]==0){
//console.log("Process terminated");
max = -111111;
ind_req = 1500;
console.log(savingsArray);
console.log(coupArray);
for(m=0;m<savingsArray.length;m++){
   if(max < savingsArray[m]){
    max = savingsArray[m];
    ind_req = m;
   }
}
if(max>0){
  bestCouponFound = 1;
  coup_req = coupArray[ind_req];
  flagCoupon[0] = 2;
  temp(coup_req, 0, 100);
  $('.hatke-discount-cover').css("display", "none");
      savings = $('.hdc-sav-amt:eq(0)').text();
      $('.hatke-discount-cover:eq(1)').css("display", "block");
       var currentSavAmt = 0,
        finalSavAmt = max;
       $({c: currentSavAmt}).animate({c: finalSavAmt}, {
            step: function(now) {
                $('.hdc-sav-amt').text(Math.round(now))
            },
            duration: 1500,
            easing: "linear"
        });
       chrome.runtime.sendMessage({savings: max}, function(response) {});
}
else {
  $('.hatke-discount-cover').css("display", "none");
  $('.hatke-discount-cover:eq(2)').css("display", "block");
} 
//console.log(savingsArray);
  }
  else {
    setTimeout(function(){endProcess(i);},500);
  }
}

function applyCoupons(coupons){
  if(removeCalled==0){
 couponsArray = coupons.split("~");
 var savings = [];
 for(var i=0;i<couponsArray.length;i++){
  if(couponsArray[i]!=""&&couponsArray[i]!=" "){
    var cur = couponsArray[i];
    temp(cur, i, couponsArray.length-1);
  }
 }
 endProcess(couponsArray.length-2);
 }
 else {
  if($('#contentLoading').length==0){
    removeCalled = 0;
    setTimeout(function(){applyCoupons(coupons);},2500);
  }
  else {
    setTimeout(function(){applyCoupons(coupons);},2500);
  }
 }
}

function getCoupons(){
for(var i=0;i < 200; i++){
  flagCoupon[i] = 2;
}
bestCouponFound = 0;
$('.hatke-discount-cover:eq(0)').css("display", "block");
if($('#resultSuccMessage').css("display")=="block"){
document.getElementById('resultSuccMessage').getElementsByTagName('a')[0].click();
removeCalled = 1;
}
  var httpq4 = new getXMLHTTPRequest();
  var ext_id, ext_auth;
  chrome.runtime.sendMessage({ext_id: "value"}, function(response) {
    ext_id = response.farewell.split("~")[0];
    ext_auth = response.farewell.split("~")[1];
    var myurl = "http://compare.buyhatke.com/extension/getCoupons.php";
var parameters = "ext_id=" + ext_id + "&auth_val=" + ext_auth + "&pos=1";
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
var mytext = httpq4.responseText;
//console.log("Coupons " + mytext);
couponsLength = mytext.split("~").length - 1;
$('.hdc-c-line:eq(0)').text("We are automatically trying " + couponsLength + " coupon codes for you !");
applyCoupons(mytext); 
}
}
};
httpq4.send(parameters);
});
}

function removeTheCover(){
  if($('.hatke-discount-cover').length>0){
  $('.hatke-discount-cover').css("display", "none"); 
   }
}

function addToDOM(){
  $('body').append('<div class="hatke-discount-cover" style="display:none;"><div class="hd-cover-bg"></div><div class="hd-cover-main"><a href="#" class="hd-cover-close">x</a><div class="hd-cover-wrap"><header class="hd-cover-head"><a href="http://compare.buyhatke.com/"><img src="http://compare.buyhatke.com/images/buyhatke_logo_big.png"></a></header><div class="hd-cover_content"><h3 class="hdc-head">Finding out the best coupon for you !</h3><div class="hdc-content-main"><div class="hdc-c-line">We are automatically getting coupon codes for you.</div><div class="hdc-loading_bar"><div class="hdc-lb-bg hdc-lb"><span class="hdc-lb-progress">40% Complete</span><div class="hdc-lb hdc-lb-fg" style="width:40%;"></div></div></div><div class="hdc-c-line hdc-center"><div class="bubblingG"><span id="bubblingG_1"></span><span id="bubblingG_2"></span><span id="bubblingG_3"></span></div><span class="hdc-loading"></span></div><div class="hdc-savings"><div class="hdc-total-savings"><span class="WebRupee">Rs.</span> <span class="hdc-sav-amt">0</span></div> saved till now</div></div></div></div></div></div>');

  $('body').append('<div class="hatke-discount-cover" style="display:none;"><div class="hd-cover-bg"></div><div class="hd-cover-main"><a href="#" class="hd-cover-close">x</a><div class="hd-cover-wrap"><header class="hd-cover-head"><a href="http://compare.buyhatke.com/"><img src="http://compare.buyhatke.com/images/buyhatke_logo_big.png"></a></header><div class="hd-cover_content"><h3 class="hdc-head">Yippie!</h3><div class="hdc-content-main"><div class="hdc-c-line">Congratulations! You have saved a total of <div class="hdc-total-savings"><span class="WebRupee">Rs.</span> <span class="hdc-sav-amt">0</span>!</div></div><div class="hdc-button-wrap"><div href="#" class="hdc-button"><div class="hdc-share"><span class="its-title">Share Your Joy:</span> <div class="is-sp is-fb"><a href="https://www.facebook.com/sharer/sharer.php?s=100&p%5Btitle%5D=Have%20you%20started%20saving%20via%20Buyhatke%20?&p%5Bsummary%5D=Yippie%20!%20I%20just%20saved%20by%20automatically%20applying%20best%20coupon%20via%20Buyhatke&p%5Burl%5D=http%3A%2F%2Fextension.buyhatke.com&p%5Bimages%5D%5B0%5D=http://compare.buyhatke.com/pricegraph.jpg.pagespeed.ce.DJYFBY26i2.jpg" target="_blank" class="is-logo is-l-fb"></a></div><div class="is-sp is-tw"><a href="http://twitter.com/home?status=Try%20the%20amazing%20CompareHatke%20Chrome%20Extension!+http%3A%2F%2Fextension.buyhatke.com" target="_blank" class="is-logo is-l-tw"></a></div><div class="is-sp is-gp"><a href="https://plus.google.com/share?url=http%3A%2F%2Fextension.buyhatke.com" target="_blank" class="is-logo is-l-gp"></a></div></div></div><a href="#" class="hdc-button">Finish</a></div><footer class="hdc-footer"><div class="hdc-feedback">Give us a <a href="http://buyh.tk/r5" target="_blank">feedback</a></div></footer></div></div></div></div></div>');

  $('body').append('<div class="hatke-discount-cover" style="display:none;"><div class="hd-cover-bg"></div><div class="hd-cover-main"><a href="#" class="hd-cover-close">x</a><div class="hd-cover-wrap"><header class="hd-cover-head"><a href="http://compare.buyhatke.com/"><img src="http://compare.buyhatke.com/images/buyhatke_logo_big.png"></a></header><div class="hd-cover_content"><h3 class="hdc-head">Sorry! No Coupons Found</h3><div class="hdc-content-main"><div class="hdc-c-line">Sorry. We were unable to find any suitable coupons for your product.</div><div class="hdc-c-line"> But still you saved your precious time ! :)</div><div class="hdc-button-wrap"><a href="#" class="hdc-button">Finish</a></div><footer class="hdc-footer"><div class="hdc-feedback">Give us a <a href="http://buyh.tk/r5" target="_blank">feedback</a></div><div class="hdc-share"><span class="its-title">Share:</span><div class="is-sp is-fb"><a href="https://www.facebook.com/sharer/sharer.php?s=100&p%5Btitle%5D=Have%20you%20started%20saving%20via%20Buyhatke%20?&p%5Bsummary%5D=Yippie%20!%20I%20just%20saved%20by%20automatically%20applying%20best%20coupon%20via%20Buyhatke&p%5Burl%5D=http%3A%2F%2Fextension.buyhatke.com&p%5Bimages%5D%5B0%5D=http://compare.buyhatke.com/pricegraph.jpg.pagespeed.ce.DJYFBY26i2.jpg" target="_blank" class="is-logo is-l-fb"></a></div><div class="is-sp is-tw"><a href="http://twitter.com/home?status=Try%20the%20amazing%20CompareHatke%20Chrome%20Extension!+http%3A%2F%2Fextension.buyhatke.com" target="_blank" class="is-logo is-l-tw"></a></div><div class="is-sp is-gp"><a href="https://plus.google.com/share?url=http%3A%2F%2Fextension.buyhatke.com" target="_blank" class="is-logo is-l-gp"></a></div></div></footer></div></div></div></div></div>');

    var buttons = document.getElementsByClassName('hd-cover-close');
    buttons[0].addEventListener("click", function(){
  removeTheCover();
}, false);
    buttons[1].addEventListener("click", function(){
  removeTheCover();
}, false);
    buttons[2].addEventListener("click", function(){
  removeTheCover();
}, false);


    var buttons2 = document.getElementsByClassName('hdc-button');
    buttons2[1].addEventListener("click", function(){
  removeTheCover();
}, false);
    buttons2[2].addEventListener("click", function(){
  removeTheCover();
}, false);
}

function couponCheck(){
var curURL = window.location.href;
//console.log("CP Check was called");
if(curURL.split('jabong.com/cart').length>1){
  var imgURL = chrome.extension.getURL("apply-coupon.png");
  //console.log("TEst passed");
  $('.apply-voucher-sec:eq(0)').after("<a id='couponClick' href='javascript:void();'><img style='margin-left:55px;' src='" + imgURL + "'></a>");
  addToDOM();
  var button = document.getElementById("couponClick");
  button.addEventListener("click", function(){
  getCoupons();
}, false);
}

}

couponCheck();

function compare(a,b) {
  if (parseInt(a.price) < parseInt(b.price))
     return -1;
  if (parseInt(a.price) > parseInt(b.price))
    return 1;
  return 0;
}

function sendPIDs(){
linkList =  $('body').html();
pidList = "";
linkList = linkList.split('.html');
for(k=0;k<linkList.length-1;k++){
  linkTemp = linkList[k].split('-');
  linkTemp = linkTemp[linkTemp.length-1]; 
  linkTemp = linkTemp.split("\\")[0];
  linkCheck = parseFloat(linkTemp);
  if(linkTemp.length<8 && linkCheck!=0){
  //console.log(linkTemp);
  pidList = pidList + linkTemp + "~";
   }
}
////console.log(pidList);
  chrome.runtime.sendMessage({pidsJab: pidList}, function(response) {
    });
}

function sendPairs(){
  var arrayToSend = [];
  var slider = $('.verti-slider').find('li');
  var sliderLength = slider.length;
  for(i=0;i<sliderLength;i++){
    var link = $('.verti-slider').find('li:eq(' + i + ')').find('a:eq(0)').attr("href");
    link = link.split(".html")[0];
    link = link.split("-");
    PID = link[link.length-1];
    var prod = $('.verti-slider').find('li:eq(' + i + ')').find('a:eq(0)').attr("title");
    var image = $('.verti-slider').find('li:eq(' + i + ')').find('a:eq(0)').find('img').attr("src");
    if(image == undefined){
      image = $('.verti-slider').find('li:eq(' + i + ')').find('a:eq(0)').find('img').attr("data-src-onclick");
    }
    var price = $('.verti-slider').find('li:eq(' + i + ')').find('.fs15').text();
    price = price.split("Rs.");
    if(price.length>1){
      price = price[1];
    }
    else {
      price = price[0];
    }
    arrayToSend.push([PID, prod, image, price]);
  }

var slider = $('#qa-recently-viewed').find('li');
  var sliderLength = slider.length;
  for(i=0;i<sliderLength;i++){
    var link = $('#qa-recently-viewed').find('li:eq(' + i + ')').find("a:eq(0)").attr("href");
    if(link != undefined){
    link = link.split(".html")[0];
    link = link.split("-");
    PID = link[link.length-1];
    var brand = $('#qa-recently-viewed').find('li:eq(' + i + ')').find('.title:eq(0)').text();
    if(brand != undefined){
      brand = brand.trim();
    }
    else {
      brand = "";
    }
    var name = $('#qa-recently-viewed').find('li:eq(' + i + ')').find('.fsll:eq(0)').text();
    if(name != undefined){
      name = name.trim();
    }
    else {
      name = "";
    }
    var prod = brand + " " + name;
    prod = prod.trim();
    var image = $('#qa-recently-viewed').find('li:eq(' + i + ')').find('img').attr("src");
    if(image == undefined){
      image = $('#qa-recently-viewed').find('li:eq(' + i + ')').find('img').attr("data-src-onclick");
    }
    var price = $('#qa-recently-viewed').find('li:eq(' + i + ')').find('.price').text();

    price = price.split("Rs.");
    price = price[price.length-1];
    price = parseFloat(price);
    arrayToSend.push([PID, prod, image, price]);
     }
  }
  
var slider = $('#mostPopular').find('li');
  var sliderLength = slider.length;
  for(i=0;i<sliderLength;i++){
    var link = $('#mostPopular').find('li:eq(' + i + ')').find("a:eq(0)").attr("href");
    link = link.split(".html")[0];
    link = link.split("-");
    PID = link[link.length-1];
    var brand = $('#mostPopular').find('li:eq(' + i + ')').find('.c999:eq(0)').text();
    if(brand != undefined){
      brand = brand.trim();
    }
    else {
      brand = "";
    }
    var name = $('#mostPopular').find('li:eq(' + i + ')').find('.c999:eq(1)').text();
    if(name != undefined){
      name = name.trim();
    }
    else {
      name = "";
    }
    var prod = brand + " " + name;
    prod = prod.trim();
    var image = $('#mostPopular').find('li:eq(' + i + ')').find('img').attr("src");
    if(image == undefined){
      image = $('#mostPopular').find('li:eq(' + i + ')').find('img').attr("data-src-onclick");
    }
    var price = $('#mostPopular').find('li:eq(' + i + ')').find('.price').text();

    price = price.split("Rs.");
    price = price[price.length-1];
    price = parseFloat(price);
    arrayToSend.push([PID, prod, image, price]);
  }

var slider = $('#productsCatalog').find('li');
  var sliderLength = slider.length;
  for(i=0;i<sliderLength;i++){
    var link = $('#productsCatalog').find('li:eq(' + i + ')').attr("data-url");
    link = link.split(".html")[0];
    link = link.split("-");
    PID = link[link.length-1];
    var brand = $('#productsCatalog').find('li:eq(' + i + ')').find('.qa-brandName').text();
    if(brand != undefined){
      brand = brand.trim();
    }
    else {
      brand = "";
    }
    var name = $('#productsCatalog').find('li:eq(' + i + ')').find('.qa-brandTitle').text();
    if(name != undefined){
      name = name.trim();
    }
    else {
      name = "";
    }
    var prod = brand + " " + name;
    prod = prod.trim();
    var image = $('#productsCatalog').find('li:eq(' + i + ')').find('span:eq(0)').find('span:eq(0)').attr("id");
    var price = $('#productsCatalog').find('li:eq(' + i + ')').find('.price').text();

    price = price.split("Rs.");
    price = price[price.length-1];
    price = parseFloat(price);
    arrayToSend.push([PID, prod, image, price]);
  }
 
  var slider = $('#new-recomm-slider').find('li');
  var sliderLength = slider.length;
  for(i=0;i<sliderLength;i++){
    var link = $('#new-recomm-slider').find('li:eq(' + i + ')').find('a:eq(0)').attr("href");
    link = link.split(".html")[0];
    link = link.split("-");
    PID = link[link.length-1];
    var brand = $('#new-recomm-slider').find('li:eq(' + i + ')').find('.full-width:eq(0)').text().trim();
    var name = $('#new-recomm-slider').find('li:eq(' + i + ')').find('.full-width:eq(1)').text().trim();
    if(brand == undefined){
      brand = "";
    }
    if(name == undefined){
      name = undefined;
    }
    var prod = brand + " " + name;
    prod = prod.trim();
    var image = $('#new-recomm-slider').find('li:eq(' + i + ')').find('img').attr("src");
    if(image == undefined){
      image = $('#new-recomm-slider').find('li:eq(' + i + ')').find('img').attr("data-src-onclick");
    }
    var price = $('#new-recomm-slider').find('li:eq(' + i + ')').find('.price').text();

    price = price.split("Rs.");
    price = price[price.length-1];
    price = price.split(",").join("");
    price = parseFloat(price);
    arrayToSend.push([PID, prod, image, price]);
  }
  arrayToSend = JSON.stringify(arrayToSend);
  //console.log(arrayToSend);
  chrome.runtime.sendMessage({pairsJab: arrayToSend}, function(response) {
    });
  ////console.log(arrayToSend);
}

function sendCurrent(){
 curData = [];
 var prod = "";
 var image = "";
 var myPrice = "";
 var cur_url = "";
 cur_url = window.location.href;
 if(cur_url.split(".html").length>0){
 if($('#before_price').length!=0){
  price = $('#before_price').text().split("Rs.")[1].trim();
}
else {
  a = $('.sp_prd_price_highlight2').html();
  b = a.split('itemprop="price"');
  c = b[1].split(">")[1];
  d = c.split("<")[0];
  price = parseFloat(d);
}

myPrice = price;

if($('#qa-prd-brand').length>0){
  brand = $('#qa-prd-brand').text().trim();
}
else {
  brand = "";
}

if($('#qa-title-product').length>0){
  prodName = $('#qa-title-product').text().trim();
}
else {
  prodName = "";
}

if(brand!=""&&prodName!=""){
  name = brand + " " + prodName;
}
else{
if($('.mb3').length>1){
var name = $('.mb3').text().trim();
}
if($('.brand-name').length>0){
  var brand = $('.brand-name').text().trim();
  name = brand.trim() + " " + $('.mb3').text().trim();
}
}
var prod = name;
var url = window.location.href;
if($('.thumb-slider').length>0){
image = $('.thumb-slider').find('span:eq(0)').attr("data-image-big");
}
else if($('.prd-imageview').length>0){
var image = $('.prd-imageview').find('img:eq(0)').attr("src");
}
else {
  var image = "";
}

curData.push([prod, image, myPrice, url]);
    curData = JSON.stringify(curData);
    //console.log(curData);
    chrome.runtime.sendMessage({curDataJab: curData}, function(response) {
    });


}
}

var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, pollInterval);
window.setTimeout(sendPIDs, pollInterval);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);
window.setTimeout(sendPairs, 20000);

function removeAlert(){
  var currentURL = window.location.href;
  var filterURL = currentURL.split("?ref=")[0];
  filterURL = filterURL.split("#")[0];
  filterURL = filterURL.split("?")[0];
  //console.log("Filtered URL " + filterURL);
  chrome.runtime.sendMessage({detailArray: "haiKya"}, function(response) {
  for(m=0;m<response.farewell.length;m++){
    var url2 = response.farewell[m].link;
    url2 = url2.split("?ref=")[0];
    url2 = url2.split("#")[0];
    url2 = url2.split("?")[0];
    if(url2==filterURL){
      sendId = response.farewell[m].link_id;
      chrome.runtime.sendMessage({removeURL: sendId}, function(response) {
  //console.log("Removal request sent");
    });
    }
  }
}); 
}

flagToDisp = 0; strToDisp = ""; clsToUse = ""; diff = 0;
chrome.runtime.sendMessage({detailArray: "haiKya"}, function(response) {
   arrayRes = response.farewell;
   var currentURL = window.location.href;
   var filterURL = currentURL.split("?ref=")[0];
   filterURL = filterURL.split("#")[0];
   filterURL = filterURL.split("?")[0];

if($('#before_price').length!=0){
  price = $('#before_price').text().split("Rs.")[1].trim();
}
else {
  a = $('.sp_prd_price_highlight2').html();
  b = a.split('itemprop="price"');
  c = b[1].split(">")[1];
  d = c.split("<")[0];
  price = parseFloat(d);
}

myPrice = parseFloat(price);

  for(i=0;i<response.farewell.length;i++){
    var currentURL2 = response.farewell[i].link;
   var filterURL2 = currentURL2.split("?ref=")[0];
   filterURL2 = filterURL2.split("#")[0];
   filterURL2 = filterURL2.split("?")[0];
   //console.log(filterURL , filterURL2);
   if(filterURL2==filterURL || filterURL2 == filterURL + "?" || filterURL2 + "?" == filterURL){
    //console.log("match found");
    if(myPrice!=0){
      response.farewell[i].cur_price = myPrice;
    }
    if(response.farewell[i].price_added >= response.farewell[i].cur_price){
       clsToUse = "dec-hatke";
       diff = response.farewell[i].price_added - response.farewell[i].cur_price;
    }
    else {
       clsToUse = "inc-hatke";
       diff = response.farewell[i].cur_price - response.farewell[i].price_added;
    }
    strToDisp = '<div class="pricealert_hatke"><div class="price_hatke-wrap"><div class="price_hatke-initiated"><span class="price_hatke-type">Set Price:</span><span class="price_hatke-price"><img src="http://compare.buyhatke.com/images/rupeeK.png">' + response.farewell[i].price_added + '</span></div><div class="price_hatke-difference"><span class="price_hatke-type">Price Change:</span><span class="price_hatke-price ' + clsToUse + '"><img class="dec_rupee-hatke" src="http://compare.buyhatke.com/images/rupeeG.png"><img class="inc_rupee-hatke" src="http://compare.buyhatke.com/images/rupeeR.png">' + diff + '<div class="inc_dec-hatke-wrap"><img class="inc_dec-hatke" src="http://compare.buyhatke.com/images/price_change1.png"></div></span></div><a href="javascript:void();" id="removeMe2">Remove</a></div></div><div id="addWatchList"></div>';

    flagToDisp = 1;
    //console.log("Flag " + flagToDisp);
    if(flagToDisp==1){
    if($('#bhWidget').length>0){
    document.getElementById('bhWidget').innerHTML  = strToDisp;
    var button = document.getElementById("removeMe2");
button.addEventListener("click", function(){
  removeAlert();
  document.getElementById('bhWidget').innerHTML = '<div class="line fk-font-12" style="margin-bottom: 4px;">Thank You ! We appreciate your motive to save energy :)</div>';
}, false);
     }
     else {
      $('#AddToCart').before(strToDisp);
      var button = document.getElementById("removeMe2");
button.addEventListener("click", function(){
  removeAlert();
  document.getElementById('bhWidget').innerHTML = '<div class="line fk-font-12" style="margin-bottom: 4px;">Thank You ! We appreciate your motive to save energy :)</div>';
}, false);
     }
    }
   }
  }
  //console.log(response.farewell);
});

function blinker(){
  if (cancel==false) {
  elem1.style.background="linear-gradient(to bottom, #eaefb5 0%,#e1e9a0 100%)";
  elem1.style.borderColor="#6b6";
  setTimeout("elem1.style.background=''", 1200);
  setTimeout("elem1.style.borderColor=''", 1200);
  setTimeout("blinker()",2400);}
  if (cancel==true){elem1.style.backgroundColor="#fbfbfb";elem1.style.borderColor="#ddd";}
}



function addEmailID(email){
  chrome.runtime.sendMessage({addEmail: email}, function(response) {
  //console.log("Email Added");
});
}

  function addToWatchList() {
var myurl = "http://compare.buyhatke.com/addWatchList.php";

if($('#before_price').length!=0){
  price = $('#before_price').text().split("Rs.")[1].trim();
}
else {
  a = $('.sp_prd_price_highlight2').html();
  b = a.split('itemprop="price"');
  c = b[1].split(">")[1];
  d = c.split("<")[0];
  price = parseFloat(d);
}

myPrice = price;

if($('.mb3').length>1){
var name = $('.mb3').text().trim();
}
if($('.brand-name').length>0){
  var brand = $('.brand-name').text().trim();
  name = brand.trim() + " " + $('.mb3').text().trim();
}
var prod = name;
var url = window.location.href;
var filterURL = url.split("?ref=")[0];
   filterURL = filterURL.split("#")[0];
   filterURL = filterURL.split("?")[0];
   url = filterURL;
if($('.thumb-slider').length>0){
image = $('.thumb-slider').find('span:eq(0)').attr("data-image-big");
}
else if($('.prd-imageview').length>0){
var image = $('.prd-imageview').find('img:eq(0)').attr("src");
}
else {
  var image = "";
}
var parameters =  encodeURIComponent(prod) + "~*~*" + myPrice + "~*~*" + encodeURIComponent(image) + "~*~*" + encodeURIComponent(url) + "~*~*9" ;

chrome.runtime.sendMessage({data: parameters}, function(response) {
  //console.log(response.farewell);
});

chrome.runtime.sendMessage({email: "haiKya"}, function(response) {
  //console.log(response.farewell)
  if(response.farewell=="No"){
    var msg = '<div id="addEmailBH"><input id="BhEmail" type="text" value="" style="min-height: 20px;margin-right: 6px;"><input id="BhButton" type="button" value="Enter Email" style="padding: 3px;padding-left: 8px;padding-right: 8px;"><br><div class="line fk-font-12" style="margin-bottom: 4px;">Enter your email if you wanna get a mail when the price drops</div></div>';
    $('#addWatchList').after(msg);
    var button = document.getElementById("BhButton");
button.addEventListener("click", function(){
  addEmailID(document.getElementById('BhEmail').value);
  document.getElementById('addEmailBH').innerHTML = '<div class="line fk-font-12" style="margin-bottom: 4px;">Thank You ! An email has been sent to ' + document.getElementById('BhEmail').value + '. Please verify to start receiving price drop notifications. Do check your <b>SPAM</b> folder !</div>'
}, false);
  }
  else {
    var msg = '<div id="addEmailBH"><div class="line fk-font-12" style="margin-bottom: 4px;">Thank You ! A mail will be sent to ' + response.farewell + ' as soon as price drops. <a href="javascript:void();" id="changeEmail" style="color:blue;">Change Email-ID</a></div></div>';
    $('#addWatchList').after(msg);
        var button = document.getElementById("changeEmail");
button.addEventListener("click", function(){
  document.getElementById('addEmailBH').innerHTML = '<div id="addEmailBH"><input id="BhEmail" type="text" value="" style="min-height: 20px;margin-right: 6px;"><input id="BhButton" type="button" value="Enter Email" style="padding: 3px;padding-left: 8px;padding-right: 8px;"><br><div class="line fk-font-12" style="margin-bottom: 4px;">Enter your email if you wanna get a mail when the price drops</div></div>';
  var button = document.getElementById("BhButton");
button.addEventListener("click", function(){
  addEmailID(document.getElementById('BhEmail').value);
  document.getElementById('addEmailBH').innerHTML = '<div class="line fk-font-12" style="margin-bottom: 4px;">Thank You ! An email has been sent to ' + document.getElementById('BhEmail').value + '. Please verify to start receiving price drop notifications. Do check your <b>SPAM</b> folder !</div>'
  
}, false);
}, false);
  }
});

document.getElementById('bhWidget').innerHTML = '<div class="pricealert_hatke"><div class="price_hatke-wrap"><div class="price_hatke-initiated"><span class="price_hatke-type">Set Price:</span><span class="price_hatke-price"><img src="http://compare.buyhatke.com/images/rupeeK.png">' + myPrice + '</span></div><div class="price_hatke-difference"><span class="price_hatke-type">Price Change:</span><span class="price_hatke-price dec-hatke"><img class="dec_rupee-hatke" src="http://compare.buyhatke.com/images/rupeeG.png"><img class="inc_rupee-hatke" src="http://compare.buyhatke.com/images/rupeeR.png">0<div class="inc_dec-hatke-wrap"><img class="inc_dec-hatke" src="http://compare.buyhatke.com/images/price_change1.png"></div></span></div><a href="javascript:void();" id="removeMe2">Remove</a></div></div><div id="addWatchList"></div>';
var button = document.getElementById("removeMe2");
button.addEventListener("click", function(){
  removeAlert();
  document.getElementById('bhWidget').innerHTML = '<div class="line fk-font-12" style="margin-bottom: 4px;">Thank You ! We appreciate your motive to save energy :)</div>';
}, false);

}



if($('.mb3').length>1){
var name = $('.mb3').text().trim();
}
if($('.brand-name').length>0){
  var brand = $('.brand-name').text().trim();
  name = brand.trim() + " " + $('.mb3').text().trim();
}
var nameS = name.split("/").join("");
nameS = nameS.split("(")[0];
origProd = nameS;
var nameS = nameS.split(" ");
if(nameS.length<6){
name = nameS.join("-");
 }
 else {
 	name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3] + "-" + nameS[4] + "-" + nameS[5];
 }

var url = "http://compare.buyhatke.com/products/" + name;
var imgURL = chrome.extension.getURL("jabong.png");
var imgURL2 = chrome.extension.getURL("watch-price1.png");

if($('#AddToCart').length>0){
  if(flagToDisp==0){
$('#AddToCart').before('<div id="bhWidget"><a id="addWatchList" style="margin-top: 10px;margin-left:-10px;" alt="Add to Watch List" title="Add to BuyHatke Watch List and get notifications on price drop" href="javascript:void();" class="fk-inline-block buy-btn fksk-buy-btn"><img src=' + imgURL2 +'></a></div>');

var button = document.getElementById("addWatchList");
button.addEventListener("click", function(){
  addToWatchList();
}, false);
}
else {

}
}

$('#AddToCart').after('<a title="Compare price via Compare Hatke" target="_blank" href=' + url + '><img src="' + imgURL + '"></a>');
if($('#before_price').length!=0){
	price = $('#before_price').text().split("Rs.")[1].trim();
}
else {
	a = $('.sp_prd_price_highlight2').html();
	b = a.split('itemprop="price"');
	c = b[1].split(">")[1];
	d = c.split("<")[0];
	price = parseFloat(d);
}
var final2send = url.split("products/");
var msgToSend = final2send[1] + "~*~*" + price;
//console.log(msgToSend);
msgToSend = msgToSend + "moreData=";
chrome.runtime.sendMessage({search: msgToSend}, function(response) {
    });



chrome.runtime.onMessage.addListener(
 function(request, sender) {
  var message = request.results;
  var results = JSON.parse(message);
  results.sort(compare);
  var origPrice = price;
  console.log(origProd);
  var countArray = Array();
  for (var i = 0; i <= results.length - 1; i++) {
    var current = results[i].prod;
    countArray[i] = 0;
    currentArray = origProd.split(" ");
    var totalLen = currentArray.length;
    for(var k=0; k< currentArray.length; k++){
      if(current.toUpperCase().indexOf(currentArray[k].toUpperCase())!=-1){
        countArray[i] = countArray[i] + 1;
      }
    }
    results[i].score = countArray[i];
    console.log(results[i].prod + " " + results[i].price + " " + countArray[i]);
  }
  indexSelected = 0; notFound = 1;
  for(k=0; k< results.length; k++){
    if(results[k].score/totalLen > .5){
      indexSelected = k;
      notFound = 0;
      break;
    }
  }

  console.log(" Final product " + results[indexSelected].prod + " " + results[indexSelected].price);

if(results[indexSelected].position==1){
class_assigned = "class_ebay";
image_var = "images/ebay2.png";
siteName2 = "Ebay";
if(results[indexSelected].link.split("rover").length==1){
 results[indexSelected]["link"]= "http://rover.ebay.com/rover/1/4686-127726-2357-24/2?&site=Partnership_MSP&mpre=" + encodeURIComponent(results[indexSelected]["link"]);
}
}
else if(results[indexSelected].position==35){
class_assigned = "class_ebay";
image_var = "images/yebhi1.png";
siteName2 = "Yebhi";
}
else if(results[indexSelected].position==63){
class_assigned = "class_ebay";
image_var = "images/amazon.png";
siteName2 = "Amazon";
}
else if(results[indexSelected].position==30){
class_assigned = "class_ebay";
image_var = "images/indiaplaza1.png";
siteName2 = "Indiaplaza";
}
else if(results[indexSelected].position==31){
class_assigned = "class_ebay";
image_var = "images/bookadda1.png";
siteName2 = "Bookadda";
}
else if(results[indexSelected].position==129){
class_assigned = "class_ebay";
image_var = "images/snapdeal.png";
siteName2 = "Snapdeal";
}
else if(results[indexSelected].position==50){
class_assigned = "class_ebay";
image_var = "images/jabong1.png";
siteName2 = "Ebay";
}
else if(results[indexSelected].position==45){
class_assigned = "class_ebay";
image_var = "images/shpstop1.png";
siteName2 = "ShoppersStop";
}
else if(results[indexSelected].position==929){
class_assigned = "class_ebay";
image_var = "images/by.png";
siteName2 = "BabyOye";
}
else if(results[indexSelected].position==911){
class_assigned = "class_ebay";
image_var = "images/strawberrynet.png";
siteName2 = "StrawBerryNet";
}
else if(results[indexSelected].position==939){
class_assigned = "class_ebay";
image_var = "images/hb.png";
siteName2 = "Hushbabies";
}
else if(results[indexSelected].position==921){
class_assigned = "class_ebay";
image_var = "images/hk.png";
siteName2 = "Healthkart";
}
else if(results[indexSelected].position==62){
class_assigned = "class_ebay";
image_var = "images/indiarush.png";
siteName2 = "IndiaRush";
}
else if(results[indexSelected].position==2){
class_assigned = "class_flip";
image_var = "images/flipkart1.png";
siteName2 = "Flipkart";
}
else if(results[indexSelected].position==99){
class_assigned = "class_naap";
image_var = "images/infibeam2.png";
results[indexSelected].prod = (results[indexSelected].prod);
siteName2 = "Infibeam";
}
else if(results[indexSelected].position==4){
class_assigned = "class_naap";
image_var = "images/homeshop181.png";
siteName2 = "HomeShop18";
}
else if(results[indexSelected].position==7){
class_assigned = "class_naap";
image_var = "images/landmark1.png";
siteName2 = "Landmark";
}
else if(results[indexSelected].position==13){
class_assigned = "class_naap";
image_var = "images/tradus2.png";
siteName2 = "Tradus";

}
else if(results[indexSelected].position==22){
class_assigned = "class_naap";
image_var = "images/koovs1.png";
siteName2 = "Koovs";
}
else if(results[indexSelected].position==333){
class_assigned = "class_naap";
image_var = "images/pepperfry1.png";
siteName2 = "Pepperfry";
}
else if(results[indexSelected].position==11){
class_assigned = "class_naap";
image_var = "images/fnp1.png";
siteName2 = "Flowers n Petals";
}
else if(results[indexSelected].position==5){
class_assigned = "class_naap";
image_var = "images/futurebazaar1.png";
siteName2 = "FutureBazaar";
}
else if(results[indexSelected].position==98){
class_assigned = "class_naap";
image_var = "images/fashionara.png";
siteName2 = "Fashionara";
}
else if(results[indexSelected].position==111){
class_assigned = "class_naap";
image_var = "images/myntra2.png";
siteName2 = "Myntra";
}
else if(results[indexSelected].position==411){
class_assigned = "class_naap";
image_var = "images/grabmore.png";
siteName2 = "GrabMore";
}
else if(results[indexSelected].position==421){
class_assigned = "class_naap";
image_var = "images/shopclues.png";
siteName2 = "ShopClues";
}
else if(results[indexSelected].position==441){
class_assigned = "class_naap";
image_var = "images/naaptol.png";
siteName2 = "Naaptol";
}
else if(results[indexSelected].position==471){
class_assigned = "class_naap";
image_var = "images/crossword.png";
siteName2 = "Crossword";
}
else if(results[indexSelected].position==461){
class_assigned = "class_naap";
image_var = "images/magmall.png";
siteName2 = "Magazine Mall";
}
else if(results[indexSelected].position==91){
class_assigned = "class_naap";
image_var = "images/floralis.png";
siteName2 = "Ebay";
}
else if(results[indexSelected].position==401){
class_assigned = "class_naap";
image_var = "images/indtimesshopping.png";
siteName2 = "IndiaTimes Shopping";
}
else if(results[indexSelected].position==393){
class_assigned = "class_naap";
image_var = "images/adexmart.png";
siteName2 = "Adexmart";
}
else if(results[indexSelected].position==373){
class_assigned = "class_naap";
image_var = "images/phoolwala.png";
siteName2 = "PhoolWala";
}
else if(results[indexSelected].position==73){
class_assigned = "class_naap";
image_var = "images/goodlife.png";
siteName2 = "GoodLife";
}
else if(results[indexSelected].position==37){
class_assigned = "class_naap";
image_var = "images/jewelkart.jpg";
siteName2 = "JewelsKart";
}
else if(results[indexSelected].position==57){
class_assigned = "class_naap";
image_var = "images/lenskart.jpg";
siteName2 = "LensKart";
}
else if(results[indexSelected].position==47){
class_assigned = "class_naap";
image_var = "images/bagskart.jpg";
siteName2 = "BagsKart";
}
else if(results[indexSelected].position==67){
class_assigned = "class_naap";
image_var = "images/watch.jpeg";
siteName2 = "WatchKart";
}
else if(results[indexSelected].position==69){
class_assigned = "class_naap";
image_var = "images/next.png";
siteName2 = "Next.co.in";
}
else if(results[indexSelected].position==71){
class_assigned = "class_naap";
image_var = "images/croma.png";
siteName2 = "CromaRetail";
}
else if(results[indexSelected].position==412){
class_assigned = "class_naap";
image_var = "images/craftsvilla.png";
siteName2 = "Craftsvilla";
}
else if(results[indexSelected].position==469){
class_assigned = "class_naap";
image_var = "images/cilory.png";
siteName2 = "Cilory";
}
else if(results[indexSelected].position==429){
class_assigned = "class_naap";
image_var = "images/zivame.png";
siteName2 = "Zivame";
}

string = '<div id="dd_menu_list"><ul>';

for(i=0;i<results.length;i++){

if(results[i].position==1){
class_assigned = "class_ebay";
image_name = "http://compare.buyhatke.com/images/ebay2.png";
siteName = "Ebay";
if(results[i].link.split("rover").length==1){
 results[i]["link"]= "http://rover.ebay.com/rover/1/4686-127726-2357-24/2?&site=Partnership_MSP&mpre=" + encodeURIComponent(results[i]["link"]);
}
}
else if(results[i].position==35){
class_assigned = "class_ebay";
image_name = "http://compare.buyhatke.com/images/yebhi1.png";
siteName = "Yebhi";
}
else if(results[i].position==63){
class_assigned = "class_ebay";
image_name = "http://compare.buyhatke.com/images/amazon.png";
siteName = "Amazon";
}
else if(results[i].position==30){
class_assigned = "class_ebay";
image_name = "http://compare.buyhatke.com/images/indiaplaza1.png";
siteName = "Indiaplaza";
}
else if(results[i].position==31){
class_assigned = "class_ebay";
image_name = "http://compare.buyhatke.com/images/bookadda1.png";
siteName = "Bookadda";
}
else if(results[i].position==129){
class_assigned = "class_ebay";
image_name = "http://compare.buyhatke.com/images/snapdeal.png";
siteName = "Snapdeal";
}
else if(results[i].position==50){
class_assigned = "class_ebay";
image_name = "http://compare.buyhatke.com/images/jabong1.png";
siteName = "Ebay";
}
else if(results[i].position==45){
class_assigned = "class_ebay";
image_name = "http://compare.buyhatke.com/images/shpstop1.png";
siteName = "ShoppersStop";
}
else if(results[i].position==929){
class_assigned = "class_ebay";
image_name = "http://compare.buyhatke.com/images/by.png";
siteName = "BabyOye";
}
else if(results[i].position==911){
class_assigned = "class_ebay";
image_name = "http://compare.buyhatke.com/images/strawberrynet.png";
siteName = "StrawBerryNet";
}
else if(results[i].position==939){
class_assigned = "class_ebay";
image_name = "http://compare.buyhatke.com/images/hb.png";
siteName = "Hushbabies";
}
else if(results[i].position==921){
class_assigned = "class_ebay";
image_name = "http://compare.buyhatke.com/images/hk.png";
siteName = "Healthkart";
}
else if(results[i].position==62){
class_assigned = "class_ebay";
image_name = "http://compare.buyhatke.com/images/indiarush.png";
siteName = "IndiaRush";
}
else if(results[i].position==2){
class_assigned = "class_flip";
image_name = "http://compare.buyhatke.com/images/flipkart1.png";
siteName = "Flipkart";
}
else if(results[i].position==99){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/infibeam2.png";
results[i].prod = (results[i].prod);
siteName = "Infibeam";
}
else if(results[i].position==4){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/homeshop181.png";
siteName = "HomeShop18";
}
else if(results[i].position==7){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/landmark1.png";
siteName = "Landmark";
}
else if(results[i].position==13){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/tradus2.png";
siteName = "Tradus";

}
else if(results[i].position==22){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/koovs1.png";
siteName = "Koovs";
}
else if(results[i].position==333){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/pepperfry1.png";
siteName = "Pepperfry";
}
else if(results[i].position==11){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/fnp1.png";
siteName = "Flowers n Petals";
}
else if(results[i].position==5){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/futurebazaar1.png";
siteName = "FutureBazaar";
}
else if(results[i].position==98){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/fashionara.png";
siteName = "Fashionara";
}
else if(results[i].position==111){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/myntra2.png";
siteName = "Myntra";
}
else if(results[i].position==411){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/grabmore.png";
siteName = "GrabMore";
}
else if(results[i].position==421){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/shopclues.png";
siteName = "ShopClues";
}
else if(results[i].position==441){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/naaptol.png";
siteName = "Naaptol";
}
else if(results[i].position==471){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/crossword.png";
siteName = "Crossword";
}
else if(results[i].position==461){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/magmall.png";
siteName = "Magazine Mall";
}
else if(results[i].position==91){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/floralis.png";
siteName = "Ebay";
}
else if(results[i].position==401){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/indtimesshopping.png";
siteName = "IndiaTimes Shopping";
}
else if(results[i].position==393){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/adexmart.png";
siteName = "Adexmart";
}
else if(results[i].position==373){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/phoolwala.png";
siteName = "PhoolWala";
}
else if(results[i].position==73){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/goodlife.png";
siteName = "GoodLife";
}
else if(results[i].position==37){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/jewelkart.jpg";
siteName = "JewelsKart";
}
else if(results[i].position==57){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/lenskart.jpg";
siteName = "LensKart";
}
else if(results[i].position==47){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/bagskart.jpg";
siteName = "BagsKart";
}
else if(results[i].position==67){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/watch.jpeg";
siteName = "WatchKart";
}
else if(results[i].position==69){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/next.png";
siteName = "Next.co.in";
}
else if(results[i].position==71){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/croma.png";
siteName = "CromaRetail";
}
else if(results[i].position==412){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/craftsvilla.png";
siteName = "Craftsvilla";
}
else if(results[i].position==469){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/cilory.png";
siteName = "Cilory";
}
else if(results[i].position==429){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/zivame.png";
siteName = "Zivame";
}

  string = string + '<li><a target="_blank" href="' + results[i].link + '"><div class="itemWrap"><div class="imageDiv_wrap"><div class="imageDiv"><img src="' + results[i].image + '"></div></div><div class="prod_right"><div class="prodName">' + results[i].prod + '</div><div class="storeRow"><div class="prodPrice"><img src="http://compare.buyhatke.com/images/rupeeK.png">' + results[i].price + '</div><div class="prodStore"><img src="' + image_name + '"></div></div></div></div></a></li>';
}

string = string + '</ul></div>';

string2 = '<footer><div id="dd_menu_footer"><iframe src="http://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FBuyHatke&width=450&height=35&colorscheme=light&layout=standard&action=like&show_faces=false&send=false&appId=205177396285577" scrolling="no" frameborder="0" style="border: none;overflow: hidden;width: 230px;height: 30px;float: left;" allowTransparency="true"></iframe> <a href="mailto:wecare@buyhatke.com">Send Feedback</a></div></footer></div></div><div id="share_buttons">Share: <a class="dd_share_buttons" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fextension.buyhatke.com" target="_blank"><img src="http://compare.buyhatke.com/images/fbs.png"></a><a class="dd_share_buttons" href="https://plus.google.com/share?url=http%3A%2F%2Fextension.buyhatke.com" target="_blank"><img src="https://www.gstatic.com/images/icons/gplus-32.png" alt="Share on Google+"/></a><a class="dd_share_buttons" href="http://twitter.com/home?status=Try the amazing CompareHatke Chrome Extension!+http%3A%2F%2Fextension.buyhatke.com" target="_blank"><img src="http://compare.buyhatke.com/images/tweet.png"></a></div></div><a href="#" id="detailClose" onclick="removeAll();return false;">x</a></div></div>';

if(parseInt(results[indexSelected].price)<=parseInt(origPrice)&&notFound==0&&document.getElementById('detailOutWrap') == null) {

   $('body').before('<div id="detailOutWrap"><div id="detailInWrap"><a target="_blank" href="http://compare.buyhatke.com" title="Visit Buyhatke"><img id="details_logo" src="http://compare.buyhatke.com/images/logo_small.png"></a><div id="details">Hurray !  Similar products available at  <span id="detail_cost"><img src="http://compare.buyhatke.com/images/rupeeK.png"> ' + results[indexSelected].price + '</span> at <span id="detail_store">' + siteName2 + '</span><a style="display:inline!important;" href="' + results[indexSelected].link + '" target="_blank"><input type="button" value=" BUY IT NOW" ></a>or<div class="drop_down" id="compare_now" onmouseover="cancel=true;">RECOMMENDATIONS<div class="drop_down_symbol"></div><div id="dd_menu"><head><div id="dd_menu_header">Showing <span>' + results.length + '</span> results</div></head>' + string + string2);
   $('body').css("margin-top", "65px");
  $("#dd_menu_list").hover(
  function() {
    msg2 = "Results Viewed";
  var port = chrome.runtime.connect({name: "knockknock"});
  port.postMessage({joke: "Knock knock"});
  port.onMessage.addListener(function(msg) {
  if (msg.question == "Product-name")
    port.postMessage({answer: msgToSend});
   });
  }, function() {
  }
);


var button = document.getElementById("detailClose");
button.addEventListener("click", function() {
  document.getElementById('detailOutWrap').style.display = "none";
  $('body').css("margin-top", "0px");
}, false);

cancel=false;
elem1=document.getElementById("compare_now");
blinker();


 }

  else if(results.length>0&&document.getElementById('detailOutWrap') == null){

   $('body').before('<div id="detailOutWrap"><div id="detailInWrap"><a target="_blank" href="http://compare.buyhatke.com" title="Visit Buyhatke"><img id="details_logo" src="http://compare.buyhatke.com/images/logo_small.png"></a><div id="details">Hurray !  Other variants for this product is available for <span id="detail_cost"><img src="http://compare.buyhatke.com/images/rupeeK.png"> ' + results[indexSelected].price + '</span> at <span id="detail_store">' + siteName2 + '</span><a style="display:inline!important;" href="' + results[indexSelected].link + '" target="_blank"><input type="button" value=" BUY IT NOW" ></a>or<div class="drop_down" id="compare_now" onmouseover="cancel=true;">RECOMMENDATIONS<div class="drop_down_symbol"></div><div id="dd_menu"><head><div id="dd_menu_header">Showing <span>' + results.length + '</span> results</div></head>' + string + string2);
   $('body').css("margin-top", "65px");
  $("#dd_menu_list").hover(
  function() {
    msg2 = "Results Viewed";
  var port = chrome.runtime.connect({name: "knockknock"});
  port.postMessage({joke: "Knock knock"});
  port.onMessage.addListener(function(msg) {
  if (msg.question == "Product-name")
    port.postMessage({answer: msgToSend});
   });
  }, function() {
  }
);


var button = document.getElementById("detailClose");
button.addEventListener("click", function() {
  document.getElementById('detailOutWrap').style.display = "none";
  $('body').css("margin-top", "0px");
}, false);

cancel=false;
elem1=document.getElementById("compare_now");
blinker();


 }

 else if(document.getElementById('detailOutWrap') == null){

   $('body').before('<div id="detailOutWrap"><div id="detailInWrap"><div id="details">Hurray !  Massive savings found. Click to know more <a href="' + url + '" target="_blank"><input type="button" value=" COMPARE PRICES"></a><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fextension.buyhatke.com" id="notify_fshare"></a></div><a href="#" id="detailClose" >x</a></div></div>');
   $('body').css("margin-top", "65px");
  


var button = document.getElementById("detailClose");
button.addEventListener("click", function() {
  document.getElementById('detailOutWrap').style.display = "none";
  $('body').css("margin-top", "0px");
}, false);

 }

  });