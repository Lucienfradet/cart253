/**
More Experiments - Week 3
Speed and acceleration! ...and intermediate drawing!

Lucien Cusson-Fradet
*/

"use strict";

//3D shit!

// Angles of rotation for our shape
let angleX = 0;
let angleY = 0;

function setup() {
  // Using WEBGL in createCanvas to specify 3D graphics
  createCanvas(500, 500, WEBGL);
}

function draw() {
  background(0);

  // Our shape
  push();
  // Translate to the center (not really needed, but just for completeness)
  translate(0, 0, 0);
  // Rotate AROUND the x axis
  rotateX(angleX);
  // Rotate AROUND the y axis
  rotateY(angleY);
  // Looks nicer
  noStroke();
  // Our central cube is white
  fill(255);
  box(100);
  // A red bar passing through the box
  fill(255, 0, 0);
  box(200, 25, 25);
  // A green bar passing through the box
  fill(0, 255, 0);
  box(25, 200, 25);
  // A blue bar passing through the box
  fill(0, 0, 255);
  box(25, 25, 200);
  // Note how the entire shape rotates because the rotateX() and rotateY() are applied to everything
  // afterwards until the pop() below here
  pop();

  // Increase the angles to rotate over time
  angleX = angleX + 0.01;
  angleY = angleY + 0.05;
}


/**
let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  ax: 0, // NEW: acceleration in x
  ay: 0, // NEW: acceleration in y
  maxSpeed: 5, // RENAMED: to reflect a maximum speed
  acceleration: 0.1 // NEW: how much the circle can accelerate per frame
}

let angle = 0;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(backgroundShade);

  push();
  rectMode(CENTER);
  translate(250,250);
  rotate(angle); // Rotate the following shape by PI/4 radians (45 degrees)
  fill(255, 0, 0);
  rect(0, 0, 100, 100);
  pop();

  angle += 0.05;


  // If the mouse x position is GREATER than the circle x position, it must be to the RIGHT of the circle
  if (mouseX > circle.x) {
    // So set the circle's x acceleration to positive to start moving it right
    circle.ax = circle.acceleration;
  }
  // Or if the mouse x position is LESS than the circle x position, it must be to the LEFT of the circle
  else if (mouseX < circle.x) {
    // So set the circle's x acceleration to negative to start it moving left
    circle.ax = -circle.acceleration;
  }

  // If the mouse position is GREATER than the circle y position, it must be BELOW the circle
  if (mouseY > circle.y) {
    // So set the circle's y acceleration to positive start it moving down
    circle.ay = circle.acceleration;
  }
  // Or if the mouse y position is LESS than the circle y position, it must be ABOVE the circle
  else if (mouseY < circle.y) {
    // So set the circle's y acceleration to negative start it moving up
    circle.ay = -circle.acceleration;
  }

  // Update the circle's current velocity based on its acceleration!
  // Note that we also want to CONSTRAIN the velocity to not exceed the maximum speed
  circle.vx = circle.vx + circle.ax;
  circle.vx = constrain(circle.vx, -circle.maxSpeed, circle.maxSpeed);

  circle.vy = circle.vy + circle.ay;
  circle.vy = constrain(circle.vy, -circle.maxSpeed, circle.maxSpeed);

  // Then we actually APPLY these changes to `vx` and `vy` to the circle's position
  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  // And draw the ellipse at its new position
  ellipse(circle.x, circle.y, circle.size);
}
*/
