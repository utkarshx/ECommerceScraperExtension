resultsTable = [];
hashTable = [];
temp1 = [];
temp2 = [];
http = new Array();
inUSE = new Array();
for(i=0;i<50;i++){
  http[i] = new XMLHttpRequest();
  inUSE[i] = 0;
}

chrome.tabs.getSelected(null, function(tab) {
  if(tab.status=="complete"){
    
  }
  });

function getXMLHTTPRequest() {

  req = new XMLHttpRequest();
  return req;

}

  function setAnimatingIcon1(tabID){
  var iconPath = "1.png";
   chrome.pageAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon2(tabID); }, 100);
  }

  function setAnimatingIcon2(tabID){
  var iconPath = "2.png";
   chrome.pageAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon3(tabID); }, 100);
  }

  function setAnimatingIcon3(tabID){
  var iconPath = "3.png";
   chrome.pageAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon4(tabID); }, 100);
  }

  function setAnimatingIcon4(tabID){
  var iconPath = "4.png";
   chrome.pageAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon5(tabID); }, 100);
  }

  function setAnimatingIcon5(tabID){
  var iconPath = "5.png";
   chrome.pageAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon6(tabID); }, 100);
  }

  function setAnimatingIcon6(tabID){
  var iconPath = "6.png";
   chrome.pageAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon7(tabID); }, 100);
  }

  function setAnimatingIcon7(tabID){
  var iconPath = "7.png";
   chrome.pageAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon8(tabID); }, 100);
  }

  function setAnimatingIcon8(tabID){
  var iconPath = "8.png";
   chrome.pageAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon9(tabID); }, 100);
  }

  function setAnimatingIcon9(tabID){
  var iconPath = "9.png";
   chrome.pageAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon10(tabID); }, 100);
  }

  function setAnimatingIcon10(tabID){
  var iconPath = "10.png";
   chrome.pageAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon11(tabID); }, 100);
  }

  function setAnimatingIcon11(tabID){
  var iconPath = "11.png";
   chrome.pageAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon12(tabID); }, 100);
  }

  function setAnimatingIcon12(tabID){
  var iconPath = "12.png";
   chrome.pageAction.setIcon({tabId: tabID, path: iconPath});
   window.setTimeout(function() { setAnimatingIcon1(tabID); }, 5000);
  }
  
  


function deleteEntries(arr, id) {
    var i = arr.length;
    if (i) {   // (not 0)
        while (--i) {
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

function checkIcons(){

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)
{
     if(tab.status=="complete"){
        var url = tab.url;
        var id = tabId;
        deleteEntries(hashTable, id);
        deleteEntries(resultsTable, id);
        
        if((url.split("koovs").length>1)||(url.split("flipkart").length>1)||(url.split("infibeam").length>1)||(url.split("bookadda").length>1)||(url.split("myntra").length>1)||(url.split("shopclues").length>1)||(url.split("urbantouch").length>1)||(url.split("seventymm").length>1)||(url.split("fnp").length>1)||(url.split("pepperfry").length>1)||(url.split("futurebazaar").length>1)||(url.split("landmarkonthenet").length>1)||(url.split("shoppersstop").length>1)||(url.split("jabong").length>1)||(url.split("tradus").length>1)||(url.split("buytheprice").length>1)||(url.split("yebhi").length>1)||(url.split("healthkart").length>1)||(url.split("babyoye").length>1)||(url.split("hushbabies").length>1)||(url.split("homeshop18").length>1)||(url.split("snapdeal").length>1)||(url.split("indiacakes").length>1)||(url.split("naaptol").length>1)||(url.split("crossword").length>1)||(url.split("floralis").length>1)||(url.split("shopping.indiatimes").length>1)||(url.split("adexmart").length>1)||(url.split("deals.sulekha").length>1)||(url.split("watchkart").length>1)||(url.split("lenskart").length>1)||(url.split("bagskart").length>1)||(url.split("jewelskart").length>1)){
          var iconPath = "ext_green.png";
          var zero = 0;
          hashTable.push({
            tabID : id, tabURL : url, res : zero, count : zero
          });
        }
        else {
          var iconPath = "ext_gray.png";
          var two = 2;
          var zero = 0;
          hashTable.push({
            tabID : id, tabURL : url, res : two, count : zero
          });
        }

        
        chrome.pageAction.setIcon({tabId: tabId, path: iconPath});
        chrome.tabs.sendRequest(tab.id, { method: "getHTML"}, function(response) {
           console.log(response.data);
          if(typeof(response)!="undefined"&&typeof(response.data)!="undefined"&&response.data!=""&&response.data!=null){
            name = response.data;
            var name2 = name.split("-");
            name = name2.join(" ");
            var i = 0;
            while(inUSE[i]!=0){
              i++;
            }
            var toUSE = i;
            inUSE[toUSE] = 1;
            req = http[toUSE];
            var url2 = "http://more.buyhatke.com/grp3.php?searchText=" + encodeURIComponent(name.trim());
           console.log(url2);
           req.open("GET",url2,true);
            req.onload = (function(){
              var myID = tab.id;
              var wasUSING = toUSE;
            if (req.readyState == 4) {
            if(req.status == 200) {
               var msg = req.responseText;
               var values = JSON.parse(msg);
               if(values!=null){
               var len = values.length;
               }
               else {
                var len = 0;
               }
               for(i=0;i<len;i++){
                resultsTable.push({
                tabID : myID, link : values[i].link, prod : values[i].prod, image : values[i].image, price : values[i].price, site : values[i].position
                 });
               }
               
               
               chrome.browserAction.setBadgeBackgroundColor({tabId: myID, color: "#FF0000"});
               chrome.browserAction.setBadgeText({tabId: myID, text: len.toString()}); 
               inUSE[wasUSING] = 0;
               setAnimatingIcon1(myID);
             }
           }
       });
          req.send(null);
        
       }
   });
        
    
        
    }
    
});


chrome.tabs.onRemoved.addListener(function(tabId) {
        deleteEntries(hashTable, tabId);
        deleteEntries(resultsTable, tabId);    
});



}




checkIcons();
