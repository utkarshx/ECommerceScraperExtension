savingsArray = [];
coupArray = [];
bestCouponFound = 0;
function getXMLHTTPRequest() {

  req = new XMLHttpRequest();
  return req;

}

function reportPurchase(){
  var curURL = window.location.href;
  if(curURL.split('fabfurnish.com/cart').length>1){
    chrome.runtime.sendMessage({processDONE: "Fabfurnish"}, function(response) {
    });
  }
}

reportPurchase();

flagCoupon = [];
for(var i=0;i < 200; i++){
  flagCoupon[i] = 2;
}

function changeFlag(i, coupon){
  if(document.getElementById('dialogProcessing').style.display=="none"){
  var status = "none";
  }
 else {
  var status = "comeAgain";
}
  if(status=="none"){
    flagCoupon[i] = 1;
    setTimeout(function(){postProcessor(coupon, i);},1000);
  }
  else {
    setTimeout(function(){changeFlag(i, coupon);},1000);
  }
}

function changeFlag2(i, coupon){
  if(bestCouponFound==0){
    if($('.delete-coupon').length>0){
    $('.delete-coupon').click();
    }
  }
  flagCoupon[i] = 0;
  /*if($('#couponCode').not(':enabled').length==1){
    var elem = $(document.getElementsByClassName("cart-rem-coupon")[0]).find('a');
    elem.click();
    $('.cart-page-mask:eq(0)').find('a:eq(0)').click();
    $('.cart-rem-coupon:eq(1)').find('a').click();
    //console.log($('.cart-page-mask:eq(0)').find('a:eq(0)'));
    $('.cart-rem-coupon:eq(1)').find('a:eq(0)').click();
    setTimeout(function(){changeFlag2(i, initialamount, coupon);},1000);
  }
  else {
  var status = $('.pgLoading').attr("style").split("display:")[1].split(";")[0].trim();
  //console.log("Status found " + status);
  if(status=="none"){
    flagCoupon[i] = 0;
    //$('#removeMask').find('a:eq(1)').click();
  }
  else {
    setTimeout(function(){changeFlag2(i, initialamount, coupon);},1000);
  }
 } */
}

function removeCompletely(){
   // $('#removeMask').find('a:eq(1)').click();
}

