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

let vinylLeft;
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

  vinylLeft = new Vinyl(canvasWidth/4, canvasHeight/2, `capote.mp3`);
  vinylRight = new Vinyl(canvasWidth/4 * 3, canvasHeight/2, `ahh-fresh.mp3`);
}


/**
Description of draw()
*/
function draw() {
  background(0);

  vinylLeft.rotate();
  vinylLeft.display();
  vinylLeft.musicPlaying();
  vinylRight.rotate();
  vinylRight.display();
  vinylRight.musicPlaying();
}

function mousePressed() {
  vinylLeft.mousePressed();
  vinylRight.mousePressed();
}

function mouseReleased() {
  vinylLeft.mouseReleased();
  vinylRight.mouseReleased();
}
