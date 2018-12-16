let output, speechRec, button, svg;

function setup() {
  noCanvas();
  // Create a Speech Recognition object with callback
  //  listen();
}


function listen() {
  speechRec = new p5.SpeechRec('fr', gotSpeech);
  // "Continuous recognition" (as opposed to one time only)
  let continuous = true;
  // If you want to try partial recognition (faster, less accurate)
  let interimResults = false;
  // This must come after setting the properties
  speechRec.start(continuous, interimResults);

  // DOM element to display results
  output = select('.carte');
  button = selectAll('.btn');
  page2 = selectAll('.page2');

  // Speech recognized event
  function gotSpeech() {
    // Something is there
    // Get it as a string, you can also get JSON with more info
    console.log(speechRec);
    if (speechRec.resultValue) {
      let said = speechRec.resultString;
      // Show user
      output.html(said);
      if(said == "au revoir" || said == "Au revoir"){
        for (var i=0; i<button.length; i++) {
          button[i].hide();
        }
        for (var i=0; i<page2.length; i++) {
          page2[i].show();
        }
      }
    }
  }
}
