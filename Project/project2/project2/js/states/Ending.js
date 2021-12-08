//Deals with the Ending Thing

class Ending extends State {
  constructor() {
    super();
    this.startTime = frameCount/60;
    this.time = 0; //gameLoop time progression
    this.timeSwitch1 = 5;
    this.timeSwitch2 = 15;

    this.increments = {
      radiusOffset: 0.9,
      noiseMax: 1,
      rotationSpeed: 0.001,
      itemSpeed: 0.01,
      radarSpeed: 0.01,
      itemRotation: 0.1,
      tunnelRadius: 1
    }
  }

  update() {
    background(0);
    this.time = frameCount/60 - this.startTime; //increments the time

    //Wheel Functions
    wheel.storeCollisions();

    if (this.time < this.timeSwitch1) {
      //MeatBall Functions
      meatBall.display(); //Updates and displays meatBall

      //Spawner Functions
      spawner.update();
      //display and update Items
      items();

      for (let i = 0; i < radar.length; i++) {
        radar[i].display();
        radar[i].rotate();
      }
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

    this.shitGoesWild();
  }

  shitGoesWild() {
    if (this.time < this.timeSwitch1) {
      for (let i = 0; i < radar.length; i++) {
        radar[i].angle += this.increments.radarSpeed;
      }

      for (let i = 0; i < tunnel.length; i++) {
        tunnel[i].radiusOffset += this.increments.radiusOffset;
        tunnel[i].noiseMax += this.increments.noiseMax;
      }

      for (let i = 0; i < item.wheelOfDoom.length; i++) {
        item.wheelOfDoom[i].rotationSpeed += this.increments.itemSpeed;
      }

      spawner.wheelOfDoom(this.increments.itemRotation);

      Body.setAngularVelocity(wheel.compoundBody, wheel.wheelRotationSpeed);
      wheel.wheelRotationSpeed += this.increments.rotationSpeed;
    }
    else {
      this.shitCalmsDown();
    }

  }

  shitCalmsDown() {
    for (let i = 0; i < tunnel.length; i++) {
      let tun = tunnel[i];
      if (tun.radius > 0) {
        tun.radiusOffset -= this.increments.radiusOffset * 30;
        tun.noiseMax -= this.increments.noiseMax * 30;
        tun.radius -= this.increments.tunnelRadius;
      }
      else if (this.time < this.timeSwitch2) {
        tun.radius = 0;
      }
      else {
        state = new Outro();
      }
    }
  }

  keyPressed() {

  }
}
