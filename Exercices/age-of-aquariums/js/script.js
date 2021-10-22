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
let canvas;

let alignmentSlider, cohesionSlider, separationSlider;
let msg1, msg2, msg3;

let rotationAngle = 0;

const NUM_PARTICLES = 200;
let particles = [];

let aquarium = {
  x1: -150,
  x2: 150,
  y1: -100,
  y2: 100,
  z1: -100,
  z2: 100
}

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
    positionV: createVector(random(aquarium.x1, aquarium.x2), random(aquarium.y1, aquarium.y2), random(aquarium.z1, aquarium.z2)),
    //positionV: createVector(random(), random(), random()),
    speedV: p5.Vector.random3D(),
    accelerationV: createVector(),
    maxForce: 1,
    maxSpeed: 4,
    visionRadius: 5,
    r: 179,
    g: 255,
    b: random(150, 255),
    trail: [],
    maxTrail: 5
  }
  particle.speedV.setMag(random(2, 4));

  return particle;
}

/**
Description of setup
*/
function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight ,WEBGL);
  canvas.position(200, 200);
  background(0);
  alignmentSlider = createSlider(0, 2, 1.6, 0.1);
  alignmentSlider.position(70, 70);
  cohesionSlider = createSlider(0, 2, 0.1, 0.1);
  cohesionSlider.position(70, 100);
  separationSlider = createSlider(0, 2, 1.4, 0.1);
  separationSlider.position(70, 130);

  msg1 = createP('Separation');
  msg1.position(210, 130-15);
  msg2 = createP('Cohesion');
  msg2.position(210, 100-15);
  msg3 = createP('Alignment');
  msg3.position(210, 70-15);

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

  // saveCanvas('capture' + frameCount);
  // if (frameCount > 60 * 5) {
  //   noLoop();
  //}
  //capturer.capture(document.getElementById('defaultCanvas0'));
  //saveFrames('out', 'png', 1, 25, data => {print(data);});
}

function moveParticle(particle) {
  //Random movements
  // let choice = random();
  // if (choice < 0.01) {
  //   particle.speedV = p5.Vector.random3D();
  //   particle.speedV.setMag(random(0.5, 5));
  // }

  //Constrain to a Box
  let currentVx = constrain(particle.positionV.x, aquarium.x1, aquarium.x2);
  let currentVy = constrain(particle.positionV.y, aquarium.y1, aquarium.y2);
  let currentVz = constrain(particle.positionV.z, aquarium.z1, aquarium.z2);
  particle.positionV = createVector(currentVx, currentVy, currentVz);

  //loop in a Box
  // if (particle.positionV.x > aquarium.x2) {
  //   particle.positionV.x = aquarium.x1;
  // }
  // if (particle.positionV.x < aquarium.x1) {
  //   particle.positionV.x = aquarium.x2;
  // }
  //
  // if (particle.positionV.y > aquarium.y2) {
  //   particle.positionV.y = aquarium.y1;
  // }
  // if (particle.positionV.y < aquarium.y1) {
  //   particle.positionV.y = aquarium.y2;
  // }
  //
  // if (particle.positionV.z > aquarium.z2) {
  //   particle.positionV.z = aquarium.z1;
  // }
  // if (particle.positionV.z < aquarium.z1) {
  //   particle.positionV.z = aquarium.z2;
  // }

  //Creates a trail
  let newTrailPosition = createVector(particle.positionV.x, particle.positionV.y, particle.positionV.z);
  particle.trail.push(newTrailPosition);

  if (particle.trail.length > particle.maxTrail) {
    particle.trail.shift();
  }

  //Update the accelerationV
  particle.accelerationV.add(alignment(particle));
  particle.accelerationV.add(cohesion(particle));
  particle.accelerationV.add(separation(particle));

  //update the speed and position
  particle.positionV.add(particle.speedV);
  particle.speedV.add(particle.accelerationV);
  particle.speedV.limit(particle.maxSpeed);
  particle.accelerationV.mult(0); //reset the accelerationV

  //console.log(`particles[0].speedV): ${particles[0].speedV}`)
}

function alignment(particle) {
  let perceptionRadius = particle.visionRadius;
  let steering = createVector();
  let total = 0;

  for (let i = 0; i < particles.length; i++) {
    let d = dist(particle.positionV.x, particle.positionV.y, particles[i].positionV.x, particles[i].positionV.y);
    if (particle !== particles[i] && d < perceptionRadius) {
      steering.add(particles[i].speedV);
      total++;
    }
  }

  if (total > 0) {
    steering.div(total);
    steering.setMag(particle.maxSpeed);
    steering.sub(particle.speedV);
    steering.limit(particle.maxForce);
  }
  steering.mult(alignmentSlider.value());
  return steering;
}

function cohesion(particle) {
  let perceptionRadius = particle.visionRadius;
  let steering = createVector();
  let total = 0;

  for (let i = 0; i < particles.length; i++) {
    let d = dist(particle.positionV.x, particle.positionV.y, particles[i].positionV.x, particles[i].positionV.y);
    if (particle !== particles[i] && d < perceptionRadius) {
      steering.add(particles[i].positionV);
      total++;
    }
  }

  if (total > 0) {
    steering.div(total);
    steering.sub(particle.positionV);
    steering.setMag(particles.maxSpeed);
    steering.sub(particle.speedV);
    steering.limit(particle.maxForce);
  }
  steering.mult(cohesionSlider.value());
  return steering;
}

function separation(particle) {
  let perceptionRadius = particle.visionRadius;
  let steering = createVector();
  let total = 0;

  for (let i = 0; i < particles.length; i++) {
    let d = dist(particle.positionV.x, particle.positionV.y, particles[i].positionV.x, particles[i].positionV.y);
    if (particle !== particles[i] && d < perceptionRadius) {
      let difference = p5.Vector.sub(particle.positionV, particles[i].positionV);
      difference.div(d); //inversly proportional to the distance of the other particle
      steering.add(difference);
      total++;
    }
  }

  if (total > 0) {
    steering.div(total);
    steering.setMag(particles.maxSpeed);
    steering.sub(particle.speedV);
    steering.limit(particle.maxForce);
  }
  steering.mult(separationSlider.value());
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
  noFill();
  box(aquarium.x2*2, aquarium.y2*2, aquarium.z2*2)
  pop();
}
