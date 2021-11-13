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

let vinyl;

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

  vinyl = new Vinyl();
}


/**
Description of draw()
*/
function draw() {
  background(0);

  vinyl.rotate();
  vinyl.display();
}

function mousePressed() {
  vinyl.mousePressed();
}

function mouseReleased() {
  vinyl.mouseReleased();
}
