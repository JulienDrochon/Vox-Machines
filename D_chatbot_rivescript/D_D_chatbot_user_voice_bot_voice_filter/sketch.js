let speechRec;
let said;
let txt;
var output;
var myVoice;
var reverb;

function setup() {
  noCanvas();

  myVoice = new p5.Speech();

      myVoice.setLang('fr_FR');
//  console.log(myVoice.listVoices());
  //myVoice.setVoice(0);
  // ---- Filter --- //
  // filter = new p5.LowPass();
  // // Disconnect soundfile from master output.
  // // Then, connect it to the filter, so that we only hear the filtered sound
   //myVoice.disconnect();
  // myVoice.connect(filter);
  // fft = new p5.FFT();
  reverb = new p5.Reverb();
   reverb.process(myVoice, 6, 0.2);
    reverb.amp(4); // turn it up!
  myVoice.speak('bonjour');
  // sonnects soundFile to reverb with a
  // reverbTime of 6 seconds, decayRate of 0.2%
}
