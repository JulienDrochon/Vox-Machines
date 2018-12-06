var texte = "ceci est un exemple";
var letters = [];
var chars = [];
  var k = 20;

function setup(){

  createCanvas(800,600);
 fill(255);
  // Create a Speech Recognition object with callback
  var speechRec = new p5.SpeechRec('fr', gotSpeech);

  // "Continuous recognition" (as opposed to one time only)
  var continuous = true;
  // If you want to try partial recognition (faster, less accurate)
  var interimResults = false;
  // This must come after setting the properties
  speechRec.start(continuous, interimResults);


  function gotSpeech() {
    if (speechRec.resultValue) {


      texte = speechRec.resultString ;

    }

splittexte(texte);

    console.log(chars);
  }
}



  function draw() {
    background(0);

    for(var i = 0; i<chars.length; i++){
      text(chars[i], 10, i*20+k);
    }
    k++;
    if (k > height) {
      k=20;
      splittexte('data');
    }
  }

  function splittexte(data) {
      texte ='';
      chars=[];
      letters=[];
      
        var splitTexte = split(data, ' ');

        for(var i = 0; i<splitTexte.length; i++){
          letters.push(splitTexte[i].split(''));
        }

        for(var i = 0; i<letters.length; i++){
          for(var j=0; j<letters[i].length;j++){
            chars.push(letters[i][j]);
            k = 20;
          }
        }
  }
