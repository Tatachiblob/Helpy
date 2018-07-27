$('.createRequest').click(function(){
	$('.validationError').fadeOut("fast");
	$('#exampleModalCenter').modal("show");
	var stepProgress = $('input[name="stepProgress"]').val();
	console.log(stepProgress);
	if(stepProgress=="Step 1"){
		$('.closeBtn').html("Back");
		$('.stepTwo').css("display","none");
		$('.stepThree').css("display","none");
		$('.stepOne').fadeIn("fast");
	}else if(stepProgress=="Step 2"){
		$('.closeBtn').html("Back");
		$('.stepOne').css("display","none");
		$('.stepThree').css("display","none");
		$('.stepTwo').fadeIn("fast");		
	}else if(stepProgress=="Step 3"){
		$('.closeBtn').html("Back");
		$('.stepOne').css("display","none");
		$('.stepTwo').css("display","none");
		$('.stepThree').fadeIn("fast");		
	}
});

$(document).ready(function(){
	displayUserInformation();
	getListOfBuildings();
/*	$('.modalBody').css("height","187px");*/
});
//Close button
$(document).on("click",".closeBtn",function(){
	var stepProgress = $('input[name="stepProgress"]').val();
	if(stepProgress == "Step 1"){
		
		$(this).html("Cancel");
		$('#exampleModalCenter').modal("hide");
		
	}else if(stepProgress == "Step 2"){
		
		$('input[name="stepProgress"]').val("Step 1");
		$(this).html("Back");
		$('.stepTwo').css("display","none");
		$('.stepThree').css("display","none");
		$('.stepOne').fadeIn("fast");	
		
	}else if(stepProgress == "Step 3"){
		
		$('input[name="stepProgress"]').val("Step 2");
		$(this).html("Back");
		$('.stepOne').css("display","none");
		$('.stepThree').css("display","none");
		$('.stepTwo').fadeIn("fast");		
		
	}	
});
//Next Button
	$(document).on("click",".nextBtn",function(){
		
		var progressValue = $('input[name="stepProgress"]').val();

		
		if(progressValue=="Step 1"){

			var validate = validateStepOne();
			if(validate=="Success"){
				$('input[name="stepProgress"]').val("Step 2");
				$('.stepOne').css("display","none");
				$('.stepThree').css("display","none");
				$('.stepTwo').fadeIn("fast");	
				$('.validationError').css("display","none");
			}else{
				$('.validationError').fadeIn("fast").html(validate);
			}
			
		}else if(progressValue == "Step 2"){
			
			var validateStep2 = validateStepTwo();
			if(validateStep2=="Success"){
				$('.stepOne').css("display","none");
				$('.stepTwo').css("display","none");
				$('.stepThree').fadeIn("fast");		
				$('.validationError').css("display","none");
				
				var type = $('input[name="jobType"]').val();
				
					if(type == "type 1"){
						$('.type2, .typ3').css("display","none");
						$('.type1').css("display","");
					}else if(type == "type 2"){
						$('.type1, .typ3').css("display","none");
						$('.type2').css("display","");
					}else if(type == "type 3"){
						$('.type2, .typ1').css("display","none");
						$('.type3').css("display","");
					}	
					$('input[name="stepProgress"]').val("Step 3");
			}else {
				$('.validationError').fadeIn("fast").html(validateStep2);
			}
			
		}else if(progressValue == "Step 3"){

			var validate3 = validateStepThree();
			if(validate3 != "Success"){
				$('.validationError').fadeIn("fast").html(validate3);
			}else{
				$('.validationError').fadeOut("fast");
				computationOfTransaction();
				moveToTheSummaryPage();
			}
		}
	});
	
	
	
//Step 1
	//Select location radio button
			$(' input[name="location"],#locationForm ').on("change",function(){
				var selectedItem = $(this).val();
				console.log(selectedItem);
				
				if(selectedItem == "Inside Campus"){
					
					$('#selectBuildingSectionLocation').css("display","");
					$('#locationDetailsIpt').css("display","none");
					
				}else if(selectedItem == "Outside Campus"){
					
					$('#selectBuildingSectionLocation').css("display","none");
					$('#locationDetailsIpt').css("display","");
					
				}
				
			});
	//Select what building if inside campus dropdown button
			$(document).on("click","#buildingName",function(){
				var buildingName = $(this).html();
				$('.btnBuildingSelectedValue').html(buildingName).val(buildingName);
			});
			
