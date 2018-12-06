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

  output.html(volume);

}
