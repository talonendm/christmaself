var clicks = 0;
var timerValue = 0;
var value = 0;
var endclicks = 0;
var doublec = 0;
var movec = 0;
var ptimer;
var clicked = false, clickTimeout = 300;
var clicks2 = 0;
var doublec2 = 0;
var soundrestarted = 0;

var mic;
var cnv;

var sx;
var sy;
var sz;



let img1, img2;
function preload() {
	img1 = loadImage('pics/sx/s1.png');
	img2 = loadImage('pics/sx/s2.png');
}


function setup() {
	cnv = createCanvas(windowWidth, windowHeight);
	// cnv = createCanvas(windowHeight - 20, windowHeight - 20);
    centerCanvas();
	colorMode(HSB, 360, 100, 100);
	rectMode(CENTER);
	setInterval(timeIt, 100); // https://editor.p5js.org/denaplesk2/sketches/ryIBFP_lG

	// mic = new p5.AudioIn();
	// mic.start();
	imageMode(CENTER);
	noStroke();

	sx = windowWidth / 2;
	sy = windowHeight / 2;
	sz = sy / 2 + 10; // use 0 as the value for the wide or high parameter. For instance, to make the width of an image 150 pixels, and change the height using the same proportion, use resize(150, 0).

}

// auto indect in vscode: shift-alt-f
function draw() {
	background(value, 10, 10);
	rectMode(CENTER);
	fill(200, 60, 90);
	rect(width * 0.5, height * 0.5, 280, 72, 7);
	fill(0, 0, 100);
	textSize(27);
	textAlign(CENTER, CENTER);
	textFont('Avenir');
	let permin = round(clicks * 600 / timerValue);
	text('click: ' + clicks + " OR " + clicks2 + "TIME" + nfc(timerValue / 10, 1) + "\nperMin:" + permin, width * 0.5, height * 0.5 + 2);
	text('touch move: ' + movec, width * 0.5, height * 0.35 + 2);
	text('double: ' + doublec + " or " + doublec2, width * 0.5, height * 0.65 + 2);
	text('end: ' + endclicks, width * 0.5, height * 0.8 + 2);

	// if (getAudioContext().state !== 'running') {
	// 	getAudioContext().resume();
	// 	mic = new p5.AudioIn();
	// 	mic.start();
	// 	soundrestarted = soundrestarted + 1;
	// }

	// if (getAudioContext().state == 'running') {
	//ncaught TypeError: Cannot read property '0' of undefined
	//at RingBuffer.push (9a14b93c-e7ee-48d7-83a9-b9af475ae11f:81)
	//at AudioWorkletProcessor.process (9a14b93c-e7ee-48d7-83a9-b9af47

	// https://js6450.github.io/sound-p5-part1.html
	// 	var level = mic.getLevel();
	// 	fill(255, 0, 0, 140);
	// 	if (soundrestarted > 0) {
	// 		fill(0, 255, 0, 140);
	// 	}
	// 	ellipse(width / 2, height / 2, level * 5000, level * 5000)


	// }
	// text('level: ' + level, width * 0.2, height * 0.7 + 2);

	if (sx % 2 == 0)
		image(img1, sx,sy); //, sy, 0, sz);
	else
		image(img2, sx,sy); //, sy, 0, sz);


}

// TOUCH ------------------------------------------------------------
// full screen: https://editor.p5js.org/slow_izzm/sketches/lgzf4tJk6
function touchStarted() {
	let fs = fullscreen();
	if (!fs) {
		fullscreen(true);
	}
	value = 0;
	if (ptimer == timerValue) {
		// double
		doublec = doublec + 1; //# // within selected time 0.1sec
	} else {
		clicks = clicks + 1;
	}
	// https://stackoverflow.com/questions/51144762/p5-js-mousepressed-works-but-doublepressed-doesnot
	ptimer = timerValue;
	if (!clicked) { //# https://stackoverflow.com/questions/51144762/p5-js-mousepressed-works-but-doublepressed-doesnot
		clicked = true;
		setTimeout(function () {
			if (clicked) {
				console.log("single click");
				clicked = false;
				//single ClickStuff
				clicks2 = clicks2 + 1;
			}
		}, clickTimeout);
	} else {
		clicked = false;
		console.log("double click");
		//double click Stuff
		doublec2 = doublec2 + 1;
	}
}

function touchEnded() {
	value = 50;
	// Clean code and post answer here: https://github.com/processing/p5.js/issues/1815

	// without this double clicks:
	if (event.type != 'mouseup') { // nicolasbaez commented 20 days ago at https://github.com/processing/p5.js/issues/1815
		//your code :)

		endclicks = endclicks + 1;
	}


}
// TOUCH MOVED ------------------------------------------------------
function touchMoved() {
	movec = movec + 1;


	if (mouseX > sx)
		sx = sx + 1;
	else
		sx = sx - 1;



	if (mouseY > sy) {
		sy = sy + 1;
	}

	else {
		sy = sy - 1;
	}


	sz = sy / 2 + 10;
	//img1.resize(0, sz);
	//img2.resize(0, sz);

}

// this function fires with any double click anywhere
//function doubleClicked() {
//	doublec = doublec + 1;
//}



// ....................................................................
// Errors messages (CTRL SHIFT i) Chrome Developer Tools:
// The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. https://goo.gl/7K7WLu
// DevTools failed to load SourceMap: Could not load content for https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/addons/p5.sound.min.js.map: HTTP error: status code 404, net::ERR_HTTP_RESPONSE_CODE_FAILURE
function touchStarted() {
	// if (getAudioContext().state !== 'running') {
	// 	getAudioContext().resume();
	// 	mic = new p5.AudioIn();
	// 	mic.start();
	// 	soundrestarted = soundrestarted + 1;
	// }
}



function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	// cnv.position(x, y);
	cnv.position(0, 0);
	cnv.style('z-index', '-1'); // https://www.youtube.com/watch?v=OIfEHD3KqCg
}

/* full screening will change the size of the canvas */
function windowResized() {
	// resizeCanvas(windowWidth, windowHeight);
	// https://github.com/processing/p5.js/wiki/Positioning-your-canvas
	centerCanvas();
}

  

function timeIt() {

	timerValue++;

}
/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling
 * the page.
 */
document.ontouchmove = function (event) {
	event.preventDefault();
};