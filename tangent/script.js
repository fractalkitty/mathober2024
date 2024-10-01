//#mathober2024
// inscribe yourself here

// and be surrounded by time

// tangent to being
const bgCol = "#447abd";
const gCol = "#a2c2e8";
const nGrid = 20;
let w;
let nV, r, mul, d;

function setup() {
  w = max(500, min(windowWidth, windowHeight) * 0.9);
  describe(
    "A triangle with moving circles on its inside with and inscribed larger circle that makes a tangent like web with an even smaller circle. The sketch looks like a blueprint with a grid and drawing marks to show the formation of the triangle. "
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
  push();
  rotate(30);
  tang(t);
  pop();
  noStroke();
  fill(gCol);
  text("tangent", -w / 2 + 10, w / 2 - 10);
}

function tang(t) {
  for (let i = 0; i < nV; i++) {
    let theta1 = (360 / nV) * i;
    let theta2 = (360 / nV) * (i + 1);
    x1 = r * cos(theta1);
    y1 = r * sin(theta1);
    x2 = r * cos(theta2);
    y2 = r * sin(theta2);
    line(x1, y1, x2, y2);
    r3 = dist(
      r * cos(theta1),
      r * sin(theta1),
      0.9 * r * cos(theta1),
      0.9 * r * sin(theta1)
    );
    dx = r * mul[nV - 3] * cos(theta2) - r * mul[nV - 3] * cos(theta1);
    dy = r * mul[nV - 3] * sin(theta2) - r * mul[nV - 3] * sin(theta1);
    nn = 3;
    for (let j = 0; j < nn; j++) {
      x = x1 * mul[nV - 3] + dx * abs(sin((t + (360 / nn) * j) % 90));
      y = y1 * mul[nV - 3] + dy * abs(sin((t + (360 / nn) * j) % 90));
      // circle(x, y, r3);
      push();
      // strokeWeight(1);
      // stroke(colors[c3]);
      translate(x, y);
      // fill(colors[c1]);
      strokeWeight(1);
      circle(0, 0, r3);
      push();
      strokeWeight(0.5);
      rotate(-10 * t);
      ns = 5;
      for (let k = 0; k < ns; k++) {
        line(
          (r3 / 2) * cos((k * 180) / ns),
          (r3 / 2) * sin((k * 180) / ns),
          (-r3 / 2) * cos((k * 360) / ns),
          (-r3 / 2) * sin((k * 360) / ns)
        );
      }
      pop();

      // circle(r * 0.02 * cos(t * 14), r * 0.02 * sin(t * 14), r * 0.03);

      pop();
    }
    h = 0.78;
    strokeWeight(1);
    x1 = r * h * cos(theta1);
    y1 = r * h * sin(theta1);
    x2 = r * h * cos(theta2);
    y2 = r * h * sin(theta2);
    line(x1, y1, x2, y2);
    strokeWeight(3);
    circle(0, 0, h * r);
    circle(0, 0, (h * r) / 2);
    ns = 50;
    push();
    rotate(t / 10);
    for (let k = 0; k < ns; k++) {
      strokeWeight(1);
      line(
        ((h * r) / 2) * cos((360 / ns) * k),
        ((h * r) / 2) * sin((360 / ns) * k),
        ((h * r) / 2) * cos((360 / ns) * k + 120),
        ((h * r) / 2) * sin((360 / ns) * k + 120)
      );
    }
    pop();
    push();
    stroke(gCol);
    strokeWeight(0.5);
    circle(x1, y1, r * 2);
    circle(0, 0, r * 2);
    pop();
  }
}

function drawGrid() {
  const gSpace = (w / nGrid) * 0.95;
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