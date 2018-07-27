$(document).ready(function(){
	$('.UsersTable').css("display","none");
	$('#adminDashboard').css("display","");
	$('.sideNavItem').removeClass("activeTab").addClass("sidebarItem");
	$('.dashboardTab').removeClass("sidebarItem").addClass("activeTab");
});
$('.jobsTab').click(function(){
	$('.sideNavItem').removeClass("activeTab").addClass("sidebarItem");
	$(this).removeClass("sidebarItem").addClass("activeTab");
	$('.jobsDropdown').css("display","");
});
$('.dashboardTab').click(function(){
	$('.activeJobs,.acceptedJobs').removeClass("activeDropdownJobs");	
	$('.sideNavItem').removeClass("activeTab").addClass("sidebarItem");
	$(this).removeClass("sidebarItem").addClass("activeTab");
	$('.jobsDropdown').css("display","none");	
	$('.PendingJobRequest,.AcceptedJobRequest').css('display','none');
	$('#adminDashboard').css("display","");
	$('.AdminWalletHistory,.PendingJobRequest,.AcceptedJobRequest,.adminViewTab,.AllJobRequest,.UsersTable,#archiveWallet').css("display","none");
	$('#UsersTable').DataTable().ajax.reload();
	
});
$('.usersTab').click(function(){
	$('.activeJobs,.acceptedJobs').removeClass("activeDropdownJobs");	
	$('.sideNavItem').removeClass("activeTab").addClass("sidebarItem");
	$(this).removeClass("sidebarItem").addClass("activeTab");
	$('.jobsDropdown').css("display","none");	
	$('.PendingJobRequest,.AcceptedJobRequest').css('display','none');
	$('#UsersTable').DataTable().ajax.reload();
	$('.UsersTable').css("display","");
	$('.AdminWalletHistory,.PendingJobRequest,.AcceptedJobRequest,.adminViewTab,.AllJobRequest,#adminDashboard,#archiveWallet').css("display","none");
	$('#UsersTable').DataTable().ajax.reload();
	
});
$('.adminTab').click(function(){
	$('.activeJobs,.acceptedJobs').removeClass("activeDropdownJobs");	
	$('.sideNavItem').removeClass("activeTab").addClass("sidebarItem");
	$(this).removeClass("sidebarItem").addClass("activeTab");
	$('.jobsDropdown').css("display","none");	
	$('.adminViewTab').css("display","");
	$('#listOfAdministrator').DataTable().ajax.reload();
	$('.AdminWalletHistory,.PendingJobRequest,.UsersTable,.AcceptedJobRequest,.AllJobRequest,#adminDashboard,#archiveWallet').css("display","none");
});
$('.archieveTab').click(function(){
	$('#adminArchieveView1').html('');
	$('#startDateIpt,#endDateIpt').val('');
	$('.activeJobs,.acceptedJobs').removeClass("activeDropdownJobs");	
	$('.sideNavItem').removeClass("activeTab").addClass("sidebarItem");
	$(this).removeClass("sidebarItem").addClass("activeTab");
	$('.jobsDropdown').css("display","none");	
	$('#archiveWallet').css("display","");
	$('.AdminWalletHistory,.PendingJobRequest,.UsersTable,.AcceptedJobRequest,.AllJobRequest,#adminDashboard,.adminViewTab').css("display","none");
});
$('.walletTab').click(function(){
	getAdminWalletTotalBalance();
	getUserTotalBalance();
	$('.activeJobs,.acceptedJobs').removeClass("activeDropdownJobs");	
	$('.sideNavItem').removeClass("activeTab").addClass("sidebarItem");
	$('#AdminWalletHistory').DataTable().ajax.reload();
	$(this).removeClass("sidebarItem").addClass("activeTab");
	$('.jobsDropdown').css("display","none");		
	$('.UsersTable,.PendingJobRequest,.AcceptedJobRequest,UsersTable,.adminViewTab,.AllJobRequest,#adminDashboard,#archiveWallet').css("display","none");
	$('.AdminWalletHistory').css("display","");
	$('#AdminWalletHistory').DataTable().ajax.reload();
});

$('.activeJobs').click(function(){
	$(this).addClass("activeDropdownJobs");
	$('.acceptedJobs,.allJobs').removeClass("activeDropdownJobs");
	$('#PendingJobRequest').DataTable().ajax.reload();	
	$('.PendingJobRequest').css('display','');
	$('.AdminWalletHistory,.AcceptedJobRequest,.UsersTable,.adminViewTab,.AllJobRequest,#adminDashboard,#archiveWallet').css("display","none");
});
$('.acceptedJobs').click(function(){
	$(this).addClass("activeDropdownJobs");
	$('.activeJobs,.allJobs').removeClass("activeDropdownJobs");	
	$('#AcceptedJobRequest').DataTable().ajax.reload();
	$('.AcceptedJobRequest').css('display','');
	$('.AdminWalletHistory,.PendingJobRequest,.UsersTable,.adminViewTab,.AllJobRequest,#adminDashboard,#archiveWallet').css("display","none");
});
$('.allJobs').click(function(){
	$(this).addClass("activeDropdownJobs");
	$('.acceptedJobs,.activeJobs').removeClass("activeDropdownJobs");	
	$('#AllJobRequest').DataTable().ajax.reload();
	$('.AllJobRequest').css('display','');
	$('.AdminWalletHistory,.PendingJobRequest,.UsersTable,.adminViewTab,.AcceptedJobRequest,#adminDashboard,#archiveWallet').css("display","none");
});

function getAdminWalletTotalBalance(){
	$.ajax({
		url:"/admin/wallet/get/total",
		type:"POST",
		dataType:"json",
		success:function(responseData){
			$('.systemTotalIncome').html("&#x20B1; "+responseData.total);
		}
	});
}
function getUserTotalBalance(){
	$.ajax({
		url:"/admin/user/total-balance",
		type:"POST",
		dataType:"json",
		success:function(responseData){
			$('.clientTotalIncome').html("&#x20B1; "+responseData.userBalance);
		}
	});
}

