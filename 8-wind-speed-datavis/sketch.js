let drawMode = "p5"; // "stitch" "realistic" "p5"
let table;
let minData = 100;
let maxData = 10;

let minVertex = [1000,1000];
let maxVertex = [10,10];

let verticies = [];

//height and width of frame in mm
let w = 100;
let h = 100;

function preload() {
  table = loadTable('wind.csv', 'header');
}

function setup() {
  createCanvas(mmToPixel(w), mmToPixel(h));

  let exportPESButton = createButton("Export PES");
  exportPESButton.mousePressed(() => {
    exportEmbroidery("wind_data_p5.pes");
  });
  exportPESButton.position(0, height + 60);

  //find max and min values within the data in order to map it to the widest range
  let tableRows = table.getRows();
  for (let row of tableRows) {
    for(let i=0; i<12; i++){
      let val = row.getNum(i+1);
      if(val<minData){
        minData = val;
      }
      if(val>maxData){
        maxData = val;
      }
    }
  } 
  noLoop();
}

function draw() {
  background(255);


  let c = 0;
  let n = 100;
  let tableRows = table.getRows();


  //this section only calculates the verticies but doesnt draw them
  //so that the design can be mapped to fill the size of the frame 
  for (let row of tableRows) {
    let month = [];
    for (let j=0; j<table.getColumnCount()-1; j++){ //iterating through each month in the row
      let xStretch = map(row.getNum(j+1),minData,maxData,15,50); //mapping the values to a wider range to get more variation 

      for (let i=j*2*PI; i<(j+1)*2*PI; i+=2*PI/n){
        let x = 0.3*sin(i);        
        let spacing = 4; //spacing between the waves
  
        let v = [c*spacing+x*xStretch,i];
        month.push(v);

        //find min and max position values in order to map to the frame size
        for(let k=0; k<2; k++){
          if(v[k]<minVertex[k]){
            minVertex[k] = v[k];
          }
          if(v[k]>maxVertex[k]){
            maxVertex[k] = v[k];
          }
        }        
      }
    }
    verticies.push(month); 
    c++;
  }

  setDrawMode(drawMode); 

  //draw and record verticies
  beginRecord(this);
  setStrokeSettings({
    stitchLength: 0.5,
    stitchWidth: 0.2,
    noise: 0.0,
    strokeInterpolate: true,
  });
  stroke(0);
  strokeWeight(1);
  setStrokeMode("straight");
  noFill();
  for(let i=0; i<verticies.length; i++){
    beginShape();
    for(let j=0; j<verticies[i].length; j++){
      //map positions to fill the frame size
      let xVertex = scaleVertex(verticies[i][j][0],minVertex[0],maxVertex[0],0,w-10);
      let yVertex = scaleVertex(verticies[i][j][1],minVertex[1],maxVertex[1],0,h-10);
      vertex(xVertex,yVertex);
    }
    endShape();
    trimThread(); 
  }
  endRecord();
}

function scaleVertex (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
