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
    r: 179,
    g: 255,
    b: random(150, 255),
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
    cohesion(particles[i]);
    displayParticle(particles[i]);

  }

  // saveCanvas('capture' + frameCount);
  // if (frameCount > 60 * 5) {
  //   noLoop();
  //}
  //capturer.capture(document.getElementById('defaultCanvas0'));
  //saveFrames('out', 'png', 1, 25, data => {print(data);});
}

function moveParticle(particle) {
  let choice = random();
  if (choice < 0.01) {
    particle.speedV = p5.Vector.random3D();
    particle.speedV.setMag(random(1, 2));
  }

  let steering = cohesion(particle);
  particle.speedV.add(steering);
  particle.positionV.add(particle.speedV);

  //Creates a Trail
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

function cohesion(particle) {
  let perceptionRadius = 50;
  let steering = createVector();
  let total = 0;

  for (let i = 0; i < particle.length; i++) {
    for (let j = 0; j < particle.length; j++) {
      let d = dist(particle[i].x, particle[i].y, particle[j].x, particle[j].y);

      if (particle[i] !== particle[j] && d < perceptionRadius) {
        steering.add(particle[j].speedV);
        total++
      }
    }

    if (total > 0) {
      steering.div(total);
      steering.setMag(2);
      steering.sub(particle[i].speedV);
    }
  }
  return steering;
}

function displayParticle(particle) {
  push();
  for (let i = 0; i < particle.trail.length; i++) {
    let trail = particle.trail[i];
    strokeWeight(3);
    let alpha = map(i, 0, particle.trail.length, 255, 0);
    stroke(particle.r - alpha, particle.g - alpha, particle.b - alpha);
    point(trail.x, trail.y, trail.z);
  }
  pop();

  push();
  stroke(particle.r, particle.g, particle.b);
  strokeWeight(3);
  point(particle.positionV.x, particle.positionV.y, particle.positionV.z);
  pop();
}
