
$(document).ready( function () {

    var table = $('#PendingJobRequest').DataTable({
        ajax: {
            url: '/admin/get/all/pending/job-request',
            type:'POST',
            dataSrc: ''
        },
        columns: [ 
        	{ data : "job_id" },
        	{ data : "server_job_id" },
        	{ data : "name" },
        	{ data : "job_type"},
        	{ data : "location_details" },
        	{ data : "time" },
        	{ data : "required_cash" },
        	{ data : "delivery_fee" },
        	{ data : "dateCreated" },
        	{ data : "status" }
        ]
    });
    
    
} );