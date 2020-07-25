//The default page (on load)
var timerSlide;
var imageClickTimer;
var myCarousel
var effectFlagTXT			//Get the effect we use

$(document).ready(function(){

	//Disable the scroll bar of the page
	$("body").css("overflow", "hidden");
	$("body").css("position", "static");

	//On mouse over on the big image we like to show the next and prev buttons
	$('#GallerySop16_ShowImage').on('mouseenter',function(){
		$('.MoveNextImage').show( 'fade',{},300);
		$('.MovePrevImage').show( 'fade',{},300);
	});
	$('#GallerySop16_ShowImage').on('mouseleave',function(){
		$('.MoveNextImage').hide( 'fade',{},300);
		$('.MovePrevImage').hide( 'fade',{},300);
	})

	//Set the images
	SetAllImagesAndLocations();

	//We don't want the screen resize will run more then one time because it's very hard to the browser to handle it
	function debouncer( func , timeout ) {
		var timeoutID , timeout = timeout || 200;
		return function () {
			var scope = this , args = arguments;
			clearTimeout( timeoutID );
			timeoutID = setTimeout( function () {
				func.apply( scope , Array.prototype.slice.call( args ) );
			} , timeout );
		}
	}

	//Active the resize window event
	$( window ).resize( debouncer( function ( e ) {
		//Kill the exist image slider
		clearTimeout(timerSlide);
		//Stop any animation that running right now
		StopEffectRight();
		//Destroy the carousel so we could build it again
		if (myCarousel && myCarousel.Destroy){
			myCarousel.Destroy();
		}
		//Set the images again
		SetAllImagesAndLocations();
	} ) );

});

//Set the images
function SetAllImagesAndLocations(){
	if (placeTXT=='top' || placeTXT=='bottom'){
		$('#GallerySop16_tumb').width($(window).width());
		$('.imagesTumb').css({
			'position':'static',
			'float':'left'
		});
	}
	if (placeTXT=='left' || placeTXT=='right'){
		$('#GallerySop16_tumb').height($(window).height());
	}
	$('.imagesTumb').width($('.GallerySop16classImage').outerWidth(true));
	$('.imagesTumb').height($('.GallerySop16classImage').outerHeight(true));
	
	myCarousel = $('#GallerySop16_tumb').scrollingCarousel( {
		scrollerAlignment : (placeTXT=='top' || placeTXT=='bottom') ? 'horizontal' : 'vertical',
		looped : false,
		scrollSpeed : 'slow',
		afterCreateFunction : function(){
			//Display the first image on the album
			$('#Album_Pic_1').click();

			//We like all the pages will be in the same height when we move to the next or prev image
			setImagesHeight();

			//Set the image thumb to position absolute so we can use it for the 'right'
			$('#GallerySop16_tumb').css('position','absolute');

			// ***** FIX ***** make scrollingCarousel RTL *****
			//Because the scrollingCarousel is set the float automatic we inforce him to work right
			/*if (placeTXT=='top' || placeTXT=='bottom'){
				$('.imagesTumb').css({
					'float':aT
				});
				if (aT=='right'){
					$('.imagesTumb').parent('div').css({
						'right':$('.imagesTumb').parent('div').css('left'),
						'left':'auto'
					});
				}
			}*/
		}
	});

	//Fix the height and the width of the tumb
	if (placeTXT=='top' || placeTXT=='bottom'){
		$('#GallerySop16_tumb').height($('.imagesTumb').height());
	}
	if (placeTXT=='left' || placeTXT=='right'){
		$('#GallerySop16_tumb').width($('.imagesTumb').width());
	}

	//If the scroll not function we call the images from here
	if (!myCarousel){
		//Display the first image on the album
		$('#Album_Pic_1').click();

		//We like all the pages will be in the same height when we move to the next or prev image
		setImagesHeight();

		//Set the image thumb to position absolute so we can use it for the 'right'
		$('#GallerySop16_tumb').css('position','absolute');
	}

	//If there is play buttons of videos we like to set them in the right place
	//Set button 'top' position
	$('.smallPlayButton').css('top',($('.imagesTumb').outerHeight()/2)-($('.smallPlayButton').outerHeight()/2));
	//Set button 'right' position
	$('.smallPlayButton').css('right',($('.imagesTumb').outerWidth()/2)-($('.smallPlayButton').outerWidth()/2));
}

