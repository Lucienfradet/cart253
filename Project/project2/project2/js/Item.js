//Not implemented at all
//These will be the items that the radar will spawm and that the MeatBall will have to avoid or catch.

class Item {
  constructor(x, y, z) {
    this.position = createVector(x, y, z);
    this.speed = createVector(0, 0, sliders[7].value);
    this.size = 30;
    this.offset = 0;
    this.pastAngle = 0;
    this.angle = 0;
  }

  followTunnel() {
    //follow the tunnel on the Z axis
    this.position.add(this.speed);

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

  display() {
    push();
    noFill();
    strokeWeight(3);
    stroke(255);
    translate(this.position.x, this.position.y, this.position.z);
    ellipse(0, 0, this.size);
    pop();
  }

  isOffScreen() {
    return (this.position.z > 300);
  }

  collision() {
    let d = dist(this.position.x, this.position.y, this.position.z, meatBall.body.position.x, meatBall.body.position.y, 0);
    return (d + this.size/2 < meatBall.radius + 50);
  }


}
