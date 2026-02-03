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

    // commands go here
  // for (i = 1; i < 10; i++) {
  //     circle(10 + i*10, i*10, 10+Math.random()*90);
  // }

  beginShape();
    vertex(10,10);
    vertex(80,5);
    vertex(90,50);
    vertex(95,70);
    vertex(30,50);
    vertex(10,30);
    vertex(10,10);
  endShape();

  // trimThread(); // comment back in when you add some code
  endRecord();
  noLoop();
}