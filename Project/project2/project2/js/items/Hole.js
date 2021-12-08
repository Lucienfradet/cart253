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
        this.activate();

        item.hole[i + 1].go = false;
      }
    }

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

  activate() {
    wipeRadar();
    spawner.delay = 0;
    spawner.counter++;

    for (let i = 1; i < 4; i++) {
      let newRadar = new Radar({
        posX: radar[0].position.x,
        posY: radar[0].position.y,
        posZ: 0,
        amp: tunnel[0].radius - i * 40
      });
      radar.push(newRadar)
    }
    spawner.state = 'hole';
  }
}
