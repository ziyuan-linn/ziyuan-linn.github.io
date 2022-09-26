/*
@author: Ziyuan Lin

Libraries:
jQuery v3.6.1
p5.js v1.4.2
p5.sound v1.0.1
ml5.js v0.12.2

Special thanks to Zhaoyang Han or musical help
*/

let featureExtractor;
let classifier;
let video;
let creationSample = 0;
let destructionSample = 0;
let bloomSample = 0;
let currentTab = 0;
let lossValue;
let trained = false;
let playing = false;

let circles = [];
let cir;

let polySynth = new p5.PolySynth(p5.MonoSynth, 10);
let instrument;

let state = "none";

function preload() {
  //Load the Model
  featureExtractor = ml5.featureExtractor("MobileNet", () => {
    classifier = featureExtractor.classification(video, { numLabels: 3 }, videoReady);
  });
  video = createCapture(VIDEO);
  video.size(200, 150);
}

function setup() {
  //set up the canvas
  createCanvas(windowWidth, windowHeight);
  background(250);
  frameRate(30);
  strokeCap(PROJECT);

  //put video in html element
  video.parent("webcam");

  initializeButtons();

  //initialize sound
  instrument = new Instrument();
  userStartAudio();
  //create the center circle
  cir = new Circle();
}

function draw() {
  if (playing) {
    //make prediction every 4 frames
    classifier.classify(video, (err, res) => {
      if (err) console.log(err);
      else if (res[0].confidence > 0.5) state = res[0].label;
      else state = "none";
    });

    //respond to different predictions
    doInteraction();

    //display the static circles
    background(250);
    for (let i = 0; i < 10; i++) {
      circles[i]?.update();
      circles[i]?.display();
    }

    //display the center circle
    cir.update();
    cir.display();

    //update the sound
    instrument.update();
  }
}

//when video is ready
function videoReady() {
  $("#creation").show();
}

//add logic to the buttons
function initializeButtons() {
  $(".creation").click(() => {
    if (creationSample < 15) {
      classifier.addImage(video, "creation");
      creationSample++;
      $("#creation .count").html("Samples: " + creationSample + "/15");
    }
    if (creationSample == 15) nextTab();
  });

  $(".destruction").click(() => {
    if (destructionSample < 15) {
      classifier.addImage(video, "destruction");
      destructionSample++;
      $("#destruction .count").html("Samples: " + destructionSample + "/15");
    }
    if (destructionSample == 15) nextTab();
  });

  $(".bloom").click(() => {
    if (bloomSample < 15) {
      classifier.addImage(video, "bloom");
      bloomSample++;
      $("#bloom .count").html("Samples: " + bloomSample + "/15");
    }
    if (bloomSample == 15) nextTab();
  });

  $(".play").click(() => {
    nextTab();
  })
}

//show next tab during sample collection
function nextTab() {
  if (currentTab == 0) {
    $("#creation").hide();
    $("#destruction").show();
    
  } else if (currentTab == 1) {
    $("#destruction").hide();
    $("#bloom").show();
  } else if (currentTab == 2) {
    $("#bloom").hide();
    $("#training").show();
    $(".webcam").hide();
    setTimeout(() => {
      train();
    }, 500);
  }
  else {
    $("#training").hide();
    $(".webcam").css("transform", "translate(0, 0)");
    $(".webcam").css("top", "10px");
    $(".webcam").css("left", "10px");
    $(".webcam").show();
    playing = true;//starts the sketch
  }
  currentTab++;
}

//train the model when called
function train() {
  classifier.train((loss) => {
    if (loss)
      $("#training .count").html("Loss: " + loss);
    else if (loss == null) {
      $("#training .prompt").html("Model is ready!")
      $(".play").show();
    }
      
  });
}

//interact with the user depending on the ml5 predictions
function doInteraction() {
  if (state == "creation") {
    if (circles.length > 1 ? circles[circles.length - 1].opacity >= 255 : true) {
      if (circles.length <= 9) {
        circles.push(new StaticCircle());
      } else {
        circles.shift();
        circles.push(new StaticCircle());
      }
    }
  } else if (state == "destruction") {
    if (circles.length > 0 && circles[0].opacity <= 0) circles.shift();
  }

  if (circles.length > 0) circles[0].exist = false;

  if (state == "bloom") {
    cir.bloom = true;
  } else {
    cir.bloom = false;
  }
}

