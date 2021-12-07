/**
Project 2 prototype
Lucien Cusson-Fradet

I ran out of time doing the prototype. Parts of it ended up being more complicated than anticipated.
This serves as a basic representation of the visuals that the game will have.

At the moment, it is possible to rotate the tunnel using A and D keys.


TODO LIST:
OK Create matter.js objects for matter.js
OK Visualise the objects with p5.js
KINDA tweak the parameters so the controls feel nice !!!
OK Spawn objects and make them follow the tunnel
OK Collision with the main object
- Implement a life system ???
KINDA Add different functions like a ring of spikes that you have to jump over
OK Make the jump be perpandicular to the last point of contact with the MeatBall
OK add a little angular momentum to the meatball to help with the movements?
OK fix the tunnel jump delay...
- Implement States as objects
- Create functions to switch between SpawnerFunctions and GAMEON baby!
- Draw a couple graphics for an intro
- Program an Intro
- Write and record Voice acting
- Add Text display??
- Program an ending where shit goes MaaAAAAaaaaaD
- Add sound effect and music? A song that changes with animation would be nice
- Add a enter your name function and use it in the last statement in the end.


- Implement dithering effect!?

*/

"use strict";
// 1160 893
let canvasWidth = 700;
let canvasHeight = 550;

// let canvasWidth = 1160;
// let canvasHeight = 893;

let img = {
  backgroundTest: undefined
}

//fonts
let yoster;

let time;

let world;

const NUM_RING = 50;
let tunnel = [];

let wheel;

let meatBall;

let radar = [];

let item = {
  random: [],
  barrage: [],
  beam: [],
  wheelOfDoom: []
};

let spawner;

let rotator;

//sliders for debugging
let sliders = [];


/**
--
*/
function preload() {
  yoster = loadFont('assets/fonts/yoster.ttf');
  img.backgroundTest = loadImage('assets/images/backgroundTest.png');
}


/**
Description of setup
*/
function setup() {
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  background(0);

  //Creates the Physics engine and activates it
  world = new Physics();
  world.runWorld();

  //Creates the tunnel
  for (let i = 0; i < NUM_RING; i++) {
    let layer = i;
    let tunnelRing = new Tunnel(layer);
    tunnel.push(tunnelRing);
  }

  //Create the matter.js Wheel
  wheel = new Wheel();

  //Create the main playable body, behold the MEATBALL
  meatBall = new MeatBall(0, -10, 30);

  //Creates the Radar and the spawner
  radar[0] = new Radar({
    posX: tunnel[0].radius,
    posY: tunnel[0].radius,
    posZ: 0,
    amp: tunnel[0].radius
  });

  spawner = new Spawner({state: ''});
  rotator = new Rotator();

  //Creates sliders for debugging
  sliders[0] = new Slider({
    value: undefined,
    min: 0,
    max: 1,
    defaut: 0.8,
    step: 0.01,
    name: 'ballFriction',
    id: 0,
    callback: function (event) {
      meatBall.body.friction = sliders[0].update(0);
    }
  });
  sliders[1] = new Slider({
    value: undefined,
    min: 0,
    max: 1,
    defaut: 0.8,
    step: 0.01,
    name: 'wheelFriction',
    id: 1,
    callback: function (event) {
      wheel.compoundBody.friction = sliders[1].update(1);
    }
  });
  sliders[2] = new Slider({
    value: undefined,
    min: -5,
    max: 5,
    defaut: 1,
    step: 0.1,
    name: 'gravityY',
    id: 2,
    callback: function (event) {
      world.engine.gravity.y = sliders[2].update(2);
    }
  });
  sliders[3] = new Slider({
    value: undefined,
    min: 0,
    max: 1,
    defaut: 0.5,
    step: 0.01,
    name: 'ballFrictionStatic',
    id: 3,
    callback: function (event) {
      meatBall.body.frictionStatic = sliders[3].update(3);
    }
  });
  sliders[4] = new Slider({
    value: undefined,
    min: 0,
    max: 1,
    defaut: 0.5,
    step: 0.01,
    name: 'wheelFrictionStatic',
    id: 4,
    callback: function (event) {
      wheel.compoundBody.frictionStatic = sliders[4].update(4);
    }
  });
  sliders[5] = new Slider({
    value: undefined,
    min: 0.001,
    max: 0.5,
    defaut: 0.02,
    step: 0.001,
    name: 'wheelRotationSpeed',
    id: 5,
    callback: function (event) {
      wheel.wheelRotationSpeed = sliders[5].update(5);
    }
  });
  sliders[6] = new Slider({
    value: undefined,
    min: 0,
    max: 20,
    defaut: 2,
    step: 0.1,
    name: 'wheelJumpForce',
    id: 6,
    callback: function (event) {
      wheel.jumpForce = sliders[6].update(6);
    }
  });
  sliders[7] = new Slider({
    value: undefined,
    min: 0,
    max: 30,
    defaut: 10,
    step: 0.5,
    name: 'ItemSpeed',
    id: 7,
    callback: function (event) {
      for (let i = 0; i < item.length; i++) {
        item[i].speed.z = sliders[7].update(7);
      }

    }
  });
  sliders[8] = new Slider({
    value: undefined,
    min: 0,
    max: 1,
    defaut: 0.05,
    step: 0.005,
    name: 'radarSpeed',
    id: 8,
    callback: function (event) {
        radar.angle = sliders[8].update(8);
    }
  });
  sliders[9] = new Slider({
    value: undefined,
    min: 0,
    max: 1000,
    defaut: 25,
    step: 1,
    name: 'TunnelradiusOffset',
    id: 9,
    callback: function (event) {
      for (let i = 0; i < tunnel.length; i++) {
        tunnel[i].radiusOffset = sliders[9].update(9);
      }
    }
  });
  sliders[10] = new Slider({
    value: undefined,
    min: 0,
    max: 1,
    defaut: 0.1,
    step: 0.01,
    name: 'noiseProgressionSpeed',
    id: 10,
    callback: function (event) {
      for (let i = 0; i < tunnel.length; i++) {
        tunnel[i].noiseProgressionSpeed = sliders[10].update(10);
      }
    }
  });
}


