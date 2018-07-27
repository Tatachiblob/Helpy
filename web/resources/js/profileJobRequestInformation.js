$(document).on('click','.viewProfileBtn',function(){
	var id = $(this).val();
	getProfilePictureOfServer(id);
	getJobRequesterProfileInformation(id);
	$('#viewRequesterProfileInformation').modal("show");
})

$(document).on('click','.viewJobBtn',function(){
	var id = $(this).attr("id");
	viewJobDescription(id);
});


$(document).on('click','.acceptJobBtn',function(){

	var id = $(this).val();
	var listId = $(this).attr("id");
	//acceptJobRequest(id);
	$('.okayButtonResponse1').addClass("acceptJobResponseBtn").val(id).attr("id",listId);
	showModal("Accept # "+id+" job request?","Accept Job Request");
	
});
$(document).on('click','.acceptJobResponseBtn',function(){
	var id = $(this).val();
	var idList = $(this).attr("id");
	acceptJobRequest(id,idList);
	
});



$(document).on('click','.OkayButtonJobRequestInformation',function(){
	$('#jobRequestInformationModal').modal("hide");
});
function showModal(messageBody,modalHeader){
	
	$('.modalBodyResponse').html(messageBody);
	$('#exampleModalLabel').html(modalHeader);
	$('#jobRequestResponse').modal("show");
}
function viewJobDescription(id){
	console.log(id);
	var info = {};
	var userInfo = [];
	info["job_id"] = id;
	userInfo.push(info);
	$.ajax({
		url:"/request/profile/get/job/details",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},	
		data:JSON.stringify(userInfo),
		success:function(responseData){
			$.each(responseData,function(index,value){
				$('#jobInfoJobId').html(value.job_id);
				$('#jobInfoJobCategory').html(value.category);
				$('#jobInfoTime').html(value.time);
				$('#jobInfoRequiredCash').html('&#8369; '+value.required_cash);
				$('#jobInfoDeliveryFee').html(value.delivery_fee);
				$('#jobInfoJobType').html(value.job_type);
				var jobDetails = value.location_details;
				var splitJobDetails = jobDetails.split("|");
				var htmlContent = "";
				for(var counter = 0; counter < splitJobDetails.length; counter++){
					if(htmlContent == ""){
						htmlContent = splitJobDetails[counter];
					}else{
						htmlContent = htmlContent+", "+splitJobDetails[counter];
					}
				}
				$('#jobInfoLocation').html(value.location+"("+htmlContent+")");
				$('#jobInfoJobDetails').html(value.other_info);
				
			});
		},
		error:function(){
			console.log("Error Response");
		}
		
	});
	$('#jobRequestInformationModal').modal("show");
}

