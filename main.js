ob = [];
video = "";
stats = "";
function preload(){
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw(){
    image(video,0,0,480,380);
    if(stats != ""){
        od.detect(video, gotResult);
        for ( i = 0; i< ob.length; i++) {
            document.getElementById("numofob").innerHTML = "Number of Objects :"+ob.length;
            document.getElementById("stats").innerHTML = "Status : Objects Detected";

            fill("red");
            stroke("red");
            percent = floor(ob[i].confidence *100);
            text(ob[i].label +" "+percent+"%", ob[i].x +15, ob[i].y +15);
            noFill();
            rect(ob[i].x, ob[i].y, ob[i].width, ob[i].height);
        }
    }
}
function start(){
    od = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("stats").innerHTML = "Status : Detecting Objects";
}
function modelLoaded(){
    console.log("Model is Loaded");
    stats = true;
    video.loop();
    video.speed(1);
    video.volume(0.5);
    od.detect(video,gotResult);
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        ob = results;
    }
}