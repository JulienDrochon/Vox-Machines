  $(".test").text3d({
    depth: 100,
    angle: 135,
    color: "#ff0000",
    lighten: -0.1,
    shadowDepth: 0,
    shadowAngle: 45,
    shadowOpacity: 0.2
  })

  var chars = $(".test").blast({ search: "é" });
  var chars0 = $(".test").blast({ search: "è" });
  var chars1 = $(".test").blast({ search: "ù" });
  var chars2 = $(".test").blast({ search: "à" });

  chars.each(function(i) {
    // initialize position
    $(this).css({
      position: 'relative',
      left: 0,

    })

    // Delay: we don't want to animate
    // characters simultaneously
    .delay(i * 45)

    // Animate to the right
    .animate({ left: '50px', top:'-50px', color: '#00ffff' }, 3000);
  });

  chars0.each(function(i) {
    // initialize position
    $(this).css({
      position: 'relative',
      left: 0
    })

    // Delay: we don't want to animate
    // characters simultaneously
    .delay(i * 45)

    // Animate to the right
    .animate({ left: '50px', top:'-50px'}, 3000);
  });

  chars1.each(function(i) {
    // initialize position
    $(this).css({
      position: 'relative',
      left: 0
    })

    // Delay: we don't want to animate
    // characters simultaneously
    .delay(i * 45)

    // Animate to the right
    .animate({ left: '50px', top:'-50px' }, 3000);
  });

  chars2.each(function(i) {
    // initialize position
    $(this).css({
      position: 'relative',
      left: 0
    })

    // Delay: we don't want to animate
    // characters simultaneously
    .delay(i * 45)

    // Animate to the right
    .animate({ left: '50px', top:'-50px' }, 3000);
  });

  $(".blast").text3d({
    depth: 100,
    angle: 135,
    color: "#ff0000",
    lighten: -0.1,
    shadowDepth: 0,
    shadowAngle: 45,
    shadowOpacity: 0.2
  }).each(function(i) {
    $(this).css({
      position: 'relative',
      left: 0
    })
    .animate({ left: '50px', top:'-50px' }, 3000);
  });
