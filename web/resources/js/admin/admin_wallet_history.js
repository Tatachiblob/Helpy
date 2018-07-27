$(document).ready(function(){
	getAdminWalletTotalBalance();
	getUserTotalBalance();
	$('#AdminWalletHistory').DataTable({
        ajax: {
            url: '/admin/get/all/wallet/history/shits',
            type: 'POST',
            dataSrc: ''
        },
        columns: [ 
        	{ data : "jobId" },
        	{ data : "clientId" },
        	{ data : "doerId" },
        	{ data : "startTime" },
        	{ data : "endTime"},
        	{ data : "status" },
        	{ data : "deliveryFee" },
        	{ data : "systemFee" }
        ]		
        
	});
})

function getAdminWalletTotalBalance(){
	$.ajax({
		url:"/admin/wallet/get/total",
		type:"POST",
		dataType:"json",
		success:function(responseData){
			if(responseData.total == null || responseData.total == "null"){
				$('.systemTotalIncome').html("&#x20B1; 0");
			}else{
				$('.systemTotalIncome').html("&#x20B1; "+responseData.total);
			}
		}
	});
}
function getUserTotalBalance(){
	$.ajax({
		url:"/admin/user/total-balance",
		type:"POST",
		dataType:"json",
		success:function(responseData){
			if(responseData.userBalance == null || responseData.userBalance == "null"){
				$('.clientTotalIncome').html("&#x20B1; 0");
			}else{
				$('.clientTotalIncome').html("&#x20B1; "+responseData.userBalance);
			}
		}
	});
}
