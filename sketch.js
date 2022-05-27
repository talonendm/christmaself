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
var angle;
var moving_count = 0;

var friction = 0.97;
var speedthreshold = 0.02;

var mic;
var cnv;


var right_answer;
var points;
var health;
let max_health = 1000;


var alternative_formulas;
let alternative_formulas_max = 8;

var sx;
var sy;
var sz;

var acc_run = 3;
var acc_walk = 0.1;


var vx,vy;
var showpic;
var newgamecounter;


let debuggaus = false; // true;

let dudes = [];
let laskut = [];


let img1, img2;
function preload() {

	var prutus = true;

	if (prutus) {
		img1 = loadImage('pics/hahmot/prutus1.png');
		img2 = loadImage('pics/hahmot/prutus2.png');
	} else {
		img1 = loadImage('pics/sx/s1.png');
		img2 = loadImage('pics/sx/s2.png');
	}

	
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

	nollaus();
	

	

	
	

}



function nollaus() {

	sx = windowWidth / 2;
	sy = windowHeight / 2;
	sz = sy / 2 + 10; // use 0 as the value for the wide or high parameter. For instance, to make the width of an image 150 pixels, and change the height using the same proportion, use resize(150, 0).

	vx = 0;
	vy = 0;
	showpic = 0;

	dudes[0] = new Dude(sx, sy, vx, vy);

	newgamecounter = 0;

	health = max_health;
	points = 0;
	alternative_formulas = 2;

	newFormulas(alternative_formulas);


}


function newFormulas(maara) {


	for (var i = laskut.length - 1; i >= 0; i--) {
		laskut.pop();
	}


	var r1 = 0;
	var r2 = 0;

	var okei;
	let okei_threshold = 240;
	for (var i = 0; i < maara; i ++) {
		okei = true;

		while (okei) {
			r1 = round(random(2, 9));
			r2 = round(random(2, 9));
			laskut[i] = new Matikka(r1, r2, round(random(okei_threshold/3, windowWidth - okei_threshold/3)),round(random(okei_threshold/3, windowHeight - okei_threshold/3)), r1*r2);
			okei = laskut[i].isOver(dudes[0].x, dudes[0].y, okei_threshold);

			// check: that no overlapping with math
			if (i>0) {
				for (var j = 0; j < i; j ++) {
					if (laskut[i].isOver(laskut[j].x, laskut[j].y, okei_threshold)) {
						okei = true;
					}
				}
			} else {
				right_answer = laskut[i].score;
			}
			

		}
	}

}



// auto indect in vscode: shift-alt-f
function draw() {
	background(value, 10, 10);
	
	//rectMode(CENTER);
	//fill(200, 60, 90);
	//rect(width * 0.5, height * 0.5, 280, 72, 7);

	health = health - 1;
	
	if (health<0) {
		//health
		newFormulas(0);
		health = 0;

	}



	if (health == 0) {


		if (dudes[0].y> height-100) {
			newgamecounter = newgamecounter + 1;
		}

		if (newgamecounter>100) nollaus();

	}

	showtext();

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


	for (var i = dudes.length - 1; i >= 0; i--) {
		dudes[i].move(showpic);
	}



	// if (sx % 2 == 0)
    

	for (var i = dudes.length - 1; i >= 0; i--) {
		if (dudes[i].speed > speedthreshold) {
			
			dudes[i].moving_count = dudes[i].moving_count + 1;

			if (dudes[i].speed > 2) {
				showpic = round(dudes[i].moving_count / 10) % 2;
			}


		}
		dudes[i].show(showpic);
		dudes[i].speed = dudes[i].speed * friction;
		if (dudes[i].speed < speedthreshold) dudes[i].speed = 0;
	}


	for (var i = laskut.length - 1; i >= 0; i--) {
		laskut[i].show();
		laskut[i].overCheck(dudes[0].x, dudes[0].y);
	}

	if (debuggaus) {
    // https://discourse.processing.org/t/how-do-i-use-the-x-and-y-values-from-an-object-from-touches-in-p5js/31766/2
	// check touches.length; draw line if there are at least 2 points
	if (touches.length >= 1) {


		stroke(0,0,255);
		strokeWeight(3);

		if (touches.length >= 2) {
			
			push();
			line(touches[0].x, touches[0].y, touches[1].x, touches[1].y);
			pop();
		}

		for (var i = 0; i < touches.length; i++) {
			fill(255,255,0);
			textSize(30);
			text(i + 1, touches[i].x, touches[i].y);
		}


		noStroke();

	}
	}

	
	

}



