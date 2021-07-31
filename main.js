function preload() {

}
function setup() {
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.position(200, 180);

 canvas = createCanvas(300, 300);
 canvas.position(800, 180);
 
 //posenet code
 poseNet = ml5.poseNet(video, modelLoaded);
 poseNet.on('pose', gotPoses);
}
function draw() {
 background('#f0ebc7');
 
document.getElementById("square_side").innerHTML = "Width and height of the square will be = " + difference + "px";

 /*
 fill('#4287f5');
 circle(righteyeX, righteyeY, 25);
*/
 if(difference > 150) {
    fill('#552d61');
    stroke('#552d61');
    square(noseX, noseY, difference);
    document.getElementById("showWrist").innerHTML = "";
} else {
    document.getElementById("showWrist").innerHTML = "Please show your wrists to view the square";
}

}

function modelLoaded() {
    console.log("model is loaded");
}

righteyeX = 0;
righteyeY=0;

noseX = 0;
noseY = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

difference = 0;
function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        righteyeX = results[0].pose.rightEye.x;
        righteyeY = results[0].pose.rightEye.y;
        console.log("eyeX = " + righteyeX + "eyeY = " + righteyeY);

        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("nose x = " + noseX);
        console.log("nose y = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x =" + leftWristX);
        console.log("left wrist y =" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        difference = floor(leftWristX - rightWristX);
        console.log(difference);

       
    } 
}