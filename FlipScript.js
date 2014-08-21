function compare(a,b) {
  if (parseInt(a.price) < parseInt(b.price))
     return -1;
  if (parseInt(a.price) > parseInt(b.price))
    return 1;
  return 0;
}
function getXMLHTTPRequest() {

  req = new XMLHttpRequest();
  return req;

}

function checkSubscribed(){
  chrome.runtime.sendMessage({subscribedFor: "value"}, function(response) {
       subscribedFor = response.farewell;
       if(subscribedFor==""&&getCookie("subsHidden")!=1){
          $('#pop-alert').removeClass("hk-green");
          $('#pop-alert').removeClass("hk-orange");
          $('#pop-alert').removeClass("hk-red");
          $('#pop-alert').addClass("hk-orange");
          $('#pop-alert').css("display", "block");
       }
     });
}

function checkBooked(){
  if($('.cart-loader').css("display") == "block" || $('body').text().split("Congratulations").length > 1){
    chrome.runtime.sendMessage({setSaleVariables: 0}, function(response) {
      //alert("Your Xiomi Mi3 has been booked successfully. Subscribe again to book another Xiomi on next sale.");
    });
  }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

function removeSubscription(){
 setCookie("subsHidden", 1, 1);
}

var imgLogo = chrome.extension.getURL("logo.png");

$('body').append('<div id="pop-alert" class="hk-green" style="display:none;"><div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><div id="hk-doing"><p>Please Sit tight while we are still fighting for you!</p><p>tried <b id="p-count">25</b> times</p></div><div id="hk-alert"><div id="closeSubs" style="border-radius: 50%;padding-left: 2px;padding-right: 2px;text-align: center;border: 1px solid #eaeaea;color: #FF8D0B;margin: 5px;background: #FAFAFA;width: 9px;font-size: 13px;float: right;cursor:pointer;">x</div><p><a style="text-decoration:none;color:white" href="chrome-extension://jaehkpjddfdgiiefcnhahapilbejohhj/options.html" target="_blank">Please Subscribe to Xiaomi Sale starting 26th August and add it to cart automatically !</a></p></div><div id="hk-done"><p>Hurray! your Xiaomi MI3 was successfully added to the cart!</p></div></div></div>');

var button = document.getElementById("closeSubs");
button.addEventListener("click", function(){
  removeSubscription();
  $('#pop-alert').css("display", "none");
}, false);

if(getCookie("subsHidden")==1){
  $('#pop-alert').css("display", "none");
  console.log("I was called");
}

checkSubscribed();

var flagCLicked = 0;
var uniCounter = 0;
function applySale(){
  var isLoggedIn = 0;
  uniCounter++;
  var color = "";
  var msg = "";

  if(uniCounter%1000 == 0){
  console.log("I was called yet again " + uniCounter);
  if($('.header-links').text().split("Hi").length==1){
     console.log("Red Alert : Please Login or Refresh if you have already logged in");
   }
  }
  if($('.header-links').text().split("Hi").length==1){
    isLoggedIn = 0;
  }
  else {
    isLoggedIn = 1;
  }

  if($('.header-links').text().split("Logged In").length >1 ){
    isLoggedIn = 1;
  }
  
  var cur_url = window.location.href;

  if(cur_url.split("utm_source=buyhatke").length > 1){
    var pollInterval = 10;
    var saleStarted = 0;
    chrome.runtime.sendMessage({saleVariables: "value"}, function(response) {
       saleStarted = response.farewell;
       window.setTimeout(applySale, pollInterval);
    
    //console.log("Sale Start " + saleStarted);
  cur_url = cur_url.split("?")[0];
  chrome.runtime.sendMessage({saleArray: "haiKya"}, function(response) {
  for(m=0;m<response.farewell.length;m++){
    var url2 = response.farewell[m].link;
    var testMode = response.farewell[m].testMode;
    var sale_start = parseInt(response.farewell[m].startsAt);
    var offSet = 0;
    chrome.runtime.sendMessage({getCurrentOffset: "value"}, function(response) {
     offSet = response.farewell;
     
    
    var cur_time = Math.round(+new Date()/1000) + Math.round(offSet);
    if(testMode==1){
      if(sale_start - cur_time > 0){
        $('.btn-buy-big').css("display", "none");
        }
      else {
        $('.btn-buy-big').css("display", "block");
      }
    }
    
    chrome.runtime.sendMessage({refreshedYet: "value"}, function(response) {
      var refreshed = response.farewell;
      if(uniCounter%1000 == 0){
      console.log(sale_start + " " + cur_time + " " + refreshed);
        }
      if(sale_start - cur_time > 400 && isLoggedIn==1){
        //if(uniCounter%1000 == 0){
      //console.log("Orange Alert : You seem to be all set to grab your Xiaomi Mi3 today. Relax and leave everything on us ! We will boost up the process soon.");
      color = "hk-orange";
      msg = "You seem to be all set to grab your Xiaomi Mi3 today. Relax and do whatever you wish and leave everything on us ! We will speed up the process soon.";
       //}
    }
    if(sale_start - cur_time > 300 && sale_start - cur_time < 400 && refreshed == 0){
      //if(uniCounter%1000 == 0){
      //console.log("Orange Alert : We are about to refresh the page to sync the timer with Flipkart Server Timings !");
      color = "hk-orange";
      msg = "We are about to refresh the page to sync the timer with Flipkart Server Timings !";
       //}
    }
    if(sale_start - cur_time < 330 && cur_time - sale_start < 330){
      //if(uniCounter%1000 == 0){
      //console.log("Orange Alert : Now your Xiaomi Mi3 is in Auto-focus mode. Please give us 5 minutes to work !");
      color = "hk-orange";
      msg = "Now your Xiaomi Mi3 tab is in Auto-focus mode. Please give us 5 minutes to work and book it for you ! Please don't change the tab when the timer reaches close to 0.<p> We have tried <b id='p-count'>" + Math.round(uniCounter) + "</b> times</p>";
       //}
    }
  
    if(isLoggedIn==0 && flagCLicked==0){
  $('#pop-alert').removeClass("hk-green");
  $('#pop-alert').removeClass("hk-orange");
  $('#pop-alert').addClass("hk-red");
  $('#hk-doing').html("<p>Please Login or Refresh if you have already logged in</p>");
  $('#pop-alert').css("display", "block");
 }
 else if(flagCLicked==0){
  $('#pop-alert').removeClass("hk-green");
  $('#pop-alert').removeClass("hk-orange");
  $('#pop-alert').removeClass("hk-red");
  $('#pop-alert').addClass(color);
  $('#hk-alert').html('<p>' + msg + '</p>');
  $('#pop-alert').css("display", "block");
  if(uniCounter%1000 == 0){
    console.log(color + " " + msg);
  }
 }
    
    if(sale_start - cur_time > 300 && sale_start - cur_time < 350 && refreshed == 0){
      chrome.runtime.sendMessage({setRefreshedYet: 1}, function(response) {
        window.location.reload();
      });
    }
  });
    url2 = url2.split("?")[0];
    if(uniCounter%1000==0){
      console.log(url2 + " " + cur_url + " " + saleStarted);
    }
    //saleStarted = 1;
    if(url2==cur_url && saleStarted==1){
       var total_btn_len = $('.btn-orange').length;
       for(k=0;k<total_btn_len;k++){
        if(flagCLicked == 0){
          var cur_text = $('.btn-orange:eq(' + k + ')').text();
          if(cur_text==""){
            cur_text = $('.btn-orange:eq(' + k + ')').attr("value");
          }
          if(cur_text == undefined || cur_text == "undefined"){
            cur_text = "";
          }
          if(uniCounter%1000==0){
            console.log(sale_start + "  " + cur_time);
              }
          if(cur_text!="" && cur_text.toUpperCase().split("BUY").length > 1){
             if(testMode==0 || (testMode==1 && sale_start - cur_time < 0)){
             document.getElementsByClassName('btn-orange')[k].click();
            flagCLicked = 1;
            console.log("Green Alert : JACKPOT !");
            color = "hk-green";
            msg = "JACKPOT !";
            $('#pop-alert').removeClass("hk-green");
            $('#pop-alert').removeClass("hk-orange");
            $('#pop-alert').removeClass("hk-red");
            $('#pop-alert').addClass("hk-green");
            $('#pop-alert').css("display", "block");
            setTimeout(checkBooked, 5); 
             }
          }
       }
      }

      var total_submit_len = $(':submit').length;
      for(k=0;k<total_submit_len;k++){
        if(flagCLicked == 0){
         if($(':submit:eq(' + k + ')').attr("value")){
          var cur_text = $(':submit:eq(' + k + ')').attr("value");
          if(cur_text!="" && cur_text.toUpperCase().split("BUY").length > 1){
            if(uniCounter%1000==0){
            console.log(sale_start + "  " + cur_time);
              }
             if(testMode==0 || (testMode==1 && sale_start - cur_time < 0)){
            $(':submit:eq(' + k + ')').click();
            flagCLicked = 1;
            console.log("Green Alert : JACKPOT !");
            color = "hk-green";
            msg = "JACKPOT !";
            $('#pop-alert').removeClass("hk-green");
            $('#pop-alert').removeClass("hk-orange");
            $('#pop-alert').removeClass("hk-red");
            $('#pop-alert').addClass("hk-green");
            $('#pop-alert').css("display", "block");
            setTimeout(checkBooked, 5);
             }
          }
        } 
         }
      }

      

     }
     });
   }

  });
  });
 }
}

applySale();

function removeTags(length2){
  //////console.log("Called with " + length2);
  $('tspan:eq(' + length2 + ')').css("display", "none");
}

function plotGraph(pid){
  var httpq4 = new getXMLHTTPRequest();
  var ext_id, ext_auth;
  chrome.runtime.sendMessage({ext_id: "value"}, function(response) {
    ext_id = response.farewell.split("~")[0];
    ext_auth = response.farewell.split("~")[1];
    var myurl = "http://compare.buyhatke.com/extension/getPredictedData.php";
var parameters = "ext_id=" + ext_id + "&auth_val=" + ext_auth + "&pid=" + pid;
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
        text: 'Should I purchase ' + $('.mprod-section').find('h1').text().trim() + " now ?"
      },
      subtitle: {
        text: 'Price Variance of ' + $('.mprod-section').find('h1').text().trim() + " at Flipkart"
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
              name: 'Flipkart Price',
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

function sendPIDs(){
linkList =  $('body').html();
pidList = "";
linkList = linkList.split('?pid=');
for(k=1;k<linkList.length;k++){
  linkTemp = linkList[k].split('"')[0];
  linkTemp = linkTemp.split("\\")[0];
  linkTemp = linkTemp.split("'")[0];
  linkTemp = linkTemp.split("&")[0]; 
  pidList = pidList + linkTemp + "~";
}
  chrome.runtime.sendMessage({pids: pidList}, function(response) {
    });
}

function sendCurrent(){
 curData = [];
 var prod = "";
 var image = "";
 var myPrice = "";
 var cur_url = "";
  if($('.mprod-section').length>0){
   prod = $('.mprod-section').find('h1').text().trim();
     if($('.mprodimg').length>0){
         image = $('.mprodimg').find('img').attr('src');
      }
  else {
         image = $('.image-wrapper').find('img').attr('src');
    }
    if($('.fk-font-finalprice').length>0){
       myPrice = parseFloat($('.fk-font-finalprice').text().split(",").join("").split("Rs.")[1].trim());
    }
    else if($('.fk-font-verybig').length>0){
       myPrice = parseFloat($('.fk-font-verybig').text().split(",").join("").split("Rs.")[1].trim());
    }
    else {
       myPrice = parseFloat($('meta[itemprop=price]').attr('content').split(",").join(""));
    }
    var current_status = $('.shipping-details').text().toUpperCase().split("PERMANENTLY DISCONTINUED").length;
    if(current_status > 1){
      current_status = 2;
    }
    else if($('.shipping-details').text().toUpperCase().split("OUT OF STOCK").length > 1){
      current_status = 1;
    }
    else {
      current_status = 0;
    }
     cur_url = window.location.href;
    curData.push([prod, image, myPrice, cur_url, current_status]);
    curData = JSON.stringify(curData);
    //console.log(curData);
    chrome.runtime.sendMessage({curDataFlip: curData}, function(response) {
    });
  }
}

function sendPairs(){
  var arrayToSend = [];
  var slider = $('.item-pp-carousel');
  var sliderLength = slider.length;
  for(i=0;i<sliderLength;i++){
    var link = $('.item-pp-carousel:eq(' + i + ')').find('a:eq(0)').attr("href");
    link = link.split("pid=")[1];
    if(link != undefined){
    PID = link.split("&")[0];
    var price = $('.item-pp-carousel:eq(' + i + ')').find('.final-price').text().split(",").join("");
    price = price.split("Rs.");
    if(price.length>1){
      price = price[1];
    }
    else {
      price = price[0];
    }
    price = parseFloat(price);
    arrayToSend.push([PID, price]);
    }
  }
  var slider = $('.product-unit');
  var sliderLength = slider.length;
  for(i=0;i<sliderLength;i++){
    var link = $('.product-unit:eq(' + i + ')').find('a:eq(0)').attr("href");
    link = link.split("pid=")[1];
    if(link != undefined){
    PID = link.split("&")[0];
    var price = $('.product-unit:eq(' + i + ')').find('.pu-final').text().split(",").join("");
    price = price.split("Rs.");
    if(price.length>1){
      price = price[1];
    }
    else {
      price = price[0];
    }
    price = parseFloat(price);
    arrayToSend.push([PID, price]);
     }
  } 
  var slider = $('.fk-large-item-carousel');
  var sliderLength = slider.length;
  for(i=0;i<sliderLength;i++){
    var link = $('.fk-large-item-carousel:eq(' + i + ')').find('a:eq(0)').attr("href");
    link = link.split("pid=")[1];
    if(link != undefined){
    PID = link.split("&")[0];
    var price = $('.fk-large-item-carousel:eq(' + i + ')').find('.final-price').text().split(",").join("");
    price = price.split("Rs.");
    if(price.length>1){
      price = price[1];
    }
    else {
      price = price[0];
    }
    price = parseFloat(price);
    arrayToSend.push([PID, price]);
    }
  }
  ////console.log(arrayToSend);
  arrayToSend = JSON.stringify(arrayToSend);
  //console.log(arrayToSend);
  chrome.runtime.sendMessage({pairsFlip: arrayToSend}, function(response) {
    });
}

function reportPurchase(){
  var curURL = window.location.href;
  if(curURL.split('flipkart.com/checkout').length>1){
    chrome.runtime.sendMessage({processDONE: "Flipkart"}, function(response) {
    });
  }
}

reportPurchase();

var pollInterval = 1000 * 15;
window.setTimeout(sendPIDs, pollInterval);
window.setTimeout(sendCurrent, pollInterval);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);
window.setTimeout(sendPairs, 20000);

$('.mprod-section:eq(0)').after('<div id="container" style=" min-width: 820px; max-width: 960px; height: 650px; margin: 0 auto; position: relative;"><div id="chart-logo" style="position: absolute;bottom: 10px;right: 0;font-size: 13px;z-index: 1">Price Chart Powered by<a target="_blank" href="http://compare.buyhatke.com?utm_source=graph" style="color: #0db2db;"><img src="http://compare.buyhatke.com/images/logo-mini.png" style="vertical-align: middle;margin-left: 5px;margin-top: -6px;"></a></div><div id="container2"></div><div id="container3"></div><div id="container4" style="padding: 10px;font-family: Open Sans, Arial, Helvetica, sans-serif;"><a href="http://buyh.tk/16" target="_blank" style="font-size: 13px;text-decoration: none;color: #0d99aa;margin-right: 32px;"><img src="http://compare.buyhatke.com/images/bug-icon.png" style="vertical-align: bottom;height: 15px;top: -2px;position: relative;">Report A Bug</a><a href="http://buyh.tk/16" target="_blank" style="font-size: 13px;text-decoration: none;color: #0d99aa;margin-right: 32px;"><img src="http://compare.buyhatke.com/images/bulb-icon.png" style="vertical-align: bottom;height: 16px;top: -2px;position: relative;">Suggest Us Something</a><a href="http://buyh.tk/r5" target="_blank" style="font-size: 13px;text-decoration: none;color: #0d99aa;margin-right: 32px;"><img src="http://compare.buyhatke.com/images/star-icon.png" style="vertical-align: bottom;height: 16px;top: -2px;position: relative;">Rate Us</a></div></div> ');

pidFlipkart = $('.pp-write-review').attr("href").split("?pid=")[1].split("&")[0];
//console.log(pidFlipkart);

plotGraph(pidFlipkart);



function removeAlert(){
  var currentURL = window.location.href;
  var filterURL = currentURL.split("&")[0];
  filterURL = filterURL.split("affid")[0];
  ////console.log("Filtered URL " + filterURL);
  chrome.runtime.sendMessage({detailArray: "haiKya"}, function(response) {
  for(m=0;m<response.farewell.length;m++){
    var url2 = response.farewell[m].link;
    url2 = url2.split("&")[0];
    url2 = url2.split("affid")[0];
    if(url2==filterURL){
      sendId = response.farewell[m].link_id;
      chrome.runtime.sendMessage({removeURL: sendId}, function(response) {
  ////console.log("Removal request sent");
    });
    }
  }
}); 
}

flagToDisp = 0; strToDisp = ""; clsToUse = ""; diff = 0;
chrome.runtime.sendMessage({detailArray: "haiKya"}, function(response) {
   arrayRes = response.farewell;
   var currentURL = window.location.href;
   var filterURL = currentURL.split("&")[0];
   filterURL = filterURL.split("affid")[0];
if($('.fk-font-finalprice').length>0){
       myPrice = parseFloat($('.fk-font-finalprice').text().split(",").join("").split("Rs.")[1].trim());
    }
    else if($('.fk-font-verybig').length>0){
       myPrice = parseFloat($('.fk-font-verybig').text().split(",").join("").split("Rs.")[1].trim());
    }
    else {
       myPrice = parseFloat($('meta[itemprop=price]').attr('content').split(",").join(""));
    }

  for(i=0;i<response.farewell.length;i++){
    var currentURL2 = response.farewell[i].link;
   var filterURL2 = currentURL2.split("&")[0];
   filterURL2 = filterURL2.split("affid")[0];
   ////console.log(filterURL , filterURL2);
   if(filterURL2==filterURL || filterURL2 == filterURL + "?" || filterURL2 + "?" == filterURL){
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
    ////console.log("Flag " + flagToDisp);
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
      $('.prices:eq(0)').after(strToDisp);
      var button = document.getElementById("removeMe2");
button.addEventListener("click", function(){
  removeAlert();
  document.getElementById('bhWidget').innerHTML = '<div class="line fk-font-12" style="margin-bottom: 4px;">Thank You ! We appreciate your motive to save energy :)</div>';
}, false);
     }
    }
   }
  }
  ////console.log(response.farewell);
});

function addEmailID(email){
  chrome.runtime.sendMessage({addEmail: email}, function(response) {
  ////console.log("Email Added");
});
}

  function addToWatchList() {
var myurl = "http://compare.buyhatke.com/addWatchList.php";
if($('.fk-font-finalprice').length>0){
       myPrice = parseFloat($('.fk-font-finalprice').text().split(",").join("").split("Rs.")[1].trim());
    }
    else if($('.fk-font-verybig').length>0){
       myPrice = parseFloat($('.fk-font-verybig').text().split(",").join("").split("Rs.")[1].trim());
    }
    else {
       myPrice = parseFloat($('meta[itemprop=price]').attr('content').split(",").join(""));
    }
var prod = $('.mprod-section').find('h1').text().trim();
var url = window.location.href;

var filterURL = url.split("&")[0];
   filterURL = filterURL.split("affid")[0];
   url = filterURL;
if($('.mprodimg').length>0){
var image = $('.mprodimg').find('img').attr('src');
}
else {
  var image = $('.image-wrapper').find('img').attr('src');
}
var parameters =  encodeURIComponent(prod) + "~*~*" + myPrice + "~*~*" + encodeURIComponent(image) + "~*~*" + encodeURIComponent(url) + "~*~*2" ;

chrome.runtime.sendMessage({data: parameters}, function(response) {
  ////console.log(response.farewell);
});


document.getElementById('bhWidget').innerHTML = '<div class="pricealert_hatke"><div class="price_hatke-wrap"><div class="price_hatke-initiated"><span class="price_hatke-type">Set Price:</span><span class="price_hatke-price"><img src="http://compare.buyhatke.com/images/rupeeK.png">' + myPrice + '</span></div><div class="price_hatke-difference"><span class="price_hatke-type">Price Change:</span><span class="price_hatke-price dec-hatke"><img class="dec_rupee-hatke" src="http://compare.buyhatke.com/images/rupeeG.png"><img class="inc_rupee-hatke" src="http://compare.buyhatke.com/images/rupeeR.png">0<div class="inc_dec-hatke-wrap"><img class="inc_dec-hatke" src="http://compare.buyhatke.com/images/price_change1.png"></div></span></div><a href="javascript:void();" id="removeMe2">Remove</a></div></div><div id="addWatchList"></div>';
var button = document.getElementById("removeMe2");
button.addEventListener("click", function(){
  removeAlert();
  document.getElementById('bhWidget').innerHTML = '<div class="line fk-font-12" style="margin-bottom: 4px;">Thank You ! We appreciate your motive to save energy :)</div>';
}, false);

chrome.runtime.sendMessage({email: "haiKya"}, function(response) {
  ////console.log(response.farewell)
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



theKid = document.createElement("div");
theKid.setAttribute('class', 'unit buy-btn-sec2');
theKid.setAttribute('id', 'mprod-buy-btn2');
var imgURL = chrome.extension.getURL("flipkart.png");

var imgURL2 = chrome.extension.getURL("watch-price1.png");
var url = "http://compare.buyhatke.com/products/";
var title = $('.mprod-section').find('h1').text().trim();
title = title.split(" ");
title2 = "";
for(k=0;k<title.length;k++){
 var tempSp = "";
 tempSp = title[k].split("/");
 title2 = title2 + " " + tempSp[0]
}
title = title2.trim();
//////console.log(title);
if($('.fk-lbreadbcrumb').find('span:eq(2)').text() == "Laptops /"){
  uniqueCheck = false;
}
else {
  uniqueCheck = true;
}
if($('.fk-lbreadbcrumb').find('span').length>3){
if($('.fk-lbreadbcrumb').find('span:eq(3)').text() == "Headphones /"){
  title2 = title.split(" ");
  title = "";
  if(title2.length>=3){
    title = title2[0] + " " + title2[1] + " " + title2[2];
  }
  else {
    title = title2.join(" ");
  }
}
}
if($('.fk-lbreadbcrumb').find('span').length>4){
 if($('.fk-lbreadbcrumb').find('span:eq(4)').text() == "TP-LINK Routers /" || $('.fk-lbreadbcrumb').find('span:eq(4)').text() == "Netgear Routers /" || $('.fk-lbreadbcrumb').find('span:eq(4)').text() == "D-Link Routers /" || $('.fk-lbreadbcrumb').find('span:eq(4)').text() == "Asus Routers /"){
  title2 = title.split(" ");
  title = "";
  if(title2.length>=2){
    title = title2[0] + " " + title2[1];
  }
  else {
    title = title2[0];
  }
 }
}
if($('.fk-lbreadbcrumb').find('span').length>4){
 if($('.fk-lbreadbcrumb').find('span:eq(4)').text() == "Cisco Linksys Routers /"){
  title2 = title.split(" ");
  title = "";
  if(title2.length>=3){
    title = title2[0] + " " + title2[1] + " " + title2[2];
  }
  else {
    title = title2.join(" ");
  }
 }
}
isApparel = ($('.fk-lbreadbcrumb').find('span:eq(1)').text() == ("Clothing /")) || ($('.fk-lbreadbcrumb').find('span:eq(1)').text() == ("Footwear /")) || ($('.fk-lbreadbcrumb').find('span:eq(1)').text() == ("Jewellery /")) || ($('.fk-lbreadbcrumb').find('span:eq(1)').text() == ("Watches /")) || ($('.fk-lbreadbcrumb').find('span:eq(1)').text() == ("Sunglasses /"));
if(isApparel || ($('.fk-lbreadbcrumb').find('span').length>2&&($('.fk-lbreadbcrumb').find('span:eq(2)').text()=="Mobiles /"||$('.fk-lbreadbcrumb').find('span:eq(2)').text()=="Tablets /" || $('.fk-lbreadbcrumb').find('span:eq(3)').text() == "Cases & Covers /" || $('.fk-lbreadbcrumb').find('span:eq(3)').text() == "Memory Cards & Readers /"))){}
  else {
    title = title.split(" ");
  if(title.length>=4){
    title = title[0] + " " + title[1] + " " + title[2] + " " + title[3];
  }
  else {
    title = title.join(" ");
  }
  }
title = title.split("-").join(" ");
title = title.split("+").join("");
title = title.split("Electronic").join("");
title = title.split("External Hard Disk").join("");
title = title.split("Pen Drive").join("");
title = title.split("On the ear")[0];
title = title.split("In the ear")[0];
title = title.split("Over the ear")[0];
title = title.split("Headphones")[0];
title = title.split("Headphone")[0];
title = title.split("Wired")[0];

if($('.fk-lbreadbcrumb').find('span').length>3){
if($('.fk-lbreadbcrumb').find('span:eq(3)').text() == "Iron /"){
  title = title.split("L/W").join("");
  title = title.split("Watts").join("Watt");
  title = title.split("watts").join("watt");
 }
}

if($('.fk-lbreadbcrumb').find('span').length>3){
 if($('.fk-lbreadbcrumb').find('span:eq(3)').text() == "Graphic Cards /"){
  title2 = title.split(" ");
  title = "";
  for(m=0;m<title2.length;m++){
    if(m!=1){
      title = title + title2[m] + " ";
    }
  }
  title = title.split("Graphics").join("Graphic");
 }
}

if($('.fk-lbreadbcrumb').find('span').length>3){
if($('.fk-lbreadbcrumb').find('span:eq(3)').text()=="Mouse /"){
  title = title.split(" ");
  if(title.length>=3){
    title = title[0] + " " + title[1] + " " + title[2];
  }
  else if(title.length==2){
    title = title[0] + " " + title[1];
  }
  else {
    title = title[0];
  }
}
}
if($('.fk-lbreadbcrumb').find('span:eq(1)').text()== "Watches /"){
  title = title.split("Analog")[0];
  title = title.split("Digital")[0]; 
  for(i=0;i<$('.specs-key').length;i++){
    if($('.specs-key:eq(' + i + ')').text()=="Style Code"){
      modelNo = $('.specs-value:eq(' + i + ')').text();
      title = title.trim() + " " + modelNo;
    }
  }
}
title = title.split("/").join(" ");
origProd = title;
title = title.split(" ");
title = title.join("-");

var title2 = title;
var urlToFollow = url + title2;
urlToFollow = urlToFollow.split("(");
urlToFollow = urlToFollow[0];
urlToFollow = urlToFollow.split("'s");
urlToFollow = urlToFollow.join("");

theKid.innerHTML = '<a style="margin-top: 4px;" target="_blank" alt="Compare via Compare Hatke" title="Compare via Compare Hatke" href='+ urlToFollow + ' class="fk-inline-block buy-btn fksk-buy-btn"><img src=' + imgURL +'></a>';

////console.log("Flag2 " + flagToDisp);
if($('.prices').length>0){
  if(flagToDisp==0){
$('.prices:eq(0)').after('<div id="bhWidget"><a id="addWatchList" style="margin-top: 4px;" alt="Add to Watch List" title="Add to BuyHatke Watch List and get notifications on price drop" href="javascript:void();" class="fk-inline-block buy-btn fksk-buy-btn"><img style="margin-left:-12px;" src=' + imgURL2 +'></a></div>');

  if($('#bhWidget').length>0){
    var randNo = Math.floor((Math.random() * 10) + 1);
    if(randNo%2==0){
      var csURL = chrome.extension.getURL("lap.png");
      var link_t = "http://buyhatke.com/flipKart-Buyhatke-Exc-Laptops";
    }
    else {
      var csURL = chrome.extension.getURL("lap.png");
      var link_t = "http://buyhatke.com/flipKart-Buyhatke-Exc-Laptops";
    }
    
    
    //$('#bhWidget').after('<a style="margin-left:10px;" href="' + link_t + '" target="_blank"><img src=' + csURL  + '></a>');
  }


var button = document.getElementById("addWatchList");
button.addEventListener("click", function(){
  //alert("Product added to your Buyhatke Watchlist. You will be notified on price drop");
  addToWatchList();
}, false);
}
else {
  $('.prices:eq(0)').after(strToDisp);
  var button = document.getElementById("removeMe");
button.addEventListener("click", function(){
  removeAlert();
  document.getElementById('bhWidget').innerHTML = '<div class="line fk-font-12" style="margin-bottom: 4px;">Thank You ! We appreciate your motive to save energy :)</div>';
}, false);
}
}

document.getElementById('mprod-buy-btn').parentNode.childNodes[1].parentNode.insertBefore(theKid, document.getElementById('mprod-buy-btn').parentNode.childNodes[1].nextSibling);
if($('.fk-font-finalprice').length>0){
       myPrice = parseFloat($('.fk-font-finalprice').text().split(",").join("").split("Rs.")[1].trim());
    }
    else if($('.fk-font-verybig').length>0){
       myPrice = parseFloat($('.fk-font-verybig').text().split(",").join("").split("Rs.")[1].trim());
    }
    else {
       myPrice = parseFloat($('meta[itemprop=price]').attr('content').split(",").join(""));
    }

var final2send = urlToFollow.split("products/");
var msgToSend = final2send[1] + "~*~*" + myPrice;

var str2Send = "";


msgToSend = msgToSend + "moreData=" + str2Send;

mustCheck = true;
caseMobiles = true;

if($('.fk-lbreadbcrumb').find('span').length>2&&($('.fk-lbreadbcrumb').find('span:eq(2)').text()=="Mobiles /"||$('.fk-lbreadbcrumb').find('span:eq(2)').text()=="Tablets /")){
  caseMobiles = true;
}
else {
  caseMobiles = false;
}

if($('.fk-lbreadbcrumb').find('span').length>3){
 var checker = $('.fk-lbreadbcrumb').find('span:eq(3)').text();
 if(checker=="External hard disks /" || checker == "Pen drives /" || checker == "Graphic Cards /" || checker == "RAMs /"){
  mustCheck = true;
 }
 else {
  mustCheck = false;
 }
}
else {
  mustCheck = false;
}

isApparel = ($('.fk-lbreadbcrumb').find('span:eq(1)').text() == ("Clothing /")) || ($('.fk-lbreadbcrumb').find('span:eq(1)').text() == ("Footwear /")) || ($('.fk-lbreadbcrumb').find('span:eq(1)').text() == ("Jewellery /")) || ($('.fk-lbreadbcrumb').find('span:eq(1)').text() == ("Sunglasses /"));

if(isApparel){
  uniqueCheck = false;
}

bookCheck = $('.fk-lbreadbcrumb').find('span:eq(1)').text().split("Books").length > 1 ;
if(bookCheck){
  uniqueCheck = false;
  for(i=0;i<$('.specs-key').length;i++){
    if($('.specs-key:eq(' + i + ')').text()=="ISBN-13"){
      isbn = $('.specs-value:eq(' + i + ')').text();
      //////console.log("ISBN found " + isbn);
    }
  }
}
else {
  isbn = false;
  //////console.log("ISBN not found");
}

//console.log("ISBN detected was " + isbn);
if(typeof(isbn)=="undefined"){
  isbn = false;
}

if(isbn){
  msgToSend = msgToSend + "isbn=" + isbn;
}

if(isApparel){
  msgToSend = msgToSend;
  isApparel = false;
}






chrome.runtime.sendMessage({search: msgToSend}, function(response) {
    });

if(uniqueCheck){
  mustHaveList = [];
  queryName = origProd;
  queryName = queryName.split("/").join(" ");
  queryName = queryName.split("(").join(" ");
  queryName = queryName.split(")").join(" ");
  queryName = queryName.split(",").join(" ");
  queryName = queryName.split("&").join(" ");
  queryName2 = queryName.toUpperCase();
  queryArray = queryName.split(" ");
  queryArray2 = queryName2.split(" ");
  countSe = 0;
  
  for(l=0;l<queryArray.length;l++){
     if(queryArray2[l].indexOf(queryArray[l])!=-1&&queryArray2[l]!=""&&queryArray2[l]!=" "){
      mustHaveList[countSe] = queryArray2[l];
      countSe++;
      //////console.log(countSe + ". " + queryArray2[l]);
     }
  }
}

chrome.runtime.onMessage.addListener(
 function(request, sender) {
  //////console.log(request.results);
  if(isApparel){
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
  var results2 = JSON.parse(message);
  var results3 = [];
  //////console.log("Must found was set to " + caseMobiles);
  mustValue2 = ""; mustValue = "";
  if(caseMobiles){
    origProd = origProd.split("-").join(" ");
    origProd = origProd.split(":").join(" ");
    origProd = origProd.split("+").join(" ");
    if($('.fk-lbreadbcrumb').find('span:eq(1)').text() == "Mobiles & Accessories /"){
      origProd = origProd.split("(")[0];
    }
    origProd = origProd.split("(").join("");
    origProd = origProd.split(")").join("");
    origProd = origProd.split(",").join(" ");
    origArray = origProd.split(" ");
    for(l=0;l<results2.length;l++){
      reason = "NO";

      var found = 1;
      tempStart = results2[l].prod.split("-").join(" ");
      tempStart = tempStart.split("+").join(" ");
      results2[l].prod = tempStart.split(":").join(" ");
      
    for(m=0;m<origArray.length;m++){
      tempProd = " " + results2[l].prod + " ";
      tempProd = tempProd.split("(").join(" ");
      tempProd = tempProd.split(")").join(" ");
      tempProd = tempProd.split(",").join(" ");
      tempProd = tempProd.split("WiFi").join("WiFi Wi Fi");
      tempProd = tempProd.split("wifi").join("WiFi Wi Fi");
      tempMatch = " " + origArray[m] + " ";
      if((tempProd).toUpperCase().indexOf(tempMatch.toUpperCase())!=-1 || origArray[m].toUpperCase()=="TABLET" || origArray[m].toUpperCase()=="MOBILE" || origArray[m].toUpperCase()=="HD" || origArray[m].toUpperCase()=="WITH" || origArray[m].toUpperCase()=="CALLING" || origArray[m].toUpperCase()=="SMART" || origArray[m].toUpperCase()=="PHONE" || origArray[m].toUpperCase()=="AND" || origArray[m]==" " || origArray[m]==""){}
        else {
          found = 0;
          reason = origArray[m];
        }
    }
    //////console.log(origProd + " " + results2[l].prod + " " + found + " " + reason + " " + results2[l].link);
    if(found==1){
      results3.push({
      prod : results2[l].prod,
      image : results2[l].image,
      price: results2[l].price,
      link: results2[l].link,
      position: results2[l].position
    });
    }
   }
   results2 = results3;
  }
  if($('.fk-lbreadbcrumb').find('span').length>3){
  if($('.fk-lbreadbcrumb').find('span:eq(3)').text() == "Memory Cards & Readers /"){
    origArray = origProd.split(" ");
    for(m=0;m<origArray.length;m++){
      if(origArray[m]=="Class"){
        mustValue = origArray[m+1];
        mustValue2 = "CLASS";
      }
    }
      //////console.log("MustValue1 " + mustValue);
      //////console.log("MustValue2 " + mustValue2);
      if(mustValue!=""&&mustValue2!=""){
      temp1 = mustValue;
      temp2 = mustValue2;
      mustValue2 = temp2 + " " + temp1;
      mustValue = temp2 + temp1;
      
      var results5 = [];
      for(k=0;k<results2.length;k++){
        if(results2[k].prod.toUpperCase().indexOf(mustValue)!=-1||results2[k].prod.toUpperCase().indexOf(mustValue2)!=-1){
          results5.push({
      prod : results2[k].prod,
      image : results2[k].image,
      price: results2[k].price,
      link: results2[k].link,
      position: results2[k].position
    });
     }
     else {
      //////console.log("Must Have test failed for " + results2[k].prod);
     }
          
     }
     results2 = results5;
      }
    
  }
}

mustValue = "";
mustValue2 = "";

  if(mustCheck){
    origArray = origProd.split(" ");
    for(m=0;m<origArray.length;m++){
      if(origArray[m]=="GB"){
        mustValue = origArray[m-1];
        mustValue2 = "GB";
      }
      else if(origArray[m]=="TB"){
        mustValue = origArray[m-1];
        mustValue2 = "TB";
      }
    }
    l = 0;
    //////console.log("MustValue1 " + mustValue);
    //////console.log("MustValue2 " + mustValue2);
    if(mustValue!=""&&mustValue2!=""){
      temp = mustValue;
      mustValue = mustValue + mustValue2;
      mustValue2 = temp + " " + mustValue2;
      var results = [];
      for(k=0;k<results2.length;k++){
        if(results2[k].prod.toUpperCase().indexOf(mustValue)!=-1||results2[k].prod.toUpperCase().indexOf(mustValue2)!=-1){
          results.push({
      prod : results2[k].prod,
      image : results2[k].image,
      price: results2[k].price,
      link: results2[k].link,
      position: results2[k].position
    });
     }
     else {
      //////console.log("Must Have test failed for " + results2[k].prod);
     }
          
     }
      }
      else {
    var results = results2;
    }
  }
  else {
    var results = results2;
  }
var results7 = results;

if(uniqueCheck){
  cs = 0;
  mustHaveList2 = [];
  for(k=0;k<mustHaveList.length;k++){
    tempString = mustHaveList[k];
    tempNumber = tempString.match(/\d+/);
    if(tempNumber==null){
      mustHaveList2[cs] = tempString;
      cs = cs + 1;
    }
    else {
      tempNumber = tempNumber[0];
      if(isNaN(parseInt(tempString))){
        tempString2 = tempString.split(tempNumber);
        tempString2 = tempString2[0];
        mustHaveList2[cs] = tempString2;
        cs = cs + 1;
        mustHaveList2[cs] = tempNumber;
        cs = cs + 1;
      }
      else {
        tempString2 = tempString.split(tempNumber);
        tempString2 = tempString2[1];
        mustHaveList2[cs] = tempString2;
        cs = cs + 1;
        mustHaveList2[cs] = tempNumber;
        cs = cs + 1;
      }
    }
  }
  mustHaveList = mustHaveList2;
    l = 0;
    results = [];
    for(k=0;k<results7.length;k++){
      toInsert = 1;
    for(l=0;l<mustHaveList.length;l++){
      if(results7[k].prod.toUpperCase().indexOf(mustHaveList[l])!=-1 || mustHaveList[l]=="" || mustHaveList[l]==" "){
      }
      else {
        toInsert = 0;
      }
     }
      if(toInsert==1){
         results.push({
      prod : results7[k].prod,
      image : results7[k].image,
      price: results7[k].price,
      link: results7[k].link,
      position: results7[k].position
    });
      }
      else {
        ////console.log("Rejected " + results7[k].prod + " due to unique test");
      }
    }
  }
else {
  results = results7;
}

  results.sort(compare);
  var origPrice = myPrice;
  //////console.log(origProd);
  var countArray = Array();
  for (var i = 0; i <= results.length - 1; i++) {
    var tempLink = results[i].link;
    tempLink = tempLink.split("http://compare.buyhatke.com/tracking.php?redirect=")[1];
    tempLink = decodeURIComponent(tempLink);
    var currentURL = window.location.href;
   var filterURL = currentURL.split("&")[0];
   filterURL = filterURL.split("affid")[0];
   tempLink = tempLink.split("&")[0];
   tempLink = tempLink.split("affid")[0];
   if(filterURL==tempLink || filterURL == tempLink + "?" || tempLink + "?" == filterURL){
      results[i].price = origPrice;
    }
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
    //////console.log(results[i].prod + " " + results[i].price + " " + countArray[i]);
  }
  indexSelected = 0;notFound = 0;
  for(k=0; k< results.length; k++){
    if(results[k].score/totalLen > .6){
      indexSelected = k;
      notFound = 0;
      break;
    }
  }

  //////console.log(" Final product " + results[indexSelected].prod + " " + results[indexSelected].price);
  if(isbn){
    indexSelected = 0;
  }

  results[indexSelected].link = results[indexSelected].link.split('affid%3Dbuyhatkegm')[0];

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
else if(results[indexSelected].position==291){
class_assigned = "class_naap";
image_var = "images/floralis.png";
siteName2 = "Rediff";
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
else if(results[indexSelected].position==999){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/maniacstore.png";
siteName2 = "ManiacStore";
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
else if(results[i].position==999){
class_assigned = "class_naap";
image_name = "http://compare.buyhatke.com/images/maniacstore.png";
siteName = "ManiacStore";
}

  string = string + '<li><a style="display:inline!important;" target="_blank" href="' + results[i].link + '"><div class="itemWrap"><div class="imageDiv_wrap"><div class="imageDiv"><img src="' + results[i].image + '"></div></div><div class="prod_right"><div class="prodName">' + results[i].prod + '</div><div class="storeRow"><div class="prodPrice"><img src="http://compare.buyhatke.com/images/rupeeK.png">' + results[i].price + '</div><div class="prodStore"><img src="' + image_name + '"></div></div></div></div></a></li>';
}

string = string + '</ul></div>';

string2 = '<footer><div id="dd_menu_footer"><iframe src="http://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FBuyHatke&width=450&height=35&colorscheme=light&layout=standard&action=like&show_faces=false&send=false&appId=205177396285577" scrolling="no" frameborder="0" style="border: none;overflow: hidden;width: 230px;height: 30px;float: left;" allowTransparency="true"></iframe> <a href="mailto:wecare@buyhatke.com">Send Feedback</a></div></footer></div></div><div id="share_buttons">Share: <a class="dd_share_buttons" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fextension.buyhatke.com" target="_blank"><img src="http://compare.buyhatke.com/images/fbs.png"></a><a class="dd_share_buttons" href="https://plus.google.com/share?url=http%3A%2F%2Fextension.buyhatke.com" target="_blank"><img src="https://www.gstatic.com/images/icons/gplus-32.png" alt="Share on Google+"/></a><a class="dd_share_buttons" href="http://twitter.com/home?status=Try the amazing CompareHatke Chrome Extension!+http%3A%2F%2Fextension.buyhatke.com" target="_blank"><img src="http://compare.buyhatke.com/images/tweet.png"></a></div></div><a href="#" id="detailClose" onclick="removeAll();return false;">x</a></div></div>';

if(parseInt(results[indexSelected].price)<=parseInt(origPrice)&&notFound==0&&document.getElementById('detailOutWrap') == null) {

   $('body').before('<div id="detailOutWrap"><div id="detailInWrap"><a target="_blank" href="http://compare.buyhatke.com" title="Visit Buyhatke"><img id="details_logo" src="http://compare.buyhatke.com/images/logo_small.png"></a><div id="details">Hurray !  Massive savings found. This product is available for <span id="detail_cost"><img src="http://compare.buyhatke.com/images/rupeeK.png"> ' + results[indexSelected].price + '</span> at <span id="detail_store">' + siteName2 + '</span><a style="display:inline!important;" href="' + results[indexSelected].link + '" target="_blank"><input type="button" value=" BUY IT NOW" ></a>or<div class="drop_down" id="compare_now" onmouseover="cancel=true;">COMPARE PRICES<div class="drop_down_symbol"></div><div id="dd_menu"><head><div id="dd_menu_header">Showing <span>' + results.length + '</span> results</div></head>' + string + string2);
  $('#fk-mainhead-id').css("margin-top", "40px");
  $('#fk-mainbody-id').css("margin-top", "130px");
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
  $('#fk-mainhead-id').css("margin-top", "0px");
  $('#fk-mainbody-id').css("margin-top", "90px");
}, false);


cancel=false;
elem1=document.getElementById("compare_now");
blinker();

 }

  else if(results.length>0&&document.getElementById('detailOutWrap') == null){


   $('body').before('<div id="detailOutWrap"><div id="detailInWrap"><a target="_blank" href="http://compare.buyhatke.com" title="Visit Buyhatke"><img id="details_logo" src="http://compare.buyhatke.com/images/logo_small.png"></a><div id="details">Hurray !  Other variants for this product is available for <span id="detail_cost"><img src="http://compare.buyhatke.com/images/rupeeK.png"> ' + results[indexSelected].price + '</span> at <span id="detail_store">' + siteName2 + '</span><a style="display:inline!important;" href="' + results[indexSelected].link + '" target="_blank"><input type="button" value=" BUY IT NOW" ></a>or<div class="drop_down" id="compare_now" onmouseover="cancel=true;">COMPARE PRICES<div class="drop_down_symbol"></div><div id="dd_menu"><head><div id="dd_menu_header">Showing <span>' + results.length + '</span> results</div></head>' + string + string2);
  $('#fk-mainhead-id').css("margin-top", "40px");
  $('#fk-mainbody-id').css("margin-top", "130px");
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
  $('#fk-mainhead-id').css("margin-top", "0px");
  $('#fk-mainbody-id').css("margin-top", "90px");
}, false);

cancel=false;
elem1=document.getElementById("compare_now");
blinker();


 }

 else if(document.getElementById('detailOutWrap') == null){

    $('body').before('<div id="detailOutWrap"><div id="detailInWrap"><div id="details">Hurray !  Massive savings found. Click to know more <a style="display:inline!important;" href="' + urlToFollow + '" target="_blank"><input type="button" value=" COMPARE PRICES"></a><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fextension.buyhatke.com" id="notify_fshare"></a></div><a href="#" id="detailClose" >x</a></div></div>');
  $('#fk-mainhead-id').css("margin-top", "40px");
  $('#fk-mainbody-id').css("margin-top", "130px");


var button = document.getElementById("detailClose");
button.addEventListener("click", function() {
  document.getElementById('detailOutWrap').style.display = "none";
  $('#fk-mainhead-id').css("margin-top", "0px");
  $('#fk-mainbody-id').css("margin-top", "90px");
}, false);

 }

}

  });




 // $('body').css("margin-top", "45px");