function postProcessor(coupon, i){
    savingsText = $('.orderReviewtotalprice').text().trim().split("Coupon");
    if(savingsText.length>1){
      savings = savingsText[0].trim().split("Rs.");
      savings = savings[savings.length-1].trim();
      savings = savings.split(",").join("");
      savings = parseFloat(savings);
    }
    else {
      savings = 0;
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
    if(bestCouponFound==0){
     if($('.delete-coupon').length>0){
    $('.delete-coupon').click();
    }
  }
    setTimeout(function(){changeFlag2(i, coupon);},1000);
}

function preProcessor(i, coupon){
	if(document.getElementById('dialogProcessing').style.display=="none"){
  var length = $('#tabs-3').find('a').length;
  var isClicked = "False";
  for(k=0;k<length;k++){
  	if($('#tabs-3').find('a:eq(' + k + ')').text().trim() == "Remove Coupon"){
  		document.getElementById('tabs-3').getElementsByTagName('a')[k].click();
  		isClicked = "True";
  	}
  }
  if(isClicked=="False"){
  $('#coupon_code').val(coupon)
  $('.coup_apply').click();
  //console.log("Coupon Code applied " + coupon);
  setTimeout(function(){changeFlag(i, coupon);},1000);
   }
   else {
   	setTimeout(function(){preProcessor(i, coupon);},1000);
   }
   }
   else {
   	setTimeout(function(){preProcessor(i, coupon);},1000);
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
    setTimeout(function(){temp(coupon, i, lenArray);},1000);
  }
  //setTimeout(function(){preProcessor(i, coupon, initialamount);},7000*i);
  //setTimeout(function(){couponApplied(initialamount);},7000*(i) + 3500); 
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
var parameters = "ext_id=" + ext_id + "&auth_val=" + ext_auth + "&pos=19";
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
console.log("CP Check was called");
if(curURL.split('fabfurnish.com/onestepcheckout/index/').length>1){
  var imgURL = chrome.extension.getURL("apply-coupon.png");
  //console.log("TEst passed");
  if($('.optFooter').length>0 && $('#tabs-3').length>0){
  $('.optFooter').after("<a id='couponClick' href='javascript:void();'><img style='margin-left:65px;' src='" + imgURL + "'></a>");
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

function addToWatchList() {
var myurl = "http://compare.buyhatke.com/addWatchList.php";
          var name = $('[itemprop="name"]').text().trim();
          var price = $('meta[itemprop="price"]').attr('content').trim();
          var image_url = $('meta[property="og:image"]').attr('content').trim();


var prod = name;
var myPrice = price;
var image2 = image_url;
var url = window.location.href;
var filterURL2 = url.split("?ref=")[0];
   filterURL2 = filterURL2.split("ref=")[0];
   filterURL2 = filterURL2.split("?")[0];
url = filterURL2;
var imgURL2 = chrome.extension.getURL("watch-price1.png");

var parameters =  encodeURIComponent(prod) + "~*~*" + myPrice + "~*~*" + encodeURIComponent(image2) + "~*~*" + encodeURIComponent(url) + "~*~*1000" ;

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


flagToDisp = 0; strToDisp = ""; clsToUse = ""; diff = 0;
chrome.runtime.sendMessage({detailArray: "haiKya"}, function(response) {
   arrayRes = response.farewell;
   var currentURL = window.location.href;
   var filterURL = currentURL.split("?ref=")[0];
   filterURL = filterURL.split("ref=")[0];
   filterURL = filterURL.split("?")[0];
        var price = $('meta[itemprop="price"]').attr('content').trim();
myPrice = price;
myPrice = parseFloat(myPrice);
  for(i=0;i<response.farewell.length;i++){
    var currentURL2 = response.farewell[i].link;
   var filterURL2 = currentURL2.split("?ref=")[0];
   filterURL2 = filterURL2.split("ref=")[0];
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
      if($('.product-options-new').length>0){
      $('.product-options-new').before(strToDisp);
      }
      else if($('.more-less').length>0){
        $('.more-less').after(strToDisp);
      }
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

if(flagToDisp==0){
  var imgURL2 = chrome.extension.getURL("watch-price1.png");
if($('.product-options-new').length>0){
$('.product-options-new').before('<div id="bhWidget"><a id="addWatchList" style="margin-top: 4px;" alt="Add to Watch List" title="Add to BuyHatke Watch List and get notifications on price drop" href="javascript:void();" class="fk-inline-block buy-btn fksk-buy-btn"><img style="margin-left:-12px;" src=' + imgURL2 +'></a></div>');
 }
 else if($('.more-less').length>0){
  $('.more-less').after('<div id="bhWidget"><a id="addWatchList" style="margin-top: 4px;" alt="Add to Watch List" title="Add to BuyHatke Watch List and get notifications on price drop" href="javascript:void();" class="fk-inline-block buy-btn fksk-buy-btn"><img style="margin-left:-12px;" src=' + imgURL2 +'></a></div>');
 }

var button = document.getElementById("addWatchList");
if(button != undefined){
button.addEventListener("click", function(){
  addToWatchList();
}, false);
 }
}
else if($('.product-options-new').length>0){
  $('.product-options-new').before(strToDisp);
}
else if($('.more-less').length>0){
  $('.more-less').after(strToDisp);
}

function removeAlert(){
  var currentURL = window.location.href;
  var filterURL = currentURL.split("?ref=")[0];
  filterURL = filterURL.split("ref=")[0];
  filterURL = filterURL.split("?")[0];
  //console.log("Filtered URL " + filterURL);
  chrome.runtime.sendMessage({detailArray: "haiKya"}, function(response) {
  for(m=0;m<response.farewell.length;m++){
    var url2 = response.farewell[m].link;
    url2 = url2.split("?ref=")[0];
    url2 = url2.split("ref=")[0];
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