//We like all the pages will be in the same height when we move to the next or prev image
function setImagesHeight() {
	if (placeTXT=='left' || placeTXT=='right'){
		//Set the width of the big image minus the thamb images
		$('#GallerySop16_ShowImage').width($(window).width()-$('#GallerySop16_tumb').outerWidth(true)-20);
		//Set the height of the image as the height of the thamp side bar
		$('#GallerySop16_ShowImage').height('100%');
	}
	if (placeTXT=='top' || placeTXT=='bottom'){
		//Set the width of the big image minus the thamb images
		$('#GallerySop16_ShowImage').width('100%');
		//Set the height of the image as the height of the thamp side bar
		$('#GallerySop16_ShowImage').height($(window).height()-$('#GallerySop16_tumb').outerHeight(true)-20);
	}
	if (placeTXT=='no'){
		//Set the width of the big image minus the thamb images
		$('#GallerySop16_ShowImage').width('100%');
		$('#GallerySop16_ShowImage').height('100%');
	}
	//Set the start position of the images
	switch(placeTXT){
		case "left":
			$('#GallerySop16_ShowImage').css('left',$('#GallerySop16_tumb').outerWidth(true)+10);
			break;
		case "right":
			$('#GallerySop16_ShowImage').css('right',$('#GallerySop16_tumb').outerWidth(true)+10);
			break;
		case "top":
			$('#GallerySop16_ShowImage').css('top',$('#GallerySop16_tumb').outerHeight(true)+10);
			break;
		case "bottom":
			$('#GallerySop16_ShowImage').css('bottom',$('#GallerySop16_tumb').outerHeight(true)+10);
			break;
	}
	//Set the position of the next and prev buttons
	$('.MoveNextImage').css('top',($('.GallerySop16classBigImage').outerHeight()/2)-($('.MoveNextImage').outerHeight()/2));
	$('.MovePrevImage').css('top',($('.GallerySop16classBigImage').outerHeight()/2)-($('.MovePrevImage').outerHeight()/2));
	$('.MoveNextImage').css('right',parseInt($('.GallerySop16classBigImage').css('margin-right'))+parseInt($('.GallerySop16classBigImage').css('border-right-width')));
	$('.MovePrevImage').css('left',parseInt($('.GallerySop16classBigImage').css('margin-left'))+parseInt($('.GallerySop16classBigImage').css('border-left-width')));
}

