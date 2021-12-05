class Spawner {
  constructor({
    state
  }) {

    this.state = state;

  }

  update() {
    switch(this.state) {
      case 'random':
        
        this.random();
        break;
    }
  }

  random() {

  }
}
