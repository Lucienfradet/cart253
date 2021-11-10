class Radar {
  constructor() {
    this.position = createVector(tunnel[0].radius, tunnel[0].radius, tunnel[tunnel.length-1].position.z);
    this.positionZ = 0;
    this.angle = 0.001;
    this.amplitude = tunnel[0].radius;
    this.rotationAxis = createVector(0, 0, 1);

  }

  rotate() {
    this.rotationAxis.normalize();
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

    // this.position.rotate(this.angle);
    //this.angle += 0.000001;
  }

  display() {
    this.positionZ = tunnel[tunnel.length-1].position.z;
    this.position.setMag(this.amplitude);
    push();
    noFill();
    stroke(255);
    strokeWeight(20);
    line(0 , 0, this.positionZ, this.position.x, this.position.y, this.positionZ);
    pop();

    console.log(`x: ${this.position.x}`);
    console.log(`y: ${this.position.y}`);

    push();
    fill(255);
    noStroke();
    translate(0, 0, this.positionZ);
    ellipse(0, 0, 30);
    pop();


  }
}
