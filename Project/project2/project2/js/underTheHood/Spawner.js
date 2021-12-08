class Spawner {
  constructor({
    state
  }) {

    this.state = state;
    this.resetPosition = '';
    this.reseted = true;
    this.resetingSpeed = 0.01;
    this.delay = 0;
    this.counter = 0;

  }

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

  resetRadar() {
    switch(this.resetPosition) {
      case 'right':
        for (let i = 0; i < radar.length; i++) {
          radar[0].angle -= this.resetingSpeed;
        }
        if (radar[0].position.x < 0) {
          this.reseted = true;
        }
        break;
      case 'left':
        for (let i = 0; i < radar.length; i++) {
          radar[0].angle += this.resetingSpeed;
        }
        if (radar[0].position.x > 0) {
          this.reseted = true;
        }
        break;
    }

    if (radar[0].position.x > 0) {
      this.resetPosition = 'right';
    }
    else {
      this.resetPosition = 'left';
    }
  }

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

  hole() {
    for (let i = 0; i < radar.length; i++) {
      radar[i].angle = 0.09;
    }

    if (atan2(radar[0].position.x, radar[0].position.y) > -PI + 0.1 || this.delay < 5) {
      for (let i = 0; i < item.hole.length; i++) {
        if (item.hole[i].id === 'hole' + this.counter) {
          item.hole[i].speed.z = 0;
        }
      }
      if (this.delay > 1) {
        if (frameCount % 30 < 15/2) {
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
    else {
      for (let i = 0; i < radar.length; i++) {
        radar[i].angle = 0;
      }
      let speed = random(15, 25);
      for (let i = 0; i < item.hole.length; i++) {
        if (item.hole[i].id === 'hole' + this.counter) {
          item.hole[i].speed.z = speed + random();
          item.hole[i].go = true;
        }
      }
    }
    this.delay++;
  }

  barrage() {
      for (let i = 0; i < radar.length; i++) {
        radar[i].angle = 0.1;
      }

    if (atan2(radar[0].position.x, radar[0].position.y) > -PI + 0.1 || this.delay < 5) {
      for (let i = 0; i < item.barrage.length; i++) {
        if (item.barrage[i].id === 'barrage' + this.counter) {
          item.barrage[i].speed.z = 0;
        }
      }

      if (frameCount % 2 < 1) {
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

  wheelOfDoom() {
    radar[0].angle = -0.029;

    if (this.delay > 1) {
      for (let i = 0; i < radar.length; i++) {
        let newItem = new WheelOfDoom({
          x: radar[i].position.x,
          y: radar[i].position.y,
          z: radar[i].centerPositionZ,
          speed: 25,
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

  wipeOut() {
    for (let i = 0; i < item.length; i++) {
      item.splice(i, 1);
      i--;
    }
    for (let i = 1; i < radar.length; i++) {
      radar.splice(i, 1);
      i--;
    }
  }

  keyPressed() {
    if (keyCode === 97) { //NUM_KEY 1
      this.delay = 0;
      this.reseted = false;
      this.state = 'random';
    }

    if (keyCode === 98) { //NUM_KEY 2
      radar.angle = 0;
      this.reseted = false;
      this.delay = 0;
      this.counter++;
      this.state = 'barrage';
    }

    if (keyCode === 99) { //NUM_KEY 3
      //this.reseted = false;
      this.delay = 0;

      for (let i = 1; i < 4; i++) {
        let newRadar = new Radar({
          posX: radar[0].position.x,
          posY: radar[0].position.y,
          posZ: 0,
          amp: tunnel[0].radius - i * 40
        });
        radar.push(newRadar)
      }

      this.state = 'beam';
    }

    if (keyCode === 100) { //NUM_KEY 4
      this.delay = 0;
      this.reseted = false;
      this.state = 'wheelOfDoom';
    }

    if (keyCode === 101) { //NUM_KEY 5
      wipeRadar();
      radar.angle = 0;
      this.reseted = false;
      this.delay = 0;
      this.counter++;

      for (let i = 1; i < 4; i++) {
        let newRadar = new Radar({
          posX: radar[0].position.x,
          posY: radar[0].position.y,
          posZ: 0,
          amp: tunnel[0].radius - i * 40
        });
        radar.push(newRadar)
      }

      this.state = 'hole';
    }

    if (keyCode === 105) { //NUM_KEY 9
      this.reseted = false;
      this.state = '';
      this.wipeOut();
    }
  }
}
