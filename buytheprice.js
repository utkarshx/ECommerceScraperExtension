var name = $('#p-infocol').find('h1').text();
if(name==""){
	name = $('.offtitle').find('a').text();
}
var nameS = name.split(" ");
if(nameS.length<4){
name = nameS.join("-");
 }
 else {
 	name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3];
 }
var url = "http://compare.buyhatke.com/products/" + name;

var final2send = url.split("products/");
var msgToSend = final2send[1] + "~*~*" + $('#p-ourprice-m').text().split("+")[0].trim().split("Rs.")[1].split(",").join("");
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getHTML")
      sendResponse({data: msgToSend});
    else
      sendResponse({data: msgToSend}); // snub them.
});

$('#btpbutton').after('<a title="Compare via Compare Hatke" href=' + url + ' target="_blank" class="btn btn-warning" style="padding:10px 30px 10px 35px;font-size:22px;font-weight:bold;text-transform:lowercase"><i class="icon-shopping-cart1"></i> Compare</a>');


$('.offbuy').after('<a title="Compare via Compare Hatke" href=' + url + ' target="_blank" class="btn btn-warning" style="padding:10px 30px 10px 35px;font-size:22px;font-weight:bold;text-transform:lowercase"><i class="icon-shopping-cart1"></i> Compare</a>');


