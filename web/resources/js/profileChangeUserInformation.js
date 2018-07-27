$('.updateName').click(function(){
	$('.chngeName').prop('readonly',false);
});
$(document).on('click','.updateSocial',function(){
	$('.chngeSocial').attr("readonly",false).val("");
});
$(document).on('click','.updateEmail',function(){
	$('.chngeEmail').attr("readonly",false).val("");
});
$(document).on('click','.updatePhone',function(){
	$('.chngePhone').attr("readonly",false).val("");
});


$('.chngeName').focusout(function(){
	var iptValue = $(this).val();
	var defValue = $('.updateName').val();
	if(iptValue.length<1 || iptValue == defValue){
		$(this).attr("readonly",true).val(defValue);
	}else{
		$(this).attr("readonly",true);
	}
});
$('.chngeSocial').focusout(function(){
	var iptValue = $(this).val();
	var defValue = $('.updateSocial').val()
	if(iptValue.length<1 || iptValue == defValue){
		$(this).attr("readonly",true).val(defValue);
	}else{
		$(this).attr("readonly",true);
	}
});
$('.chngeEmail').focusout(function(){
	var iptValue = $(this).val();
	var defValue = $('.updateEmail').val()
	if(iptValue.length<1 || defValue == iptValue){
		$(this).attr("readonly",true).val(defValue);
	}else{
		$(this).attr("readonly",true);
	}
});
$('.chngePhone').focusout(function(){
	var iptValue = $(this).val();
	var defValue = $('.updatePhone').val()
	if(iptValue.length<1 || defValue == iptValue){
		$(this).attr("readonly",true).val(defValue);
	}else{
		$(this).attr("readonly",true);
	}
});
$('.saveChangesInfoBtn').click(function(){
	 updateUserInformationBasicSettings();
});
$(document).on('click','.changePasswordBtn',function(){
	$('#updateUserpasswordModal').modal("show");
});

$('#iptNewPassword').focusout(function(){
	var newPassword = $(this).val();
	var oldPassword = $('#iptOldPassword').val();
	var reenterPassword = $('#iptReenterNewPassword').val();
	if(reenterPassword==""){
		if(newPassword.length<8){
			$('#newPasswordTxt').html("Password must atleast compose of 8 characters").removeClass("d-none");
		}else if(oldPassword == newPassword || oldPassword == reenterPassword){
			$('#newPasswordTxt').html("Avoid using old password").removeClass("d-none");
			$('#iptReenterNewPassword').attr("disabled",true);
		}else{
			$('#newPasswordTxt').html("Password must atleast compose of 8 characters").addClass("d-none");
			$('#iptReenterNewPassword').attr("disabled",false);
		}
	}else{
		if(newPassword != reenterPassword){
			$('#reenterNewPasswordTxt').html("Password didn't match").removeClass("d-none");
		}else if(oldPassword == newPassword || oldPassword == reenterPassword){
			$('#newPasswordTxt').html("Avoid using old password").removeClass("d-none");
		}
		else{
			$('#reenterNewPasswordTxt,#newPasswordTxt').addClass("d-none");
			$('#saveButtonshit').addClass("buttonSaveNewPassword");
		}
	}
});
$('#iptReenterNewPassword').focusout(function(){
	var reenterPassword = $(this).val();
	var oldPassword = $('#iptOldPassword').val();
	var newPassword = $('#iptNewPassword').val();
	if(newPassword==""){
		if(reenterPassword.length<8){
			$('#reenterNewPasswordTxt').html("Password must atleast compose of 8 characters").removeClass("d-none");
		}else if(oldPassword == newPassword || oldPassword == reenterPassword){
			$('#reenterNewPasswordTxt').html("Avoid using old password").removeClass("d-none");
		}else{
			$('#reenterNewPasswordTxt').addClass("d-none");
		}
	}else{
		if(newPassword != reenterPassword){
			$('#reenterNewPasswordTxt').html("Password didn't match").removeClass("d-none");
		}else if(oldPassword == newPassword || oldPassword == reenterPassword){
			$('#reenterNewPasswordTxt').html("Avoid using old password").removeClass("d-none");
		}else{
			$('#reenterNewPasswordTxt').addClass("d-none");
			$('#saveButtonshit').addClass("buttonSaveNewPassword");
		}
	}
	
});


function updateUserInformationBasicSettings(){
	var user = [];
	var info = {};
	info["name"] = $('.chngeName').val();
	info["email"] = $('.chngeEmail').val();
	info["phoneNumber"] = $('.chngePhone').val();
	info["socialMediaAccount"] = $('.chngeSocial').val();
	user.push(info);
	$.ajax({
		url:"/user/update/profile/basic/information",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		data:JSON.stringify(user),
		success:function(responseData){
			if(responseData.Response == "success"){
				$('.notificationUpdate').removeClass("d-none");
			}
			setInterval(function(){
				$('.notificationUpdate').addClass("d-none");
			},3000);
		},
		error:function(responseData){
			console.log("Error Response: "+responseData);
		}
	})
}

$(document).on('click','.buttonSaveNewPassword',function(){
	$('#updateUserpasswordModal').modal("hide");
	var oldPassword = $('#iptOldPassword').val();
	var newPassword = $('#iptNewPassword').val();
	var reenterNewPassword = $('#iptReenterNewPassword').val();
	var user = [];
	var info = {};
	info["password"] = newPassword;
	info["name"] = reenterNewPassword;
	info["email"] = oldPassword;
	user.push(info);
	$.ajax({
		url:"/user/update/profile/change/user/login/credential",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},	
		data:JSON.stringify(user),
		success:function(responseData){
			if(responseData.Response == "success"){
				//Success
				$('.notificationUpdate').removeClass("d-none");
				setInterval(function(){
					$('.notificationUpdate').addClass("d-none");
				},3000);
			}else{
				$('.notificationUpdate').addClass("d-none");
			}
		},
		error:function(responseData){
			console.log(responseData);
		}
	});
	
});

$('#iptOldPassword').focusout(function(){
	var iptValue = $(this).val();
	var user = [];
	var info = {};
	info["password"] = iptValue;
	user.push(info);
		$.ajax({
			url:"/user/profile/check/oldPassword",
			type:"POST",
			headers	:	{
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},		
			data:JSON.stringify(user),
			success:function(responseData){
				if(responseData.Response == "true"){
					$('#oldPasswordTxt').fadeOut("fast").addClass("d-none");
					$('#iptNewPassword,#iptReenterNewPassword').attr("disabled",false);
				}else{
					$('#oldPasswordTxt').html("Invalid Password").removeClass("d-none").fadeIn("fast");
					$('#iptNewPassword,#iptReenterNewPassword').attr("disabled",true);
				}
			},
			error:function(responseData){
				console.log(responseData);
			}
		});
});
function previewImage(ipt){
	  if (ipt.files && ipt.files[0]) {
		    var reader = new FileReader();

		    reader.onload = function(e) {
		      $('#changeProfilePicture').attr('src', e.target.result);
		    }

		    reader.readAsDataURL(ipt.files[0]);
		  }
}
//Set image to this img tag #changeProfilePicture
$('#selectImgFile').change(function(){
	previewImage(this);
});


