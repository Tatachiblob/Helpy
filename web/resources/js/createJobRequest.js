$(document).on('click','.createRequest',function(){
	var step_progress = $('input[name="stepProgress"]').val();
		if(step_progress == "Step 1"){
					$('.stepOne').css("display","");
					$('.stepThree,.stepTwo,.stepThree,.stepFour').css("display","none");
					
		}else if(step_progress == "Step 2"){
				$('.stepTwo').css("display","");
				$('.stepThree,.stepOne,.stepFour').css("display","none");			
		}else if(step_progress =="Step 3"){
			$('.stepThree').css("display","");
			$('.stepTwo,.stepOne,.stepFour').css("display","none");					
		}else if(step_progress == "Step 4"){
			$('.stepFour').css("display","");
			$('.stepTwo,.stepOne,.stepThree').css("display","none");				
		}
		$('#createJobRequestModal').modal("show");	
});

// **************** STEP 1 ******************** //
$(document).on('click','input[name="location"]',function(){
	if($(this).val()!=undefined){
		$('input[name="jr_location"]').val($(this).val());
		//$('input[name="stepProgress"]').val("Step 2");
		$('.validationError').html("").fadeOut("fast");
		//Add 'text-primary' class to the selected radio button
			if( $(this).val()=="Inside Campus" ){
				
				$('#insideCampusBuildings').css("display","");
				$('.InsideCampusLbl').addClass("text-primary").css("font-weight","bolder");
				$('.OutsideCampusLbl').removeClass("text-primary").css("font-weight","");
				
			}else{
				
				$('#insideCampusBuildings').css("display","none");
				$('.InsideCampusLbl').removeClass("text-primary").css("font-weight","");
				$('.OutsideCampusLbl').addClass("text-primary").css("font-weight","bolder");	
				
			}
		
	}else{
		$('input[name="stepProgress"]').val("Step 1");
	}
});

//**************** STEP 2 ******************** //
$(document).on('click','input[name="jobType"]',function(){
	if( $(this).val() != undefined ){
		
		$('.validationError').html("").fadeOut("fast");
		$('input[name="jr_jobType"]').val( $(this).val() );
		//$('input[name="stepProgress"]').val("Step 3");
		
		if( $(this).val()=="A-B" ){
			$('.type1Lbl').addClass("text-primary").css("font-weight","bolder");
			$('.type2Lbl,.type3Lbl').removeClass("text-primary").css("font-weight","");
		}else if( $(this).val()=="A-B-C.."){
			$('.type1Lbl,.type3Lbl').removeClass("text-primary").css("font-weight","");
			$('.type2Lbl').addClass("text-primary").css("font-weight","bolder");			
		}else{
			$('.type1Lbl,.type2Lbl').removeClass("text-primary").css("font-weight","");
			$('.type3Lbl').addClass("text-primary").css("font-weight","bolder");				
		}	
		
	}else{
		$('input[name="stepProgress"]').val("Step 2 Error");
	}
});


