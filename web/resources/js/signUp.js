
var validateName="";
var validateID="";
var validateEmail="";
var validatePhone="";
var validatePassword="";

$('input[name="name"]').focusout(function(){
	var result=validateUserName($(this).val());
	var txtLength = $(this).val();
	var idname=$(this).attr("id");	
	$(this).popover('dispose');
	showValidationField(idname,result);
	
	var popoverMessage="";
	if(result=="2" && txtLength.length>0){
		popoverMessage="Invalid Name";
		setPopoverWarningMessage(idname,popoverMessage,result);
		popoverHideOrNot(idname);
	}
	else if(txtLength.length>0){
		$('#'+idname).popover('dispose');
	}
	else{
		popoverMessage="Name is empty";
		setPopoverWarningMessage(idname,popoverMessage,result);
		popoverHideOrNot(idname);
	}
	
	
});
	$('input[name="name"]').focusin(function(){
		removeValidationWhenFocusIs($(this).attr("id"));
	});
	$('input[name="social_media"]').focusout(function(){
		var txtLength = $(this).val();
		var idname=$(this).attr("id");	
		$(this).popover('dispose');
		var popoverMessage="";
		if(txtLength.length>0){
			$('#'+idname).popover('dispose');
			$("#"+idname).removeClass("is-invalid").addClass("is-valid");
		}
		else{
			popoverMessage="Social Media Link is empty";
			setPopoverWarningMessage(idname,popoverMessage,result);
			popoverHideOrNot(idname);
		}
		
		
	});
		$('input[name="social_media"]').focusin(function(){
			removeValidationWhenFocusIs($(this).attr("id"));
		});
$('input[name="email_address"]').focusout(function(){
	var emailAd=$(this).val();
	var idname=$(this).attr("id");
	if(emailAd.length<1){
		showValidationField(idname,"0");
		setPopoverWarningMessage(idname,"Email Address is required","0");
		popoverHideOrNot(idname);
		validateEmail="2";
	}else{
		validateEmailAddress(emailAd);
	}
});
	$('input[name="email_address"]').focusin(function(){
		removeValidationWhenFocusIs($(this).attr("id"));
	});

$('input[name="phone_number"]').focusout(function(){
	var idname=$(this).attr("id");
	var phoneNumber=$(this).val();
	var result="";
	if(phoneNumber.length==0){
		showValidationField(idname,"0");
		setPopoverWarningMessage(idname,"Phone Number is required","0");
		popoverHideOrNot(idname);		
	}else{
		var result=validatePhoneNumber(phoneNumber);
		if(result==true){
			showValidationField(idname,"1");
		}else{
			result="2";
			popoverMessage="Invalid Phone Number";
			setPopoverWarningMessage(idname,popoverMessage,result);
			showValidationField(idname,result);
			popoverHideOrNot(idname);			
		}
	}
});
	$('input[name="phone_number"]').focusin(function(){
		removeValidationWhenFocusIs($(this).attr("id"));
	});
$('input[name="password"]').focusout(function(){
	var idname=$(this).attr("id");
	var emailAddress=$(this).val();
	var result="";
	if(emailAddress.length<8){
		showValidationField(idname,"0");
		setPopoverWarningMessage(idname,"Password is required","0");
		popoverHideOrNot(idname);				
	}else{
		showValidationField(idname,"1");
	}
});
	$('input[name="password"]').focusin(function(){
		removeValidationWhenFocusIs($(this).attr("id"));
	});

$('.cancelButton').click(function(){
	location.href="signin.html";
});





