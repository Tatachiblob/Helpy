$(document).ready(function(){
	$('#listOfAdministrator').DataTable({
        ajax: {
            url: '/admin/get/list-of-administrator',
            type:'POST',
            dataSrc: ''
        },
        columns: [ 
        	{ data : "admin_id" },
        	{ data : "name" },
        	{ data : "username" },
        	{ data : "email" },
        	{ data : "phoneNumber" },
        	{ data : "status" },
        	{ data : "level_of_access"},
        	{
	            "render": function ( data, type, row, meta ) {
	            	var buttons = "";
	            	if(row.status == "Blocked"){
	            		buttons = '<button class="btn btn-danger btn-sm mr-1 disableAdministratorAccount" id="'+row.admin_id+'" value="'+row.name+'"><i class="material-icons">do_not_disturb</i></button>';
	            	}else{
	            		buttons = '<button class="btn btn-outline-danger btn-sm mr-1 disableAdministratorAccount" id="'+row.admin_id+'" value="'+row.name+'"><i class="material-icons">do_not_disturb</i></button>';
	            	}
	            	if(row.status == "Not Active"){
	            		buttons += '<button class="btn btn-outline-success btn-sm mr-1 activateAdministratorAccount" id="'+row.admin_id+'" value="'+row.name+'"><i class="material-icons">verified_user</i></button>';
	            	}else {
	            		buttons += '<button class="btn btn-success btn-sm mr-1"><i class="material-icons">verified_user</i></button>';	            		
	            	}
	            	return buttons;
	            }
        	}
        ]		
	});
});

$(document).on('click','.disableAdministratorAccount',function(){
	var id = $(this).attr("id");
	var array  = [];
	var object = {};
	object["admin_id"] = id;
	array.push(object);
	$.ajax({
		url:"/admin/change-admin-status",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},		
		data:JSON.stringify(array),
		success:function(responseData){
			$('#listOfAdministrator').DataTable().ajax.reload();
		}
	});
});	
$(document).on('click','.activateAdministratorAccount',function(){
	var id = $(this).attr("id");
	var array  = [];
	var object = {};
	object["admin_id"] = id;
	array.push(object);
	$.ajax({
		url:"/admin/change-admin-status-not-activated",
		type:"POST",
		headers	:	{
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},		
		data:JSON.stringify(array),
		success:function(responseData){
			$('#listOfAdministrator').DataTable().ajax.reload();
		}
	});
});