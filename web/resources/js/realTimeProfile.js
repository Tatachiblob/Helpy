setInterval(function(){
	//loadAllUsersWithRequestMobile();
	//loadAllUsersWithRequestDesktop();
},5000);










function loadAllUsersWithRequestDesktop(){

//	$('#activeJobRequestsLists').html('');
	var userName = $('.txtUserName').html();
	var listView = "";
	var buttonList = "";
	$.ajax({
		url:"/profile/doerview",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},	
		success:function(responseData){
			$.each(responseData,function(index,value){
				if(value.name == userName ){
					buttonList =   '<div class="col mt-3">'+
										'<button type="submit" class="btn btn-success float-right mr-3 mt-3" disabled>Accept</button>'+
										'<button type="submit" class="btn btn-primary float-right mr-3 mt-3" disabled>View Profile</button>'+
										'<button type="submit" class="btn btn-info float-right mr-3 mt-3" disabled>View Job</button>'+
									'</div>';
					listView += '<li class="col listOfUserWithActiveRequests border border-primary" id="'+value.id+'ACCORDION">'+									
					
										'<div class="row mt-2 p-2">'+
											'<div class="col col-lg-1">'+
												'<img src="/img/boy.png" width="100%" height="auto" class="rounded-circle p-1 border border-primary bg-light mt-2">'+
											'</div>'+
								
											'<div class="col-sm" style="color:#343a40!important;">'+
												'<div class="" style="">'+
													'<div style=" width:605px; font-weight: bolder!important; margin-bottom:-1px; overflow:hidden!important;  white-space:nowrap; text-overflow: ellipsis!important; ">'+
														value.category+
													'</div>'+
												'</div>'+
												'<div class="d-inline" style="font-size:75%!important">'+
													'<span class="d-block">Price: &#8369;'+value.required_cash+'</span>'+
												'</div>'+
												'<div class="d-inline" style="font-size:75%!important">'+
													'<span class="d-block">Location: '+value.location+'('+value.location_details+')</span>'+
												'</div>'+
												'<div class="d-inline" style="font-size:75%!important">'+
													'<span class="d-block">'+value.name+'</span>'+
												'</div>'+
											'</div>'+
								
											buttonList+
											
										'</div>'+						
									'</li>';		
				}else{
					buttonList = '<div class="col mt-3">'+
										'<button type="submit" value="'+value.job_id+'" id="'+value.id+'" class="btn btn-outline-success float-right mr-3 mt-3 acceptJobBtn">Accept</button>'+
										'<button type="submit" id="'+value.id+'" class="btn btn-outline-primary float-right mr-3 mt-3 viewProfileBtn" value="'+value.server_job_id+'">View Profile</button>'+
										'<button type="submit" id="'+value.job_id+'" class="btn btn-outline-info float-right mr-3 mt-3 viewJobBtn">View Job</button>'+
									'</div>';
					listView += '<li class="col listOfUserWithActiveRequests mt-2 mb-2" id="'+value.id+'ACCORDION">'+									
					
										'<div class="row mt-2 p-2">'+
											'<div class="col col-lg-1">'+
												'<img src="/img/boy.png" width="100%" height="auto" class="rounded-circle p-1 border border-primary bg-light mt-2">'+
											'</div>'+
								
											'<div class="col-sm" style="color:#343a40!important;">'+
												'<div class="" style="">'+
													'<div style=" width:605px; font-weight: bolder!important; margin-bottom:-1px; overflow:hidden!important;  white-space:nowrap; text-overflow: ellipsis!important; ">'+
														value.category+
													'</div>'+
												'</div>'+
												'<div class="d-inline" style="font-size:75%!important">'+
													'<span class="d-block">Price: &#8369;'+value.required_cash+'</span>'+
												'</div>'+
												'<div class="d-inline" style="font-size:75%!important">'+
													'<span class="d-block">Location: '+value.location+'('+value.location_details+')</span>'+
												'</div>'+
												'<div class="d-inline" style="font-size:75%!important">'+
													'<span class="d-block">'+value.name+'</span>'+
												'</div>'+
											'</div>'+
								
											buttonList+
											
										'</div>'+						
									'</li>';						
				}
				
					
			});
			if(value.status == "Active"){
				console.log("Acitve");
				$('#activeJobRequestsLists').append(listView);
			}else if(value.status == "Completed"){
				console.log("Completed");
				$('#completedJobRequestsLists').append(listView);
			}else if(value.status == "In Progress"){
				console.log("Accepted");
				$('#acceptedJobRequestsLists').append(listView);
			}
		},
		error:function(responseData){
			console.log("Error: "+responseData);
		}
	});
}


