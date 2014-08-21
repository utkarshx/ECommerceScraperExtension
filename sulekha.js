var name = $('.product-title').find('a').find('span').text().trim();
var nameS = name.split(" ");
if(nameS.length<4){
name = nameS.join("-");
 }
 else {
 	name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3];
 }
var url = "http://compare.buyhatke.com/products/" + name;

$('.dlprbyot').find('a:eq(0)').after('<a target="_blank" href=' + url + ' class="cmbutton buybutton ftrt btwid center" title="Compare via Compare Hatke"><span class="acbut">Compare</span></a>');

var final2send = url.split("products/");
var msgToSend = final2send[1] + "~*~*" + $('.hgtlgtorg:eq(0)').text().split("Rs.")[1].split("/")[0].trim().split(",").join("");

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getHTML")
      sendResponse({data: msgToSend});
    else
      sendResponse({data: msgToSend}); // snub them.
});