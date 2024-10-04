//#mathober2024
//form

//connect yourself here

// between ever-changing points

// to form but a line
const bgCol = "#447abd";
const gCol = "#a2c2e8";
const nGrid = 20;
let w;
let gSpace;

function setup() {
  w = max(500, min(windowWidth, windowHeight) * 0.9);
  createCanvas(w, w);
  describe(
    "lines making a frame through changing slope and animating inward with an identical frame rotating in the center - as they get closer a circle almost forms. This is in a blueprint design. "
  );
  rectMode(CENTER);
  angleMode(DEGREES);
  textSize(16);
  // noLoop();
}

function draw() {
  background(bgCol);
  translate(w / 2, w / 2);
  drawGrid();
  t = frameCount / 3;
  stroke(255);
  strokeWeight(1);
  push();
  translate(-w / 2 + gSpace, -w / 2 + gSpace);

  //Ax+BY = C where C = B/A and B = n - A
  standardForm();
  pop();
  push();
  rotate(t / 2);
  scale(0.5, 0.5);
  translate(-w / 2, -w / 2);
  standardForm();
  pop();

  noStroke();
  fill(bgCol);
  rect(0, -w / 2 + gSpace / 2, w, gSpace);
  rect(-w / 2 + gSpace / 2, 0, gSpace, w);
  rect(0, w / 2 - gSpace / 2, w, gSpace);
  rect(w / 2 - gSpace / 2, 0, gSpace, w);
  fill(gCol);
  text("form", -w / 2 + 10, w / 2 - 10);
}

function drawGrid() {
  gSpace = (w / nGrid) * 0.95;
  stroke(gCol);
  strokeWeight(0.3);
  for (let i = 1; i <= nGrid; i++) {
    for (let j = 1; j <= nGrid; j++) {
      line(
        -w / 2 + gSpace * i,
        -w / 2 + gSpace,
        -w / 2 + gSpace * i,
        w / 2 - gSpace
      );
      line(
        -w / 2 + gSpace,
        -w / 2 + gSpace * i,
        w / 2 - gSpace,
        -w / 2 + gSpace * i
      );
    }
  }
  noFill();
  strokeWeight(3);
  rect(0, 0, w - 2 * gSpace);
}

function standardForm() {
  for (let i = 0; i < nGrid; i++) {
    A = i;
    B = nGrid - i;
    C = B * A * abs(sin(t));
    x1 = 0;
    y1 = (-B / A) * x1 + C / A;
    x2 = A;
    y2 = (-B / A) * x2 + C / A;
    line(x1 * gSpace, y1 * gSpace, x2 * gSpace, y2 * gSpace);
    push();
    translate(w - gSpace * 2, 0);
    scale(-1, 1);
    line(x1 * gSpace, y1 * gSpace, x2 * gSpace, y2 * gSpace);
    pop();
    push();
    translate(0, w - gSpace * 2);
    scale(1, -1);
    line(x1 * gSpace, y1 * gSpace, x2 * gSpace, y2 * gSpace);
    push();
    translate(w - gSpace * 2, 0);
    scale(-1, 1);
    line(x1 * gSpace, y1 * gSpace, x2 * gSpace, y2 * gSpace);
    pop();
    pop();
    // console.log(x1, y1, x2, y2);
  }
}

function mousePressed() {
  setup();
  draw();
}
function windowResized() {
  setup();
  draw();
}
