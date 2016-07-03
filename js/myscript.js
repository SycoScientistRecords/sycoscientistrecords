var mq = window.matchMedia( "(max-width: 285px)" );
var mq720 = window.matchMedia( "(max-width: 720px)" );
var mylogo = document.getElementById("mylogo");
if(mq.matches) {	
	mylogo.innerHTML = "SSR";
}
if(mq720.matches) {
	
} 



function changelogo() {
	return function() {
		if(mq.matches) {			
			mylogo.innerHTML = "SSR";
		}
		else {
			mylogo.innerHTML = "Syco Scientist Records"
		}
	}
}

window.onresize = changelogo();


if ( window.matchMedia( "(max-width: 768px)" ).matches) {
	var state = 0;
	var opened = 1;
	var closed = 0;
	document.getElementById("panel").style.height = "0px";
	document.getElementById("panel").style.padding = "0px";

	function togglestate1() {
		if(state == opened) {
			state = closed;
			document.getElementById("panel").style.height = "0px";
			document.getElementById("panel").style.padding = "0px";
		}
		else {
			state = opened;
			document.getElementById("panel").style.height = "390px";
			document.getElementById("panel").style.padding = "20px 25px";
		}
	}
	document.getElementById("flip").addEventListener("click", togglestate1);

	var framewidth = getComputedStyle(document.getElementsByClassName("main-video")[0]).width;
	document.getElementsByClassName("main-video")[0].style.height = (9/16 * parseInt(framewidth)) + 'px';
	$("#home").css("height", $(window).height());
}

if (window.matchMedia( "(min-width: 768px)" ).matches) {	
	var state = 1;
	var opened = 1;
	var closed = 0;
	function togglestate2() {
		if(state == opened) {
			state = closed;			
			
			document.getElementsByClassName("heading")[0].querySelector("h6").style.opacity = "0";
			document.getElementsByClassName("heading")[0].querySelector("h6").style.display = "none";	
			document.getElementById("main-video").className = "col-lg-11 col-md-11 col-sm-11";			
			document.getElementsByClassName("playlist")[0].style.width = "54px";
			var nodes = document.getElementsByClassName("playlist-videos")[0].getElementsByTagName("img");
			document.getElementsByClassName("playlist-videos")[0].style.overflowY = "hidden";
			for(var i=0; i<nodes.length; i++) {
				nodes[i].style.width = "0px";
			}
		}
		else {
			state = opened;
			document.getElementsByClassName("playlist")[0].style.width = "33.3333333%";			
			document.getElementById("main-video").className = "col-lg-8 col-md-8 col-sm-8";
			document.getElementsByClassName("heading")[0].querySelector("h6").style.opacity = "1";
			var disp1 = setInterval( function(){
				document.getElementsByClassName("heading")[0].querySelector("h6").style.display = "block";				
			}, 1000 );

			document.getElementsByClassName("playlist-videos")[0].style.overflowY = "auto";
			var nodes = document.getElementsByClassName("playlist-videos")[0].getElementsByTagName("img");
			for(var i=0; i<nodes.length; i++) {
				nodes[i].style.width = "100%";
			}
		}
	}
	document.getElementById("flip").addEventListener("click", togglestate2);
}

/* Swiping menu for buying Beats Starts*/

var center = document.getElementsByClassName("panel-group")[0];
var initialleft = parseInt("-" + screen.width);
var intpos, increment = 0, lastpos, direction, oldx = 0;
lastpos = initialleft;
center.style.left = initialleft;


