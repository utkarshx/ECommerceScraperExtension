resultsTable = [];
hashTable = [];
watchListArray = [];
temp1 = [];
temp2 = [];
http = new Array();
inUSE = new Array();
saleArray = [];
hasGiven = 0;
reqSent = 0;
for(i=0;i<100;i++){
  http[i] = new XMLHttpRequest();
  inUSE[i] = 0;
}
function getXMLHTTPRequest() {

  req = new XMLHttpRequest();
  return req;

}


// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    console.log('inputEntered: ' + text);
    var queryTry = text.split(" ").join("-");
    var url = "http://compare.buyhatke.com/products/" + queryTry;
    window.open(url);
  });



function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function sendSubscribed(){
    var pollInterval = 1000 * 600;
  window.setTimeout(sendSubscribed, pollInterval);
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://compare.buyhatke.com/extension/sendSubscribed.php";
var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&subs=" + localStorage.subscribedFor;
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
}
}
};
httpq4.send(parameters);
}

function checkStatus(){
  var pollInterval = 1000 * 600;
  window.setTimeout(checkStatus, pollInterval);
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://compare.buyhatke.com/extension/checkStatus.php";
var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
var mytext = httpq4.responseText;
//console.log(mytext);
watchListArray = JSON.parse(mytext);
//console.log(watchListArray[0]);
}
}
};
httpq4.send(parameters);
}


function notify(title, detail, link) {
  var havePermission = window.webkitNotifications.checkPermission();
  if (havePermission == 0) {
    // 0 is PERMISSION_ALLOWED
    var iconUrl2 = chrome.extension.getURL("logo_128x128.png");
    var notification = window.webkitNotifications.createNotification(
      iconUrl2,
      title,
      detail
    );

    notification.onclick = function () {
      window.open(link);
      notification.close();
    }
    notification.show();
  } else {
      window.webkitNotifications.requestPermission();
  }
}


function checkEmailVerified(){
  if(localStorage.ext_email==""){
  var pollInterval = 1000 * 600;
  }
  else {
  var pollInterval = 1000 * 3600;
  }
  window.setTimeout(checkEmailVerified, pollInterval);
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://compare.buyhatke.com/extension/checkEmailVerified.php";
var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
var mytext = httpq4.responseText;
localStorage.ext_email = mytext;
}
}
};
httpq4.send(parameters);
}

function sendPrice(url, price){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://compare.buyhatke.com/extension/pushPriceData.php";
var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&price=" + price + "&url=" + encodeURIComponent(url);
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
}
}
};
httpq4.send(parameters);
}

function registerEND(website){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://compare.buyhatke.com/extension/registerEnd.php";
var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&website=" + website;
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
  openLink(httpq4.responseText);
}
}
};
httpq4.send(parameters);
}

function sendSavings(price){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://compare.buyhatke.com/extension/addSavings.php";
var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&savings=" + price;
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
}
}
};
httpq4.send(parameters);
}

function checkNotification2(){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://compare.buyhatke.com/extension/checkNotification.php";
var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
var mytext = httpq4.responseText;
console.log(mytext);
if(mytext!=""){
notArray = JSON.parse(mytext);
if(notArray[0].moreNoti==1){
  window.setTimeout(checkNotification2, 5*1000);
}
notify(notArray[0].prod + " Price Drop Alert", "Price of " + notArray[0].prod + " dropped by Rs. " + notArray[0].diff + ". It is now available at Rs. " + notArray[0].cur_price + ". Click me to grab the DEAL !", notArray[0].link);
}
}
}
};
httpq4.send(parameters);
}

suspendRequest = false;

function openLink(myurl){
  var httpq4 = new getXMLHTTPRequest();
httpq4.open("GET", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
   if(myurl.split("omgpm").length>1){
    var response = httpq4.responseText;
    var target = response.split('window.location.replace("')[1];
    target = target.split('"')[0];
    openLink(target);
   }
}
}
};
httpq4.send();
}

