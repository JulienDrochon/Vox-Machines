let output, speechRec, button, svg, page2;

var sonAlsacien, sonCharente, sonChti, sonCorse, sonAzur, sonMidi, sonAlpes;
var nord, corse, poitou, paca, alsace, midi;

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
  poitou = select('.poitou');
  paca = select('.PACA');
  alsace = select('.alsace');
  midi = select('.midipyrenees');
  centre = select('.centre');
  corse = select('.corse');
  alpes = select('.alpes');
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
      if(said == "quarantaine" || said == "Quarantaine"){
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
  poitou.mousePressed(poitoufonction);
  paca.mousePressed(pacafonction);
  alsace.mousePressed(alsacefonction);
  midi.mousePressed(midifonction);
  corse.mousePressed(corsefonction);
  alpes.mousePressed(alpesfonction);
}

function nordfonction() {
sonChti.play();
}

function poitoufonction() {
sonCharente.play();
}

function pacafonction() {
  sonAzur.play();
}

function alsacefonction() {
  sonAlsacien.play();
}

function midifonction() {
  sonMidi.play();
}

function corsefonction() {
  sonCorse.play();
}

function alpesfonction() {
  sonAlpes.play();
}
