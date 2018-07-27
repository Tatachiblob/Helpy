
$(document).ready( function () {
	displayUserLists();
	setInterval(function(){
		 $('#UsersTable').DataTable().ajax.reload();
	},60000);
});

    $(document).on('click','.addBalanceToUser',function(){
    	$('input[name="balanceUserId"]').val($(this).val());
    	$('input[name="userBalance"]').val($(this).attr("id"));
    	$('#addBalanceModal').modal("show");
    });
    
    $(document).on('click','.freezeAcctBtn',function(){
    	$('.userName').html($(this).attr("id"));
    	$('.yesFreezeAccountBtn').val($(this).val());
    	$('#freezeAccountModal').modal("show");
    });
    
    $(document).on('click','.certifyUserAccount',function(){
    	$('.usernameCertify').html($(this).attr("id"));
    	$('.certifyAccountBtn').val($(this).val());
    	$('#certifyUserAccountModal').modal("show");
    });
    
    $(document).on('click','.UnfreezeAcctBtn',function(){
    	$('.userNameUnfreeze').html($(this).attr("id"));
    	$('.yesUnfreezeAccountBtn').val($(this).val());
    	$('#UnfreezeAccountModal').modal("show");
    });





//Balance modal
//Add Balance
$(document).on('click','.addBalanceButton',function(){
	$('input[name="balanceMethodToApply"]').val("Add");
	$('.addMinusBalanceBtnChoice').css("display","none");
	$('.iptFieldAddBalance,.backBtnToTheChoiceToAddMinus').css("display","");
	$('.addBalanceSaveBtn').prop("disabled",false);
});
//Minus Balance
$(document).on('click','.minusBalanceButton',function(){
	$('input[name="balanceMethodToApply"]').val("Substract");
	$('.addMinusBalanceBtnChoice').css("display","none");
	$('.iptFieldAddBalance,.backBtnToTheChoiceToAddMinus').css("display","");
	$('.addBalanceSaveBtn').prop("disabled",false);
});
//Back to the choices whether to add or minus balance
$(document).on('click','.backBtnToTheChoiceToAddMinus',function(){
	$('.iptFieldAddBalance,.backBtnToTheChoiceToAddMinus').css("display","none");	
	$('.addMinusBalanceBtnChoice').css("display","");
	$('input[name="updateBalance"]').val("");
	$('.addBalanceSaveBtn').prop("disabled",true);
});
//Change user percentage
$(document).on('click','.editPercentageOfDoer',function(){
	var user_id = $(this).attr("id");
	var user_rate = $(this).val();
	$('input[name = "percentageOfUser"]').val(user_rate).attr("id",user_rate);
	$('.editPercentageSaveBtn').val(user_id);
	$('#editPercentageModal').modal("show");
});
//Balance input
var intervalHideField = "";
$('.addBalanceSaveBtn').click(function(){
	var userid = $('input[name="balanceUserId"]').val();
	var method = $('input[name="balanceMethodToApply"]').val();
	var value = $('input[name="updateBalance"]').val();
	var expectedOutput = $('input[name="userBalance"]').val();
	if(value>0){
		if(method == "Substract"){
			if(parseInt(value) > parseInt(expectedOutput) ){
				$('.balanceDescription').html("Invalid value");
				intervalHideField = setInterval(function(){
					$('.balanceDescription').html("");
				},2000);		
			}else{
				saveChangesInUserBalance(value, userid, method);
			}
		}else if(method == "Add"){
			saveChangesInUserBalance(value, userid, method);
		}
	}else{
		$('.balanceDescription').html("Invalid value");
	}
});

//Clicked Yes Button for Modal in Certification of Account
$('.certifyAccountBtn').click(function(){
	certifyUserAccount($(this).val());
});

//Freeze Account
$('.yesFreezeAccountBtn').click(function(){
	updateUserStatus('Freezed',$(this).val(),'freezeAccountModal');	
});
//Remove freeze status account
$('.yesUnfreezeAccountBtn').click(function(){
	updateUserStatus('1',$(this).val(),'UnfreezeAccountModal');
});

