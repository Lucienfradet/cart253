//Deals with the Title Screen

class Title extends State {
  constructor() {
    super();
  }

  update() {
    background(0);

    push();
    textAlign();
    textFont(yoster);
    textSize(23);

    push();
    rectMode(CENTER);
    strokeWeight(5);
    stroke(255);
    noFill();
    rect(0, 0, width - 230, height - 330);
    pop();

    fill(255);
    text(`Controls:
    Holding 'A' Key: Moves Left
    Holding 'D' Key: Moves Right
    Tapping 'A' Key: Pushes the ball to the Left
    Tapping 'D' Key: Pushes the ball to the Right
    SPACEBAR: Jumps

    Press Any Key to Continue`, -width/4 - 50, 0 - 100);
    pop();
  }

  keyPressed() {
    snd.dialogue.play();
    snd.noise.setVolume(0.5);
    snd.noise.loop();
    state = new Title2();
  }
}
