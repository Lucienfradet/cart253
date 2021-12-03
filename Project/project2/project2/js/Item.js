//Not implemented at all
//These will be the items that the radar will spawm and that the MeatBall will have to avoid or catch.

class Item {
  constructor(x, y, z) {
    this.position = createVector(x, y, z);
    this.speed = 10;
    this.frame = 0;
  }

  followTunnel() {
    this.position.z += this.speed;
  }

  display() {
    push();
    fill(255);
    noStroke();
    translate(this.position.x, this.position.y, this.position.z);
    ellipse(0, 0, 30);
    pop();
  }

  isOffScreen() {
    return (this.position.z > 300);
  }
}
