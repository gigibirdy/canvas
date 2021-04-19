//Draw shapes using HTML canvas:

//Create a context on the canvas DOM element to get access to the drawing interface
let cx = document.querySelector("canvas").getContext("2d");

/* This function helps to create a trapezoid shape. It takes first the x- and y-coordinates
of the trapezoid's left-top corner, then its length at bottom and height. */
const trapezoid = (startX, startY, bottom, height) => {
  const top = height;
  cx.beginPath();
  cx.moveTo(startX, startY);
  cx.lineTo(startX+top, startY);
  cx.lineTo(startX+(bottom+top)/2, startY+height);
  cx.lineTo(startX-(bottom-top)/2, startY+height);
  cx.lineTo(startX, startY);
  cx.stroke();
};

/* This function helps to create a diamond shape. It takes first the x- and y-coordinates
of the diamond's center, then its length at 4-sides and customized color. */
const diamond = (centerX, centerY, length, colr) => {
  const center = Math.sqrt(length);
  cx.save();
  cx.fillStyle = colr;
  cx.rotate(0.25*Math.PI);
  cx.fillRect(centerX, centerY-center, length, length);
  cx.restore();
};

/* This function helps to create zigzagging shape. It takes first the x- and y-coordinates
of the shape's left-top corner, then its numberOfPoints, width and height. The numberOfPoints
helps to control the density of the zigzags appear with a fixed height*/
const zigzag = (x, y, numberOfPoints, width, height) => {
  const cell = height/numberOfPoints;
  cx.beginPath();
  cx.moveTo(x, y);
  for(let i = 1; i< numberOfPoints+1; i++){
    cx.lineTo(x+width, y+cell/2+(i-1)*cell);
    cx.lineTo(x, y+cell*i);
  }
  cx.stroke();
};

/* This function helps to create a spiral shape. It takes first the x- and y-coordinates
of the spiral's innermost point, then its numberOfSegments and diameter. The numberOfSegments
parameter helps to control the density of the segments with a fixed diameter. */
const spiral = (x, y, numberOfSegments, diameter) => {
  const widthOfSegment = diameter/numberOfSegments;
  let radius = widthOfSegment/2;
  let endPointX = x-radius * 2;
  let beginPointX;
  cx.beginPath();
  for(let i = 1; i < numberOfSegments + 1; i++) {
    beginPointX = endPointX;
    if(i % 2 == 1){
      cx.arc( endPointX + radius, y, radius, 0, Math.PI);
      endPointX += (radius*2 + widthOfSegment);
    } else {
      cx.arc( endPointX - radius, y, radius, Math.PI, 2*Math.PI);
      endPointX -= (radius*2 + widthOfSegment);
    }
    radius = Math.abs((endPointX-beginPointX)/2)
  }
  cx.stroke();
};

/* This function helps to create a star shape. It takes first the x- and y-coordinates
of the star's center, then its radius, numberOfVertices and customized color.*/
const star = (x, y, radius, numberOfVertices, clr) => {
  cx.fillStyle = clr;
  cx.beginPath();
  cx.moveTo(x + radius, y);
  for(let i = 1; i < numberOfVertices+1; i++){
    let angle = 2*Math.PI/numberOfVertices*i;
    let endPointX = Math.cos(angle) * radius;
    let endPointY = Math.sin(angle) * radius;
    cx.quadraticCurveTo(x, y, x + endPointX, y + endPointY);
  }
  cx.stroke();
  cx.fill();
};

/* This function helps to create a pie chart. It takes first the x- and y-coordinates
of the pie chart's center, then its radius, data and customized font size/family for
the chart's label. The data parameter expects an array of objects. Each object should
contain 3 key/value pairs - name, count and color. */
const pieChart = (x, y, radius, data, fontSize, fontFamily) => {
  let currentAngle = 2*Math.PI;
  cx.font = `${fontSize}` + " " + `${fontFamily}`;
  let total = data.reduce((sum, {count}) => sum+count, 0);
  for(let slice of data){
    let nextAngle = slice.count/total*2*Math.PI + currentAngle;
    cx.beginPath();
    cx.arc(x, y, radius, currentAngle, nextAngle);
    let currentCenterX = x + Math.cos((nextAngle + currentAngle)/2) * radius * 1.2;
    let currentCenterY = y + Math.sin((nextAngle + currentAngle)/2) * radius * 1.2;
    currentAngle = nextAngle;
    cx.lineTo(x, y);
    cx.fillStyle = slice.color;
    cx.fill();
    if (currentCenterX < x) {
      cx.textAlign = "end";
      cx.fillText(slice.name+"--", currentCenterX, currentCenterY)
    } else {
      cx.textAlign = "start";
      cx.fillText("--"+slice.name, currentCenterX, currentCenterY)
    }
  }
};

//examples
zigzag(10, 10, 15, 100, 300);
trapezoid(200, 10, 200, 80);
diamond(250, 10, 50, "red");
spiral(350, 200, 14, 200);
star(500, 50, 50, 8, "yellow");
const data = [
  {name: "Satisfied", count: 1043, color: "lightblue"},
  {name: "Neutral", count: 563, color: "lightgreen"},
  {name: "Unsatisfied", count: 510, color: "pink"},
  {name: "No Comment", count: 175, color: "silver"}
];
pieChart(630, 200, 100, data, "18px", "Georgia");
