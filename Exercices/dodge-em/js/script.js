/**
Exercice 2: Dodge 'em!
Lucien Cusson-Fradet
*/

"use strict";
let canvasWidth = 500;
let canvasHeight = 800;

//redGem object
let redGem = {
  detailX: 7,
  detailY: 4,

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
  smooth();
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  background(0);
}


/**
Description of draw()
*/
function draw() {
  background(0);

  push();
  scale(0.92,1);
  pointLight(250, 250, 250, mouseX-width/2, mouseY-height/2, 500);
  ambientLight(75);
  rotateY(millis() / 1000);
  fill(240,150,150);
  noStroke();
  sphere(50, redGem.detailX, redGem.detailY);
  pop();
}
