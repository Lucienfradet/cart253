class Wheel {
  constructor() {
    this.NUM_PARTS = 30;
    this.parts = [];
    this.body;
    this.friction;
    this.h = 40;
    this.radius = tunnel[0].radius + this.h;
    this.w = TWO_PI * this.radius / this.NUM_PARTS;
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
             isStatic: true
            }
        }
        let circle = this.addRect(config);

        this.parts.push(circle);
      }

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
    this.body = Body.create({ parts: parts, isStatic: true, friction: this.friction });
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
      pop();
    }

  }
}
