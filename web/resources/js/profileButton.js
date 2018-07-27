$(document).on("click",'.list-group-item',function(){

	var id = $(this).attr("id");
	$('.list-group-item').removeClass('activeSideNavigation');
	
	if( id == "requestsTab" ) {
		displayInProgressRequestJob();
		loadAllUsersWithRequestDesktop();
		loadAllUsersWithRequestMobile();
		$('#JobsTab,#transactionView,#updateUserInformation,#userNotification').css("display","none");
		$('#createRequest').css("display","");
		$('#'+id).addClass("activeSideNavigation");		
		
	}
	
	else if(id == "jobsTab"){
		loadAllUsersWithRequestDesktop();
		$('#createRequest,#transactionView,#updateUserInformation,#userNotification').css("display","none");
		$('#JobsTab').css("display","");
		$('#'+id).addClass("activeSideNavigation");
		
	}
	
	else if(id == "transactionsTab"){
		populateTransactionTable();
		$('#createRequest,#JobsTab,#updateUserInformation,#userNotification').css("display","none");
		$('#transactionView').fadeIn("fast");	
		$('#'+id).addClass("activeSideNavigation");
	}
	
	else if(id == "settingsTab"){
		$('#createRequest,#JobsTab,#transactionView,#userNotification').css("display","none");
		$('#updateUserInformation').css("display","");
		$('#'+id).addClass("activeSideNavigation");
	}
	
	else if(id == "notificationsTab"){
		$('#createRequest,#JobsTab,#transactionView,#updateUserInformation').css("display","none");
		$('#userNotification').css("display","");
		$('#'+id).addClass("activeSideNavigation");		
		getAllNotificationForBalanceUpdate();
		seenBalanceNotification();
	}
});
$(document).on("click",".nav-item",function(){
	
	var id = $(this).attr("id");
	$('.nav-item').removeClass('active');
	
	if( id == "requestsNav" ) {
		
		$('#JobsTab,#updateUserInformation,#userNotification,#transactionView').css("display","none");
		$('#createRequest').css("display","");
		$('#'+id).addClass("active");		
		
	}
	
	else if(id == "jobsNav"){		
		loadAllUsersWithRequestMobile();
		$('#createRequest,#updateUserInformation,#userNotification,#transactionView').css("display","none");
		$('#JobsTab').css("display","");
		$('#'+id).addClass("active");
		
	}	
	
	else if(id == "settingsNav"){
		$('#createRequest,#JobsTab,#userNotification,#transactionView').css("display","none");
		$('#updateUserInformation').css("display","");
		$('#'+id).addClass("active");
		
	}	
	
	else if(id == "notificationsNav"){
		getAllNotificationForBalanceUpdate();
		seenBalanceNotification();
		$('#createRequest,#JobsTab,#updateUserInformation,#transactionView').css("display","none");
		$('#userNotification').css("display","");
		$('#'+id).addClass("active");		
	}
	
	else if(id == "transactionsNav"){
		$('#JobsTab,#createRequest,#updateUserInformation,#userNotification').css("display","none");
		$('#transactionView').fadeIn("fast");
		$('#'+id).addClass("active");			
	}
});



function getAllNotificationForBalanceUpdate(){
	var notif = "";
	$('#balanceNotification').html('');	
	$.ajax({
		url : "/user/get-all-balance-notification",
		type : "POST",
		success:function(responseData){
			$.each(responseData, function(index,value){
				var bgColor = "";
				if(value.notifStatus == "Seen"){
					bgColor = "bg-secondary";
				}else{
					if(value.notifHeader == "Good News: Balance Update")
						bgColor = "bg-success";
					else
						bgColor = "bg-danger";
				}
						notif = '<div class="card text-dark bg-light mb-2 notificationCard balanceUpdateNotification" style="border-radius:0px!important; border-outline:0!important;" id="'+value.notifId+'"> '+
									'<div class="card-header text-light '+bgColor+'">Balance Notification</div>'+
										'<div class="card-body">'+
										  	'<div class="row">'+
										  		'<div class="col-md-9">'+
										    		'<h6 class="card-title">'+value.notifHeader+'</h6>'+
										    		'<small class="card-text">'+value.notifBody+'</small>'+
										    	'</div>'+
										    	'<div class="col-md-3 mt-2 float-right">'+
										    		'<button type="button" class="btn btn-danger btn-sm float-right" id="'+value.notifId+'">Delete</button>'+
										    	'</div>'+
										    '</div>'+
										  '</div>'+
										'</div>';	
							$('#balanceNotification').append(notif);					
			});
			
		}
	});
}

