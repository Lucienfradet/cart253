//Deals with the outro sequence

class Outro extends State {
  constructor() {
    super();
    this.startTime = frameCount/60;
    this.time = 0; //gameLoop time progression
    this.endMsg = 'Welcome Home,' + ' ' + playerName + ',';
  }

  update() {
    background(0);
    this.time = frameCount/60 - this.startTime; //increments the time

    //Tunnel functions
    for (let i = 0; i < tunnel.length; i++) {
      tunnel[i].display();
    }

    tunnel[0].update();
    tunnel[0].saveHistory();

    for (let i = tunnel[0].history.length - 1; i >= 1; i--) {
      tunnel[i].applyHistory(tunnel[0].history.length - i);
    }

    //Plays an audio with the player's name
    if (this.time > 2) {
      speech.setRate(0.3)
      speech.setPitch(0.01);
      speech.speak(this.endMsg);
    }
  }
}
