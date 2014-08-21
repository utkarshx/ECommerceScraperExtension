function compare(a,b) {
  if (parseInt(a.price) < parseInt(b.price))
     return -1;
  if (parseInt(a.price) > parseInt(b.price))
    return 1;
  return 0;
}

$s = jQuery.noConflict();

var name = $s('#product_new_page').find('h1').text();
origProd = name;
var nameS = name.split(" ");
if(nameS.length<6){
name = nameS.join("-");
 }
 else {
 	name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3] + "-" + nameS[4] + "-" + nameS[5];
 }
var url = "http://compare.buyhatke.com/products/" + name;



$s('.purchase-btn').after('<a target="_blank" href=' + url + '><div class="buy_now_but_big2"><input title="Compare via Compare Hatke" src="http://www.grabmore.in/templates/Grabmore/img/product/buy_now_big.gif" type="image"></div></a>');

var price = $s('.appr_price:eq(0)').text().split("Rs.")[1].trim().split(",").join("");

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
siteName = "Ebay";
if(results[indexSelected].link.split("rover").length==1){
 results[indexSelected]["link"]= "http://rover.ebay.com/rover/1/4686-127726-2357-24/2?&site=Partnership_MSP&mpre=" + encodeURIComponent(results[indexSelected]["link"]);
}
}
else if(results[indexSelected].position==35){
class_assigned = "class_ebay";
image_var = "images/yebhi1.png";
siteName = "Yebhi";
}
else if(results[indexSelected].position==63){
class_assigned = "class_ebay";
image_var = "images/amazon.png";
siteName = "Amazon";
}
else if(results[indexSelected].position==30){
class_assigned = "class_ebay";
image_var = "images/indiaplaza1.png";
siteName = "Indiaplaza";
}
else if(results[indexSelected].position==31){
class_assigned = "class_ebay";
image_var = "images/bookadda1.png";
siteName = "Bookadda";
}
else if(results[indexSelected].position==129){
class_assigned = "class_ebay";
image_var = "images/snapdeal.png";
siteName = "Snapdeal";
}
else if(results[indexSelected].position==50){
class_assigned = "class_ebay";
image_var = "images/jabong1.png";
siteName = "Ebay";
}
else if(results[indexSelected].position==45){
class_assigned = "class_ebay";
image_var = "images/shpstop1.png";
siteName = "ShoppersStop";
}
else if(results[indexSelected].position==929){
class_assigned = "class_ebay";
image_var = "images/by.png";
siteName = "BabyOye";
}
else if(results[indexSelected].position==911){
class_assigned = "class_ebay";
image_var = "images/strawberrynet.png";
siteName = "StrawBerryNet";
}
else if(results[indexSelected].position==939){
class_assigned = "class_ebay";
image_var = "images/hb.png";
siteName = "Hushbabies";
}
else if(results[indexSelected].position==921){
class_assigned = "class_ebay";
image_var = "images/hk.png";
siteName = "Healthkart";
}
else if(results[indexSelected].position==62){
class_assigned = "class_ebay";
image_var = "images/indiarush.png";
siteName = "IndiaRush";
}
else if(results[indexSelected].position==2){
class_assigned = "class_flip";
image_var = "images/flipkart1.png";
siteName = "Flipkart";
}
else if(results[indexSelected].position==99){
class_assigned = "class_naap";
image_var = "images/infibeam2.png";
results[indexSelected].prod = (results[indexSelected].prod);
siteName = "Infibeam";
}
else if(results[indexSelected].position==4){
class_assigned = "class_naap";
image_var = "images/homeshop181.png";
siteName = "HomeShop18";
}
else if(results[indexSelected].position==7){
class_assigned = "class_naap";
image_var = "images/landmark1.png";
siteName = "Landmark";
}
else if(results[indexSelected].position==13){
class_assigned = "class_naap";
image_var = "images/tradus2.png";
siteName = "Tradus";

}
else if(results[indexSelected].position==22){
class_assigned = "class_naap";
image_var = "images/koovs1.png";
siteName = "Koovs";
}
else if(results[indexSelected].position==333){
class_assigned = "class_naap";
image_var = "images/pepperfry1.png";
siteName = "Pepperfry";
}
else if(results[indexSelected].position==11){
class_assigned = "class_naap";
image_var = "images/fnp1.png";
siteName = "Flowers n Petals";
}
else if(results[indexSelected].position==5){
class_assigned = "class_naap";
image_var = "images/futurebazaar1.png";
siteName = "FutureBazaar";
}
else if(results[indexSelected].position==98){
class_assigned = "class_naap";
image_var = "images/fashionara.png";
siteName = "Fashionara";
}
else if(results[indexSelected].position==111){
class_assigned = "class_naap";
image_var = "images/myntra2.png";
siteName = "Myntra";
}
else if(results[indexSelected].position==411){
class_assigned = "class_naap";
image_var = "images/grabmore.png";
siteName = "GrabMore";
}
else if(results[indexSelected].position==421){
class_assigned = "class_naap";
image_var = "images/shopclues.png";
siteName = "ShopClues";
}
else if(results[indexSelected].position==441){
class_assigned = "class_naap";
image_var = "images/naaptol.png";
siteName = "Naaptol";
}
else if(results[indexSelected].position==471){
class_assigned = "class_naap";
image_var = "images/crossword.png";
siteName = "Crossword";
}
else if(results[indexSelected].position==461){
class_assigned = "class_naap";
image_var = "images/magmall.png";
siteName = "Magazine Mall";
}
else if(results[indexSelected].position==91){
class_assigned = "class_naap";
image_var = "images/floralis.png";
siteName = "Ebay";
}
else if(results[indexSelected].position==401){
class_assigned = "class_naap";
image_var = "images/indtimesshopping.png";
siteName = "IndiaTimes Shopping";
}
else if(results[indexSelected].position==393){
class_assigned = "class_naap";
image_var = "images/adexmart.png";
siteName = "Adexmart";
}
else if(results[indexSelected].position==373){
class_assigned = "class_naap";
image_var = "images/phoolwala.png";
siteName = "PhoolWala";
}
else if(results[indexSelected].position==73){
class_assigned = "class_naap";
image_var = "images/goodlife.png";
siteName = "GoodLife";
}
else if(results[indexSelected].position==37){
class_assigned = "class_naap";
image_var = "images/jewelkart.jpg";
siteName = "JewelsKart";
}
else if(results[indexSelected].position==57){
class_assigned = "class_naap";
image_var = "images/lenskart.jpg";
siteName = "LensKart";
}
else if(results[indexSelected].position==47){
class_assigned = "class_naap";
image_var = "images/bagskart.jpg";
siteName = "BagsKart";
}
else if(results[indexSelected].position==67){
class_assigned = "class_naap";
image_var = "images/watch.jpeg";
siteName = "WatchKart";
}
else if(results[indexSelected].position==69){
class_assigned = "class_naap";
image_var = "images/next.png";
siteName = "Next.co.in";
}
else if(results[indexSelected].position==71){
class_assigned = "class_naap";
image_var = "images/croma.png";
siteName = "CromaRetail";
}
else if(results[indexSelected].position==412){
class_assigned = "class_naap";
image_var = "images/craftsvilla.png";
siteName = "Craftsvilla";
}
else if(results[indexSelected].position==469){
class_assigned = "class_naap";
image_var = "images/cilory.png";
siteName = "Cilory";
}
else if(results[indexSelected].position==429){
class_assigned = "class_naap";
image_var = "images/zivame.png";
siteName = "Zivame";
}