//**************** NEXT BUTTON ******************** //
$(document).on('click','.nextBtnStep1',function(){
	var step1 = $('input[name="jr_location"]').val();

	if(step1 == "" || step1 == undefined){
		$('.validationError').html("Please select location").fadeIn("fast");
	}else{
		$('input[name="stepProgress"]').val("Step 2");
		$('#cancelButton').removeClass("btn-danger closeBtnStep1").addClass("btn-warning").html("Back").addClass("closeBtnStep2");
		$('.stepOne,.stepThree').css("display","none");
		$('.stepTwo').css("display","");
		$(this).removeClass("nextBtnStep1").addClass("nextBtnStep2");
	}	
});
$(document).on('click','.nextBtnStep2',function(){
	$('input[name="iptTime"]').val('');
	$('input[name="jobTitle"]').val('');
	$('#jobDetailsTextArea').val('');
	 $('#cashRequired').val('');
	var step2 = $('input[name="jr_jobType"]').val();
	
	if(step2 == "" || step2 == undefined){
		$('.validationError').html("Please select job type").fadeIn("fast");
	}else{
		$('input[name="stepProgress"]').val("Step 3");
		$('#cancelButton').removeClass("btn-danger closeBtnStep2").addClass("btn-warning").html("Back").addClass("closeBtnStep3");
		$('.stepTwo,.stepOne').css("display","none");
		$('.stepThree').css("display","");
		$(this).removeClass("nextBtnStep2").addClass("nextBtnStep3");
		var dynamicContent = generateDynamicHtmlContent();
		$('#dynamicJobDetails').html('');
		$('#dynamicJobDetailsHTML').html(dynamicContent);
		var numberOfAddedFields = $('input[name="jr_AddFields"]').val();
		
		
		
		var jobType = $('input[name="jr_jobType"]').val();
		
		if(jobType == "A-B"){
			for(var a = 1; a <= 2; a++){
				getListOfBuildings("Type1"+a);
			}
		}else if(jobType == "A-B-C.."){
			for(var a = 1; a <= 3; a++){
				getListOfBuildings("Type2"+a);
			}			
		}else if(jobType == "A-B-A"){
			for(var a = 1; a <= 3; a++){
				getListOfBuildings("Type3"+a);
			}			
		}
	}
});
$(document).on('click','.nextBtnStep3',function(){
	var iptTime = $('input[name="iptTime"]').val();
	var iptJobTitle = $('input[name="jobTitle"]').val();
	var iptTask = [];
	var iptDetails = $('#jobDetailsTextArea').val();
	var validateTimeAndDate = validateInputtedTimeAndDate();
	var location = $('input[name="jr_location"]').val();
	if(location == "Inside Campus"){
		$('.btnBuildingSelectedValue').each(function(){
			var id = $('#'+this.id).val();
			iptTask.push(id);
		});
	}else{ 
		$('.userInputJobDetailsIpt').each(function(){
			var iptValue = $('#'+this.id).val();
			iptTask.push(iptValue);
		});
	}
		if(iptTime == "" || iptDetails == "" || iptDetails == undefined || iptJobTitle == "" || iptJobTitle == undefined ){//|| iptCash == "" || iptCash == undefined
			$('.validationError').html("Please dont leave a blank field").fadeIn("fast");
		}else if(!validateTimeAndDate){
			$('.validationError').html("Check time & date").fadeIn("fast");
		}else{
			var positibo = false;
			for(var a = 0; a<iptTask.length; a++){
				
				if(iptTask[a].length<1 || iptTask[a] == "Select Building"){
					positibo = false;
					a = iptTask.length + 1;
				}else{
					positibo = true;
				}
			}
			if(positibo == true){
				var details = "";
				for(var counter = 0; counter<iptTask.length; counter++){
					if(details == ""){
						details = iptTask[counter];
					}else{
						details = details+"|"+iptTask[counter];
					}
				}
				$('.validationError').html("").fadeOut("fast");
				$('input[name="jr_locationDetails"]').val(details);
				$('input[name="jr_details"]').val(details);
				//$('input[name="jr_time"]').val(setAmPmTime(iptTime));
				//$('input[name="jr_requiredCash"]').val(iptCashIpt);
				$('input[name="jr_title"]').val(iptJobTitle);
				$('input[name="jr_otherInfo"]').val(iptDetails);
				$(this).removeClass("nextBtnStep3").addClass("nextBtnStep4");
				$('input[name="stepProgress"]').val("Step 4");
				$('.stepTwo,.stepOne,.stepThree').css("display","none");
				$('.stepFour').css("display","");
				$('#cancelButton').removeClass("btn-danger closeBtnStep2").addClass("btn-warning").html("Back").addClass("closeBtnStep4");
				//createJob();
				//validateIfUserHasEnoughBalance();

			}else{
				
				$('.validationError').html("Please dont leave a blank field").fadeIn("fast");
				
			}

		}
		
	
});
$(document).on('click','.nextBtnStep4',function(){
	var method = $('input[name="jr_PaymentMethod"]').val();
	$('input[name="jr_requiredCash"]').val( $('input[name="iptCashInput"]').val() );
	if(method == "" || method == undefined || method == "undefined"){
		$('.validationError').html("Don't leave empty field(s)").fadeIn("fast");
	}else{
		var moneyValue = $('input[name="jr_requiredCash"]').val();
		console.log("Money Value: "+moneyValue);
		if(moneyValue == ""){
			$('.validationError').html("Invalid cash value").fadeIn("fast");
			setInterval(function(){
				$('.validationError').html("").fadeOut("fast");
			},3000);
		}else{
			$('input[name="jr_requiredCash"]').val(moneyValue);
			validateIfUserHasEnoughBalance();
		}
	}
});
//**************** BACK BUTTON ******************** //
$(document).on('click','.closeBtnStep1',function(){
	$('#createJobRequestModal').modal("hide");
	$('.validationError').fadeOut("fast");
});
$(document).on('click','.closeBtnStep2',function(){
	$('input[name="stepProgress"]').val("Step 1");
	$('.validationError').fadeOut("fast");
	$('#cancelButton').removeClass("closeBtnStep2 btn-warning").addClass("btn-danger closeBtnStep1").html("Cancel");
	$('#nxtButton').addClass("nextBtnStep1").removeClass("nextBtnStep2");
	$('.stepTwo,.stepThree,.stepFour').css("display","none");
	$('.stepOne').css("display","");

});
$(document).on('click','.closeBtnStep3',function(){
	$('.validationError').fadeOut("fast");
	$(this).removeClass("closeBtnStep3").addClass("closeBtnStep2");
	$('#nxtButton').addClass("nextBtnStep2").removeClass("nextBtnStep3");
	$('.stepOne,.stepThree,.stepFour').css("display","none");
	$('.stepTwo').css("display","");

});
$(document).on('click','.closeBtnStep4',function(){
	$('.validationError').fadeOut("fast");
	$(this).removeClass("closeBtnStep3").addClass("closeBtnStep2");
	$('#nxtButton').addClass("nextBtnStep3").removeClass("nextBtnStep2");
	$('.stepOne,.stepTwo,.stepFour').css("display","none");
	$('.stepThree').css("display","");

});
$('input[name="paymentMethod"]').click(function(){
	var method = $(this).val();
	$('input[name="jr_PaymentMethod"]').val(method);
	if(method != "Cash"){
		console.log("Method 2: "+method);
		$('.paymentType2').addClass("text-primary").css("font-weight","bolder");
		$('.paymentType1').removeClass("text-primary").css("font-weight","");
		$('#iptFormCash').css("display","");
	}else{
		console.log("Method 1: "+method);
		$('input[name="iptCashInput"]').val("0");
		$('.paymentType1').addClass("text-primary").css("font-weight","bolder");
		$('.paymentType2').removeClass("text-primary").css("font-weight","");
		$('#iptFormCash').css("display","none");
	}
});
$('input[name="iptTime"]').focusout(function(){
	var lol = validateInputtedTimeAndDate();
})
function validateInputtedTimeAndDate(){
	
	var val = $('input[name="iptTime"]').val();
	var newDate = new Date(val);
	var dateNow = new Date();
	var time = newDate.getHours()+":"+newDate.getMinutes();
	var date = newDate.getFullYear()+"-"+newDate.getMonth()+"-"+newDate.getDate();
	$('.invalidFeedBackTime').html("Invalid date");

	if(newDate.getDate() == dateNow.getDate() && newDate.getYear() == dateNow.getYear() && newDate.getMonth() == dateNow.getMonth() ){
		if( newDate.getHours() == dateNow.getHours() ){
			if(newDate.getMinutes() > dateNow.getMinutes()){
				$('input[name="iptTime"]').removeClass("is-invalid");
				$('input[name="jr_time"]').val(setAmPmTime(time));
				$('input[name="jr_JobDate"]').val(date);
				return true;
			}else{
				$('input[name="iptTime"]').addClass("is-invalid");
				$('.invalidFeedBackTime').html("Invalid time");
				return false;
			}
		}else if( newDate.getHours() >= dateNow.getHours()){
			$('input[name="iptTime"]').removeClass("is-invalid");
			$('input[name="jr_time"]').val(setAmPmTime(time));
			$('input[name="jr_JobDate"]').val(date);
			return true;
		}else{
			$('input[name="iptTime"]').addClass("is-invalid");
			$('.invalidFeedBackTime').html("Invalid time");
			return false;
		}
	}else if(newDate.getDate() >= dateNow.getDate()){
		$('input[name="iptTime"]').removeClass("is-invalid");
		$('input[name="jr_time"]').val(setAmPmTime(time));
		$('input[name="jr_JobDate"]').val(date);
		return true;
	}else if(newDate.getDate() < dateNow.getDate()){
		$('input[name="iptTime"]').addClass("is-invalid");
		$('.invalidFeedBackTime').html("Invalid date");
		return false;		
	}
	
	
	
}
function generateDynamicHtmlContent(){
	var location = $('input[name="jr_location"]').val();
	var jobType = $('input[name="jr_jobType"]').val();
	var htmlContent = "";
	if( location == "Inside Campus"){
		
		if(jobType == "A-B"){
			htmlContent ='<div class="d-flex flex-column dynamicHtmlContent">'+
							'<div class="btn-group mb-1">'+
							  '<button type="button" id="buildingNameType11" class="btn btn-primary dropdown-toggle btnBuildingSelectedValue" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:150%!important;">'+
							   	'Select Building(Point A)'+
							  '</button>'+
							  '<div class="dropdown-menu" id="dropdownMenuType11">'+
							  '</div>'+
						   '</div>'+
						   '<div class="btn-group">'+
							  '<button type="button" id="buildingNameType12" class="btn btn-primary dropdown-toggle btnBuildingSelectedValue" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:150%!important;">'+
							   	'Select Building(Point B)'+
							  '</button>'+
							  '<div class="dropdown-menu" id="dropdownMenuType12">'+
							  '</div>'+
						   '</div>'+
						'</div>';
		}
		else if(jobType == "A-B-C.."){
			 htmlContent ='<div class="d-flex flex-column dynamicHtmlContent">'+
					 			'<div class="btn-group mb-1">'+
									  '<button type="button" id="buildingNameType21"  class="btn btn-primary dropdown-toggle btnBuildingSelectedValue" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:150%!important;">'+
									   	'Select Building'+
									  '</button>'+
									  '<div class="dropdown-menu" id="dropdownMenuType21">'+
									  '</div>'+
								 '</div>'+
							   '<div class="btn-group mb-1">'+
								  '<button type="button"  id="buildingNameType22" class="btn btn-primary dropdown-toggle btnBuildingSelectedValue" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:150%!important;">'+
								   	'Select Building'+
								  '</button>'+
								  '<div class="dropdown-menu" id="dropdownMenuType22">'+
								  '</div>'+
							   '</div>'+
							   '<div class="btn-group mb-1">'+
								  '<button type="button"  id="buildingNameType23" class="btn btn-primary dropdown-toggle btnBuildingSelectedValue" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:150%!important;">'+
								   	'Select Building'+
								  '</button>'+
								  '<div class="dropdown-menu" id="dropdownMenuType23">'+
								 '</div>'+
							'</div>'+
							'<div class="d-flex flex-column dynamicHtmlContent" id="dynamicContentDropdowns">'+
							'</div>'+
							'<button type="button" class="btn btn-success btn-block addMoreFieldDropdown">Add more</button>';
		}
		else if(jobType == "A-B-A"){
			htmlContent ='<div class="d-flex flex-column dynamicHtmlContent">'+
									'<div class="btn-group mb-1">'+
									  '<button type="button"  id="buildingNameType31" class="btn btn-primary dropdown-toggle btnBuildingSelectedValue buildingNameType31" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:150%!important;">'+
									   	'Select Building(Point A)'+
									  '</button>'+
									  '<div class="dropdown-menu" id="dropdownMenuType31">'+
									  '</div>'+
								   '</div>'+
								   '<div class="btn-group mb-1">'+
									  '<button type="button"  id="buildingNameType32" class="btn btn-primary dropdown-toggle btnBuildingSelectedValue" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:150%!important;">'+
									   	'Select Building(Point B)'+
									  '</button>'+
									  '<div class="dropdown-menu" id="dropdownMenuType32">'+
									  '</div>'+
								   '</div>'+
								   '<input type="text" class="form-control form-control-sm btnBuildingSelectedValue" id="buildingNameType31Shit" value="" readonly>'+
/*								   '<div class="btn-group">'+
									  '<button type="button"  id="buildingNameType31" class="btn btn-primary dropdown-toggle btnBuildingSelectedValue buildingNameType31" value="Select Building" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:150%!important; opacity:0.5!important;" >'+
									   	'Select Building(Point A)'+
									  '</button>'+
									  '<div class="dropdown-menu" id="dropdownMenuType31">'+
									  '</div>'+
								   '</div>'+*/
						   '</div>';
		}
		
	}else if( location == "Outside Campus"){
			
		if(jobType == "A-B"){
			htmlContent = '<input type="text" class="form-control form-control-sm mb-1 userInputJobDetailsIpt" placeholder="Point A" id="iptFieldType11">'+
							'<input type="text" class="form-control form-control-sm userInputJobDetailsIpt" placeholder="Point B" id="iptFieldType12">';
			
		}
		else if(jobType == "A-B-C.."){
			htmlContent = '<input type="text" class="form-control form-control-sm mb-1 userInputJobDetailsIpt" id="iptFieldType21">'+
							'<input type="text" class="form-control form-control-sm mb-1 userInputJobDetailsIpt" id="iptFieldType22">'+	
							 '<input type="text" class="form-control form-control-sm mb-1 userInputJobDetailsIpt" id="iptFieldType23">'+
							 '<div id="dynamicContentInputField">'+
							 '</div>'+
							 '<button type="button" class="btn btn-success btn-block" id="addMoreInputField">Add more</button>';
		}
		else if(jobType == "A-B-A"){
			htmlContent = '<input type="text" class="form-control form-control-sm mb-1 userInputJobDetailsIpt" placeholder="Point A" id="iptFieldType31">'+
							'<input type="text" class="form-control form-control-sm mb-1 userInputJobDetailsIpt" placeholder="Point B" id="iptFieldType32">'+
								'<input type="text" class="form-control form-control-sm userInputJobDetailsIpt iptStyle3Shit" placeholder="Point A" readonly id="iptFieldType33">';
		}		
			
	}
	
	
	return htmlContent;
	
	
	
}

