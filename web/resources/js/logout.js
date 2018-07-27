//Log out 
			$('.logOutLink').click(function(){
				$('#logOutModal').modal("show");
			});
			$('.logoutBtn').click(function(){
				$.ajax({
					url:"/profile/user/logout",
					type:"GET",
					headers	:	{
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					},
					success:function(responseData){
						location.href=responseData.response;
					},
					error:function(responseError){
						console.log(responseError);
					}
				});
			});