// Step 2
		//Get time now button
			$(document).on("click",".getTimeNotBtn",function(){
				var time = new Date();
				var hours = "";
				var minutes = "";
					if(time.getHours()<10){
						hours = "0"+time.getHours();
					}else{
						hours = time.getHours();
					}
					if(time.getMinutes()<10){
						minutes ="0"+time.getMinutes();
					}else{
						minutes = time.getMinutes();
					}
				var setTime = hours+":"+minutes;
				$('input[name="userTimeInput"]').val(setTime);
			});

//Step 3
			//Add fields for #2 job type
			$(document).on("click","#addJobDetailsBtn",function(){
				var value = $(this).val();
				var incrementValue = parseInt(value)+1;
				var iptField='	<div class="input-group  input-group-sm mb-2 col" id="'+incrementValue+'" > '+
							 ' 		<input type="text" class="form-control type2Fields" name="type2IptDetails'+incrementValue+'" aria-label="Username" aria-describedby="basic-addon2"> '+
							 ' 		<div class="input-group-prepend rounded-right"> '+
							 '   		<button type="button" class="btn btn-outline-danger rounded-right btn-sm removeButton" value="'+incrementValue+'">X</button'+
							 '   	</div> '+							 
							 ' 	</div>	';
				$('.inputFieldsJobDetails').append(iptField);
				$(this).val(incrementValue);
			});
			//Remove field that is added by the user
			$(document).on("click",".removeButton",function(){
				var value = $('#addJobDetailsBtn').val();
				var getValue = $(this).val();

					var total = $('#addJobDetailsBtn').val();
					var total1 = parseInt(getValue);
			
					$('#'+getValue).remove();
					value --;
					if(value<4)
						value = 3;
				$('#addJobDetailsBtn').val(value);
			});
			
//Log out 
			$('.logOutLink').click(function(){
				$('#logOutModal').modal("show");
			});
			$('.logoutBtn').click(function(){
				$.ajax({
					url:"/profile/user/logout",
					type:"GET",
					headers	:	{
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					},
					success:function(responseData){
						location.href=responseData.response;
					},
					error:function(responseError){
						console.log(responseError);
					}
				});
			});
function displayUserInformation(){
	$.ajax({
		url:"/getUserInformation/userProfile",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		success:function(responseData){
			if(responseData.length!="0"){
				$.each(responseData,function(index,value){
						$('.txtUserName').html(value.name);
						$('input[name="userRemainingBalance"]').val(value.remaining_balance);
				});
			} else{
				location.href="/signin";
			}
		},
		error:function(){
			alert("Please sign in first");
		}
	});
}


function getListOfBuildings(){

	var btnList = "";
	$.ajax({
		url:"http://localhost:8080/getLaSalle/building/lists",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		type:"POST",
		success:function(responseData){
			$.each(responseData,function(index,value){
				btnList = '<button type="button" class="dropdown-item" id="buildingName" value='+value.buildingName+'>'+value.buildingName+'</button>';
				$('.dropdown-menu').append(btnList);
			});
		},
		error:function(){
			alert("Connection error, try refreshing your browser");
		}
	});
}