function showtext() {




	if (debuggaus) {

	
	noStroke();
	let ystep = 15;
	fill(0, 0, 100);
	textSize(ystep-3);
	textAlign(LEFT, TOP);
	textFont('Avenir');
	let permin = round(clicks * 600 / timerValue);
	text('click: ' + clicks + " OR " + clicks2 + "TIME" + nfc(timerValue / 10, 1) + "\nperMin:" + permin, 5, ystep);
	text('touch move: ' + movec, 5, ystep * 3);
	text('double: ' + doublec + " or " + doublec2, 5, ystep * 4);
	text('end: ' + endclicks, 5, ystep * 5);
	text('angle:' + round(degrees(angle)), 5, 6*ystep); // https://p5js.org/reference/#/p5.Vector/heading
	text('touches.length: ' + touches.length, 5, ystep * 7);
	text('POINTS: ' + points, 5, ystep * 8);
	text('HEALTH: ' + health, 5, ystep * 9);
	text('newgamecounter: ' + newgamecounter, 5, ystep * 10);
	

	for (var i = dudes.length - 1; i >= 0; i--) {
		text('Speed100:' + round(100*dudes[0].speed),  5+ 50 * i, 13*ystep);
		text('this.brake_coefficient:' + dudes[0].brake_coefficient,  5+ 50 * i, 14*ystep);
		
	}


	}


	if (health<200) {
		fill('red');
	} else if (health<500) {
		fill('brown');
	} else {
		fill('green');
	}
	
	noStroke();
	var health_bar = map(health, 0, max_health, 0, windowWidth);
	rectMode(CORNERS);
	rect(0,0,health_bar,10);

	if (health>0) {
		stroke('green');
		fill('darkgreen');
		textAlign(RIGHT, TOP);
		textSize(130);
		text('=' + right_answer, width-5, 5);
	} else {
		stroke('green');
		fill('darkgreen');
		textAlign(CENTER, CENTER);
		textSize(70);
		text('SCORE: ' + points, width/2, height/2);

		textAlign(CENTER, BOTTOM);
		textSize(30 + round(sin(frameCount/18)*6));
		text('NEW GAME? ' + 'come here and wait', width/2, height-30);
	}
	



}





