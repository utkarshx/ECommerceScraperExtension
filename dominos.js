savingsArray = [];
coupArray = [];
bestCouponFound = 0;
flagCoupon = [];

function getXMLHTTPRequest() {

  req = new XMLHttpRequest();
  return req;

}

for(var i=0;i < 200; i++){
  flagCoupon[i] = 2;
}

function changeFlag(i, coupon, initialamount){
    flagCoupon[i] = 1;
    setTimeout(function(){postProcessor(coupon, i, initialamount);},1000);
}

function changeFlag2(i, coupon){
  if($('.remove-coupon-offer').length>0&&bestCouponFound==0){
    $('.remove-coupon-offer').click();
  }
  flagCoupon[i] = 0;
}

function removeCompletely(){
}

function postProcessor(coupon, i, initialamount){
  if($('#jqi_state_state0').length>0){
    var totalPrices = $('.prices').length -1;
    var currentamount = $('.prices:eq(' + totalPrices + ')').text();
    savings = initialamount - currentamount;

    savings = parseFloat(savings);
    console.log("Savings for " + coupon + " is " + savings);

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

    savingsArray[i] = savings;

setTimeout(function(){changeFlag2(i, coupon);},1000);
  }
  else {
    setTimeout(function(){postProcessor(coupon, i, initialamount);},1000);
  }
}

function preProcessor(i, coupon){

  $('#coupon-code-field').val(coupon);
  var totalPrices = $('.prices').length -1;
  var initialamount = $('.prices:eq(' + totalPrices + ')').text();
  document.getElementById('redeem-coupon-button').click();
  console.log("Coupon Code applied " + coupon);
  setTimeout(function(){changeFlag(i, coupon, initialamount);},1000);
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
  console.log("called with " + i);
  if(flagCoupon[i]==0){
console.log("Process terminated");
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
console.log(savingsArray);
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
if($('.remove-coupon-offer').length>0){
  $('.remove-coupon-offer').click();
}
  var httpq4 = new getXMLHTTPRequest();
  var ext_id, ext_auth;
  chrome.runtime.sendMessage({ext_id: "value"}, function(response) {
    ext_id = response.farewell.split("~")[0];
    ext_auth = response.farewell.split("~")[1];
    var myurl = "http://compare.buyhatke.com/extension/getCoupons.php";
var parameters = "ext_id=" + ext_id + "&auth_val=" + ext_auth + "&pos=16";
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
var mytext = httpq4.responseText;
console.log("Coupons " + mytext);
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
console.log("CP Check was called");
if(curURL.split('pizzaonline.dominos.co.in').length>1){
  var imgURL = chrome.extension.getURL("apply-coupon.png");
  console.log("TEst passed");
  if($('.cart-list').length>0){
  $('.cart-list').after("<a id='couponClick' href='javascript:void();'><img style='margin-top:15px;margin-left:20px;' src='" + imgURL + "'></a>");
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
