class Wheel {
  constructor() {
    //Parameters to create the Wheel obect
    this.NUM_PARTS = 20;
    this.parts = [];
    this.compoundBody;
    this.composite;
    this.startingFriction;
    this.h = 40;
    this.radius = tunnel[0].radius + this.h;
    this.w = TWO_PI * this.radius / this.NUM_PARTS;
    this.wheelRotationSpeed = 0.02;

    //Creates a rectangle body for every part of the wheel
    for(let i = 0; i < this.NUM_PARTS; i++) {
        let angle = i / this.NUM_PARTS * TWO_PI;
        let x = cos(angle);
        let y = sin(angle);
        let cx = x * this.radius;
        let cy = y * this.radius;
        let config = {
          x: cx,
          y: cy,
          w: this.w,
          h: this.h,
          options: {
             angle: angle,
             isStatic: false,
             inertia: Infinity //Prevents the parts from rotating on their axies! Merci jésus marie joseph bonne enfant.
            }
        };
        //Function that creates the bodies
        let square = this.addRect(config);
        this.parts.push(square);
      }

    //Create the compoundBody with the different parts
    this.createBody(this.parts);

    //Parameters fot the center joint constraint
    this.constraint;
    this.constraintOptions = {
      pointA: { x: 0, y: 0 },
      bodyB: this.compoundBody,
      pointB: { x: 0, y: 0 },
      stiffness: 0.01,
      length: 0
    }

    //Create a Constraint
    this.constraint = Constraint.create(this.constraintOptions);
    //World.add(world.world, this.constraint);

    this.composite = Composite.create();
    this.composite = Composite.add(world.world, [this.compoundBody, this.constraint]);
    console.log(this.constraint);

  }

  addRect({ x, y, w, h, options = {} }) {
	let body = Bodies.rectangle(x, y, w, h, options);
	//this.addBody(body);
	return body;
  }

  addBody(body) {
    World.add(world.world, body);
  }

  createBody(parts) {
    this.compoundBody = Body.create({ parts: parts });
    //Body.setParts(this.compoundBody, parts);
    //this.addBody(this.body);

    console.log(this.compoundBody);
  }

  display() {
    for (let i = 1; i <= this.NUM_PARTS; i++) { //Starting at 1 because the createBody function pushes the whole array and inserts a "self reference to the current body instance" in the [0] spot
      let pos = this.parts[i].position;
      let angle = this.parts[i].angle;

      push();
      translate(pos.x, pos.y);
      rotate(angle - this.compoundBody.angle);
      rectMode(CENTER);
      fill(177);
      strokeWeight(1);
      stroke(255);
      rect(0, 0, this.w, this.h);
      pop();
    }

    //Visualisation of the constraint as a line
    push();
    stroke(255);
    line(this.constraint.pointA.x, this.constraint.pointA.y, this.compoundBody.position.x, this.compoundBody.position.y);
    pop();
  }

  rotate() {
    if (keyIsDown(65)) { //A key
      Body.setAngularVelocity(this.compoundBody, -this.wheelRotationSpeed);
    }

    if (keyIsDown(68)) { //D key
      Body.setAngularVelocity(this.compoundBody, this.wheelRotationSpeed);
    }
  }

  keyPressed() {
    if (keyCode === 32) { //SpaceBar
      Body.applyForce( this.compoundBody, {x: this.compoundBody.position.x, y: this.compoundBody.position.y}, {x: 0, y: -5} );
      console.log('caca');
    }
  }
}
