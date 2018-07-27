$(document).on("click",".cancelRequest",function(){
	$('#cancelRequestModal').modal("show");
});


$(document).on("click",'.cancelRequestModalBtn',function(){
	$('#cancelRequestModal').modal("hide");
	$('input[name="stepProgress"]').val("Step 1");
	$('#summaryCSS').remove(); 	
	$('#summaryPart').css("display","none");
	$('#pageContent').fadeIn("fast");
});



$(document).on("click",".submitBtn",function(){
	var request_info = [];
	var info = {};
	
	info["job_details"] = $('input[name="details"]').val();
	info["location"] = $('input[name="location"]').val();
	info["location_details"] = $('input[name="locationDetails"]').val();
	info["job_type"] = $('input[name="jobType"]').val();
	info["time"] = $('input[name="time"]').val();
	info["category"] = $('input[name="category"]').val();
	info["other_info"] = $('input[name="otherInfo"]').val();
	info["required_cash"] = $('input[name="requiredCash"]').val();	
	info["delivery_fee"] = 	$('input[name="deliveryFee"]').val();
	info["total_fee"] = 	$('input[name="totalFee"]').val();
	
	request_info.push(info);
	console.log(request_info);
	$.ajax({
		url:"/create/request/move/summary/page",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		dataType:"JSON",
		data: JSON.stringify(request_info),
		success:function(responseData){
			if(responseData.response=="success"){
				$('.modalBodyResponse').html("Job request has been successfully posted");
				$('#jobRequestResponse').modal({
				    backdrop: 'static',
				    keyboard: false
				})
				$('#jobRequestResponse').modal("show");
			}else{
				console.log("Error");
			}
		},
		error:function(errorData){
			console.log(errorData);
		}
	});		
});

$('.okayButtonResponse').click(function(){
	location.href="/profile";
});