// creations des variables
let output, speechRec, button, svg, rec, lecteursAudio, bot, myVoice, finDiscussion, isListening;
let audioChunks = []; // variable de type list

function setup() {
  noCanvas(); // p5js -- pas de canvas, on travaille directement dans le html (DOM)
  output = select("#speech"); //  p5js -- on associe la balise avec l'id 'speech' de index.html à la variable output
  svg = select('.svgstyle'); //  p5js -- on associe la balise avec la class 'svgstyle' de index.html à la variable svg

  bot = new RiveScript({utf8: true}); //activation du bot rivescript, avec reconnaissance des accents français
  // Load a list of files all at once
  bot.loadFile("brain/brain.rive").then(botLoaded).catch(errorLoading);

  //---- Voice Speech ---//
  myVoice = new p5.Speech();

  finDiscussion = false; // variable booleenne pour indiquer fin discussion
  isListening = false; // variable booleenne pour indiquer activation de la reconnaissance
}

function listen() { // js -- fonction listen (activée quand on clique sur l'icone micro)
isListening = !isListening; // js -- inverse l'état d'affichage du bouton
finDiscussion = false;
if (isListening && finDiscussion==false){
  isListening = false;
  // --------------------------------------------- //
  // Activation reconnaissance vocale
  // --------------------------------------------- //
  speechRec = new p5.SpeechRec('fr', gotSpeech); //  p5js -- on détermine le français comme langue et le lancement de la fonction gotSpeech à chaque evenement de reconnaissance
  let continuous = false; // js -- Reconnaissance vocale s'arrête à chaque reconnaissance
  let interimResults = false; // js -- paramètre de reconnaissance (voir : )
  speechRec.start(continuous, interimResults); //  p5js -- activation de la reconnaissance et attribution des paramètres précédents

  function gotSpeech() { // js -- fonction gotSpeech
    if (speechRec.resultValue) { //  p5js -- si il y a un resultat à la reconnaissance …
      bot.reply("local-user", speechRec.resultString).then(function(reply) { // on active la reponse du bot rivescript à partir de la reconnaissance vocale
        if(match(reply, 'course :')){ // js -- si c'est la dernière réponse du brain rivescript
        var myStrArr = splitTokens(reply, ':');
        createElement('div','<span class="courses">'+myStrArr[1]+'</span>')
      }
      else if(match(reply, 'citation :')){ // js -- si c'est la dernière réponse du brain rivescript
      var myStrArr = splitTokens(reply, ':');
      createElement('div','<span class="citation">'+myStrArr[1]+'</span>')
    }
    else{
      if(reply == "ERR: No Reply Matched"){ // si pas de réponse correspondante dans le brain rivescript
        myVoice.speak("Désolé, je ne comprends pas"); // la synthèse vocale dit "Désolé, je ne comprends pas"
        myVoice.onEnd = theStartSpeechRec; // à la fin de la synthèse vocale on lance la fonction theStartSpeechRec
      }else{
        isListening = true;
        console.log(reply);
        myVoice.speak(reply); // la synthèse vocale dit la réponse du brain rivescript
        myVoice.onEnd = theStartSpeechRec; // à la fin de la synthèse vocale on lance la fonction theStartSpeechRec
      }
    }
  }); // fin bot reply
} // fin if (speechRec.resultValue)
} // fin gotSpeech()
if(finDiscussion == false){
  speechRec.onStart = theStartSpeechRec;
  speechRec.onEnd = theEndSpeechRec;
}
}
}

function theStartSpeechRec() { // js -- fonction theStartSpeechRec
  if ( isListening == false ){ // condition : si enregistrement inactif ET isListening == false
    svg.style('fill', 'rgb(0,255,0)'); // p5js -- le bouton devient vert
    isListening = true;
    speechRec.start(false, false); //  p5js -- activation de la reconnaissance et attribution des paramètres précédents
  }
}

function theEndSpeechRec() { // js -- fonction theEndSpeechRec
  svg.style('fill', 'rgb(255,0,0)'); // p5js -- on change la couleur de l'icone microphone (rouge)
  isListening = false;
}

function botLoaded() {
  console.log("Bot has finished loading!");
  bot.sortReplies();
}

function errorLoading(error) {
  console.log("Error when loading rivescript files: " + error);
}

function printer() {
  window.print();
}
