$(document).on('click','#Check',function(){
	var startDate = $('#startDateIpt').val();
	var endDate = $('#endDateIpt').val();
	
	if(startDate == "" || startDate == null || startDate == "null" || endDate == "" || endDate ==null || endDate =="null"){
		var tableBody = "<tr class='table-danger'>"+
							"<td colspan='8' class='text-center'><strong>Empty Dates</strong></td>"+
						"</tr>";
		$('#adminArchieveView1').html(tableBody);	
		$('.summaryOfArchiveRecords').fadeOut("fast");
	}else{
		 getAllToBeArchieveRecord(startDate, endDate);
	}
	
});

function getAllToBeArchieveRecord(start, end){
	var info = [];
	var Info = {};
	Info["startDate"] = start;
	Info["endDate"] = end;
	info.push(Info);
	var tableBody = "";
	var totalSystemIncome = 0;
	var counter = 0;
	$.ajax({
		url : "/admin/archieve",
		type : "POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		dataType:"JSON",
		data:JSON.stringify(info),
		success:function(responseData){
			console.log("Response: "+responseData.length);
			if(responseData.length == 0){
				$('.summaryOfArchiveRecords').fadeOut("fast");
				tableBody = "<tr class='table-danger'>"+
								"<td colspan='8' class='text-center'><strong>No results found</strong></td>"+
							"</tr>";
				
			}else{
				$.each(responseData ,function(index,value){
					counter++;
					totalSystemIncome = totalSystemIncome + parseInt(value.systemFee);
					tableBody += "<tr>"+
									"<td>"+value.jobId+"</td>"+
									"<td>"+value.clientId+"</td>"+
									"<td>"+value.doerId+"</td>"+
									"<td>"+value.startDate+"</td>"+
									"<td>"+value.endDate+"</td>"+
									"<td>"+value.status+"</td>"+
									"<td>"+value.deliveryFee+"</td>"+
									"<td>"+value.systemFee+"</td>"+
								"</tr>";
				});
					$('.totalSysIncome').html(totalSystemIncome);
					$('.noOfRecords').html(counter);
					$('.frmDate').html(start);
					$('.toDate').html(end);
					$('.summaryOfArchiveRecords').fadeIn("slow");
			}

			$('#adminArchieveView1').html(tableBody);
		}
	});

}

//Archive record button
$(document).on('click','#archiveBtn',function(){
	$(this).css("opacity","0.4");
	var info = [];
	var Info = {};
	Info["startDate"] = $('#startDateIpt').val();
	Info["endDate"] = $('#endDateIpt').val();
	info.push(Info);
	console.log(info);
	$('.archivedButton').attr("id","");
	$.ajax({
		url:"/admin/archieve-record",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		data: JSON.stringify(info),
		success:function(responseData){
			$(this).css("opacity","1.0");
			$('#startDateIpt,#endDateIpt').val('');
			if(responseData.response == "true"){
				$('.archivedButton').attr("id","archiveBtn").css("opacity","1.0");
				$('.summaryOfArchiveRecords').fadeOut("fast");
				$('#adminArchieveView1').html('');
				$('#updateNotification').removeClass("alert-danger").addClass("alert-success").html("Record(s) Successfully Archived").fadeIn("fast");
			}else if(responseData.response == "false"){
				$('.archivedButton').attr("id","archiveBtn");
				$('#updateNotification').removeClass("alert-success").addClass("alert-danger").html("Record(s) Not Successfully Archived").fadeIn("fast");
				$('#adminArchieveView1').html('');
			}
			setInterval(function(){
				$('#updateNotification').fadeOut("fast");
			},3000);
		}
	});
 });

$('#startDateIpt').focusin(function(){
	$('.summaryOfArchiveRecords').fadeOut("fast");
});
$('#endDateIpt').focusin(function(){
	$('.summaryOfArchiveRecords').fadeOut("fast");
});



//View Tab
$(document).on('click','#view-archive-tab',function(){
	$('#adminArchivedRecord').DataTable().destroy();
	$('#dropdownBtnArchivedListBatch').html('');
	$('#dropdownMenu2').html("All");
	var appendHtml = '<button class="dropdown-item active selectedButtonArchivedView" id="All">ALL</button>';
	$.ajax({
		url:"/admin/populate/view-archived-button",
		type:"POST",
		success:function(responseData){
			$.each(responseData,function(index,value){			
				appendHtml += '<button class="dropdown-item selectedButtonArchivedView" id="'+value.batchId+'">'+value.startDate+'&nbsp to &nbsp'+value.endDate+'</button>';
			});
			$('#dropdownBtnArchivedListBatch').html(appendHtml);
		}
	});
	getTotalBalanceOfBatch("All");
	viewAllRecordOfArchived();
});


$(document).on('click','.selectedButtonArchivedView',function(){
	 $('#adminArchivedRecord').DataTable().destroy();
	var btnVal  = $(this).attr("id");
	var htmlVal = $(this).html();
	$('.dropdown-item').removeClass("active");
	$(this).addClass('active');
	viewAllArchivedByBatchId(btnVal);
	$('#dropdownMenu2').html(htmlVal);
	getTotalBalanceOfBatch(btnVal);
});

function viewAllRecordOfArchived(){
	$('#adminArchivedRecord').DataTable({
        ajax: {
            url: '/admin/populate-view-all-archived-wallet-record',
            type:'POST',
            dataSrc: ''
        },
        columns: [ 
        	{ data : "jobId" },
        	{ data : "clientId" },
        	{ data : "doerId" },
        	{ data : "startDate" },
        	{ data : "endDate"},
        	{ data : "status" },
        	{ data : "deliveryFee" }, 
        	{ data : "systemFee" }
        ]		
	});
}

function viewAllArchivedByBatchId(batch_id){
	$('#adminArchivedRecord').DataTable().destroy();
	$('#adminArchivedRecord').DataTable({
        ajax: {
            url: '/admin/get-archived-record-by-batch-id/'+batch_id+'',
            type: 'GET',
            dataSrc: ''
        },
        columns: [ 
        	{ data : "jobId" },
        	{ data : "clientId" },
        	{ data : "doerId" },
        	{ data : "startDate" },
        	{ data : "endDate"},
        	{ data : "status" },
        	{ data : "deliveryFee" }, 
        	{ data : "systemFee" }
        ]		
	});
}

function getTotalBalanceOfBatch(batchId){
	$.ajax({
		url:"/admin/get-total-income-of-batch/"+batchId+"",
		type:"POST",
		success:function(responseData){
			$('.totalIncomeByBatch').html(responseData.total);
			$('.incomeTxtArchived').fadeIn("fast");
		}
	});
}