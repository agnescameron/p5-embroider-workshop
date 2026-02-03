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

  // commands go here
  fill(255, 155, 0);

  setFillSettings({
    angle: 0, // number between 0-360
    stitchLength: 3, // average stitch length in mm
    stitchWidth: 0.2, // number between 0-1
    rowSpacing: 0.8, // space between rows in mm
    minStitchLength: 0.5, // minimum stitch length in mm
    resampleNoise: 0.2, // space between rows in mm
    alternateAngle: false,
  });

  setFillMode("tatami");
  circle(50, 50, 90);
  
  // trimThread(); // comment back in when you add some code
  endRecord();
  noLoop();
}