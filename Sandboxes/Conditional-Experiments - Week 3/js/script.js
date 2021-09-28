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

  if (mouseX < width/2) {
    fill(255, 0, 0);
  }
  
  circle.x = circle.x + circle.speed;
  ellipse(circle.x, circle.y, circle.size);
}
