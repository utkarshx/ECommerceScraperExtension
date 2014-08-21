var name = $('.ITitle').find('h2').text();
name2 = name.split("(");
var nameS = name2[0].split(" ");
if(nameS.length<6){
name = nameS.join("-");
 }
 else {
 	name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3] + "-" + nameS[4] + "-" + nameS[5];
 }
var url = "http://compare.buyhatke.com/products/" + name;
var imgURL = chrome.extension.getURL("70mm.png");
$('input[type="image"]').after('<a target="_blank" href="' + url + '" ><table><tbody><tr><td style="width: 1%;"><img title="Compare via Compare Hatke" class="Btn_BuyNow" src='+imgURL +' ></td><td><div class=""></div></td></tr></tbody></table></a>');


var final2send = url.split("products/");
var msgToSend = final2send[1] + "~*~*" + $('.ITM_SellPrice').text().split(",").join("");
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getHTML")
      sendResponse({data: msgToSend});
    else
      sendResponse({data: msgToSend}); // snub them.
});