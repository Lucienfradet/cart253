//Items to be used by the random spawn function

class Random extends Item {
  constructor({
    x,
    y,
    z,
    speed,
    size,
    strokeWeight,
    id,
    color
  }) {

    super();
    this.position = createVector(x, y, z);
    this.speed = createVector(0, 0, speed);
    this.size = size;
    this.strokeWeight = strokeWeight;
    this.id = id;
    this.color = color;
  }

  update() {
    //follow the tunnel on the Z axis
    this.position.add(this.speed);

    super.followTunnel();
  }

  display() {
    push();
    noFill();
    strokeWeight(this.strokeWeight);
    stroke(this.color);
    translate(this.position.x, this.position.y, this.position.z);
    ellipse(0, 0, this.size);
    pop();
  }

  activate() {
    spawner.delay = 0;
    spawner.reseted = false;
    spawner.state = 'random';
  }
}
