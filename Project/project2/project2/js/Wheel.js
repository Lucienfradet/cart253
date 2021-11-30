class Wheel {
  constructor() {
    this.NUM_PARTS = 30;
    this.parts = [];
    this.body;
    this.startingFriction;
    this.h = 40;
    this.radius = tunnel[0].radius + this.h;
    this.w = TWO_PI * this.radius / this.NUM_PARTS;

    this.constraint;
    this.constraintOptions = {
      pointA: { x: 0, y: 0 },
      bodyB: this.body,
      pointB: { x: -10, y: -10 },
      stiffness: 0.7,
      length: 5
    };
  }

  createWheel() {
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
             isStatic: false
            }
        };
        let circle = this.addRect(config);

        this.parts.push(circle);
      }


    //Create a Constraint
    this.constraint = Constraint.create(this.constraintOptions);
    World.add(world.world, this.constraint);

    this.createBody(this.parts);

  }

  addRect({ x, y, w, h, options = {} }) {
	let body = Bodies.rectangle(x, y, w, h, options);
	this.addBody(body);
	return body;
  }

  addBody(body) {
    World.add(world.world, body);
  }

  createBody(parts) {
    this.body = Body.create({ parts: parts, isStatic: true, friction: this.startingFriction });
  }

  display() {
    for (let i = 1; i <= this.NUM_PARTS; i++) { //Starting at 1 because the createBody function pushes the whole array and inserts a "self reference to the current body instance" in the [0] spot
      let pos = this.parts[i].position;
      let angle = this.parts[i].angle;

      push();
      translate(pos.x, pos.y);
      rotate(angle);
      rectMode(CENTER);
      fill(177);
      strokeWeight(1);
      stroke(255);
      rect(0, 0, this.w, this.h);
      line(this.constraint.pointA.x, this.constraint.pointA.y, this.body.position.x, this.body.position.x);
      pop();
      //console.log(this.body.position.y);
    }
  }

  sautillance() {
    if (keyIsDown(32)) { //SpaceBar

    }
  }
}
