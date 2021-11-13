/**
Make some noise - exercice
Lucien Cusson-Fradet

- Make a turning vinyl with the mouse
- drop a needle lol
- Make a sound play when the sound bar passes the needle and affect the rate based on the mouseSpeed?
- Add a second table with a god damn BANGER playing
- add more samples
- add buttons to swith between samples

*/

"use strict";

let canvasWidth = 600;
let canvasHeight = 500;

let vinyl = [];
let vinylRight;
const NUM_VINYL = 2;

let startingMouseX;
let startingMouseY;
let endingMouseX;
let endingMouseY;

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(0);



  vinyl[0] = new Vinyl(canvasWidth/4, canvasHeight/4 * 3, `capote.mp3`, 0.6, 255);
  vinyl[1] = new Vinyl(canvasWidth/4 * 3, canvasHeight/4 * 3, `ahh-fresh.mp3`, 0.6, 200);
  vinyl[2] = new Vinyl(canvasWidth/4, canvasHeight/4, `organ.wav`, 5, 200);
  vinyl[3] = new Vinyl(canvasWidth/4 * 3, canvasHeight/4, `benefit.mp3`, 0.6, 255);
}


/**
Description of draw()
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