/**
Description of draw()
*/
function draw() {
  background(0);
  time = frameCount/60;

  debuggingSlidersDisplay();

  //MeatBall Functions
  meatBall.display();

  //Wheel Functions
  wheel.display();
  wheel.rotate();
  wheel.storeCollisions();




  //Spawner Functions
  spawner.update();
  //Keep track of the Wheel rotation to be used by other objects with the ROTATORIZE
  rotator.update();

  //display and update Items
  items();

  //Tunel Functions
  //Tunnel and radar functions
  if (time > 0) { //Displays the tunnel after a time
    for (let i = 0; i < tunnel.length; i++) {
      tunnel[i].deploy();
      }
    for (let i = 0; i < radar.length; i++) {
      radar[i].display();
      radar[i].rotate();
    }

  }



  for (let i = 0; i < tunnel.length; i++) {
    //this interfere with the history thing and interestingly, alos with the wheel.compoundBody... so fuck the moment, fuck it.
    // let pos = rotator.rotatorize(tunnel[i].position);
    // tunnel[i].position.x = pos.x;
    // tunnel[i].position.y = pos.y;
    tunnel[i].display();
  }
  tunnel[0].update();
  tunnel[0].saveHistory();

  for (let i = tunnel[0].history.length - 1; i >= 1; i--) {
    tunnel[i].applyHistory(tunnel[0].history.length - i);
  }

  // imageMode(CENTER);
  // image(img.backgroundTest, 0, 0);
}

function items() {
  for (let i = 0; i < item.random.length; i++) {
    item.random[i].update();
    item.random[i].display();
    if (item.random[i].isOffScreen() || item.random[i].collision()) {
      item.random.splice(i, 1);
      i--; //the splice function removes and jacks everything back so I need to move back with the array before checking the IsOfScreen function again
    }
  }


  for (let i = 0; i < item.barrage.length; i++) {
    item.barrage[i].update();
    item.barrage[i].display();
    if (item.barrage[i].isOffScreen() || item.barrage[i].collision()) {
      item.barrage.splice(i, 1);
      i--;
    }
  }

  for (let i = 0; i < item.beam.length; i++) {
    item.beam[i].update();
    item.beam[i].display();
    if (item.beam[i].isOffScreen() || item.beam[i].collision()) {
      item.beam.splice(i, 1);
      i--;
    }
  }

  for (let i = 0; i < item.wheelOfDoom.length; i++) {
    item.wheelOfDoom[i].update();
    item.wheelOfDoom[i].display();
    if (item.wheelOfDoom[i].isOffScreen() || item.wheelOfDoom[i].collision()) {
      item.wheelOfDoom.splice(i, 1);
      i--;
    }
  }
}

function debuggingSlidersDisplay() {
  for (let i = 0; i < sliders.length; i++) {
    sliders[i].update(i);
  }
}

function keyPressed() {
  wheel.keyPressed();
  spawner.keyPressed();
}
