	var interval1 = "";
	var intervalJobRequestCancelled = "";
$(document).ready(function(){
	interval1 = setInterval(function(){
		getAllJobRequestAcceptModalNotification();
	},5000);
	intervalJobRequestCancelled = setInterval(function(){
		notifyMeWhenJobRequestCancelled();
	},5000);
});







//Get all notification for this user MODAL
function getAllJobRequestAcceptModalNotification(){
	$.ajax({
		url:"/user/notification",
		type:"POST",
/*		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},*/
		success:function(responseData){
			
			$.each(responseData,function(index,value){
				
				if(value.notifStatus == "Modal"){
					displayActiveRequestJob();
					displayInProgressRequestJob();
					$('.acceptedJobModalBody').html(value.notifHeader+", has been accepted");
					var notificationId = value.notifId;
					updateJobRequestNotificationStatus("Unread",notificationId);
					$('#jobAcceptanceNotificationModal').modal("show");
					clearInterval( interval1 );
				}
				
			});
		}
	});
}

//Update notification job request when shown in modal
function updateJobRequestNotificationStatus(status,notifid){
	console.log("Notification Id: "+notifid);
	var dataInfo =  {};
	var Datainfo = [];
	dataInfo["notifId"] = notifid;
	dataInfo["notifStatus"] = status;
	Datainfo.push(dataInfo);

		
	$.ajax({
		url:"/user/notification/modal/showed",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		data:JSON.stringify(Datainfo),
		success:function(responseData){
			
		}
		
	});
	
	
	
}



$('.buttonJobAccepterNotificationModal').click(function(){
	displayInProgressRequestJob();
	displayActiveRequestJob();
	$('#jobAcceptanceNotificationModal').modal("hide");
});


//CANCEL Job Request Notification
function notifyMeWhenJobRequestCancelled(){
	$.ajax({
		url:"/user/notify/job-request-cancelled",
		type:"POST",
/*		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},*/
		success:function(responseData){

			if(responseData.jobStatus == "Cancelled"){
				$('.jobCancelledJobModalBody').html("Sorry, the "+responseData.jobTitle+" job has been cancelled, you'll earn "+responseData.totalEarning+" somehow");
				$('#jobCancelledNotificationModal').modal("show");
			}
		}
	});
}
function displayActiveRequestJob(){
	$('.activeRequestsContent').html('');
	$.ajax({
		url:"/get/all/job/request/active",
		type:"POST",
/*		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},*/
		success:function(responseData){
			$.each(responseData,function(index,value){
				if(value.status != "Expired"){
					var datecreated = reformatDate(value.dateCreated);					
					var htmlContent = '<div class="requests">'+
											'<p style="margin-bottom:-1px;"><strong>'+value.category+'</strong></p>'+
											'<small class="text-muted ml-2">'+datecreated+'</small>'+
											'<small class="text-muted ml-2">|</small>'+
											'<small class="text-muted ml-2">'+value.time+'</small>'+
											'<p class="mt-1 ml-2"><small class="text-muted">Job ID #: '+value.job_id+'</small></p>'+
											'<div style="margin-top:-5%!important; padding-bottom:1%!important;">'+
												'<button type="button" class="btn btn-outline-danger float-right mr-3 cancelRequesBtn" value="'+value.id+'">Cancel</button>'+
												'<h5 class="text-success float-right mr-3 mt-1">'+value.status+'</h5>'+
											'</div>'+
									 '</div>'+
									 '<hr class="mt-5">';
					$('.activeRequestsContent').append(htmlContent);
				}
			});
		}
	});
}
function displayInProgressRequestJob(){
	$('.scheduledRequest').html('');
	$.ajax({
		url:"/get/all/job/request/in/progress",
		type:"POST",
/*		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},*/
		success:function(responseData){
			$.each(responseData,function(index,value){
				var datecreated = reformatDate(value.dateCreated);					
				var htmlContent = '<div class="requests">'+
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
		}
	});
}

$('.buttonJobCancelledNotificationModal').click(function(){
	$('#jobCancelledNotificationModal').modal("hide");
});