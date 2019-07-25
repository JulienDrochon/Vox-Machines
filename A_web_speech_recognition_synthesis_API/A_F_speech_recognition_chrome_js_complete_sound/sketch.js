var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
var language = 'fr-FR';
var audio_allow = new Audio('assets/info_allow.mp3');
var audio_blocked = new Audio('assets/info_allow.mp3');
var audio_denied = new Audio('assets/info_denied.mp3');
var audio_no_microphone = new Audio('assets/info_no_microphone.mp3');
var audio_no_speech = new Audio('assets/info_no_speech.mp3');
var audio_upgrade = new Audio('assets/info_upgrade.mp3');
var recognition;

if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  start_button.style.display = 'inline-block';
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onstart = function() {
    recognizing = true;
    //showInfo('info_speak_now');

    start_img.src = 'assets/mic-animate.gif';
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      start_img.src = 'assets/mic.gif';
      //showInfo('info_no_speech');
      audio_no_speech.play();
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      start_img.src = 'assets/mic.gif';
      // showInfo('info_no_microphone');
      audio_no_microphone.play();
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        // showInfo('info_blocked');
        audio_blocked.play();
      } else {
        audio_denied.play();
        //showInfo('info_denied');
      }
      ignore_onend = true;
    }
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
        output.innerHTML = event.results[i][0].transcript + '<br>';
        console.log(event.results[i][0].transcript);
      }
    }



  };
} //end else

function upgrade() {
  start_button.style.visibility = 'hidden';
  audio_upgrade.play();
}

function startButton(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = language;
  recognition.start();
  ignore_onend = false;
  start_img.src = 'assets/mic-slash.gif';

  start_timestamp = event.timeStamp;
  console.log('stamp : ' + event.timeStamp);
}
