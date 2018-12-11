var myVoice; // new P5.Speech object

function setup()
{
  myVoice = new p5.Speech();

  myVoice.setLang('fr_FR');

  myVoice.speak('yeah, baby!!!');

  myVoice.listVoices();

  // myVoice.setVoice();
}
