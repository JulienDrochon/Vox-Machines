let speechRec;
var clickSpeech;

function setup() {
  clickSpeech = select(".click");
  clickSpeech.mousePressed(speechClicked);
}

function speechClicked() {
  // Create a Speech Recognition object with callback
  speechRec = new p5.SpeechRec('es', gotSpeech);
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

  //á, é, í, ó, ú
  var eacute = {"é": true};
  var iacute = {"í": true};
  var oacute = {"ó": true};
  var uacute = {"ú": true};
  var aacute = {"á": true};

  $('#speech').each(function (i, elem) {
    var self = $(elem),
    textNodes = self.text().split(''),
    i = 0;
    for (i = 0; i < textNodes.length; i += 1) {
      if (eacute[textNodes[i]]) {
        textNodes[i] = '<span class="eacute">' + textNodes[i] + '</span>';
      }
      if (iacute[textNodes[i]]) {
        textNodes[i] = '<span class="iacute">' + textNodes[i] + '</span>';
      }
      if (oacute[textNodes[i]]) {
        textNodes[i] = '<span class="oacute">' + textNodes[i] + '</span>';
      }
      if (uacute[textNodes[i]]) {
        textNodes[i] = '<span class="uacute">' + textNodes[i] + '</span>';
      }
      if (aacute[textNodes[i]]) {
        textNodes[i] = '<span class="aacute">' + textNodes[i] + '</span>';
      }
    }
    self.html(textNodes.join(''));
  });

  $("#speech").text3d({
    depth: 200,
    angle: 135,
    color: "#FFFF00",
    lighten: -.9,
    shadowDepth: 0,
    shadowAngle: 180,
    shadowOpacity: 0.9
  });

  $('.eacute, .aacute, .iacute, .uacute, .oacute').each(function(i) {
    // initialize position
    $(this).css({
      position: 'relative',
      left: 0,
      color:'#fff'
    })

    // Delay: we don't want to animate
    // characters simultaneously
    .delay(i * 45)

    // Animate to the right
    .animate({ left: '20px', top:'-20px', color: '#00ffff' }, 3000);
  });
}
