/**
Moving picture activity!
Lucien Cusson-Fradet
*/

"use strict";

let circleRight = {
  x:width,
  y:height/2,
  size:15,
  speed:2,
  alpha:200
}

let circleLeft = {
  x:0,
  y:height/2,
  size:40,
  speed:2,
  alpha:80
}

let backgroundColor = 0;

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

  //Place the two circles properly
  circleRight.x =+ circleRight.size/2;
  circleLeft.x =- circleLeft.size/2;
}


/**
Description of draw()
*/
function draw() {
  background(backgroundColor,0,0);
  backgroundColor += 0.1;

  noStroke();

  fill(0,0,0,circleRight.alpha);
  ellipse(circelRight.x, cricleRight.y, circelRight.size);
  fill(0,0,0,circleLeft.alpha);
  ellipse(circleLeft.x, circleLeft.y, circleLeft.size);

}
