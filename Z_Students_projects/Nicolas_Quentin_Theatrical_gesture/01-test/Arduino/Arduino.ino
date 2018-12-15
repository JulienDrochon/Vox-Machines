// Télécharger la bibliothèque Servo
// Télécharger la librarie CapacitiveSensor (Menu -> Sketch -> Include Library -> Manage Libraries)


#include <Servo.h> // // importation de la bibliothèque Servo
int incomingByte;


Servo myservo;  // Creation d'un objet servo nommé myservo
Servo myservo2;



void setup() {
  myservo.attach(9);  // indiquer la broche ou est branché le servo, ici pin 9
  myservo2.attach(11);
  Serial.begin(9600);
}

void loop() {
if (Serial.available() > 0) {   // see if there's incoming serial data
   incomingByte = Serial.read(); // read it
   if (incomingByte == 1) {    // if it's a capital H (ASCII 72),
    myservo2.write(60);
    delay(500);
    myservo.write(60);
    delay(500);
    myservo2.write(40);
    delay(500);
    myservo.write(10);
    delay(500);
    myservo.write(0);
    // turn on the LED
   }
  if (incomingByte == 2) {    // if it's an L (ASCII 76)
        myservo2.write(60);
     delay(500);
     myservo.write(0);  // Servo comes back to its initial position
    delay(500);
 myservo2.write(40);
  delay(500);
    myservo.write(30);
    delay(500);
    myservo2.write(80);
     delay(500);
    myservo.write(90);
   }
  if (incomingByte == 3) {    // if it's an L (ASCII 76)
     myservo.write(40);  // Servo comes back to its initial position
     delay(500);
    myservo.write(30);
    delay(500);
    myservo.write(20);
   }
  if (incomingByte == 4) {    // if it's an L (ASCII 76)
     myservo.write(90);  // Servo comes back to its initial position
     delay(500);
    myservo.write(30);
    delay(500);
    myservo.write(90);
   }
 }
}

