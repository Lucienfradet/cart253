/**
Play with p5.sound Library!
*/

"use strict";

let barkSFX;
let peaks; // To store our array of peaks
// Whether to display "BARK!"
let showBarkText = false;


/**
Description of preload
*/
function preload() {
  barkSFX = loadSound("assets/sounds/bark.wav");
}


/**
Description of setup
*/
function setup() {
  createCanvas(500, 400);
  background(0);

  userStartAudio();

  // Use getPeaks() to get the peaks in our sound file
  // We specify "width" as the size of the array of peaks
  // so that we can easily draw the waveform across the
  // width of the canvas, one piece of peak data per pixel
  peaks = barkSFX.getPeaks(width);

  // Add cues to our sound at specific times (in seconds)
  // which will call either showBark() or hideBark() in order
  // to only show the text during barking sounds...
  barkSFX.addCue(0.1, showBark);
  barkSFX.addCue(0.3, hideBark);
  barkSFX.addCue(0.4, showBark);
  barkSFX.addCue(0.7, hideBark);
}


/**
Description of draw()
*/
function draw() {
  background(0);

  // If showBarkText is true, we should display BARK! on the canvas
  if (showBarkText) {
    push();
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);
    text(`BARK!`, width / 2, height / 2);
    pop();
  }

  let panning = map(mouseX, 0, width, -1, 1);
  panning = constrain(panning, -1, 1);
  barkSFX.pan(panning);

  // Display the peaks if the sound file is currently playing
  if (barkSFX.isPlaying()) {
    drawPeaks();
  }
}

// Called when the appropriate cue is triggered!
function showBark() {
  showBarkText = true;
}

// Called when the appropriate cue is triggered!
function hideBark() {
  showBarkText = false;
}

// drawPeaks() runs through the array of peaks and graphs them
function drawPeaks() {
  push();
  stroke(255);
  // Run through every peak in the array
  for (let i = 0; i < peaks.length; i++) {
    // Get the current peak data
    let peak = peaks[i];
    // Map the data to a y position. The peak data is between -1 and 1
    // but we want to display it on the canvas, so we map to a number
    // between 0 and height
    let y = map(peak, -1, 1, 0, height);
    // Draw a line from the center of the canvas to the mapped peak value
    // with an x set to "i" because we're going through an array the
    // width of the canvas...
    line(i, height / 2, i, y);
  }
  pop();
}

function mousePressed() {
  barkSFX.playMode(`sustain`);
  barkSFX.play();
}
