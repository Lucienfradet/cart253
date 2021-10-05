/**
Experimenting and learning Functions!
Lucien Cusson-Fradet
*/

"use strict";

let circle = {
  x: 250,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0
}
let color = {
  r:undefined,
  g:undefined,
  b:undefined
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
  reset();
  randomColor();
  color.r = randomColor().r;
  color.g = randomColor().g;
  color.b = randomColor().b;
}


/**
Description of draw()
*/
function draw() {
  background(0);

  parallels({x: 0, y: 0, numLines: width / 2 + 5, lineThickness: 2, lineHeight: height, lineSpacing: 5});

  move();


  if (circleIsOffScreen()) {
    reset();
    randomColor();
    color.r = randomColor().r;
    color.g = randomColor().g;
    color.b = randomColor().b;
  }

  drawCircle();

  console.log (`color thing: ${color}`);

  textFont(`Yaldevi`);
  textAlign(CENTER, CENTER);
  let size = map(mouseX, 0, width, 12, 128);
  textSize(size);

  // Make the fill respond to the mouse
  let red = map(mouseX, 0, width, 100, 200);
  let green = map(mouseY, 0, height, 100, 200);
  let blue = map(mouseX + mouseY, 0, width + height, 100, 200);
  fill(red, green, blue);

  // Make the stroke color respond to the mouse
  let strokeShade = map(mouseX, 0, width, 0, 255);
  stroke(strokeShade);

  // Make the stroke weight respond to the mouse
  let weight = map(mouseY, 0, height, 0, 40);
  strokeWeight(weight);
  text(`Almost`, width/2, height/2);
}

function parallels({x, y, numLines, lineThickness, lineHeight, lineSpacing}) {
  for (let i = 0; i < numLines; i++) {
    noStroke();
    let lineFill = map(i, 0, numLines, 50, 255);
    fill(lineFill);
    rect(x, y, lineThickness, lineHeight);
    x += lineSpacing;
  }
}

function circleIsOffScreen() {
  let result = (circle.x < 0 - circle.size/2 || circle.x > width + circle.size/2 || circle.y < 0 - circle.size/2 || circle.y > height + circle.size/2);
  return result;
}

function move() {
  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;
}

function reset() {
  circle.x = 250;
  circle.y = 250;
  circle.vx = random(-10, 10);
  circle.vy = random(-10, 10);
}

function randomColor() {
  let result = {
    r: random(0,255),
    g: random(0, 255),
    b: random(0, 255)
  };
  return result;
}

function drawCircle() {
  fill(color.r, color.g, color.b);
  ellipse(circle.x, circle.y, circle.size);
}
