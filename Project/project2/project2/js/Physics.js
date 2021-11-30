/* ---> matter.js <--- PHYSICS ENGINE */

//module aliases for matter.js
let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Runner = Matter.Runner,
    Constraint = Matter.Constraint;

class Physics {
  constructor() {
    this.engine = Engine.create({ gravity: {y: 1} });
    this.world = this.engine.world;
    this.runner = Runner.create();
  }

  runWorld() {
    Runner.run(this.engine);
  }
}
