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
  loverSpriteJump: undefined,
  loverSpriteStd: undefined,
  loverSpriteRot: undefined,
  loverSpriteParr: undefined,
  loverSpriteBird: undefined,
  birdSprite1: undefined,
  birdSprite2: undefined,
  titleScreen: undefined,
  whoAreYou: undefined,
  noLove: undefined,
  deception: undefined,
  gameBackground: undefined,
  gameForeground: undefined,
  delay: 0,
  zoom: 0
}

//Sound
let snd = {
  titleMusic: undefined,
  gameMusic: undefined,
  endMusic: undefined,
  lightRain: undefined,
  rainForest: undefined,
  thunder: undefined,
  bounce1: undefined,
  bounce2: undefined,
  parachute: undefined,
  parachuteClose: undefined
}

//State of the program
let state = `titleNoSound`;

//Delay to fix the title skipping a state
let titleDelay = 0;

let thunder = {
  state: false,
  count: 0,
  aleatoire: undefined
}

let wind = {
  xSpeed: 0,
  trigger: undefined,
  variation: 0.1
}

let lover = {
  x:300,
  y:undefined,
  vx:0,
  vy:0,
  ax:0,
  ayBouncing:0.1,
  ayParachute: 0.01,
  parachuteTriggerX: true,
  parachuteTriggerY: true,
  parachuteLimit: canvasHeight / 10 * 8,
  maxSpeed:0,
  minSpeed:0,
  drag:0.001,
  size:15,
  birdReach: 100,
  counter:0,
  jumpTrigger: false,
  angle: 0
}

let trampo = {
  x:250,
  y:undefined,
  vx:0,
  ax:0,
  accelerationForward: 0.1,
  accelerationBackward: 0.05,
  deceleration: 0.01,
  decelerationState: false,
  break: 0.12,
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

const RAIN_AMOUNT = 300;
let rainDrops = [];

/**
PreLoad images and music
*/
function preload() {
  img.loverSpriteStd = loadImage("assets/images/loverSpriteStd.png");
  img.loverSpriteJump = loadImage("assets/images/loverSpriteJump.png");
  img.loverSpriteRot = loadImage("assets/images/loverSpriteRot.png");
  img.loverSpriteParr = loadImage("assets/images/loverSpriteParr.png");
  img.loverSpriteBird = loadImage("assets/images/loverSpriteBird.png");
  img.birdSprite1 = loadImage("assets/images/birdSprite1.png");
  img.birdSprite2 = loadImage("assets/images/birdSprite2.png");
  img.titleScreen = loadImage("assets/images/TitleBackground.png");
  img.noLove = loadImage("assets/images/noLove.png");
  img.whoAreYou = loadImage("assets/images/whoAreYou.png");
  img.deception = loadImage("assets/images/deception.png");
  img.gameBackground = loadImage("assets/images/gameBackground.png");
  img.gameForeground = loadImage("assets/images/gameForeground.png");
  snd.titleMusic = loadSound("assets/sounds/titleMusic.mp3");
  snd.gameMusic = loadSound("assets/sounds/gameMusic.mp3");
  snd.endMusic = loadSound("assets/sounds/endMusic.mp3");
  snd.lightRain = loadSound("assets/sounds/lightRain.m4a");
  snd.rainForest = loadSound("assets/sounds/rainForest.wav");
  snd.thunder = loadSound("assets/sounds/thunder.wav");
  snd.bounce1 = loadSound("assets/sounds/bounce1.wav");
  snd.bounce2 = loadSound("assets/sounds/bounce2.wav");
  snd.parachute = loadSound("assets/sounds/parachute.mp3");
  snd.parachuteClose = loadSound("assets/sounds/parachuteClose.mp3");
}

/**
Setup canvas and starting properties fo wall, ground, trampo and bird
*/
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(0, 1, 10);
  createArrays();

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
  background(0, 1, 10);
  //background(255);

  switch (state) {
    case `titleNoSound`:
      titleScreen();
      break;

    case `title`:
      titleScreen();
      titleDelay++;
      break;

    case `bouncing`:
      tunderEffect();
      rainDropEffect();
      backgroundElements();
      windControl();
      loverBounce();
      foregroundElements();
      break;

    case `parachute`:
      tunderEffect();
      rainDropEffect();
      backgroundElements();
      windControl();
      loverParachute();
      foregroundElements();
      break;

    case `onGround`:
      tunderEffect();
      rainDropEffect();
      backgroundElements();
      windControl();
      loverOnGround();
      foregroundElements();
      break;

    case `pogneLe`:
      tunderEffect();
      rainDropEffect();
      backgroundElements();
      windControl();
      loverGrabbed();
      foregroundElements();
      break;

    case `ending`:
      ending();
      break;
  }

  //Get the player attention if the Lover is high enough
  if (lover.y < lover.birdReach && bird.go === false && state === `bouncing`) {
    birdTrigger();
  }

  if (bird.go) {
    birdFly();
  }



  console.log(`wind.xSpeed: ${wind.xSpeed}`);
  console.log(`lover.y: ${lover.y}`);
  console.log(`lover.vy: ${lover.vy}`);
  console.log(`trampo.vx: ${trampo.vx}`);
  console.log(`keyIsDown: ${keyIsDown(65)}`);
  console.log(`trampoState: ${trampo.decelerationState}`);
  console.log(`state: ${state}`);
}

