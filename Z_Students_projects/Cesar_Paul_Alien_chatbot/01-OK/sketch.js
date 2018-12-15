
let soundfile1, soundfile2, soundfile3, soundfile4, soundfile5, soundfile6, soundfile7;
var soundList= [];

let arrayclass = [];


function preload(){
     console.log("OK");
  for(var i=0;i<26;i++){
    console.log("ENTER");
    var soundfile;
    soundfile = loadSound("assets/"+nf(i,2,0)+".mp3");
    console.log(soundfile);
    soundList.push(soundfile);
  }

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
      console.log(arraychars); //for debug

      var i = 0;
      setInterval(function(){
        drawLetters(arraychars[i], 1000);
        if(i<arraychars.length){
          i++;
        }
      }, 1000);
    }
  }
}

// function for drawing blocks inside CSS grid
function drawLetters(letter, time) {
  if(letter=='A' || letter=='a'){
    console.log(soundList.length);
    arrayclass[1].addClass("active");
    soundList[0].play();
  }

  if(letter=='B' || letter=='b'){
    arrayclass[2].addClass("active");
    soundList[1].play();
  }

  if(letter=='C' || letter=='c'){
    arrayclass[3].addClass("active");
    soundList[2].play();
  }

  if(letter=='D' || letter=='d'){
    arrayclass[4].addClass("active");
    soundList[3].play();
  }

  if(letter=='E' || letter=='e'){
    arrayclass[5].addClass("active");
    soundList[4].play();
  }

  if(letter=='F' || letter=='f'){
    arrayclass[6].addClass("active");
    soundList[5].play();
  }

  if(letter=='G' || letter=='g'){
    arrayclass[7].addClass("active");
    soundList[6].play();
  }

  if(letter=='H' || letter=='h'){
    arrayclass[8].addClass("active");
    soundList[7].play();
  }

  if(letter=='I' || letter=='i'){
    arrayclass[9].addClass("active");
    soundList[8].play();
  }

  if(letter=='K' || letter=='k'){
    arrayclass[10].addClass("active");
    soundList[9].play();
  }

  if(letter=='L' || letter=='l'){
    arrayclass[11].addClass("active");
    soundList[10].play();
  }

  if(letter=='M' || letter=='m'){
    arrayclass[12].addClass("active");
    soundList[11].play();
  }

  if(letter=='N' || letter=='n'){
    arrayclass[13].addClass("active");
    soundList[12].play();
  }

  if(letter=='O' || letter=='o'){
    arrayclass[14].addClass("active");
    soundList[13].play();
  }

  if(letter=='P' || letter=='p'){
    arrayclass[15].addClass("active");
    soundList[14].play();
  }

  if(letter=='Q' || letter=='q'){
    arrayclass[16].addClass("active");
    soundList[15].play();
  }

  if(letter=='R' || letter=='r'){
    arrayclass[17].addClass("active");
    soundList[16].play();
  }

  if(letter=='S' || letter=='s'){
    arrayclass[18].addClass("active");
    soundList[17].play();
  }

  if(letter=='T' || letter=='t'){
    arrayclass[19].addClass("active");
    soundList[18].play();
  }

  if(letter=='U' || letter=='u'){
    arrayclass[20].addClass("active");
    soundList[19].play();
  }

  if(letter=='V' || letter=='v'){
    arrayclass[21].addClass("active");
    soundList[20].play();
  }

  if(letter=='W' || letter=='w'){
    arrayclass[22].addClass("active");
    soundList[21].play();
  }

  if(letter=='X' || letter=='x'){
    arrayclass[23].addClass("active");
    soundList[22].play();
  }

  if(letter=='Y' || letter=='y'){
    arrayclass[24].addClass("active");
    soundList[23].play();
  }

  if(letter=='Z' || letter=='z'){
    arrayclass[25].addClass("active");
    soundList[24].play();
  }

  if(letter=='J' || letter=='j'){
    arrayclass[26].addClass("active");
    soundList[25].play();
  }

  timer(time);

}

// function for removing '.active' class after a while
function timer(time) {

    setTimeout(function(){
      for (var i=1; i < 29; i++){
        arrayclass[i]=select("."+nf(i, 2, 0));
        //arrayclass[i].removeClass("active");
      }
    }, time);
}
