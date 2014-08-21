var name = $('.product-shop').find('h1').text().trim();
var imgURL = chrome.extension.getURL("ut.png");
var nameS = name.split(" ");
if(nameS.length<4){
name = nameS.join("-");
 }
 else {
 	name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3];
 }
var url = "http://compare.buyhatke.com/products/" + name;
var urlSplit = url.split("'s");
url = urlSplit.join("");
$('#insert-qty').find('button').css("margin-top", "-20px");
$('#insert-qty').find('button').after('<a target="_blank" href="' + url + '"><img src=' + imgURL + ' title="Compare via Compare Hatke"></a>');

var final2send = url.split("products/");
var msgToSend = final2send[1] + "~*~*" + parseFloat($('.product-shop').find('.oprice').text().trim().split("Rs.")[1].trim());
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getHTML")
      sendResponse({data: msgToSend});
    else
      sendResponse({data: msgToSend}); // snub them.
});