//Creates the Arrays in the setup of the program
function createArrays() {
  for (let i = 0; i < DROP_NUM; i++) {
    let waterDrop = {
      x: random(25, width - 25),
      y: random (25, height - 25),
      sizeX: 3,
      sizeY: 1,
      speedX: 2.4,
      speedY: 0.8,
      locationColor: undefined,
      opacity: 200,
      timer: random(0, 100)
    };
    waterDrops.push(waterDrop);
  }

  for (let i = 0; i < RAIN_AMOUNT; i++) {
    let rainDrop = {
      x: random(-25, width + 25),
      y1: random(-10, -3000),
      y2: undefined,
      hauteur: 10,
      epaisseur: 1,
      speedY: 20,
      opacity: 70,
      top: -500,
      bottom: width + 500
    };
    rainDrop.y2 = rainDrop.y1 + rainDrop.hauteur;
    rainDrops.push(rainDrop);
  }
}
//Displays the title screen image
function titleScreen() {
  imageMode(CENTER);
  if (state === `title`) {
    image(img.titleScreen, width/2, height/2);
    waterDropEffect();
  }
  else {
    //Prompts the player to press a key and start the program
    push();
    fill(255);
    textAlign(CENTER);
    textSize(17);
    text(`Press any key`, width/2, height/2);
    pop();
  }
}

//Displays elements in the foreground
function foregroundElements() {
  push();
  imageMode(CORNER);
  image(img.gameForeground, ground.x, ground.y - 40);
  pop();
}

//Displays elements in the background
function backgroundElements() {
  push();
  fill(0);
  //rect(wall.x, wall.y, wall.w, wall.h);
  //rect(ground.x, ground.y, ground.w, ground.h);
  pop();
  push()
  rectMode(CENTER);
  fill(255);
  //rect(house.x, house.y, house.w, house.h);
  imageMode(CENTER);
  image(img.gameBackground, width/2, height/2);
  pop();
  //controlling the car
  carControl();
  //game Music
}

//Randomly activates thunderstuck by ACDC
function tunderEffect() {
  thunder.aleatoire = random();
  thunder.count++;

  if (thunder.aleatoire < 0.001) {
    snd.thunder.play();
    thunder.state = true;
    thunder.count = 0;
  }

  if (thunder.state && thunder.count < 5) {
    background(255);
  }
  if (thunder.state && thunder.count > 10) {
    background(255);
  }
  if (thunder.state && thunder.count > 15) {
    thunder.state = false;
    thunder.count = 0;
  }
}

//Displays little water drops on the title screen
function waterDropEffect() {
  for (let i = 0; i < DROP_NUM; i++) {
    let waterDrop = waterDrops[i];
    waterDrop.locationColor = get(waterDrop.x, waterDrop.y);

    //Timer so the drops are not in sync at the start
    if (waterDrop.timer > 0) {
      waterDrop.timer--;
    }
    //Checking where they are displayed
    else if (waterDrop.locationColor[2] !== 10 || waterDrop.sizeX > 60) { //10 is the blue value of the water section in the background image
      waterDrop.x = random(25, width - 25);
      waterDrop.y = random (25, height - 25);
      waterDrop.sizeX = 3;
      waterDrop.sizeY = 1;
      waterDrop.opacity = 200;
    }
    else {
      waterDrop.sizeX += waterDrop.speedX;
      waterDrop.sizeY += waterDrop.speedY;
      waterDrop.opacity -= 10;

      //Drawing the rainDrops
      push();
      noFill();
      stroke(255, waterDrop.opacity);
      strokeWeight(1);
      ellipse(waterDrop.x, waterDrop.y, waterDrop.sizeX, waterDrop.sizeY);
      pop();
    }
  }
}

