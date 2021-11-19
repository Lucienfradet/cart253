//Not implemented at all
//These will be the items that the radar will spawm and that the MeatBall will have to avoid or catch.

class Item {
  constructor(x, y, z) {
    this.position = createVector(x, y, z);
    this.frame = 0;
  }

  followTunnel() {
    this.position.z = tunnel[tunnel.length - 1 - this.frame].position.z;
    this.frame++;
  }

  display() {
    push();
    fill(255);
    noStroke();
    translate(0, 0, this.position.z);
    ellipse(0, 0, 30);
    pop();
  }
}
