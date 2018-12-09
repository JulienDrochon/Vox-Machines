// Télécharger la bibliothèque Servo
// Télécharger la librarie CapacitiveSensor (Menu -> Sketch -> Include Library -> Manage Libraries)


#include <Servo.h> // // importation de la bibliothèque Servo

Servo myservo;  // Creation d'un objet servo nommé myservo

int potPin = A0; // broche sur laquelle est branché le potentiometre
int valeurPot; // variable

void setup() {
  myservo.attach(9);  // indiquer la broche ou est branché le servo, ici pin 9

}

void loop() {
  valeurPot = analogRead(potPin); // stocke la valeur donnée par le potentiometre dans la variable valeurPot

  valeurPot = map(valeurPot, 0, 1023, 0, 180); // on transforme la plage de valeurs du potentiometre (0 - 1023) dans la plage de valeurs du servo moteur (0- 180)

  myservo.write(valeurPot); // indication de l'angle du servo
  delay(15);
}