//Add more field button
$(document).on('click','.addMoreFieldDropdown',function(){
	var iptvalue = $('input[name="jr_AddFields"]').val();
	var incrementValue = parseInt(iptvalue) + 1;
	$('input[name="jr_AddFields"]').val(incrementValue);
	
	var content = '<div class="btn-group mb-1" id="dropdownBtnAdded'+incrementValue+'">'+
							  '<button type="button" id="buildingNameType2'+incrementValue+'"  class="mx-auto btn btn-primary dropdown-toggle btnBuildingSelectedValue btnBuildingSelectedValueAdded" value="Select Building" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:150%!important; border-top-right-radius:0!important; border-bottom-right-radius:0!important;">'+
							   	'Select Building'+
							  '</button>'+
					  '<div class="dropdown-menu" id="dropdownMenuType2'+incrementValue+'">'+
					  '</div>'+
					  '<button class="btn btn-danger removeDropdownBtn" id="dropdownBtnAdded'+incrementValue+'">X</button>'+
				 '</div>';
				 

	$('#dynamicContentDropdowns').append(content);
	
	getListOfBuildings("Type2"+incrementValue);
});

$(document).on('click','.removeDropdownBtn',function(){
	var id = $(this).attr("id");
	var getValue = $(this).val();
	$('#'+id).remove();
});


