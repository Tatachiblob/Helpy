$(document).ready(function(){
	getListOfBuildings();
	displayUserInformation();
	getUserProfileImage();
	setInterval(function(){
		userBalanceCheck();		
	},6000);
});

$('.okayButtonAddCoinBtn').click(function(){
	$('#modalForAddCoinInformation').modal("hide");
});
$('.tapUpCoins').click(function(){
	$('#modalForAddCoinInformation').modal("show");
});
function displayUserInformation(){

	$.ajax({
		url:"/user/getUserInformation/userProfile",
		type:"POST",
/*		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},*/ 
		success:function(responseData){
			if(responseData.length != "0"){
				$.each(responseData,function(index,value){
						$('input[name="adminValidation"]').val(value.adminCertified);
						$('input[name="userId"]').val(value.userId);
						$('#userBalance').html(value.remainingBalance);
						$('.txtUserName').html(value.name);
						$('input[name="userRemainingBalance"]').val(value.remaining_balance);
						$('.chngeName').val(value.name);
						$('.chngeEmail').val(value.email);
						$('.chngeSocial').val(value.socialMediaAccount);
						$('.chngePhone').val(value.phoneNumber);
						$('.updateName').val(value.name);
						$('.updateSocial').val(value.socialMediaAccount);
						$('.updateEmail').val(value.email);
						$('.updatePhone').val(value.phoneNumber);
						$('input[name="userPercentage"]').val(value.userRate);
				});
			} else{
				location.href="/signin";
			}
		},
		error:function(){
			location.href="/signin";
		}
	});
}

function getUserProfileImage(){
	$.ajax({
		url:"/user/profile/image/get-by-user-id",
		type:"POST",
		success:function(responseData){
			$.each(responseData,function(index,value){
				if(value.profileImage == null || value.profileImage == "null"){
					$('#userProfileImage,#sampleProfileImg').attr("src","/img/person.png");
				}else{
					$('#userProfileImage,#sampleProfileImg').attr("src","data:image/jpg;base64,"+value.profileImage);
				}
			});
		}
	});
}

function getListOfBuildings(){

	var btnList = "";
	$.ajax({
		url:"/getLaSalle/building/lists",
/*		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},*/
		type:"POST",
		success:function(responseData){
			$.each(responseData,function(index,value){
				btnList = '<button type="button" class="dropdown-item" id="buildingName" value='+value.buildingName+'>'+value.buildingName+'</button>';
				$('.dropdown-menu').append(btnList);
			});
		}
	});
}



function userBalanceCheck(){
	var balanceNow = $('#userBalance').html();
	$.ajax({
		url:"/user/getUserInformation/userProfile",
		type:"POST",
/*		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},*/
		success:function(responseData){
			if(responseData.length!="0"){
				$.each(responseData,function(index,value){
					if(value.remainingBalance != balanceNow){
						$('#userBalance').html(value.remainingBalance);
						$('input[name="userRemainingBalance"]').val(value.remainingBalance);
					}
				});
			} else{
				location.href="/signin";
			}
		}
	});
}
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#sampleProfileImg').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#selectImgFile").change(function () {
    readURL(this);
    $('.changePhotoBtn').prop("disabled",false);
});
$('#changeUserProfilePicture').click(function(){
	event.preventDefault();
	var img = $('#selectImgFile').val();
	if(img == undefined || img == "undefined" || img == ""){

	}else{
		saveImage();
	}
});

function saveImage(){
	$.ajax({
		type:"POST",
		enctype:'multipart/form-data',
		url:"/user/change-profile-picture",	
		data: new FormData($('#myFormImage')),	
		processData: false,
		contentType: false,
		cache: false,
		success:function(responseData){

		}
		
	});
}