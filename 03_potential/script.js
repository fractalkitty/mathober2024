//#mathober2024
const bgCol = "#447abd";
const gCol = "#a2c2e8";
const nGrid = 20;
let charges;
let w, gSpace;

function setup() {
  w = max(500, min(windowWidth, windowHeight) * 0.9);
  createCanvas(w, w);
  describe(
    "an electric potential field with little dashes that orient themselves in response to moving charges (positive and negative). This is all in a blueprint design of blue and white."
  );
  rectMode(CENTER);
  angleMode(DEGREES);
  textSize(16);
}

function draw() {
  background(bgCol);
  translate(w / 2, w / 2);
  drawGrid();
  t = frameCount / 3;

  charges = [
    { x: (w / 5) * cos(t + 30) * sin(t / 2), y: (w / 5) * sin(t - 20), q: -1 },
    {
      x: (w / 2.5) * cos(t - 70) * sin(t / 6),
      y: (w / 5) * sin(t + 50),
      q: -1
    },
    { x: (w / 3) * cos(t / 2), y: (w / 3) * sin(t / 2 - 30), q: -1 },
    { x: (w / 8) * cos(t / 3), y: (w / 8) * sin(t / 3 - 40), q: -1 },
    { x: (-w / 5) * cos(t), y: (-w / 5) * sin(t) * cos(t / 4 + 80), q: 1 },
    {
      x: (-w / 3) * cos(t / 2 - 70) * sin(t / 5),
      y: (-w / 3) * sin(t / 2 + 10),
      q: 1
    },
    {
      x: (-w / 8) * cos(t / 3) * sin(t / 2 - 30),
      y: (-w / 8) * sin(t - 60) * cos(t / 8),
      q: 1
    },
    {
      x: (-w / 6) * cos(t / 1.5 + 180) * sin(t / 2),
      y: (-w / 6) * sin(t - 180) * cos(t / 8),
      q: 1
    }
  ];
  strokeWeight(2);
  stroke(gCol);
  for (let x = -w / 2 + gSpace * 2; x < w / 2 - gSpace * 2; x += gSpace) {
    for (let y = -w / 2 + gSpace * 2; y < w / 2 - gSpace * 2; y += gSpace) {
      let potentialGradient = createVector(0, 0);
      for (let charge of charges) {
        let dx = x - charge.x;
        let dy = y - charge.y;
        let distSq = dx * dx + dy * dy;
        let dist1 = sqrt(distSq);
        //https://p5js.org/search/?term=vector - useful for how to play with vectors
        if (dist1 > 1) {
          let forceMagnitude = charge.q / distSq; // q/r^2
          let forceVector = createVector(dx, dy)
            .normalize()
            .mult(forceMagnitude);
          potentialGradient.add(forceVector);
        }
      }
      let angle = potentialGradient.heading();
      let len = gSpace / 2;

      push();
      translate(x, y);
      rotate(angle);
      line(-len / 2, 0, len / 2, 0);
      pop();
    }
  }
  stroke(255);
  strokeWeight(1);
  for (let i = 0; i < charges.length; i++) {
    if (charges[i].q > 0) {
      push();
      fill(bgCol);
      circle(charges[i].x, charges[i].y, gSpace / 2);
      pop();
    } else {
      push();
      fill(gCol);
      circle(charges[i].x, charges[i].y, gSpace / 2);
      pop();
    }
  }
  stroke(255);
  strokeWeight(2);
  push();

  pop();
  noStroke();
  fill(gCol);
  text("potential", -w / 2 + 10, w / 2 - 5);
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