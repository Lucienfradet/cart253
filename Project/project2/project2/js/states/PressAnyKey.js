//Deals with the intro before the game starts Screen

class PressAnyKey extends State {
  constructor() {
    super();
  }

  update() {
    background(0);
    // Prompt
    push();
    fill(255);
    textFont(yoster);
    textSize(23);
    textAlign(CENTER, CENTER);
    text(`Please, enter your name`, 0, 0 - height/16);
    pop();

    // A line under their text entry
    push();
    stroke(150);
    line(0 - width/4, 0 + height/16, 0 + width/4, 0 + height/16);
    pop();

    // The current name data they're typing in
    push();
    fill(255);
    textSize(48);
    textAlign(CENTER, BOTTOM);
    text(playerName, 0, 0 + height/16);
    pop();
  }

  keyTyped(touche) {
      playerName += touche;
  }

  keyPressed() {
    if (keyCode === BACKSPACE) {
      // This is a way to remove the last character in a string!
      playerName = playerName.slice(0, playerName.length - 1);
    }
    else if (keyCode === ENTER) {
      state = new Title();
    }
  }
}
