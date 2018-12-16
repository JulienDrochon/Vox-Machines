let speechRec;

function setup() {
  clickSpeech = select(".click");
  clickSpeech.mousePressed(speechClicked);
}

function speechClicked() {
  // Create a Speech Recognition object with callback
  speechRec = new p5.SpeechRec('fr', gotSpeech);
  // "Continuous recognition" (as opposed to one time only)
  let continuous = true;
  // If you want to try partial recognition (faster, less accurate)
  let interimResults = false;
  // This must come after setting the properties
  speechRec.start(continuous, interimResults);

  // DOM element to display results
  let output = select('#speech');

  // Speech recognized event
  function gotSpeech() {
    // Something is there
    // Get it as a string, you can also get JSON with more info
    console.log(speechRec);
    if (speechRec.resultValue) {
      let said = speechRec.resultString;
      // Show user
      output.html(said);

      $('#speech').addClass('active').trigger('classChange');
    }
  }
}

$('#speech').on('classChange', function() {
  foo();
});

function foo() {
  $('#speech').removeClass('active');

  //
  var eacute = {"é": true};
  var eagrave = {"è": true};
  var ecirc = {"ê": true};
  var aagrave = {"à": true};
  var uagrave = {"ù": true};
  var itrem = {"ï": true};
  var acirc = {"â": true};
  var icirc = {"î": true};
  var ccedi = {"ç": true};
  var ocirc = {"ô": true};
  var ucirc = {"û": true};
  var etrem = {"ë": true};
  var utrem = {"ü": true};

  $('#speech').each(function (i, elem) {
    var self = $(elem),
    textNodes = self.text().split(''),
    i = 0;
    for (i = 0; i < textNodes.length; i += 1) {
      if (eacute[textNodes[i]]) {
        textNodes[i] = '<span class="eacute">' + textNodes[i] + '</span>';
      }
      if (eagrave[textNodes[i]]) {
        textNodes[i] = '<span class="eagrave">' + textNodes[i] + '</span>';
      }
      if (ecirc[textNodes[i]]) {
        textNodes[i] = '<span class="ecirc">' + textNodes[i] + '</span>';
      }
      if (aagrave[textNodes[i]]) {
        textNodes[i] = '<span class="aagrave">' + textNodes[i] + '</span>';
      }
      if (uagrave[textNodes[i]]) {
        textNodes[i] = '<span class="uagrave">' + textNodes[i] + '</span>';
      }
      if (itrem[textNodes[i]]) {
        textNodes[i] = '<span class="itrem">' + textNodes[i] + '</span>';
      }
      if (acirc[textNodes[i]]) {
        textNodes[i] = '<span class="acirc">' + textNodes[i] + '</span>';
      }
      if (icirc[textNodes[i]]) {
        textNodes[i] = '<span class="icirc">' + textNodes[i] + '</span>';
      }
      if ( ccedi[textNodes[i]]) {
        textNodes[i] = '<span class="ccedi">' + textNodes[i] + '</span>';
      }
      if ( ocirc[textNodes[i]]) {
        textNodes[i] = '<span class="ocirc">' + textNodes[i] + '</span>';
      }
      if ( ucirc[textNodes[i]]) {
        textNodes[i] = '<span class="ucirc">' + textNodes[i] + '</span>';
      }
      if ( etrem[textNodes[i]]) {
        textNodes[i] = '<span class="etrem">' + textNodes[i] + '</span>';
      }
      if ( utrem[textNodes[i]]) {
        textNodes[i] = '<span class="utrem">' + textNodes[i] + '</span>';
      }
    }
    self.html(textNodes.join(''));
  });

  $("#speech").text3d({
    depth: 200,
    angle: 135,
    color: "#FF6347",
    lighten: -.9,
    shadowDepth: 0,
    shadowAngle: 180,
    shadowOpacity: 0.9
  });

  $('.eacute, .eagrave, .ecirc, .aagrave, .uagrave, .itrem, .acirc, .icirc, .ccedi, .ocirc, .ucirc, .etrem, .utrem').each(function(i) {
    // initialize position
    $(this).css({
      position: 'relative',
      left: 0,
      color:'#ffffff'
    })
    // Delay: we don't want to animate
    // characters simultaneously
    .delay(i * 45)
    // Animate to the right
    .animate({ left: '20px', top:'-20px', color: '#ffffff' }, 1500);
  });
}