if(parseInt(results[indexSelected].price)<=parseInt(origPrice)&&notFound==0) {

  $s('body').before('<div id="detailOutWrap"><div id="detailInWrap"><div id="details">Hurray !  Massive savings found. This product is available for <span id="detail_cost">Rs. ' + results[indexSelected].price + '</span> at <span id="detail_store">' + siteName + '</span><a href="' + results[indexSelected].link + '" target="_blank"><input type="button" value=" BUY IT NOW" ></a>or<a href="' + url + '" target="_blank"><input type="button" value=" COMPARE PRICES"></a><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fextension.buyhatke.com" id="notify_fshare"></a></div><a href="#" id="detailClose" >x</a></div></div>');
  


var button = document.getElementById("detailClose");
button.addEventListener("click", function() {
  document.getElementById('detailOutWrap').style.display = "none";
}, false);

 }

 else {

 	 $s('body').before('<div id="detailOutWrap"><div id="detailInWrap"><div id="details">Hurray !  Massive savings found. Click to know more <a href="' + url + '" target="_blank"><input type="button" value=" COMPARE PRICES"></a><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fextension.buyhatke.com" id="notify_fshare"></a></div><a href="#" id="detailClose" >x</a></div></div>');
  


var button = document.getElementById("detailClose");
button.addEventListener("click", function() {
  document.getElementById('detailOutWrap').style.display = "none";
}, false);

 }

  });