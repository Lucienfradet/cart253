class Game extends State {
  constructor() {
    super();
    this.startTime = frameCount/60;
    this.time = 0; //gameLoop time progression
    this.fatalCollision = false; //triggers the failure of the player (collision with an item)
    this.allStates = ['barrage', 'beam', 'wheelOfDoom', 'hole', 'random']; //possible spawner states including random
    this.choiceStates = ['barrage', 'beam', 'wheelOfDoom', 'hole']; //states that will be selected randomly
    this.currentState = undefined;
    this.index = 0; //controls the allStates index selection
    this.randomSpeed = 1; //Increments as the game loop progresses

    //Triggers gameEvents once and turn off.
    this.phase1 = true;
    this.phase2 = true;
    this.phase3 = true;
    this.phase4 = true;
    this.phase5 = true;
    this.phase6 = true;
    this.phase7 = true;
    this.phase8 = true;
  }

  update() {
    background(0);
    this.time = frameCount/60 - this.startTime; //increments the time

    //displays information about sliders on the gameScreen for realTime update
    //debuggingSlidersDisplay();

    //MeatBall Functions
    meatBall.display();

    //Wheel Functions
    //wheel.display();
    wheel.rotate();
    wheel.storeCollisions();

    //Spawner Functions
    spawner.update();
    rotator.update(); //Keep track of the Wheel rotation to be used by other objects with the ROTATORIZE

    //display and update Items
    items();

    //Tunel Functions
    if (this.time > 3) { //Displays the tunnel after a time
      for (let i = 0; i < tunnel.length; i++) {
        tunnel[i].deploy();
        }
      for (let i = 0; i < radar.length; i++) {
        radar[i].display();
        radar[i].rotate();
      }
    }

    if (this.time > 5 && this.phase1) {
      this.phase1 = false;
      this.random();
    }

    if (this.time > 20 && this.phase2) {
      this.phase2 = false;
      shuffle(this.choiceStates, true);
      this.currentState = this.choiceStates[0];
      this.stateSelect();
    }

    if (this.time > 28 && this.phase3) {
      this.phase3 = false;
      this.randomSpeed += 0.1;
      this.random();
    }

    if (this.time > 35 && this.phase4) {
      this.phase4 = false;
      shuffle(this.choiceStates, true);
      this.currentState = this.choiceStates[0];
      this.stateSelect();
    }

    if (this.time > 42 && this.phase5) {
      this.phase5 = false;
      this.randomSpeed += 0.1;
      this.random();
    }

    if (this.time > 49 && this.phase6) {
      this.phase6 = false;
      shuffle(this.choiceStates, true);
      this.currentState = this.choiceStates[0];
      this.stateSelect();
    }

    if (this.time > 53 && this.phase7) {
      this.phase7 = false;
      this.randomSpeed += 0.1;
      this.random();
    }

    if (this.time > 57 && this.phase8) {
      this.phase8 = false;
      shuffle(this.choiceStates, true);
      this.currentState = this.choiceStates[0];
      this.stateSelect();
    }

    if (this.time > 60 && this.phase9) {
      this.phase9 = false;
      this.randomSpeed += 0.1;
      this.random();
    }

    if (this.time > 65) {
      this.randomize();
      this.stateSelect();
    }

    this.gameOver();

    for (let i = 0; i < tunnel.length; i++) {
      tunnel[i].display();
      tunnel[i].rotate();
    }

    tunnel[0].update();
    tunnel[0].saveHistory();

    for (let i = tunnel[0].history.length - 1; i >= 1; i--) {
      tunnel[i].applyHistory(tunnel[0].history.length - i);
    }

    // imageMode(CENTER);
    // image(img.backgroundTest, 0, 0);
  }

  randomize() {
    let changeChance = random();
    if (changeChance < 0.05) {
      this.index = int(random(0, 5));
      console.log(this.index);
    }

    this.currentState = this.allStates[this.index];
    this.index = undefined; //prevents the functionSelect from running more than once.
  }

  gameOver() {
    if (this.fatalCollision) {
      background(255, 0, 0);
      noLoop();
    }
  }

  stateSelect() {
    if (this.currentState === 'random') {
      this.random();
    }

    if (this.currentState === 'barrage') {
      this.barrage();
    }

    if (this.currentState === 'beam') {
      this.beam();
    }

    if (this.currentState === 'hole') {
      this.hole();
    }

    if (this.currentState === 'wheelOfDoom') {
      this.wheelOfDoom();
    }
  }

  firstBarrage() {
    do {
      radar.angle = 0;
      spawner.reseted = false;
      spawner.delay = 0;
      spawner.counter++;
      spawner.state = 'barrage';

      if (item.barrage[0].id === 'barrage' + spawner.counter && item.barrage[0].speed.z === 20) {
        this.phase2++;
      }
    }
    while (this.phase2 < 5)
  }

  random() {
    spawner.delay = 0;
    spawner.reseted = false;
    spawner.state = 'random';
  }

  barrage() {
    radar.angle = 0;
    spawner.reseted = false;
    spawner.delay = 0;
    spawner.counter++;
    spawner.state = 'barrage';
  }

  beam() {
    spawner.delay = 0;

    for (let i = 1; i < 4; i++) {
      let newRadar = new Radar({
        posX: radar[0].position.x,
        posY: radar[0].position.y,
        posZ: 0,
        amp: tunnel[0].radius - i * 40
      });
      radar.push(newRadar)
    }

    spawner.state = 'beam';
  }

  wheelOfDoom() {
    spawner.delay = 0;
    spawner.reseted = false;
    spawner.state = 'wheelOfDoom';
  }

  hole() {
    wipeRadar();
    spawner.delay = 0;
    spawner.counter++;

    for (let i = 1; i < 4; i++) {
      let newRadar = new Radar({
        posX: radar[0].position.x,
        posY: radar[0].position.y,
        posZ: 0,
        amp: tunnel[0].radius - i * 40
      });
      radar.push(newRadar)
    }

    spawner.state = 'hole';
  }

  keyPressed() {
    wheel.keyPressed();
    spawner.keyPressed();
  }
}
