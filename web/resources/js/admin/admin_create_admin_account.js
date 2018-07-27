$('.createAcctBtn').click(function(){
	var name = $('#adminName').val(); 
	var username = $('#adminUserName').val();
	var email = $('#adminEmail').val();
	var phone = $('#adminPhone').val();
	var password = $('#adminPassword').val();
	var reenter = $('#adminReenterPassword').val();
	var resultEmail, resultPhone;
	if(email.length > 1){
		resultEmail = validateEmailAddress(email);
	}
	if(phone.length > 1){
		resultPhone  = validatePhoneNumber(phone);
	}
		if(resultEmail == false || resultPhone == false || name.length < 2 || username.length < 8 || password.length < 1 || reenter.length < 1 || password != reenter){
			
		}else{
			registerAdministrator();
		}
	
});
$('#adminName').focusout(function(){
	var name = $(this).val();
	if(name.length > 2){
		$(this).removeClass("is-invalid").addClass("is-valid");
	}else{
		$('.fbName').html("Required Field");
		$(this).removeClass("is-valid").addClass("is-invalid");
	}
});
$('#adminUserName').focusout(function(){
	var username = $(this).val();
	if(username.length > 7){
		$(this).removeClass("is-invalid").addClass("is-valid");
	}else{
		$('.fbUsername').html("Username must contain > 7 characters");
		$(this).removeClass("is-valid").addClass("is-invalid");
	}
});
$('#adminEmail').focusout(function(){
	
	var email = $(this).val();
	if(email.length < 1){
		$('.fbEmail').html("You can't leave this field empty");
		$(this).removeClass("is-valid").addClass("is-invalid");
	}else{
		var result = validateEmailAddress(email);
		
		if(result){
			$(this).removeClass("is-invalid").addClass("is-valid");
		}else{
			$('.fbEmail').html("Invalid email address");
			$(this).removeClass("is-valid").addClass("is-invalid");
		}
		
	}
});
$('#adminPhone').focusout(function(){
	var phone = $(this).val();
		if(phone.length > 1){
			var res = validatePhoneNumber(phone);
			if(res){
				
				$(this).removeClass("is-invalid").addClass("is-valid");
			}else{
				$('.fbPhone').html("Invalid Phone Number");
				$(this).removeClass("is-valid").addClass("is-invalid");
			}
		}else{
			$('.fbPhone').html("Phone Number is required");
			$(this).removeClass("is-valid").addClass("is-invalid");
		}
});
$('.iptPassword').focusout(function(){
	var pass = $('#adminPassword').val();
	var reenter_pass = $('#adminReenterPassword').val();
	if(pass.length < 8 || reenter_pass.length < 8){
		if( pass.length < 8 ){
			$('.fbPassword').html("Password must be 8 characters long");
			$('#adminPassword').removeClass("is-valid").addClass("is-invalid");
		}else if( reenter_pass.length < 8){
			$('.fbReenter').html("Password must be 8 characters long");
			$('#adminReenterPassword').removeClass("is-valid").addClass("is-invalid");
		}else if( pass.length < 8 && reenter_pass.length < 8 ){
			$('.fbReenter,.fbPassword').html("Password must be 8 characters long");
			$('#adminReenterPassword,#adminPassword').removeClass("is-valid").addClass("is-invalid");
		}
	}else{
		if(pass.length > 8 && reenter_pass.length > 8){
			if(pass == reenter_pass && ( pass.length > 8 && reenter_pass.length > 8 ) ){
				$('#adminReenterPassword,#adminPassword').removeClass("is-invalid").addClass("is-valid");
			}else{
				$('.fbReenter').html("Password didn't match");
				$('.fbPassword').html("");
				$('#adminReenterPassword,#adminPassword').removeClass("is-valid").addClass("is-invalid");
			}
		}
	}
});
function checkInputFieldLength(idname){
	var iptVal = $('#'+idname).val();
	if(iptVal.length < 1 ){
		return false;
	}else{
		return true;
	}
}
function validateEmailAddress(emailIpt){
	  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return result = re.test(emailIpt);
}
function validatePhoneNumber(phone_number){
	  var regex=/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
	  return regex.test(phone_number);
}

function registerAdministrator(){
	var info = {};
	var Info = [];
	info["name"] = $('#adminName').val(); 
	info["username"] = $('#adminUserName').val();
	info["email"] = $('#adminEmail').val();
	info["phoneNumber"] = $('#adminPhone').val();
	info["password"] = $('#adminPassword').val();
	Info.push(info);
	$.ajax({
		url:"/admin/add-administrator",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		data:JSON.stringify(Info),
		success:function(responseData){
			$('#adminName,#adminUserName,#adminEmail,#adminPhone,#adminPassword,#adminReenterPassword').val("").removeClass("is-valid is-invalid"); 
			if(responseData.response == "Success"){				
				$('.successfulRegistration').fadeIn("fast");
				setInterval(function(){
					$('.successfulRegistration').fadeOut("fast");
				},3500);
			}else{
				$('.failedRegistration').fadeIn("fast");
				setInterval(function(){
					$('.failedRegistration').fadeOut("fast");
				},3500);
			}
		}
	});
	
}



$('.nav-link').click(function(){
	var id_value = $(this).attr("id");
	if(id_value == "nav-list-admin"){
		$('#listOfAdministrator').DataTable().ajax.reload();
	}
});