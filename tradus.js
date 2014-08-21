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

function changeFlag(i, coupon){
  //var status = $('.pgLoading').attr("style").split("display:")[1].split(";")[0].trim();
  //if(status=="none"){
    flagCoupon[i] = 1;
    setTimeout(function(){postProcessor(coupon, i);},1000);
  //}
  //else {
   // setTimeout(function(){changeFlag(i, initialamount, coupon);},1000);
  //}
}

function changeFlag2(i, coupon){
  flagCoupon[i] = 0;
  /*if($('#couponCode').not(':enabled').length==1){
    var elem = $(document.getElementsByClassName("cart-rem-coupon")[0]).find('a');
    elem.click();
    $('.cart-page-mask:eq(0)').find('a:eq(0)').click();
    $('.cart-rem-coupon:eq(1)').find('a').click();
    console.log($('.cart-page-mask:eq(0)').find('a:eq(0)'));
    $('.cart-rem-coupon:eq(1)').find('a:eq(0)').click();
    setTimeout(function(){changeFlag2(i, initialamount, coupon);},1000);
  }
  else {
  var status = $('.pgLoading').attr("style").split("display:")[1].split(";")[0].trim();
  console.log("Status found " + status);
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
  if($('.xo-curtain').css("display")!="block"){
    if($('.xo-r-cpn').text()==""){
      savings = 0;
    }
    else {
      savings = $('.xo-r-cpn').text().trim().split("Rs.")[1].trim().split(".")[0];
      savings = savings.split(",").join("");
      savings = parseFloat(savings);
    }
    savings = parseFloat(savings);
    console.log("Savings for " + coupon + " is " + savings);
    savingsArray[i] = savings;
    if($('#couponRemove').length>0){
      if(bestCouponFound==0){
      document.getElementById('couponRemove').click();
    }
}
setTimeout(function(){changeFlag2(i, coupon);},1000);
  }
  else {
    setTimeout(function(){postProcessor(coupon, i);},1000);
  }
}

function preProcessor(i, coupon){
  $('#enterCoupon').val(coupon);
  document.getElementById('couponApply').click();
  console.log("Coupon Code applied " + coupon);
  setTimeout(function(){changeFlag(i, coupon);},1000);
}

function temp(coupon, i){
  if(i==0||flagCoupon[i-1]==0){
    preProcessor(i, coupon);
  }
  else {
    setTimeout(function(){temp(coupon, i);},1000);
  }
  //setTimeout(function(){preProcessor(i, coupon, initialamount);},7000*i);
  //setTimeout(function(){couponApplied(initialamount);},7000*(i) + 3500); 
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
  temp(coup_req, 0);
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
    temp(cur, i);
  }
 }
 endProcess(couponsArray.length-2);
}

function getCoupons(){
for(var i=0;i < 200; i++){
  flagCoupon[i] = 2;
}
bestCouponFound = 0;
if($('#couponRemove').length>0){
  document.getElementById('couponRemove').click();
}
  var httpq4 = new getXMLHTTPRequest();
  var ext_id, ext_auth;
  chrome.runtime.sendMessage({ext_id: "value"}, function(response) {
    ext_id = response.farewell.split("~")[0];
    ext_auth = response.farewell.split("~")[1];
    var myurl = "http://compare.buyhatke.com/extension/getCoupons.php";
var parameters = "ext_id=" + ext_id + "&auth_val=" + ext_auth + "&pos=4";
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
var mytext = httpq4.responseText;
console.log("Coupons " + mytext);
applyCoupons(mytext);
}
}
};
httpq4.send(parameters);
});
}

function couponCheck(){
var curURL = window.location.href;
console.log("CP Check was called");
if(curURL.split('cart/checkout').length>1){
  var imgURL = chrome.extension.getURL("apply-coupon.png");
  console.log("TEst passed");
  if($('#gv_redeem_message').length>0){
  $('#gv_redeem_message').after("<div id='couponClick' href='javascript:void();'><img style='margin-left:65px;' src='" + imgURL + "'></div>");
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
var name = $s('#left-content-product').find('h1').text();
origProd = name;
  console.log(name);
var nameS = name.split(" ");
if(nameS.length<6){
name = nameS.join("-");
 }
 else {
 	name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3] + "-" + nameS[4] + "-" + nameS[5];
 }
 var imgURL = chrome.extension.getURL("TRADUS.png");
var url = "http://compare.buyhatke.com/products/" + name;

if ($s('.buynowDiv').length>0){
$s('.buynowDiv:eq(0)').after('<a target="_blank" href=' + url + '><div class="buynowDiv" style="display: block"><img alt="Compare via Compare Hatke" class="sellers-buy-now-button" src=' + imgURL + ' style="cursor: pointer;"></div></a>');
 }
 else {
$s('input[type="image"]').after('<a target="_blank" href=' + url + '><div class="buynowDiv" style="display: block"><img alt="Compare via Compare Hatke" class="sellers-buy-now-button" src=' + imgURL + ' style="cursor: pointer;"></div></a>');
   }


if($s('#usave').length>0){
	price = $s('#usave').text().trim();
}
else {
	price = $s('#whole-sale-price').text().split("on")[0].split("Rs.")[1].trim().split(",").join("");
}
console.log(price);
var final2send = url.split("products/");
var msgToSend = final2send[1] + "~*~*" + price;
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getHTML")
      sendResponse({data: msgToSend});
    else
      sendResponse({data: msgToSend}); // snub them.
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

   $s('body').before('<div id="detailOutWrap"><div id="detailInWrap"><a target="_blank" href="http://compare.buyhatke.com" title="Visit Buyhatke"><img id="details_logo" src="http://compare.buyhatke.com/images/logo_small.png"></a><div id="details">Hurray !  Massive savings found. This product is available for <span id="detail_cost"><img src="http://compare.buyhatke.com/images/rupeeK.png"> ' + results[indexSelected].price + '</span> at <span id="detail_store">' + siteName2 + '</span><a style="display:inline!important;" href="' + results[indexSelected].link + '" target="_blank"><input type="button" value=" BUY IT NOW" ></a>or<div class="drop_down" id="compare_now" onmouseover="cancel=true;">COMPARE PRICES<div class="drop_down_symbol"></div><div id="dd_menu"><head><div id="dd_menu_header">Showing <span>' + results.length + '</span> results</div></head>' + string + string2);
   $s('#main-header-top').css("margin-top", "45px");
  


var button = document.getElementById("detailClose");
button.addEventListener("click", function() {
  document.getElementById('detailOutWrap').style.display = "none";
  $s('#main-header-top').css("margin-top", "0px");
}, false);

cancel=false;
elem1=document.getElementById("compare_now");
blinker();

 }

  else if(results.length>0&&document.getElementById('detailOutWrap') == null){

   $s('body').before('<div id="detailOutWrap"><div id="detailInWrap"><a target="_blank" href="http://compare.buyhatke.com" title="Visit Buyhatke"><img id="details_logo" src="http://compare.buyhatke.com/images/logo_small.png"></a><div id="details">Hurray !  Other variants for this product is available for <span id="detail_cost"><img src="http://compare.buyhatke.com/images/rupeeK.png"> ' + results[indexSelected].price + '</span> at <span id="detail_store">' + siteName2 + '</span><a style="display:inline!important;" href="' + results[indexSelected].link + '" target="_blank"><input type="button" value=" BUY IT NOW" ></a>or<div class="drop_down" id="compare_now" onmouseover="cancel=true;">COMPARE PRICES<div class="drop_down_symbol"></div><div id="dd_menu"><head><div id="dd_menu_header">Showing <span>' + results.length + '</span> results</div></head>' + string + string2);
   $s('#main-header-top').css("margin-top", "45px");

var button = document.getElementById("detailClose");
button.addEventListener("click", function() {
  document.getElementById('detailOutWrap').style.display = "none";
  $s('#main-header-top').css("margin-top", "0px");
}, false);

cancel=false;
elem1=document.getElementById("compare_now");
blinker();

 }

 else if(document.getElementById('detailOutWrap') == null){

   $s('body').before('<div id="detailOutWrap"><div id="detailInWrap"><div id="details">Hurray !  Massive savings found. Click to know more <a href="' + url + '" target="_blank"><input type="button" value=" COMPARE PRICES"></a><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fextension.buyhatke.com" id="notify_fshare"></a></div><a href="#" id="detailClose" >x</a></div></div>');
   $s('#main-header-top').css("margin-top", "45px");
  


var button = document.getElementById("detailClose");
button.addEventListener("click", function() {
  document.getElementById('detailOutWrap').style.display = "none";
  $s('#main-header-top').css("margin-top", "0px");
}, false);

 }

  });