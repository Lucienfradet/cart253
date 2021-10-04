/**
Experiments with States (of animation?)
Lucien Cusson-Fradet
*/

//QUESTION!!! What's the difference between if, if else, if else, else AND if, if, if, if, else...???

"use strict";

let state = `title`; //Start the program in the Title state

let typing = ``; //Empty string for typing;

let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2,
}
let titleString = "Life: A Metaphor";
let endingString = "Ah, mortality.";

/**
Description of preload
*/
function preload() {

}

function setup() {
  createCanvas(500, 500);
  circle.vx = circle.speed;
  circle.x -= circle.size/2

  //// Text Setting
  textSize(32);
  textAlign(CENTER);
}

function draw() {
  background(0);
  push();
  textSize(24);
  fill(255);
  text(typing, width/2, height/4);
  pop();

/* Regular way of writing shit like that.
  if (state === `title`) {
    title();
  }
  else if (state === `animation`) {
    animation();
  }
  else if (state === `ending`) {
    ending();
  }
}
*/

//Better WAY!

  switch (state) {
    case `title` :
      title();
      break;

    case `animation` :
      animation();
      break;

    case `ending` :
      ending();
      break;
  }
}

function title() {
  // Title
  fill(255);
  text(titleString, width / 2, height / 2);
}

function animation() {
  circle.x += circle.vx;
  circle.y += circle.vy;

  ellipse(circle.x, circle.y, circle.size);

  if (circle.x > width + circle.size/2) {
    state = `ending`;
    circle.x = 0 - circle.size/2;
  }
}

function ending() {
  // Ending
  fill(255, 0, 0);
  text(endingString, width / 2, height / 2)
}

function keyPressed() {
  if (state === `title`) {
    state = `animation`;
  }
   else if (state === `ending`) {
    state = `title`;
  }

  if (keyCode === 8) {
    typing = ``;
  }
}

function keyTyped() {
    typing += key;
}
