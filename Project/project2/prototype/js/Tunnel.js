let deploy = false;

class Tunnel {
  constructor(layer) {
    this.layer = layer;
    this.zPositionOffset = 0;
    this.colorOpacity = 10 * layer;
    this.position = createVector(0, 0, 0);
    this.radius = 150; //radius of the tunnel entrance
    this.radiusOffset = 25; //amount of space that the perlin noise will have to affect the radius
    this.noiseZoff = 0.3;
    this.zoff = 0 - this.noiseZoff * this.layer; //third dimension of perlin noise
    this.rotation = 0; //actually the phase
    this.rotationSpeed = 0.05;
    this.noiseMax = 5;

  }

  rotate() {
    if (keyIsDown(65)) { //A key
      this.rotation -= this.rotationSpeed;
    }

    if (keyIsDown(68)) { //D key
      this.rotation += this.rotationSpeed;
    }
  }

  deploy() {
    deploy = true;
    if (this.zPositionOffset < 50) {
      this.zPositionOffset += 1;
      this.position.z = -this.zPositionOffset * this.layer;
    }
  }

  display() {

    push();
    //Begin the tunnel with only one layer visible
    if (deploy) {
      stroke(255, 255 - this.colorOpacity); //Dilute the stroke as the cricles move back on the z axis
    }
    else if (this.layer === 0) {
      stroke(255);
    }
    else {
      noStroke();
    }

    noFill();
    strokeWeight(1.5);

    //The beginShape function is the way to implement noise in my circles but I'm still uncertain of how it works.
    beginShape();
      for (let i = 0; i < TWO_PI; i += (PI/50)) {
        let xoff = map(sin(i + this.rotation), -1, 1, 0, this.noiseMax);
        let yoff = map(cos(i + this.rotation), -1, 1, 0, this.noiseMax);
        let r = map(noise(xoff, yoff, this.zoff), 0, 1, this.radius, this.radius + this.radiusOffset);
        let x = r * sin(i);
        let y = r * cos(i);
        vertex(x + this.position.x, y + this.position.y, this.position.z);
      }
    endShape(CLOSE);
    pop();

    this.zoff += 0.05;
    //this.phase += 0.01; //Allows to "rotate" the whole tunnel. It actually affects the xoff and yoff values.
    //this.position.z += 0.01;
    //this.noiseMax *= 1.1;


  }
}
