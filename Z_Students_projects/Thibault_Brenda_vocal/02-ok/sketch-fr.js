let speechRec;

function setup() {// Create a Speech Recognition object with callback
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

var eacute = {"é": true};
var eagrave = {"è": true};

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

$('.eacute').each(function(i) {
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
  .animate({ left: '20px', top:'-20px', color: '#ffffff' }, 3000);
});

  $('.eagrave').each(function(i) {
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
    .animate({ left: '20px', top:'-20px', color: '##00BFFF' }, 3000);
  });
  //
  // chars0.each(function(i) {
  //   // initialize position
  //   $(this).css({
  //     position: 'relative',
  //     left: 0
  //   })
  //
  //   // Delay: we don't want to animate
  //   // characters simultaneously
  //   .delay(i * 45)
  //
  //   // Animate to the right
  //   .animate({ left: '50px', top:'-50px'}, 3000);
  // });

  // chars1.each(function(i) {
  //   // initialize position
  //   $(this).css({
  //     position: 'relative',
  //     left: 0
  //   })
  //
  //   // Delay: we don't want to animate
  //   // characters simultaneously
  //   .delay(i * 45)
  //
  //   // Animate to the right
  //   .animate({ left: '50px', top:'-50px' }, 3000);
  // });
  //
  // chars2.each(function(i) {
  //   // initialize position
  //   $(this).css({
  //     position: 'relative',
  //     left: 0
  //   })
  //
  //   // Delay: we don't want to animate
  //   // characters simultaneously
  //   .delay(i * 45)
  //
  //   // Animate to the right
  //   .animate({ left: '50px', top:'-50px' }, 3000);
  // });
  //
  // $(".blast").text3d({
  //   depth: 100,
  //   angle: 135,
  //   color: "#ff0000",
  //   lighten: -0.1,
  //   shadowDepth: 0,
  //   shadowAngle: 45,
  //   shadowOpacity: 0.2
  // }).each(function(i) {
  //   $(this).css({
  //     position: 'relative',
  //     left: 0
  //   })
  //   .animate({ left: '50px', top:'-50px' }, 3000);
  // });

  // });
}
