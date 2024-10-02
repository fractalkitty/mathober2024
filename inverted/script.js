//#mathober2024
//invert yourself here
//and find every peice of you
//mapped to existence
const bgCol = "#447abd";
const gCol = "#a2c2e8";
const nGrid = 20;
let w;
let gSpace;

function setup() {
  w = max(500, min(windowWidth, windowHeight) * 0.9);
  describe(
    "inverted circles reflected over the y-axis drawn on a blue-print design. They animate by rotating into each other. "
  );
  createCanvas(w, w);
  rectMode(CENTER);
  nV = 3; //random([3, 4, 5, 6, 7, 8, 9]);
  mul = [0.89, 0.92, 0.93, 0.935, 0.935, 0.94, 0.945];
  r = (w * 0.82) / 2;
  d = w;
  angleMode(DEGREES);
  textSize(16);
}

function draw() {
  background(bgCol);
  translate(w / 2, w / 2);
  drawGrid();
  t = frameCount / 3;
  stroke(255);
  strokeWeight(2);
  d = 6;
  r = (d / 2) * gSpace;
  oa = 2 * gSpace;
  oa_p = (r * r) / oa;
  //r^2 = oa*oa'
  c = { x: 0, y: 0 };
  a_theta = 180 * sin(t / 10);
  a = { x: oa * cos(a_theta), y: oa * sin(a_theta) };
  a_p = { x: oa_p * cos(a_theta), y: oa_p * sin(a_theta) };
  strokeWeight(3);
  circle(c.x, c.y, gSpace * d);
  circle(c.x, c.y, 4);
  // circle(a.x, a.y, 4);
  // circle(-a.x, a.y, 4);
  // circle(a_p.x,a_p.y,4)
  r2 = gSpace;
  strokeWeight(0.5);

  for (let j = 0; j < 7; j++) {
    r2 = gSpace * j + 2 * gSpace * sin(t / 10);
    stroke(gCol);
    strokeWeight(1);
    circle(a.x, a.y, r2 / 2);
    circle(-a.x, a.y, r2 / 2);
    stroke(255);
    strokeWeight(1);
    for (let i = 0; i < 360; i++) {
      let p = { x: a.x + r2 * cos(i), y: a.y + r2 * sin(i) };

      p_theta = atan(p.y / p.x);
      invertPoint(r, p, p_theta);
    }
  }
  invertPoint(r, a, 0);
  //   push();

  //   drawingContext.setLineDash([5, 5]);
  //   line(a.x, a.y, c.x, c.y);
  //   pop();
  noStroke();
  fill(gCol);
  text("inverted", -w / 2 + 10, w / 2 - 10);
}

function invertPoint(r, p, theta) {
  pr = dist(p.x, p.y, 0, 0);
  pr_p = (r * r) / pr;
  p_p = { x: pr_p * cos(theta), y: pr_p * sin(theta) };
  circle(p_p.x, p_p.y, 0.5);
  circle(-p_p.x, p_p.y, 0.5);
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

function mousePressed() {
  setup();
  draw();
}
function windowResized() {
  setup();
  draw();
}