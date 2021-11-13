class Vinyl {
  constructor(x, y, sample) {
    this.sample = loadSound('assets/sounds/'+sample); //this is not in setup because I plan on making it interchangeable
    this.x = x;
    this.y = y;
    this.circleR = 100;
    this.lineLength = this.circleR;
    this.needleLength = 1;
    //is it being dragged
    this.dragging = false;
    //Is the mouse over the disc
    this.over = false;
    this.angle = 0;
    this.offsetAngle = 0;

    //play button
    this.playing = false;
    this.playX = this.x;
    this.playY = this.y + this.circleR + 50;
    this.playSize = 30;
  }

  musicPlaying() {
    if (this.playing) {
      this.angle += 2*PI / 360;
    }
    else {
      this.sample.pause();
    }

    if (this.dragging) {
      let calcAngle = 0;
      if (this.angle < 0) {
        calcAngle = map(this.angle, -PI, 0, PI, 0);
      }
      else if (this.angle > 0) {
        calcAngle = map(this.angle, 0, PI, TWO_PI, PI);
      }
      calcAngle = degrees(calcAngle);
      console.log(`calcAngle: ${calcAngle}`);

      let speedX = abs(winMouseX - pwinMouseX);
      //console.log(`speedX ${speedX}`);
      speedX = map(speedX, -5, 5, -1, 1);
      //console.log(`speedX ${speedX}`);
      this.sample.rate(speedX);
      let mouseSpeed = 0;
      let pastmouseSpeed = 0;

    }
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

    //Needle lol
    push();
    stroke(0, 0, 255);
    strokeWeight(3);
    line(this.x + this.circleR / 2, this.y - this.circleR / 2, this.x + this.circleR * this.needleLength, this.y - this.circleR * this.needleLength)
    pop();

    //display play button
    push();
    fill(255);
    stroke(0);
    strokeWeight(3);
    rectMode(CENTER);
    rect(this.playX, this.playY, this.playSize);
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

    if (mouseX > this.playX - this.playSize / 2 && mouseX < this.playX + this.playSize / 2 && mouseY > this.playY - this.playSize / 2 && mouseY < this.playY + this.playSize / 2) {
      if (this.playing === false) {
        this.playing = !this.playing;
        this.sample.play();
      }
      else {
        this.playing = !this.playing;
        this.sample.pause();
      }
    }
  }

  mouseReleased() {
    this.dragging = false;
    this.sample.rate(1);
  }
}
