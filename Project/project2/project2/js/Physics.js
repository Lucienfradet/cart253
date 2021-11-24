/* ---> matter.js <--- PHYSICS ENGINE */

//module aliases for matter.js
let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Runner = Matter.Runner;

class Physics {
  constructor() {
    this.engine = Engine.create();
    this.world = this.engine.world;
    this.runner = Runner.create();
  }

  runWorld() {
    Runner.run(this.runner, this.engine);
  }
}
