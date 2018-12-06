var input;
let output;

function setup() {
  noCanvas();
output = select("#volume");
  // Create an Audio input
  input = new p5.AudioIn();

  input.start();
}

function draw() {
  // Get the overall volume (between 0 and 1.0)
  var volume = input.getLevel();

  // If the volume > 0.1,  a rect is drawn at a random location.
  // The louder the volume, the larger the rectangle.
  var threshold = 0.2;
  if (volume > threshold) {
    output.html('threshold');
  }
  else{
    output.html('');
  }
}
