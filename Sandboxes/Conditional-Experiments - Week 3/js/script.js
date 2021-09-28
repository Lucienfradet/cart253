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
let caterpillar = {
  x: 75,
  y: 75,
  totalSegments: 10,
  segmentSize: 50,
  segmentSpacing: 40
}

const STARS_NUM = 200;

// Our white circle
let circle2 = {
  x: undefined, // We don't know x yet because we set it randomly
  y: undefined, // We don't know y yet because we set it randomly
  size: 100
};

// The danger zone we'd like to avoid
let dangerZone = {
  x: 250,
  y: 250,
  size: 150
}

let lightIsOn = false;

let dragger = {
  x: 250,
  y: 250,
  size: 50,
  // Because it changes size, let's set a minimum and maximum size
  minSize: 50,
  maxSize: 400,
  fill: 0,
  // We need to keep track of whether the circle is being dragged or not
  // so we know whether to move it with the mouse position
  dragging: false
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
  if (keyIsPressed) { //Don't actually need the "=== true" for this to work!
    background(150,150,25);
  }
  noStroke();

if (mouseIsPressed) {
    randomSeed();
  // Give our white circle a random position (once at the start of the program)
    circle2.x = random(0, width);
    circle2.y = random(0, height);
    // Calculate the distance from our circle to the danger zone...
    let d = dist(circle2.x, circle2.y, dangerZone.x, dangerZone.y);
  // Check if our white circle overlaps the danger zone...
    while (d < circle2.size / 2 + dangerZone.size / 2) {
    // If it does, try a different random position!
      circle2.x = random(0, width);
      circle2.y = random(0, height);
    // Recalculate the distance for the next time through the loop
      d = dist(circle2.x, circle2.y, dangerZone.x, dangerZone.y);
    }
  }


push();
// Draw the danger zone!
  noFill();
  stroke(255, 0, 0);
  ellipse(dangerZone.x, dangerZone.y, dangerZone.size);

  // Draw the white ellipse
  fill(255);
  noStroke();
  ellipse(circle2.x, circle2.y, circle2.size);

pop();


push();
  stroke(255);
  randomSeed(0);
  for (let i = 0; i < STARS_NUM; i++) {
    let x = random(0, width);
    let y = random(0, height);
    point(x, y);
  }
pop();

//Caterpillar THING!
  push();
    for (let i = 0; i < caterpillar.totalSegments; i++) {
      ellipse(caterpillar.x + i * caterpillar.segmentSpacing, caterpillar.y, caterpillar.segmentSize);
    }

/*
    let segmentsDrawn = 0;

    while (segmentsDrawn < caterpillar.totalSegments) {
        ellipse(x, caterpillar.y, caterpillar.segmentSize);
        x += caterpillar.segmentSpacing;
        segmentsDrawn++;
    }
*/
  pop();


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

  circle.x = circle.x + circle.speed;
  ellipse(circle.x, circle.y, circle.size);

  if (backgroundShade === 0 || backgroundShade === 255) {
    circle.size *= 2;
  }
  if (circle.size > 500) {circle.size = 100;}

  if (lightIsOn) {
    fill("#fffe00");
    ellipse (width/2, height/2, 300, 300);
  }
  ellipse(dragger.x, dragger.y, dragger.size);
}

function mousePressed() {
  lightIsOn = !lightIsOn;

  let d = dist(mouseX, mouseY, dragger.x, dragger.y);
  // If the distance is less that the circle's radius, we know the mouse was
  // inside the circle when pressed
  if (d < dragger.size / 2) {
    // So we can now drag the circle
    dragger.dragging = true;
  }
}

function mouseReleased() {
  // If the mouse is released, we should stop dragging the circle
  dragger.dragging = false;
}

function mouseDragged() {
  // When the mouse is dragged (with the mouse button down), we check if the circle
  // is being dragged
  if (dragger.dragging) {
    // If it is, we move it to the mouse position
    dragger.x = mouseX;
    dragger.y = mouseY;
  }
}

function mouseWheel(event) {
  // When the mouse wheel (or touchpad) is scrolled
  // event.delta contains the distance (in pixels) it scrolled
  // So we can add this to the size of the circle
  dragger.size += event.delta;
  // And constrain the size to stay within the minimum and maximum
  dragger.size = constrain(dragger.size, dragger.minSize, dragger.maxSize);
}
