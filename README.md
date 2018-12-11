# Vox-Machines
Some codes in javascript using <a href="http://p5js.org" target="_parent">p5js</a> and <a href="http://ability.nyu.edu/p5.js-speech/" target="_parent">p5.speech</a> for rapid protyping with speech recognition, speech synthesis and variable fonts.

## Operative principle
<img src="https://raw.githubusercontent.com/JulienDrochon/Vox-Machines/master/operative-principle.png"/>

## Speech recognition, browser compatibility
https://caniuse.com/#search=speech

### Use MAMP + Google Chrome
For working examples, use  <a href="https://www.mamp.info" target="_parent">MAMP</a> as local server for launching webpages in <a href="https://www.google.com/chrome/" target="_parent">Chrome web browser</a>.

In Chrome, type *chrome://flags* in address bar.

## Web speech API
### About
https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API


## p5.speech documentation
### About
http://ability.nyu.edu/p5.js-speech/

### p5.Speech
**p5.Speech**
*constructor*

- default_voice: optional argument to set the default synthesizer voice by number (see listVoices()) or by name. 
    methods
    
- cancel(): silently cancels the current utterance and clears any queued utterances.

- listVoices(): debugging statement. Lists available synthesis voices to the JavaScript console.

- pause(): pause the current utterance. The onPause() callback will fire.

- resume(): resumes the current utterance. The onResume() callback will fire.

- setLang(language): sets the language interpreter for the synthesizer voice. Argument is BCP-47; Default is 'en-US'.

- setPitch(pitch): sets playback pitch of synthesized speech from 0.01 (very low) to 2.0 (very high). Default is 1.0; not supported by all browser / OS combinations.

- setRate(rate): sets rate of speech production from 0.1 (very slow) to 2.0 (very fast). Default is 1.0; not supported by all browser / OS combinations.

- setVoice(voice): sets synthesizer voice by number (see listVoices()) or by name; equivalent to the default_voice parameter passed with the constructor.

- setVolume(volume): sets synthesizer volume in the range of 0.0 (silent) to 1.0 (default=max volume).

- speak(utterance): instructs the synthesizer to speak the string encoded in utterance. Depending on the interrupt property, additional calls to speak() will queue after or interrupt speech actively being synthesized. When synthesis begins, the onStart() callback will fire; when synthesis ends, the onEnd() callback will fire.

- stop(): stops the current utterance. The onEnd() callback will fire. 
    
*properties*
 
- interrupt: boolean to set whether the speak() method will interrupt (true) or queue after (false = default) existing speech currently being synthesized.

- onEnd: function sets callback to fire when an utterance is finished.

- onLoad: function sets callback to fire when synthesis voices are loaded.

- onPause: function sets callback to fire when an utterance is paused.

- onResume: function sets callback to fire when an utterance is resumed.

- onStart: function sets callback to fire when synthesis is begun. 

### p5.speechRec
**p5.SpeechRec**
    *constructor*
    
- default_language: optional argument to set the default BCP-47 language / region to for the speech recognition system. 
    methods
    
- start(): instructs the speech recognition system to begin listening. use continuous mode rather than multiple calls to start() for multiple recognition tokens within the same site. 

*properties*

- continuous: boolean to set whether the speech recognition engine will give results continuously (true) or just once (false = default).

- interimResults: boolean to set whether the speech recognition engine will give faster, partial results (true) or wait for the speaker to pause (false = default).
- onEnd: function sets callback to fire when speech recognition ends.
- onError: function sets callback to fire when an error occurs on the client side in recording and transmitting the speech.
- onResult: function sets callback to fire when synthesis engine has reported a result.
-  onStart: function sets callback to fire when speech recognition has begun.
- resultConfidence: float value (0.0-1.0) representing the confidence level of the speech synthesizer that resultString is what was actually spoken by the user.
- resultJSON: JSON object containing a full set of data returned by the speech recognition system.
- resultString: String containing the most recently detected speech.
- resultValue: boolean value containing a status flag reported by the server (true = speech successfully recognized). 


## Rivescript : build brain for chatbot
RiveScript is a simple scripting language for chatbots with a friendly, easy to learn syntax.
Create your own chatbot in Go, Java, JavaScript, Perl or Python.

RiveScript has a handful of simple rules that can be combined in powerful ways to build an impressive chatbot personality. Write triggers in a simplified regular expression format to match complex sets of word patterns in one go. 

https://www.rivescript.com/docs/tutorial

## Video Tutorials
### Web Speech
Speech Recognition with p5.Speech - Programming with Text
https://www.youtube.com/watch?v=q_bXBcmfTJM

### Rivescript
Chatbots with Rivescript
https://www.youtube.com/watch?v=wf8w1BJb9Xc

### Regex - Regular expression
https://www.youtube.com/watch?v=7DG3kCDx53c&list=PLRqwX-V7Uu6YEypLuls7iidwHMdCM6o2w

### Arduino + web speech recognition
https://vimeo.com/305182131


