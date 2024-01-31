/* This component adds an environment map to a imported model. 
    You can either link a existing image or use a path to an image. 
    Will use a default image if none is provided. */

    AFRAME.registerComponent("model-env", {
        schema: {
          env: {type: 'map'},
          envPath: {type: 'string', default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Goat_Peak%2C_Cascades.jpg/1920px-Goat_Peak%2C_Cascades.jpg'},
            intensity: {type: 'float', default: 3}
        },
        
        init: function() {
          
          if(this.data.env) this.data.envPath = this.data.env?.getAttribute("src");
          var targetCube = new THREE.WebGLRenderTargetCube(512, 512);
          var renderer = this.el.sceneEl.renderer;
          
          this.el.addEventListener("model-loaded", e => {
            let mesh = this.el.getObject3D("mesh");
              var texture = new THREE.TextureLoader().load(
                this.data.envPath,
                function() {
                  var cubeTex = targetCube.fromEquirectangularTexture(renderer, texture);
                  mesh.traverse(function(el) {
                    if (el.material) {
                      console.log(el.material);
                      el.material.envMap = cubeTex.texture;
                      el.material.envMapIntensity = this.data.intensity;
                      el.material.needsUpdate = true;
                    }
                  });
                }
              );
          });
        }
      });
