//Deals with the Title Screen

class Title extends State {
  constructor() {
    super();
  }

  update() {
    background(0);
  }

  keyPressed() {
    state = new Intro();
  }
}
