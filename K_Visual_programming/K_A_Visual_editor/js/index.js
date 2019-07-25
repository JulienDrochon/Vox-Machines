var botAvatar =
"./assets/assistant-icon.png";
var userAvatar =
"./assets/user-icon.png";
var speechPath = {};
var ctrl;

// --- chatbot gui
var telegram = new Vue({
  el: "#telegram",
  data: {
    botSleep: 1000,
    textfield: "",
    users: [
      { avatar: botAvatar, username: "Assistant" },
      { avatar: userAvatar, username: "User", owner: true }
    ],
    messages: [
      {
        user: 0,
        text:
        "Hello, I'm a bot in a Messenger. I can be programmed without writing any code. Just use the node editor on the left."
      }
    ]
  },
  methods: {
    formatMsg(msg) {
      return msg.replace(
        /\[(.+?)\]\((.+?)\)/g,
        '<a target="_blank" href="$2">$1</a>'
      );
    },
    onMessage() {
      var ms = this.$refs.messages;
      setTimeout(() => {
        ms.scrollTop = ms.scrollHeight;
      }, 100);
    },
    sendOwner(message) {
      this.messages.push({ user: 1, text: message });
      console.log("---"+this.messages[1].text);
      receiveBot(message);
      this.onMessage();
    },
    sendBot(message) {
      this.messages.push({ user: 0, text: message });
      this.onMessage();
    }
  }
});

var onMessageTask = [];
function receiveBot(msg) {
  setTimeout(async () => {
    await onMessageTask.map(t => t.run(msg));
  }, telegram.botSleep);
}

function receiveUser(msg) {
  telegram.sendBot(msg);
}

// ----- Node NodeEditor
var actSocket = new Rete.Socket("Action");
var strSocket = new Rete.Socket("String");

const JsRenderPlugin = {
  install(editor, params = {}) {
    editor.on("rendercontrol", ({ el, control }) => {
      if (control.render && control.render !== "js") return;

      control.handler(el, editor);
    });
  }
};

class InputControl extends Rete.Control {
  constructor(key) {
    super(key);
    this.render = "js";
    this.key = key;
  }

  handler(el, editor) {
    var input = document.createElement("input");
    el.appendChild(input);

    var text = this.getData(this.key) || "Some message..";

    input.value = text;
    this.putData(this.key, text);
    input.addEventListener("change", () => {
      this.putData(this.key, input.value);
    });
  }
}

class MessageSendComponent extends Rete.Component {
  constructor() {
    super("Bot");
    this.task = {
      outputs: { t: "option", f: "option" },
      // init(task) {
      //   onMessageTask.push(task);
      // }
    };
  }

  builder(node) {
    var inp1 = new Rete.Input("act", "Check", actSocket, true);
    // var out1 = new Rete.Output("act", "Event", actSocket);
    var ctrl = new InputControl("text");
    var out1 = new Rete.Output("t", "Success", actSocket);

    return node.addInput(inp1).addOutput(out1).addControl(ctrl);
  }

  worker(node, inputs) {
    var text = inputs["text"] ? inputs["text"][0] : node.data.text; //default text
    // var text = msg
    console.log("msg send");
    receiveUser(text);
  }
}
var check = false;
class MessageMatchComponent extends Rete.Component {
  constructor() {
    super("User match");
    this.task = {
      outputs: { t: "option", f: "option" },
      init(task) {
        onMessageTask.push(task);
      }
    };
  }

  builder(node) {
    var inp1 = new Rete.Input("tr", "Event", actSocket, false);
    var out1 = new Rete.Output("t", "Success", actSocket);
    var out2 = new Rete.Output("f", "Fail", actSocket);
    ctrl = new InputControl("regexp");
    // var ctrl1 = new InputControl("text");

    // inp1.addControl(ctrl1);

    return node
    .addControl(ctrl)
    // .addControl(ctrl1)
    .addInput(inp1)
    .addOutput(out1)
    .addOutput(out2);
  }
  worker(node, inputs, msg) {
     console.log(onMessageTask);
    text = msg;
    console.log('ctrl : ' + JSON.stringify(ctrl));

    if (!text.match(new RegExp(node.data.regexp, "gi"))) this.closed = ["t"];
    else this.closed = ["f"];
  }

}


