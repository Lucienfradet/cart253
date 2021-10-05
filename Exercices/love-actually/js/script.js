/**
Le grand Amour!
Lucien Cusson-Fradet
*/
"use strict";
let canvasWidth = 650;
let canvasHeight = 500;
let collision = 0;

let state = `bouncing`;

let lover = {
  x:200,
  y:50,
  vx:0,
  vy:0,
  ax:0,
  ay:0.1,
  maxSpeed:0,
  minSpeed:0,
  drag:0.001,
  size:15
}
let trampo = {
  x:250,
  y:undefined,
  vx:0,
  ax:0,
  maxSpeed:50,
  minSpeed:0.001,
  w:45,
  h:8
}

let wall = {
  x:450,
  y:50,
  h:undefined,
  w:undefined,
}
let ground = {
  x:0,
  y:480,
  h:undefined,
  w:undefined
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
  createCanvas(canvasWidth, canvasHeight);
  background(`#080c44`);
  //Setting the size of the wall, ground and car
  wall.h = height - wall.y;
  wall.w = width - wall.x;
  ground.h = height - ground.y;
  ground.w = width;
  trampo.y = ground.y - 15;
}


/**
Description of draw()
*/
function draw() {
  background(`#080c44`);

  switch (state) {
    case `bouncing`:
      loverBounce();
      break;

    case `onGround`:
      loverOnGround();
      break;
  }

  carControl();

  //Drawing the wall
  push();
  fill(0);
  rect(wall.x, wall.y, wall.w, wall.h);
  rect(ground.x, ground.y, ground.w, ground.h);
  pop();


console.log(`lover.ay: ${lover.ay}`);
console.log(`lover.vx: ${lover.vx}`);
console.log(`lover.y: ${lover.y}`);
console.log(`state: ${state}`);

}

function loverBounce() {
  //push the lover with gust of wind randomly
  let windPush = random();
  if (windPush < 0.01) {
    lover.vx += 0.1;
  }
  else if (windPush > 0.99) {
    lover.vx -= 0.1;
  }

  //bouce on the trampoline if the ball is on the damn thing!
  if (lover.y + lover.size/2 >= trampo.y - trampo.h && lover.x + lover.size >= trampo.x - trampo.w/2 && lover.x - lover.size <= trampo.x + trampo.w/2) {
    collision = dist(lover.x, lover.y + lover.size/2, trampo.x, trampo.y + trampo.h/2);
    //Bounce in deferent direction dependant on where it hit
    if (collision < 13) {
      lover.vx = 0;
    }
    else if (collision > 13 && lover.x > trampo.x) {
      lover.vx += 2;
    }
    else if (collision > 13 && lover.x < trampo.x) {
      lover.vx -= 2;
    }
    else if (collision > 15 && lover.x > trampo.x) {
      lover.vx += 5;
    }
    else if (collision > 15 && lover.x < trampo.x) {
      lover.vx -= 5;
    }
    else if (collision > 20 && lover.x > trampo.x) {
      lover.vx += 10;
    }
    else if (collision > 20 && lover.x < trampo.x) {
      lover.vx -= 10;
    }
    else if (collision > 30 && lover.x > trampo.x) {
      lover.vx += 15;
    }
    else if (collision > 30 && lover.x < trampo.x) {
      lover.vx -= 15;
    }
    lover.vy = -(lover.vy) - 0.5;
  }
  //Bounce On the floor
  else if (lover.y + lover.size/2 >= ground.y) {
    lover.vy = -(lover.vy) + 2;
  }
  if (lover.y + lover.size/2 - 10 > ground.y) {
    lover.vx = 0;
    lover.vy = 0;
    state = `onGround`;
  }
  //Bounce on the walls
  if (lover.x - lover.size <= 0) {
    lover.vx = -(lover.vx);
  }
  if (lover.x + lover.size >= wall.x) {
    lover.vx = -(lover.vx);
  }


  lover.x += lover.vx;
  //Gravity
  lover.vy += lover.ay;
  lover.y += lover.vy;
  //Drawing the lover
  push();
  noStroke();
  ellipseMode(CENTER);
  ellipse(lover.x, lover.y, lover.size);
  pop();
}

function loverOnGround() {
  lover.y = ground.y - lover.size/2;
  push();
  noStroke();
  ellipseMode(CENTER);
  ellipse(lover.x, lover.y, lover.size);
  pop();
}

function carControl() {
  //stoping at edges
  if (trampo.x - trampo.w/2 <= 0 && trampo.vx !== 0) {
    trampo.vx = 0;
    trampo.x += 1;
  }
  else if (trampo.x + trampo.w/2 >= wall.x && trampo.vx !== 0) {
    trampo.vx = 0;
    trampo.x -= 1;
  }
  //Stop at the Lover ball
  if (state === `onGround`){
    let gageLeft = dist(trampo.x + trampo.w/2, trampo.h, lover.x - lover.size/2, trampo.h);
      if (gageLeft < 1) {
        trampo.vx = 0;
        trampo.x -= 1;
      }
    let gageRight = dist(trampo.x - trampo.w/2, trampo.h, lover.x + lover.size/2, trampo.h);
      if (gageRight < 1) {
        trampo.vx = 0;
        trampo.x += 1;
      }
  }
  //moving the car
  trampo.x += trampo.vx
  //drawing the trampoline
  push();
  noStroke();
  fill(255);
  rectMode(CENTER);
  rect(trampo.x, trampo.y, trampo.w, trampo.h);
  pop();
}

function keyPressed() {
  if (keyCode === 65) { //LEFT_ARROW
    trampo.vx -= 0.3;
  }
  else if (keyCode === 68) { //RIGHT_ARROW
    trampo.vx += 0.3;
  }
  else if (keyCode === 32 && state === `onGround`) { //SPACEBAR
    state = `bouncing`;
    lover.vy = -3;
    lover.y = ground.y - 15;
  }
}
