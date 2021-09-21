/**
Moving picture activity!
Lucien Cusson-Fradet
*/

"use strict";

let canvasW = 500;
let canvasH = 500;
let couleurFond = 0;

let circleRight = {
  x:canvasW,
  y:canvasH/2,
  size:15,
  speed:-1,
  oppacity:200
}

let circleLeft = {
  x:0,
  y:canvasH/2,
  size:40,
  speed:1,
  oppacity:80
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
  createCanvas(canvasW, canvasH);
  background(couleurFond);




  //Place the two circles properly
  circleRight.x += circleRight.size/2;
  circleLeft.x -= circleLeft.size/2;
}


/**
Description of draw()
*/
function draw() {
  couleurFond += 0.5;
  background(couleurFond, 0, 0);
  noStroke();


  fill(0,0,0,circleRight.oppacity);
  ellipse(circleRight.x, circleRight.y, circleRight.size);
  fill(0,0,0,circleLeft.oppacity);
  ellipse(circleLeft.x, circleLeft.y, circleLeft.size);

  circleLeft.size += 0.5;
  circleLeft.x += circleLeft.speed;
  circleLeft.x = constrain(circleLeft.x, 0 - circleLeft.size/2, width/2);

  circleRight.size += 0.5;
  circleRight.x += circleRight.speed;
  circleRight.x = constrain(circleRight.x, width/2, width + circleRight.size/2);

  //console.log("VARIABLE SHITHEAD: "backgroundColor);
}