function acceptJobRequest(job_id,idList){
	var info = {};
	var userInfo = [];
	info["job_id"] = job_id;
	userInfo.push(info);
	
	$.ajax({
		url : "/profile/viewrequestid/acceptrequest",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},		
		type : "POST",
		contentType:"JSON",
		data : JSON.stringify(userInfo),
		success:function(responseData){
			console.log(responseData.response);
			if(responseData.response == "Success"){
				$('.collapse').removeClass("show");
				$('#'+idList+'ACCORDION').addClass("bg-primary text-light");
				$('#jobRequestInformationModal,#jobRequestResponse').modal("hide");
				$('.okayButtonResponse1').attr("id","").val("").addClass("okayButtonResponse");
				$('.finishJobBtnUpdateDetails').removeClass(".acceptJobBtn").html("In progress").addClass("finishJobDoer").val(job_id);
				loadAllUsersWithRequestDesktop();
				loadAllUsersWithRequestMobile();
			}else{
				$('#jobRequestResponse').modal("hide");
				$('#pendingJobRequestModal').modal("show");
			}
			
		},
		error:function(){
			console.log("Error Response	");
		}
		
	});
	
}
function loadAllUsersWithRequestDesktop(){
	$('#activeJobRequestsLists,#acceptedJobRequestsLists,#completedJobRequestsLists').html('');
	var adminValidation = $('input[name="adminValidation"]').val();
	$('#activeJobRequestsLists').html('');
	var userName = $('.txtUserName').html();
	var listView = "";
	var buttonList = "";
	var serverName = "";
	var myPercentage = "."+$('input[name="userPercentage"]').val();
	$.ajax({
		url:"/profile/doerview",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},	
		success:function(responseData){
			$.each(responseData,function(index,value){
				var job_income = myPercentage * value.delivery_fee;	
				var locationHTML = value.location_details;
				var splitLocationDetails = locationHTML.split("|");
				var HtmlContent = "";
				for(var counter = 0; counter < splitLocationDetails.length; counter++){
					if(HtmlContent == ""){
						HtmlContent = splitLocationDetails[counter];
					}else{
						HtmlContent = HtmlContent+", "+splitLocationDetails[counter];
					}
				}
				
				if(value.status == "In progress"){
					
								if(value.name == userName){
									serverName = "Me";
									
									if(value.status == "In progress"){
										
										buttonList = '<div class="col mt-3">'+
														'<button type="submit" class="btn btn-light float-right mr-3 mt-3">In progress</button>'+
			
													'</div>';	
										
									}else{
										
										buttonList = '<div class="col mt-3">'+
															'<button type="submit" class="btn btn-outline-info float-right mr-3 mt-3 finishJob" disabled>In progress</button>'+
													  '</div>';
										
									}		
								}else if(adminValidation == false || adminValidation == "false"){
									serverName = value.name;
									buttonList = '<div class="col mt-3">'+
													'<button type="submit" value="'+value.job_id+'" class="btn btn-outline-success float-right mr-3 mt-3 accountNotValidated">Accept</button>'+
													'<button type="submit" id="'+value.id+'" class="btn btn-outline-light float-right mr-3 mt-3 viewProfileBtn" value="'+value.server_job_id+'">View Profile</button>'+
													'<button type="submit" id="'+value.job_id+'" class="btn btn-outline-light float-right mr-3 mt-3 viewJobBtn">View Job</button>'+
												'</div>';							
								} 
								else{
									serverName = value.name;
									if(value.status == "In progress"){
										
										buttonList = '<div class="col mt-3">'+
														'<button type="submit" value="'+value.job_id+'" id="'+value.id+'" class="btn btn-success float-right mr-3 mt-3 btnFinishJob">Finish</button>'+
														'<button type="submit" id="'+value.id+'" class="btn btn-outline-light float-right mr-3 mt-3 viewProfileBtn" value="'+value.server_job_id+'">View Profile</button>'+
														'<button type="submit" id="'+value.job_id+'" class="btn btn-outline-light float-right mr-3 mt-3 viewJobBtn">View Job</button>'+
													'</div>';	
										
									}else{
										
										buttonList = '<div class="col mt-3">'+
															'<button type="submit" value="'+value.job_id+'" id="'+value.id+'" class="btn btn-outline-success float-right mr-3 mt-3 acceptJobBtn">Accept</button>'+
															'<button type="submit" id="'+value.id+'" class="btn btn-outline-light float-right mr-3 mt-3 viewProfileBtn" value="'+value.server_job_id+'">View Profile</button>'+
															'<button type="submit" id="'+value.job_id+'" class="btn btn-outline-light float-right mr-3 mt-3 viewJobBtn">View Job</button>'+
														'</div>';
										
									}
								}	
							
					listView = '<li class="col listOfUserWithActiveRequests mt-2 mb-2 text-white bg-primary" id="'+value.id+'ACCORDION">'+									
					
								'<div class="row mt-2 p-2">'+
									'<div class="col col-lg-1">'+
										'<img src="/img/person.png" width="100%" height="auto" class="rounded-circle p-1 border border-primary bg-light mt-2">'+
									'</div>'+
						
									'<div class="col-sm">'+
										'<div class="" style="">'+
											'<div style=" width:605px; font-weight: bolder!important; margin-bottom:-1px; overflow:hidden!important;  white-space:nowrap; text-overflow: ellipsis!important; ">'+
												value.category+
											'</div>'+
										'</div>'+
										'<div class="d-flex flex-row" style="font-size:70%!important; width:100%!important;">'+
											'<span class="d-block">Required Cash: <strong>&#8369;'+value.required_cash+'<span class="text-warning">&nbsp&nbsp|</span> </strong> </span>'+
											'<span class="d-block ml-2"> Delivery Fee: <strong>&#8369;'+value.delivery_fee+'<span class="text-warning">&nbsp&nbsp|</span> </strong> </span>'+
											'<span class="d-block ml-2"> Income: <strong>&#8369;'+job_income+'<span class="text-warning">&nbsp&nbsp|</span> </strong> </span>'+
											'<span class="d-block ml-2"> Job Request Valid Until: <strong>'	+value.time+'</strong></span>'+
										'</div>'+
										'<div class="d-inline" style="font-size:60%!important">'+
											'<span class="d-block" id="locationDetailsJobsTabView">Location: '+value.location+'('+HtmlContent+')</span>'+
										'</div>'+
										'<div class="d-inline" style="font-size:60%!important">'+
											'<span class="d-block">'+serverName+'</span>'+
										'</div>'+
									'</div>'+
						
									buttonList+
									
								'</div>'+						
							'</li>';						
				}
				else if(value.status == "Completed"){
					
								if(value.name == userName){
									serverName = "Me";
									if(value.status == "In progress"){
										
										buttonList = '<div class="col mt-3">'+
														'<button type="submit" class="btn btn-info float-right mr-3 mt-3 finishJob" disabled>In progress</button>'+
			
													'</div>';	
										
									}else{
										
										buttonList = '<div class="col mt-3">'+
															'<button type="submit" class="btn btn-info float-right mr-3 mt-3 finishJob" disabled>In progress</button>'+
													  '</div>';
										
									}		
								}else if(adminValidation == false || adminValidation == "false"){
									serverName = value.name;
									buttonList = '<div class="col mt-3">'+
													'<button type="submit" value="'+value.job_id+'" class="btn btn-outline-success float-right mr-3 mt-3 accountNotValidated">Accept</button>'+
													'<button type="submit" id="'+value.id+'" class="btn btn-outline-primary float-right mr-3 mt-3 viewProfileBtn" value="'+value.server_job_id+'">View Profile</button>'+
													'<button type="submit" id="'+value.job_id+'" class="btn btn-outline-info float-right mr-3 mt-3 viewJobBtn">View Job</button>'+
												'</div>';							
								} 
								else{
									serverName = value.name;
									if(value.status == "In progress"){
										
										buttonList = '<div class="col mt-3">'+
														'<button type="submit" value="'+value.job_id+'" id="'+value.id+'" class="btn btn-success float-right mr-3 mt-3 btnFinishJob">Finish</button>'+
														'<button type="submit" id="'+value.id+'" class="btn btn-outline-primary float-right mr-3 mt-3 viewProfileBtn" value="'+value.server_job_id+'">View Profile</button>'+
														'<button type="submit" id="'+value.job_id+'" class="btn btn-outline-info float-right mr-3 mt-3 viewJobBtn">View Job</button>'+
													'</div>';	
										
									}else{
										
										buttonList = '<div class="col mt-3">'+
															'<button type="submit" value="'+value.job_id+'" id="'+value.id+'" class="btn btn-outline-success float-right mr-3 mt-3 acceptJobBtn">Accept</button>'+
															'<button type="submit" id="'+value.id+'" class="btn btn-outline-primary float-right mr-3 mt-3 viewProfileBtn" value="'+value.server_job_id+'">View Profile</button>'+
															'<button type="submit" id="'+value.job_id+'" class="btn btn-outline-info float-right mr-3 mt-3 viewJobBtn">View Job</button>'+
														'</div>';
										
									}
								}
					listView = '<li class="col listOfUserWithActiveRequests mt-2 mb-2 text-white bg-secondary" id="'+value.id+'ACCORDION">'+									
					
									'<div class="row mt-2 p-2">'+
										'<div class="col col-lg-1">'+
											'<img src="/img/person.png" width="100%" height="auto" class="rounded-circle p-1 border border-primary bg-light mt-2">'+
										'</div>'+
							
										'<div class="col-sm">'+
											'<div class="" style="">'+
												'<div style=" width:605px; font-weight: bolder!important; margin-bottom:-1px; overflow:hidden!important;  white-space:nowrap; text-overflow: ellipsis!important; ">'+
													value.category+
												'</div>'+
											'</div>'+
											'<div class="d-flex flex-row" style="font-size:70%!important; width:100%!important;">'+
												'<span class="d-block">Required Cash: <strong>&#8369;'+value.required_cash+'<span class="text-warning">&nbsp&nbsp|</span> </strong> </span>'+
												'<span class="d-block ml-2"> Delivery Fee: <strong>&#8369;'+value.delivery_fee+'<span class="text-warning">&nbsp&nbsp|</span> </strong> </span>'+
												'<span class="d-block ml-2"> Income: <strong>&#8369;'+job_income+'<span class="text-warning">&nbsp&nbsp|</span> </strong> </span>'+
												'<span class="d-block ml-2"> Job Request Valid Until: <strong>'	+value.time+'</strong></span>'+
											'</div>'+
											'<div class="d-inline" style="font-size:60%!important">'+
												'<span class="d-block" id="locationDetailsJobsTabView">Location: '+value.location+'('+HtmlContent+')</span>'+
											'</div>'+
											'<div class="d-inline" style="font-size:60%!important">'+
												'<span class="d-block">'+serverName+'</span>'+
											'</div>'+
										'</div>'+
							
										'<h4 class="text-white">Completed</h4>'+
										
									'</div>'+						
								'</li>';						
				}
				else if(value.status == "Active"){
									
								if(value.name == userName){
									serverName = "Me";
									if(value.status == "In progress"){
										
										buttonList = '<div class="col mt-3">'+
														'<button type="submit" class="btn btn-info float-right mr-3 mt-3 finishJob" disabled>In progress</button>'+
			
													'</div>';	
										
									}else{
										
										buttonList = '<div class="col mt-3">'+
															'<button type="submit" class="btn btn-primary float-right mr-3 mt-3">Active</button>'+
													  '</div>';
										
									}			
									}else if(adminValidation == false || adminValidation == "false"){
										serverName = value.name;
										buttonList = '<div class="col mt-3">'+
														'<button type="submit" value="'+value.job_id+'" class="btn btn-outline-success float-right mr-3 mt-3 accountNotValidated">Accept</button>'+
														'<button type="submit" id="'+value.id+'" class="btn btn-outline-primary float-right mr-3 mt-3 viewProfileBtn" value="'+value.server_job_id+'">View Profile</button>'+
														'<button type="submit" id="'+value.job_id+'" class="btn btn-outline-info float-right mr-3 mt-3 viewJobBtn">View Job</button>'+
													'</div>';							
									} 
									else{
										serverName = value.name;
										if(value.status == "In progress"){
											
											buttonList = '<div class="col mt-3">'+
															'<button type="submit" value="'+value.job_id+'" id="'+value.id+'" class="btn btn-success float-right mr-3 mt-3 finishJob">Finish</button>'+
															'<button type="submit" id="'+value.id+'" class="btn btn-outline-primary float-right mr-3 mt-3 viewProfileBtn" value="'+value.server_job_id+'">View Profile</button>'+
															'<button type="submit" id="'+value.job_id+'" class="btn btn-outline-info float-right mr-3 mt-3 viewJobBtn">View Job</button>'+
														'</div>';	
											
										}else{
											
											buttonList = '<div class="col mt-3">'+
																'<button type="submit" value="'+value.job_id+'" id="'+value.id+'" class="btn btn-outline-success float-right mr-3 mt-3 acceptJobBtn">Accept</button>'+
																'<button type="submit" id="'+value.id+'" class="btn btn-outline-primary float-right mr-3 mt-3 viewProfileBtn" value="'+value.server_job_id+'">View Profile</button>'+
																'<button type="submit" id="'+value.job_id+'" class="btn btn-outline-info float-right mr-3 mt-3 viewJobBtn">View Job</button>'+
															'</div>';
											
										}
									}
					listView = '<li class="col listOfUserWithActiveRequests mt-2 mb-2 text-dark" id="'+value.id+'ACCORDION">'+									
					
									'<div class="row mt-2 p-2">'+
										'<div class="col col-lg-1">'+
											'<img src="/img/person.png" width="100%" height="auto" class="rounded-circle p-1 border border-primary bg-light mt-2">'+
										'</div>'+
							
										'<div class="col-sm">'+
											'<div class="" style="">'+
												'<div style=" width:605px; font-weight: bolder!important; margin-bottom:-1px; overflow:hidden!important;  white-space:nowrap; text-overflow: ellipsis!important; ">'+
													value.category+
												'</div>'+
											'</div>'+
											'<div class="d-flex flex-row" style="font-size:70%!important; width:100%!important;">'+
												'<span class="d-block">Required Cash: <strong>&#8369;'+value.required_cash+'<span class="text-warning">&nbsp&nbsp|</span> </strong> </span>'+
												'<span class="d-block ml-2"> Delivery Fee: <strong>&#8369;'+value.delivery_fee+'<span class="text-warning">&nbsp&nbsp|</span> </strong> </span>'+
												'<span class="d-block ml-2"> Income: <strong>&#8369;'+job_income+'<span class="text-warning">&nbsp&nbsp|</span> </strong> </span>'+
												'<span class="d-block ml-2"> Job Request Valid Until: <strong>'	+value.time+'</strong></span>'+
											'</div>'+
											'<div class="d-inline" style="font-size:60%!important">'+
												'<span class="d-block" id="locationDetailsJobsTabView">Location: '+value.location+'('+HtmlContent+')</span>'+
											'</div>'+
											'<div class="d-inline" style="font-size:60%!important">'+
												'<span class="d-block">'+serverName+'</span>'+
											'</div>'+
										'</div>'+
							
										buttonList+
										
									'</div>'+						
								'</li>';		
				}
				
				if(value.status == "Active"){
					$('#activeJobRequestsLists').append(listView);
				}else if(value.status == "Completed"){
					$('#completedJobRequestsLists').append(listView);
				}else if(value.status == "In progress"){
					$('#acceptedJobRequestsLists').append(listView);
				}
			});
		},
		error:function(responseData){
			console.log("Error: "+responseData);
		}
	});
}


