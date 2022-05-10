/* global AFRAME, Tone */

AFRAME.registerComponent('activate-audio', {
  dependencies: ['sound'],

  init: function () {
    
    this.el.setAttribute("sound", "src:https://raw.githubusercontent.com/sewlo/a-frame-assets/main/audio/silence.mp3");
    
    if(Tone !== undefined && Tone.context.state !== 'running')
        console.log("Click somewhere in the scene to start Tone.js audio output.");
    
    this.triggerSound = () => {
      this.el.components.sound.playSound();
      
      if(Tone !== undefined && Tone.context.state !== 'running') {
        Tone.context.resume();
        console.log("Tone.js was startet after first click interaction.");
      }
      
      this.el.removeAttribute("activate-audio");
    }
    
    this.el.addEventListener('click', this.triggerSound);
  },
  remove: function () {
    this.el.removeEventListener('click', this.triggerSound);
  }
}); 