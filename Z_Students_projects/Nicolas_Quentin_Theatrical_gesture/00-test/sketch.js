function setup() {
  noCanvas();
  // Create a Speech Recognition object with callback
  speechRec = new p5.SpeechRec('fr', gotSpeech);
  // "Continuous recognition" (as opposed to one time only)
  let continuous = true;
  // If you want to try partial recognition (faster, less accurate)
  let interimResults = false;
  // This must come after setting the properties
  speechRec.start(continuous, interimResults);

  // DOM element to display results
  let output = select('#speech');

  // Speech recognized event
  function gotSpeech() {
    // Something is there
    // Get it as a string, you can also get JSON with more info
    console.log(speechRec);
    if (speechRec.resultValue) {
      let said = speechRec.resultString;
      // Show user
      output.html(said);
    }
  }
}