function checkAlertStatus(){
    $s = jQuery.noConflict();
  if(suspendRequest){
    var pollInterval = 1000 * 600;
  }
  else {
  var pollInterval = 1000 * 300;
 }
  window.setTimeout(checkAlertStatus, pollInterval);
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://compare.buyhatke.com/extension/getLink2.php";
var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
  var httpq5 = new getXMLHTTPRequest();
  var myurl = httpq4.responseText;
  suspendRequest = true;
  if(myurl!=""){
  suspendRequest = false;
  httpq5.open("GET", myurl, true);
  //httpq5.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq5.onreadystatechange = function(){
if (httpq5.readyState == 4) {
if(httpq5.status == 200) {
  var mytext = httpq5.responseText;
var doc = new DOMParser().parseFromString(mytext, 'text/html');
if(myurl.split("flipkart").length>1){
var doc2 = doc.getElementById('fk-mainbody-id');
var price = $s(doc2).find('meta[itemprop=price]').attr("content").split(",").join("");
}
else if(myurl.split("myntra").length>1){
var doc2 = doc.getElementById('mk-filler');
var price = $s(doc2).find('meta[itemprop=price]').attr("content").split(",").join("");
if(price){
price = price.split(",").join("");
}
else {
  var doc2 = doc.getElementsByClassName('summary')[0].getElementsByClassName('price')[0];
   myPrice = doc2.innerHTML;
   myPrice = myPrice.split("Rs.");
   if(myPrice.length>1){
    myPrice = myPrice[1];
   }
   else {
    myPrice = myPrice[0];
   }
   myPrice = myPrice.trim();
   myPrice = myPrice.split(",").join("");
   myPrice = parseFloat(myPrice);
   price = myPrice;
}
}
else if(myurl.split("snapdeal").length>1){
var doc2 = $s(doc).find('.pdpCatWrapper');
var price = $s(doc2).find('span[itemprop=price]').html();
}
else if(myurl.split("tradus").length>1){
var doc2 = $s(doc).find('.product-info');
var price = $s(doc2).find('span[itemprop=lowPrice]').html();
price = price.trim();
price = price.split(",").join("");
}
else if(myurl.split("yebhi").length>1){
var doc2 = $s(doc).find('.pdmainbg');
var price = $s(doc2).find('span[itemprop=price]').html();
price = price.trim();
price = price.split(",").join("");
}
else if(myurl.split("jabong").length>1){
var doc2 = $s(doc).find('#content');
var price = $s(doc2).find('span[itemprop=price]').html();
price = price.trim();
price = price.split(",").join("");
}
else if(myurl.split("shopclues").length>1){
var doc2 = $s(doc).find('.price').length;
var req = doc2 - 1;
var price = $s(doc).find('.price:eq(' + req + ')').text();
price = price.trim();
price = price.split(",").join("");
price2 = price.split("Rs.");
if(price2.length>1){
  price = price2[1];
}
else {
  price = price2[0]
}
}
else if(myurl.split("homeshop18").length>1){
var doc2 = $s(doc).find('#productInfoDes');
var price = $s(doc2).find('span[itemprop=price]').html();
price = price.trim();
price = price.split("&nbsp;");
if(price.length>1){
  price = price[1];
}
else {
  price = price[0];
}
price = price.split(",").join("");
}
else if(myurl.split("cromaretail").length>1){
var doc2 = $s(doc).find('.product:eq(0)');
var price = $s(doc2).find('.cta').find('h2').html().trim();
price = price.split("Rs.")[1];
price = price.split(",").join("").trim();
}
else if(myurl.split("amazon").length>1){

var doc2 = doc.getElementById('actualPriceValue');
var price = $s(doc2).text().trim();
console.log(price);
if(price==""){
  doc2 = $s(doc).find('.mbcOlpLink:eq(0)');
  price = $s(doc2).text().trim();
  if(price!=""){
  price2 = price.split("Rs.");
  price = price2[1].trim();
  price = price.split(",").join("");
  }
  else {
  doc2 = $s(doc).find('.a-color-price:eq(0)');
  price = $s(doc2).text().trim();
  if(price!=""){
  price2 = price.split("Rs.");
  if(price2.length>1){
  price = price2[1].trim();
    }
  else {
   price = price2[0].trim(); 
  }
  price = price.split(",").join("");
  }
  }
}
else {
  price = price.split("Rs.")[1];
  price = price.trim();
  price = price.split(",").join("");
}
}
sendPrice(myurl, price);
}
}
};
httpq5.send();
}
}
}
};
httpq4.send(parameters);
}

function checkSale(){
  var pollInterval = 1000 * 60;
  window.setTimeout(checkSale, pollInterval);
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://compare.buyhatke.com/extension/checkSale.php";
var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
var mytext = httpq4.responseText;
console.log(mytext);
if(mytext!=""){
saleArray = JSON.parse(mytext);
localStorage.saleArray = mytext;
}
else {
  localStorage.saleStarted = 0;
  localStorage.saleFinished = 0;
  localStorage.refreshedYet = 0;
  localStorage.mostSensitive = 0;
}
}
}
};
httpq4.send(parameters);
}