//Displays rain in the game section
function rainDropEffect() {
  for (let i = 0; i < RAIN_AMOUNT; i++) {
    let rainDrop = rainDrops[i];

    if (rainDrop.y2 > rainDrop.bottom) {
      rainDrop.x = random(-200, width + 200);
      rainDrop.y1 = rainDrop.top;
      rainDrop.y2 = rainDrop.top + rainDrop.hauteur;
    }
    else {
      rainDrop.y1 += rainDrop.speedY;
      rainDrop.y2 += rainDrop.speedY;
    }

    push();
    rotate(radians(wind.xSpeed*30));
    strokeWeight(rainDrop.epaisseur);
    stroke(255, rainDrop.opacity);
    line(rainDrop.x, rainDrop.y1, rainDrop.x, rainDrop.y2);
    pop();
  }
}

//Randomly changes the wind direction and keeps track of it.
function windControl() {
  wind.trigger = random();

  if (wind.trigger < 0.01) {
    wind.xSpeed += wind.variation;
  }
  else if (wind.trigger > 0.99) {
    wind.xSpeed -= wind.variation;
  }
  wind.xSpeed = constrain(wind.xSpeed, -1, 1);
}

//Function that allows the lover to bounce around
function loverBounce() {
  //push the lover around randomly a bit
  let randomPush = random();
  if (randomPush < 0.01) {
    lover.vx += 0.1;
  }
  else if (randomPush > 0.99) {
    lover.vx -= 0.1;
  }

  //bouce on the trampoline if the ball is on the damn thing!
  if (lover.y + lover.size/2 >= trampo.y - trampo.h && lover.x + lover.size >= trampo.x - trampo.w/2 && lover.x - lover.size <= trampo.x + trampo.w/2) {
    collision = dist(lover.x, lover.y + lover.size/2, trampo.x, trampo.y + trampo.h/2);
    //Bounce in deferent direction dependant on where it hit
    if (collision < 13) {
      lover.vx = 0;
      snd.bounce1.play();
    }
    else if (collision > 13 && lover.x > trampo.x) {
      lover.vx += 2;
      snd.bounce1.play();
    }
    else if (collision > 13 && lover.x < trampo.x) {
      lover.vx -= 2;
      snd.bounce1.play();
    }
    else if (collision > 15 && lover.x > trampo.x) {
      lover.vx += 5;
      snd.bounce1.play();
    }
    else if (collision > 15 && lover.x < trampo.x) {
      lover.vx -= 5;
      snd.bounce1.play();
    }
    else if (collision > 20 && lover.x > trampo.x) {
      lover.vx += 10;
      snd.bounce1.play();
    }
    else if (collision > 20 && lover.x < trampo.x) {
      lover.vx -= 10;
      snd.bounce1.play();
    }
    else if (collision > 30 && lover.x > trampo.x) {
      lover.vx += 15;
      snd.bounce1.play();
    }
    else if (collision > 30 && lover.x < trampo.x) {
      lover.vx -= 15;
      snd.bounce1.play();
    }
    lover.vy = -(lover.vy) - 0.5;
  }
  //Bounce On the floor
  else if (lover.y + lover.size/2 >= ground.y) {
    snd.bounce1.play();
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
    snd.bounce1.play();
    lover.vx = -(lover.vx);
  }
  if (lover.x + lover.size >= wall.x) {
    snd.bounce1.play();
    lover.vx = -(lover.vx);
  }


  lover.x += lover.vx;
  //Gravity
  lover.vy += lover.ayBouncing;
  lover.y += lover.vy;
  loverDraw();
}

//Activate the lovers glider
function loverParachute() {
  //Cutdown the vy
  if (lover.parachuteTriggerY && lover.vy < 0) {
    lover.vy += 0.1;
  }
  else {
    lover.parachuteTriggerY = false
  }

  //Cutdowm the vx
  if (lover.parachuteTriggerX && lover.vx > 0.1) {
    lover.vx -= 0.1;
  }
  else if (lover.parachuteTriggerX && lover.vx < -0.1) {
    lover.vx += 0.1;
  }
  else {
    lover.parachuteTriggerX = false;
  }

  //stop on the walls
  if (lover.x - lover.size/2 <= 0) {
    lover.vx = 0.1;
  }
  else if (lover.x + lover.size/2 >= wall.x) {
    lover.vx = -0.1;
  }
  else if (lover.parachuteTriggerX === false) { //Moves following the wind
    lover.ax = -(wind.xSpeed/100);
    lover.vx += lover.ax;
    lover.x += lover.vx;
  }

  if (lover.y > lover.parachuteLimit) { //return to the bouncing mode if it gets to close to the ground
    state = `bouncing`;
    lover.parachuteTriggerX = true;
    lover.parachuteTriggerY = true;
  }

  lover.x += lover.vx;
  //Gravity
  lover.vy += lover.ayParachute;
  lover.y += lover.vy;
  loverDraw();
}

