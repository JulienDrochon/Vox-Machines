/*
f -> fullscreen mode
t -> grey background
*/

var dancingWords = [];
let output, toggleGreyScreen=false;

let b, container;
let hauteur;

function setup() {
  noCanvas();
  // hauteur = windowHeight;

  var speechRec = new p5.SpeechRec('fr', gotSpeech);

  // "Continuous recognition" (as opposed to one time only)
  var continuous = true;
  // If you want to try partial recognition (faster, less accurate)
  var interimResults = false;
  // This must come after setting the properties
  speechRec.start(continuous, interimResults);


  function gotSpeech() {
    if (speechRec.resultValue) {
      texts = speechRec.resultString ;
      k= windowHeight+20;
    }

    //       output.html(texts);
    //       // With options
    //
    //       b = baffle('.snake', {
    //         characters: '░█▓▓░█▌▌▬▂▃▄▅▆▇█▓▒░░▒▓█▇▆▅▄▃▂░█▓▓░█▌▌▬▂▃▄▅▆▇█▓▒░░▒▓█▇▆▅▄▃▂░█▓▓░█▌▌▬▂▃▄▅▆▇█▓▒░░▒▓█▇▆▅▄▃▂',
    //         speed: 100
    //       });
    //       b.reveal(5000);
  }

  texts = "ceci est un texte exemple";
  output = select('.snake');
  output.html(texts);
  // With options

  b = baffle('.snake', {
    characters: '░█▓▓░█▌▌▬▂▃▄▅▆▇█▓▒░░▒▓█▇▆▅▄▃▂░█▓▓░█▌▌▬▂▃▄▅▆▇█▓▒░░▒▓█▇▆▅▄▃▂░█▓▓░█▌▌▬▂▃▄▅▆▇█▓▒░░▒▓█▇▆▅▄▃▂',
    speed: 100
  });
  b.reveal(5000);
  drag(".container");
}

var k =0;


function draw() {
  // console.log(output.style('height') + " / " + k);
  output.position(0, k);
  if(k < 0-int(output.style('height'))){
    k = windowHeight +20;

    b.reveal(5000);
  }else
  {
    k--;
  }
}
//
function drag(st){
  $(st)
  .draggable({
    containment: 'body'
  }
)

.resizable({
  handles: 'e, w',
})

.on("mouseover", function(){
  $( this ).addClass("move-cursor")
  // $( this ).css( "border", "3px solid red" );
  $( this ).children().css( "background", "red" );
  $( this ).css( "border", "5px solid rgb(0,255,0)" );
})

.on("mousedown", function(){
  $( this )
  .removeClass("move-cursor")
  .addClass("grab-cursor")
  .addClass("opac");
})

.on("mouseup", function(){
  $( this )
  .removeClass("grab-cursor")
  .removeClass("opac")
  .addClass("move-cursor");
})
.on("mouseout", function(){
  $( this )
  .children().css( "background", "black" )
  .children().css( "width", "100%" )
  .css( "border", "none" );
})
.on("resize", function(){
  $( this )
  .children().css( "font-size", $( this ).width() );
})
;
}

function keyTyped(){
  if(key =='f'){
    fullscreen(true);
  }
  if(key =='t'){
    toggleGreyScreen =!toggleGreyScreen;
    if (toggleGreyScreen==true){
      !toggleGreyScreen;
      $('body').css("background","grey");
    }else{
      $('body').css("background","black");
    }
  }
}
