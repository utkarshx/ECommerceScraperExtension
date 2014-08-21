

		function save_options(){
          var len = $('.ch-b').length;
          var subscribedFor = [];
          i = 0;
          for(k=0;k<len;k++){
          	if($('.ch-b:eq(' + k + ')').prop("checked")){
          	   subscribedFor[i]	= $('.ch-b:eq(' + k + ')').attr("data-item");
          	   i++;
          	}
          }
          localStorage.subscribedFor = subscribedFor;
          localStorage.saleStarted = 0;
          localStorage.saleFinished = 0;
          localStorage.refreshedYet = 0;
          localStorage.mostSensitive = 0;
          alert("Your Subscription Setting has been successfully saved !");
		}

	   function showOptions(){
	   	 
	   	 var data = localStorage.saleArray;
	   	 data = JSON.parse(data);
	   	 var string = ""; var checked1 = "";
	   	 for(k=0;k<data.length;k++){
	   	 	if(localStorage.subscribedFor == ""){
	   	 		 checked1 = "";
	   	 	}
	   	 	else {
	   	 		if(localStorage.subscribedFor.split(data[k].sale_id).length > 1){
	   	 			checked1 = "checked";
	   	 		}
	   	 	}
	   	 	string = string + '<label class="ch-w" for="check1"><input type="checkbox" ' + checked1 + ' class="ch-b"  id="check' + k + '" data-item=' + data[k].sale_id + '><span>' + data[k].details + '</span></label>';
	   	 }
	   	 string = string + '<input type="button" id="save" value="SAVE SETTINGS">';
	   	 document.getElementById('savingsForm').innerHTML = string;
	   	 document.getElementById('save').addEventListener('click', save_options);
	   }
	   showOptions();
