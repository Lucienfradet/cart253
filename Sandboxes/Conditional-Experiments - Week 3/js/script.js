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
}

function mousePressed() {
  lightIsOn = !lightIsOn;
}
