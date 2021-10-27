class Flower {
  constructor({
    x,
    y,
    size,
    stemLength,
    stemThickness,
    petalThickness,
    stemColor,
    petalColor,
    centreColor
  }) {
    //set's up this's properties
    // Position and size information
    this.x = x;
    this.y = y;
    this.size = size;
    this.stemLength = stemLength;
    this.stemThickness = stemThickness;
    this.petalThickness = petalThickness;
    // Color information
    this.stemColor = stemColor;
    this.petalColor = petalColor;
    this.centreColor = centreColor;
    this.alive = true;
  }

  // shrink()
  // Shrinks the flower
  shrink() {
   // Choose a random amount to shrink
   let shrinkage = random(0, 0.1);
   // Reduce the petal thickness (divide by 10 to make it less rapid)
   this.petalThickness = this.petalThickness - shrinkage / 10;
   // Reduce the centre of the flower
   this.size = this.size - shrinkage;

   // If any of the key properties reach 0 or less, the flower is dead
   if (this.petalThickness <= 0 || this.size <= 0) {
     this.alive = false;
   }
  }

  // NEW! pollinate() handles the flower being pollinated (it grows)
  pollinate() {
   // Choose a random amount to grow
   let growth = random(0, 0.5);
   // Increase the petal thickness (divide by 10 to make it less rapid)
   this.petalThickness = this.petalThickness + growth / 10;
   // Increase the centre of the flower
   this.size = this.size + growth;

   // Constrain the elements
   this.petalThickness = constrain(this.petalThickness, 0, this.maxPetalThickness);
   this.size = constrain(this.size, 0, this.maxSize);
  }

  display() {
    push();
    // Draw a line for the stem
    strokeWeight(this.stemThickness);
    stroke(this.stemColor.r, this.stemColor.g, this.stemColor.b);
    line(this.x, this.y, this.x, this.y + this.stemLength);
    // Draw a circle with a heavy outline for the this
    strokeWeight(this.petalThickness);
    fill(this.centreColor.r, this.centreColor.g, this.centreColor.b);
    stroke(this.petalColor.r, this.petalColor.g, this.petalColor.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }

    mousePressed() {
      // Calculate the distance between this flower and the mouse
      let d = dist(this.x,this.y,mouseX,mouseY);
      // Check if the distance is less than the head of the flower
      if (d < this.size/2 + this.petalThickness) {
        // If it is, this flower was clicked, so increase its stem length
        this.stemLength = this.stemLength + 10;
        // And also change its y position so it grows upward! (If we didn't do this
        // the then stem would grow downward, which would look weird.)
        this.y = this.y - 10;
      }
    }
}