function centertouchmove(Dmove) {
	increment = (Dmove.touches[0].screenX - intpos);		
	center.style.left = (lastpos + increment) + "px";
		/*
		if (Dmove.touches[0].pageX < oldx) {
			direction = "left";
		} else if (Dmove.touches[0].pageX > oldx) {
			direction = "right";
		}			
		oldx = Dmove.touches[0].pageX;	

		*/		
	}

	function centertouchend() {
		$("#beats .accordian-menu .panel-group").css("transition", "all .5s ease");	
		if( parseInt(increment) > 100 ) {
			center.style.left = "0px";
			lastpos = parseInt(center.style.left);
		}
		else if( (parseInt(increment) < -100) ) {
			center.style.left = initialleft + "px";
			lastpos = parseInt(center.style.left);
		}
		else{
			center.style.left = lastpos + "px";
		}
		
		center.removeEventListener( "touchmove", centertouchmove);
		center.removeEventListener("touchend", centertouchend);
	}

	center.addEventListener("touchstart", function centertouchstart(down) {

		intpos = down.touches[0].screenX;
		$("#beats .accordian-menu .panel-group").css("transition", "none 0s ease")
		center.addEventListener( "touchmove", centertouchmove);
		center.addEventListener("touchend", centertouchend);
	});





	$(window).on("orientationchange",function(){	
		center.style.left = "-" + screen.width + "px";
		initialleft = parseInt("-" + screen.width);
		lastpos = initialleft;

	});

	/* Swiping menu finishes here */













	/* jquery scrolling starts */

	var myscroll = {};
	myscroll.list = document.getElementsByClassName("navbar-right")[0].getElementsByTagName("li");

	myscroll.bodypos = function getScrollY() {
		var scrOfY = 0;
		if( typeof( window.pageYOffset ) == 'number' ) {
		//Netscape compliant
		scrOfY = window.pageYOffset;

	} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
			//DOM compliant
			alert();
			scrOfY = document.body.scrollTop;

		} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
				//IE6 standards compliant mode
				scrOfY = document.documentElement.scrollTop;
			}
			return scrOfY;
		}

		function getScrollpos(idname) {
			return document.getElementById(idname).offsetTop;
		}
		myscroll.point = [];
		myscroll.idnames = []; 
		myscroll.point[0] = getScrollpos("home");
		myscroll.point[1] = getScrollpos("artists");
		myscroll.point[2] = getScrollpos("songs");
		myscroll.point[3] = getScrollpos("beats");
		myscroll.point[4] = getScrollpos("contact");
		myscroll.idnames[0] = document.getElementById("home").getAttribute("id");
		myscroll.idnames[1] = document.getElementById("artists").getAttribute("id");
		myscroll.idnames[2] = document.getElementById("songs").getAttribute("id");
		myscroll.idnames[3] = document.getElementById("beats").getAttribute("id");
		myscroll.idnames[4] = document.getElementById("contact").getAttribute("id");



		function removeclass() {
			for(var i=0; i < 5; i++) {
				myscroll.list[i].className = "";
			}
		}


		window.addEventListener('scroll', function(e) {
			if (myscroll.bodypos() >= myscroll.point[0] - window.innerHeight/2 ){
				removeclass();
				myscroll.list[0].className = "active";
			}
			if (myscroll.bodypos() >= myscroll.point[1] - window.innerHeight/2 ){
				removeclass();		
				myscroll.list[1].className = "active";
			}
			if (myscroll.bodypos() >= myscroll.point[2] - window.innerHeight/2 ){
				removeclass();
				myscroll.list[2].className = "active";
			}
			if (myscroll.bodypos() >= myscroll.point[3] - window.innerHeight/2 ){
				removeclass();
				myscroll.list[3].className = "active";
			}
			if (myscroll.bodypos() >= myscroll.point[4] - window.innerHeight/2 ){
				removeclass();
				myscroll.list[4].className = "active";
			}
		});

		for( var j=0; j < 5; j++) {
			(function(j) {
				myscroll.list[j].anchor = document.getElementsByClassName("navbar-right")[0].getElementsByTagName("li")[j].getElementsByTagName("a")[0];
				$(myscroll.list[j].anchor).click(function(event) {
					event.preventDefault();
					$('html, body').animate({
						scrollTop: myscroll.point[j],
					}, 700 , function() { window.location = event.target.href } );	
				});
			}(j));
		}

		/* jquery scrolling finishes */







		/* songs playlist selector with jquery starts here */


		$(".playlist-videos img").click(function() {

			var myattr = $(this).attr("alt");
			$("#main-video iframe").attr("src", myattr);

		});



		/* Songs playlist selector with jquery finishes here */












		/* song player jquery starts */
		var songs = {};
		songs.playing = 0;
		songs.src0 = "songs/hello.mp3";
		songs.currsong = $("#song1");
		songs.songname = "Solder";

		function setsongduration() {
			songs.duration = parseInt( $("#active-song")[0].duration );
			songs.mindur = parseInt(songs.duration/60);
			songs.secdur = songs.duration % 60;
			$(".song-progress .total-time").text(songs.mindur + ":" + songs.secdur);
		}

		$("#play-pause").click( function(){

			if(songs.playing == 1) {
				songs.playing = 0;
				$("#active-song")[0].pause();
				$("#play-pause img").css("display", "none");
				$("#play-pause").css("backgroundColor", "transparent");
			}
			else {
				songs.playing = 1;
				$("#active-song")[0].play();
				$("#play-pause img").css("display", "block");
				$("#play-pause").css("backgroundColor", "white");
			}

		});

		


		$(".media .pull-right").click( function(){

			$(songs.currsong).parent().removeClass("active");
			songs.currsong = $(this).next();
			$(songs.currsong).parent().addClass("active"); 

			songs.src0 = $( "source", ( $(this).next() ) ).attr("src");
			songs.songname = $(this).parent().find(".beat-name span").text();
			songs.genre = $(this).parent().find(".genre").text();
			songs.price = $(this).parent().find(".price-range").text();
			songs.prod = $(this).parent().find(".beat-name span")[0].nextSibling.nodeValue;


			$(".naming .track-name").text(songs.songname);
			$("#active-song source").attr("src", songs.src0) ;
			$("#active-song")[0].load();
			$("#active-song")[0].play();
			$("#play-pause img").css("display", "block");
			$("#play-pause").css("backgroundColor", "white");
			songs.playing = 1;
		})

		$("#forward").click( function(){
			$(songs.currsong).parent().removeClass("active");
			songs.currsong = songs.currsong.parent().next().children("audio");
			$(songs.currsong).parent().addClass("active");
			if(songs.currsong.length != 0) {
				songs.songname = $(songs.currsong).parent().find(".beat-name span").text();
				songs.genre = $(songs.currsong).parent().find(".genre").text();
				songs.price = $(songs.currsong).parent().find(".price-range").text();
				songs.prod = $(songs.currsong).parent().find(".beat-name")[0].childNodes[4].nodeValue;


				songs.src0 = $( "source", ( $(songs.currsong) ) ).attr("src");
				$(".naming .track-name").text(songs.songname);
				$(".naming .producer-name").text(songs.prod);
				$(".naming .genre-name").text(songs.genre);
				$(".pricing .numerical-value").text(songs.price);
				$("#active-song source").attr("src", songs.src0);
				$("#play-pause img").css("display", "block");
				$("#play-pause").css("backgroundColor", "white");
				$("#active-song")[0].load();
				$("#active-song")[0].play();
				songs.playing = 1;
			}
			else {
				$(songs.currsong).parent().removeClass("active");
				songs.currsong = $("#song1");
				$(songs.currsong).parent().addClass("active");
				songs.songname = $("#song1").parent().find(".beat-name span").text();
				songs.genre = $("#song1").parent().find(".genre").text();
				songs.price = $("#song1").parent().find(".price-range").text();
				songs.prod = $("#song1").parent().find(".beat-name")[0].childNodes[4].nodeValue;



				songs.src0 = $( "source", ( $("#song1") ) ).attr("src");
				$(".naming .track-name").text(songs.songname);
				$(".naming .producer-name").text(songs.prod);
				$(".naming .genre-name").text(songs.genre);
				$(".pricing .numerical-value").text(songs.price);
				$("#active-song source").attr("src", songs.src0);
				$("#play-pause img").css("display", "block");
				$("#play-pause").css("backgroundColor", "white");
				$("#active-song")[0].load();
				$("#active-song")[0].play();
				songs.playing = 1;
			}
		})
