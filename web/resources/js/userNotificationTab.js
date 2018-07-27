/*

				<div class="card text-dark bg-light mb-2 notificationCard" style="border-radius:0px!important; border-outline:0!important;">
				  <div class="card-header bg-info text-light">Notification Header</div>
				  <div class="card-body">
				  	<div class="row">
				  		<div class="col-md-9">
				    		<h6 class="card-title">John Paulo accepted your job request</h6>
				    		<small class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</small>
				    	</div>
				    	<div class="col-md-3 mt-2">
				    		<button type="button" class="btn btn-info btn-sm">View Doer</button>
				    		<button type="button" class='btn btn-success btn-sm'>Job Completed</button>
				    	</div>
				    </div>
				  </div>
				</div>

*/
var totalNotification;
$(document).ready(function(){
	getNumberOfUnreadNotification();
	setInterval(function(){
		getNumberOfUnreadNotification();
	},2500);
	var numberOfNotif = $('.numberOfNotification').html();
	setInterval(function(){
		if(numberOfNotif > 1){
			$('title').html("New balance notification");
		}else{
			$('title').html("My Profile | Helpy");
		}
	},1500);
});

//numberOfNotification

function getNumberOfUnreadNotification(){
	$.ajax({
		url:"/user/get-number-of-unread-notifications",
		type:"POST",
		success:function(responseData){
			if(responseData.response > 0){
				$('title').html("New balance notification");
			}
			$('.numberOfNotification').html(responseData.response);
		}
	});
}
