//Download WEbsockets Library in Processing
//Menu > Sketch > import Library > Add Library > Search websockets > select websockets + click install

import websockets.*;

WebsocketServer ws;
int now;


void setup(){
  size(200,200);
  ws= new WebsocketServer(this,8025,"/john");
  now=millis();
}
String test="";
void draw(){
  background(0);
  
  if(millis()>now+15){
    test = str(mouseX);
    ws.sendMessage(test);
    now=millis();
  }
}

void webSocketServerEvent(String msg){
 println("A message from webbrowser : " + msg);
 
}
