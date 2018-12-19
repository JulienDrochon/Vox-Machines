let said, output, received_msg;

function setup() {
  noCanvas();

  output = select('#speech');
}


if ("WebSocket" in window) {
  console.log("WebSocket is supported by your Browser!");
  // Let us open a web socket
  var ws = new WebSocket("ws://localhost:8022/john");
} else {
  // The browser doesn't support WebSocket
  console.log("WebSocket NOT supported by your Browser!");
}

ws.onmessage = function (evt) {
  received_msg = evt.data;
  output.html(received_msg);
  console.log("evt : "+evt.data);
};