function applySale(){
  var pollInterval = 1000 * 1;
  window.setTimeout(applySale, pollInterval);
  var data = JSON.parse(localStorage.saleArray);
  var subscribeList = localStorage.subscribedFor;
  if(subscribeList!=""&&data.length>0){
    if(subscribeList == data[0].sale_id){
     if((data[0].startsAt - Math.round(+new Date()/1000 + Math.round(localStorage.diffTime)) < 900) && (Math.round(+new Date()/1000 + Math.round(localStorage.diffTime)) - data[0].startsAt < 500) && localStorage.saleStarted==0){
      localStorage.saleStarted = 1;
      localStorage.refreshedYet = 0;
      var newURL = data[0].link;
      chrome.tabs.create({ url: newURL });
       // start the process
     }
     if((Math.round(+new Date()/1000 + Math.round(localStorage.diffTime)) - data[0].startsAt < 330) && (data[0].startsAt - Math.round(+new Date()/1000 + Math.round(localStorage.diffTime))  < 330) && localStorage.saleStarted==1){
        localStorage.mostSensitive = 1;
     }
     if((Math.round(+new Date()/1000 + Math.round(localStorage.diffTime)) - data[0].startsAt > 330)){
        localStorage.mostSensitive = 0;
     }
     if((Math.round(+new Date()/1000 + Math.round(localStorage.diffTime)) - data[0].startsAt > 500)){
        localStorage.saleStarted = 0;
        localStorage.saleFinished = 0;
        localStorage.refreshedYet = 0;
        localStorage.mostSensitive = 0;
     }
   }
  }
}

function checkNotification(){
  var pollInterval = 1000 * 100;
  window.setTimeout(checkNotification, pollInterval);
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://compare.buyhatke.com/extension/checkNotification.php";
var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
var mytext = httpq4.responseText;
console.log(mytext);
if(mytext!=""){
notArray = JSON.parse(mytext);
if(notArray[0].moreNoti==1){
  window.setTimeout(checkNotification2, 5*1000);
}
notify(notArray[0].prod + " Price Drop Alert", "Price of " + notArray[0].prod + " dropped by Rs. " + notArray[0].diff + ". It is now available at Rs. " + notArray[0].cur_price + ". Click me to grab the DEAL !", notArray[0].link);
}
}
}
};
httpq4.send(parameters);
}

function checkOtherNotifications(){
  var pollInterval = 1000 * 600;
  window.setTimeout(checkOtherNotifications, pollInterval);
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://compare.buyhatke.com/extension/sendOtherNotification.php";
var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
var mytext = httpq4.responseText;
console.log(mytext);
if(mytext!=""){
notOtherArray = JSON.parse(mytext);
notify(notOtherArray[0].title , notOtherArray[0].message, notOtherArray[0].link);
}
}
}
};
httpq4.send(parameters);
}

function removeWatch(num){
link_id = num;
ext_id = localStorage.ext_id;
var httpq2 = getXMLHTTPRequest();
var myurl = "http://compare.buyhatke.com/extension/removeFromWatchList.php";
var parameters = "link_id=" + (link_id) + "&ext_id=" + ext_id + "&auth_val=" + localStorage.ext_auth;
httpq2.open("POST", myurl, true);
httpq2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq2.onreadystatechange = function(){
if (httpq2.readyState == 4) {
if(httpq2.status == 200) {
var mytext = httpq2.responseText;
watchListArray = JSON.parse(mytext);
}
}
};
httpq2.send(parameters);
}

function reportSuccess(){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://buyhatke.com/compare/extension/reportSuccess.php";
var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
var mytext = httpq4.responseText;
  }
 }
};
httpq4.send(parameters);
}

function getInstructions(){
  var pollInterval = 1000 * 2;
  window.setTimeout(getInstructions, pollInterval);
  if(localStorage.saleStarted==1){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://buyhatke.com/compare/extension/getInstructions.php";
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
  if (httpq4.readyState == 4) {
  if(httpq4.status == 200) {
    localStorage.instructions = httpq4.responseText;
  }
 }
};
  httpq4.send(parameters);
  }
}

function caliberateTime(){
  var pollInterval = 1000 * 6000;
  window.setTimeout(caliberateTime, pollInterval);
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://buyhatke.com/compare/extension/getTime.php";
var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
var mytext = httpq4.responseText;
if(parseInt(mytext)!=0){
    var serverTime = mytext;
    var clientTime = Math.round(+new Date()/1000);
    localStorage.diffTime = serverTime - clientTime;
   }
  }
 }
};
httpq4.send(parameters);
}

function checkStatus2(){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://compare.buyhatke.com/extension/checkStatus.php";
var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
var mytext = httpq4.responseText;
//console.log(mytext);
watchListArray = JSON.parse(mytext);
//console.log(watchListArray[0]);
}
}
};
httpq4.send(parameters);
}

function sendPIDFlip(pids, pos){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://compare.buyhatke.com/extension/flipPIDs.php";
var parameters = "pids=" + encodeURIComponent(pids) + "&pos=" + pos;
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
var mytext = httpq4.responseText;
console.log(mytext);
}
}
};
httpq4.send(parameters);
}

function sendPairs(pids, pos){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://buyhatke.com/compare/extension/flipPairs.php";
var parameters = "pids=" + encodeURIComponent(pids) + "&pos=" + pos;
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
var mytext = httpq4.responseText;
console.log(mytext);
}
}
};
httpq4.send(parameters);
}

