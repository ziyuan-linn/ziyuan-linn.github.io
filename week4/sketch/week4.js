let poseNet;
let video;
let poses = [];
let modelReady = false;

let history = [];

function setup() {
  let maxSize = windowWidth > windowHeight ? windowHeight * 1.333 : windowWidth;
  let cvn = createCanvas(maxSize, maxSize * 0.75);
  cvn.style("position", "absolute");
  cvn.style("left", "50%");
  cvn.style("top", "50%");
  cvn.style("transform", "translate(-50%, -50%)");
  noFill();
  stroke(255);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  flippedImage  = ml5.flipImage(video);
  poseNet = ml5.poseNet(video, () => {
    modelReady = true;
    console.log("Model is ready");
  });

  poseNet.on("pose", (results) => {
    if (results.length > 0) {
      poses = results;
    }
  });
}

function draw() {
  translate(width,0);
  scale(-1.0,1.0);
  
  //image(video, 0, 0, width, height);
  background(0,0,0);

  if (poses.length > 0) {
    let person = poses[0].pose;

    //array of face data
    let face = [
      (person.nose.x / 640) * width, //0
      (person.nose.y / 480) * height, //1
      (person.leftEye.x / 640) * width, //2
      (person.leftEye.y / 480) * height, //3
      (person.rightEye.x / 640) * width, //4
      (person.rightEye.y / 480) * height, //5
      (person.leftEar.x / 640) * width, //6
      (person.leftEar.y / 480) * height, //7
      (person.rightEar.x / 640) * width, //8
      (person.rightEar.y / 480) * height //9
    ];
    history.push(face);
    //remove first elem if array is longer than 20
    if (history.length > 10) history.shift();
  }

  for (let i = 0; i < history.length; i++) {
    let face = history[i];
    //draw horizontal curve on face
    curve(face[6], face[7], face[6], face[7], face[2], face[3], face[4], face[5]);
    curve(face[2], face[3], face[4], face[5], face[8], face[9], face[8], face[9]);
    curve(face[6], face[7], face[2], face[3], face[4], face[5], face[8], face[9]);

    //get center point of face
    let ctrx = face[4] - (face[4] - face[2]) / 2;
    let ctry = face[5] - (face[5] - face[3]) / 2;

    //calculate angle to draw the vertical line
    let angle = atan2(face[5] - face[3], face[4] - face[2]);
    let distance = dist(face[6], face[7], face[8], face[9]) * 0.8;

    //find top and bottom points
    let topx = cos(angle + PI / 2) * distance + ctrx;
    let topy = sin(angle + PI / 2) * distance + ctry;
    let botx = cos(angle - PI / 2) * distance + ctrx;
    let boty = sin(angle - PI / 2) * distance + ctry;

    //draw the vertical line
    line(topx, topy, botx, boty);

    //draw the circle around;
    curveTightness(-0.7);
    beginShape();
    curveVertex(topx, topy);
    curveVertex(face[6], face[7]);
    curveVertex(botx, boty);
    curveVertex(face[8], face[9]);
    curveVertex(topx, topy);
    curveVertex(face[6], face[7]);
    curveVertex(botx, boty);
    curveVertex(face[8], face[9]);
    endShape();
  }
}

function windowResized() {
  let maxSize = windowWidth > windowHeight * 1.333 ? windowHeight * 1.333 : windowWidth;
  resizeCanvas(maxSize, maxSize * 0.75, false);
}
