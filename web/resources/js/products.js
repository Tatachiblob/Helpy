
$(document).on("click",'.menuBtn',function(){
	$(this).css("border","0");
	$('.dropdown-content').css('display','block');
	$(this).removeClass('menuBtn').addClass('hideMenu');
	$('.menuFourBars').css("color","#428bca");
});
$(document).on("click",'.hideMenu',function(){
	$('.menuFourBars').css("color","white");
	$(this).css("border","0");
	$('.dropdown-content').css('display','none');
	$(this).removeClass('hideMenu').addClass('menuBtn');	
});

$(document).click(function(e){
	if(!$(e.target).parent().hasClass('hideMenu')){
		$('.dropdown-content').css('display','none');
		$('.barBtn').removeClass('hideMenu').addClass('menuBtn');
			$('.menuFourBars').css("color","white");
	}else{
		
	}
});