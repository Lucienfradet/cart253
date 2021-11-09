let gravityForce = 0.005;

class MeatBall {
  constructor() {
    this.position = createVector(5, 10);
    this.speed = createVector(0, 0);
    //this.speed.setMag(3);
    this.acceleration = createVector();
    this.rotation = 0;
    this.friction = createVector();
    this.size = 25;
    this.detail = 7;
  }

  move() {
    let gravity = createVector(0, gravityForce);
    console.log(`tunnelRadius: ${tunnel[1].radius}`);

    let d = dist(this.position.x, this.position.y, tunnel[1].position.x, tunnel[1].position.y);
    //Code greatly inspired by this StackOverflow post https://stackoverflow.com/questions/69330329/circle-inside-of-a-circle-collision-resolution-in-p5-js (Consulted on November 9th 2021)
    if (d >= tunnel[1].radius + this.size/2) { //if the meatball position is greater than the tunnel entrance minus half the meatball size
      let theta = atan2(this.position.y, this.position.x);

      let positionX = tunnel[1].radius * cos(theta);
      let positionY = tunnel[1].radius * sin(theta);
      let intersectionPoint = createVector(positionX, positionY); //point of intersection Vector

      // Find the tangent of the circle at the point of intersection
      let tangent = intersectionPoint.copy();
      tangent.rotate(PI / 2);

      // Check the angle between our velocity, and the vector towards the POI
      let angle = this.speed.angleBetween(intersectionPoint);
      // Don't "collide" if the circle is already moving back towards the center
      if (abs(angle) <= PI / 2) {
        // When we collide, our velocity vector should be mirrored, if we were pointing outwards at a 45 degree angle, we should now be pointed inward at a 45 degree angle
        this.speed.rotate(this.speed.angleBetween(tangent) * 2);
      }

    }

   this.acceleration.add(gravity);
   this.speed.add(this.acceleration);
   this.position.add(this.speed);
   console.log(`d: ${d}`);
  }

  display() {
    push();
    fill(255);
    noStroke();
    ellipseMode(CENTER);
    ellipse(this.position.x, this.position.y, this.size, this.size, this.detail);
    pop();
  }


}
