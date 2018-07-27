	//Cancel Request
$(document).on('click','.cancelRequesBtn',function(){
	var job_request_id = $(this).val();
	$('.cancelRequestModalBtn').val(job_request_id);
	$('#cancelRequestModal').modal("show");
});

$(document).on("click",".cancelRequestModalBtn",function(){
	var details = $(this).val();
	cancelJobRequest(details);
});




function cancelJobRequest(job_request_id){
	$.ajax({
		url:"/cancel/job/request/active/"+job_request_id+"",
		type:"PUT",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},	
		success:function(responseData){
			if(responseData.response=="success"){
				displayActiveRequestJob();
				displayInProgressRequestJob();
			}else{
				displayActiveRequestJob();
				displayInProgressRequestJob();
			}
		},
		error:function(response){
			console.log("Error");
		}
	});
}

function displayInProgressRequestJob(){
	$('.scheduledRequest').html('');
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
				var htmlContent = '<div class="requests">'+
										'<p style="margin-bottom:-1px;"><strong>'+value.category+'</strong></p>'+
										'<small class="text-muted ml-2">'+datecreated+'</small>'+
										'<small class="text-muted ml-2">|</small>'+
										'<small class="text-muted ml-2">Job Request Valid Until '+value.time+'</small>'+
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



function displayActiveRequestJob(){
	$('.activeRequestsContent').html('');
	$.ajax({
		url:"/get/all/job/request/active",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		success:function(responseData){
			$.each(responseData,function(index,value){
				var datecreated = reformatDate(value.jobDate);					
				var htmlContent = '<div class="requests">'+
										'<p style="margin-bottom:-1px;"><strong>'+value.category+'</strong></p>'+
										'<small class="text-muted ml-2">'+datecreated+'</small>'+
										'<small class="text-muted ml-2">|</small>'+
										'<small class="text-muted ml-2">Job Request Valid Until '+value.time+'</small>'+
										'<p class="mt-1 ml-2"><small class="text-muted">Job ID #: '+value.job_id+'</small></p>'+
										'<div style="margin-top:-5%!important; padding-bottom:1%!important;">'+
											'<button type="button" class="btn btn-outline-danger float-right mr-3 cancelRequesBtn" value="'+value.id+'">Cancel</button>'+
											'<h5 class="text-success float-right mr-3 mt-1">'+value.status+'</h5>'+
										'</div>'+
								 '</div>'+
								 '<hr class="mt-5">';
				$('.activeRequestsContent').append(htmlContent);
			});
		},
		error:function(error){
			console.log(error);
		}
	});
}
