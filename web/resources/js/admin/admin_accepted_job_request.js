
$(document).ready( function () {

    var table = $('#AcceptedJobRequest').DataTable({
        ajax: {
            url: '/admin/get/all/accepted/job-request',
            type:'POST',
            dataSrc: ''
        },
        columns: [ 
        	{ data : "requestId" },
        	{ data : "clientJobId" },
        	{ data : "doerJobId" },
        	{ data : "jobType" },
        	{ data : "deliveryExactTime"},
        	{ data : "amountRequired" },
        	{ data : "deliveryFee" },
        	{ data : "requestStatus" }
        ]
    });
    
    
} );