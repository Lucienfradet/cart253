//Handles the Game, GameLoop and GameOver

class Game extends State {
  constructor() {
    super();

    //Create the main playable body, behold "La Sacrament de MEATBALL"
    meatBall = new MeatBall(0, 0, 30);

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

    this.gameOverPhase = true;
    this.firstTry = true;
  }

  update() {
    background(0);
    this.time = frameCount/60 - this.startTime; //increments the time

    //debuggingSlidersDisplay(); //displays information about sliders on the gameScreen for realTime update

    //MeatBall Functions
    meatBall.display(); //Updates and displays meatBall

    //Wheel Functions
    //wheel.display(); //INACTIVE for final version
    wheel.rotate();
    wheel.storeCollisions();

    //Spawner Functions
    spawner.update();

    //THIS SHOULD GO STRAIGHT TO THE DUMPSTER
    //rotator.update(); //Keep track of the Wheel rotation to be used by other objects with the ROTATORIZE

    //display and update Items
    items();

    //Radar and Tunnel deployment
    if (this.time > 3 && this.firstTry) { //Displays the whole tunnel and radar after a time
      for (let i = 0; i < tunnel.length; i++) {
        tunnel[i].deploy();
        }
      for (let i = 0; i < radar.length; i++) {
        radar[i].display();
        radar[i].rotate();
      }
    }
    else if (this.firstTry === false){
      for (let i = 0; i < radar.length; i++) {
        radar[i].display();
        radar[i].rotate();
      }
    }

    //The following if statements control the chronological order of the playLoop
    if (this.time > 5 && this.phase1) {
      this.phase1 = false;
      this.random();
    }

    if (this.time > 20 && this.phase2) {
      this.phase2 = false;
      shuffle(this.choiceStates, true); //Randomize the functions being used by the playLoop
      this.currentState = this.choiceStates[0];
      this.stateSelect();
    }

    if (this.time > 28 && this.phase3) {
      this.phase3 = false;
      this.randomSpeed += 0.1; //Accelerate the speed of the random spawn
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

    if (this.time > 65) { //Final BOSS all hell breaks loose
      this.randomize();
      this.stateSelect();
    }

    this.gameOver();

    //Tunnel functions
    for (let i = 0; i < tunnel.length; i++) {
      tunnel[i].display();
      tunnel[i].rotate();
    }

    tunnel[0].update();
    tunnel[0].saveHistory();

    for (let i = tunnel[0].history.length - 1; i >= 1; i--) {
      tunnel[i].applyHistory(tunnel[0].history.length - i);
    }
  }

  //randomize allStates
  randomize() {
    let changeChance = random();
    if (changeChance < 0.05) {
      this.index = int(random(0, 5));
    }

    this.currentState = this.allStates[this.index];
    this.index = undefined; //prevents the stateSelect from running again until the index changes again
  }

  //Deals with GameOver events
  gameOver() {
    if (this.fatalCollision) {
      background(255, 0, 0);
      this.firstTry = false;
      this.currentState = 'gameOver';
    }
  }

  //Resets all Game parameters for the next try
  restart() {
    this.startTime = frameCount/60 - 5; //start at phase1
    this.time = 0;
    spawner.state = '';
    itemWipeOut();

    for (let i = 0; i < radar.length; i++) {
      radar.splice(i, 1);
      i--;
    }
    radar[0] = new Radar({
      posX: tunnel[0].radius,
      posY: tunnel[0].radius,
      posZ: 0,
      amp: tunnel[0].radius
    });

    this.fatalCollision = false;
    this.phase1 = true;
    this.phase2 = true;
    this.phase3 = true;
    this.phase4 = true;
    this.phase5 = true;
    this.phase6 = true;
    this.phase7 = true;
    this.phase8 = true;
    this.currentState = undefined;
  }

  //Executes functions
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

  //Starting parameters for the Item Spawner depending on the function
  random() {
    spawner.delay = 0;
    spawner.reseted = false;
    spawner.state = 'random';
  }

  barrage() {
    radar[0].angle = 0;
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

  //handles the keyPresses
  keyPressed() {
    if (this.currentState === 'gameOver') {
      this.restart();
    }
    wheel.keyPressed();
    spawner.keyPressed(); //For debugging purposes

    if (keyCode === 38) {
      state = new Ending();
    }
  }
}