//Add more input field
$(document).on('click','#addMoreInputField',function(){
	var iptvalue = $('input[name="jr_AddFields"]').val();
	var incrementValue = parseInt(iptvalue) + 1;
	$('input[name="jr_AddFields"]').val(incrementValue);
	var htmlContent = '<div class="input-group mb-2" id="iptFieldType2'+incrementValue+'">'+
						'<input type="text" class="form-control form-control-sm userInputJobDetailsIpt" id="iptFieldType2'+incrementValue+'Ipt">'+
						'<div class="input-group-append">'+
							'<button type="button" class="btn btn-danger btn-sm" id="removeBtnIptField" value="iptFieldType2'+incrementValue+'">X</button>'+
						'</div>'+
					  '</div>';
	$('#dynamicContentInputField').append(htmlContent);
});
$(document).on('click','#removeBtnIptField',function(){
	var idNumber = $(this).val();
	$('#'+idNumber).remove();
});

function getListOfBuildings(idNumber){

	var btnList = "";
	$.ajax({
		url:"/getLaSalle/building/lists",
/*		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},*/
		type:"POST",
		success:function(responseData){
			$.each(responseData,function(index,value){
				btnList = '<button type="button" class="dropdown-item buildingNameBtn" id="buildingName'+idNumber+'" value='+value.buildingName+'>'+value.buildingName+'</button>';
				$('#dropdownMenu'+idNumber+'').append(btnList);
			});
		},
		error:function(){
			alert("Connection error, try refreshing your browser");
		}
	});
}