function sendCurrent(pids, pos){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://buyhatke.com/compare/extension/currentPairs.php";
var parameters = "pids=" + encodeURIComponent(pids) + "&pos=" + pos;
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
if (httpq4.readyState == 4) {
if(httpq4.status == 200) {
var mytext = httpq4.responseText;
console.log(mytext);
}
}
};
httpq4.send(parameters);
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
     if (typeof(request.data) != "undefined"){
       var httpq2 = getXMLHTTPRequest();
       var data = request.data.split("~*~*");
       var prod = data[0];
       var price = data[1];
       var image = data[2];
       var url = data[3];
       var pos = data[4];
var myurl = "http://compare.buyhatke.com/extension/addToWatchList.php";
var parameters = "prod=" + encodeURIComponent(prod) + "&price=" + price + "&image=" + encodeURIComponent(image) + "&url=" + encodeURIComponent(url) + "&pos=" + pos + "&ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
httpq2.open("POST", myurl, true);
httpq2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq2.onreadystatechange = function(){
if (httpq2.readyState == 4) {
if(httpq2.status == 200) {
var mytext = httpq2.responseText;
checkStatus2();
}
}
};
httpq2.send(parameters);
      sendResponse({farewell: "goodbye"});
    }
    else if(typeof(request.search) != "undefined"){
      // request.search contains the data
            name = request.search;
            var data2="";
            if(name.split("moreData=").length > 1){
              data2 = name.split("moreData=")[1];
              name = name.split("moreData=")[0];
            }
            var pr = name.split("~*~*");
            var myPrice = parseFloat(pr[1]);
            name = pr[0];
            var name2 = name.split("-");
            name = name2.join(" ");
            var i = 0;
            while(inUSE[i]!=0){
              i++;
            }
            inUSE[i] = 1;
            var toUSE = i;
            handleQueries(name.trim(), myPrice, i, sender.tab.id, sender.tab.url, data2);

      //sendResponse can send search results back
        //sendResponse({farewell: localStorage.ext_email});
    }
    else if(typeof(request.email) != "undefined"){
      if(typeof(localStorage.ext_email)=="undefined" || localStorage.ext_email==""){
        sendResponse({farewell: "No"});
      }
      else {
        sendResponse({farewell: localStorage.ext_email});
      }
    }
    else if(typeof(request.pids) != "undefined"){
        sendPIDFlip(request.pids, 0);
    }
    else if(typeof(request.processDONE) != "undefined"){
        registerEND(request.processDONE);
    }
    else if(typeof(request.savings) != "undefined"){
        sendSavings(request.savings);
    }
    else if(typeof(request.pidsAmaz) != "undefined"){
        sendPIDFlip(request.pidsAmaz, 1);
    }
    else if(typeof(request.pidsMyn) != "undefined"){
        sendPIDFlip(request.pidsMyn, 2);
    }
    else if(typeof(request.pidsJab) != "undefined"){
        sendPIDFlip(request.pidsJab, 3);
    }
    else if(typeof(request.pidsSnap) != "undefined"){
        sendPIDFlip(request.pidsSnap, 4);
    }
    else if(typeof(request.pairsFlip) != "undefined"){
        sendPairs(request.pairsFlip, 0);
    }
    else if(typeof(request.curDataFlip) != "undefined"){
        sendCurrent(request.curDataFlip, 0);
    }
    else if(typeof(request.curDataSnap) != "undefined"){
        sendCurrent(request.curDataSnap, 1);
    }
    else if(typeof(request.curDataShop) != "undefined"){
        sendCurrent(request.curDataShop, 2);
    }
    else if(typeof(request.curDataAmaz) != "undefined"){
        sendCurrent(request.curDataAmaz, 3);
    }
    else if(typeof(request.curDataJab) != "undefined"){
        sendCurrent(request.curDataJab, 4);
    }
    else if(typeof(request.curDataMyn) != "undefined"){
        sendCurrent(request.curDataMyn, 5);
    }
    else if(typeof(request.pairsAmaz) != "undefined"){
        sendPairs(request.pairsAmaz, 1);
    }
    else if(typeof(request.pairsMyn) != "undefined"){
        sendPairs(request.pairsMyn, 2);
    }
    else if(typeof(request.pairsJab) != "undefined"){
        sendPairs(request.pairsJab, 3);
    }
    else if(typeof(request.pairsSnap) != "undefined"){
        sendPairs(request.pairsSnap, 4);
    }
    else if(typeof(request.pairsShopClues) != "undefined"){
        sendPairs(request.pairsShopClues, 5);
    }
    else if(typeof(request.pairsHS18) != "undefined"){
        sendPairs(request.pairsHS18, 6);
    }
    else if(typeof(request.pairsInfi) != "undefined"){
        sendPairs(request.pairsInfi, 7);
    }
    else if(typeof(request.removeURL) != "undefined"){
      urlToRemove = request.removeURL;
      console.log("URL removed " + urlToRemove);
          removeWatch(urlToRemove);
    }
    else if(typeof(request.detailArray) != "undefined"){
        sendResponse({farewell: watchListArray});
    }
    else if(typeof(request.saleArray) != "undefined"){
        sendResponse({farewell: saleArray});
    }
    else if(typeof(request.saleVariables) != "undefined"){
        sendResponse({farewell: localStorage.saleStarted});
    }
    else if(typeof(request.refreshedYet) != "undefined"){
        sendResponse({farewell: localStorage.refreshedYet});
    }
    else if(typeof(request.getCurrentOffset) != "undefined"){
        sendResponse({farewell: localStorage.diffTime});
    }
    else if(typeof(request.getInstructions) != "undefined"){
        sendResponse({farewell: localStorage.instructions});
    }
    else if(typeof(request.subscribedFor) != "undefined"){
    	var data = JSON.parse(localStorage.saleArray);
    	if(data.length==0){
    	sendResponse({farewell: "NONE"});
    	}
    	else {
        sendResponse({farewell: localStorage.subscribedFor});
         }
    }
    else if(typeof(request.setSaleVariables) != "undefined"){
        localStorage.saleStarted = 2;
        localStorage.saleFinished = 1;
        localStorage.mostSensitive = 0;
        localStorage.subscribedFor = "";
        reportSuccess();
        sendResponse({farewell: "Success"});
    }
    else if(typeof(request.setRefreshedYet) != "undefined"){
        localStorage.refreshedYet = 1;
        sendResponse({farewell: "Success"});
    }
    else if(typeof(request.ext_id) != "undefined"){
        sendResponse({farewell: localStorage.ext_id + "~" + localStorage.ext_auth});
    }
    else if(typeof(request.addEmail) != "undefined"){
      localStorage.ext_email = request.addEmail;
      var myurl = "http://compare.buyhatke.com/extension/addEmailExt.php";
var parameters = "email=" + encodeURIComponent(request.addEmail) + "&ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
var httpq3 = new getXMLHTTPRequest();
httpq3.open("POST", myurl, true);
httpq3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq3.onreadystatechange = function(){
if (httpq3.readyState == 4) {
if(httpq3.status == 200) {
var mytext = httpq3.responseText;
}
}
};
httpq3.send(parameters);
      console.log("Email added");
    }
  });



