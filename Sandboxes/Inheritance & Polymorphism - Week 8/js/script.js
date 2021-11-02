/**
Sandbox about Inheritance and Polymorphism
Lucien Cusson-Fradet
*/

"use strict";

let cars = [];
const NUM_CARS = 5;

let motos = [];
const NUM_MOTO = 10;

/**
Description of setup
*/
function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < NUM_CARS; i++) {
    let x = random(0, width);
    let y = random(50, height - 50);
    let car = new Car(x, y);
    cars.push(car);
  }


  for (let i = 0; i < NUM_MOTO; i++) {
    let x = random(0, width);
    let y = random(50, height - 50);
    let moto = new Moto(x, y);
    motos.push(moto);
  }
}


/**
Description of draw()
*/
function draw() {
  background(0);

  for (let i = 0; i < cars.length; i++) {
    cars[i].move();
    cars[i].wrap();
    cars[i].display();
  }

  for (let i = 0; i < motos.length; i++) {
    motos[i].move();
    motos[i].wrap();
    motos[i].display();
  }
}