//Dropdown selected value for inside campus option
$(document).on('click','.buildingNameBtn',function(){
		var selectedBtn = $(this).attr("id");
		var selectedBtnValue = $(this).html();
		$('#'+selectedBtn).val("");
		$('#'+selectedBtn).html(selectedBtnValue);
		$('#'+selectedBtn).val(selectedBtnValue);
		var getValueOfStoredDetails = $('input[name="jr_details"]').val();
		$('#'+selectedBtn+"Shit").val(selectedBtnValue);
});

$(document).on('keyup','#iptFieldType31',function(){
	var typed = $(this).val();
	$('.iptStyle3Shit').val(typed);
});




function moveToTheSummaryPage(){

	var details = 	$('input[name="details"]').val();
	var split_details = details.split("$");
	for(var a = 0; a<split_details.length; a++){
			details_added = '<input type="text" class="form-control" disabled value="'+split_details[a]+'">';
			$('.detailsAdded').append(details_added);
	}
	//computation for total price
	var totalPointOfDestination = split_details.length;
	var pricePerPointOfDestination = 30;
	var requiredCash = $('input[name="requiredCash"]').val();
	var total = ( parseInt(totalPointOfDestination) * parseInt(pricePerPointOfDestination) ) + parseInt(requiredCash);
	
	var delivery_fee = totalPointOfDestination * 30;
	var total_fee = total;
	
	$('input[name="deliveryFee"]').val(delivery_fee);
	$('input[name="totalFee"]').val(total_fee);
	
	$('#sum_location').val($('input[name="location"]').val());
	$('#otherInformationLocationDetails').text($('input[name="locationDetails"]').val());
	$('#summ_JobType').val($('input[name="jobType"]').val());
	$('#job_Category').val($('input[name="category"]').val());
	$('#timeSet').val($('input[name="time"]').val());
	$('#cash_required').val(	$('input[name="requiredCash"]').val() );
	$('#summ_OtherInformation').text($('input[name="otherInfo"]').val());
	$('.totalPrice').html(total.toLocaleString());
	
	$('#exampleModalCenter').modal('hide');
	$('head').append('<link rel="stylesheet" href="/css/summary.css" id="summaryCSS">');
	$('#pageContent').css("display","none");
	$('#summaryPart').fadeIn("slow");	
	
}

