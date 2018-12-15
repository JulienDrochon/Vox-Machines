
let soundfile1, soundfile2, soundfile3, soundfile4, soundfile5, soundfile6, soundfile7;
var soundList= [];

let arrayclass = [];

// preloading soundfiles
function preload(){
  soundfile1 = loadSound('assets/01.mp3');
  soundfile2 = loadSound('assets/02.mp3');
  soundfile3 = loadSound('assets/03.mp3');
  soundfile4 = loadSound('assets/04.mp3');
  soundfile5 = loadSound('assets/05.mp3');
  soundfile6 = loadSound('assets/06.mp3');
  soundfile7 = loadSound('assets/07.mp3');
  soundList = [soundfile1, soundfile2, soundfile3, soundfile4, soundfile5, soundfile6, soundfile7];
}

function setup() {
  noCanvas();
  // Speech recognition settings
  let speechRec = new p5.SpeechRec('fr', gotSpeech);
  let continuous = true;
  let interim = false;
  speechRec.start(continuous, interim);
  // Choosing class for each grid item
  for (var i=1; i < 29; i++){
    arrayclass[i]=select("."+nf(i, 2, 0));
  }
  // when speech recognition fires up …
  function gotSpeech() {
    console.log(speechRec);
    if (speechRec.resultValue) {
      //input : variable for storing recognized text
      let input = speechRec.resultString;
      //  console.log(input); // for debug
      // arraychars : variable for storing splitted word
      let arraychars = split(input, '');
      // console.log(arraychars); //for debug

      var i = 0;
      setInterval(function(){
        drawLetters(arraychars[i], 1000);
        if(i<arraychars.length){
          i++;
        }
      }, 3000);
    }
  }
}

// function for drawing blocks inside CSS grid
function drawLetters(letter, time) {
  if(letter=='A' || letter=='a'){
    arrayclass[28].addClass("active");
    arrayclass[27].addClass("active");
    arrayclass[25].addClass("active");
  }

  if(letter=='B' || letter=='b'){
    arrayclass[1].addClass("active");
    arrayclass[2].addClass("active");
    arrayclass[3].addClass("active");
  }

  if(letter=='O' || letter=='o'){
    arrayclass[2].addClass("active");
    arrayclass[3].addClass("active");
    arrayclass[4].addClass("active");
  }

  if(letter=='N' || letter=='n'){
    arrayclass[4].addClass("active");
    arrayclass[5].addClass("active");
    arrayclass[6].addClass("active");
  }

  if(letter=='J' || letter=='j'){
    arrayclass[5].addClass("active");
    arrayclass[6].addClass("active");
    arrayclass[7].addClass("active");
  }

  if(letter=='U' || letter=='u'){
    arrayclass[7].addClass("active");
    arrayclass[8].addClass("active");
    arrayclass[9].addClass("active");
  }

  if(letter=='R' || letter=='r'){
    arrayclass[9].addClass("active");
    arrayclass[10].addClass("active");
    arrayclass[11].addClass("active");
  }
  timer(time);
}

// function for removing '.active' class after a while
function timer(time) {
  setTimeout(function(){
    for (var i=1; i < 29; i++){
      arrayclass[i]=select("."+nf(i, 2, 0));
      arrayclass[i].removeClass("active");
    }
  }, time);
}
