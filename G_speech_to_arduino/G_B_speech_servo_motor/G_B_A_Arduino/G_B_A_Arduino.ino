// Télécharger la bibliothèque Servo
// Télécharger la librarie CapacitiveSensor (Menu -> Sketch -> Include Library -> Manage Libraries)


#include <Servo.h> // // importation de la bibliothèque Servo

int incomingByte;
Servo myservo;  // Creation d'un objet servo nommé myservo


void setup() {
  Serial.begin(9600);

  myservo.attach(9);  // indiquer la broche ou est branché le servo, ici pin 9

}

void loop() {
  if (Serial.available() > 0) {   // see if there's incoming serial data
    incomingByte = Serial.read(); // read it
    if (incomingByte == 1) {    // if it's a capital H (ASCII 72),
      myservo.write(0); // indication de l'angle du servo
    }
    if (incomingByte == 0) {    // if it's an L (ASCII 76)
      myservo.write(180); // indication de l'angle du servo
    }
  }


  delay(15);
}