function loadAllUsersWithRequestMobile(){
	var userName = $('.txtUserName').html();
	$('#mobileViewJobRequests').html('');
	var listView = "";
	var buttonList = "";
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
					buttonList = '<div id="'+value.id+'Button" class="collapse" aria-labelledby="'+value.id+'Button" data-parent="#accordion">'+
							      	'<div class="card-body d-flex flex-row justify-content-center">'+
						      			'<button type="submit" class="btn btn-success float-right mr-3 mt-3 " disabled>Accept</button>'+
										'<button type="submit" class="btn btn-primary float-right mr-3 mt-3 " disabled>View Profile</button>'+
										'<button type="submit" class="btn btn-primary float-right mr-3 mt-3 " disabled>View Job</button>'+
						        	'</div>'+
						    	'</div>';
				}else{
					buttonList = '<div id="'+value.id+'Button" class="collapse" aria-labelledby="'+value.id+'Button" data-parent="#accordion">'+
							      	'<div class="card-body d-flex flex-row justify-content-center">'+
						      			'<button type="submit" value="'+value.job_id+'" id="'+value.id+'"  class="btn btn-outline-success float-right mr-3 mt-3 acceptJobBtn">Accept</button>'+
										'<button type="submit" id="'+value.id+'" class="btn btn-outline-primary float-right mr-3 mt-3 viewProfileBtn" value="'+value.server_job_id+'">View Profile</button>'+
										'<button type="submit" id="'+value.job_id+'" class="btn btn-outline-primary float-right mr-3 mt-3 viewJobBtn">View Job</button>'+
						        	'</div>'+
						    	'</div>';
				}
				listView = '<div class="card-header" id="'+value.id+'ACCORDION" style="text-decoration:none;">'+
						      	'<h5 class="mb-0">'+
					      		'<div class="d-flex flex-row">'+
						      		'<img src="/img/boy.png" width="15%" height="15%" class="rounded mt-4">'+
						      		'<button class="btn btn-outline-light" data-toggle="collapse" data-target="#'+value.id+'Button" aria-expanded="true" aria-controls="collapseOne" style="text-align:left!important; width:85%!important; color:black;">'+
						          		'<p style="overflow:hidden; text-overflow: ellipsis!important; margin-bottom:-1%!important;">'+value.category+'</p>'+
						          		'<div style="overflow:hidden; text-overflow: ellipsis!important;"><small>Job Request Valid Until: '+value.time+'</small></div>'+
						          		'<div style="overflow:hidden; text-overflow: ellipsis!important;"><small>Location: '+value.location+'('+value.location_details+')</small></div>'+
						          		'<div style="overflow:hidden; text-overflow: ellipsis!important;"><small>Price: '+value.required_cash+'</small></div>'+
						          		'<div style="overflow:hidden; text-overflow: ellipsis!important;"><small>'+value.name+'</small></div>'+
						        	'</button>'+
					        	'</div>'+
					      	'</h5>'+
					    '</div>'+
					    buttonList;

					
					
					
					$('#mobileViewJobRequests').append(listView);
			});
		},
		error:function(responseData){
			console.log("Error: "+responseData);
		}
	});	
}