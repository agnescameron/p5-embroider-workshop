let drawMode = "stitch";

function setup() {
  //10cm by 10cm canvas
  createCanvas(mmToPixel(100), mmToPixel(140));

  let exportPesButton = createButton("Export PES");
  exportPesButton.mousePressed(() => {
    exportEmbroidery("template.pes");
  });
  exportPesButton.position(10, height + 30);
}

function draw() {
  background("lightgrey");
  beginRecord(this);

  stroke(255);         // sets the stroke color
  setStitch(0.5, 5, 0); // min stitch length, stitch length, noise 
  strokeWeight(4);     // sets the thickness of the stroke in mm
  setStitchWidth(0.5); // spacing of parallel stitches

  setStrokeMode("lines");
  line(10, 10, 90, 10);

  setStrokeMode("parallel");
  line(10, 25, 90, 25);

  setStitch(0.5, 1, 0);

  setStrokeMode("zigzag");
  line(10, 50, 90, 50);

  setStrokeMode("ramp");
  line(10, 75, 90, 75);

  setStrokeMode("square");
  line(10, 100, 90, 100);

  setStitch(0.5, 5, 0);
  setStrokeMode("sashiko");
  line(10, 125, 90, 125);
  
  // trimThread(); // comment back in when you add some code
  endRecord();
}