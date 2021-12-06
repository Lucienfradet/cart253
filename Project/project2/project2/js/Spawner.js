class Spawner {
  constructor({
    state
  }) {

    this.state = state;
    this.resetPosition = '';
    this.reseted = false;
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
    }
  }

  resetRadar() {
    switch(this.resetPosition) {
      case 'right':
        radar.angle -= this.resetingSpeed;
        if (radar.position.x < 0) {
          this.reseted = true;
        }
        break;
      case 'left':
        radar.angle += this.resetingSpeed;
        if (radar.position.x > 0) {
          this.reseted = true;
        }
        break;
    }

    if (radar.position.x > 0) {
      this.resetPosition = 'right';
    }
    else {
      this.resetPosition = 'left';
    }

    this.angle = constrain(this.angle, 0, 0.01)
  }

  random() {
    radar.angle = 0.3;

    for (let i = 0; i < item.length; i++) {
      //if (item[i].id === 'random') {
        item[i].speed.z = 25;
      //}
    }

    let r = random();
    if (r < 0.1) {
      let newItem = new Item(radar.position.x, radar.position.y, radar.centerPositionZ, 'random');
      item.push(newItem);
    }
  }

  barrage() {
    radar.angle = 0.1;

    if (atan2(radar.position.x, radar.position.y) > -PI + 0.1 || this.delay < 5) {
      for (let i = 0; i < item.length; i++) {
        if (item[i].id === 'barrage' + this.counter) {
          item[i].speed.z = 0;
        }
      }

      if (frameCount % 2 < 1) {
        let newItem = new Item(radar.position.x, radar.position.y, radar.centerPositionZ, 'barrage' + this.counter);
        item.push(newItem);
      }
    }
    else {
      radar.angle = 0;
      for (let i = 0; i < item.length; i++) {
        if (item[i].id === 'barrage' + this.counter) {
          item[i].speed.z = 20;
        }
      }
    }
    this.delay++;
  }

  beam() {
    radar.angle = 0.02;

    for (let i = 0; i < item.length; i++) {
      //if (item[i].id === 'random') {
        item[i].speed.z = random(25, 30);
      //}
    }

    let newItem = new Item(radar.position.x, radar.position.y, radar.centerPositionZ, 'beam');
    item.push(newItem);

  }

  wipeOut() {
    for (let i = 0; i < item.length; i++) {
      item.splice(i, 1);
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
      this.reseted = false;
      this.counter = 0;
      this.state = 'beam';

    }

    if (keyCode === 105) { //NUM_KEY 3
      this.reseted = false;
      this.state = '';
      this.wipeOut();
    }
  }
}