function loadAllUsersWithRequestMobile(){
	var cardColor = "";
	var btnColor = "";
	var userName = $('.txtUserName').html();
	$('#mobileViewJobRequests,#mobileViewJobRequestsAccepted,#mobileViewJobRequestsCompleted').html('');
	var listView = "";
	var buttonList = "";
	var myPercentage = "."+$('input[name="userPercentage"]').val();

	$.ajax({
		url:"/profile/doerview",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},	
		success:function(responseData){
			$.each(responseData,function(index,value){
				if(userName == value.name){
					if(value.status == "In progress"){
						cardColor = "bg-primary text-white";
						btnColor = "bg-primary text-white"
						buttonList = '<div id="'+value.id+'Button" class="collapse" aria-labelledby="'+value.id+'Button" data-parent="#accordion">'+
								      	'<div class="card-body d-flex flex-row justify-content-center">'+
							      			'<button type="submit" class="btn btn-success float-right mr-3 mt-3 ">Finish</button>'+
											'<button type="submit" class="btn btn-primary float-right mr-3 mt-3 " disabled>View Profile</button>'+
											'<button type="submit" class="btn btn-primary float-right mr-3 mt-3 " disabled>View Job</button>'+
							        	'</div>'+
							    	'</div>';		
						
					}else if(value.status == "Completed"){
						cardColor = "bg-secondary text-white";
						btnColor = "bg-secondary text-white";
						buttonList = '<div id="'+value.id+'Button" class="collapse" aria-labelledby="'+value.id+'Button" data-parent="#accordion">'+
								      	'<div class="card-body d-flex flex-row justify-content-center">'+
								      		'<p class="text-white>Completed</p> '+
							        	'</div>'+
							    	'</div>';							
					}else{
						cardColor = "bg-light text-dark";
						btnColor = "bg-light text-dark";
						buttonList = '<div id="'+value.id+'Button" class="collapse" aria-labelledby="'+value.id+'Button" data-parent="#accordion">'+
								      	'<div class="card-body d-flex flex-row justify-content-center">'+
							      			'<button type="submit" class="btn btn-success float-right mr-3 mt-3 " disabled>Accept</button>'+
											'<button type="submit" class="btn btn-primary float-right mr-3 mt-3 " disabled>View Profile</button>'+
											'<button type="submit" class="btn btn-primary float-right mr-3 mt-3 " disabled>View Job</button>'+
							        	'</div>'+
							    	'</div>';
					}
				}else{
					if(value.status == "In progress"){	
						cardColor = "bg-primary text-white";
						btnColor = "bg-primary text-white";
						buttonList = '<div id="'+value.id+'Button" class="collapse" aria-labelledby="'+value.id+'Button" data-parent="#accordion">'+
								      	'<div class="card-body d-flex flex-row justify-content-center">'+
							      			'<button type="submit" value="'+value.job_id+'" id="'+value.id+'"  class="btn btn-outline-success float-right mr-3 mt-3 btnfinishJob">Finish</button>'+
											'<button type="submit" id="'+value.id+'" class="btn btn-outline-primary float-right mr-3 mt-3 viewProfileBtn" value="'+value.server_job_id+'">View Profile</button>'+
											'<button type="submit" id="'+value.job_id+'" class="btn btn-outline-primary float-right mr-3 mt-3 viewJobBtn">View Job</button>'+
							        	'</div>'+
							    	'</div>';
						
					}else if(value.status == "Completed"){
						cardColor = "bg-secondary text-white";
						btnColor = "bg-secondary text-white";
						buttonList = '<div id="'+value.id+'Button" class="collapse" aria-labelledby="'+value.id+'Button" data-parent="#accordion">'+
								      	'<div class="card-body d-flex flex-row justify-content-center">'+
								      		'<p class="text-success">Completed</p> '+
								      		
							        	'</div>'+
							    	'</div>';							
					}
					else{	
						cardColor = "bg-light text-dark";
						btnColor = "bg-light text-dark";
						buttonList = '<div id="'+value.id+'Button" class="collapse" aria-labelledby="'+value.id+'Button" data-parent="#accordion">'+
								      	'<div class="card-body d-flex flex-row justify-content-center">'+
							      			'<button type="submit" value="'+value.job_id+'" id="'+value.id+'"  class="btn btn-outline-success float-right mr-3 mt-3 acceptJobBtn">Accept</button>'+
											'<button type="submit" id="'+value.id+'" class="btn btn-outline-primary float-right mr-3 mt-3 viewProfileBtn" value="'+value.server_job_id+'">View Profile</button>'+
											'<button type="submit" id="'+value.job_id+'" class="btn btn-outline-primary float-right mr-3 mt-3 viewJobBtn">View Job</button>'+
							        	'</div>'+
							    	'</div>';
					}
				}
				var UserName = "";
				if(value.name == userName){
					UserName = "Me";
				}else{
					UserName = value.name;
				}
				var job_income = myPercentage * value.delivery_fee;

				listView = '<div class="card-header '+cardColor+'" id="'+value.id+'ACCORDION" style="text-decoration:none;">'+
						      	'<h5 class="mb-0">'+
					      		'<div class="d-flex flex-row">'+
						      		'<img src="/img/person.png" width="15%" height="15%" class="rounded mt-4">'+
						      		'<button class="btn '+btnColor+'" data-toggle="collapse" data-target="#'+value.id+'Button" aria-expanded="true" aria-controls="collapseOne" style="text-align:left!important; width:85%!important;">'+
						          		'<p style="overflow:hidden; text-overflow: ellipsis!important; margin-bottom:-1%!important;">'+value.category+'</p>'+
						          		'<div style="overflow:hidden; text-overflow: ellipsis!important;"><small>Job Request Valid Until: '+value.time+'</small></div>'+
						          		'<div style="overflow:hidden; text-overflow: ellipsis!important;"><small>Location: '+value.location+'('+value.location_details+')</small></div>'+
						          		'<div style="overflow:hidden; text-overflow: ellipsis!important;"><small>Price: '+value.required_cash+'</small></div>'+
						          		'<div style="overflow:hidden; text-overflow: ellipsis!important;"><small>Delivery Income: '+job_income+'</small></div>'+
						          		'<div style="overflow:hidden; text-overflow: ellipsis!important;"><small> '+UserName+' </small></div>'+
						        	'</button>'+
					        	'</div>'+
					      	'</h5>'+
					    '</div>'+
					    buttonList;

					if(value.status == "Active"){
						$('#mobileViewJobRequests').append(listView);
					}else if(value.status == "Completed"){
						$('#mobileViewJobRequestsCompleted').append(listView);
					}else if(value.status == "In progress"){
						$('#mobileViewJobRequestsAccepted').append(listView);
					}
			});
		},
		error:function(responseData){
			console.log("Error: "+responseData);
		}
	});	
}

