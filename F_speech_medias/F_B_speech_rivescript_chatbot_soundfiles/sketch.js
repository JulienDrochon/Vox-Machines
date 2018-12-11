let speech;

let bot = new RiveScript({utf8: true});
let soundfile1, soundfile2, soundfile3, soundfile4, soundfile5, soundfile6, soundfile7;

var soundList= [];

function preload(){
  bot.loadFile("brain.rive").then(brainReady).catch(brainError);
  soundfile1 = loadSound('assets/01.mp3');
  soundfile2 = loadSound('assets/02.mp3');
  soundfile3 = loadSound('assets/03.mp3');
  soundfile4 = loadSound('assets/04.mp3');
  soundfile5 = loadSound('assets/05.mp3');
  soundfile6 = loadSound('assets/06.mp3');
  soundfile7 = loadSound('assets/07.mp3');
  soundList = [soundfile1, soundfile2, soundfile3, soundfile4, soundfile5, soundfile6, soundfile7];
}



function setup() {
  noCanvas();

  let speechRec = new p5.SpeechRec('fr', gotSpeech);
  let continuous = true;
  let interim = false;
  speechRec.start(continuous, interim);


  function speechLoaded()
  {
    // say cheers:
    //  speech.speak("yeah, baby!!!");
  }

  function gotSpeech() {
    console.log(speechRec);
    if (speechRec.resultValue) {
      let input = speechRec.resultString;
      console.log(input);
      console.log(soundList[2]);
      bot.reply("local-user", input).then(function(reply) {
        console.log("The bot says: " + reply);
        for (var i = 0; i < soundList.length; i++){
          if ( soundList[i].isPlaying() ) {
            soundList[i].stop();
          }
        }
        soundList[int(reply)].play();
      });
    }
  }


}

function brainReady() {
  console.log('Chatbot ready!');
  bot.sortReplies();
}

function brainError() {
  console.log('Chatbot error!')
}
