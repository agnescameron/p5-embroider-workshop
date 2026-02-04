let drawMode = "stitch";

function setup() {
  //10cm by 10cm canvas
  createCanvas(mmToPixel(100), mmToPixel(100));

  let exportPesButton = createButton("Export PES");
  exportPesButton.mousePressed(() => {
    exportEmbroidery("template.pes");
  });
  exportPesButton.position(10, height + 30);
}

function draw() {
  background("lightgrey");

  setStitch(0.5, 5, 0);
  beginRecord(this);
  stroke(0);

  // // ORDINARY VERTICES
  // beginShape();
  //   vertex(10,10);
  //   vertex(80,5);
  //   vertex(90,50);
  //   vertex(95,70);
  //   vertex(30,50);
  //   vertex(10,30);
  //   vertex(10,10);
  // endShape();

  // // curve splines
  // // curveVertex(x, y) 
  for (i = 1; i < 10; i++) {
    beginShape();
      for (j = 1; j < 10; j++) {
        curveVertex(i*10 + Math.random()*10 -5, j*10);
      }
    endShape();
  }

  // // bezier curves
  // // bezierVertex(x2, y2, x3, y3, x4, y4) 
  // // x1, y1 are taken from the previous point!
  // beginShape();
  // vertex(10, 10);
  // for (i = 1; i < 10; i++) {
  //   for (j = 1; j < 10; j++) {
  //     bezierVertex(i*i + (10-i), 0, i*10, j*10 + (15-j), i*5 - 1, i*5);
  //   }
  // }
  // endShape();

  trimThread(); // comment back in when you add some code
  endRecord();
  noLoop();
}