http2 = getXMLHTTPRequest();

  function setAnimatingIcon1(tabID){
  var iconPath = "1.png";
   chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon2(tabID); }, 100);
  }

  function setAnimatingIcon2(tabID){
  var iconPath = "2.png";
   chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon3(tabID); }, 100);
  }

  function setAnimatingIcon3(tabID){
  var iconPath = "3.png";
   chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon4(tabID); }, 100);
  }

  function setAnimatingIcon4(tabID){
  var iconPath = "4.png";
   chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon5(tabID); }, 100);
  }

  function setAnimatingIcon5(tabID){
  var iconPath = "5.png";
   chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon6(tabID); }, 100);
  }

  function setAnimatingIcon6(tabID){
  var iconPath = "6.png";
   chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon7(tabID); }, 100);
  }

  function setAnimatingIcon7(tabID){
  var iconPath = "7.png";
   chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon8(tabID); }, 100);
  }

  function setAnimatingIcon8(tabID){
  var iconPath = "8.png";
   chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon9(tabID); }, 100);
  }

  function setAnimatingIcon9(tabID){
  var iconPath = "9.png";
   chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon10(tabID); }, 100);
  }

  function setAnimatingIcon10(tabID){
  var iconPath = "10.png";
   chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon11(tabID); }, 100);
  }

  function setAnimatingIcon11(tabID){
  var iconPath = "11.png";
   chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon12(tabID); }, 100);
  }

  function setAnimatingIcon12(tabID){
  var iconPath = "12.png";
   chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
  }
  
  function searchgooglemaps(info)
{
 var searchstring = info.selectionText;
 if(typeof(searchstring)=="undefined"){
  alert("Please select some text to search via Compare Hatke. Selected Text Length : 0 words");
 }
 console.log(searchstring);
 searchstring = searchstring.trim().split(" ");
 if(searchstring.length>15){
  alert("Too long text to search. Maximum Limit : 15 words");
 }
 else if(searchstring.length==0){
  alert("Please select some text to search via Compare Hatke. Selected Text Length : 0 words");
 }
 else {
  searchstring = searchstring.join("-");
 chrome.tabs.create({url: "http://compare.buyhatke.com/products/" + searchstring});
}
}

chrome.contextMenus.create({title: "Compare via Compare Hatke", contexts:["all"], onclick: searchgooglemaps});