function validateUserName(userName){
	if(userName.length<1){
		return "0";
		validateName="0"
	}else{
		var regexPattern=/\d+/g;
		var numberPattern=userName.match(regexPattern);	
		if(numberPattern==null){

			return "1";
			validateName="1";
		}
		else{
			return "2";
			validateName="2";
		}
		
	}
}
function validateEmailAddress(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var result = re.test(email);
		var emailaddress = [];
		var emailad = {};
			emailad["email"] = email;
			emailaddress.push(emailad);

  if(result == false){
		popoverMessage="Invalid Email Address";
		setPopoverWarningMessage("emailAddress",popoverMessage,result);
		showValidationField("emailAddress","2");
		popoverHideOrNot("emailAddress");	
		validateEmail="2";	  
  }else{
				  	$.ajax({
						url:"/checkEmail/ifRegistered",
						type:"POST",
						dataType:"JSON",
						headers	:	{
							'Accept' : 'application/json',
							'Content-Type' : 'application/json'
						},
						data: JSON.stringify(emailaddress),
						success:function(responseData){
							if(responseData.result == "false"){
								showValidationField("emailAddress","1");
								validateEmail="1";
							}else{
								popoverMessage="Email Address already used";
								setPopoverWarningMessage("emailAddress",popoverMessage,"2");
								showValidationField("emailAddress",2);
								popoverHideOrNot("emailAddress");	
								validateEmail="2";
							}
						},
						error:function(){
							alert("Some connection error occured");
						}
					});
  }

}
function checkEmailOnRecord(email){
	var email_address={
			"email":email
	}
	$.ajax({
		url:"http://localhost:8080/signup/validate/emailaddress/"+email+"",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		type:"GET",
		success:function(responsedata){
			console.log(responsedata);
			if(responsedata.msg=="true"){
				console.log("True");
			}else{
				console.log("False");
			}
		}
		
		
	});
}
function validatePhoneNumber(phone_number){
  var regex=/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  return regex.test(phone_number);
}
function popoverHideOrNot(name){
	var idField="#"+name;
	if($(window).width()>800){
		$(idField).popover('show');
	}else{
		$(idField).popover('dispose');
	}
}
function showValidationField(name,result){
	if(result=="1"){
		$("#"+name).removeClass("is-invalid").addClass("is-valid");
	}else{
		$("#"+name).removeClass("is-valid").addClass("is-invalid");
	}
}
function setPopoverWarningMessage(name,message,result){	
	var popovers=$('#'+name).popover();
	if(result=="1"){

	}else{			
		popovers.attr("data-content",message);
	}
}
function removeValidationWhenFocusIs(name){
	$('#'+name).removeClass("is-valid is-invalid");
	$('#'+name).popover("dispose");
}



$('.signUp').click(function(){	
	$('#userName,#emailAddress,#phoneNumber,#passWord,#socialMediaAcct').popover("dispose");
		var name=$('input[name="name"]').val();
		var id_number=$('input[name="id_number"]').val();
		var email_address=$('input[name="email_address"]').val();
		var phone_number=$('input[name="phone_number"]').val();
		var userPass=$('input[name="password"]').val(); 
		var socialMediaLink = $('input[name="social_media"]').val();
	event.preventDefault();
	showValidationField("emailAddress","0");	
	if(name.length<1 || email_address.length<1 || phone_number.length<1 || userPass.length<1 || validateEmail=="2" || socialMediaLink.length<1){
		if(name.length<1){
			showValidationField("userName","0");
		}
		if(email_address.length<1){
			showValidationField("emailAddress","0");		
		}
		if(validateEmail=="2"){
			showValidationField("emailAddress","2");
		}
		if(phone_number.length<1){
			showValidationField("phoneNumber","0");		
		}
		if(userPass.length<1){
			showValidationField("passWord","0");			
		}
		if(socialMediaLink.length<1){
			showValidationField("socialMediaAcct","0");
		}
		$('.modalHeader').removeClass("bg-primary bg-success").addClass("bg-danger");
		$('#modalHeader').html("Sign Up Error");
		$('#modalMessage').html("Please fill all fields with errors");
			$('#promptModal').modal({
				backdrop: 'static',
				keyboard: false,
			});
		$('#promptModal').modal("show");
		
	}
	else{
		$('#myOverlay').css("width","100%");
		$('.loadingContent').fadeIn("fast");
		registerUser();
	}
});
$('.okayButton').click(function(){
		var name=$('input[name="name"]').val();
		var id_number=$('input[name="id_number"]').val();
		var email_address=$('input[name="email_address"]').val();
		var phone_number=$('input[name="phone_number"]').val();
		var userPass=$('input[name="password"]').val(); 
		var socialMediaLink = $('input[name="social_media"]').val();
		validateEmailAddress(email_address);
		if(name.length<1){
			popoverMessage="Name is empty";
			setPopoverWarningMessage("userName",popoverMessage,"0");
			popoverHideOrNot("userName");
		}else{
			showValidationField("userName","1");
		}
		
		if(email_address.length<1){
			popoverMessage="Email Address is empty";
			setPopoverWarningMessage("emailAddress",popoverMessage,"0");
			popoverHideOrNot("emailAddress");			
		}else{
			showValidationField("emailAddress","1");
		}
		
		if(phone_number.length<1){
			popoverMessage="Phone Number is empty";
			setPopoverWarningMessage("phoneNumber",popoverMessage,"0");
			popoverHideOrNot("phoneNumber");				
		}else{
			showValidationField("phoneNumber","1");
		}
		
		if(userPass.length<1){
			popoverMessage="Password is empty";
			setPopoverWarningMessage("passWord",popoverMessage,"0");
			popoverHideOrNot("passWord");				
		}else{
			showValidationField("passWord","1");
		}
		
		if(socialMediaLink.length<1){
			popoverMessage="Social Media Link is empty";
			setPopoverWarningMessage("socialMediaAcct",popoverMessage,"0");
			popoverHideOrNot("socialMediaAcct");			
		}else{
			showValidationField("socialMediaAcct","1");
		}
		
		//Validate Name
		var userNameVal=validateUserName(name);
		if(userNameVal=="2" && name.length>0){
			popoverMessage="Invalid Name";
			setPopoverWarningMessage("userName",popoverMessage,"2");
			popoverHideOrNot("userName");
		}
		//Validate Email Address
		var emailVal=validateEmailAddress(email_address);
		if(emailVal==false && email_address.length>0){
			popoverMessage="Invalid Email Address";
			setPopoverWarningMessage("emailAddress",popoverMessage,"2");
			popoverHideOrNot("emailAddress");			
		}
		//Validate Phone Number
		var phoneVal=validatePhoneNumber(phone_number);
		if(phoneVal!=true && phone_number.length>0){
			popoverMessage="Invalid Phone Number";
			setPopoverWarningMessage("emailAddress",popoverMessage,"2");
			popoverHideOrNot("emailAddress");				
		}
	$('#promptModal').modal("hide");
});



