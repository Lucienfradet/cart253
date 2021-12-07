class WheelOfDoom extends Item {
  constructor({
    x,
    y,
    z,
    speed,
    size,
    strokeWeight,
    id,
    color,
    rotationSpeed
  }) {

    super();
    this.position = createVector(x, y, z);
    this.speed = createVector(0, 0, speed);
    this.size = size;
    this.strokeWeight = strokeWeight;
    this.id = id;
    this.color = color;
    this.rotationSpeed = rotationSpeed;
  }

  update() {
    let rotVector = createVector(this.position.x, this.position.y);
    rotVector.rotate(this.rotationSpeed);
    this.position.x = rotVector.x;
    this.position.y = rotVector.y;
    //follow the tunnel on the Z axis
    this.position.add(this.speed);
    super.followTunnel();
    if (spawner.state !== 'wheelOfDoom') {
      for (let i = 1; i < radar.length; i++) {
        radar.splice(i, 1);
        i--;
      }
    }
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
}
