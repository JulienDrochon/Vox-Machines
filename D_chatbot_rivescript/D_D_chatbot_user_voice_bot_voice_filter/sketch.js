let speechRec;
let said;
let txt;
var output;
var myVoice;
var reverb;

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
  // ---- Filter --- //
  // filter = new p5.LowPass();
  // // Disconnect soundfile from master output.
  // // Then, connect it to the filter, so that we only hear the filtered sound
  // myVoice.disconnect();
  // myVoice.connect(filter);
  // fft = new p5.FFT();
  reverb = new p5.Reverb();
  // sonnects soundFile to reverb with a
  // reverbTime of 6 seconds, decayRate of 0.2%


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
      reverb.process(myVoice, 6, 0.2);

      reverb.amp(4); // turn it up!
      myVoice.speak(reply);
      // Show user
      outputspeech.html(said);
    }
  }
  //---- end voice recognition




  function botLoaded() {
    console.log("Bot loaded");
    bot.sortReplies();
  }

  function errorLoading(error) {
    console.log("Error when loading rivescript files: " + error);
  }
}