function registerUser(){
	
	var info=[];
	var userInfo={};

	var dateNow = new Date();
	var dateGen = dateNow.getFullYear()+"-"+dateNow.getMonth()+"-"+dateNow.getDate();
	userInfo["name"] = $('input[name="name"]').val();
	userInfo["idNumber"] = $('input[name="id_number"]').val();
	userInfo["email"] = $('input[name="email_address"]').val();
	userInfo["phoneNumber"] = "+63"+$('input[name="phone_number"]').val();
	userInfo["password"] = $('input[name="password"]').val(); 
	userInfo["accountCreated"] = dateGen;
	userInfo["status"] = false;
	userInfo["loginAttempt"] = 0;
	userInfo["socialMediaAccount"] = $('input[name="social_media"]').val();
	info.push(userInfo);	

	$.ajax({
			url:"/signup/createaccount/newuser/registration",
			headers	:	{
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			type:"POST",
			dataType:"JSON",
			data:JSON.stringify(info),
			success:function(responseData){
				if(responseData=="1"){
					var pathName = window.location.hostname+":"+window.location.port+"/";
					console.log(pathName);
					var intervalOne = setInterval(function(){
						$('.loadingContent').fadeOut("fast");
					},100);
					var intervalTwo = setInterval(function(){
						clearInterval(intervalOne);
						$('#confirmationText').fadeIn("slow");
					},350);
					var intervalThree = setInterval(function(){
						clearInterval(intervalTwo);
					},400);
	/*								$('#confirmationText').fadeIn("slow");
									$('.modalHeader').removeClass("bg-primary bg-danger").addClass("bg-success");
									$('#modalHeader').html("Sign Up Successful");
									$('#modalMessage').html("Please check your Email to verify your account!");
									$('#promptModal').modal("show");	*/				
				}else{
					$('#myOverlay').css("width","0%");
					$('.modalHeader').removeClass("bg-primary bg-success").addClass("bg-danger");
					$('#modalHeader').html("Sign Up Error");
					$('#modalMessage').html("Registration Fail");
					$('#promptModal').modal("show");					
				}
			},
			error:function(errorData){
					$('#myOverlay').css("width","0%");
					$('.modalHeader').removeClass("bg-primary bg-success").addClass("bg-danger");
					$('#modalHeader').html("Registration Error");
					$('#modalMessage').html(errorData);
					$('#promptModal').modal("show");				
			}
	
		});		
}