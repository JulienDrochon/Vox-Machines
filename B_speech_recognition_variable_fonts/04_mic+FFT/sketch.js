var mic, fft, analyzer;
var json = {};
var writer;
var tableau=[];
var table;

function setup() {
  createCanvas(510,400);
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0,32);
  fft.setInput(mic);
  analyzer = new p5.Amplitude();
  analyzer.setInput(mic);

  table = new p5.Table();
  table.addColumn('time');
  for(var i=0;i<fft.analyze().length;i++){
    table.addColumn('freqs'+i);
  }
  table.addColumn('volume');
}


function draw() {
  background(200);

  var spectrum = fft.analyze();
  var rms = analyzer.getLevel();

  // ---------------- Frenquencies To Array ---------------- //
  json.time = millis();
  json.freqs = spectrum;
  json.volume = rms;
// json = json + json;
  tableau[tableau.length] = json;
  console.log(tableau);
  //console.log(tableau.length);
  // ---------------- Frenquencies To CSV Table ---------------- //
  // var newRow = table.addRow();
  // newRow.setNum('time', millis() );
  // for (i = 0; i<spectrum.length; i++) {
  //   newRow.setNum('freqs'+i, spectrum[i]);
  // }
  // newRow.setNum('volume', rms);

  // ---------------- Draw Frenquencies Analysis ---------------- //
  beginShape();
  for (i = 0; i<spectrum.length; i++) {
    vertex(i*(width/spectrum.length), map(spectrum[i], 0, width, height, 0) );
  }
  endShape();

}

function mousePressed() {

  saveTable(table, 'table_frequencies', 'csv');

  //  saveJSON(json, 'Frenquencies.json');
}
