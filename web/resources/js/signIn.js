var validateIptUsername;
var validateIptPassword;
$('.registerNow').click(function(){
	location.href="signup.html";
});
$(document).on('click','.loginBtnDesktop',function(){
	var username1=$("input[name='username']").val();
	var password1=$("input[name='password']").val();
	if(username1.length<1){
		$('input[name="usernameMobile"]').removeClass("is-valid").addClass("is-invalid");
		$('.validationResult').html("Email Address Empty").fadeIn("fast");
	}else{
		if(!validateEmail(username1)){
			$('.validationResult').html("Invalid Email Address").fadeIn("fast");
			$('input[name="usernameMobile"]').removeClass("is-valid").addClass("is-invalid");
		}else{
			$('.validationResult').fadeOut("fast");
			$('input[name="usernameMobile"]').removeClass("is-invalid").addClass("is-valid");			
		}
	}
	if(password1.length<1){
		$('input[name="passwordMobile"]').removeClass("is-valid").addClass("is-invalid");
		$('.validationResultPassword').html("Password Empty").fadeIn("fast");
	}else{
		$('input[name="passwordMobile"]').removeClass("is-invalid").addClass("is-valid");
		$('.validationResultPassword').fadeOut("fast");
	}

});
$(document).on("click","#signInButton",function(){
	var username1=$("input[name='username']").val();
	var password1=$("input[name='password']").val();
	if(username1.length<1){
		validateIptUsername="false";
		$('input[name="username"]').removeClass("is-valid").addClass("is-invalid");
		$('.validationResult1').html("Email Address Empty").fadeIn("fast");
	}else{
		if(!validateEmail(username1)){
			validateIptUsername="false";
			$('.validationResult1').html("Invalid Email Address").fadeIn("fast");
			$('input[name="username"]').removeClass("is-valid").addClass("is-invalid");
		}else{
			validateIptUsername="true";
			$('.validationResult1').fadeOut("fast");
			$('input[name="username"]').removeClass("is-invalid").addClass("is-valid");			
		}
	}
	if(password1.length<1){
		validateIptPassword="false";
		$('input[name="password"]').removeClass("is-valid").addClass("is-invalid");
		$('.validationResultPassword1').html("Password Empty").fadeIn("fast");
	}else{
		validateIptPassword="true";
		$('input[name="password"]').removeClass("is-invalid").addClass("is-valid");
		$('.validationResultPassword1').fadeOut("fast");
	}	
	//Validate to the server side user login credentials
	console.log(validateIptUsername+" "+validateIptPassword);
	if(validateIptUsername=="true" && validateIptPassword=="true"){
		var idname=$(this).attr("id");
		$(this).css("background",'#9cc2e3');
		$(this).css("border",'.5px solid #9cc2e3');
		validateUserLoginCredentrials(username1,password1,idname,'loginBtnDesktop');
	}
});
//For tablet view login button
$(document).on("click","#signInButtonTablet",function(){
	var username1=$("input[name='usernameTablet']").val();
	var password1=$("input[name='passwordTablet']").val();
	if(username1.length<1){
		validateIptUsername="false";
		$('input[name="username"]').removeClass("is-valid").addClass("is-invalid");
		$('.validationResult1').html("Email Address Empty").fadeIn("fast");
	}else{
		if(!validateEmail(username1)){
			validateIptUsername="false";
			$('.validationResult1').html("Invalid Email Address").fadeIn("fast");
			$('input[name="username"]').removeClass("is-valid").addClass("is-invalid");
		}else{
			validateIptUsername="true";
			$('.validationResult1').fadeOut("fast");
			$('input[name="username"]').removeClass("is-invalid").addClass("is-valid");			
		}
	}
	if(password1.length<1){
		validateIptPassword="false";
		$('input[name="password"]').removeClass("is-valid").addClass("is-invalid");
		$('.validationResultPassword1').html("Password Empty").fadeIn("fast");
	}else{
		validateIptPassword="true";
		$('input[name="password"]').removeClass("is-invalid").addClass("is-valid");
		$('.validationResultPassword1').fadeOut("fast");
	}	
	//Validate to the server side user login credentials
	console.log(validateIptUsername+" "+validateIptPassword);
	if(validateIptUsername=="true" && validateIptPassword=="true"){
		var idname=$(this).attr("id");
		$(this).css("background",'#9cc2e3');
		$(this).css("border",'.5px solid #9cc2e3');
		validateUserLoginCredentrials(username1,password1,idname,'loginBtnDesktop');
	}
});
//For mobile view login button
$('#signInButtonMobile').click(function(){
	var username1=$("input[name='usernameMobile']").val();
	var password1=$("input[name='passwordMobile']").val();
	if(username1.length<1){
		validateIptUsername="false";
		$('input[name="usernameMobile"]').removeClass("is-valid").addClass("is-invalid");
		$('.validationResult1').html("Email Address Empty").fadeIn("fast");
	}else{
		if(!validateEmail(username1)){
			validateIptUsername="false";
			$('.validationResult1').html("Invalid Email Address").fadeIn("fast");
			$('input[name="usernameMobile"]').removeClass("is-valid").addClass("is-invalid");
		}else{
			validateIptUsername="true";
			$('.validationResult1').fadeOut("fast");
			$('input[name="usernameMobile"]').removeClass("is-invalid").addClass("is-valid");			
		}
	}
	if(password1.length<1){
		validateIptPassword="false";
		$('input[name="passwordMobile"]').removeClass("is-valid").addClass("is-invalid");
		$('.validationResultPassword1').html("Password Empty").fadeIn("fast");
	}else{
		validateIptPassword="true";
		$('input[name="passwordMobile"]').removeClass("is-invalid").addClass("is-valid");
		$('.validationResultPassword1').fadeOut("fast");
	}	
	//Validate to the server side user login credentials		
	console.log(validateIptUsername+" "+validateIptPassword);
	if(validateIptUsername=="true" && validateIptPassword=="true"){
		var idname=$(this).attr("id");
		$(this).css("background",'#9cc2e3');
		$(this).css("border",'.5px solid #9cc2e3');
		validateUserLoginCredentrials(username1,password1,idname,'loginBtnMobile');
	}	
});

 function validateEmail(email) {
		$('.password').removeClass("is-valid is-invalid");
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return emailReg.test( email );

}
function validatePassword(userPassword){
		if(userPassword.length<0)
			return false;
		else
			return true;
}
function validateUserLoginCredentrials(cred1,cred2,getBtnIdName,getBtnClassName){
	$('.username,.password').prop("disabled",true);
	
	
	
	var fadeInBtn;
	var fadeInLoadingBtn;
	var userInfo = [];
	var userIpt = {};
	$('.'+getBtnClassName).attr("id","");


	userIpt["email"]=cred1;
	userIpt["password"]=cred2;
	userInfo.push(userIpt);

	

	
	$.ajax({
		url:"/helpy/signin",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		contentType:"JSON",
		data:JSON.stringify(userInfo),
		success:function(responseData){
				if(responseData.header=="Login Success"){			
					location.href="/profile";
					$('.processingText').fadeOut("fast");				
					fadeInBtn = setInterval(function(){
						$('.LogInText').fadeIn("slow");
					},1000);
						
				}else{
					$('.'+getBtnClassName).attr("id",getBtnIdName);
					$('.password').removeClass("is-valid is-invalid");
					$('.LogInText').fadeIn("slow");
					$('.username,.password').prop("disabled",false);
					$("."+getBtnClassName).css("background","#007bff");
					$('.'+getBtnClassName).css("border","#007bff");
					$('.processingText').fadeOut("fast");	
					if(responseData.header=="Login Fail"){
						$('.username').removeClass("is-valid").addClass("is-invalid");
						$('.validationResult1').html("Login credential not valid").fadeIn("fast");	
						$('.password').removeClass("is-valid").addClass("is-invalid");
					}else if(responseData.header=="Account Blocked"){
						$('.validationResult1').html("Sorry, your account has been blocked").fadeIn("fast");					
					}else if(responseData.header=="Account Not Activated or is freezed"){
						$('.validationResult1').html(responseData.header).fadeIn("fast");	
					}else if(responseData.header=="Please check login credentials"){
						$('.username').removeClass("is-valid").addClass("is-invalid");
						$('.validationResult1').html("Invalid Email Address").fadeIn("fast");	
					}
				}
		}
	});
	
}