function validateStepOne(){
	var locationValue = $('input[name="location"]:checked').val();

	if(locationValue=="" || locationValue==undefined){
		return "Invalid";
	}else if(locationValue == "Inside Campus"){
		var buildingSite = $('.btnBuildingSelectedValue').val();
		var roomNumber = $('#insideCampusLocationDetails').val();
		if(buildingSite != "Select Building" ){
			$('input[name="location"]').val(locationValue);
			$('input[name="locationDetails"]').val(buildingSite+" ("+roomNumber+")");
			return "Success";
		}else{
			return "Please check the fields";
		}
	}else if(locationValue == "Outside Campus"){
		return "Success";
/*		var locationDetailsOutside = $('#locationDetailsIpt').val();
		if(locationDetailsOutside == undefined || locationDetailsOutside == ""){
			return "Please input location details";
		}else{
			$('input[name="location"]').val(locationValue);
			$('input[name="locationDetails"]').val(locationDetailsOutside);	
			return "Success";			
		}	*/
	}

}
function validateStepTwo(){
	var jobType = $('input[name="jobType"]:checked').val();
	var time = $('input[name="userTimeInput"]').val();
	if(jobType == undefined || time == ""){
		return "Please check fields";
	}
	else{
		$('input[name="jobType"]').val(jobType);
		$('input[name="time"]').val(time);
		return "Success";
	}
	console.log("Step Two Validated: "+jobType);
}
function validateStepThree(){
	var job_category = $('input[name="jobCategory"]').val();
	var cash_required = $('input[name="cashRequired"]').val();
	var other_information = $('#otherInformation').val();
	var jobType = $('input[name="jobType"]').val();
	console.log("JOB TYPE: "+jobType);
	var details = "";
	if(job_category == "" || cash_required == "" || other_information == "" || jobType == "" ){
		return "Please check the fields above, don't leave blank field";
	}else{
			if(jobType == "type 1"){
				var detail1,detail2;
				details = $("input[name='type1IptDetails1']").val() +"$"+ $("input[name='type1IptDetails2']").val();
				detail1 = $("input[name='type1IptDetails1']").val();
				detail2 = $("input[name='type1IptDetails2']").val();
				
				if(detail1 == "" || detail1 == undefined || detail2 == "" || detail2 == undefined ){
					return "Please check the fields above, don't leave blank field";
				}else{
					$('input[name="category"]').val(job_category);
					$('input[name="details"]').val(details);
					$('input[name="requiredCash"]').val(cash_required);
					$('input[name="otherInfo"]').val(other_information);
					return "Success";
				}
			}else if(jobType == "type 3"){
				var detail1, detail2, detial3;
				details = $("input[name='type3IptDetails1']").val() +"$"+ $("input[name='type3IptDetails2']").val() +"$"+ $("input[name='type3IptDetails3']").val();
				detail1 = $("input[name='type3IptDetails1']").val();
				detail2 = $("input[name='type3IptDetails2']").val();
				detail3 = $("input[name='type3IptDetails3']").val();
				
				
				if(detail1 == "" || detail1 == undefined || detail2 == "" || detail2 == undefined || detail3 == "" || detail3 == undefined){
					return "Please check the fields above, don't leave blank field";
				}else{
					$('input[name="category"]').val(job_category);
					$('input[name="details"]').val(details);
					$('input[name="requiredCash"]').val(cash_required);
					$('input[name="otherInfo"]').val(other_information);
					return "Success";
				}
			}else{
				var counter = $('#addJobDetailsBtn').val();
				var userAddedDetails = "";
				var availableInputs = $('.inputFieldsJobDetails').find($('.type2Fields'));
				$('.inputFieldsJobDetails :input').each(function(){
					var value = $(this).val();
					if(value.length > 1){
						userAddedDetails = userAddedDetails + "$" + $(this).val();
						
					}
				});
				var type2Ipt1 = $('input[name="type2IptDetails1"]').val();
				if(type2Ipt1 == ""){
					return "Please check the fields above, don't leave blank field";
				}else{
						for(var a=1; a<=3; a++){
							var validateField = $('input[name="type2IptDetails'+a+'"').val();
							if(validateField == ""){
								a=counter;
								return "Please check the fields above, don't leave blank field";
							}else{
								if(details==""){
									details = $('input[name="type2IptDetails1"]').val();
								}else{
									details = details +"$"+ $('input[name="type2IptDetails'+a+'"]').val();  
								}
							}
						}
						details = details + userAddedDetails;
				}
				if(details == "" || details == undefined){
					return "Please check the fields above, don't leave blank field";
				}else{
					$('input[name="category"]').val(job_category);
					$('input[name="details"]').val(details);
					$('input[name="requiredCash"]').val(cash_required);
					$('input[name="otherInfo"]').val(other_information);
					return "Success";
				}
				
			}

	}
}

function computationOfTransaction(){
	var requiredCash = $('input[name="requiredCash"]').val();
	var details = 	$('input[name="details"]').val();
	var split_details = details.split("$");
	var location = $('input[name="location"]').val();
	var totalPointOfDestination = split_details.length - 1;
	var pricePerPointOfDestination = 0;
	if(location == "Outside Campus"){
		pricePerPointOfDestination = 60;
	}else if(location == "Inside Campus"){
		pricePerPointOfDestination = 40;
	}
	var total = totalPointOfDestination * pricePerPointOfDestination;
	console.log("Total: "+total);
	
	
}


/*function moveToTheSummaryPage(){

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
	console.log()
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
	
}*/


/*setInterval(function(){
	alert("Hello");
},60000);*/
