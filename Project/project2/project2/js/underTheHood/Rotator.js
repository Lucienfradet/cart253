//Wanted to add this to a separete function and use it on EVERYTHING. Ended up not using it at all. lol

class Rotator {
  constructor() {
    this.angle = 0;
    this.offset = 0;
    this.pastAngle = 0;
  }

  update() {
    //calculate the angle difference from that last frame and this one
    this.offset =  wheel.compoundBody.angle;
    this.angle = this.offset - this.pastAngle;

    //save the wheel angle for the next frame
    this.pastAngle = this.offset;
  }

  rotatorize(position) {
    //Create a new 2D vector to allow using the p5Vector.rotate function that only works on 2D vector
    let positionVector2D = createVector(position.x, position.y);
    positionVector2D.rotate(this.angle);

    return positionVector2D;
  }
}
