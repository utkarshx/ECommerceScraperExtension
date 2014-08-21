var handle = chrome.extension.getBackgroundPage();
var hashTable = handle.hashTable;
var resultsTable = handle.resultsTable;
var watchListArray = handle.watchListArray;
var length = hashTable.length;
var count = 0;
var currentArray = [];

document.addEventListener('DOMContentLoaded', function () {
  
  
});

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function clickHandler(e) {
  console.log(e.srcElement);
  setTimeout(sendRequests, 100);
}

function clickHandler1(e) {
  setTimeout(sendRequests2, 100);
}

function clickHandler2(e){
  var query = document.getElementById('enterName').value;
  if(query!=""){
    query = query.trim();
    query = query.split(" ");
    query = query.join("-");
    var url2 = "http://compare.buyhatke.com/products/" + query;
    chrome.tabs.create({url: url2});
  }
}

function clickHandler3(e) {
  setCookie("hasGiven", 1, 100000);
  chrome.extension.getBackgroundPage().hasGiven = 1;
  document.getElementById('kachada').innerHTML = '<div id="enterDiv">Your query: <input type="text" id="enterName"><button id="alto" style="margin-left: 90px;margin-top: 20px;">Search</button></div>';
  document.getElementById('alto').addEventListener('click', clickHandler2);
}

function getXMLHTTPRequest() {

  req = new XMLHttpRequest();
  return req;

}

function sendRequests2(){
  http2 = getXMLHTTPRequest();
  activeTabUrl = activeTabUrl.split("/")[2];
  var url2 = "http://compare.buyhatke.com/submitURL.php?url=" + encodeURIComponent(activeTabUrl) ;
  console.log(url2);
  document.getElementById('notify').innerHTML = "Request to add the site " + activeTabUrl + " has been submitted. Thanks for helping US. ";
  http2.open("GET",url2,true);
  http2.onload = (function(){
  if (http2.readyState == 4) {
   if(http2.status == 200) { 
    var msg = http2.responseText;
    console.log(msg);
       }
     }
 });
     http2.send(null);
}
  

function removeMe(num){
  num = num.split("removeClient");
num = parseInt(num[1]);
var index = num;
num = "remove" + num;
var element = document.getElementById(num);
element.parentNode.removeChild(element);
num = num.split("remove");
num = index;
if(num<watchListArray.length){
  link_id = watchListArray[num].link_id;
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
handle.watchListArray = watchListArray;
}
}
};
httpq2.send(parameters);
}

}

function sendRequests(){
  http2 = getXMLHTTPRequest();
  var val1 = document.getElementById('enterName').value;
  var val2 = document.getElementById('enteremail').value;
  var flag = 1;
  if(val1==""||val1=="Please enter your name"){
    document.getElementById('enterName').value = "Please enter your name";
    flag = 0;
  }
  if(val2==""||val2=="Please enter your E-Mail"){
    document.getElementById('enteremail').value = "Please enter your E-Mail";
    flag = 0;
  }
  if(val2!=""){
    var e_sp = val2.split("@").length;
    var e_sp2 = val2.split(".").length;
    if(e_sp==2&&e_sp2>1){
      flag = flag;
    }
    else {
      flag = 0;
      document.getElementById('enteremail').value = "Invalid E-Mail";
    }
  }
  if(flag==1){
  var url2 = "http://compare.buyhatke.com/submitName.php?name=" + encodeURIComponent(val1) + "&email=" + encodeURIComponent(val2);
  console.log(url2);
  document.getElementById('notify').innerHTML = "An email has been sent to " + val2 + " . Please verify to start discovering products at Compare Hatke !";
  http2.open("GET",url2,true);
  http2.onload = (function(){
  if (http2.readyState == 4) {
   if(http2.status == 200) { 
    var msg = http2.responseText;
    console.log(msg);
    chrome.extension.getBackgroundPage().userName = msg;
    chrome.extension.getBackgroundPage().reqSent = 1;
       }
     }
 });
     http2.send(null);
   }
}

function checkVerified(){
  http2 = getXMLHTTPRequest();
  var url2 = "http://compare.buyhatke.com/extension.php";
  console.log(url2);
  http2.open("GET",url2,true);
  http2.onload = (function(){
  if (http2.readyState == 4) {
   if(http2.status == 200) { 
    var msg = http2.responseText;
    console.log(msg);
    msg_sp = msg.split("~");
    chrome.extension.getBackgroundPage().userID = msg_sp[0];
    chrome.extension.getBackgroundPage().isVerified = msg_sp[1];
    chrome.extension.getBackgroundPage().userName = msg_sp[2];
       }
     }
 });
     http2.send(null);
}