//Keyup function for the changes in user rating
$('input[name = "percentageOfUser"]').keyup(function(){
	var previousValue = $(this).attr("id");
	var valueNow = $(this).val();
	if(valueNow<100){
		if(valueNow != previousValue){
			$('.editPercentageSaveBtn').addClass("saveChangesInDoerPercentage").prop("disabled",false);
		}else{
			$('.editPercentageSaveBtn').removeClass("saveChangesInDoerPercentage").prop("disabled",true);
		}
	}else{
		$(this).val("");
	}
});
//Button for save the input of percentageOfUser
$(document).on("click",".saveChangesInDoerPercentage",function(){
	var userId = $(this).val();
	var percentage = $('input[ name = "percentageOfUser"]').val();
	updateUserInformationPercentage(userId,percentage);
});
//Save user balance changes
function saveChangesInUserBalance(iptBalance, userId, methodUsed){
	var Info = [];
	var info = {};
	info["name"] = iptBalance;
	info["idNumber"] = userId;
	info["email"] = methodUsed;
	Info.push(info);
	$.ajax({
		url: "/admin/manipulate/user/update-balance",
		type: "POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		data: JSON.stringify(Info),
		success:function(responseData){
			if(responseData.response == "Success"){
				$('.addBalanceSaveBtn').prop("disabled",true);
				 $('#UsersTable').DataTable().ajax.reload();
					$('.addMinusBalanceBtnChoice').css("display","");
					$('.iptFieldAddBalance,.backBtnToTheChoiceToAddMinus').css("display","none");
					$('input[name="balanceMethodToApply"]').val("");
					$('input[name="updateBalance"]').val("");
			}else{
				console.log("Fail");
			}
			$('#addBalanceModal').modal("hide");
		}
	});
	
}
// Save user information to certified acct
function certifyUserAccount(userId){
	var info = [];
	var Info = {};	
	Info["userId"] = userId;
	info.push(Info);
	$.ajax({
		url:"/admin/manipulate/user/certify-account",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},		
		data:JSON.stringify(info),
		success:function(responseData){
			$('#UsersTable').DataTable().ajax.reload();
			$('#certifyUserAccountModal').modal("hide");
		}
	});
}
//Update user status 
function updateUserStatus(Url,userId,modalId){
	var info = [];
	var Info = {};
	Info["userId"] = userId;
	info.push(Info);
	$.ajax({
		url:'/admin/manipulate/user/status/account-update/'+Url,
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},	
		data:JSON.stringify(info),
		success:function(responseData){
			$('#UsersTable').DataTable().ajax.reload();
	    	$('#'+modalId).modal("hide");
		}
		
	})
}


function updateUserInformationPercentage(userId,percentage){
	var info = [];
	var Info = {};
	Info["userId"] = userId;
	Info["userRate"] = percentage;
	info.push(Info);
	$.ajax({
		url:"/admin/manipulate/user/update",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},		
		data: JSON.stringify(info),
		success:function(responseData){
			if(responseData.response == "Success"){
				$('#UsersTable').DataTable().ajax.reload();
				$('input[name = "percentageOfUser"]').val("");
				$('#editPercentageModal').modal("hide");				
			}else{
				alert("Error");
				$('#UsersTable').DataTable().ajax.reload();
				$('input[name = "percentageOfUser"]').val("");
				$('#editPercentageModal').modal("hide");				
			}
		}
	});
}






function displayUserLists(){
    var table = $('#UsersTable').DataTable({
        ajax: {
            url: '/admin/get/all/user',
            dataSrc: ''
        },
        rowId : 'userId',
        columns: [ 
        	{ data : "userId" },
        	{ data : "name" },
        	{ data : "email" },
        	{ data : "socialMediaAccount" },
        	{ data : "phoneNumber"},
        	{ data : "remainingBalance" , render: $.fn.dataTable.render.number( ',', '.', 0, '&#8369; ' ) },
        	{ data : "userRate" },
        	{
	            "render": function ( data, type, row, meta ) {
	            	var buttons = "";
	            	if(!row.adminCertified){
	            		buttons = '<button class="btn btn-info btn-sm mr-1 addBalanceToUser" id="'+row.remainingBalance+'" value="'+row.userId+'"><i class="material-icons">local_atm</i></button>'+
	            					'<button class="btn btn-outline-success btn-sm mr-1 certifyUserAccount" id="'+row.name+'" value="'+row.userId+'"><i class="material-icons">verified_user</i></button>';
	            						            		
	            	}

	            	else{
	            		buttons = '<button class="btn btn-info btn-sm mr-1 addBalanceToUser" id="'+row.remainingBalance+'" value="'+row.userId+'"><i class="material-icons">local_atm</i></button>'+
	            					'<button class="btn btn-success btn-sm mr-1"><i class="material-icons">verified_user</i></button>';
	            	} 
	            	if(row.status == "Freezed"){
	            		buttons += '<button class="btn btn-danger btn-sm UnfreezeAcctBtn" id="'+row.name+'" value="'+row.userId+'"><i class="material-icons">lock_open</i></button>';	
	            	}else{
	            		buttons += '<button class="btn btn-outline-danger btn-sm freezeAcctBtn" id="'+row.name+'" value="'+row.userId+'"><i class="material-icons">lock</i></button>';
	            	}
	            	buttons += '<button class="btn btn-dark ml-1 btn-sm editPercentageOfDoer" id="'+row.userId+'" value="'+row.userRate+'"><i class="material-icons">create</i></button>';
	            	return buttons;
	            }
        	}
        ]
    });
}