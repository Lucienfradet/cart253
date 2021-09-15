/**
Experimenting with variables
Lucien Cusson-Fradet

*/

"use strict";

let backGroundShade = 0;
let fillColor
let circle = {
  x: 0,
  y: 250,
  size: 200,
  speed: 2
}

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
  createCanvas(500, 500);
  circle.x = 0 - circle.size/2;
}


/**
Description of draw()
*/
function draw() {

  background(backGroundShade);
  fillColor = map(mouseX, 0, width, 0, 255);

  fill(fillColor);
  ellipse(circle.x, circle.y, circle.size);
  circle.x += circle.speed;

  backGroundShade += 1;

  if (backGroundShade == 300) {
    backGroundShade = 0;
  }
  if (circle.x >= width + circle.size/2) {
    circle.x = 0 - circle.size/2;
    circle.speed = random(1, 5);
  }

console.log(`NEWWAY circle.x: ${circle.speed}`);
console.log("circle.x: " + circle.x);
}
