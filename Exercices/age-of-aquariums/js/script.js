/**
3D aquarium?
Lucien Cusson-Fradet

Flocking Simulation based on Craig Reynolds' theory.
A small GameMode can be activated by pressing leftMouse
*/

"use strict";
let canvasWidth = 900;
let canvasHeight = 600;
let canvas;

//Game info
let gameState = false;
let frames = 0;

//Sliders to change the parameters of the simulation
let alignmentSlider, cohesionSlider, separationSlider;
let msg1, msg2, msg3, msg4;

//state of the simulation
let state = `showingOff`

//object controlled by the mouse
let souris = {
  x: undefined,
  y: undefined,
  z: 0,
  listener: undefined,
  display: false,
  radius: 15,
  detailX: 6,
  detailY: 6,
  counterOfConverted: 0
}

let rotationAngle = 0;

//Array of particles
const NUM_PARTICLES = 50;
let particles = [];

let aquarium = {
  x1: -150,
  x2: 150,
  y1: -100,
  y2: 100,
  z1: -100,
  z2: 100,
  smallFactor: 5
}

/**
Create the array of particles
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
    visionRadius: 30,
    r: 179,
    g: 255,
    b: random(150, 255),
    trail: [],
    maxTrail: 3,
  }
  particle.speedV.setMag(random(2, 4));

  return particle;
}

/**
Positions the canvas, the sliders and the text that explain the simulation
*/
function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight ,WEBGL);
  canvas.position(200, 200);
  canvas.mouseWheel(sourisZposition);
  background(0);
  alignmentSlider = createSlider(0, 2, 1, 0.1); //1.6 0.1 1.4
  alignmentSlider.position(70, 70);
  cohesionSlider = createSlider(0, 2, 0.9, 0.1);
  cohesionSlider.position(70, 100);
  separationSlider = createSlider(0, 2, 1, 0.1);
  separationSlider.position(70, 130);

  msg1 = createP('Separation');
  msg1.position(210, 130-15);
  msg2 = createP('Cohesion');
  msg2.position(210, 100-15);
  msg3 = createP('Alignment');
  msg3.position(210, 70-15);

  msg4 = createP(`Simulation d'aquarium utilisant les principes de "Flocking" de Craig Reynolds. Il est possible d'influencer les différents paramètres des poissons grâce aux barres de défilements ci-dessous.
<p/><p>Le clic gauche de la souris active un mode ou vous disposez de 60 secondes pour changer la couleur de tous les poissons et ainsi, libérer ces derniers. Échouez et l'aquarium deviendra ridiculement plus petit. (Utilisez le curseur et la roulette de souris)
`);
  msg4.position(15, -10);
  //var fps = 60;

  //var capturer = new CCapture({ format: 'png', framerate: fps});

  //capturer.start();
}

/**
Description of draw()
*/
function draw() {
  background(0);

  //Move the timer forward if the player is playing
  if (gameState === true && state === `mouse`) {
    frames++;
  }

  //The game is won if all the particles are turned red
  if (souris.counterOfConverted >= particles.length) {
    state = `freedom`;
  }

  //The game is failed if the timer runs out
  if (frames > 1800*2 && state !== `worse`) {
    state = `worse`;
    aquarium.x1 /= aquarium.smallFactor;
    aquarium.y1 /= aquarium.smallFactor;
    aquarium.z1 /= aquarium.smallFactor;
    aquarium.x2 /= aquarium.smallFactor;
    aquarium.y2 /= aquarium.smallFactor;
    aquarium.z2 /= aquarium.smallFactor;
  }

  switch (state) {
    case `showingOff`:
      push();
      rotateY(radians(rotationAngle));
      rotationAngle += 0.5;
      displayAquarium();

      for (let i = 0; i < particles.length; i++) {
        moveParticle(particles[i]);
        displayParticle(particles[i]);
      }
      pop();
      break;

    case `mouse`: //GameMode
      sourisDisplay();

      push();
      rotateY(radians(rotationAngle));
      rotationAngle += 0.5;
      displayAquarium();

      for (let i = 0; i < particles.length; i++) {
        runAway(particles[i]);
        moveParticle(particles[i]);
        displayParticle(particles[i]);
      }
      pop();
      break;

    case `freedom`: //Win
      push();
      rotateY(radians(rotationAngle));
      rotationAngle += 0.5;

      for (let i = 0; i < particles.length; i++) {
        moveParticle(particles[i]);
        displayParticle(particles[i]);
      }
      pop();
      break;

    case `worse`: //Lose
      push();
      rotateY(radians(rotationAngle));
      rotationAngle += 0.5;
      displayAquarium();
      for (let i = 0; i < particles.length; i++) {
        moveParticle(particles[i]);
        displayParticle(particles[i]);
      }
      pop();
      break;



  }

  // saveCanvas('capture' + frameCount);
  // if (frameCount > 60 * 5) {
  //   noLoop();
  //}
  //capturer.capture(document.getElementById('defaultCanvas0'));
  //saveFrames('out', 'png', 1, 25, data => {print(data);});
}

