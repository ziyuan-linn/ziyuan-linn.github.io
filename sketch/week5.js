let video;
let neuralNetwork;
let handPose;
let handRes = [];

let trained = false;

let currentId = 1;

let classTabs = [];

let cvn;

function setup() {
  cvn = createCanvas(windowWidth / 2 - 40, 400);
  cvn.parent("canvas");

  fill(0, 255, 0);
  noStroke();

  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  handPose = ml5.handpose(video, () => {
    handPose.on('hand', gotHand);
  })

  neuralNetwork = ml5.neuralNetwork({
    task: 'classification',
    debug: false
  })
  //"add sample" button

  //"train" button
  $("#train").click(() => {
    $("#trainModel").hide();
    $("#training").show();
    neuralNetwork.normalizeData();
    neuralNetwork.train({ epochs: 50 }, () => {
      $("#training").hide();
      $("#preview").show();
      trained = true;
    });
  });

  $("#download").click(() => {
    neuralNetwork.save();
  })

  $("#addClass").click(() => {
    classTabs.push(new ClassTab());
  })

}

function draw() {
  background(0,0,0);
  let maxValue = width * 0.75 > height ? height * 1.33 : width;
  let top = max(0, (height - width * 0.75) / 2);
  let left = max(0, (width - height * 1.33) / 2);
  image(video, left, top, maxValue, maxValue * 0.75);

  if (handRes.length > 0) {
    let points = flattenResult(handRes);
    for (i = 0; i < 42; i+= 2) {
      circle(points[i] / 640 * maxValue + left, points[i+1] / 480 * maxValue * 0.75 + top / 2, 3);
    }
  }

  if (trained && handRes.length != 0) {
    neuralNetwork.classify(flattenResult(handRes), (err, res) => {
      console.log(res);
      $("#prediction").html("Classification: " + res[0].label + "<br>Confidence: " + round(res[0].confidence, 3));
    });
    
  }
}

function windowResized() {
  cvn = resizeCanvas(windowWidth / 2 - 40, 400);
}

function gotHand(res) {
  handRes = res;
}

function flattenResult(res) {
  let points = [];
  res[0].landmarks.forEach((arr) => {
    points.push(arr[0]);
    points.push(arr[1]);
  });
  return points;
}

class ClassTab {
  constructor() {
    this.id = currentId;
    this.label = this.id;
    this.count = 0;

    let tab = `<div class=\"classTab\" id=\"t`+ currentId +`\">
                  <span class=\"name\">Class:</span> <input class=\"label\" type="text" id=\"n`+ currentId +`\" value=\"`+ this.label+`\">
                  <div class=\"count\" id=\"c`+ currentId +`\">Samples added: 0</div>
                  <button class=\"button\" id=\"b`+ currentId +`\">Add Sample</button>
                  <div class=\"remove\" id=\"r`+ currentId +`\">+</div>
                </div>`;
    
    $("#addClassDiv").before(tab);
    this.updateClickEvent();
    this.setInput();
    this.setupRemove();
    currentId++;
  }

  updateClickEvent() {
    $("#b" + this.id).click(() => {
      if (handRes.length > 0) {
        //rename Label if label starts with numbers
        let labelName;
        //if ()
        neuralNetwork.addData(flattenResult(handRes), [""+this.label]);
        this.incrementCount();
      }
      console.log(neuralNetwork.data);
    });
  }

  setInput() {
    $("#n" + this.id).on('input', () => {
      this.label = $("#n" + this.id).val();
      console.log(this.label);
    })
  }
  setupRemove() {
    $("#r" + this.id).click(() => {
      $("#t" + this.id).remove();
    }); 
  }
  incrementCount() {
    this.count++;
    $("#c" + this.id).html("Samples added: " + this.count);
  }
}
