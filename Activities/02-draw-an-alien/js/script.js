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
//middle finger
quad(156,190, 150,190, 150,260, 156,260);
ellipse(153,190, 15,15);
//left F.
quad(128,220, 122,220, 145,260, 153,260);
ellipse(125,220, 8,8);
//right F.
quad(185,222, 180,222, 152,260, 160,260);
ellipse(182,222, 8,8);

//Facial features
//Nose
fill("#50bd60");
ellipse(240, height/2+30, 70, 100);
//Eyes
fill(160);
ellipse(230, height/2-59, 50, 50);
ellipse(295, height/2-59, 50, 50);
fill(180);
ellipse(232, height/2-56, 40, 40);
ellipse(292, height/2-56, 40, 40);
fill(200);
ellipse(234, height/2-53, 30, 30);
ellipse(289, height/2-53, 30, 30);
fill(210);
ellipse(236, height/2-50, 25, 25);
ellipse(286, height/2-50, 25, 25);
fill(230);
ellipse(238, height/2-48, 20, 20);
ellipse(283, height/2-48, 20, 20);
fill(250);
ellipse(240, height/2-46, 15, 15);
ellipse(282, height/2-46, 15, 15);
fill(252, 232, 249);
//cover it up!
ellipse(212, height/2-70, 25, 80);
//Thing-ies
fill(255);
arc(420, 130, 60, 50, PI, 0, CHORD);
fill("#84DFEF");
arc(420, 140, 60, 50, PI, 0, CHORD);

fill(255);
arc(420, 155, 60, 50, PI, 0, CHORD);
fill("#84DFEF");
arc(420, 165, 60, 50, PI, 0, CHORD);



}


/**
Description of draw()
*/
function draw() {

}
