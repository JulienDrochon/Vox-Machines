//Download WEbsockets Library in Processing
//Menu > Sketch > import Library > Add Library > Search websockets > select websockets + click install

import websockets.*;

WebsocketServer ws;
int now;

String receivedMsg="";

void setup() {
  size(200, 200);
  ws= new WebsocketServer(this, 8022, "/john");
  now=millis();
}

void draw() {
  background(0);
  
  text(receivedMsg, 30, 30);
}

void webSocketServerEvent(String msg) {
  println("A message from webbrowser : " + msg);
  receivedMsg = msg;
  ws.sendMessage(receivedMsg);
}
