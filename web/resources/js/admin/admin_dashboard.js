      $(document).ready(function(){

    	  setInterval(function(){
    		  populateJobsCard();
    		  setDonutChartJobs();
    	  },2500);
    });
      function setDonutChartJobs(){
		      google.charts.load("current", {packages:["corechart"]});
		      google.charts.setOnLoadCallback(drawChart);
		      function drawChart() {
		        var data = google.visualization.arrayToDataTable([
		          ['Jobs', 'Hours per Day'],
		          ['Active', parseInt($('.active_jobs').html())],
		          ['Cancelled/Expired', parseInt($('.cancelled_jobs').html())],
		          ['In Progress', parseInt($('.in_progress_jobs').html())],
		          ['Completed', parseInt($('.completed_jobs').html())]
		        ]);
		
		        var options = {
		          title: 'Jobs',
		          pieHole: 0.6,
		          slices:{
		        	  0 : { color: '#4285F4'},
		        	  1 : { color: '#ff4444' },
		        	  2 : { color: '#33b5e5' },
		        	  3 : { color: '#00C851' }
		          }
		        };
		
		        var chart = new google.visualization.PieChart(document.getElementById('activeJobsChart'));
		        chart.draw(data, options);
		      }
      }

      
      
      function populateJobsCard(){
    	  $.ajax({
    		 url : "/admin/populate-jobs-card" ,
    		 type : "POST",
    		 success:function(rsponse){
    			 $('.active_jobs').html(rsponse.active);
    			 $('.cancelled_jobs').html(rsponse.cancelled);
    			 $('.in_progress_jobs').html(rsponse.in_progress);
    			 $('.completed_jobs').html(rsponse.completed);
    			 $('.all_jobs').html(rsponse.all_jobs);
    		 }
			 
    	  });
      }
      
