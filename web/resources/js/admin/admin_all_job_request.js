$(document).ready(function(){
    var table = $('#AllJobRequest').DataTable({
        ajax: {
            url: '/admin/get/all/job-request',
            type:'POST',
            dataSrc: ''
        },
        columns: [ 
        	{ data : "job_id" },
        	{ data : "server_job_id" },
        	{ data : "name" },
        	{ data : "job_type" },
        	{ data : "time"},
        	{ data : "required_cash" },
        	{ data : "delivery_fee" },
        	{ data : "dateCreated" },
        	{ data : "status" }
        ]
    });
});