class Radar {
  constructor({
    posX,
    posY,
    posZ,
    amp
  }) {

    this.position = createVector(posX, posY, posZ);
    this.centerPositionZ = 0; //Z position of the center point
    this.angle = 0.05;
    this.amplitude = amp;
    this.rotationAxis = createVector(0, 0, 1);

    this.position.setMag(this.amplitude);
  }

  rotate() {
    //I did not want to use the rotate() function because it only affects the display matrix and would not have changed the position vector that I plan on using in the Item class.

    //Rodrigues' rotation formula for 3D vectorial rotation (based on an angle and a normalized  vector of rotation "axis") https://en.wikipedia.org/wiki/Rodrigues%27_rotation_formula
    //Found help about using the formula here: https://stackoverflow.com/questions/67458592/how-would-i-rotate-a-vector-in-3d-space-p5-js (Consulted on November 9th 2021)

    this.rotationAxis.normalize(); //making sure the vector is normalized
    this.position = p5.Vector.add(
      p5.Vector.mult(
        this.position,
        cos(this.angle)
      ),
        p5.Vector.add(
          p5.Vector.mult(
            p5.Vector.cross(this.rotationAxis, this.position),
            sin(this.angle)
          ),
          p5.Vector.mult(
            p5.Vector.mult(
              this.rotationAxis,
              p5.Vector.dot(this.rotationAxis, this.position)
            ),
            (1 - cos(this.angle)
          )
        )
      )
    );
  }

  display() {
    //Displays the line
    this.centerPositionZ = tunnel[tunnel.length - 1].position.z; //Follow the tunnel expension
    //this.position.setMag(this.amplitude);

    push();

    rotateZ(wheel.compoundBody.angle);

    noFill();
    stroke(255);
    strokeWeight(20);
    line(0 , 0, this.centerPositionZ, this.position.x, this.position.y, this.centerPositionZ);
    pop();

    //console.log(`x: ${this.position.x}`);
    //console.log(`y: ${this.position.y}`);

    //Displays the Point in the middle of the radar
    push();
    fill(255);
    noStroke();
    translate(0, 0, this.centerPositionZ);
    ellipse(0, 0, 30);
    pop();
  }
}
