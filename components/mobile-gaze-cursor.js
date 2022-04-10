AFRAME.registerComponent('mobile-gaze-cursor', {
init: function () {
    var scene = document.querySelector('a-scene');
    this.el.setAttribute("cursor", "fuse: false");
    
    this.enableAudio = document.createElement('a-entity');
    this.enableAudio.setAttribute("position", "0 -.04 0");
    this.enableAudio.setAttribute("text", { 
    anchor:  "align",
    width:  .5,
    value:  "Enable Sound",
    align:  "center",
    baseline:  "top"});
    
    this.el.appendChild(this.enableAudio);
    
    this.clickHandler = () => {
    this.el.setAttribute("cursor", "fuse: true");
    this.enableAudio.remove();
    console.log("click")
    scene.removeEventListener("click", this.clickHandler);
    }
    scene.addEventListener("click", this.clickHandler);
}
});