function deleteEntries(arr, id) {
    var i = arr.length;
    if (i) {   // (not 0)
        while (i--) {
            var cur = arr[i];
            if (cur.tabID == id) {
                arr.splice(i, 1);
            }
        }
    }
}

function takeValue(idName){
chrome.tabs.sendRequest(idName, { method: "getHTML"}, function(response) {
        alert(response.data);
});
}

function handleQueries(prod, price, start, tabId, urlMerchant, data2){
  var isbnValid;
  var isbn;
  var isapparel;
  var req = http[2*start];
  var req22 = http[2*start+1];
    var myID = tabId;
    if(data2.split("isbn=").length>1){
      isbn = data2.split("isbn=")[1];
      var parameters = "search=" + encodeURIComponent(prod) + "&isbn=" + encodeURIComponent(isbn);
    var url2 = "http://compare.buyhatke.com/example_ext.php"; 
    isbnValid = 1;
    isapparel = 0;
    }
    else if(data2.split("isapparel=").length>1){
      isbn = data2.split("isapparel=")[1];
      var parameters = "search=" + encodeURIComponent(prod);
    var url2 = "http://compare.buyhatke.com/apparelsSearch.php"; 
    isapparel = 1;
    isbnValid = 0;
    }
    else {
      isapparel = 0;
    var parameters = "search=" + encodeURIComponent(prod) + "&data=" + encodeURIComponent(data2);
    var url2 = "http://compare.buyhatke.com/example7.php"; 
    isbnValid = 0;
    isbn = 0;
    }
           //console.log(url2);
           if(prod!=""){
            var website = urlMerchant.split("/")[2];
            _gaq.push(["_trackEvent","SEARCH:Product",prod]);
            _gaq.push(["_trackEvent","SEARCH:Website",website]);
           }
           req.open("POST",url2,true);
           req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            req.onload = (function(){
            if (req.readyState == 4) {
            if(req.status == 200) { 
              var msg = req.responseText;
                if(price==NaN||price=="NaN"){
                  price = 0;
                }
                if(isbnValid==0&&isapparel==0){
            var url2 = "http://compare.buyhatke.com/updates10.php?searchText=" + encodeURIComponent(prod) + "&price=" + price;
          }
          else if(isapparel==1){
            var url2 = "http://compare.buyhatke.com/updates_app.php?searchText=" + encodeURIComponent(prod) + "&price=" + price;
          }
          else {
            var url2 = "http://compare.buyhatke.com/updates_ext.php?searchText=" + encodeURIComponent(prod) + "&isbn=" + isbn;
          }
           //console.log(url2);
           req22.open("GET",url2,true);
           
            req22.onload = (function(){
            if (req22.readyState == 4) {
            if(req22.status == 200) { 
               var msg = req22.responseText;
               if(isapparel==1){
                chrome.tabs.sendMessage(myID, {results: msg});
               console.log("Message sent successfully");
               if(watchListArray == null){
                chrome.browserAction.setBadgeText({tabId: tabId, text: "0"});
                chrome.browserAction.setBadgeBackgroundColor({tabId: tabId, color: "#FF0000"});
                }
                else {
               chrome.browserAction.setBadgeText({tabId: tabId, text: watchListArray.length.toString()});
               chrome.browserAction.setBadgeBackgroundColor({tabId: tabId, color: "#FF0000"});
                }
               setAnimatingIcon1(myID);
               inUSE[start] = 0;
               }
                else {
               var values = JSON.parse(msg);
               var len;
               if(values!=null){
               len = values.length;
               values = values.sort(function(a, b){
                return a.price - b.price;
              });
               }
               else {
                len = 0;
               }
               for(i=0;i<len;i++){
                resultsTable.push({
                tabID : myID, link : values[i].link, prod : values[i].prod, image : values[i].image, price : values[i].price, site : values[i].position
                 });
               }
               console.log("I reached here " + myID);
               chrome.tabs.sendMessage(myID, {results: msg});
               console.log("Message sent successfully");
               if(watchListArray == null){
                chrome.browserAction.setBadgeText({tabId: tabId, text: "0"});
                chrome.browserAction.setBadgeBackgroundColor({tabId: tabId, color: "#FF0000"});
                }
                else {
               chrome.browserAction.setBadgeText({tabId: tabId, text: watchListArray.length.toString()});
               chrome.browserAction.setBadgeBackgroundColor({tabId: tabId, color: "#FF0000"});
                }
               setAnimatingIcon1(myID);
               inUSE[start] = 0;
               }
             }
          }
            });
            req22.send(null);

              
            }
          }
            });
          req.send(parameters); 
}