function getJobRequesterProfileInformation(job_id){
	var info = {};
	var userInfo = [];
	info["userId"] = job_id;
	userInfo.push(info);

	$.ajax({
		url:"/profile/get/job/requester/information",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},	
		dataType:"JSON",
		data:JSON.stringify(userInfo),
		success:function(responseData){
			//Display user information in an dynamically created HTML content
			$.each(responseData,function(index,value){
				$('.nameInfo').html(value.name);
				$('.emailInfo').html(value.email);
				$('.phoneInfo').html(value.phoneNumber);
				$('.IdInfo').html(value.idNumber);
				$('.socialMedia').html(value.socialMediaAccount);
			});
		},
		error:function(responseData){
			console.log("Error: "+responseData.response);
		}
		
	});
}





function getProfilePictureOfServer(userid){
	console.log("ID: "+userid);
	var info = {};
	var userInfo = [];
	info["userId"] = userid;
	userInfo.push(info);
	
	$.ajax({
		url:"/profile/get/job/requester/information/profile/picture",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},	
		dataType:"JSON",
		data:JSON.stringify(userInfo),
		success:function(responseData){
			//Display user information in an dynamically created HTML content
			$.each(responseData,function(index,value){
				
				if(value.profileImage == "null" || value.profileImage == null){
					$('.profileImageModalInformation').attr("src","/img/boy.png");
				}else{
					$('.profileImageModalInformation').attr("src","data:image/jpg;base64,"+value.profileImage);
				}
			});
		},
		error:function(responseData){
			console.log("Error: "+responseData.response);
		}
		
	});
}