chrome.tabs.getSelected(null, function(tab) { 
      if(chrome.extension.getBackgroundPage().isVerified==1){
        string = "<body><center style='font-family: calibri;padding: 6px;'><br><div id='notify'></div><br>Hi <span id ='name'>" + chrome.extension.getBackgroundPage().userName + "</span>!<br/><br/>To add this site, send a request by clicking the button below:<br><br><button> Request </button></div><div id='about'></br>visit <a target='_blank' href='http://www.buyhatke.com'>www.buyhatke.com</a> to know more!</div></center></body>";
        document.getElementById('showData').innerHTML = (string);
      }
      else {
        if(chrome.extension.getBackgroundPage().reqSent==1){
          checkVerified();
          console.log("Entered this loop");
        }
        if(chrome.extension.getBackgroundPage().hasGiven==1){
          
          string = "<body><center style='font-family: calibri;'><br><div id='notify'></div><div id='kachada'><br><div id='enterDiv'>Your query: <input type='text' id='enterName'><button id='alto' style='margin-left: 90px;margin-top: 20px;'>Search</button></div></div><div id='about'></br>visit <a target='_blank' href='http://www.buyhatke.com'>www.buyhatke.com</a> to know more!</div></center></body>";
          document.getElementById('showData').innerHTML = (string);
          document.getElementById('alto').addEventListener('click', clickHandler2);
        }
          else {
        string = "<body><center style='font-family: calibri;'><div id='notify'></div><div id='kachada' style='text-align: justify; padding: 20px; font-family: calibri; font-size: 16px; color: black;'><h3 style='font-size: 16px;'>Compare, Track and Save !</h3>1. Planning to shop online ?<br/><br/>2. Want the best price for the product ?<br><br>3. Then just go to a product page on Flipkart, Snapdeal, Amazon, Shopclues, Infibeam etc.<br><br>4. Click on the watch price button. Enter your email-id, if you wish to receive a mail. <br><br>5. Awesome, now lay back and get notified of every price drop on your favourite products.<br><br>6. You would also get prices of that product from other sellers selling it. Just hover over Compare Prices Option.</div><div id='about'></br><a style='color:blue!important;' target='_blank' href='http://compare.buyhatke.com/thankYou.php?utm_source=ext_popup'>Know More</a></div></center></body>";
        document.getElementById('showData').innerHTML = (string);
        }
      }
      

    if(chrome.extension.getBackgroundPage().isVerified==1){
      chrome.tabs.query({
    active: true,                              // Select active tabs
    windowId: chrome.windows.WINDOW_ID_CURRENT // In the current window
}, function(array_of_Tabs) {
    var tab = array_of_Tabs[0];
    activeTabUrl = tab.url;
    console.log(activeTabUrl);
});
      document.querySelector('button').addEventListener('click', clickHandler1);
    }
  currentArray = (watchListArray);
  var len = currentArray.length;
  var string = "";

  for(i=0;i<len;i++){
    var tempLen = currentArray[i].prod.length;
    if(tempLen>35){
      currentArray[i].prod = currentArray[i].prod.substring(0,34);
    }

    var imgURL2 = chrome.extension.getURL("red-cross-button.gif");
    var removeID = "remove" + i;
    var removeClient = "removeClient" + i;
    string += "<div class='itemWrap' id='" + removeID + "'>";
    string += "<a id='" + removeClient + "' href='javascript:void();'><img src='" + imgURL2 + "' style='right: 20px;position: absolute;'></a>";
    string += "<a target='_blank' href='" + currentArray[i].link + "'><div class='imageDiv'><img src='" + currentArray[i].image + "'/></div>";
    string += "<div class='prodName'>"+ currentArray[i].prod + "</div><div class='storeRow'>";
    string += "<div class='prodStore'>" +  "</div>";
    string += "<div class='prodPrice' style='margin-top: -15px;font-weight: bold;font-family: calibri;font-size: 20px;'><span class='WebRupee'>Rs.</span> " + currentArray[i].cur_price + "</div>";
    if((currentArray[i].price_added - currentArray[i].cur_price)>0){
      fontColor = "green";
      diff = (currentArray[i].price_added - currentArray[i].cur_price);
      ChangeIndex = "(Drop)";
    }
    else if((currentArray[i].price_added - currentArray[i].cur_price)==0){
      fontColor = "green";
      diff = (currentArray[i].price_added - currentArray[i].cur_price);
      ChangeIndex = "(No Change)";
    }
    else {
      fontColor = "red";
      diff = (currentArray[i].price_added - currentArray[i].cur_price)*-1;
      ChangeIndex =  "(Rise)" ;
    }
    string += "<div class='prodPrice2' style='margin-top: 0;font-weight: bold;font-family: calibri;font-size: 16px;right: 19px;position: absolute;margin-top: 9px;color: " + fontColor + ";'><span class='WebRupee'>Rs.</span> " + diff + "<span style='font-size:13px;padding-left:4px;'>" + ChangeIndex + "</span></div>";
    string += "</div></a></div>";
  }
  if(string==""){
   }
    else {
  document.getElementById('showData').innerHTML = (string);
  for(var i=0;i<len;i++){
    var removeID = "removeClient" + i;
    var button = document.getElementById(removeID);
   button.addEventListener("click", function(){
    removeMe(this.id);
}, false);
  }
 }
      
    
})


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-21447924-6']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
