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

  // commands go here
  
  // trimThread(); // comment back in when you add some code
  endRecord();
}