function checkIcons(){

  chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "knockknock");
  console.log(port.sender.tab.url);
  port.onMessage.addListener(function(msg) {
    if (msg.joke == "Knock knock")
      port.postMessage({question: "Product-name"});
    else {
      var tempMessage = msg.answer.split("~*~*")[0];
      var website = port.sender.tab.url.split("/")[2];
      _gaq.push(["_trackEvent","DROP-DOWN:Product",tempMessage]);
      _gaq.push(["_trackEvent","DROP-DOWN:Website",website]);
    }     
  });
});

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)
{ 
  var iconPath = "12.png"; 
  //chrome.browserAction.setIcon({tabId: tabId, path: iconPath});
  //chrome.browserAction.show(tabId);
     if(watchListArray == null){
      chrome.browserAction.setBadgeText({tabId: tabId, text: "0"});
     chrome.browserAction.setBadgeBackgroundColor({tabId: tabId, color: "#FF0000"});
     }
     else {
     chrome.browserAction.setBadgeText({tabId: tabId, text: watchListArray.length.toString()});
     chrome.browserAction.setBadgeBackgroundColor({tabId: tabId, color: "#FF0000"});
     }
     
        var url = tab.url;
        var id = tabId;
        deleteEntries(hashTable, id);
        deleteEntries(resultsTable, id);
        
        if((url.split("koovs").length>1)||(url.split("flipkart").length>1)||(url.split("infibeam").length>1)||(url.split("bookadda").length>1)||(url.split("myntra").length>1)||(url.split("shopclues").length>1)||(url.split("urbantouch").length>1)||(url.split("seventymm").length>1)||(url.split("fnp").length>1)||(url.split("pepperfry").length>1)||(url.split("futurebazaar").length>1)||(url.split("landmarkonthenet").length>1)||(url.split("shoppersstop").length>1)||(url.split("jabong").length>1)||(url.split("tradus").length>1)||(url.split("buytheprice").length>1)||(url.split("yebhi").length>1)||(url.split("healthkart").length>1)||(url.split("babyoye").length>1)||(url.split("hushbabies").length>1)||(url.split("homeshop18").length>1)||(url.split("snapdeal").length>1)||(url.split("indiacakes").length>1)||(url.split("naaptol").length>1)||(url.split("crossword").length>1)||(url.split("floralis").length>1)||(url.split("shopping.indiatimes").length>1)||(url.split("adexmart").length>1)||(url.split("deals.sulekha").length>1)||(url.split("watchkart").length>1)||(url.split("lenskart").length>1)||(url.split("bagskart").length>1)||(url.split("jewelskart").length>1)||(url.split("junglee").length>1)||(url.split("mysmartprice").length>1)||(url.split("goodlife").length>1)||(url.split("grabmore").length>1)||(url.split("amazon").length>1)||(url.split("cilory").length>1)||(url.split("zivame").length>1)||(url.split("fashionara").length>1)||(url.split("acadzone").length>1)||(url.split("uread").length>1)||(url.split("rediff").length>1)||(url.split("cromaretail").length>1)){
          var iconPath = "ext_green.png";
          var zero = 0;
          //chrome.browserAction.show(id);
          hashTable.push({
            tabID : id, tabURL : url, res : zero, count : zero
          });
        }
        else {
          var iconPath = "ext_gray.png";
          var two = 2;
          var zero = 0;
          //chrome.browserAction.hide(id);
          hashTable.push({
            tabID : id, tabURL : url, res : two, count : zero
          });
        }
         chrome.browserAction.setIcon({tabId: tabId, path: iconPath});
});

chrome.tabs.onRemoved.addListener(function(tabId) {
        console.log("Tab id removed " + tabId);
        checkSpecialTab(tabId);
        deleteEntries(hashTable, tabId);
        deleteEntries(resultsTable, tabId);    
});



}

function getCookie(c_name){
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}
function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function checkSpecialTab(tabId){
  if(localStorage.saleStarted==1 && tabId == localStorage.specialTab){
    localStorage.specialTab = "";
    getSpecial();
  }
}

function getSpecial(){
  var pollInterval = 1000 * 5;
  window.setTimeout(getSpecial, pollInterval);
  if(localStorage.saleStarted==1){
  chrome.tabs.getAllInWindow(null, function(tabs) {
    var flagFound = 0;
      for (var i=0; i < tabs.length; i++) {
        var cur_url = tabs[i].url;
        var data = JSON.parse(localStorage.saleArray);
        var newURL = data[0].link;
        var baseURL = newURL.split("?")[0];
        //console.log(cur_url + "  " + baseURL + "  " + cur_url.split(baseURL).length);
        if(flagFound==0 && cur_url.split(baseURL).length>1){
          flagFound = 1; localStorage.specialTab = tabs[i].id;
          console.log("Special tab is " + localStorage.specialTab);
        }
       }
       if(flagFound==0){
        localStorage.specialTab = "";
        var data = JSON.parse(localStorage.saleArray);
        var newURL = data[0].link;
        chrome.tabs.create({ url: newURL });
        getSpecial();
       }
   });
  }
}

