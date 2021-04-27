//bounceBall
const cx = document.querySelector("#canvas2").getContext("2d");
//center point of the ball
let centerX = 300;
let centerY = 300;
//radius of the ball
let radius = 15;
//speed moving along x coordinates
let speedX = 75;
//speed moving along y coordinates
let speedY = 90;

const bounceBall = (time, lastTime) => {
  cx.clearRect(40, 40, 550, 550);
  //box
  cx.fillStyle = "black";
  cx.fillRect(50, 50, 490, 490);
  //caculate coordinates of the ball using the time difference times
  //corresponding speed
  if(lastTime != null){
    centerX +=  (time-lastTime)*0.001*speedX;
    centerY +=  (time-lastTime)*0.001*speedY;
  }
  //if ball hits any sides of the box, it will bounce back
  if(centerX < 50+radius || centerX > 540-radius )speedX = -speedX;
  if(centerY < 50+radius || centerY > 540-radius )speedY = -speedY;
  //ball
  cx.fillStyle = "red";
  cx.beginPath();
  cx.arc(centerX, centerY, radius, 0, 2*Math.PI);
  cx.fill();
  cx.closePath();
  //call requestAnimationFrame to invoke the bounceBall again
  requestAnimationFrame(newTime => bounceBall(newTime, time));
}
//window. requestAnimationFrame takes callback function bounceBall as argument,
//this function's first parameter represents the current time
requestAnimationFrame(bounceBall);