$("#backward").click( function(){
	$(songs.currsong).parent().removeClass("active");
	songs.currsong = songs.currsong.parent().prev().children("audio");
	$(songs.currsong).parent().addClass("active");
	if(songs.currsong.length != 0) {
		songs.songname = $(songs.currsong).parent().find(".beat-name span").text();
		songs.genre = $(songs.currsong).parent().find(".genre").text();
		songs.price = $(songs.currsong).parent().find(".price-range").text();
		songs.prod = $(songs.currsong).parent().find(".beat-name")[0].childNodes[4].nodeValue;

		songs.src0 = $( "source", ( $(songs.currsong) ) ).attr("src");
		$(".naming .track-name").text(songs.songname);
		$(".naming .producer-name").text(songs.prod);
		$(".naming .genre-name").text(songs.genre);
		$(".pricing .numerical-value").text(songs.price);
		$("#active-song source").attr("src", songs.src0);
		$("#play-pause img").css("display", "block");
		$("#play-pause").css("backgroundColor", "white");
		$("#active-song")[0].load();
		$("#active-song")[0].play();
		songs.playing = 1;
	}
	else {
		$(songs.currsong).parent().removeClass("active");
		songs.currsong = $(".beat-list audio").last();
		$(songs.currsong).parent().addClass("active");
		songs.songname = $(songs.currsong).parent().find(".beat-name span").text();
		songs.genre = $(songs.currsong).parent().find(".genre").text();
		songs.price = $(songs.currsong).parent().find(".price-range").text();
		songs.prod = $(songs.currsong).parent().find(".beat-name")[0].childNodes[4].nodeValue;

		songs.src0 = $( "source", ( $(songs.currsong) ) ).attr("src");
		$(".naming .track-name").text(songs.songname);
		$(".naming .producer-name").text(songs.prod);
		$(".naming .genre-name").text(songs.genre);
		$(".pricing .numerical-value").text(songs.price);
		$("#play-pause img").css("display", "block");
		$("#play-pause").css("backgroundColor", "white");
		$("#active-song source").attr("src", songs.src0) ;
		$("#active-song")[0].load();
		$("#active-song")[0].play();
		songs.playing = 1;
	}
})

