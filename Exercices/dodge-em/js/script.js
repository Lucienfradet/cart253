/**
Exercice 2: Dodge 'em!
Lucien Cusson-Fradet

Game where you move a spaceship with the left and right arrow keys. The red ball that you have to shoot can be controlled by a second player with the mouse.
(Or the same player's other hand if the connection between the left and right hemisphere of his brain has been cut out!)
*/

"use strict";
let canvasWidth = 500;
let canvasHeight = 800;

//Event Switches
let hitSwitch = false;
let spaceBarSwitch = false;

//Image data...
let faceImage;
let imageSize = 200;
let tiles = 80;
let tileSize = imageSize/tiles;

//redGem object
let redGem = {
  detailX: 7,
  detailY: 4,
  x: undefined,
  y: undefined,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  maxSpeed: 5,
  acceleration: 0.1,
  accMin: 0.01,
  accMax: 1,
  size: 25,
  distance: 0,
  accChange:0
}

//Cone shape, the ship
let ship = {
  x: 0,
  base: 15,
  hauteur: 30
}

//Bullet object
let bullet = {
  x: undefined,
  y: undefined,
  hauteur: 20,
  base: 5,
  depth: 5,
  hitDettection: undefined,
}
//Amount of Stars
const NUM_STARS = 200;

/**
Testing things out with image Rasterization but I could not finish
*/
function preload() {
  //faceImage = loadImage('assets/images/Head.png');
  //faceImage.resize(imageSize,0);

}


/**
Setting up the canvas and base value for the redGem
*/
function setup() {
  smooth();
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  background(0);
  redGem.x = width/2;
  redGem.y = 100;
}


function draw() {
  background(0);

//Drawing a couple of stars!
  push();
    stroke(255);
    randomSeed(0);
    translate(-width/2, -height/2);
    for (let i = 0; i < NUM_STARS; i++) {
      let x = random(0, width);
      let y = random(0, height);
      point(x, y);
    }
  pop();

//Trying to display an image as different sized spheres influence by the brighness of the pixels... did not manage...
/*
  push();
  noStroke();
  fill(255);
    for(let i = 0; i < tiles; i++) {
      for(let j = 0; j < tiles; j++) {
        //let couleur = faceImage.get(i, j, tileSize, tileSize);
        //let bright = map(brightness(couleur), 0, 255, 1, 0);

        translate(i * tileSize, j * tileSize);
        sphere(tileSize);
        r += 0.1;
      }
    }
    pop();
*/


  //imageMode(CENTER);
  //image(faceImage,0,0);

  //Move the mouseX and mouseY position to fit in the 3D environment
  let souris = {
    x: mouseX - width/2,
    y: mouseY - height/2
  }

  //Make the gem loop around the canvas
  if (redGem.x > width + redGem.size/2) {
    redGem.x = 0 - redGem.size/2;
  }
  else if (redGem.x < 0 - redGem.size/2) {
    redGem.x = width + redGem.size/2;
  }
  else if (redGem.y > height + redGem.size/2) {
    redGem.y = 0 - redGem.size/2;
  }
  else if (redGem.y < 0 - redGem.size/2) {
    redGem.y = height + redGem.size/2;
  }

/*
  //Change the acceleration... Pas vraiment au point...
  redGem.distance = dist(redGem.x, redGem.y, mouseX, mouseY);
  redGem.accChange = map(redGem.distance, 0, 800, 0.01, -0.01);
  redGem.acceleration += redGem.accChange;
  redGem.acceleration =constrain(redGem.acceleration, redGem.accMin, redGem.accMax);
*/

  //Check where the gem is compared to the mouse
  if (mouseX > redGem.x) {
    redGem.ax = redGem.acceleration;
  }
  else if (mouseX < redGem.x) {
    redGem.ax = -redGem.acceleration;
  }

  if (mouseY > redGem.y) {
    redGem.ay = redGem.acceleration;
  }
  else if (mouseY < redGem.y) {
    redGem.ay = -redGem.acceleration;
  }

  //update the speed of the gem
  redGem.vx += redGem.ax;
  redGem.vx = constrain(redGem.vx, -redGem.maxSpeed, redGem.maxSpeed);

  redGem.vy += redGem.ay;
  redGem.vy = constrain(redGem.vy, -redGem.maxSpeed, redGem.maxSpeed);

  //Change the position of the gem and check if it's been hit
  if (hitSwitch === false) {
    redGem.x += redGem.vx;
    redGem.y += redGem.vy;
    redGem.y = constrain(redGem.y, 0 - redGem.size/2, height/5 * 4);
  }
  else {
    redGem.size += 10;
  }

  if (redGem.size > 2000) {
    hitSwitch = false;
    redGem.size = 25;
    redGem.x = width/2;
    redGem.y = 100;
  }


  //Drawing the RedGem
  push();
  noStroke();
  scale(0.92,1);
  pointLight(250, 250, 250, souris.x, souris.y, 500);
  ambientLight(75);
  fill(240,150,150);

  translate(redGem.x - width/2, redGem.y - height/2);
  rotateY(millis() / 1000);

  sphere(redGem.size, redGem.detailX, redGem.detailY);
  pop();

  //Move the ship
  if (keyIsDown(LEFT_ARROW)) {
    ship.x += 5;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    ship.x -= 5;
  }

  //Make the ship loop
  if (ship.x > width/2 + ship.base/2) {
    ship.x = -width/2 + ship.base/2;
  }
  else if (ship.x < -width/2 - ship.base/2) {
    ship.x = width/2 + ship.base/2;
  }

  //Drawing the Space ship
  push();
  fill(255);
  noStroke();
  rotate(PI);

  translate(ship.x, -height/2 + height/13);
  rotateY(millis() / 1000);

  cone(ship.base, ship.hauteur, 8, 1);
  pop();

  //Bullet Shooting!
  if (spaceBarSwitch === false) {
    bullet.x = -ship.x;
    bullet.y = height/2 - height/13;
  }
  else {
    push();
    noStroke();
    translate(bullet.x, bullet.y);
    rotateY(millis() / 300);
    box(bullet.base, bullet.hauteur, bullet.depth);
    bullet.y -= 10;
    pop();

    if (bullet.y < -height/2) {
      spaceBarSwitch = false;
    }
  }

  //Hit detection!
  bullet.hitDettection = dist(bullet.x, bullet.y, redGem.x - width/2, redGem.y - height/2);
  if (bullet.hitDettection < bullet.hauteur/2 + redGem.size/2) {
    spaceBarSwitch = false;
    bullet.y = -height/2;
    hitSwitch = true;
  }

  console.log(`mouseX: ${mouseX}`);
  console.log(`redGem.x: ${redGem.x - width/2}`);
  console.log(`redGem.y: ${redGem.y - height/2}`);
  console.log(`bullet.x: ${bullet.x}`);
  console.log(`bullet.x: ${bullet.y}`);
  console.log(`keypress? ${spaceBarSwitch}`);
  console.log(`keypress? ${hitSwitch}`);
  console.log(`distancething ${bullet.hitDettection}`);
  console.log(`redGem.size ${redGem.size}`);
}

//Function to shoot the bullet
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    spaceBarSwitch = true;
  }
}
