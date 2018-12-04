
let speechRec;
let said;
let txt;
var output;
var myVoice;

function setup() {
  noCanvas();
  let bot = new RiveScript({utf8: true});
  // Load a list of files all at once
  var files = ['brain/knockknock.rive'];
  bot.loadFile(files, botLoaded, errorLoading);
  //---- Voice Speech ---//
  myVoice = new p5.Speech();
  console.log(myVoice.listVoices());
  myVoice.setVoice(0);

  // ----- Voice Recognition
  // Create a Speech Recognition object with callback
  speechRec = new p5.SpeechRec('fr', gotSpeech);
  // "Continuous recognition" (as opposed to one time only)
  let continuous = true;
  // If you want to try partial recognition (faster, less accurate)
  let interimResults = false;
  // This must come after setting the properties
  speechRec.start(continuous, interimResults);

  // DOM element to display results
  let outputspeech = select('#speech');

  // Speech recognized event
  function gotSpeech() {
    // Something is there
    // Get it as a string, you can also get JSON with more info
    console.log(speechRec);
    if (speechRec.resultValue) {
      said = speechRec.resultString;
      var reply = bot.reply("local-user", said);
      output = select('#bot');
      output.html(reply);
      myVoice.speak(reply);
      // Show user
      outputspeech.html(said);
    }
  }
  //---- end voic recognition



  function botLoaded() {
    console.log("Bot loaded");
    bot.sortReplies();
  }

  function errorLoading(error) {
    console.log("Error when loading rivescript files: " + error);
  }
}
