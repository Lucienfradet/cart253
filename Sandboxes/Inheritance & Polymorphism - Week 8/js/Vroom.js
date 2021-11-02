class Vroom {
  // Create a new Vehicle object
  // Almost exactly as we saw in both Car and Motorcycle!
  constructor(x, y, vx) {
    this.x = x;
    this.y = y;
    // NOTE: We don't know the dimensions of a generic vehicle
    // so we start them as undefined
    this.width = undefined;
    this.height = undefined;
    // NOTE: We don't know how a generic vehicle will move
    // so we set its velocity to 0
    this.vx = 0;
    this.vy = 0;
  }

  // Move the vehicle according to its velocity
  // Just like we saw in both Car and Motorcycle!
  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  // Wrap the vehicle if it reaches the right edge
  // Just like we saw in both Car and Motorcycle!
  wrap() {
    if (this.x - this.width/2 > width) {
      this.x -= width + this.width;
    }
  }

  // Display the vehicle
  display() {
    // We will leave this empty because we don't display a generic
    // vehicle! Instead, we leave this up to the subclasses.
  }
}
