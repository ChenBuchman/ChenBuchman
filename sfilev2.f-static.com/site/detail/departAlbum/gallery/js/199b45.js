//The default page (on load)
var activeLineNUM = 1;

$(document).ready(function(){

	//Disable the scroll bar of the page
	$("body").css("overflow", "hidden");

	//On mouse over on the big image we like to show the next and prev buttons
	$('body').on('mouseenter',function(){
		$('#navButtons').show( 'fade',{},300);
	});
	$('body').on('mouseleave',function(){
		$('#navButtons').hide( 'fade',{},300);
	})

	//Set the images
	SetAllImagesAndLocations();

	//We don't want the screen resize will run more then one time because it's very hard to the browser to handle it
	function debouncer( func , timeout ) {
		var timeoutID , timeout = timeout || 100;
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
		//Set the images
		SetAllImagesAndLocations();
	} ) );

});

//Set the images
function SetAllImagesAndLocations(){
	//Reset the number of line in the album
	activeLineNUM = 1;
	//Get the width & height of the screen
	var imageWidthNUM = widthMoveTXT;
	var imageHeightNUM = heightMoveTXT;
	//Set images size
	$('.GallerySop15classImage').width(imageWidthNUM);
	$('.GallerySop15classImage').height(imageHeightNUM);
	//Rearrange the images in the page (we don't like white space in every line)
	rearrangeWhiteSpace();
	//Get images numbers
	var imageWidthNumberNUM = Math.floor($(window).width()/$('.GallerySop15classImage').outerWidth(true));
	var imageHeightNumberNUM = Math.floor($(window).height()/$('.GallerySop15classImage').outerHeight(true));
	//How many image to show in every page
	imagePageNUM	= imageWidthNumberNUM*imageHeightNumberNUM

	//Set what images to see and what images need to be hidden
	showHideImagesByPage(activeLineNUM,imagePageNUM);

	//We need to deside if we need to show again the "next page" option (maybe it's the end)
	showHideNavButtons(1,activeLineNUM,imagePageNUM,1)
	//We need to deside if we need to show again the "prev page" option (maybe it's the end)
	showHideNavButtons(0,activeLineNUM,imagePageNUM,1)

	//We like all the pages will be in the same height when we move to the next or prev image
	setImagesHeight();

	//If there is play buttons of videos we like to set them in the right place
	//Set button 'top' position
	$('.smallPlayButton').css('top',($('#Album_Pic_1').outerHeight()/2)-($('.smallPlayButton').outerHeight()/2));
	//Set button 'right' position
	$('.smallPlayButton').css('right',($('#Album_Pic_1').outerWidth()/2)-($('.smallPlayButton').outerWidth()/2));

	//Fix all URL's so we can play Vimeo & Youtube videos
	FixVideoURLs();
}

//Set what images to see and what images need to be hidden
function showHideImagesByPage(activeLineNUM,imagePageNUM) {
	if ($("[id^=Album_Pic_]").length>0) {
		//Hide all images
		$("[id^=Album_Pic_]").hide();
		//Show only the ones that exist in the current page
		for (var i=1;i<=imagePageNUM;i++) {
			//We like the images will be side by side
			if ($('#Album_Pic_'+((activeLineNUM*imagePageNUM)-imagePageNUM+i)+'')) {
				$('#Album_Pic_'+((activeLineNUM*imagePageNUM)-imagePageNUM+i)+'').css('display','inline-block');
			}
		}
	}
}

//Rearrange the images in the page (we don't like white space in every line)
function rearrangeWhiteSpace() {
	//******* Images Width *********
	//Get full width
	var galleryWidthNUM = $('#GallerySop15').width()-1;
	var imageWidthNUM = $('.GallerySop15class').outerWidth(true);

	//Get the max number of images we can insert to every line
	var maxLineImages = Math.floor((galleryWidthNUM/imageWidthNUM)+1);

	//Return the width the images need to get so we can set all of them inside one line
	var getNewImagesWidth = galleryWidthNUM/maxLineImages;

	//Get the margin of the images + extra pixel of the browser
	var imageMargin = imageWidthNUM-$('.GallerySop15classImage').width();

	//Set the new width to the images
	$('.GallerySop15classImage').width(getNewImagesWidth-imageMargin);
}

//To show or not to show the navigation button
function showHideNavButtons(nextBOO,activeLineNUM,imagePageNUM,onloadBOO) {
	if (nextBOO==1) {
		//We need to deside if we need to show again the "next page" option (maybe it's the end)
		if ($('#Album_Pic_'+(activeLineNUM*imagePageNUM+1)+'').length == 0) {
			//Hide the button
			$('#NextButtonGallery').css('display', 'none');
		} else {
			//Show the button
			$('#NextButtonGallery').css('display', 'inline');
		}
		//Show the prev button
		if (onloadBOO==0)
			$('#PrevButtonGallery').css('display', 'inline');
	} else {
		//We need to deside if we need to show again the "prev page" option (maybe it's the end)
		if ($('#Album_Pic_'+(activeLineNUM-1)+'').length == 0) {
			//Hide the button
			$('#PrevButtonGallery').css('display', 'none');
		} else {
			//Show the button
			$('#PrevButtonGallery').css('display', 'inline');
		}
		//Show the next button
		if (onloadBOO==0)
			$('#NextButtonGallery').css('display', 'inline');
	}
}

//We like all the pages will be in the same height when we move to the next or prev image
function setImagesHeight() {
	$('#GallerySop15').height($('#GallerySop15_0').height());

	//Set the position of the next and prev buttons
	$('.MoveNextImage').css('top',($('body').outerHeight()/2)-($('.MoveNextImage').outerHeight()/2));
	$('.MovePrevImage').css('top',($('body').outerHeight()/2)-($('.MovePrevImage').outerHeight()/2));
}

function NextAlbumLine() {
	//Save the active page for the next move the user will do
	activeLineNUM = activeLineNUM+1;

	showHideImagesByPage(activeLineNUM,imagePageNUM);

	//We need to deside if we need to show again the "next page" option (maybe it's the end)
	showHideNavButtons(1,activeLineNUM,imagePageNUM,0)
}

function PrevAlbumLine() {
	//Save the active page for the next move the user will do
	activeLineNUM = activeLineNUM-1;

	showHideImagesByPage(activeLineNUM,imagePageNUM);

	//We need to deside if we need to show again the "prev page" option (maybe it's the end)
	showHideNavButtons(0,activeLineNUM,imagePageNUM,0)
}

//Fix all URL's so we can play Vimeo & Youtube videos
function FixVideoURLs() {
	$("a[id^='Album_Pic_']").each(function() {
		var urlTXT	= jQuery(this).attr('href');
		urlTXT	= GetVimeoPlayerURL(urlTXT);
		urlTXT	= GetYoutubePlayerURL(urlTXT);
		jQuery(this).attr('href',urlTXT);
	});
}

// Get the Vimeo player URL
function GetVimeoPlayerURL(url){
	if (url.indexOf("player.vimeo.com") > -1 || url.indexOf("vimeo.com") == -1){

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
	if (url.indexOf("youtube.com/embed") > -1 || url.indexOf("youtube.com") == -1){

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