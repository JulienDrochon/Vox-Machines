// creations des variables
let output, speechRec, button, svg, rec, lecteursAudio, bot, myVoice;
let audioChunks = []; // variable de type list

function setup() {
  noCanvas(); // p5js -- pas de canvas, on travaille directement dans le html (DOM)
  output = select("#speech"); //  p5js -- on associe la balise avec l'id 'speech' de index.html à la variable output
  svg = select('.svgstyle'); //  p5js -- on associe la balise avec la class 'svgstyle' de index.html à la variable svg
  lecteursAudio = select('#lecteursAudio'); //  p5js -- on associe la balise avec l'id  lecteursAudio à la variable lecteursAudio

  //activation du bot rivescript
  bot = new RiveScript({utf8: true});
  // Load a list of files all at once
  // var files = ['brain/knockknock.rive'];
  bot.loadFile("brain/knockknock.rive").then(botLoaded).catch(errorLoading);

  //---- Voice Speech ---//
  myVoice = new p5.Speech();

  // la ligne suivante peut sembler complexe, c'est du js pur, qui utilise
  // un changement récent de syntaxe dans l'écriture du js (voir promises : https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses)
  // voir aussi la fonction navigator.mediaDevices.getUserMedia : https://developer.mozilla.org/fr/docs/Web/API/MediaDevices/getUserMedia
  navigator.mediaDevices.getUserMedia({audio:true}).then(stream => {handlerFunction(stream)});

}

function listen() { // js -- fonction listen (activée quand on clique sur l'icone micro)

// console.log('record on'); //indication dans la console pour vérifier que l'enregistrement audio est acivé

// --------------------------------------------- //
// Activation reconnaissance vocale
// --------------------------------------------- //
speechRec = new p5.SpeechRec('fr', gotSpeech); //  p5js -- on détermine le français comme langue et le lancement de la fonction gotSpeech à chaque evenement de reconnaissance
let continuous = false; // js -- Reconnaissance vocale s'arrête à chaque reconnaissance
let interimResults = false; // js -- paramètre de reconnaissance (voir : )
speechRec.start(continuous, interimResults); //  p5js -- activation de la reconnaissance et attribution des paramètres précédents

function gotSpeech() { // js -- fonction gotSpeech
  // console.log(speechRec); // pour afficher dans la console du navigateur
  if (speechRec.resultValue) { //  p5js -- si il y a un resultat à la reconnaissance …
    output.html(speechRec.resultString); //  p5js -- … j'affiche le texte de cette reconnaissance dans la div avec l'id "speech" (voir ligne 8 de ce code)

    bot.reply("local-user", speechRec.resultString).then(function(reply) {
      console.log("The bot says: " + reply);
      if(reply == "ERR: No Reply Matched"){
        myVoice.speak("Désolé, je ne comprends pas");
      }else if(reply == "hahahaha, c'est marrant."){
        
      }else {
        myVoice.speak(reply);
      }
    });
  }
}

myVoice.onEnd = theStart;
speechRec.onEnd = theEnd; //  p5js -- à la fin de la reconnaissance je lance la fonction theEnd
speechRec.onStart = theStart; //  p5js -- au début de la reconnaissance je lance la fonction theEnd
}

function theStart() { // js -- fonction theStart

  svg.style('fill', 'rgb(0,255,0)'); // p5js -- on change la couleur de l'icone microphone (vert)
  if (rec != undefined) {
    if (rec.state == "inactive" ){
      rec.start(); // js -- déclenchement de l'enregistrement de l'audio
      speechRec.start(false, false); //  p5js -- activation de la reconnaissance et attribution des paramètres précédents
    }
  }
}

function theEnd() { // js -- fonction theEnd
  svg.style('fill', 'rgb(255,0,0)'); // p5js -- on change la couleur de l'icone microphone (rouge)
  if (rec != undefined) {
    if (rec.state != "inactive"){
      rec.stop(); // js -- on arrête l'enregistrement audio    }
    }
  }
}


// --------------------------------------------- //
// Récupération de l'enregistrement audio +
// Affichage des lecteur dans la page
// js pur car pas très bien implémenté dans p5js
// --------------------------------------------- //
function handlerFunction(stream) {
  rec = new MediaRecorder(stream); // js -- déclaration objet mediastream pour enregistrer l'audio
  rec.ondataavailable = e => {
    audioChunks.push(e.data); // js -- on met le résulat de l'enregistrement audio dans un tableau

    if (rec.state == "inactive"){ // js -- on s'assure que l'enregistrement est terminé
    let blob = new Blob(audioChunks,{type:'audio/mpeg-3'}); // js -- création des Blob

    // pour chaque blob audio je crée les balises audio dans le HTML et
    // j'attribue le blob au lecteur
    lecteursAudio.html(''); // j'efface les précédents affichages de lecteur
    for (var i =0; i < audioChunks.length; i++){ // js -- voir boucle for : https://www.youtube.com/watch?v=h4ApLHe8tbk
      let audiodiv = createElement('audio').parent(lecteursAudio); // p5js -- on créé un element html audio dans la balise dans index.html
      audiodiv.id(i).attribute('src', URL.createObjectURL(audioChunks[i])); // p5js + js -- attribution du blob audio au lecteur audio
      audiodiv.attribute('controls','true'); // p5js -- affichage du lecteur audio
    }
  }
}
}

function botLoaded() {
  console.log("Bot has finished loading!");
  bot.sortReplies();
}

function errorLoading(error) {
  console.log("Error when loading rivescript files: " + error);
}
