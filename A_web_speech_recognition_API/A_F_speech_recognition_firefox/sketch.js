//ar grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
let recognition = new window.SpeechRecognition();

recognition.lang = 'fr-FR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
//recognition.continuous = true;

document.body.onclick = function() {
  recognition.start;
}

recognition.onresult = function(event) {
  var result = event.results[0][0].transcript;
  console.log(result);
}
