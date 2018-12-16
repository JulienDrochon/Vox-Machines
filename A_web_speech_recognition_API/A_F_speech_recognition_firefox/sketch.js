function listen() {
  var SpeechRecognition = SpeechRecognition;
var SpeechGrammarList = SpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent;

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

var diagnostic = document.querySelector('#speech');
var bg = document.querySelector('html');

document.body.onclick = function() {
  recognition.start();
  //console.log('Prêt à recevoir une commande de couleur.');
}

recognition.onresult = function(event) {
  var color = event.results[0][0].transcript;
  diagnostic.textContent = 'Résultat reçu : ' + color + '.';
  // bg.style.backgroundColor = color;
  // console.log('Niveau de correspondance : ' + event.results[0][0].confidence);
}
}
