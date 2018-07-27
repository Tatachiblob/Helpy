$(document).on('click','.loginButton',function(){
	var username = $('input[name="username"]').val();
	var password = $('input[name="password"]').val();
	if(username != "" && password != ""){
		$(".errorMessageAlertLabel").addClass("d-none");
		trySignIn();
	}else{
		$(".errorMessageAlertLabel").removeClass("d-none").html("Please fill both input fields");
	}
});



function trySignIn(){
	var username = $('input[name="username"]').val();
	var password = $('input[name="password"]').val();
	var info = {};
	var userInfo = [];
	
	info["username"] = username;
	info["password"] = password;
	userInfo.push(info);
	
	$.ajax({
		url:"/admin/signin/auth",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		dataType:"JSON",
		data:JSON.stringify(userInfo),
		success:function(responseData){
			console.log(responseData);
			if(responseData.Response == "Success"){
				location.href = "/administrator/view";
			}else{
				$(".errorMessageAlertLabel").removeClass("d-none").html(responseData.Response);				
			}
		},
		error:function(response){
			console.log("Error response: "+response);
		}
	});
	
}