var activeState = 1; //Does the user can change the image or the gallery need to finish something
function showImage(el) {

	//Stop any animation that running right now
	StopEffectRight();

	//Kill the exist image slider
	clearTimeout(timerSlide);
	window.clearInterval(imageClickTimer);
	if (activeState==1 && $('.ui-effects-wrapper').length==0){
		activeState = 0;

		//Add a new image before the DOM of the exist one
		$("#bigImageActive.GallerySop16classBigImage").before('<div id="bigImageBefore" class="GallerySop16classBigImage"><div class="GallerySop16classBigImageText albumText" style="display: none;"></div></div>');
		$("#bigImageBefore.GallerySop16classBigImage").css('background-image','url('+$(el).attr('href')+')');

		//Set the text on the image
		if ($(el).attr('title')!='') {
			$("#bigImageBefore").find('.GallerySop16classBigImageText').html($(el).attr('title'));
			$("#bigImageBefore").find('.GallerySop16classBigImageText').show();
		}

		//Make the effect on the image and hide it
		MakeEffectMagic();
	}

	function SetToActiveImage(){

		//Remove the old image from the DOM
		$("#bigImageActive.GallerySop16classBigImage").remove()

		//Change the new image to the active ID
		$("#bigImageBefore.GallerySop16classBigImage").attr('id','bigImageActive');

		//Set the image as the active image and remove that the other image
		$('.activeImage').removeClass('activeImage');
		$(el).parent().addClass('activeImage');

		//Check if we need to add link to the element
		if ($(el).attr('data-link').length>0){
			//First we remove old link from the big image
			if ($(".bigImageLink").length>0){
				$(".GallerySop16classBigImage").unwrap();
			}
			//Add link
			$(".GallerySop16classBigImage").wrap("<a target='_top' class='bigImageLink' href='"+$(el).attr('data-link')+"'></a>");

			//Check if it is Vimeo URL
			if ($(el).attr('data-link').indexOf("vimeo.com") > -1) {

				//Build play button
				$('#bigImageActive').append('<a id="PlayButtonVideo" style=" display: inline;position: absolute;  top: 50%;  right: 50%;  background: rgba(0, 0, 0, 0.5) url(/images/iconClean/24x24/plain/media_play.png) no-repeat center center;  height: 68px;  width: 68px;  cursor: pointer;  border-radius: 7px;"></a>');
				//Set button 'top' position
				$('#PlayButtonVideo').css('top',($('.GallerySop16classBigImage').outerHeight()/2)-($('#PlayButtonVideo').outerHeight()/2));
				//Set button 'right' position
				$('#PlayButtonVideo').css('right',($('.GallerySop16classBigImage').outerWidth()/2)-($('#PlayButtonVideo').outerWidth()/2));

				$('.bigImageLink').click(function() {
					//Build video
					$('#bigImageActive').append('<div id="videoPopUp" style="position: absolute;width: 100%;height: 100%;"><iframe src="'+GetVimeoPlayerURL($(el).attr('data-link'))+'" width="500" height="213" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="width: 100%;height: 100%;"></iframe></div>');
					//Remove the play button
					$('#PlayButtonVideo').remove();
					//Stop the animation, the user can use the button to move the next images
					clearTimeout(timerSlide);
					window.clearInterval(imageClickTimer);
					return false;
				});
			}

			//Check if it is YouTube URL
			if ($(el).attr('data-link').indexOf("youtube.com") > -1) {

				//Build play button
				$('#bigImageActive').append('<a id="PlayButtonVideo" style=" display: inline;position: absolute;  top: 50%;  right: 50%;  background: rgba(0, 0, 0, 0.5) url(/images/iconClean/24x24/plain/media_play.png) no-repeat center center;  height: 68px;  width: 68px;  cursor: pointer;  border-radius: 7px;"></a>');
				//Set button 'top' position
				$('#PlayButtonVideo').css('top',($('.GallerySop16classBigImage').outerHeight()/2)-($('#PlayButtonVideo').outerHeight()/2));
				//Set button 'right' position
				$('#PlayButtonVideo').css('right',($('.GallerySop16classBigImage').outerWidth()/2)-($('#PlayButtonVideo').outerWidth()/2));

				$('.bigImageLink').click(function() {
					//Build video
					$('#bigImageActive').append('<div id="videoPopUp" style="position: absolute;width: 100%;height: 100%;"><iframe src="'+GetYoutubePlayerURL($(el).attr('data-link'))+'" width="500" height="213" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="width: 100%;height: 100%;"></iframe></div>');
					//Remove the play button
					$('#PlayButtonVideo').remove();
					//Stop the animation, the user can use the button to move the next images
					clearTimeout(timerSlide);
					window.clearInterval(imageClickTimer);
					return false;
				});
			}
		} else {
			//Remove old link
			if ($(".bigImageLink").length>0){
				$(".GallerySop16classBigImage").unwrap();
			}
		}

		//We finish the effect
		activeState = 1;

		//Check if the user add a timer on is album and if we need to show the next image
		//Do the user set auto timer for the images?
		//We run it after the effect is done
		if (pauseTimeNUM.length>0){
			timerSlide = setTimeout(function(){
				//Move to the next image
				MoveNextImage();
			},pauseTimeNUM);
		}
	}

	//Make the effect on the image and hide it
	function MakeEffectMagic(){
		//Get the effect we use
		effectFlagTXT	= GetSlideEffects();
		var obj			= $("#bigImageActive.GallerySop16classBigImage");

		//Build the jQuery effect
		switch(effectFlagTXT){
			case "slideDown":
				obj.hide( 'slide',{direction: 'down'},2000,SetToActiveImage);
				break;
			case "slideUp":
				obj.hide( 'slide',{direction: 'up'},2000,SetToActiveImage);
				break;
			case "slideRight":
				obj.hide( 'slide',{direction: 'right'},2000,SetToActiveImage);
				break;
			case "slideLeft":
				obj.hide( 'slide',{direction: 'left'},2000,SetToActiveImage);
				break;
			case "fold":
				obj.hide( 'fold',{},2000,SetToActiveImage);
				break;
			case "fade":
				obj.hide( 'fade',{},2000,SetToActiveImage);
				break;
			case "blindUp":
				obj.hide( 'blind',{direction: 'up'},2000,SetToActiveImage);
				break;
			case "bounce":
				obj.hide( 'bounce',{},2000,SetToActiveImage);
				break;
			case "clipUp":
				obj.hide( 'clip',{direction: 'up'},2000,SetToActiveImage);
				break;
			case "dropLeft":
				obj.hide( 'drop',{direction: 'left'},2000,SetToActiveImage);
				break;
			case "explode":
				obj.hide( 'explode',{},2000,SetToActiveImage);
				break;
			case "puff":
				obj.hide( 'puff',{},2000,SetToActiveImage);
				break;
			case "pulsate":
				obj.hide( 'pulsate',{},2000,SetToActiveImage);
				break;
			case "shakeLeft":
				obj.hide( 'shake',{direction: 'left'},2000,SetToActiveImage);
				break;
		}
	}
}


