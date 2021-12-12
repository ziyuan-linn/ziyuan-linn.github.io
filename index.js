let game;
let startScreen;
let endOfDay;

let testIcon;
let testImage;
let gameState = "start";
let startTime = 0;
let time = 0;
let days = 0;

let testfile;

function preload() {
  testImage = loadImage('assets/images/testImage.jpg');

  boldFont = loadFont('assets/fonts/Bold.ttf');
  regularFont = loadFont('assets/fonts/Regular.ttf');

  closeButtonImg = loadImage('assets/images/closeButton.png');

  title_01 = loadImage('assets/images/title-01.gif');
  bg_01 = loadImage('assets/images/bg-01.gif');
  start_01 = loadImage('assets/images/start_game_01.gif');

  folder_01 = loadImage('assets/images/folder_01.png');
  key_01 = loadImage('assets/images/key_01.png');
  recycle_bin_01 = loadImage('assets/images/recycle_bin_01.png');
  terminal_01 = loadImage('assets/images/terminal_01.png');
  text_file_01 = loadImage('assets/images/text_file_01.png');
  text_file_E = loadImage('assets/images/text_file_E.png');
  text_file_S = loadImage('assets/images/text_file_S.png');
  text_file_U = loadImage('assets/images/text_file_U.png');
  unlock_01 = loadImage('assets/images/unlock_01.png');
  work_01 = loadImage('assets/images/work_01.png');
  clock_01 = loadImage('assets/images/clock_01.png');
  message_01 = loadImage('assets/images/message_01.png');
  frog_01 = loadImage('assets/images/frog_01.png');
  frog_file_01 = loadImage('assets/images/frog_file_01.png');

  texts = loadJSON('texts.json');
}

function setup() {
  //create the canvas according to the screen size
  if (windowWidth * 0.75 > windowHeight) {
    createCanvas(windowHeight * 1.3333333, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth * 0.75);
  }
  pixelDensity(2);
  noSmooth();
  noStroke();
  //set up the object in game
  game = new Game();
  startScreen = new StartScreen(bg_01, title_01, start_01);
  endOfDay = new EndOfDay();

  testfile = new TextFile(0.35, 0.3, 0.5, 0.6, "Text - Rules", texts.rules);
}

function draw() {
  time = millis() - startTime;

  switch (gameState) {
    case "start":
      startScreen.display();
      break;

    case "game":
      game.display();
      //end the day if 288000ms passes //change the time here to speed up day change for debugging
      if (time >= 288000) {
        days++;
        gameState = "endOfDay"
        endOfDay = new EndOfDay();
      }
      break;

    case "endOfDay":
      endOfDay.display();
      break;
  }
}

function mousePressed() {
  switch (gameState) {
    case "start":
      startScreen.pressed();
      break;

    case "game":
      game.pressed();
      break;

    case "endOfDay":
      endOfDay.pressed()
      break;
  }
}

function mouseDragged() {
  switch (gameState) {
    case "start":
      break;

    case "game":
      game.dragged();
      break;

    case "endOfDay":
      break;
  }
}

function mouseReleased() {
  switch (gameState) {
    case "start":
      startScreen.released();
      break;

    case "game":
      game.released();
      break;

    case "endOfDay":
      endOfDay.released();
      break;
  }
}

function doubleClicked() {
  switch (gameState) {
    case "start":
      break;

    case "game":
      game.doubleClicked();
      break;

    case "endOfDay":
      break;
  }
}

//when the size of the window is changed
function windowResized() {
  if (windowWidth * 0.75 > windowHeight) {
    resizeCanvas(windowHeight * 1.3333333, windowHeight);
  }
  else {
    resizeCanvas(windowWidth, windowWidth * 0.75);
  }
}
