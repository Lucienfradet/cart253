//Deals with the Title2 Screen Lol

class Title2 extends State {
  constructor() {
    super();
    this.startTime = frameCount/60;
    this.time = 0; //gameLoop time progression
  }

  update() {
    this.time = frameCount/60 - this.startTime; //increments the time

    if (frameCount % 60 < 15) {
        background(255);
      }
      else {
        background(0);
      }


    imageMode(CENTER);
    image(img.backgroundTest, 0, 0);

    if (this.time > 19.5) {
      snd.dialogue.stop();
      state = new Intro();
    }
  }

  keyPressed() {
    snd.dialogue.stop();
    state = new Intro();
  }
}
