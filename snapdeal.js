savingsArray = [];
coupArray = [];
bestCouponFound = 0;
function compare(a,b) {
  if (parseInt(a.price) < parseInt(b.price))
     return -1;
  if (parseInt(a.price) > parseInt(b.price))
    return 1;
  return 0;
}

function removeTags(length2){
  //////console.log("Called with " + length2);
  $('tspan:eq(' + length2 + ')').css("display", "none");
}

function getXMLHTTPRequest() {

  req = new XMLHttpRequest();
  return req;

}

function reportPurchase(){
  var curURL = window.location.href;
  if(curURL.split('snapdeal.com/checkout').length>1 || curURL.split('snapdeal.com/quickBuy').length>1){
    chrome.runtime.sendMessage({processDONE: "SnapDeal"}, function(response) {
    });
  }
}

reportPurchase();

function plotGraph(pid){
  //console.log("Called with PID " + pid);
  var httpq4 = new getXMLHTTPRequest();
  var ext_id, ext_auth;
  chrome.runtime.sendMessage({ext_id: "value"}, function(response) {
    ext_id = response.farewell.split("~")[0];
    ext_auth = response.farewell.split("~")[1];
    var myurl = "http://compare.buyhatke.com/extension/getPredictedData.php";
var parameters = "ext_id=" + ext_id + "&auth_val=" + ext_auth + "&pid=" + pid + "&web=snapdeal";
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

$(function () {
  //////console.log(dataString);
    $('#container2').highcharts({
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Should I purchase ' + $('.productTitle').find('h1').text() + " now ?"
      },
      subtitle: {
        text: 'Price Variance of ' + $('.productTitle').find('h1').text() + " at SnapDeal"
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
              name: 'SnapDeal Price',
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
    var randNo = Math.floor((Math.random() * 10) + 1);
    if(randNo%2==0){
      var csURL = chrome.extension.getURL("lap.png");
      var link_t = "http://buyhatke.com/flipKart-Buyhatke-Exc-Laptops";
    }
    else {
      var csURL = chrome.extension.getURL("tv.png");
      var link_t = "http://buyhatke.com/flipKart-Buyhatke-Exc-TVs";
    }

$('#buyMultiVendorBoxCont').after('<div id="container" style=" min-width: 880px; max-width: 960px; height: 650px; margin: 0 auto; position: relative;"><div id="chart-logo" style="position: absolute;bottom: 10px;right: 0;font-size: 13px;z-index: 1">Price Chart Powered by<a target="_blank" href="http://compare.buyhatke.com?utm_source=graph" style="color: #0db2db;"><img src="http://compare.buyhatke.com/images/logo-mini.png" style="vertical-align: middle;margin-left: 5px;margin-top: -6px;"></a></div><div id="container2"></div><div id="container3"></div><div id="container4" style="padding: 10px;font-family: Open Sans, Arial, Helvetica, sans-serif;"><a href="http://buyh.tk/16" target="_blank" style="font-size: 13px;text-decoration: none;color: #0d99aa;margin-right: 32px;"><img src="http://compare.buyhatke.com/images/bug-icon.png" style="vertical-align: bottom;height: 15px;top: -2px;position: relative;">Report A Bug</a><a href="http://buyh.tk/16" target="_blank" style="font-size: 13px;text-decoration: none;color: #0d99aa;margin-right: 32px;"><img src="http://compare.buyhatke.com/images/bulb-icon.png" style="vertical-align: bottom;height: 16px;top: -2px;position: relative;">Suggest Us Something</a><a href="http://buyh.tk/r5" target="_blank" style="font-size: 13px;text-decoration: none;color: #0d99aa;margin-right: 32px;"><img src="http://compare.buyhatke.com/images/star-icon.png" style="vertical-align: bottom;height: 16px;top: -2px;position: relative;">Rate Us</a></div></div> ');

pidFlipkart = window.location.href;
pidFlipkart = pidFlipkart.split("?")[0];
pidFlipkart = pidFlipkart.split("#")[0];
pidFlipkart = pidFlipkart.split("/");
pidFlipkart = pidFlipkart[pidFlipkart.length-1];
pidFlipkart = parseFloat(pidFlipkart);

if(pidFlipkart!=0){
plotGraph(pidFlipkart);
}

function sendPIDs(){
linkList =  $('body').html();
pidList = "";
linkList = linkList.split('/product/');
for(k=1;k<linkList.length;k++){
  linkTemp = linkList[k].split('/');
  linkTemp = linkTemp[1]; 
  linkTemp = linkTemp.split("\\")[0];
  linkTemp = linkTemp.split('"')[0];
  linkTemp = linkTemp.split('?')[0];
  linkTemp = linkTemp.split(";")[0];
  linkCheck = parseFloat(linkTemp.trim());
  if(linkCheck!=0 && linkTemp.length>5 && linkTemp.length < 13){
  ////console.log(linkTemp);
  pidList = pidList + linkTemp + "~";
   }
}
////console.log(pidList);
  chrome.runtime.sendMessage({pidsSnap: pidList}, function(response) {
    });
}

function sendPairs(){
  arrayToSend = [];
  var slider = $('a');
  var sliderLength = slider.length;
  for(i=0;i<sliderLength;i++){
    validCheck = $('a:eq(' + i + ')').find('.similar-deal-price').length;
    if(validCheck>0){
      var url = $('a:eq(' + i + ')').attr("href");
      var price = $('a:eq(' + i + ')').find('.similar-deal-price').text();
      if(url != undefined){
      url = url.split("/");
      PID = url[url.length-1];
      PID = PID.split("?")[0];
      price = price.split("Rs");
      price = price[price.length-1];
      price = price.trim();
      price = parseFloat(price);
      arrayToSend.push([PID, price]);
       }
    }
  }

  for(i=0;i<sliderLength;i++){
    validCheck = $('a:eq(' + i + ')').find('.product_price').length;
    if(validCheck>0){
      var url = $('a:eq(' + i + ')').attr("href");
      var price = $('a:eq(' + i + ')').find('.product_price').text();
      if(url != undefined){
      url = url.split("/");
      PID = url[url.length-1];
      PID = PID.split("?")[0];
      price = price.split("Rs");
      price = price[price.length-1];
      price = price.trim();
      price = parseFloat(price);
      arrayToSend.push([PID, price]);
       }
    }
  }

  arrayToSend = JSON.stringify(arrayToSend);
  chrome.runtime.sendMessage({pairsSnap: arrayToSend}, function(response) {
    });
}


function sendCurrent(){
 curData = [];
 var prod = "";
 var image = "";
 var myPrice = "";
 var cur_url = "";
 myPrice = parseFloat($('.redText').text().split("Rs")[1].trim().split(",").join(""));


  if($('.productTitle').find('h1').length>0){
    prod = $('.productTitle').find('h1').text();
    cur_url = window.location.href;
    if($('.active-slider').length>0){
     image = $('.active-slider').find('img').attr("src");
    }
    else {
     image = "";
    }
    cur_url = window.location.href;
    curData.push([prod, image, myPrice, cur_url]);
    curData = JSON.stringify(curData);
    //console.log(curData);
    chrome.runtime.sendMessage({curDataSnap: curData}, function(response) {
    });
  }
}

var pollInterval = 1000 * 15;
window.setTimeout(sendPIDs, pollInterval);
window.setTimeout(sendCurrent, pollInterval);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);
window.setTimeout(sendPairs, 20000);

flagCoupon = [];
for(var i=0;i < 200; i++){
  flagCoupon[i] = 2;
}

function changeFlag(i, coupon){
    flagCoupon[i] = 1;
    setTimeout(function(){postProcessor(coupon, i);},1000);
}

function changeFlag2(i, coupon){
  flagCoupon[i] = 0;
}

function removeCompletely(){
}

function postProcessor(coupon, i){
    if($('#promo-code-error').text()!=""){
      savings = 0;
    }
    else {
      savings = 0;
      for(k=0;k<$('.checkPromoWrapper').length;k++){
        savings = savings + parseFloat($('.checkPromoWrapper:eq(' + k + ')').text().split("Rs")[1].trim());
      }
    }
    savings = parseFloat(savings);
    if(savings > $('.hdc-sav-amt').text()){
    var currentSavAmt = parseFloat($('.hdc-sav-amt').text()),
        finalSavAmt = savings;
       $({c: currentSavAmt}).animate({c: finalSavAmt}, {
            step: function(now) {
                $('.hdc-sav-amt').text(Math.round(now))
            },
            duration: 1000,
            easing: "linear"
        });
    }
    //console.log("Savings for " + coupon + " is " + savings);
    savingsArray[i] = savings;
    setTimeout(function(){changeFlag2(i, coupon);},1000);
}

function preProcessor(i, coupon){
  $('#promocode-input').val(coupon);
  $('.promo-apply').click();
  //console.log("Coupon Code applied " + coupon);
  setTimeout(function(){changeFlag(i, coupon);},1000);
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
    setTimeout(function(){temp(coupon, i, lenArray);},1000);
  }
}

function endProcess(i){
  //console.log("called with " + i);
  if(flagCoupon[i]==0){
//console.log("Process terminated");
max = -111111;
ind_req = 1000;
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
            duration: 1000,
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
    setTimeout(function(){endProcess(i);},1000);
  }
}

function applyCoupons(coupons){
 couponsArray = coupons.split("~");
 var savings = [];
 for(var i=0;i<couponsArray.length;i++){
  if(couponsArray[i]!=""&&couponsArray[i]!=" "){

    var cur = couponsArray[i];
    coupArray[i] = cur;
    temp(cur, i, couponsArray.length-1);
  }
 }
 endProcess(couponsArray.length-2);
}

function getCoupons(){
for(var i=0;i < 200; i++){
  flagCoupon[i] = 2;
}
bestCouponFound = 0;
$('.hatke-discount-cover:eq(0)').css("display", "block");
  var httpq4 = new getXMLHTTPRequest();
  var ext_id, ext_auth;
  chrome.runtime.sendMessage({ext_id: "value"}, function(response) {
    ext_id = response.farewell.split("~")[0];
    ext_auth = response.farewell.split("~")[1];
    var myurl = "http://compare.buyhatke.com/extension/getCoupons.php";
var parameters = "ext_id=" + ext_id + "&auth_val=" + ext_auth + "&pos=3";
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
if(curURL.split('snapdeal.com/checkout').length>1){
  var imgURL = chrome.extension.getURL("apply-coupon.png");
  //console.log("TEst passed");
  if($('.checkout-cart-con').length>0){
  $('.checkout-cart-con:eq(0)').after("<a id='couponClick' href='javascript:void();'><img style='margin-left:65px;' src='" + imgURL + "'></a>");
  addToDOM();
  var button = document.getElementById("couponClick");
  button.addEventListener("click", function(){
  getCoupons();
}, false);
}
else {
  setTimeout(function(){couponCheck();},1000);
}
 }

}

couponCheck();


function removeAlert(){
  var currentURL = window.location.href;
  var filterURL = currentURL.split("?pos=")[0];
  filterURL = filterURL.split("pos=")[0];
  //console.log("Filtered URL " + filterURL);
  chrome.runtime.sendMessage({detailArray: "haiKya"}, function(response) {
  for(m=0;m<response.farewell.length;m++){
    var url2 = response.farewell[m].link;
    url2 = url2.split("?pos=")[0];
    url2 = url2.split("pos=")[0];
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
   var filterURL = currentURL.split("?pos=")[0];
   filterURL = filterURL.split("pos=")[0];
   filterURL = filterURL.split("?")[0];
myPrice = parseFloat($('.redText').text().split("Rs")[1].trim().split(",").join(""));
  for(i=0;i<response.farewell.length;i++){
    var currentURL2 = response.farewell[i].link;
    if(currentURL2.split("&redirect=").length>1){
      filterURL2 = currentURL2.split("&redirect=")[1];
      filterURL2 = filterURL2.split("?pos=")[0];
      filterURL2 = filterURL2.split("pos=")[0];
      filterURL2 = filterURL2.split("?")[0];
    }
    else{
     filterURL2 = currentURL2.split("?pos=")[0];
     filterURL2 = filterURL2.split("pos=")[0];
     filterURL2 = filterURL2.split("?")[0];
    }
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
      $('.prodbuy-button').after(strToDisp);
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

var imgURL2 = chrome.extension.getURL("watch-price1.png");

function addEmailID(email){
  chrome.runtime.sendMessage({addEmail: email}, function(response) {
  //console.log("Email Added");
});
}

  function addToWatchList() {
var myurl = "http://compare.buyhatke.com/addWatchList.php";
myPrice = parseFloat($('.redText').text().split("Rs")[1].trim().split(",").join(""));

var prod = $('.productTitle').find('h1').text();
var url = window.location.href;
var filterURL = url.split("?pos=")[0];
   filterURL = filterURL.split("pos=")[0];
   url = filterURL;
if($('.active-slider').length>0){
var image = $('.active-slider').find('img').attr("src");
}
else {
  var image = "";
}
var parameters =  encodeURIComponent(prod) + "~*~*" + myPrice + "~*~*" + encodeURIComponent(image) + "~*~*" + encodeURIComponent(url) + "~*~*3" ;

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


var title = $('.productTitle').find('h1').text();
title = title.split("(");
title = title[0];
var name = title.trim();
origProd = name;
var name2 = name.split("'s");
name = name2.join("");
var nameS = name.split(" ");
if(nameS.length<7){
 name = nameS.join("-");
 }
 else {
 	name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3] + "-" + nameS[4] + "-" + nameS[5] + "-" + nameS[6];
 }
var url = "http://compare.buyhatke.com/products/" + name;
var imgURL = chrome.extension.getURL("snapdeal.png");

$('.prodbuy-button').after('<a target="_blank" href=' + url + ' ><img style="margin-left: 11px;" src=' + imgURL +' title="Compare via Compare Hatke"></a>');
//console.log("Flag2 " + flagToDisp);
if($('.prodbuy-button').length>0){
  if(flagToDisp==0){
$('.prodbuy-button').after('<div id="bhWidget"><a id="addWatchList" style="margin-top: 4px;" alt="Add to Watch List" title="Add to BuyHatke Watch List and get notifications on price drop" href="javascript:void();" class="fk-inline-block buy-btn fksk-buy-btn"><img style="margin-left:24px;" src=' + imgURL2 +'></a></div>');



var button = document.getElementById("addWatchList");
button.addEventListener("click", function(){
  //alert("Product added to your Buyhatke Watchlist. You will be notified on price drop");
  addToWatchList();
}, false);
}
else {
  $('.prodbuy-button').after(strToDisp);
}
}


var final2send = url.split("products/");
var msgToSend = final2send[1] + "~*~*" + $('.redText').text().split("Rs")[1].trim().split(",").join("");

var a = $('body').text();
if(a.split("ISBN-13:").length>1){
  isbn = parseInt(a.split("ISBN-13:")[1].trim());
  //console.log(isbn);
}
else if(a.split("ISBN13:").length>1){
  isbn = parseInt(a.split("ISBN13:")[1].trim());
  //console.log(isbn);
}
else {
  isbn = false;
  //console.log("ISBN not found");
}

if(isbn){
  msgToSend = msgToSend + "moreData=null&isbn=" + isbn;
}

if($('.bread-cont:eq(1)').text().trim().split("Ethnic Wear").length==2||$('.bread-cont:eq(1)').text().trim().split("Apparel").length==2||$('.bread-cont:eq(1)').text().trim().split("Fashion Accessories").length==2||$('.bread-cont:eq(1)').text().trim().split("Footwear").length==2||$('.bread-cont:eq(1)').text().trim().split("Watches").length==2||$('.bread-cont:eq(1)').text().trim().split("Bags").length==2||$('.bread-cont:eq(1)').text().trim().split("Luggage").length==2||$('.bread-cont:eq(1)').text().trim().split("Eyewear").length==2||$('.bread-cont:eq(1)').text().trim().split("Jewellery").length==2){
  isapparel = true;
  msgToSend = msgToSend + "moreData=null";
}
else {
  isapparel = false;
}

chrome.runtime.sendMessage({search: msgToSend}, function(response) {
    });

chrome.runtime.onMessage.addListener(
 function(request, sender) {
  if(isapparel){
  var results = request.results;
  $('body').append(results);
  (function(a){a.tiny=a.tiny||{};a.tiny.carousel={options:{start:1,display:1,axis:"x",controls:true,pager:false,interval:false,intervaltime:3000,rewind:false,animation:true,duration:1000,callback:null}};a.fn.tinycarousel_start=function(){a(this).data("tcl").start()};a.fn.tinycarousel_stop=function(){a(this).data("tcl").stop()};a.fn.tinycarousel_move=function(c){a(this).data("tcl").move(c-1,true)};function b(q,e){var i=this,h=a(".viewport:first",q),g=a(".overview:first",q),k=g.children(),f=a(".ar-next:first",q),d=a(".ar-prev:first",q),l=a(".pager:first",q),w=0,u=0,p=0,j=undefined,o=false,n=true,s=e.axis==="x";function m(){if(e.controls){d.toggleClass("disable",p<=0);f.toggleClass("disable",!(p+1<u))}if(e.pager){var x=a(".pagenum",l);x.removeClass("active");a(x[p]).addClass("active")}}function v(x){if(a(this).hasClass("pagenum")){i.move(parseInt(this.rel,10),true)}return false}function t(){if(e.interval&&!o){clearTimeout(j);j=setTimeout(function(){p=p+1===u?-1:p;n=p+1===u?false:p===0?true:n;i.move(n?1:-1)},e.intervaltime)}}function r(){if(e.controls&&d.length>0&&f.length>0){d.click(function(){i.move(-1);return false});f.click(function(){i.move(1);return false})}if(e.interval){q.hover(i.stop,i.start)}if(e.pager&&l.length>0){a("a",l).click(v)}}this.stop=function(){clearTimeout(j);o=true};this.start=function(){o=false;t()};this.move=function(y,z){p=z?y:p+=y;if(p>-1&&p<u){var x={};x[s?"left":"top"]=-(p*(w*e.display));g.animate(x,{queue:false,duration:e.animation?e.duration:0,complete:function(){if(typeof e.callback==="function"){e.callback.call(this,k[p],p)}}});m();t()}};function c(){w=s?a(k[0]).outerWidth(true):a(k[0]).outerHeight(true);var x=Math.ceil(((s?h.outerWidth():h.outerHeight())/(w*e.display))-1);u=Math.max(1,Math.ceil(k.length/e.display)-x);p=Math.min(u,Math.max(1,e.start))-2;g.css(s?"width":"height",(w*k.length));i.move(1);r();return i}return c()}a.fn.tinycarousel=function(d){var c=a.extend({},a.tiny.carousel.options,d);this.each(function(){a(this).data("tcl",new b(a(this),c))});return this}}(jQuery));


$('#hr-title').click(function(){
 $("#hatke-recommendations").animate({'bottom':0},500);
})

$('#hr-close').click(function(){
 $("#hatke-recommendations").animate({'bottom':-90},500);
})

$(document).ready(function(){

    $('#hatke-reco-cover').tinycarousel({display:4,duration: 700});

});
  }
  else {
  var message = request.results;
  var results = JSON.parse(message);
  results.sort(compare);
  var origPrice = $('.redText').text().split("Rs")[1].trim().split(",").join("");
  //console.log(origProd);
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
  	//console.log(results[i].prod + " " + results[i].price + " " + countArray[i]);
  }
  indexSelected = 0; notFound = 1;
  for(k=0; k< results.length; k++){
    if(results[k].score/totalLen > .5){
    	indexSelected = k;
    	notFound = 0;
    	break;
    }
  }

  //console.log(" Final product " + results[indexSelected].prod + " " + results[indexSelected].price);
  if(isbn){
    indexSelected = 0;
  }

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
else if(results[indexSelected].position==151){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/uread.png";
siteName2 = "Uread";
}
else if(results[indexSelected].position==291){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/rediffbooks.png";
siteName2 = "Rediff";
}
else if(results[indexSelected].position==331){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/acadzone.png";
siteName2 = "AcadZone";
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
else if(results[i].position==151){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/uread.png";
siteName = "Uread";
}
else if(results[i].position==291){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/rediffbooks.png";
siteName = "Rediff";
}
else if(results[i].position==331){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/acadzone.png";
siteName = "AcadZone";
}

  string = string + '<li><a target="_blank" href="' + results[i].link + '"><div class="itemWrap"><div class="imageDiv_wrap"><div class="imageDiv"><img src="' + results[i].image + '"></div></div><div class="prod_right"><div class="prodName">' + results[i].prod + '</div><div class="storeRow"><div class="prodPrice"><img src="http://compare.buyhatke.com/images/rupeeK.png">' + results[i].price + '</div><div class="prodStore"><img src="' + image_name + '"></div></div></div></div></a></li>';
}

string = string + '</ul></div>';

string2 = '<footer><div id="dd_menu_footer"><iframe src="http://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FBuyHatke&width=450&height=35&colorscheme=light&layout=standard&action=like&show_faces=false&send=false&appId=205177396285577" scrolling="no" frameborder="0" style="border: none;overflow: hidden;width: 230px;height: 30px;float: left;" allowTransparency="true"></iframe> <a href="mailto:wecare@buyhatke.com">Send Feedback</a></div></footer></div></div><div id="share_buttons">Share: <a class="dd_share_buttons" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fextension.buyhatke.com" target="_blank"><img src="http://compare.buyhatke.com/images/fbs.png"></a><a class="dd_share_buttons" href="https://plus.google.com/share?url=http%3A%2F%2Fextension.buyhatke.com" target="_blank"><img src="https://www.gstatic.com/images/icons/gplus-32.png" alt="Share on Google+"/></a><a class="dd_share_buttons" href="http://twitter.com/home?status=Try the amazing CompareHatke Chrome Extension!+http%3A%2F%2Fextension.buyhatke.com" target="_blank"><img src="http://compare.buyhatke.com/images/tweet.png"></a></div></div><a href="#" id="detailClose" onclick="removeAll();return false;">x</a></div></div>';
if(parseInt(results[indexSelected].price)<=parseInt(origPrice)&&notFound==0&&document.getElementById('detailOutWrap') == null) {

   $('body').before('<div id="detailOutWrap"><div id="detailInWrap"><a target="_blank" href="http://compare.buyhatke.com" title="Visit Buyhatke"><img id="details_logo" src="http://compare.buyhatke.com/images/logo_small.png"></a><div id="details">Hurray !  Massive savings found. This product is available for <span id="detail_cost"><img src="http://compare.buyhatke.com/images/rupeeK.png"> ' + results[indexSelected].price + '</span> at <span id="detail_store">' + siteName2 + '</span><a style="display:inline!important;" href="' + results[indexSelected].link + '" target="_blank"><input type="button" value=" BUY IT NOW" ></a>or<div class="drop_down" id="compare_now" onmouseover="cancel=true;">COMPARE PRICES<div class="drop_down_symbol"></div><div id="dd_menu"><head><div id="dd_menu_header">Showing <span>' + results.length + '</span> results</div></head>' + string + string2);
   $('body').css("margin-top", "45px");
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

   $('body').before('<div id="detailOutWrap"><div id="detailInWrap"><a target="_blank" href="http://compare.buyhatke.com" title="Visit Buyhatke"><img id="details_logo" src="http://compare.buyhatke.com/images/logo_small.png"></a><div id="details">Hurray !  Other variants for this product is available for <span id="detail_cost"><img src="http://compare.buyhatke.com/images/rupeeK.png"> ' + results[indexSelected].price + '</span> at <span id="detail_store">' + siteName2 + '</span><a style="display:inline!important;" href="' + results[indexSelected].link + '" target="_blank"><input type="button" value=" BUY IT NOW" ></a>or<div class="drop_down" id="compare_now" onmouseover="cancel=true;">COMPARE PRICES<div class="drop_down_symbol"></div><div id="dd_menu"><head><div id="dd_menu_header">Showing <span>' + results.length + '</span> results</div></head>' + string + string2);
   $('body').css("margin-top", "45px");
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
   $('body').css("margin-top", "45px");
  


var button = document.getElementById("detailClose");
button.addEventListener("click", function() {
  document.getElementById('detailOutWrap').style.display = "none";
  $('body').css("margin-top", "0px");
}, false);

 }

}

  });
