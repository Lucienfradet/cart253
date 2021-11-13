class Vinyl {
  constructor() {
    this.sample = loadSound('assets/sounds/bark.wav'); //this is not in setup because I plan on making it interchangeable
    this.x = canvasWidth/2;
    this.y = canvasHeight/2;
    this.circleR = 100;
    this.lineLength = this.circleR;
    //is it being dragged
    this.dragging = false;
    //Is the mouse over the disc
    this.over = false;
    this.angle = 0;
    this.offsetAngle = 0;
  }

  rotate() {
    //calculate the new angle of rotation minus the original offsetAngle
    if (this.dragging) {
      let dx = mouseX - this.x;
      let dy = mouseY - this.y;
      let mouseAngle = atan2(dy, dx);
      this.angle = mouseAngle - this.offsetAngle;
    }
  }

  display() {
    //DisplayVinyl
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    fill(255);
    noStroke();
    ellipseMode(CENTER);
    ellipse(0, 0, this.circleR * 2);

    //Display Line
    stroke(0);
    noFill();
    strokeWeight(3);
    line(0, 0, 0, 0 - this.lineLength);
    pop();
  }

  mousePressed() {
    //check if it's over the disc
    if (dist(mouseX, mouseY, this.x, this.y) < this.circleR) {
      this.dragging = true;

      //calculate the offsetAngle
      let dx = mouseX - this.x;
      let dy = mouseY - this.y;
      this.offsetAngle = atan2(dy, dx) - this.angle;
    }
  }

  mouseReleased() {
    this.dragging = false;
  }
}
