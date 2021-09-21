/**
Exercice 1 - I like to move it!
Lucien Cusson-Fradet
*/

"use strict";
let canvasW = 500;
let canvasH = 500;

const BOULETTES_NUM = 5;
let boulettesProp = [];
let boulettes = [];
let bouletteChoice;

let ligne = {
  x:0,
  y:0,
  x1:0,
  y1:0,
  mvmt:1,
  speed:0.01,
  frequencyMod:1,
  amplitudeMod:0.5,
  spacing:3,
  //offsets the second and fourth collection of lines by the amount of strokeWeight
  offSet:2,
  numberOfLines:50
}

/**
Creating arrays for the randomly generated boulettes
*/
function setup() {
  createCanvas(canvasW, canvasH);
  background(0);

//These are the properties used by the boulette array...
//what am I even doing? lol
  for (let i = 0; i < BOULETTES_NUM; i++) {
    let bouletteProp = {
      x: random(1,0),
      y: random(0,height),
      size: random(25, 150),
      speed:0.5
    };
    boulettesProp.push(bouletteProp);
  }

//This is the true array
  for (let i = 0; i < BOULETTES_NUM; i++) {
    let boulette = {
      x: 0,
      y: random(0+boulettesProp[i].size/2,height-boulettesProp[i].size/2),
      size: boulettesProp[i].size,
      speed:random(0.5, 10)
    };
    //Placing the boulette Left or Right randomly
    if (boulettesProp[i].x > 0.5) {
      boulette.x = 0-boulettesProp[i].size/2;
    }
    else {
      boulette.x = width+boulettesProp[i].size/2;
    }

    boulettes.push(boulette);
  }
}


/**
Make the boulettes fly across the screen, change the background shade with the mouseX and generate a couple of lines that move with sin/cos functions
*/
function draw() {
  background(map(constrain(mouseY, 0, height), 0, height, 0, 255));

  for (let i = 0; i < boulettes.length; i++) {
    let boulette = boulettes[i];

    //move these ballz baby
    if (boulettesProp[i].x > 0.5) {
      boulette.x += boulette.speed;
    }
    else {
      boulette.x -= boulette.speed;
    }

    //Make 'em come back!
    if (boulettesProp[i].x > 0.5 && boulette.x > width+boulettesProp[i].size/2) {
      boulette.x = 0-boulettesProp[i].size/2;
    }
    else if (boulettesProp[i].x < 0.5 && boulette.x < 0-boulettesProp[i].size/2) {
      boulette.x = width+boulettesProp[i].size/2;
    }

    noStroke();
    fill(0);
    ellipse(boulette.x, boulette.y, boulette.size);
  }



  ligne.amplitudeMod = map(constrain(mouseX, 0, width), 0, width, 0.5, 5); //Allows to affect the amplitude of the functions with the mouse

  //Now that I know how to make arrays work, would be nice to program the lines as objects so they can evolve independently from each other! (kinda running out of time.)
  push();
  translate(width/2.7, height/2.7);
  stroke(255);
  strokeWeight(ligne.offSet);
  //Drawing multiple lines...
  for (let i = 0; i < ligne.numberOfLines; i++) {
    line(ligne.x+i*ligne.spacing, ligne.y+i*ligne.spacing, ligne.x1+i*ligne.spacing, ligne.y1+i*ligne.spacing);
    line(-ligne.x+i*ligne.spacing+ligne.offSet, -ligne.y+i*ligne.spacing+ligne.offSet, -ligne.x1+i*ligne.spacing+ligne.offSet, -ligne.y1+i*ligne.spacing+ligne.offSet);
    line(-ligne.x+i*ligne.spacing, ligne.y+i*ligne.spacing, -ligne.x1+i*ligne.spacing, ligne.y1+i*ligne.spacing);
    line(ligne.x+i*ligne.spacing+ligne.offSet, -ligne.y+i*ligne.spacing+ligne.offSet, ligne.x1+i*ligne.spacing+ligne.offSet, -ligne.y1+i*ligne.spacing+ligne.offSet);
  }

  //Functions to make the lines move
  ligne.x = sin(ligne.mvmt / 1.5*ligne.frequencyMod) *70*ligne.amplitudeMod + sin(ligne.mvmt / 0.3*ligne.frequencyMod) *50*ligne.amplitudeMod;
  ligne.y = cos(ligne.mvmt / 0.5*ligne.frequencyMod) * 110*ligne.amplitudeMod;
  ligne.x1 = sin(ligne.mvmt / 3*ligne.frequencyMod) *20*ligne.amplitudeMod + sin(ligne.mvmt / 20*ligne.frequencyMod) *50*ligne.amplitudeMod;
  ligne.y1 = cos(ligne.mvmt / 0.8*ligne.frequencyMod) * 100*ligne.amplitudeMod + cos(ligne.mvmt / 20*ligne.frequencyMod) *50*ligne.amplitudeMod;
  ligne.mvmt += ligne.speed;
  pop();

  //console.log("ligne x:" + ligne.x);
  //console.log("ligne y:" + ligne.y);
  //console.log("ligne x1:" + ligne.x1);
  //console.log("ligne y1:" + ligne.y1);
  console.log(`boulettesProp[0].x:${boulettesProp[0].x}`);
  console.log(`boulettesProp[1].x:${boulettesProp[1].x}`);
  console.log(`boulettesProp[2].x:${boulettesProp[2].x}`);
  console.log(`boulettesProp[3].x:${boulettesProp[3].x}`);
  console.log(`boulettesProp[4].x:${boulettesProp[4].x}`);

}
