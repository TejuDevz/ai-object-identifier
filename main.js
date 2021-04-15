status = "";
video = "";
objects = "";
var synth = window.speechSynthesis;
var utterThis = new SpeechSynthesisUtterance("Object Found");

function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
}

function draw() {
  image(video, 0, 0, 480, 380);
  if (status != "") {
    objectDetector.detect(video, gotResult);
    for (var i = 0; i < objects.length; i++) {
      fill("#FF0000");
      percent = floor(objects[i].confidence * 100);
      `${objects[i].label} ${percent}%`,
        text(
          `${objects[i].label} ${percent}%`,
          objects[i].x + 15,
          objects[i].y + 15
        );
      noFill();
      stroke("#FF0000");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      if (objects[i].label == object_name) {
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById("found").innerHTML = object_name + " Found";
        synth.speak(utterThis);
      }
    }
  }
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    objects = results;
  }
}

function start() {
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "status: Object detecting";
  object_name = document.getElementById("input").value;
}

function modelLoaded() {
  console.log("model Loaded!");
  status = true;
}
