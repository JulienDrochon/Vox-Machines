let speech;

let bot = new RiveScript({utf8: true});

var divImage;

function preload(){
  bot.loadFile("brain.rive").then(brainReady).catch(brainError);
}

function setup() {
  noCanvas();

  divImage = select("#imageDiv");

  let speechRec = new p5.SpeechRec('fr', gotSpeech);
  let continuous = true;
  let interim = false;
  speechRec.start(continuous, interim);

  function gotSpeech() {
    console.log(speechRec);
    if (speechRec.resultValue) {
      let input = speechRec.resultString;
      console.log(input);
      bot.reply("local-user", input).then(function(reply) {
        console.log("The bot says: " + reply);
        divImage.html(reply);
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