// https://p5js.org/reference/#/p5.Vector/angleBetween
// draw an arrow for a vector at a given base position
function drawArrow(base, vec, myColor) {
	push();
	stroke(myColor);
	strokeWeight(3);
	fill(myColor);
	translate(base.x, base.y);
	line(0, 0, vec.x, vec.y);
	rotate(vec.heading());
	let arrowSize = 7;
	translate(vec.mag() - arrowSize, 0);
	triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
	pop();
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




class Matikka {
	constructor(a_, b_, x_, y_, score_) {
		this.x = x_;
		this.y = y_;
		this.score = score_;
		this.a = a_;
		this.b = b_;
		this.dist_threshold = 40;
		this.color = 'yellow';
		this.colorback = 'blue';
		this.size = 28;
	}

	show() {
		stroke(this.colorback);
		fill(this.color);
		strokeWeight(1);
		textAlign(CENTER,CENTER);
		
		if (this.color == 'red') {
			textSize(this.size - 10);
		} else {
			textSize(this.size + round(sin(frameCount/18)*6));
		}
		text(this.a + "*" + this.b, this.x, this.y);
		
	}

	overCheck(dx, dy) {

		// var dist2number = dist(dx, dy, this.x, this.y);
		if (this.isOver(dx, dy, this.dist_threshold)) {
		//if (dist2number < this.dist_threshold) {
			text("!", width/2, height/2);
			
			
			if (right_answer == this.score) {
				this.color = 'green';
				if (alternative_formulas<alternative_formulas_max) alternative_formulas = alternative_formulas + 1;
				newFormulas(alternative_formulas);
				points = points + 100;
				health = health + 100;
				
			} else {

				if (this.color == 'red') {
					points = points - 1;
				} else {
					this.color = 'red';
					points = points - 20;

				}

				
				
			}
			


			

		}

	}

	isOver = function(dx, dy, threshold) {
		var dist2number = dist(dx,dy, this.x, this.y);
		if (dist2number < this.dist_threshold) {
			return(true);
		} else {
			return(false);
		}
		

	}

}


class Dude {
	constructor(x_, y_, vx_, vy_) {
		this.size = 150;
		this.points = 0;
		this.x = x_;
		this.y = y_;
		this.yscale = map(y_, 0, height, 0.4, 1);
		this.vx = vx_;
		this.vy = vy_;
		this.ve0 = createVector(x_, y_);
		this.ve1 = createVector(x_, 0);
		this.ve2 = createVector(x_, y_);
		this.angle = 0;
		this.angle_prev = 0;

		this.speedvector = createVector(vx_, vy_);
		this.speedvector_prev = createVector(vx_, vy_);

		this.speed = 0;
		this.moving_count = 0;
		this.brake_coefficient = 1;
	}

	show(pic_number) {

		// rotate(PI/180 * this.moving_count);
        push();

		

		translate(this.x, this.y);
		rotate(PI/180 * sin(this.moving_count/5)/30 * this.speed*20);


		if (this.vx>0) {
			scale(-1, 1);
		}

		
		scale(this.yscale, this.yscale);

		if (newgamecounter>0) {
			scale(newgamecounter/10 + 1, newgamecounter/10 + 1);
		}


		if (pic_number == 0)
			image(img1,0,0); // image(img1, this.x, this.y); //, sy, 0, sz);
		else
			image(img2,0,0); // image(img2, this.x, this.y); //, sy, 0, sz);

		
		//	drawArrow(this.ve0, this.ve2, 'blue');
        pop();
	}

	move() {

		//angle = tan((mouseY-this.y)/(mouseX-this.x) );

		
		// let v1 = createVector(this.x, 0);


		this.ve0 = createVector(this.x, this.y);

		//drawArrow(this.ve0, this.ve1, 'red');
	  
		this.ve2 = createVector(mouseX - this.x, mouseY - this.y);
		
	  
		//let angleBetween = ve1.angleBetween(v2);
		// https://www.youtube.com/watch?v=oXwCVDXS2Lg
		this.angle = this.ve2.heading();
		angle = this.angle;

		// if (mouseX != this.x) {

		if (this.speed>0) {
			this.brake_coefficient = cos(this.angle) * this.vx / this.speed + sin(this.angle) * this.vy / this.speed;
		} else {
			this.brake_coefficient = 1;
		}
		

		

		this.vx = this.speed * cos(this.angle);

		this.vy = this.speed * sin(this.angle);

        


		//} else {
		//	this.vx = 0;
		//	if (mouseY>this.y)
		//		this.vy = 1;
		//	else 
		//		this.vy = -1;
		//}
		


		this.speedvector = createVector(this.vx, this.vy);


		// let v1 = this.speedvector;
		let v2 = this.speedvector_prev;
		

		angleMode(DEGREES);

		let angleb = this.speedvector.angleBetween(v2);
		// angle is PI/2
		//print(angleb);

		// this.angle_prev = abs(v1.angleBetween(v2));

		if (angleb>120) {
			// this.vx = 0;
			// this.vy = 0;
			if (angleb>160) {
				this.speed = 0;
			} else {
				this.speed = this.speed * 0.5;
			}
			print("JARRU");
		}

		angleMode(RADIANS);

		// let angle = v1.angleBetween(v2);
		// this.angle_prev = 


	
		this.x = this.x + this.vx * this.yscale;
		this.y = this.y + this.vy * this.yscale;


		this.yscale = map(this.y, 0, height, 0.4, 1);

		this.speedvector_prev = this.speedvector;
		

		

	//sz = sy / 2 + 10;
	//img1.resize(0, sz);
	//img2.resize(0, sz);

	}

}

function touchEnded() {
	value = 50;
	// Clean code and post answer here: https://github.com/processing/p5.js/issues/1815

	// without this double clicks:
	if (event.type != 'mouseup') { // nicolasbaez commented 20 days ago at https://github.com/processing/p5.js/issues/1815
		//your code :)


        //GetDirection();

		endclicks = endclicks + 1;


		dudes[0].speed = dudes[0].speed + acc_run;

		// dudes[0].speed = dudes[0].speed * dudes[0].brake_coefficient;  // if opposite direction

	}


}
// TOUCH MOVED ------------------------------------------------------
function touchMoved() {
	movec = movec + 1;
   

	dudes[0].speed = dudes[0].speed + acc_walk;

	// dudes[0].speed = dudes[0].speed * dudes[0].brake_coefficient;  // if opposite direction

}

// this function fires with any double click anywhere
//function doubleClicked() {
//	doublec = doublec + 1;
//}



// ....................................................................
// Errors messages (CTRL SHIFT i) Chrome Developer Tools:
// The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. https://goo.gl/7K7WLu
// DevTools failed to load SourceMap: Could not load content for https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/addons/p5.sound.min.js.map: HTTP error: status code 404, net::ERR_HTTP_RESPONSE_CODE_FAILURE
// full screen: https://editor.p5js.org/slow_izzm/sketches/lgzf4tJk6
function touchStarted() {
	let fs = fullscreen();
	if (!fs) {
	  fullscreen(true);
	}
	// if (getAudioContext().state !== 'running') {
	// 	getAudioContext().resume();
	// 	mic = new p5.AudioIn();
	// 	mic.start();
	// 	soundrestarted = soundrestarted + 1;
	// }
}



function centerCanvas() {
	// var x = (windowWidth - width) / 2;
	// var y = (windowHeight - height) / 2;
	resizeCanvas(windowWidth, windowHeight);
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


function keyPressed(){
	text("here", random(width), random(height));
	// https://stackoverflow.com/questions/39730950/javascript-disable-space-scrolling
	return false;
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