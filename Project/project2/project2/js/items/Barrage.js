class Barrage extends Item {
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
    this.go = false;
  }

  update() {
    //follow the tunnel on the Z axis
    this.position.add(this.speed);
    super.followTunnel();

    //Checks if the items are moving and start the spawner again
    for (let i = 0; i < item.barrage.length; i++) {
      if (item.barrage[i].go && item.barrage[i].id === 'barrage' + spawner .counter) {
        this.activate();
        item.barrage[i + 1].go = false;
      }
    }

    if (spawner.state !== 'barrage') {
      for (let i = 0; i < item.barrage.length; i++) {
        item.barrage[i].speed.z = 20;
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

  activate() {
    radar[0].angle = 0;
    spawner.reseted = false;
    spawner.delay = 0;
    spawner.counter++;
    spawner.state = 'barrage';
  }
}
