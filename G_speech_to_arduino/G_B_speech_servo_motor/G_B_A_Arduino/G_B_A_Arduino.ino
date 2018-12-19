// Télécharger la bibliothèque Servo
// Télécharger la librarie CapacitiveSensor (Menu -> Sketch -> Include Library -> Manage Libraries)


#include <Servo.h> // // importation de la bibliothèque Servo

Servo myservo;  // Creation d'un objet servo nommé myservo


void setup() {
  Serial.begin(9600); 
  
  myservo.attach(9);  // indiquer la broche ou est branché le servo, ici pin 9

}

void loop() {
  valeurPot = map(valeurPot, 0, 1023, 0, 180); // on transforme la plage de valeurs du potentiometre (0 - 1023) dans la plage de valeurs du servo moteur (0- 180)

  myservo.write(valeurPot); // indication de l'angle du servo
  delay(15);
}

