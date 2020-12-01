var clicks = 0;
var timerValue = 0;
var value = 0;
var endclicks = 0;

function setup() { 
  createCanvas(windowWidth, windowHeight);
	colorMode(HSB,360,100,100);
	rectMode(CENTER);
	setInterval(timeIt, 100); // https://editor.p5js.org/denaplesk2/sketches/ryIBFP_lG
} 

function draw() { 
  background(value,10,10);
  rectMode(CENTER);
	fill(200,60,90);
  rect(width*0.5, height*0.5, 280, 72,7);
	fill(0,0,100);
	textSize(27);
	textAlign(CENTER,CENTER);
	textFont('Avenir');
	let permin = round(clicks * 600 / timerValue);
	text('click: ' + clicks + "TIME" + nfc(timerValue / 10,1) + "\nperMin:" + permin, width*0.5,height*0.5+2);
	text('end: ' + endclicks, width*0.5,height*0.8+2);
}


// full screen: https://editor.p5js.org/slow_izzm/sketches/lgzf4tJk6
function touchStarted () {
  let fs = fullscreen();
  if (!fs) {
    fullscreen(true);
  }
  
  clicks = clicks + 1;
  value = 0;
}

function touchEnded() { 
    value = 50; 
	endclicks = endclicks + 1;
} 


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function timeIt() {
  
    timerValue++;
  
}
/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling
 * the page.
 */
document.ontouchmove = function(event) {
    event.preventDefault();
};