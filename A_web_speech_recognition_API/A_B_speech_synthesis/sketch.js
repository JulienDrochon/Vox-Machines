var myVoice = new p5.Speech(); // new P5.Speech object
var speakButton; // button


function setup()
{
  // console.log(myVoice.listVoices());
  myVoice.setLang('fr-FR');
}

function letsSpeak(){
  myVoice.speak();
}

function keyPressed()
{
//  background(255, 0, 0); // clear screen
}
function mousePressed()
{
  // if in bounds:
  if(mouseX<width && mouseY<height) {
    ellipse(mouseX, mouseY, 50, 50); // circle
    // randomize voice and speak word:
    myVoice.setVoice(Math.floor(random(myVoice.voices.length)));
    myVoice.speak(words[iptr]);
    iptr = (iptr+1) % words.length; // increment
  }
}
