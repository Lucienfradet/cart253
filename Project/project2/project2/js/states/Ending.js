//Deals with the Ending Thing

class Ending extends State {
  constructor() {
    super();

    this.increments = {
      radiusOffset: 0.1,
      noiseMax: 0.1,
      rotationSpeed: 0.1,
      itemSpeed: 0.1,
      radarSpeed: 0.1
    }
  }

  update() {
    background(0);

    //MeatBall Functions
    meatBall.display(); //Updates and displays meatBall

    //Wheel Functions
    wheel.storeCollisions();

    //Spawner Functions
    spawner.update();
    //display and update Items
    items();

    for (let i = 0; i < radar.length; i++) {
      radar[i].display();
      radar[i].rotate();
    }

    //Tunnel functions
    for (let i = 0; i < tunnel.length; i++) {
      tunnel[i].display();
    }

    tunnel[0].update();
    tunnel[0].saveHistory();

    for (let i = tunnel[0].history.length - 1; i >= 1; i--) {
      tunnel[i].applyHistory(tunnel[0].history.length - i);
    }

    shitGoesWild();
  }

  shitGoesWild(); {
    for (let i = 0; i < radar.length; i++) {
      radar[i].angle += this.increments.radarSpeed;
    }

    for (let i = 0; i < tunnel.length; i++) {
      tunnel[i].radiusOffset += this.increments.radiusOffset;
      tunnel[i].noiseMax += this.increments.noiseMax;
    }
  }

  keyPressed() {

  }
}
