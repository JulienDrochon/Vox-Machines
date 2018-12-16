#include <AFMotor.h>

int incomingByte;

AF_DCMotor motor(3);

void setup() {
  Serial.begin(9600);           // set up Serial library at 9600 bps
  Serial.println("Motor test!");

  // turn on motor
  motor.setSpeed(0);

  motor.run(FORWARD);
}

boolean trigger0, trigger1, trigger2, trigger3;

void loop() {
  if (Serial.available() > 0) {   // see if there's incoming serial data
    incomingByte = Serial.read();


    if (incomingByte == 0 && trigger0 == false) {
      motor.run(RELEASE);
      motor.setSpeed(100);
      trigger0 = true;
      trigger1 = false;
      trigger2 = false;
      trigger3 = false;
      motor.run(FORWARD);
    }
    if (incomingByte == 1 && trigger1 == false) {
      motor.run(RELEASE);
      motor.setSpeed(200);
      trigger0 = false;
      trigger1 = true;
      trigger2 = false;
      trigger3 = false;
      motor.run(FORWARD);
    }
  // CUNI
    if (incomingByte == 100 && trigger2 == false) {
      motor.run(RELEASE);
      motor.setSpeed(0);
      trigger0 = false;
      trigger1 = false;
      trigger2 = true;
      trigger3 = false;
      motor.run(FORWARD);
    }
  // GAY
    if (incomingByte == 200 && trigger3 == false) {
      motor.run(RELEASE);
      motor.setSpeed(60);
      trigger0 = false;
      trigger1 = false;
      trigger2 = false;
      trigger3 = true;
      motor.run(FORWARD);
    }
  }
}
