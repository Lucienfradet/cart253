/**
Exercice 1 - I like to move it!
Lucien Cusson-Fradet
*/

"use strict";
let numberOfLines = 15;
let canvasW = 500;
let canvasH = 500;
let spacing = 8;
let frequencyMod;
let amplitudeMod = 0.5;
let ligne = {
  x:0,
  y:0,
  x1:0,
  y1:0,
  mvmt:1,
  speed:0.01

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
  createCanvas(canvasW, canvasH);
  background(0);
}


/**
Description of draw()
*/
function draw() {
  background(0);
  stroke(255);
  strokeWeight(3);

  frequencyMod = map(mouseX, 0, width, 1, 5);

  push();
  translate(width/2.7, height/2.7);
  //Drawing multiple lines...
  for (let i = 0; i < numberOfLines; i++) {
    line(ligne.x+i*spacing, ligne.y+i*spacing, ligne.x1+i*spacing, ligne.y1+i*spacing);
    //line(ligne.x1+i, ligne.y1+i, -ligne.x+i, ligne.y+i);
  }

  //Functions to make the lines move
  ligne.x = sin(ligne.mvmt / 1.5*frequencyMod) *70*amplitudeMod + sin(ligne.mvmt / 0.3*frequencyMod) *50*amplitudeMod;
  ligne.y = cos(ligne.mvmt / 0.5*frequencyMod) * 110*amplitudeMod;
  ligne.x1 = sin(ligne.mvmt / 3*frequencyMod) *20*amplitudeMod + sin(ligne.mvmt / 20*frequencyMod) *50*amplitudeMod;
  ligne.y1 = cos(ligne.mvmt / 0.8*frequencyMod) * 100*amplitudeMod + cos(ligne.mvmt / 20*frequencyMod) *50*amplitudeMod;


  //point(ligne.x1*ligne.mvmt, ligne.y1*ligne.mvmt);
  //point(-ligne.x*ligne.mvmt, ligne.y*ligne.mvmt);

  ligne.mvmt += ligne.speed;
  pop();
  console.log("ligne x:" + ligne.x);
  console.log("ligne y:" + ligne.y);
  console.log("ligne x1:" + ligne.x1);
  console.log("ligne y1:" + ligne.y1);
}
