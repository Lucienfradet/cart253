/**
Experiments with States
Lucien Cusson-Fradet
*/

"use strict";

let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2,
}

/**
Description of preload
*/
function preload() {

}

function setup() {
  createCanvas(500, 500);
  circle.vx = circle.speed;
}

function draw() {
  background(0);

  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  ellipse(circle.x, circle.y, circle.size);
}
