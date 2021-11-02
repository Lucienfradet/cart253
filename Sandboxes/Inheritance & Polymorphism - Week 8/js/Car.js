class Car extends Vroom {
  constructor(x, y) {

    super(x, y);

    this.width = 50;
    this.height = 20;
    this.vx = 5;
    this.drunkness = 0.2;
  }

  move() {
    this.veer();

    super.move();
  }

  veer() {
    let r = random();
    if (r < this.drunkness) {
      this.vy = random(-5, 5);
    }
  }

  wrap() {
    super.wrap();

    if (this.y > height + this.height/2) {
      this.y -= height + this.height
    }
    else if (this.y < 0 - this.height/2) {
      this.y += height + this.height
    }
  }

  display() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(255);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
