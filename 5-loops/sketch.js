let drawMode = "stitch";

function setup() {
  //10cm by 10cm canvas
  createCanvas(mmToPixel(100), mmToPixel(100));

  let exportPesButton = createButton("Export PES");
  exportPesButton.mousePressed(() => {
    exportEmbroidery("template.pes");
  });
  exportPesButton.position(0, height + 30);
}

function draw() {
  background("lightgrey");


  setStitch(0.5, 5, 0);
  beginRecord(this);
  stroke(255);

  for (i = 1; i < 10; i++) {
      circle(i*10, 50, 5+Math.random()*15);
  }

  // for (i = 1; i < 10; i++) {
  //     circle(i*10, i*10, 5+Math.random()*30);
  // }

  // for (i = 1; i < 10; i+=2) {
  //   for (j = 1; j < 10; j+=2) {
  //     circle(i*10, j*10, 5 + Math.random()*30);
  //   }
  // }

  // trimThread(); // comment back in when you add some code
  endRecord();
  noLoop();
}