/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Our garden
let garden = {
  // An array to store the individual flowers
  flowers: [],
  // How many flowers in the garden
  numFlowers: 200,
  // The color of the grass (background)
  grassColor: {
    r: 120,
    g: 180,
    b: 120
  },
  // An array to our the bees
  bees: [],
  // How many bees in the garden
  numBees: 200,
};

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
  createCanvas(600, 600);

  // Create our flowers by counting up to the number of the flowers
  for (let i = 0; i < garden.numFlowers; i++) {
    // Create the congig properties of the new flower
    let config = {
      x: random(0, width),
      y: random(0, height),
      size: random(50, 80),
      stemLength: random(50, 100),
      stemThickness: random(5, 15),
      petalThickness: random(20, 25),
      // Color information
      stemColor: {
        r: 50,
        g: random(100, 200),
        b: 50
      },
      petalColor: {
        r: random(100, 255),
        g: random(100, 255),
        b: random(50, 150)
      },
      centreColor: {
        r: random(50, 100),
        g: 0,
        b: 0
      }
    };

    //creates the new Flower object using the config variables as arguments
    let flower = new Flower(config);
    // Add the flower to the array of flowers
    garden.flowers.push(flower);
    }

    // Create our bees by counting up to the number of bees
  for (let i = 0; i < garden.numBees; i++) {
    // Create variables for our arguments for clarity
    let x = random(0, width);
    let y = random(0, height);
    // Create a new bee using the arguments
    let bee = new Bee(x, y);
    // Add the bee to the array of bees
    garden.bees.push(bee);
  }

  garden.flowers.sort(sortByY);
}

function sortByY(flower1, flower2) { //??? Is it because it's a class that you can call flower1 and flower2 ???
  return flower1.y - flower2.y;
}

/**
Description of draw()
*/
function draw() {
  // Display the grass
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

  // Loop through all the flowers in the array and display them
  for (let i = 0; i < garden.flowers.length; i++) {
    let flower = garden.flowers[i];
    flower.display();
    // Check if this flower is alive
    if (flower.alive) {
      // Update the flower by shrinking it and displaying it
      flower.shrink();
      flower.display();
    }
  }

  for (let i = 0; i < garden.bees.length; i++) {
    let bee = garden.bees[i];
    // Check if this flower is alive
    if (bee.alive) {
      // Shrink and move the bee
      bee.shrink();
      bee.move();

      // NEW! Go through the entire flower array and try to pollinate the flowers!
      // Note that we use j in our for-loop here because we're already inside
      // a for-loop using i!
      for (let j = 0; j < garden.flowers.length; j++) {
        let flower = garden.flowers[j];
        bee.tryToPollinate(flower);
      }

      // Display the bee
      bee.display();
    }
  }
}

function mousePressed() {
  for (let i = 0; i < garden.flowers.length; i++) {
    let flower = garden.flowers[i];
    flower.mousePressed();
  }
}
