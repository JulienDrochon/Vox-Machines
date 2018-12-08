int incomingByte;
const int ledPin = 13;

void setup() {

  Serial.begin(9600);           // initialize serial communications
  pinMode(13, OUTPUT);
}

void loop() {
if (Serial.available() > 0) {   // see if there's incoming serial data
   incomingByte = Serial.read(); // read it
   if (incomingByte == 1) {    // if it's a capital H (ASCII 72),
     digitalWrite(13, HIGH); // turn on the LED
   }
  if (incomingByte == 0) {    // if it's an L (ASCII 76)
     digitalWrite(13, LOW);  // turn off the LED
   }
 }
}