//function that deals with the lover once it's stationnary on the ground
function loverOnGround() {
  lover.y = ground.y - lover.size/2;
  loverDraw();
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
  loverDraw();
}

//Drawing the lover
function loverDraw() {
  imageMode(CENTER);

  switch (state) {
    case `onGround`:
      image(img.loverSpriteStd, lover.x, lover.y);
      break;

    case `bouncing`:
      if (lover.jumpTrigger) {
        image(img.loverSpriteJump, lover.x, lover.y);
      }
      if (lover.vy > 0) {
        lover.jumpTrigger = false;
      }

      if (lover.jumpTrigger === false) {
        push();
        translate(lover.x, lover.y);
        rotate(radians(lover.angle));
        image(img.loverSpriteRot, 0, 0);
        lover.angle += 5;
        pop();
      }
      break;

    case `parachute`:
      image(img.loverSpriteParr, lover.x, lover.y);
      break;

    case `pogneLe`:
      image(img.loverSpriteBird, lover.x, lover.y);
      break;
  }
}

//controls the car movments
function carControl() {
  //65 = A LEFT // 68 = D RIGHT
  if (trampo.vx === 0) {
    if (keyIsDown(68)) {
      trampo.vx += trampo.accelerationBackward;
      trampo.decelerationState = false;
    }
    else if (keyIsDown(65)) {
      trampo.vx -= trampo.accelerationForward;
      trampo.decelerationState = false;
    }
  }

  if (trampo.vx < 0 && keyIsDown(65)) {
    trampo.vx -= trampo.accelerationForward;
    trampo.decelerationState = false;
  }

  if (trampo.vx > 0 && keyIsDown(68)) {
    trampo.vx += trampo.accelerationBackward;
    trampo.decelerationState = false;
  }

  if (trampo.vx < 0 && keyIsDown(16)) {
    trampo.vx += trampo.break;
    trampo.decelerationState = false;

    if (trampo.vx > 0) {
      trampo.vx = 0;
    }
  }

  if (trampo.vx > 0 && keyIsDown(16)) {
    trampo.vx -= trampo.break;
    trampo.decelerationState = false;

    if (trampo.vx < 0) {
      trampo.vx = 0;
    }
  }

  //Controls the deceleration after a keyRelease
  if (trampo.decelerationState) {
    if (trampo.vx > 0) {
      trampo.vx -= trampo.deceleration;
      if (trampo.vx < 0) {trampo.decelerationState = false;}
    }
    else if (trampo.vx < 0) {
      trampo.vx += trampo.deceleration;
      if (trampo.vx > 0) {trampo.decelerationState = false;}
    }
    if (trampo.vx === 0) {
      trampo.decelerationState = false;
    }
  }



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
  trampoDraw();
}

//drawing the trampoline
function trampoDraw() {
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

  birdDraw();
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

function birdDraw() {
  imageMode(CENTER);

  if (frameCount % 20 < 5) {
    image(img.birdSprite1, bird.x, bird.y);
  }
  else {
    image(img.birdSprite2, bird.x, bird.y);
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
    snd.lightRain.loop();
    state = `title`;
  }
  if (state === `title` && titleDelay > 15) {
    snd.titleMusic.stop();
    snd.lightRain.stop();
    snd.gameMusic.loop();
    snd.rainForest.loop();
    state = `onGround`;
  }
  /*
  else if (keyCode === 65) { //LEFT A
    trampo.vx -= 0.3;
  }
  else if (keyCode === 68) { //RIGHT D
    trampo.vx += 0.3;
  }
  */
  else if (keyCode === 8 && state !== `title` && state !== `ending` && state !== `titleNoSound`) { //BACKSPACE
    state = `ending`;
  }
  else if (keyCode === 32 && state === `onGround`) { //SPACEBAR
    state = `bouncing`;
    snd.bounce2.play();
    lover.jumpTrigger = true;
    lover.vy = -5;
    lover.y = ground.y - 15;
  }
  else if (keyCode === 32 && state === `bouncing` === lover.y < lover.parachuteLimit && state !== `title` && lover.y > lover.birdReach) {
    snd.parachute.play();
    lover.parachuteTriggerX = true;
    lover.parachuteTriggerY = true;
    state = `parachute`;
  }
  else if (keyCode === 32 && state === `parachute` && lover.y > lover.birdReach) {
    snd.parachuteClose.play();
    lover.parachuteTriggerX = true;
    lover.parachuteTriggerY = true;
    state = `bouncing`;
  }
  else if (keyCode === 32 && state === `bouncing` && lover.y < lover.birdReach) {
    bird.go = true;
  }
}

function keyReleased() {
  if (keyCode === 65 || keyCode === 68) {
    trampo.decelerationState = true;
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
