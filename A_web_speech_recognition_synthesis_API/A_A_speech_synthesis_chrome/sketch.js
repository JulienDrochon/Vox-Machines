var myVoice; // new P5.Speech object

function setup()
{
  myVoice = new p5.Speech();

  myVoice.setLang('fr_FR');

  myVoice.speak('Bonjour, bébé!!!');

  myVoice.listVoices();

  // myVoice.setVoice();
}
