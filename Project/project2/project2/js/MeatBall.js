class MeatBall {
  constructor(x, y, size) {
    this.size = size;
    this.body = Bodies.circle(x, y, this.size);
    this.detail = 7;
  }

  addToWorld() {
    Composite.add(world, this.size);
  }

  display() {
    let pos = this.body.position;

    push();
    fill(255);
    noStroke();
    ellipseMode(CENTER);
    ellipse(pos.x, pos.y, this.size, this.size, this.detail);
    pop();
  }


}
