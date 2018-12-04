
let speech;
var tableau = [];

var dancingWords = [];


var output;

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
  //speechRec.onstart(console.log('fff'));
  // DOM element to display results
  output = select('#speech');


  // Speech recognized event
  function gotSpeech() {
    // Something is there
    // Get it as a string, you can also get JSON with more info
    console.log(speechRec);
    if (speechRec.resultValue) {
      let said = speechRec.resultString ;
      //indice de confiance du resultat : speechRec.resultConfidence

      // Show user
      output.html(said);

      tableau[tableau.length] =  said;


  

      output.style("font-variation-settings","'yest' 0, 'gvty' 500");

      $("#speech").blast({

        delimiter: 'character',
        customClass: 'index',
        generateIndexID:true,
        // delimiter: "character" // Set the delimiter type (see left)
        // search: false // Perform a search *instead* of delimiting
        // tag: "span" // Set the wrapping element type (e.g. "div")
        // customClass: "" // Add a custom class to wrappers
        // generateIndexID: false // Add #customClass-i to wrappers
        generateValueClass: false, // Add .blast-word-val to wrappers
        // stripHTMLTags: false // Strip HTML before blasting
        returnGenerated: true, // Return generated elements to stack
        aria: true // Avoid speechflow disruption for screenreaders
      });

    }
  }
}
function draw(){
output.style("font-variation-settings","'yest' "+int(random(0,1000))+", 'gvty' "+int(random(0,1000)));
}
