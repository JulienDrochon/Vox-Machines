var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
var language = 'fr-FR'

if (!('webkitSpeechRecognition' in window)) {
  alert('Use Desktop Chrome 25 +, Desktop Edge 76 + or Chrome for Android 75+. Check compatibility : https://caniuse.com/#feat=speech-recognition')
} else {
  start_button.style.display = 'inline-block';
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onstart = function() {
    recognizing = true;
    start_img.src = 'assets/mic-animate.gif';
  };

  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    start_img.src = 'assets/mic.gif';
    if (!final_transcript) {
      return;
    }
  };

  recognition.onresult = function(event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_span.innerHTML += event.results[i][0].transcript + '<br>';
      }
    }
  }
} //end else

function startButton(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = language;
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = '';
  start_img.src = 'assets/mic-slash.gif';
  start_timestamp = event.timeStamp;
  console.log('stamp : ' + event.timeStamp);
}
