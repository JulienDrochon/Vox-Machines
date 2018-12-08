var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodemFA131'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data

function setup() {
  createCanvas(400, 300);          // make the canvas
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  //serial.on('data', ArduinoEvent);  // callback for when new data arrives
  //  serial.on('error', serialError); // callback for errors
  serial.open(portName);           // open a serial port

  speechSetup();
}

function draw() {
  // black background, white text:
  background(0);
  fill(255);
  // display the incoming serial data as a string:
  // text("incoming value: " + inData, 30, 30);
}

// function serialEvent() {
//  // read a byte from the serial port:
//  var inByte = serial.read();
//  // store it in a global variable:
//  inData = inByte;
// }

function serialError(err) {
  // console.log('Something went wrong with the serial port. ' + err);
}

function ArduinoEvent() {
  if(said=="Light") {
    outByte = 1;
  }else{
    outByte = 0;
  }
  // map the mouseY to a range from 0 to 255:

  // send it out the serial port:
  serial.write(outByte);

  console.log(outByte);
}

var said;

function speechSetup() {
  // Create a Speech Recognition object with callback
  speechRec = new p5.SpeechRec('en-US', gotSpeech);
  // "Continuous recognition" (as opposed to one time only)
  let continuous = true;
  // If you want to try partial recognition (faster, less accurate)
  let interimResults = false;
  // This must come after setting the properties
  speechRec.start(continuous, interimResults);

  // DOM element to display results
  //output = select('#speech');

  // Speech recognized event
  function gotSpeech() {
    // Something is there
    // Get it as a string, you can also get JSON with more info
    console.log(speechRec);
    if (speechRec.resultValue) {
      said = speechRec.resultString;
      // Show user
      //  output.html(said);
      console.log(said);
      ArduinoEvent()
    }
  }
}
