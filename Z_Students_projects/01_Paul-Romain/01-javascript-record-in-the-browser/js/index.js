let audioChunks = [];
let state = 0;


navigator.mediaDevices.getUserMedia({audio:true})
.then(stream => {handlerFunction(stream)})

function handlerFunction(stream) {
  rec = new MediaRecorder(stream);
  rec.ondataavailable = e => {
    audioChunks.push(e.data);
    console.log(audioChunks);

    console.log(audioChunks.length);
    if (rec.state == "inactive"){

      let blob = new Blob(audioChunks,{type:'audio/mpeg-3'});

      for (var i =0; i < audioChunks.length; i++){
      recordedAudio.src = URL.createObjectURL(blob);
      recordedAudio.controls=true;
      recordedAudio.autoplay=true;
      // sendData(blob)
    }
    }
  }
}
// function sendData(data) {}

record.onclick = e => {
  console.log('record on')
  record.disabled = true;
  record.style.backgroundColor = "blue"
  stopRecord.disabled=false;
  rec.start();
}
stopRecord.onclick = e => {
  console.log("record off")
  record.disabled = false;
  stop.disabled=true;
  record.style.backgroundColor = "red"
  rec.stop();
}