function checkMostSensitive(){
  var pollInterval = 1000 * 2;
  window.setTimeout(checkMostSensitive, pollInterval);
  if(localStorage.mostSensitive==1 && localStorage.specialTab!=""){
    chrome.tabs.update(parseInt(localStorage.specialTab), {selected: true});
  }
}

function setValues(){
  isVerified = 0;
  userID = 0;
  var checking = getCookie("hasGiven");
  if(checking==1){
    hasGiven = 1;
  }
  var url2 = "http://compare.buyhatke.com/extension.php";
  console.log(url2);
  http2.open("GET",url2,true);
  http2.onload = (function(){
  if (http2.readyState == 4) {
   if(http2.status == 200) { 
    var msg = http2.responseText;
    //console.log(msg);
    msg_sp = msg.split("~");
    userID = msg_sp[0];
    isVerified = msg_sp[1];
    userName = msg_sp[2];
       }
     }
 });
     http2.send(null);
}

if(!localStorage.first){
    chrome.tabs.create({
       url : "http://compare.buyhatke.com/thankYou.php"
    });
    localStorage.first = "true";
}



  var url2 = "http://compare.buyhatke.com/extensionRegister2.php?isNew=0";

  console.log(url2);
  var http3 = getXMLHTTPRequest();
  http3.open("GET",url2,true);
  http3.onload = (function(){
  if (http3.readyState == 4) {
   if(http3.status == 200) { 
    var msg = http3.responseText;
    console.log(msg);
       }
     }
 });
     http3.send(null);


if(typeof(localStorage.ext_id) == "undefined" || localStorage.ext_id=="" || parseFloat(localStorage.ext_id)==0){
  if(typeof(localStorage.ext_id)== "undefined" || parseFloat(localStorage.ext_id)==0){
  var url2 = "http://compare.buyhatke.com/extensionRegister.php?isNew=3";
  }
  else {
  var url2 = "http://compare.buyhatke.com/extensionRegister.php?isNew=0";
  }
  console.log(url2);
  var http3 = getXMLHTTPRequest();
  http3.open("GET",url2,true);
  http3.onload = (function(){
  if (http3.readyState == 4) {
   if(http3.status == 200) { 
    var msg = http3.responseText;
    console.log(msg);
    msg = msg.split("~");
    localStorage.ext_id = msg[0];
    localStorage.ext_auth = msg[1];
       }
     }
 });
     http3.send(null);
}

if((typeof(localStorage.ext_auth) == "undefined" || localStorage.ext_auth=="")&&(localStorage.ext_id!="" && typeof(localStorage.ext_id)!="undefined")){
  var url2 = "http://compare.buyhatke.com/extensionRegister.php?isNew=2&ext_id=" + localStorage.ext_id;
  console.log(url2);
  var http5 = getXMLHTTPRequest();
  http5.open("GET",url2,true);
  http5.onload = (function(){
  if (http5.readyState == 4) {
   if(http5.status == 200) { 
    var msg = http5.responseText;
    console.log(msg);
    localStorage.ext_auth = msg;
       }
     }
 });
     http5.send(null);
}


localStorage.isVerified = 0;

if(!localStorage.ext_id_change && typeof(localStorage.ext_id) != "undefined" && typeof(localStorage.ext_auth)!= "undefined"){

  var url2 = "http://compare.buyhatke.com/extension/changeID.php?ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
  
  console.log(url2);
  var http3 = getXMLHTTPRequest();
  http3.open("GET",url2,true);
  http3.onload = (function(){
  if (http3.readyState == 4) {
   if(http3.status == 200) { 
    var msg = http3.responseText;
    console.log(msg);
    msg = msg.split("~");
    localStorage.ext_id = msg[0];
    localStorage.ext_auth = msg[1];
    console.log("New Extension IDs received");
    localStorage.ext_id_change = "true";
       }
     }
 });
     http3.send(null);
}

if(localStorage.subscribedFor == undefined){
  localStorage.subscribedFor = "";
}

if(localStorage.saleFinished == undefined){
  localStorage.saleFinished = 0;
}

if(localStorage.saleStarted == undefined){
  localStorage.saleStarted = 0;
}

if(localStorage.refreshedYet == undefined){
  localStorage.refreshedYet = 0;
}

if(localStorage.specialTab == undefined){
  localStorage.specialTab = "";
}

if(localStorage.mostSensitive == undefined){
  localStorage.mostSensitive = "";
}

if(localStorage.instructions == undefined){
  localStorage.instructions = "";
}

if(localStorage.diffTime == undefined){
  localStorage.diffTime = 0;
}

setValues();
checkIcons();
checkStatus();
checkNotification();
checkOtherNotifications();
checkEmailVerified();
checkAlertStatus();
checkSale();
applySale();
getSpecial();
checkMostSensitive();
sendSubscribed();
caliberateTime();
getInstructions();

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-21447924-6']);
_gaq.push(['_trackPageview']);


(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
