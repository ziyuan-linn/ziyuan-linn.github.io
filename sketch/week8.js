let facemesh;
let video;
let predictions = [];

let osc;
const C = 256;
let notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
let noteBoxes = [];

let playing = false;

let digital = true;

function setup() {
  let cvn = createCanvas(640, 480);
  cvn.parent('sketch-holder');
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, () => {
    facemesh.on("predict", results => {
      predictions = results;
    });
  });

  video.hide();

  for (let i = 0; i < 12; i++) {
    noteBoxes.push(new NoteBox(0, height - (height / 12 * (i + 1)), width, height / 12, notes[i]));
  }

  osc = new p5.Oscillator('sine');
  
}

function draw() {
  image(video, 0, 0, width, height);

  for(let i = 0; i < noteBoxes.length; i++){
    noteBoxes[i].display();
  }

  if (predictions.length > 0) {
    if (!playing) {
      osc.start();
      playing = true;
    }

    drawMouth();

    let freq
    if (!digital) {
      freq = C * pow(pow(2, 1.0 / 12), map(mouthPos()[1], height, 0, -0.5, 12.5));
    }
    else {
      freq = C * pow(pow(2, 1.0 / 12), round(map(mouthPos()[1], height - height / 24, 0 - height / 24, 0, 12)));
    }
    let amp = min(max(map(openDist(), 3, 25, 0, 1), 0), 1);
    osc.amp(amp, 0.05);
    osc.freq(freq, 0.05);
  }
  else {
    osc.amp(0, 0.1);
    playing = false;
  }
  
}

// A function to draw ellipse s over the mouth
function drawMouth() {

  let topLip = predictions[0].annotations.lipsUpperInner;
  let bottomLip = predictions[0].annotations.lipsLowerInner;

  push();
  noStroke();
  fill(0);
  beginShape();
  for (let i = 0; i < topLip.length; i++) {
    let x = topLip[i][0];
    let y = topLip[i][1];
    curveVertex(x, y);
  }
  for (let i = bottomLip.length - 1; i >= 0; i--) {
    let x = bottomLip[i][0];
    let y = bottomLip[i][1];
    curveVertex(x, y);
  }
  curveVertex(topLip[0][0], topLip[0][1]);
  endShape();
  pop();
}

//calculate how much the mouth is open
function openDist() {
  let topLipMiddle = predictions[0].annotations.lipsUpperInner[6];
  let bottomLipMiddle = predictions[0].annotations.lipsLowerInner[6];
  let d = dist(topLipMiddle[0], topLipMiddle[1], bottomLipMiddle[0], bottomLipMiddle[1]);
  return d;
}

function mouthPos() {
  let topLipMiddle = predictions[0].annotations.lipsUpperInner[6];
  let bottomLipMiddle = predictions[0].annotations.lipsLowerInner[6];
  let centerX = (topLipMiddle[0] + bottomLipMiddle[0]) / 2;
  let centerY = (topLipMiddle[1] + bottomLipMiddle[1]) / 2;
  return [centerX, centerY];
}

class NoteBox {
  constructor(x, y, w, h, note) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.note = note;
  }

  display() {
    push();
    fill(255, 150);
    strokeWeight(2);
    rect(this.x, this.y, this.w, this.h);
    noStroke();
    fill(0);
    textSize(20);
    text(this.note, this.x + 10, this.y + 30);
    pop();
  }

  isMouthOver() {
    let pos = mouthPos();
    if(pos[0] > this.x && pos[0] < this.x + this.w && pos[1] > this.y && pos[1] < this.y + this.h) {
      return true;
    }
  }

}