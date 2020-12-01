var clicks = 0;

function setup() { 
  createCanvas(windowWidth, windowHeight);
	colorMode(HSB,360,100,100);
	rectMode(CENTER);
} 

function draw() { 
  background(0,10,10);
  rectMode(CENTER);
	fill(200,60,90);
  rect(width*0.5, height*0.5, 80, 42,7);
	fill(0,0,100);
	textSize(27);
	textAlign(CENTER,CENTER);
	textFont('Avenir');
	text('click: ' + clicks,width*0.5,height*0.5+2);
}


// full screen: https://editor.p5js.org/slow_izzm/sketches/lgzf4tJk6
function touchStarted () {
  let fs = fullscreen();
  if (!fs) {
    fullscreen(true);
  }
  
  clicks = clicks + 1;
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling
 * the page.
 */
document.ontouchmove = function(event) {
    event.preventDefault();
};