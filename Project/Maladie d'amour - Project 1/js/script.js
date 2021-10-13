/**
Le grand Amour!
Lucien Cusson-Fradet

I've run out of time a little bit. The program is missing some key information and needs a little explaining and imagination to understand it.

- On the title screen, pressing any key will start the title music. Doing that again will start the game.
- On the game screen, a white ball represent a desperate lover that is trying to get to the top of a cliff and reach his loved one's house (the white rectangle).
- Using the SPACEBAR, the lover jumps in the air and starts bouncing. If he bounces on the floor, he looses momentum until he comes to a stop.
- Using A and D keys allows his partner in the "car" to move. The car is deleberatly hard to control in order to make the lover's mission hard.
  (Every press of the A and D keys accelerates or decelerates the car.)
- The little white line at the bottom represents a trampoline attached to the invisible car. If the lover bounces in it's center, he goes higher. Whatch the sides!
- If the Lover reaches a certain height, using the SPACEBAR again will trigger a flying bird (white ball again) and if the two connect, the lover is dropped at his loved one's house.
- The Ending scene ensues.

As you can experience for yourself, finding love is pretty f**ing hard.
If you are ready to give up, you can press BACKSPACE during gameplay to go directly to the ending.

Thank you!
I hope to upgrade this little program further in a near future!

TODO LIST Project 1
- Add graphics to the game
- Add an intro section with animated rain drops?
- Animate the title screen
- Tweak the gameplay, how to make it more fun?
  * Defferent controls for the car?
  * Possibility to do a yoshi jump while in the air?
  *
- Ajouter du sond pour la plupart des intéractions
- create a better Ending
- Adding choice in the dialogue?

*/

"use strict";
let canvasWidth = 650;
let canvasHeight = 500;
let collision = 0;

//Images This could very much be a single object
let img = {
  titleScreen: undefined,
  whoAreYou: undefined,
  noLove: undefined,
  deception: undefined,
  delay: 0,
  zoom: 0
}

//Sound
let snd = {
  titleMusic: undefined,
  gameMusic: undefined,
  endMusic: undefined
}

//State of the program
let state = `titleNoSound`;

//Delay to fix the title skipping a state
let titleDelay = 0;

let lover = {
  x:300,
  y:undefined,
  vx:0,
  vy:0,
  ax:0,
  ay:0.1,
  maxSpeed:0,
  minSpeed:0,
  drag:0.001,
  size:15,
  birdReach: 100,
  counter:0
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

let house = {
  x: 555,
  y: 60,
  w: 75,
  h: 40
}

let ground = {
  x:0,
  y:480,
  h:undefined,
  w:undefined
}

let bird = {
  beginX: -50,
  beginY: 60,
  endX: 500,
  endY: -20,
  distX: undefined,
  distY: undefined,
  exponent: 4,
  x: 0,
  y: 0,
  step: 0.02,
  pct: 0, //percentage
  size: 25,
  go: false
}

let birdSign = {
  xRect: 75,
  yRect: 70,
  w: 90,
  h: 19,
  radius: 2,
  text: `SpaceBar !`
}

let birdTriangle = {
  x1: birdSign.xRect - birdSign.w/2 - 5,
  y1: birdSign.yRect - birdSign.h/2 + 3,
  x2: birdSign.xRect - birdSign.w/2 - 5,
  y2: birdSign.yRect + birdSign.h/2 - 3,
  x3: birdSign.xRect - birdSign.w/2 - 15,
  y3: birdSign.yRect
}

const DROP_NUM = 10;
let waterDrops = [];

/**
PreLoad images and music
*/
function preload() {
  img.titleScreen = loadImage("assets/images/TitleBackground.png");
  img.noLove = loadImage("assets/images/noLove.png");
  img.whoAreYou = loadImage("assets/images/whoAreYou.png");
  img.deception = loadImage("assets/images/deception.png");
  snd.titleMusic = loadSound("assets/sounds/titleMusic.mp3");
  snd.gameMusic = loadSound("assets/sounds/gameMusic.mp3");
  snd.endMusic = loadSound("assets/sounds/endMusic.mp3");
}

/**
Setup canvas and starting properties fo wall, ground, trampo and bird
*/
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(`#080c44`);
  image(img.titleScreen, width/2, height/2);
  //Setting the size of the wall, ground and car
  wall.h = height - wall.y;
  wall.w = width - wall.x;
  ground.h = height - ground.y;
  ground.w = width;
  trampo.y = ground.y - 15;
  //Set the bird properties
  bird.distX = bird.endX - bird.beginX;
  bird.distY = bird.endY - bird.beginY;
}

/**
Deals with functions and parts of the game that I haven't put in functions like the bird trigger
*/
function draw() {
  background(`#080c44`);

  switch (state) {
    case `titleNoSound`:
      titleScreen();
      break;

    case `title`:
      titleScreen();
      titleDelay++;
      break;

    case `bouncing`:
      loverBounce();
      break;

    case `onGround`:
      loverOnGround();
      break;

    case `pogneLe`:
      loverGrabbed();
      break;

    case `ending`:
      ending();
      break;
  }

  //Drawing the wall and house
  if (state !== `title` && state !== `ending` && state !== `titleNoSound`) {
    push();
    fill(0);
    rect(wall.x, wall.y, wall.w, wall.h);
    rect(ground.x, ground.y, ground.w, ground.h);
    pop();
    push()
    rectMode(CENTER);
    fill(255);
    rect(house.x, house.y, house.w, house.h);
    pop();
    //controlling the car
    carControl();
    //game Music
  }


  //Get the player attention if the Lover is high enough
  if (lover.y < lover.birdReach && bird.go === false && state === `bouncing`) {
    birdTrigger();
  }

  if (bird.go) {
    birdFly();
  }



  console.log(`lover.y: ${lover.y}`);
  console.log(`lover.vy: ${lover.vy}`);
  console.log(`img.delay: ${img.delay}`);
  console.log(`state: ${state}`);
}

