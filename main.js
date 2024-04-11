stat_us = "";
objects = [];
obj_name="";
function setup() {

    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
}

function preload() {

}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    obj_name = document.getElementById("object_name").value;
}

function modelLoaded() {
    console.log("Model Loaded Successfully");
    stat_us = true;
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (stat_us != "") {
        objectDetector.detect(video, getResults);
        for (i = 0; i < objects.length; i++) {
            confidence = floor(objects[i].confidence * 100);
            label = objects[i].label;
            obj_x = objects[i].x;
            obj_y = objects[i].y;
            if(label==obj_name){
                fill("red");
                stroke("black");
                text(label + " " + confidence, obj_x + 15, obj_y + 15)
                noFill();



                rect(obj_x, obj_y, objects[i].width, objects[i].height);
                video.stop();
                objectDetector.detect(getResults);
                document.getElementById("obj_detect").innerHTML = obj_name+" detected";
            }
           else{
            document.getElementById("obj_detect").innerHTML = obj_name+" not detected";
           }


        }


    }

}

function getResults(e, r) {
    if (e) {
        console.error(e);

    } 
    else {
        console.log(r);
        objects = r;
    }

}