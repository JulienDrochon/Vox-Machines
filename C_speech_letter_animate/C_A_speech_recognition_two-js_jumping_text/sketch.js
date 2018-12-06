// var mic, fft, analyzer;
// var json = {};
// var tableau=[];
//
// let speech;
// var said;
// var tableau = [];
//
// var output, test;
//
// var varStart, varEnd;
//
// var buttonReStart;
//
//
//
// function setup() {
//   // var canvas = createCanvas(800,600);
//   background(127);
//   noCanvas();
//   noFill();
//
//   // mic = new p5.AudioIn();
//   // mic.start();
//   // fft = new p5.FFT(0,32);
//   // fft.setInput(mic);
//   // analyzer = new p5.Amplitude();
//   // analyzer.setInput(mic);
//
//
//   // Create a Speech Recognition object with callback
//   speechRec = new p5.SpeechRec('fr', gotSpeech);
//
//   // "Continuous recognition" (as opposed to one time only)
//   var continuous = true;
//   // If you want to try partial recognition (faster, less accurate)
//   var interimResults = false;
//
//   // This must come after setting the properties
//   speechRec.start(continuous, interimResults);
//
//   //speechRec.onStart = console.log('start'+millis());
//   console.log();
//   //speechRec = onResume(resume);
//   //speechRec.onstart(console.log('fff'));
//   // DOM element to display results
//   output = select('#speech');
//
//   function gotSpeech() {
//
//     // Something is there
//     // Get it as a string, you can also get JSON with more info
//     //  console.log(speechRec);
//
//     if (speechRec.resultValue) {
//       // speechRec.onStart = console.log('start'+millis());
//       said = speechRec.resultString ;
//       //indice de confiance du resultat : speechRec.resultConfidence
//
//       // Show user
//       output.html(said);
//
//       //  typewriting(output);
//
//       tableau[tableau.length] =  said;
//
//
//
//     }
//     // for(var i=0;i<$("[id*='index']").length;i++){
//     //   $("[id='index-"+i+"']").css("color","rgb("+10*i+", 127,127)");
//     // }
//     speechRec.onEnd = onend;
//     //speechRec.onResult = console.log('result'+millis());
//     console.log('end : '+millis());
//   }
// }
//
// function onend(){
//   console.log('FIN !!');
//
//   // console.log($("[id*='index']").length);
// }
//
// function draw() {
//   background(200);
//
//   var spectrum = fft.analyze();
//   var rms = analyzer.getLevel();
//
//   // ---------------- Frenquencies To Array ---------------- //
//   json.time = millis();
//   json.freqs = spectrum;
//   json.volume = rms;
//   json.text = said;
//   // json = json + json;
//   tableau[tableau.length] = json;
//   //  console.log(tableau);
//   output.style("font-variation-settings","'yest' "+map(spectrum[16],0,255,0,1000)+", 'gvty' "+map(spectrum[20],0,255,0,1000));
//
// }
