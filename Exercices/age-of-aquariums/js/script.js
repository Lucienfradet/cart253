/**
3D aquarium?
Lucien Cusson-Fradet

Add a trail for each object
Flock movements
colors
and contrain in a box!?
*/

"use strict";
let canvasWidth = 900;
let canvasHeight = 600;

let rotationAngle = 0;

const NUM_PARTICLES = 3000;
let particles = [];

/**
Description of preload
*/
function preload() {
  for (let i = 0; i < NUM_PARTICLES; i++) {
    let particle = createParticle();
    particles.push(particle);
  }
}

function createParticle() {
  let particle = {
    positionV: createVector(0, 0, 0),
    speedV: p5.Vector.random3D(),
    accelerationV: createVector(),
  }
  particle.speedV.setMag(random(1, 2));

  return particle;
}

/**
Description of setup
*/
function setup() {
  createCanvas(canvasWidth, canvasHeight ,WEBGL);
  background(0);
}

/**
Description of draw()
*/
function draw() {
  background(0);
  for (let i = 0; i < particles.length; i++) {
    moveParticle(particles[i]);
    displayParticle(particles[i]);
  }

  rotate(radians(rotationAngle));
  rotationAngle += 5;
}

function moveParticle(particle) {
  let choice = random();
  if (choice < 0.01) {
    particle.speedV = p5.Vector.random3D();
    particle.speedV.setMag(random(1, 2));
  }

  particle.positionV.limit(200);
  //constrain(particle.positionV.x, -100, 100);
  particle.positionV.add(particle.speedV);

}

function displayParticle(particle) {
  push();
  stroke(255);
  strokeWeight(3);
  point(particle.positionV.x, particle.positionV.y, particle.positionV.z);
  pop();
}
