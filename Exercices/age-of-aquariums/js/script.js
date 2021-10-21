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
    trail: [],
    maxTrail: 0
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

  //var fps = 60;

  //var capturer = new CCapture({ format: 'png', framerate: fps});

  //capturer.start();
}

/**
Description of draw()
*/
function draw() {
  background(0);
  rotateY(radians(rotationAngle));
  rotationAngle += 0.5;

  for (let i = 0; i < particles.length; i++) {
    moveParticle(particles[i]);
    displayParticle(particles[i]);
  }

  //capturer.capture(document.getElementById('defaultCanvas0'));
  //saveFrames('out', 'png', 1, 25, data => {print(data);});
}

function moveParticle(particle) {
  let choice = random();
  if (choice < 0.01) {
    particle.speedV = p5.Vector.random3D();
    particle.speedV.setMag(random(1, 2));
  }

  particle.positionV.add(particle.speedV);

  let currentVx = constrain(particle.positionV.x, -150, 150);
  let currentVy = constrain(particle.positionV.y, -100, 100);
  let currentVz = constrain(particle.positionV.z, -100, 100);
  particle.positionV = createVector(currentVx, currentVy, currentVz);

  let newTrailPosition = createVector(particle.positionV.x, particle.positionV.y, particle.positionV.z);
  particle.trail.push(newTrailPosition);

  if (particle.trail.length > particle.maxTrail) {
    particle.trail.shift();
  }
}

function displayParticle(particle) {
  push();
  for (let i = 0; i < particle.trail.length; i++) {
    let trail = particle.trail[i];
    strokeWeight(3);
    let alpha = map(i, 0, particle.trail.length, 0, 255);
    stroke(alpha);
    point(trail.x, trail.y, trail.z);
  }
  pop();

  push();
  stroke(255);
  strokeWeight(3);
  point(particle.positionV.x, particle.positionV.y, particle.positionV.z);
  pop();

}
