//Deals with the Title Screen

class Intro extends State {
  constructor() {
    super();
    this.imgSize = createVector(1160, 893);
    this.offSet = {
      x: 0,
      y: 0
    }
    this.sizeIncrement = 3;
    this.startTime = frameCount/60;
    this.time = 0; //gameLoop time progression
  }

  update() {
    background(0);

    //Tunnel functions
    for (let i = 0; i < tunnel.length; i++) {
      tunnel[i].display();
      tunnel[i].rotate();
    }



    if (offSet.x > 0) {
      offSet.x -= 0.3;
      this.offSet.x += 0.40;
    }

    if (offSet.y < 0) {
      offSet.y -= 0.1;
    }

    //translate(this.offSet.x, this.offSet.y);
    imageMode(CENTER);
    image(img.backgroundTest, 0 + this.offSet.x, 0, this.imgSize.x, this.imgSize.y);
    this.imgSize.x += this.sizeIncrement;
    this.imgSize.y += this.sizeIncrement;

    this.time = frameCount/60 - this.startTime; //increments the time
    if (this.time === 11) {
      state = new Game();
      meatBall.body.position.y = 0;
      offSet.x = 0;
      offSet.y = 0;
    }
  }

  keyPressed() {
    state = new Game();
    meatBall.body.position.y = 0;
    offSet.x = 0;
    offSet.y = 0;
  }
}