//Move the user to the next image
function MoveNextImage(){

	//Stop any animation that running right now
	StopEffectRight();

	if (activeState=='1') {
		//Get active image
		var activeImage = $(".activeImage");
		//Click the next image and set it as active
		if (activeImage.next().length>0) {
			activeImage.next().find('a').click();
		} else {
			$('#GallerySop16_tumb a').first().click();
		}
	} else {
		//We don't want Infinite loop so we sleep for half a second
		setTimeout(function(){
			//Move the user to the next image
			MoveNextImage();
		},200);
	}
}

//Move the user to the prev image
function MovePrevImage(){

	//Stop any animation that running right now
	StopEffectRight();

	if (activeState=='1') {
		//Get active image
		var activeImage = $(".activeImage");
		//Click the next image and set it as active
		if (activeImage.prev().length>0) {
			activeImage.prev().find('a').click();
		} else {
			$('#GallerySop16_tumb a').last().click();
		}
	} else {
		//We don't want Infinite loop so we sleep for half a second
		setTimeout(function(){
			//Move the user to the prev image
			MovePrevImage();
		},200);
	}
}

//We output the effect the user choose
function GetSlideEffects(){
	//random
	var effectArr		= ["slideDown","slideUp","slideRight","slideLeft","fold","fade","blindUp","bounce","clipUp","dropLeft","explode","puff","pulsate","shakeLeft"];

	//randomSlides
	var effectSlideArr	= ["slideDown","slideUp","slideRight","slideLeft"];

	if (effectTXT=='' || effectTXT=='random'){
		//Get random number to search in the array
		var itemRandom = Math.floor((Math.random()*(effectArr.length))+0);
		return effectArr[itemRandom];
	}
	if (effectTXT=='randomSlides'){
		//Get random number to search in the array
		var itemRandom = Math.floor((Math.random()*(effectSlideArr.length))+0);
		return effectSlideArr[itemRandom];
	}
	
	//No random effect return what the user send
	return effectTXT;
}

//Global function that handle the effects stop
//Some effects don't support it
function StopEffectRight() {
	//Stop the effect (not all effect can use it)
	if (effectFlagTXT!='fold' && effectFlagTXT!='blindUp' && effectFlagTXT!='bounce' && effectFlagTXT!='explode' && effectFlagTXT!='pulsate' && effectFlagTXT!='shakeLeft') {
		//Stop the effects
		$("#bigImageActive.GallerySop16classBigImage").stop( true, true );
	}
}






// Get the Vimeo player URL
function GetVimeoPlayerURL(url){
	if (url.indexOf("player.vimeo.com") > -1){

		//The URL is already set right
		return url;

	} else {

		if (url.indexOf("?") > -1){
			var regExp = /(http|https):\/\/vimeo\.com\/([0-9]+)\?/;

			var match = url.match(regExp);
			var videoID = match[2];
		} else {
			var regExp = /(http|https):\/\/vimeo\.com\/([0-9]+)/;

			var match = url.match(regExp);
			var videoID = match[2];
		}

		//We have to use v = 1 only for building the right URL starting
		return "//player.vimeo.com/video/"+videoID+"?autoplay=1";

	}
}

// Get the YouTube player URL
function GetYoutubePlayerURL(url){
	if (url.indexOf("youtube.com/embed") > -1){

		//The URL is already set right
		return url;

	} else {

		if (url.indexOf("v=") > -1){
			if (url.indexOf("&") > -1){
				videoID = String(url).substring(url.indexOf("v=")+2,url.indexOf("&"));
			}else{
				videoID = String(url).substring(url.indexOf("v=")+2,url.length);
			}

			//We have to use v = 1 only for building the right URL starting
			return "//www.youtube.com/embed/"+videoID+"?rel=0&wmode=opaque&autoplay=1";

		}

	}
}