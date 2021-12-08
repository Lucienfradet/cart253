//Items to be used in a weird whirlwind formation

class Hole extends Item {
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
    this.go = false;
  }

  update() {
    //follow the tunnel on the Z axis
    this.position.add(this.speed);
    super.followTunnel();

    //Checks if the items are moving and start the spawner again
    for (let i = 0; i < item.hole.length; i++) {
      if (item.hole[i].go && item.hole[i].id === 'hole' + spawner .counter) {
        state.hole();
        item.hole[i + 1].go = false; //Makes sure it doesn't happen again in the same forLoop
      }
    }

    //Moves last items and wipes radars if the state changes
    if (spawner.state !== 'hole') {
      wipeRadar();
      for (let i = 0; i < item.hole.length; i++) {
        item.hole[i].speed.z = 20;
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
