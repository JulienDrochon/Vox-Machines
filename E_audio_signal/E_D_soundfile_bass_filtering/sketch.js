//https://p5js.org/examples/sound-filter-lowpass.html

var soundFile;
var fft;

var filter, filterFreq, filterRes;

function preload() {
  soundFormats('mp3', 'ogg');
  soundFile = loadSound('assets/beat');
}

function setup() {
  createCanvas(710, 256);
  fill(255, 40, 255);

  // loop the sound file
  soundFile.loop();

  filter = new p5.LowPass();

  // Disconnect soundfile from master output.
  // Then, connect it to the filter, so that we only hear the filtered sound
  soundFile.disconnect();
  soundFile.connect(filter);

  fft = new p5.FFT();
}

function draw() {
  background(30);

  filter.set(500, 15);
  // Draw every value in the FFT spectrum analysis where
  // x = lowest (10Hz) to highest (22050Hz) frequencies,
  // h = energy (amplitude / volume) at that frequency
  var spectrum = fft.analyze();
  noStroke();
  // console.log(spectrum.length);

  var sum = 0;
  for( var i = 0; i < spectrum.length; i++ ){
    sum += parseInt( spectrum, 10 ); //don't forget to add the base
  }

  var avg = sum/spectrum.length;

  console.log(avg);

  if(avg > 120 && avg <= 170 && step1 == false)
  {
    alert('step1 ' + avg);
  }
  if(avg > 170 && avg <= 180 && step2 == false)
  {
    alert('step2 ' + avg);
  }
  if(avg > 180 && avg <= 200 && step3 == false)
  {
    alert('step3 ' + avg);
  }
  if(avg > 200 && avg <= 250 && step4 == false)
  {
    alert('step4 ' + avg);
  }

}
