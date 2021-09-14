/**
Activity 02 -Draw an Alien
Lucien Cusson-Fradet

First Activity, Drawing an alien with simple shapes and P5 functions.
*/

"use strict";


/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
createCanvas(640,480);
background(252, 232, 249);
//Alien body and head
noStroke();
fill("#84DFEF");
quad(width/2+80,height/2-20, width/2+40,height/2-20, width/2+90,height-height/8, width/2+130,height-height/8-5);
ellipse(450, height, 210, 150);
ellipse(width/3+80, height/3, height/3.5, height/3.5);
ellipse(width/3+220, height/3-10, height/3.5, height/3.5);
quad(width/3+80,height/3+(height/3.5)/2, width/3+220,height/3-10+(height/3.5)/2, width/3+220,height/3-10-(height/3.5)/2, width/3+80,height/3-(height/3.5)/2);
ellipse(width/2-30, height/2-10, 150, 190);
//Alien hand
quad(205,height, 235,height, 170,height-80, 155,height-80);
quad(170,height-80, 155,height-80, 145,260, 160,260);
quad(160,260, 145,260 )


}


/**
Description of draw()
*/
function draw() {

}
