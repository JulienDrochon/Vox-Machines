let output, speechRec, button, svg, page2;

let sonAlsacien, sonCharente, sonChti, sonCorse, sonAzur, sonMidi, sonAlpes;
let nord, aquitaine, paca, alsace, bretagne, midi, paris, centre;
function preload(){
  sonAlsacien = loadSound("assets/Alsacien.mp3");
  sonCharente = loadSound("assets/Charente.mp3");
  sonChti = loadSound("assets/Chtis.mp3");
  sonCorse = loadSound("assets/Corse.mp3");
  sonAzur = loadSound("assets/Cote-Azur.mp3");
  sonMidi = loadSound("assets/Midi-toulousain.mp3");
  sonAlpes = loadSound("assets/Rhone-Alpes.mp3");
}

function setup() {
  noCanvas();

  // DOM element to display results
  output = select('.carte');
  button = selectAll('.btn');
  page2 = selectAll('.page2');
  nord = select('.nord');
  aquitaine = select('.aquitaine');
  paca = select('.PACA');
  alsace = select('.alsace');
  bretagne = select('.bretagne');
  midi = select('.midipyrenees');
  paris = select('.idf');
  centre = select('.centre');
}


function listen() {
  speechRec = new p5.SpeechRec('fr', gotSpeech);
  // "Continuous recognition" (as opposed to one time only)
  let continuous = true;
  // If you want to try partial recognition (faster, less accurate)
  let interimResults = false;
  // This must come after setting the properties
  speechRec.start(continuous, interimResults);

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
  nord.mousePressed(nordfonction);
  aquitaine.mousePressed(aquitainefonction);
  paca.mousePressed(pacafonction);
  alsace.mousePressed(alsacefonction);
  bretagne.mousePressed(bretagnefonction);
  midi.mousePressed(midifonction);
  paris.mousePressed(parisfonction);
  centre.mousePressed(centrefonction);
}

function nordfonction() {
sonChti.play();
}

function aquitainefonction() {
  alert('aquitaine');
}

function pacafonction() {
  alert('paca');
}

function alsacefonction() {
  alert('alsace');
}

function bretagnefonction() {
  alert('bretagne');
}

function midifonction() {
  alert('midi');
}

function parisfonction() {
  alert('paris');
}

function centrefonction() {
  alert('centre');
}
