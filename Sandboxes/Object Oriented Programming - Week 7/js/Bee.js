class Bee {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.minSize = 10; // If we get smaller than this minimum we're dead
    this.maxSize = 40; // We can't get bigger than this
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.shrinkRate = 0.05; // How much smaller we get each frame
    this.jitteriness = 0.1; // How likely the bee is to change direction
    this.alive = true; // The Bee starts out alive!
  }

  // shrink() causes the bee to get smaller over time
  shrink() {
    // Shrink by reducing the size by a set amount
    this.size = this.size - this.shrinkRate;
    // Check if we're smaller than the minimum size
    if (this.size < this.minSize) {
      // If so, we're dead
      this.alive = false;
    }
  }

  // tryToPollinate() attempts to pollinate the flower provided as a parameter
  // If pollination succeeds (the two overlap) then both grow
  tryToPollinate(flower) {
    // Calculate the distance between the bee and the flower
    let d = dist(this.x, this.y, flower.x, flower.y);
    // If they overlap...
    if (d < this.size / 2 + flower.size / 2) {
      // The bee should grow
      // Notice how we can call OTHER METHODS of the Bee by using "this"
      // So this.grow() calls the grow() method for THIS bee
      this.grow();
      // The flower should react to being pollinated so we call its method
      // that handles that!
      flower.pollinate();
    }
  }

  // grow() causes the bee to get bigger up to a maximum (called by tryToPollinate())
  grow() {
    // Grow by increasing the size by a set amount
    this.size = this.size + this.growRate;
    // Constrain the growth to a maximum
    this.size = constrain(this.size, 0, this.maxSize);
  }

  // move() moves the bee by potentially changing direction
  // and then changing position based on velocity
  move() {
    // First check if we should change direction
    let r = random(0, 1);
    if (r < this.jitteriness) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }

    // Update position with velocity to actually move
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    // Constrain to the canvas (guess it's a walled garden!)
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  // display() draws our bee onto the canvas
  display() {
    push();
    // Wings on either side
    fill(255, 255, 255);
    noStroke();
    ellipse(this.x - this.size / 2, this.y, this.size / 2);
    ellipse(this.x + this.size / 2, this.y, this.size / 2);
    pop();

    // Body
    push();
    fill(225, 225, 50);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();

    // Eyes
    push();
    fill(0, 0, 0);
    noStroke();
    ellipse(this.x - this.size / 10, this.y, this.size / 10);
    ellipse(this.x + this.size / 10, this.y, this.size / 10);
    pop();
  }
}
