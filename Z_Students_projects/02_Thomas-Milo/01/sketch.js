// let output, speechRec, button, svg;
// let continuous, interimResults;
//
//
// function setup() {
//   noCanvas();
//
//   output = select("#speech");
//   svg = select('.svgstyle');
// }
//
// function listen() {
//
//   speechRec = new p5.SpeechRec('fr', gotSpeech);
//
//   // "Continuous recognition" (as opposed to one time only)
//   continuous = false;
//   // If you want to try partial recognition (faster, less accurate)
//   interimResults = false;
//   // This must come after setting the properties
//   speechRec.start(continuous, interimResults);
//
//   // Speech recognized event
//   function gotSpeech() {
//     // Something is there
//     // Get it as a string, you can also get JSON with more info
//     console.log(speechRec);
//     if (speechRec.resultValue) {
//       let said = speechRec.resultString;
//       // Show user
//       output.html(said);
//       console.log(said);
//     }
//   }
//   speechRec.onEnd = theEnd;
//   speechRec.onStart = ok;
// }
//
// function ok() {
//   // alert('Let\'s start');
//   svg.style('fill', 'rgb(0,255,0)');
// }
//
// function theEnd() {
//   console.log('end');
//   svg.style('fill', 'rgb(255,0,0)');
//   speechRec.start(continuous, interimResults);
// }
