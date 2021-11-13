/**
Make some noise - exercice
Lucien Cusson-Fradet

Some kind of vinyl/scratching simulator.
White disc play songs when you click the small square underneath.
Pale grey ones play samples.

The movement of the visual discs can be controlled with the mouse.
It also controls the sound playback rate.
I tried programming it so it would follow the sound back and forth with the movements, but it doesn't really work as intended.
It is however possible to play with sounds in some interesting ways, mainly by doing small movements with the mouse.

Personal recommendation: Playing the two top vinyls, or the two others, together.

See README for song credits.

*/

"use strict";

let canvasWidth = 600;
let canvasHeight = 500;

let capote;
let ahFresh;
let organ;
let benefit;


let vinyl = [];

function preload() {
  capote = loadSound('assets/sounds/capote.mp3');
  ahFresh = loadSound('assets/sounds/ahh-fresh.mp3');
  organ = loadSound('assets/sounds/organ.wav');
  benefit = loadSound('assets/sounds/benefit.mp3');
}

/**
Canvas and create the array of vinyls (manually... yeah)
*/
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(0);

  vinyl[0] = new Vinyl(canvasWidth/4, canvasHeight/4 * 3, capote, 0.6, 255);
  vinyl[1] = new Vinyl(canvasWidth/4 * 3, canvasHeight/4 * 3, ahFresh, 0.6, 200);
  vinyl[2] = new Vinyl(canvasWidth/4, canvasHeight/4, organ, 5, 200);
  vinyl[3] = new Vinyl(canvasWidth/4 * 3, canvasHeight/4, benefit, 0.6, 255);
}


/**
Displays and controls basic vinyl functions
*/
function draw() {
  background(0);

  for (let i = 0; i < 4; i++) {
    vinyl[i].rotate();
    vinyl[i].display();
    vinyl[i].musicPlaying();
  }
}

function mousePressed() {
  for (let i = 0; i < 4; i++) {
    vinyl[i].mousePressed();
  }
}

function mouseReleased() {
  for (let i = 0; i < 4; i++) {
    vinyl[i].mouseReleased();
  }
}
