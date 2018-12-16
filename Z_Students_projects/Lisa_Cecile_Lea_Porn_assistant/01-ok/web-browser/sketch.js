let speech;

var soundFile;
var fft;

var filter, filterFreq, filterRes;

var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodemFD121'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;

let bot = new RiveScript({utf8: true});
let soundfile1, soundfile2; soundfile3; soundfile4; soundfile5; soundfile6; soundfile7; soundfile8;
var soundList= [];

var step1 = false,
step2 = false,
step3 = false,
step4 = false;


function preload(){
  bot.loadFile("brain.rive").then(brainReady).catch(brainError);
  soundfile1 = loadSound('assets/01.mp3');
  soundfile2 = loadSound('assets/02.mp3');
  soundfile3 = loadSound('assets/03.mp3');
  soundfile4 = loadSound('assets/04.mp3');
  soundfile5 = loadSound('assets/bjrhw.mp3');
  soundfile6 = loadSound('assets/plaiz.mp3');
  soundfile7 = loadSound('assets/abt.mp3');
  soundList = [soundfile1, soundfile2, soundfile3, soundfile4, soundfile5, soundfile6, soundfile7];
}

function setup() {
  noCanvas();
  //  createCanvas(710, 256);

  filter = new p5.LowPass();

  fft = new p5.FFT();

  serial = new p5.SerialPort();    // make a new instance of the serialport library
  serial.open(portName);           // open a serial port


  let speechRec = new p5.SpeechRec('fr', gotSpeech);
  let continuous = true;
  let interim = false;
  speechRec.start(continuous, interim);



  function gotSpeech() {
    console.log(speechRec);
    if (speechRec.resultValue) {
      let input = speechRec.resultString;
      console.log(input);

      bot.reply("local-user", input).then(function(reply) {
        console.log("The bot says: " + reply);
        // for (var i = 0; i < soundList.length; i++){
        //   if ( soundList[i].isPlaying() ) {
        //     soundList[i].stop();
        //   }
        // }
        //soundList[int(reply)].play();
        if(reply == '1'){
          soundfile1.play();
          soundfile2.stop();
          soundfile3.stop();
          soundfile4.stop();
          soundfile5.stop();
          soundfile6.stop();
          soundfile7.stop();
          outByte = 1;
          serial.write(outByte);
        }
        if(reply == '2'){
          soundfile2.play();
          soundfile1.stop();
          soundfile3.stop();
          soundfile4.stop();
          soundfile5.stop();
          soundfile6.stop();
          soundfile7.stop();
          outByte = 1;
          serial.write(outByte);
        }
        if(reply == '3'){
          soundfile3.play();
          soundfile2.stop();
          soundfile1.stop();
          soundfile4.stop();
          soundfile5.stop();
          soundfile6.stop();
          soundfile7.stop();
          outByte = 100 ;
          serial.write(outByte);
        }
        if(reply == '4'){
          soundfile4.play();
          soundfile2.stop();
          soundfile3.stop();
          soundfile1.stop();
          soundfile5.stop();
          soundfile6.stop();
          soundfile7.stop();
          outByte = 1 ;
          serial.write(outByte);
        }

        if(reply == '10'){
          soundfile5.play();
          soundfile2.stop();
          soundfile3.stop();
          soundfile4.stop();
          soundfile1.stop();
          soundfile6.stop();
          soundfile7.stop();
          outByte = 100;
          serial.write(outByte);
        }

        if(reply == '20'){
          soundfile6.play();
          soundfile2.stop();
          soundfile3.stop();
          soundfile4.stop();
          soundfile5.stop();
          soundfile1.stop();
          soundfile7.stop();
          outByte = 100;
          serial.write(outByte);
        }

        if(reply == '30'){
          soundfile7.play();
          soundfile2.stop();
          soundfile3.stop();
          soundfile4.stop();
          soundfile5.stop();
          soundfile6.stop();
          soundfile1.stop();
          outByte = 100;
          serial.write(outByte);
          }

          if(reply == '40'){
          soundfile7.stop();
          soundfile2.stop();
          soundfile3.stop();
          soundfile4.stop();
          soundfile5.stop();
          soundfile6.stop();
          soundfile1.stop();
          outByte = 100;
          serial.write(outByte);
        }
      });
    }
  }


}

function brainReady() {
  console.log('Chatbot ready!');
  bot.sortReplies();
}

function brainError() {
  console.log('Chatbot error!')
}

function draw() {
  background(30);

  // Map mouseX to a the cutoff frequency from the lowest
  // frequency (10Hz) to the highest (22050Hz) that humans can hear
  //   filterFreq = map (mouseX, 0, width, 10, 22050);
  // console.log('filterFreq : ' + filterFreq);
  //   // Map mouseY to resonance (volume boost) at the cutoff frequency
  //   filterRes = map(mouseY, 0, height, 15, 5);
  // console.log('filterRes : ' + filterRes);
  // set filter parameters
  //filter.set(filterFreq, filterRes);
  filter.set(2000, 15);
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
    //alert('step1 ' + avg);
    step1 = true;
    step2 = false;
    step3 = false;
    step4 = false;
  }
  if(avg > 170 && avg <= 180 && step2 == false)
  {
    //alert('step2 ' + avg);
    step1 = false;
    step2 = true;
    step3 = false;
    step4 = false;
  }
  if(avg > 180 && avg <= 200 && step3 == false)
  {
    // alert('step3 ' + avg);
    step1 = false;
    step2 = false;
    step3 = true;
    step4 = false;
  }
  if(avg > 200 && avg <= 250 && step4 == false)
  {
    //  alert('step4 ' + avg);
    step1 = false;
    step2 = false;
    step3 = false;
    step4 = true;
  }

  // for (var i = 0; i< spectrum.length; i++){
  //   var x = map(i, 0, spectrum.length, 0, width);
  //   var h = -height + map(spectrum[i], 0, 255, height, 0);
  //   rect(x, height, width/spectrum.length, h) ;
  // }

}