$('#cashRequired').keyup(function(){
	var val = $(this).val();
	if(val.length>4){
		$(document).find('*').off('keyup keydown keypressed');
	}
});


function setAmPmTime(time){
	var splitTime = time.split(":");
	
	var timeIpt = new Date();
	var hrTime = ["12","01","02","03","04","05","06","07","08","09","10","11","12","01","02","03","04","05","06","07","08","09","10","11"];
	var AmPm = ["AM","PM"];
	var timeHour = "";
	var determineAmPm = "";
	if(splitTime[0]>=12){
		timeHour = hrTime[splitTime[0]]; 
		determineAmPm = "PM";
	}else{
		determineAmPm = "AM"
		timeHour = splitTime[0];
	}
	var timeOut = timeHour+":"+splitTime[1]+" "+determineAmPm;
	
	
	return timeOut;
}

function validateIfUserHasEnoughBalance(){
	var userBalance = $('#userBalance').html();
	var jobType = $('input[name="jr_jobType"]').val();
	var location = $('input[name="jr_location"]').val();
	var otherLocationDetailsIpt = $('input[name="jr_details"]').val();
	var requiredCash = $('input[name="jr_requiredCash"]').val();
/*	var splitOtherLocation = otherLocationDetailsIpt.split("|");*/
	var job = [];
	var info = {};
			info["job_type"] = jobType;
			info["other_info"] = userBalance;
			info["location"] = location;
			info["location_details"] = otherLocationDetailsIpt;
			info["status"] = requiredCash;
			job.push(info);
			
	$.ajax({
		url:"/user/compute/total/fee/validate",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		data:JSON.stringify(job),
		success:function(response){
			if(response.allowUserToCreateJob == "Allowed"){
				$('input[name="jr_deliveryFee"]').val(response.deliveryFee);
				$('input[name="jr_totalFee"]').val(response.locationDetailPrice);
				createJob();
				moveToSummaryJob();	
			}else{
				$('.validationError').html("Insufficient Balance").fadeIn("fast");
							
			}
		},
		error:function(responseError){
			console.log("Error: "+responseError);
		}
	});
	
}


