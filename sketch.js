// variable to hold an instance of the p5.webserial library:
const serial = new p5.WebSerial();
 
// HTML button object:
let portButton;
let inData;                   // for incoming serial data
let outByte = 0;              // for outgoing data
let vals = [];
let dataCount = 0;

let _drawMode = "realistic";

let roygbiv = ["red", "orange", "yellow", "green", "blue", "indigo"];

let xs = [];
let ys = [];

let w = 100;
let h = 100;

let dpi = 120;

let pos;

let buttonsPrev = [0,0,0];
let fileCount = 0;

function setup() {
  createCanvas(mmToPixel(w,dpi),mmToPixel(h,dpi));
  pos = createVector(w/2,h/2);

      // check to see if serial is available:
  if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }
  // if serial is available, add connect/disconnect listeners:
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);
  
  serial.getPorts(); // check for any ports that are available:
  serial.on("noport", makePortButton); // if there's no port chosen, choose one:
  serial.on("portavailable", openPort); // open whatever port is available:
  serial.on("requesterror", portError); // handle serial errors:
  serial.on("data", serialEvent);  // handle any incoming serial data:
  serial.on("close", makePortButton);



  let drawModeStitchButton = createButton("Draw Mode: Stitch");
  drawModeStitchButton.mousePressed(() => {
    _drawMode = "stitch";
    redraw();
  });

  let drawModeLineButton = createButton("Draw Mode: Realistic");
  drawModeLineButton.mousePressed(() => {
    _drawMode = "realistic";
    redraw();
  });

  let drawModeP5Button = createButton("Draw Mode: p5");
  drawModeP5Button.mousePressed(() => {
    _drawMode = "p5";
    redraw();
  });
}
 
function draw() {
  let stitchWidth = 7;
  // Set the drawing mode to show stitches

  //console.log(vals);
  
  noFill();
  setDrawMode(_drawMode);
  
  beginRecord(this);
  stroke(0, 0, 0);
  strokeWeight(stitchWidth);
  vertexWidth(1);
  
  //setStitch(0.2, 0.8, 10);
  
  setStrokeMode("straight");

  if((abs(int(pos.x) - vals[0])>5) || (abs(int(pos.y) - vals[1])>5)){
    xs.push(vals[0]);
    ys.push(vals[1]); 
    background(255);
  }
  
  pos = createVector(vals[0],vals[1]);

  beginShape();
  for(let i=0; i<xs.length; i++){
    vertex(scaleVals(xs[i],w),scaleVals(ys[i],h));
  }
  endShape();
  endRecord();
}

// read any incoming data as a string
// (assumes a newline at the end of it):
function serialEvent() {
  inData = serial.readLine();
  if(inData != null){
    inData = trim(inData);
    vals = int(splitTokens(inData, ","));    
  
    let buttonsNow = vals.slice(2);

    for(let i=0; i<buttonsNow.length; i++){
      if(buttonsNow[i]!=buttonsPrev[i] && buttonsNow[i]==1){
        if(i==0){
          exportFile();
          xs=[];
          ys=[];
        }
      }
      buttonsPrev[i]=buttonsNow[i];
    }
    
    if(vals.length >= 1){
       value1 = vals[0];
    }
  }

}

function exportFile(){
  console.log("export");
  fileCount++;
  exportPES('etch_a_sketch'+fileCount+'.pes');
}

// if there's no port selected, 
// make a port select button appear:
function makePortButton() {
  // create and position a port chooser button:
  portButton = createButton("choose port");
  portButton.position(10, 10);
  // give the port button a mousepressed handler:
  portButton.mousePressed(choosePort);
}
 
// make the port selector window appear:
function choosePort() {
  if (portButton) portButton.show();
  serial.requestPort();
}
 
// open the selected port, and make the port 
// button invisible:
function openPort() {
  // wait for the serial.open promise to return,
  // then call the initiateSerial function
  serial.open().then(initiateSerial);
 
  // once the port opens, let the user know:
  function initiateSerial() {
    console.log("port open");
  }
  // hide the port button once a port is chosen:
  if (portButton) portButton.hide();
}
 
// pop up an alert if there's a port error:
function portError(err) {
  alert("Serial port error: " + err);
}



 
// try to connect if a new serial port 
// gets added (i.e. plugged in via USB):
function portConnect() {
  console.log("port connected");
  serial.getPorts();
}
 
// if a port is disconnected:
function portDisconnect() {
  serial.close();
  console.log("port disconnected");
}
 
function closePort() {
  serial.close();
}

function scaleVals (number, outMax) {
    return number*outMax/1023;
}
