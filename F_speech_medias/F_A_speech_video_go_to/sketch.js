var video = document.getElementById("video"), track;
var file;

function preload() {
  file = loadStrings("assets/french.vtt");
}

function setup() {
  noCanvas();

  video.addEventListener("loadedmetadata", function() {
    track = this.addTextTrack("captions", "fr");
    track.mode = "showing";
  });

  // Create a Speech Recognition object with callback
  speechRec = new p5.SpeechRec('fr', gotSpeech);
  // "Continuous recognition" (as opposed to one time only)
  let continuous = true;
  // If you want to try partial recognition (faster, less accurate)
  let interimResults = false;
  // This must come after setting the properties
  speechRec.start(continuous, interimResults);

  function gotSpeech() {
    console.log(speechRec);
    if (speechRec.resultValue) {
      let said = speechRec.resultString;

      for(var i=0; i<file.length; i++){
        if(file[i].includes(said) && i>0){
          var time = file[i-1].split(" ");
          var timeseconds = time[0].split(":")[0]*3600+time[0].split(":")[1]*60+time[0].split(":")[2].split(".")[0];
          video.currentTime = timeseconds;
          video.play();
        }
      }
    }
  }
}