var components = [
  new MessageSendComponent(),
  new MessageMatchComponent()
];

var container = document.getElementById("editor");
var editor = new Rete.NodeEditor("demo@0.1.0", container);
editor.use(VueRenderPlugin.default);
editor.use(ConnectionPlugin.default);
editor.use(ContextMenuPlugin.default);
editor.use(JsRenderPlugin);
editor.use(TaskPlugin);

var engine = new Rete.Engine("demo@0.1.0");

components.map(c => {
  editor.register(c);
  engine.register(c);
});

editor
.fromJSON({
  id: "demo@0.1.0",
  nodes: {
    "1": {
      id: 1,
      data: { regexp: ".*hello.*" },
      group: null,
      inputs: {
        // act: { connections: [{ node: 1, output: "act" }] },
        // text: { connections: [{ node: 1, output: "text" }] }
      },
      outputs: {
        t: { connections: [{ node: 2, input: "act" }] },
        f: { connections: [{ node: 4, input: "act" }] }
      },
      position: [30, 22.1000138522662],
      name: "User match"
    },
    "2": {
      id: 2,
      data: { text: "Hello !" },
      group: null,
      inputs: {},
      outputs: {
        t: { connections: [{ node: 3, input: "act" }] }
      },
      position: [300, -143.3955998177927],
      name: "Bot"
    },
    "3": {
      id: 3,
      data: { text: "ッ" },
      group: null,
      inputs: {},
      outputs: { text: { connections: [{ node: 2, input: "action" }] } },
      position: [600, -300],
      name: "Bot"
    },
    "4": {
      id: 4,
      data: { text: "Fail1!!" },
      group: null,
      inputs: {},
      outputs: {},
      position: [300, 100],
      name: "Bot"
    }
  },
  groups: {}
})
.then(() => {
  editor.on("error", err => {
    alertify.error(err.message);
  });

  editor.on(
    "process connectioncreated connectionremoved nodecreated",
    async function() {
      if (engine.silent) return;
      onMessageTask = [];
      console.log("processasync");
      await engine.abort();
      await engine.process(editor.toJSON());
    }
  );

  editor.trigger("process");
  editor.view.resize();
  AreaPlugin.zoomAt(editor);
});

function downloadTXT(fileName) {
  // var a = document.createElement("a");
  // var file = new Blob([JSON.stringify(editor)], {type: 'text/plain'});
  // a.href = URL.createObjectURL(file);
  // a.download = fileName;
  // a.click();
  //editor.toJSON();
  // console.log(editor);
  console.log('save!!');
}



function showFile() {
  //var preview = document.getElementById('show-text');
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();

  var foo;
  if (file.type.match('.json')) {
    reader.onload = function (event) {
      console.log(event.target.result);
      foo = event.target.result;
    }
  } else {
    console.log("It doesn't seem to be a text file!");
  }
//  reader.readAsText(file);

  //editor.fromJSON(JSON.parse(foo));
}


let output, speechRec, button, svg, text;
let continuous, interimResults;

function setup() {
  noCanvas();

  output = select("#speech");
  svg = select('.svgstyle');
  // speechRecStatus=false;
}

function listen() {
  // speechRecStatus=true;

  speechRec = new p5.SpeechRec('fr', gotSpeech);

  // "Continuous recognition" (as opposed to one time only)
  continuous = true;
  // If you want to try partial recognition (faster, less accurate)
  interimResults = false;
  // This must come after setting the properties
  speechRec.start(continuous, interimResults);

  // Speech recognized event
  function gotSpeech() {
    // Something is there
    // Get it as a string, you can also get JSON with more info
    console.log(speechRec);
    if (speechRec.resultValue) {
      let said = speechRec.resultString;
      // Show user
      // output.html(said);
      //sendOwner(said);
      telegram.messages.push({ user: 1, text: said });

      receiveBot(said);
      theEnd();
    }
  }
  speechRec.onEnd = theEnd;
  speechRec.onStart = ok;
}

function ok() {
  // alert('Let\'s start');
  svg.style('fill', 'rgb(0,255,0)');
  // speechRecStatus=true;
}

function theEnd() {
  // alert('end');
  svg.style('fill', 'rgb(255,255,255)');

  // listen();
}