$("#shuffle").click( function() {
	do {
		songs.nthsong = Math.floor( (Math.random() * $("audio").length)  );
	}
	while (songs.nthsong == 0);
	$(songs.currsong).parent().removeClass("active");
	songs.currsong = $("audio").eq(songs.nthsong);
	$(songs.currsong).parent().addClass("active");
	
	songs.songname = $(songs.currsong).parent().find(".beat-name span").text();
	songs.genre = $(songs.currsong).parent().find(".genre").text();
	songs.price = $(songs.currsong).parent().find(".price-range").text();
	songs.prod = $(songs.currsong).parent().find(".beat-name")[0].childNodes[4].nodeValue;

	songs.src0 = $( "source", ( $(songs.currsong) ) ).attr("src");
	$(".naming .track-name").text(songs.songname);
	$(".naming .producer-name").text(songs.prod);
	$(".naming .genre-name").text(songs.genre);
	$(".pricing .numerical-value").text(songs.price);
	$("#active-song source").attr("src", songs.src0);
	$("#play-pause img").css("display", "block");
	$("#play-pause").css("backgroundColor", "white");
	$("#active-song")[0].load();
	$("#active-song")[0].play();
	songs.playing = 1;

	$(".beat-list .scroller").animate({ 
		scrollTop: $(songs.currsong).parent().position().top 
	}, 500);
})

$("#replay").click(function(){
	$("#active-song")[0].currentTime = 0;
	$("#active-song")[0].play();
	songs.playing = 1;
	$("#play-pause img").css("display", "block");
	$("#play-pause").css("backgroundColor", "white");


})

$("#active-song")[0].addEventListener('loadedmetadata', function() {

	$(".beat-list .scroller").animate({ 
		scrollTop: $(songs.currsong).parent().position().top 
	}, 500);
	setsongduration();
	$("#active-song")[0].addEventListener('progress', function() {
		songs.duration = $("#active-song")[0].duration ;
		var buff786 =  $("#active-song")[0].buffered.end(0);		
		var percentbuffered = (buff786/songs.duration) * 100;
		$(".song-progress .current-progress").css("width", percentbuffered + "%");
	});
});



