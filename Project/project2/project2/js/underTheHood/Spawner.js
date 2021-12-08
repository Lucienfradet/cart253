//Object that deals with spawning items in different formations!

class Spawner {
  constructor({
    state
  }) {

    this.state = state;
    this.resetPosition = ''; //either LEFT or RIGHT depending on the position of the radar
    this.reseted = true; //flase if the radar needs resetting
    this.resetingSpeed = 0.01; //increment on the radar.angle when resetting
    this.delay = 0; //delays certain functions
    this.counter = 0; //Allows for items in the same Class to be handled separatly by adding this.counter to their id

  }

  //Checks the states of the spawner. This is being changed by the playLoop in the Game Class
  update() {
    switch(this.state) {
      case 'random':
        if (this.reseted === false) {
          this.resetRadar();
        }
        else {
          this.random();
        }
        break;

      case 'barrage':
        if (this.reseted === false) {
          this.resetRadar();
        }
        else {
          this.barrage();
        }
        break;

      case 'beam':
        if (this.reseted === false) {
          this.resetRadar();
        }
        else {
          this.beam();
        }
        break;

      case 'wheelOfDoom':
        this.wheelOfDoom();
        break;

      case 'hole':
        if (this.reseted === false) {
          this.resetRadar();
        }
        else {
          this.hole();
        }
        break;
    }
  }

  //Resets the radar (or tries to lol) to the angle = 0 position
  resetRadar() {
    switch(this.resetPosition) {
      case 'right':
        for (let i = 0; i < radar.length; i++) {
          radar[0].angle -= this.resetingSpeed;
        }
        if (radar[0].position.x < 0) {
          this.reseted = true; //reset should be done, the spawner can continue
        }
        break;
      case 'left':
        for (let i = 0; i < radar.length; i++) {
          radar[0].angle += this.resetingSpeed;
        }
        if (radar[0].position.x > 0) {
          this.reseted = true; //reset should be done, the spawner can continue
        }
        break;
    }

    //Checks if the radar.angle is in the PI or -PI cadran
    if (radar[0].position.x > 0) {
      this.resetPosition = 'right';
    }
    else {
      this.resetPosition = 'left';
    }
  }

  //Spawns items randomly
  random() {
    radar[0].angle = 0.3;

    let r = random();
    if (r < 0.1) {
      let newItem = new Random({
        x: radar[0].position.x,
        y: radar[0].position.y,
        z: radar[0].centerPositionZ,
        speed: 25 * state.randomSpeed, //changes the speed of items depending on where in the playLoop
        size: 30,
        strokeWeight: 3,
        id: 'random',
        color: 255
      });
      item.random.push(newItem);
    }
  }

  //Spawns items in a whirlwind formation
  hole() {
    for (let i = 0; i < radar.length; i++) { //also move the new radar that the calling function created in state.hole()
      radar[i].angle = 0.09;
    }

    //Spawning Phase
    //Checks the real angle of the radar and stop the spawning phase when the radars of completed a trip around the world
    if (atan2(radar[0].position.x, radar[0].position.y) > -PI + 0.1 || this.delay < 5) {
      for (let i = 0; i < item.hole.length; i++) {
        if (item.hole[i].id === 'hole' + this.counter) {
          item.hole[i].speed.z = 0;
        }
      }
      if (this.delay > 1) { //Prevents item spawning before the newly created radars are in position in the back of the tunnel
        if (frameCount % 30 < 15/2) { //allows for gaps to be created in the disc shape spawn formation (items spawns in a blinking fation)
          for (let i = 0; i < radar.length; i++) {
            let newItem = new Hole({
              x: radar[i].position.x,
              y: radar[i].position.y,
              z: radar[i].centerPositionZ,
              speed: 0,
              size: 30,
              strokeWeight: 2,
              id: 'hole' + this.counter,
              color: 255
            });
            item.hole.push(newItem);
          }
        }
      }

    }

    //Moving Phase
    else {
      for (let i = 0; i < radar.length; i++) {
        radar[i].angle = 0;
      }
      let speed = random(15, 25);
      for (let i = 0; i < item.hole.length; i++) {
        if (item.hole[i].id === 'hole' + this.counter) {
          item.hole[i].speed.z = speed + random();
          item.hole[i].go = true; //Tells the hole Class that the last bunch of items are moving
        }
      }
    }
    this.delay++;
  }

  //Spawns rings of items that the player will have to jump over
  //Same as the Hole() function above
  barrage() {
    radar[0].angle = 0.1;


    if (atan2(radar[0].position.x, radar[0].position.y) > -PI + 0.1 || this.delay < 5) {
      for (let i = 0; i < item.barrage.length; i++) {
        if (item.barrage[i].id === 'barrage' + this.counter) {
          item.barrage[i].speed.z = 0;
        }
      }

      if (frameCount % 2 < 1) { //this part is different, spawns the items faster, creating a complete ring
        let newItem = new Barrage({
          x: radar[0].position.x,
          y: radar[0].position.y,
          z: radar[0].centerPositionZ,
          speed: 0,
          size: 30,
          strokeWeight: 3,
          id: 'barrage' + this.counter,
          color: 255
        });
        item.barrage.push(newItem);
      }
    }

    //moving phase
    else {
      radar[0].angle = 0;
      let speed = random(15, 25);
      for (let i = 0; i < item.barrage.length; i++) {
        if (item.barrage[i].id === 'barrage' + this.counter) {
          item.barrage[i].speed.z = speed;
          item.barrage[i].go = true;
        }
      }
    }
    this.delay++;
  }

  //Spawns a Beam of items the player has no choice but to run away and wait for it to stop
  beam() {
    for (let i = 0; i < radar.length; i++) {
      radar[i].angle = 0.022;
    }

    if (this.delay > 1) {
      for (let i = 0; i < radar.length; i++) {
        let newItem = new Beam({
          x: radar[i].position.x,
          y: radar[i].position.y,
          z: radar[i].centerPositionZ,
          speed: random(25, 30),
          size: 30,
          strokeWeight: 1,
          id: 'beam',
          color: 255
        });
        item.beam.push(newItem);
      }
    }

    this.delay++;
  }

  //Spawns a single beam, because every item of this function also rotate, this formation is harder to predict but ca be jumped over
  wheelOfDoom() {
    radar[0].angle = -0.032;

    if (this.delay > 1) {
      for (let i = 0; i < radar.length; i++) {
        let newItem = new WheelOfDoom({
          x: radar[i].position.x,
          y: radar[i].position.y,
          z: radar[i].centerPositionZ,
          speed: random(24.5, 25.5),
          size: 30,
          strokeWeight: 3,
          id: 'wheelOfDoom',
          color: 255,
          rotationSpeed: 0.1
        });
        item.wheelOfDoom.push(newItem);
      }
    }
    this.delay++;
  }

  //KeyPressed for testing and debigging
  keyPressed() {
      if (keyCode === 97) { //NUM_KEY 1
        state.random();
      }

      if (keyCode === 98) { //NUM_KEY 2
        state.barrage();
      }

      if (keyCode === 99) { //NUM_KEY 3
        state.beam();
      }

      if (keyCode === 100) { //NUM_KEY 4
        state.wheelOfDoom();
      }

      if (keyCode === 101) { //NUM_KEY 5
        state.hole();
      }
  }
}