//Displays the title screen image
function titleScreen() {
  imageMode(CENTER);
  if (state === `title`) {
    image(img.titleScreen, width/2, height/2);
  }
}

function waterEffect() {
  for (let i = 0; i < DROP_NUM; i++) {
    let waterDrop = {
      x: random(25, width - 25),
      y: random (25, height - 25),
      size: 15,
    }
  }
  waterDrops.push(waterDrop);
}

//Function that allows the lover to bounce around
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
    lover.y = ground.y - lover.size/2;
    lover.vy = -(lover.vy) + 2;
  }
  //Check if the lover has stopped bouncing
  if (lover.y >= 472 && lover.y <= 475) {
    lover.counter += 1;
    if (lover.counter > 40) {
      lover.counter = 0;
      lover.vx = 0;
      lover.vy = 0;
      state = `onGround`;
    }

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

//function that deals with the lover once it's stationnary on the ground
function loverOnGround() {
  lover.y = ground.y - lover.size/2;
  push();
  noStroke();
  ellipseMode(CENTER);
  ellipse(lover.x, lover.y, lover.size);
  pop();
}

//Deals with the lover once it's made contact with the bird
function loverGrabbed() {
  if (lover.x < wall.x - 50 ) {
    lover.x = bird.x;
    lover.y = bird.y;
  }
  else {
    lover.vx = 2;
    lover.vy = 0.5;
    lover.x += lover.vx;
    lover.y += lover.vy;
  }

  let atTheDoor = dist(lover.x, lover.y, house.x, house.y);
  if (atTheDoor < 15) {
    state = `ending`;
  }

  push();
  noStroke();
  ellipseMode(CENTER);
  ellipse(lover.x, lover.y, lover.size);
  pop();
}

//controls the car movments
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

//Controls the movments of the bird object
function birdFly() {
  bird.pct += bird.step;
  if (bird.pct < 1) {
    bird.x = bird.beginX + bird.pct * bird.distX;
    bird.y = bird.beginY + pow(bird.pct, bird.exponent) * bird.distY;
  }
  push();
  ellipseMode(CENTER);
  noStroke();
  fill(255);
  ellipse(bird.x, bird.y, bird.size);
  pop();
  //reset the bird
  if (bird.x >= bird.endX - 15 && bird.y <= bird.endY + 10) {
    bird.x = bird.beginX;
    bird.y = bird.beginY;
    bird.pct = 0;
    bird.go = false;
  }
  //check the bird and lover distance and grab the lover if close enough
  let proximity = dist(lover.x, lover.y, bird.x, bird.y);
  if (proximity < lover.size + 5) {
    state = `pogneLe`;
  }
}

//Draws a sign to signal the player that the lover is within reach of the bird
function birdTrigger() {
  if (frameCount % 20 < 10) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(255, 0, 0);
    rect(birdSign.xRect, birdSign.yRect, birdSign.w, birdSign.h, birdSign.radius);
    fill(255);
    triangle(birdTriangle.x1, birdTriangle.y1, birdTriangle.x2, birdTriangle.y2, birdTriangle.x3, birdTriangle.y3);
    textSize(15);
    textAlign(CENTER);
    text(birdSign.text, birdSign.xRect, birdSign.yRect + birdSign.h/2 - 4);
    pop();
  }
}

//Controls the keyboard inputs
function keyPressed() {
  if (state === `titleNoSound`) {
    snd.titleMusic.play();
    state = `title`;
  }
  if (state === `title` && titleDelay > 15) {
    snd.titleMusic.stop();
    snd.gameMusic.loop();
    state = `onGround`;
  }
  else if (keyCode === 65) { //LEFT A
    trampo.vx -= 0.3;
  }
  else if (keyCode === 68) { //RIGHT D
    trampo.vx += 0.3;
  }
  else if (keyCode === 8 && state !== `title` && state !== `ending` && state !== `titleNoSound`) { //BACKSPACE
    state = `ending`;
  }
  else if (keyCode === 32 && state === `onGround`) { //SPACEBAR
    state = `bouncing`;
    lover.vy = -5;
    lover.y = ground.y - 15;
  }
  else if (keyCode === 32 && state === `bouncing` && lover.y < lover.birdReach) {
    bird.go = true;
  }
}

//End screens once the lover has reached the house
function ending() {
  img.delay++;

  imageMode(CENTER);
  image(img.whoAreYou, width/2, height/2);

  if (img.delay > 150 && img.delay < 300) {
    image(img.noLove, width/2, height/2);
  }
  else if (img.delay > 300) {
    image(img.deception, width/2, height/2);
    if (img.delay === 349) {snd.endMusic.play();}
    if (img.delay > 350) {
      snd.gameMusic.stop();
      img.zoom += 2;
      img.deception.resize(width+img.zoom, height+img.zoom);
    }
  }
}