//the center bloom circle
class Circle {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.maxRad = min(width, height) * 0.5;
    this.radius = 0;
    this.opacity = 255;
    this.fade = false;
    this.bloom = false;
  }

  //to be called every frame
  update() {
    this.radius += 0.5;
    if (this.opacity <= 0) this.radius = 0;
    //if circle is full faded
    if (this.opacity <= 0 && this.bloom) {
      this.fade = false;
      this.opacity = 255;
    }
    //if radius more than 80 percent max radius, start fading
    if (this.radius > this.maxRad * 0.75 || !this.bloom) this.fade = true;

    //fade out the circle
    if (this.fade) {
      this.opacity -= 6;
      //reset collision
    }
  }

  display() {
    push();
    noFill();
    strokeWeight(8);
    stroke(0, this.opacity);
    circle(this.x, this.y, this.radius * 2);
    pop();
  }
}

//the random thin circles
class StaticCircle {
  constructor() {
    this.radius = random(width / 50, width / 10);
    this.maxDist = min(width, height) * 0.45 - this.radius
    this.x = random(width / 2 - this.maxDist, width / 2 + this.maxDist);
    this.y = random(height / 2 - this.maxDist, height / 2 + this.maxDist);
    this.thickness = 0.5;
    this.opacity = 0;
    this.collided = false;
    this.exist = true;

    this.echoRadii = [];

  }

  //to be called every frame
  update() {
    //fade in and out
    if (this.exist && this.opacity < 255) {
      this.opacity = min(255, this.opacity + 6);
    } else if (!this.exist && this.opacity >= 0) {
      this.opacity -= 6;
    }

    //check for collision
    if (
      dist(this.x, this.y, cir.x, cir.y) < this.radius + cir.radius &&
      cir.fade == false &&
      this.exist == true
    ) {
      this.collided = true;
    } else {
      this.collided = false;
    }

    //generate echo wave if collided
    if (this.collided && frameCount % 5 == 0) {
      this.echoRadii.push(this.radius);
    }
    for (let i = 0; i < this.echoRadii.length; i++) {
      this.echoRadii[i] -= 1;
    }
    if (this.echoRadii[0] <= 0) this.echoRadii.shift();
  }

  display() {
    push();
    noFill();
    strokeWeight(this.thickness);
    stroke(0, this.opacity);
    circle(this.x, this.y, this.radius * 2);
    for (let i = 0; i < this.echoRadii.length; i++) {
      stroke(0, this.echoRadii[i] / this.radius * 255 - 130);
      circle(this.x, this.y, this.echoRadii[i] * 2);
    }
    pop();
  }
}

//class for sound
class Instrument {
  constructor() {
    polySynth.setADSR(1, 2);
    this.notes = ["C3", "E3", "G3", "B3", "D4", "F#4", "A4", "C#5", "E5"];
    this.volumes = [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1];
    this.totalNotes = 0;

    this.shuffle(this.notes, this.volumes);
  }

  //to be called every frame
  update() {
    let count = 0;
    for (let i = 0; i < 10; i++) {
      if (circles[i] && circles[i].collided) {
        count++;
      }
    }
    for (let i = 0; i < count - this.totalNotes; i++) {
      polySynth.noteAttack(this.notes[this.totalNotes + i], this.volumes[this.totalNotes + i]);
    }
    this.totalNotes = count;

    if (cir.fade == true) {
      polySynth.noteRelease();
      this.shuffle(this.notes, this.volumes);
    }
  }

  //randomly shuffles the array
  shuffle(array1, array2) {
    var i = array1.length,
      j = 0,
      temp1,
      temp2;
    while (i--) {
      j = floor(Math.random() * (i + 1));

      temp1 = array1[i];
      array1[i] = array1[j];
      array1[j] = temp1;

      temp2 = array2[i];
      array2[i] = array2[j];
      array2[j] = temp2;
    }
  }
}
