
let bot;

function setup() {
  noCanvas();
  bot = new RiveScript({utf8: true});
  // Load a list of files all at once
  bot.loadFile("brain/knockknock.rive").then(botLoaded).catch(errorLoading);
  
  var button = select('#submit');
  var input = select('#textinput');
  var output = select('#bot');

  button.mousePressed(chat);

  function chat() {
    var txt = input.value();
    bot.reply("local-user", txt).then(function(reply) {
      output.html(reply);
    });
    //
    // var reply = bot.reply("local-user", txt);

  }
}

function botLoaded() {
  console.log("Bot loaded");
  bot.sortReplies();
}

function errorLoading(error) {
  console.log("Error when loading rivescript files: " + error);
}
