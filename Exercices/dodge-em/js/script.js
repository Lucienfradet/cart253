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
  x: undefined,
  y: undefined,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  maxSpeed: 5,
  acceleration: 0.01,
  size: 50
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
  redGem.x = width/2;
  redGem.y = 100;

}


/**
Description of draw()
*/
function draw() {
  background(0);
  //Move the mouseX and mouseY position to fit in the 3D envirement
  let souris = {
    x: mouseX - width/2,
    y: mouseY - height/2
  }


  //Check where the gem is compared to the mouse
  if (mouseX > redGem.x) {
    redGem.ax += redGem.acceleration;
  }
  else if (mouseX < redGem.x) {
    redGem.ax += -redGem.acceleration;
  }

  if (mouseY > redGem.y) {
    redGem.ay += redGem.acceleration;
  }
  else if (mouseY < redGem.y) {
    redGem.ay += -redGem.acceleration;
  }

  //update the speed of the gem
  redGem.vx += redGem.ax;
  redGem.vx = constrain(redGem.ax, -redGem.maxSpeed, redGem.maxSpeed);

  redGem.vy += redGem.ay;
  redGem.vy = constrain(redGem.ay, -redGem.maxSpeed, redGem.maxSpeed);

  //Change the position of the gem
  redGem.x += redGem.vx;
  redGem.y += redGem.vy;


  push();
  noStroke();
  scale(0.92,1);
  pointLight(250, 250, 250, souris.x, souris.y, 500);
  ambientLight(75);
  fill(240,150,150);

  translate(redGem.x - width/2, redGem.y - height/2);
  rotateY(millis() / 1000);

  sphere(redGem.size, redGem.detailX, redGem.detailY);
  pop();

  console.log(`mouseX: ${mouseX}`);
  console.log(`redGem.x: ${redGem.x}`);
}