songs.clickedM = 0;
function songmove(Dmove2) {		
	if(songs.clickedM == 1) {
		if (Dmove2.clientX <= $(".song-progress").offset().left) {
			$(".song-progress .current-position")[0].style.left = "0px";				
		}
		else if( Dmove2.clientX >= ($(".song-progress").outerWidth() + $(".song-progress").offset().left) -14) {
			$(".song-progress .current-position")[0].style.left = ( $(".song-progress").outerWidth() - 14) + "px";				
		}
		else {
			$(".song-progress .current-position")[0].style.left = (Dmove2.clientX - $(".song-progress").offset().left ) + "px";				
		}
	}		
}

function songup(e24) {		
	songs.clickedM = 0;	
	$("body")[0].removeEventListener("mousemove",  songmove);
	$("body")[0].removeEventListener("mouseup",  songup);
}

$(".song-progress .current-position")[0].addEventListener("mousedown", function songdown(down2) {
	songs.clickedM = 1;
	down2.preventDefault();
	$("body")[0].addEventListener( "mousemove", songmove);
	$("body")[0].addEventListener("mouseup", songup);
});



function songtouchmove(Dmove3) {
	Dmove3.preventDefault();
	if(songs.clickedM == 1) {
		if (Dmove3.touches[0].clientX <= $(".song-progress").offset().left) {
			$(".song-progress .current-position")[0].style.left = "0px";				
		}
		else if( Dmove3.touches[0].clientX >= ($(".song-progress").outerWidth() + $(".song-progress").offset().left) - 14) {
			$(".song-progress .current-position")[0].style.left = ( $(".song-progress").outerWidth() - 14) + "px";	
		}
		else {
			$(".song-progress .current-position")[0].style.left = (Dmove3.touches[0].clientX - $(".song-progress").offset().left ) + "px";				
		}
	}		
}

function songtouchend(e23) {		
	songs.clickedM = 0;	
	$("body")[0].removeEventListener("mousemove",  songtouchmove);
	$("body")[0].removeEventListener("mouseup",  songtouchend);
}

$(".song-progress .current-position")[0].addEventListener("touchstart", function(down3) {
	down3.preventDefault();
	songs.clickedM = 1;

	$("body")[0].addEventListener( "touchmove", songtouchmove);
	$("body")[0].addEventListener("touchend",  songtouchend);
});

/* song player jquery finishes */



/* volume button starts here */
songs.clickedV = 0;
var vol = $(".volume-circle")[0];
vol.mycenter = $(".mp3-player").offset().left + 45;


function volmove(Dmove5) {		
	if(songs.clickedV == 1) {
		if (Dmove5.clientX <= $(".mp3-player").offset().left + 9) {
			$(".volume-circle")[0].style.left = "25px";	
			$(".volume-circle")[0].style.top = "24px";			
		}
		else if( Dmove5.clientX >= (57 +  $(".mp3-player").offset().left + 9) ){
			$(".volume-circle")[0].style.left = ( 57 + 25 + "px" );	
			$(".volume-circle")[0].style.top = "24px";				
		}
		else {
			$(".volume-circle")[0].style.left =  (Dmove5.clientX - ($(".mp3-player").offset().left + 9) + 25) +"px";
			vol.mypos = $(".volume-circle").offset().left + 6;
			vol.myY = (vol.mycenter - vol.mypos);
			vol.myX = Math.sqrt( (1000 - Math.pow(vol.myY, 2)) );
			$(".volume-circle")[0].style.top = 38.77 - vol.myX + "px";				
		}
	}		
}

function volup(e25) {		
	songs.clickedV = 0;	
	$("body")[0].removeEventListener("mousemove",  volmove);
	$("body")[0].removeEventListener("mouseup",  volup);
}

$(".volume-circle")[0].addEventListener("mousedown", function voldown(down5) {
	
	songs.clickedV = 1;
	down5.preventDefault();
	$("body")[0].addEventListener( "mousemove", volmove);
	$("body")[0].addEventListener("mouseup", volup);
});



/* volume button finishes here */