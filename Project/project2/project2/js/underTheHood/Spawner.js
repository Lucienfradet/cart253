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

    this.angle = constrain(this.angle, 0, 0.01)
  }

  random() {
    radar[0].angle = 0.3;

    let r = random();
    if (r < 0.1) {
      let newItem = new Random({
        x: radar[0].position.x,
        y: radar[0].position.y,
        z: radar[0].centerPositionZ,
        speed: 25,
        size: 30,
        strokeWeight: 3,
        id: 'random',
        color: 255
      });
      item.random.push(newItem);
    }
  }

  barrage() {
    radar[0].angle = 0.1;

    if (atan2(radar[0].position.x, radar[0].position.y) > -PI + 0.1 || this.delay < 5) {
      for (let i = 0; i < item.length; i++) {
        if (item[i].id === 'barrage' + this.counter) {
          item[i].speed.z = 0;
        }
      }

      if (frameCount % 2 < 1) {
        let newItem = new Item(radar[0].position.x, radar[0].position.y, radar[0].centerPositionZ, 'barrage' + this.counter);
        item.push(newItem);
      }
    }
    else {
      radar[0].angle = 0;
      for (let i = 0; i < item.length; i++) {
        if (item[i].id === 'barrage' + this.counter) {
          item[i].speed.z = 20;
        }
      }
    }
    this.delay++;
  }

  beam() {
    for (let i = 0; i < radar.length; i++) {
      radar[i].angle = 0.02;
    }

    for (let i = 0; i < item.length; i++) {
      //if (item[i].id === 'random') {
        item[i].speed.z = random(25, 30);
      //}
    }
    if (this.delay > 1) {
      for (let i = 0; i < radar.length; i++) {
        let newItem = new Item(radar[i].position.x, radar[i].position.y, radar[i].centerPositionZ, 'beam');
        item.push(newItem);
      }
    }
    this.delay++;
  }

  wheelOfDoom() {
    radar[0].angle = -0.09;

    for (let i = 0; i < item.length; i++) {
      //if (item[i].id === 'random') {
        item[i].speed.z = random(25, 30);
      //}
    }
    if (this.delay > 1) {
      for (let i = 0; i < radar.length; i++) {
        let newItem = new Item(radar[i].position.x, radar[i].position.y, radar[i].centerPositionZ, 'wheelOfDoom');
        item.push(newItem);
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
      this.wipeOut();
      //this.reseted = false;
      this.counter = 0;
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

    if (keyCode === 100) { //NUM_KEY 1
      this.delay = 0;
      this.reseted = false;
      this.state = 'wheelOfDoom';
    }

    if (keyCode === 105) { //NUM_KEY 3
      this.reseted = false;
      this.state = '';
      this.wipeOut();
    }
  }
}