function seenBalanceNotification(){
	$.ajax({
		url:"/user/seen-balance-notification",
		type:"POST",
		success:function(responseData){
			$('.numberOfNotification').html(0);
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
										'<img src="/img/boy.png" width="100%" height="auto" class="rounded-circle p-1 border border-primary bg-light mt-2">'+
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
											'<img src="/img/boy.png" width="100%" height="auto" class="rounded-circle p-1 border border-primary bg-light mt-2">'+
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
												'<span class="d-block ml-2"> Time: <strong>'	+value.time+'</strong></span>'+
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
											'<img src="/img/boy.png" width="100%" height="auto" class="rounded-circle p-1 border border-primary bg-light mt-2">'+
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
												'<span class="d-block ml-2"> Time: <strong>'	+value.time+'</strong></span>'+
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
								      		'<p class="text-success">Completed</p> '+
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
						      		'<img src="/img/boy.png" width="15%" height="15%" class="rounded mt-4">'+
						      		'<button class="btn '+btnColor+'" data-toggle="collapse" data-target="#'+value.id+'Button" aria-expanded="true" aria-controls="collapseOne" style="text-align:left!important; width:85%!important;">'+
						          		'<p style="overflow:hidden; text-overflow: ellipsis!important; margin-bottom:-1%!important;">'+value.category+'</p>'+
						          		'<div style="overflow:hidden; text-overflow: ellipsis!important;"><small>Time: '+value.time+'</small></div>'+
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


function populateTransactionTable(){
	$('#transactionTable').html('');
	var table = "";
	$.ajax({
		url:"/transaction/populate/table",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},	
		success:function(responseData){
			$.each(responseData,function(index,value){
				table = '<tr>'+
					      '<th scope="row">'+value.job_id+'</th>'+
					      '<td>'+value.status+'</td>'+
					      '<td>'+value.time+'</td>'+
					      '<td>'+value.category+'</td>'+
					      '<td>'+value.required_cash+'</td>'+
					      '<td>'+value.delivery_fee+'</td>'+
					      '<td>'+value.total_fee+'</td>'+
					   '</tr>';
				$('#transactionTable').append(table);
				$('#transactionTableMobile').append(table);
			});
		},
		error:function(response){
			console.log(response);
		}
	});
}
function displayInProgressRequestJob(){
	console.log("Happened");
	$('.scheduledRequest').html('');
	var htmlContent = "";
	$.ajax({
		url:"/get/all/job/request/in/progress",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		success:function(responseData){
			$.each(responseData,function(index,value){
				var datecreated = reformatDate(value.jobDate);		
					htmlContent = '<div class="requests">'+
										'<p style="margin-bottom:-1px;"><strong>'+value.category+'</strong></p>'+
										'<small class="text-muted ml-2">'+datecreated+'</small>'+
										'<small class="text-muted ml-2">|</small>'+
										'<small class="text-muted ml-2">'+value.time+'</small>'+
										'<p class="mt-1 ml-2"><small class="text-muted">Job ID #: '+value.job_id+'</small></p>'+
										'<div style="margin-top:-5%!important; padding-bottom:1%!important;">'+
											'<button type="button" class="btn btn-success float-right mr-3 btnFinishJob" value="'+value.job_id+'">Finish</button>'+
											'<button type="button" class="btn btn-outline-danger float-right mr-3 cancelRequesBtn" value="'+value.id+'">Cancel</button>'+
											'<h5 class="text-primary float-right mr-3 mt-1">'+value.status+'</h5>'+
										'</div>'+
								 '</div>'+
								 '<hr class="mt-5">';
				$('.scheduledRequest').append(htmlContent);
			});
		},
		error:function(error){
			console.log(error);
		}
	});
}
$(document).on('click','.accountNotValidated',function(){
	$('#userInformationNotApproved').modal("show");
});
$(document).on('click','.buttonResponseUserInformation',function(){
	$('#userInformationNotApproved').modal("hide");	
});
