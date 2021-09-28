/**
Testing things out with conditionnals!
Lucien Cusson-Fradet
*/

"use strict";

let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 100,
  speed: 5,
  fill: 255
}

/**
Description of setup
*/
function setup() {
  createCanvas(500,500);
}


/**
Description of draw()
*/
function draw() {
  background(backgroundShade);
  noStroke();
  backgroundShade += 0.5;

  if (backgroundShade === 255) {
    backgroundShade = 0;
  }

  if (circle.x > width + circle.size/2) {
    circle.speed = -circle.speed;
  }
  if (circle.x < 0 - circle.size/2) {
    circle.speed = -circle.speed;
  }

  fill(circle.fill);

  if (!(mouseX > width/3)) {
    fill(255, 0, 0);
  }
  else if (mouseX < 2 * width/3) {
    fill(0, 255, 0);
  }
  else {
    fill(0, 0, 255);
  }

  if (mouseX < width/3 && circle.x < width/3) {
    circle.y = 350;
  }
  else {circle.y = 250;}

  if (mouseIsPressed === true) { //When the mouse is pressed, it makes the circle look like litteral shit! I mean COME ON!
    fill(150,150,25);
  }

  if (keyIsPressed === true) {
    background(150,150,25);
  }

  circle.x = circle.x + circle.speed;
  ellipse(circle.x, circle.y, circle.size);

  if (backgroundShade === 0 || backgroundShade === 255) {
    circle.size *= 2;
  }
  if (circle.size > 500) {circle.size = 100;}
}
