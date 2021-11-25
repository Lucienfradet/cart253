/**
Project 2 prototype
Lucien Cusson-Fradet

I ran out of time doing the prototype. Parts of it ended up being more complicated than anticipated.
This serves as a basic representation of the visuals that the game will have.

At the moment, it is possible to rotate the tunnel using A and D keys.


TODO LIST:
- Create matter.js objects for matter.js
- Visualise the objects with p5.js
- tweak the parameters so the controls feel nice
- Spawn objects and make them follow the tunnel
- Collision with the main object
- Implement a life system
- Add different functions like a ring of spikes that you have to jump over
- Implement States as objects

- Implement dithering effect!?

*/

"use strict";
let canvasWidth = 700;
let canvasHeight = 550;

//fonts
let yoster;

let time;

let world;

const NUM_RING = 50;
let tunnel = [];

let wheel;

let meatBall;

let radar;

let item;

//sliders for debugging
let sliders = [];


/**
--
*/
function preload() {
  yoster = loadFont('assets/fonts/yoster.ttf');
}


/**
Description of setup
*/
function setup() {
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  background(0);

  world = new Physics();
  world.runWorld();
  console.log(world.engine);

  for (let i = 0; i < NUM_RING; i++) {
    let layer = i;
    let tunnelRing = new Tunnel(layer);
    tunnel.push(tunnelRing);
  }

  wheel = new Wheel();
  wheel.createWheel();

  meatBall = new MeatBall(0, 0, 30);

  radar = new Radar();

  sliders[0] = new Slider({
    value: undefined,
    min: 0,
    max: 1,
    defaut: 0.8,
    step: 0.01,
    name: 'ballFriction'
  });
  sliders[1] = new Slider({
    value: undefined,
    min: 0,
    max: 1,
    defaut: 0.1,
    step: 0.01,
    name: 'wheelFriction'
  });
  sliders[2] = new Slider({
    value: undefined,
    min: -5,
    max: 5,
    defaut: 1,
    step: 0.1,
    name: 'gravityY'
  });
  sliders[3] = new Slider({
    value: undefined,
    min: 0,
    max: 1,
    defaut: 0.5,
    step: 0.01,
    name: 'ballFrictionStatic'
  });
  sliders[4] = new Slider({
    value: undefined,
    min: 0,
    max: 1,
    defaut: 0.5,
    step: 0.01,
    name: 'wheelFrictionStatic'
  });
}


/**
Description of draw()
*/
function draw() {
  background(0);
  time = frameCount/60;

  //debuggingSliders();

  wheel.display();

  meatBall.display();

  // Deploys the tunnel after an amount of time
  // if (time > 5) {
  //   for (let i = 0; i < tunnel.length; i++) {
  //     tunnel[i].deploy();
  //     radar.display();
  //     radar.rotate();
  //   }
  // }

  // let r = random();
  // if (r < 0.1) {
  //   item = new Item(radar.position.x, radar.position.y, radar.position.z);
  // }

  //item.display();
  //item.followTunnel();

  for (let i = 0; i < tunnel.length; i++) {
    tunnel[i].display();
    tunnel[i].rotate();
  }
}

function debuggingSliders() {
    meatBall.friction = sliders[0].display(0);
    wheel.friction = sliders[1].display(1);
    world.engine.gravity.y = sliders[2].display(2);
    meatBall.frictionStatic = sliders[3].display(3);
    wheel.frictionStatic = sliders[4].display(4);
}
