/**
Project 2 prototype
Lucien Cusson-Fradet

OK Create a tunnel with single layer
OK Add perlin noise
- Add an object that follows the tunnel edges based on a physics system
  - Gravity
  - Normal Force
  - Angular momentum
  - Friction
  !!NOPE. Will try using matter.js library instead!!
- Add a "jump" event
OK Make the tunnel a tunnel (3D perlin noise)
- Add a radar thing
- Spawn objects and make them follow the tunnel
- Collision with the main object
- Implement dithering effect!?

*/

"use strict";

let canvasWidth = 700;
let canvasHeight = 550;

let time;

const RING_NUM = 50;
let tunnel = [];

let meatBall;


/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  background(0);

  for (let i = 0; i < RING_NUM; i++) {
    let layer = i;
    let tunnelRing = new Tunnel(layer);
    tunnel.push(tunnelRing);
  }

  meatBall = new MeatBall();
}


/**
Description of draw()
*/
function draw() {
  background(0);
  time = frameCount/60;

  //Deploys the tunnel after an amount of time
  // if (time > 3) {
  //   for (let i = 0; i < tunnel.length; i++) {
  //     tunnel[i].deploy();
  //   }
  // }

  for (let i = 0; i < tunnel.length; i++) {
    tunnel[i].display();
    tunnel[i].rotate();
  }

  meatBall.move();
  meatBall.display();
}