function moveToSummaryJob(){
	var details = 	$('input[name="jr_locationDetails"]').val();
	var split_details = details.split("|");
	var otherLocationDetials = $('input[name="jr_details"]').val();
	var splitOtherLocation = otherLocationDetials.split("|");
	var txtAreaContent = "";
	for(var a = 0; a<splitOtherLocation.length; a++){
		txtAreaContent += splitOtherLocation[a]+"\n";
	}
	//computation for total price
	var totalPointOfDestination = split_details.length;
	var pricePerPointOfDestination = 30;
	var requiredCash = $('input[name="jr_requiredCash"]').val();
	var deliveryFee = $('input[name="jr_deliveryFee"]').val();
	var total = $('input[name="jr_totalFee"]').val();

	$('#delivery_fee').val(deliveryFee);
	$('#sum_location').val($('input[name="jr_location"]').val());
	$('#otherInformationLocationDetails').text(txtAreaContent);
	$('#job_Type').val($('input[name="jr_jobType"]').val());
	$('#job_Title').val($('input[name="jr_title"]').val());
	$('#job_Time').val($('input[name="jr_time"]').val());
	$('#cash_required').val(	$('input[name="jr_requiredCash"]').val() );
	$('#summ_OtherInformation').text($('input[name="jr_otherInfo"]').val());
	$('.totalPrice').html(total.toLocaleString());
	$('#createJobRequestModal').modal('hide');
	$('head').append('<link rel="stylesheet" href="/css/summary.css" id="summaryCSS">');
	$('#pageContent').css("display","none");
	$('#summaryPart').fadeIn("slow");
}

function createJob(){
	var job = [];
	var info = {};
	
	info["Location"] = $('input[name="jr_location"]').val();
	info["Location_Details"] = $('input[name="jr_details"]').val();
	info["Job Type"] = $('input[name="jr_jobType"]').val();
	info["Time"] = $('input[name="jr_time"]').val();
	info["Title"] = $('input[name="jr_title"]').val();
	info["Details"] = $('input[name="jr_otherInfo"]').val();
	info["Required Cash"] = $('input[name="jr_requiredCash"]').val();
	
	job.push(info);
}














$(document).on('click','.cancelJobRequestBtn',function(){
	$('#cancelRequestModalSummaryPage').modal("show");
});
$(document).on('click','.cancelRequestModalSummaryPageBtn',function(){
	$('#summaryCSS').remove();
	$('#summaryPart').css("display","none");
	$('#pageContent').css("display","");
	$('#cancelRequestModalSummaryPage').modal("hide");
});

$('.submitJobRequestBtn').click(function(){
	$(this).removeClass('.submitJobRequestBtn');
	var job = [];
	var info = {};
	
	info["location"] = $('input[name="jr_location"]').val();
	info["location_details"] = $('input[name="jr_locationDetails"]').val();
	info["delivery_fee"] = parseFloat( $('input[name="jr_deliveryFee"]').val() );
	info["total_fee"] = parseFloat( $('input[name="jr_totalFee"]').val() );
	info["required_cash"] = parseFloat( $('input[name="jr_requiredCash"]').val() );
	info["time"] = $('input[name="jr_time"]').val();
	info["job_type"] = $('input[name="jr_jobType"]').val();
	info["category"] = $('input[name="jr_title"]').val();
	info["other_info"] = $('input[name="jr_otherInfo"]').val();
	info["jobDate"] = $('input[name="jr_JobDate"]').val();
	job.push(info);
	$.ajax({
		url:"/user/create/request/move/summary/page",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		data:JSON.stringify(job),
		success:function(responseData){
		
			if(responseData.response == "success"){
				location.href = "/profile"
			}
		},
		error:function(response){
			console.log("error: "+response);''
		}
	});
});