//Controls the movement of the particles and restrain them to the aquarium
function moveParticle(particle) {
  //Random movements
  // let choice = random();
  // if (choice < 0.01) {
  //   particle.speedV = p5.Vector.random3D();
  //   particle.speedV.setMag(random(0.5, 5));
  // }

  //Constrain to a Box
  if (state !== `freedom`) {
    let currentVx = constrain(particle.positionV.x, aquarium.x1, aquarium.x2);
    let currentVy = constrain(particle.positionV.y, aquarium.y1, aquarium.y2);
    let currentVz = constrain(particle.positionV.z, aquarium.z1, aquarium.z2);
    particle.positionV = createVector(currentVx, currentVy, currentVz);
  }


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

//The three parameters that allow Flocking and that are additioned to the accelerationVector of the particles
function alignment(particle) {
  let perceptionRadius = particle.visionRadius;
  let steering = createVector();
  let total = 0;

  //Checks if other particles are in the perception radius and steer in the same direction as the others
  for (let i = 0; i < particles.length; i++) {
    let d = dist(particle.positionV.x, particle.positionV.y, particle.positionV.z, particles[i].positionV.x, particles[i].positionV.y, particles[i].positionV.z);
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

  //Checks if other particles are in the perception radius and steer towards the particles
  for (let i = 0; i < particles.length; i++) {
    let d = dist(particle.positionV.x, particle.positionV.y, particle.positionV.z, particles[i].positionV.x, particles[i].positionV.y, particles[i].positionV.z);
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

  //Checks if other particles are in the perception radius and steer away from the average location of all the others
  for (let i = 0; i < particles.length; i++) {
    let d = dist(particle.positionV.x, particle.positionV.y, particle.positionV.z, particles[i].positionV.x, particles[i].positionV.y, particles[i].positionV.z);
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

//Changes the color of the particles that get moused by the player
function runAway(particle) {
  let thing = createVector(mouseX + souris.radius - width/2, mouseY + souris.radius - height/2, souris.z + souris.radius);
  let d = dist(particle.positionV.x, particle.positionV.y, thing.x, thing.y);

  if (d < souris.radius && particle.r !== 255) {
    particle.r = 255;
    particle.g = 0;
    particle.b = 0;
    souris.counterOfConverted++;
  }
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

function displayAquarium() {
  push();
  if (state === `showingOff`) {
    stroke(255);
  }
  else {
    stroke(255, 0, 0);
  }
  noFill();

  box(aquarium.x2*2, aquarium.y2*2, aquarium.z2*2)
  pop()

}

//the sphere that represents the mouse
function sourisDisplay() {
  push();
  fill (200, 150, 150);
  noStroke();
  translate(mouseX + radians(rotationAngle) - width/2, mouseY + radians(rotationAngle) - height/2, souris.z + radians(rotationAngle));
  noCursor();
  sphere(souris.radius, souris.detailX, souris.detailY);
  pop();
  //console.log(`mouseX ${mouseX}`);
}

//Swithes between gameMode and Simulation Mode
function mousePressed() {
  if (mouseX > 0 && mouseY > 0) {
    gameState = true;
    if (state !== `worse` && gameState) {
      if (state === `showingOff`) {
        state = `mouse`;
      }
      else {
        state = `showingOff`;
      }
    }
  }
}

//Chnages the souris.z with the mouseWheel
function sourisZposition(event) {

  if (event.deltaY > 0) {
    souris.z+=50;
  }
  else {
    souris.z-=50;
  }
}
