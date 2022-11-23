/* global AFRAME, THREE */

AFRAME.registerComponent("model-material", {
  schema: {
    color: { type: "color" },
    emissive: { type: "color", default: "#000" },
    metalness: { type: "float", default: 0.1 },
    roughness: { type: "float", default: 0.6 },
    lightEnabled: { type: "bool", default: false },
    cameraEnabled: { type: "bool", default: false },
    envEnabled: { type: "bool", default: false },
    env: { type: "map" },
    envIntensity: { type: "float", default: 2 },
    envPath: {
      type: "string",
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Goat_Peak%2C_Cascades.jpg/1920px-Goat_Peak%2C_Cascades.jpg",
    },
  },

  init: function () {
    this.el.addEventListener("model-loaded", (e) => {
      this.data.modelModelLoaded = true;
      this.updateStyle();
    });
  },

  update: function () {
    if (this.data.env && this.data.envEnabled)
      this.data.envPath = this.data.env?.getAttribute("src");

    if (this.data.modelModelLoaded) this.updateStyle();
  },

  updateStyle: function () {
    const data = this.data;
    let mesh = this.el.getObject3D("mesh");

    mesh.traverse(function (el) {
      //make sure there are no lights or cameras included by default.
      if (el.type.toLowerCase().includes("light"))
        el.visible = data.lightEnabled;
      if (el.type.toLowerCase().includes("camera"))
        el.visible = data.cameraEnabled;

      if (el.material) {
        el.material.color = new THREE.Color(data.color);
        el.material.emissive = new THREE.Color(data.emissive);
        el.material.metalness = data.metalness;
        el.material.roughness = data.roughness;
        el.material.needsUpdate = true;
      }
    });

    if (data.envEnabled) {
      var renderer = this.el.sceneEl.renderer;
      var texture = new THREE.TextureLoader().load(
        this.data.envPath,
        function () {
          var targetCube = new THREE.WebGLRenderTargetCube(512, 512);
          var cubeTex = targetCube.fromEquirectangularTexture(
            renderer,
            texture
          );
          mesh.traverse(function (el) {
            if (el.material) {
              console.log(el.material, data);
              el.material.envMap = cubeTex.texture;
              el.material.envMapIntensity = data.envIntensity;
              el.material.needsUpdate = true;
            }
          });
        }
      );
    }
  }
});
