let deployed = false;

class Tunnel {
  constructor(layer) {
    this.layer = layer;
    this.zPositionOffset = 0;
    this.profondeur = 50;
    this.deploymentSpeed = 0.8;
    this.colorOpacity = 5 * layer;
    this.position = createVector(0, 0, 0);
    this.radius = 150; //radius of the tunnel entrance
    this.radiusOffset = 25; //amount of space that the perlin noise will have to affect the radius
    this.noiseZoff = 0.3; //a number makes it look like the tunnel is moving toward the viewer (not really what's happening, more like an illusion)
    this.zoff = this.noiseZoff * this.layer; //third dimension of perlin noise
    this.noiseProgressionSpeed = 0.08;
    this.phase = 0; //if this is incremented, you get a rotation effect (position doesn't change)
    this.wheelRotationSpeed = 0.05;
    this.rotationSpeed = 0.02;
    this.noiseMax = 5; //this value affects the amount and strenght of the noise peaks

    //rotation variables:
    this.angle = 0;
    this.pastAngle = 0;
    this.offset = 0;

    this.history = []; //Stores the tunnel[0] position history to input with a delay on the following tunnel rings
  }

  display() {
    push();
    //rotateZ(wheel.compoundBody.angle);
    //Begin the tunnel with only one layer visible
    if (deployed) {
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

    beginShape();
      for (let i = 0; i < TWO_PI; i += (PI/50)) {
        let xoff = map(sin(i + this.phase), -1, 1, 0, this.noiseMax); //Map the sin function to the desired noiseRange
        let yoff = map(cos(i + this.phase), -1, 1, 0, this.noiseMax); //Map the cos function to the desired noiseRange
        let r = map(noise(xoff, yoff, this.zoff), 0, 1, this.radius, this.radius + this.radiusOffset); //Map the noise to the radius and desired radius radiusOffset
        let x = r * sin(i);
        let y = r * cos(i);
        vertex(x + this.position.x, y + this.position.y, this.position.z); //draws every vertex of the circle
      }
    endShape(CLOSE);
    pop();

    this.zoff += this.noiseProgressionSpeed;
    //this.phase += 0.01; //Allows to "rotate" the whole tunnel. It actually affects the xoff and yoff values.
    //this.position.z += 0.01;
    //this.noiseMax *= 1.1;
  }

  update() {
    if (this.layer === 0) {
      this.position = wheel.compoundBody.position;
    }
    //rotateZ(wheel.compoundBody.angle);
  }

  rotate() { //Function using the offset which doen't work really. *Should delete*
    if (keyIsDown(65)) { //A key
      this.phase -= this.rotationSpeed;
    }

    if (keyIsDown(68)) { //D key
      this.phase += this.rotationSpeed;
    }
  }

  deploy() { //deploys the tunnel to the set profondeur parameter
    deployed = true;
    if (this.zPositionOffset < this.profondeur) {
      this.zPositionOffset += this.deploymentSpeed;
      this.position.z = -this.zPositionOffset * this.layer;
    }
  }

  saveHistory() { //pushes the tunnel[0] history into the array
    if (this.history.length > NUM_RING - 2) {
      this.history.splice(0, 1);
    }

    let vPos = createVector(this.position.x, this.position.y);

    this.history.push(vPos);
  }

  applyHistory(i) {
    this.position.x = tunnel[0].history[i].x;
    this.position.y = tunnel[0].history[i].y;
  }
}
