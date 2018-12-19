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

  // DOM element to display results
  let output = select('#speech');

  // Speech recognized event
  function gotSpeech() {
    // Something is there
    // Get it as a string, you can also get JSON with more info
    console.log(speechRec);
    if (speechRec.resultValue) {
      let said = speechRec.resultString;
      // Show user
      output.html(said);
      WebSocketTest(said);
    }
  }
}


if ("WebSocket" in window) {
  console.log("WebSocket is supported by your Browser!");
  // Let us open a web socket
  var ws = new WebSocket("ws://localhost:8022/john");
  //  setInterval( WebSocketTest, 15);

  ws.onopen = function() {
    // Web Socket is connected, send data using send()
    ws.send("open");
    console.log("Message is sent...");
  };
  ws.onclose = function() {
    ws.send("close");
    // websocket is closed.
    console.log("Connection is closed...");
  };
} else {
  // The browser doesn't support WebSocket
  console.log("WebSocket NOT supported by your Browser!");
}
function WebSocketTest(data) {
  ws.send(data);
}
