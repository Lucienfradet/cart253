/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/
let img;


"use strict";

/**
Description of preload
*/
function preload() {
  img = loadImage(`assets/images/clown.png`);
}


/**
Description of setup
*/
function setup() {
  createCanvas(500, 500);

}


/**
Description of draw()
*/
function draw() {
  background(0);
  image(img, 0, 0);
}
