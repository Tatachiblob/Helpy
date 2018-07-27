$('#oldPassword').focusout(function(){
	var info = {};
	var Info = [];
	info["password"] = $(this).val();
	Info.push(info);
	$.ajax({
		url:"/admin/check-old-account-password",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},	
		data: JSON.stringify(Info),
		success:function(responseData){
			if(responseData.response == "1"){
				$('#oldPassword').removeClass("is-invalid");
				$('.iptPassword1').attr("id","newPassword").prop("disabled",false);
				$('.iptPassword2').attr("id","reenterNewPassword").prop("disabled",false);
			}else{
				$('.oldpwd').html("Invalid");
				$('#oldPassword').addClass("is-invalid");
				$('.iptPassword1,.iptPassword2').attr("id","").prop("disabled",true);			
			}
		}
	});
});

$('.iptPassword1').focusout(function(){
	var id = $(this).attr("id");
	if(id == ""){
		$(this).addClass("is-invalid");
		$('.pwd1').html("Invalid Password");
	}else{
		$(this).removeClass("is-invalid");
		$('.pwd1').html("");		
	}
});
$('.iptPassword2').focusout(function(){
	var id = $(this).attr("id");
	if(id == ""){
		$(this).addClass("is-invalid");
		$('.pwd2').html("Invalid Password");
	}else{
		$(this).removeClass("is-invalid");
		$('.pwd2').html("");		
	}
});
$('#nav-change-admin-password').click(function(){
	$('.iptPassword1,.iptPassword2,#oldPassword').removeClass("is-invalid").prop("disabled",false);
});
$('#changeAdminPassword').click(function(){
	
	var id1 = $('.iptPassword1').attr("id");
	var id2 = $('.iptPassword2').attr("id");
	if(id1 == "" || id2 == ""){
		$('.iptPassword1,.iptPassword2').addClass("is-invalid");
		$('.pwd2').html("Invalid Password");
	}else{
		var ipt1 = $('#newPassword').val();
		var ipt2 = $('#reenterNewPassword').val();
		var info = [];
		var Info = {};
		Info["password"] = ipt1;
		Info["status"] = ipt2;
		info.push(Info);
		$.ajax({
			url:"/admin/validate-change-password",
			type:"POST",
			headers	:	{
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},	
			data:JSON.stringify(info),
			success:function(responseData){
				if(responseData.response == "true"){
					location.href="/admin-login";
				}else if(responseData.response == "old password new password match"){
					$('.iptPassword1,.iptPassword2').addClass("is-invalid");
					$('.pwd2').html("Don't use old password");					
				}else{
					$('.iptPassword1,.iptPassword2').addClass("is-invalid");
					$('.pwd2').html("Invalid Password");
				}
			}
		});
	}
});