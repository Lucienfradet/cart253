//Class dealing with items that the radar spawns (see subclasses)

class Item {
  constructor() {
    this.offset = 0;
    this.pastAngle = 0;
    this.angle = 0;
  }

  //Follow the tunnel/wheel rotation
  followTunnel() {
    //calculate the angle difference from that last frame and this one
    this.offset =  wheel.compoundBody.angle;
    this.angle = this.offset - this.pastAngle;

    //save the wheel angle for the next frame
    this.pastAngle = this.offset;

    //Create a new 2D vector to allow using the p5Vector.rotate function that only works on 2D vector
    let positionVector2D = createVector(this.position.x, this.position.y);
    positionVector2D.rotate(this.angle);

    //Update the position vector with the rotated 2D vector
    this.position.x = positionVector2D.x;
    this.position.y = positionVector2D.y;
  }

  //Checks if the item is out of sight so we can splice up the mofockers! blllllap!
  isOffScreen() {
    return (this.position.z > 300);
  }

  //Checks collision with the meatBall
  collision() {
    let d = dist(this.position.x, this.position.y, this.position.z, meatBall.body.position.x, meatBall.body.position.y, 0);
    return (d + this.size/2 < meatBall.radius * 2);
  }
}
