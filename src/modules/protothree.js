/*
ThreeModule - ProtoWorld Module

*/

/* BEGIN MODULE PRELUDE */
let ref = function(path) {
  var parts = path.split(".");
  var current = window;
  for (let part of parts) {
    current = current[part] = current[part] || _EmptyObject();
  }
  return current;
};

let slot = function(path, name, value, annotations = {}) {
  _AddSlot(ref(path), name, value);
  for (let annotation in annotations) {
    _SetSlotAnnotation(ref(path), name, annotation, annotations[annotation]);
  }
  _SetSlotAnnotation(ref(path), name, "module", mod);
};

let prototype_slot = function(path, name, value, annotations = {}) {
  slot(path, name, value, annotations);
  _AddPrototypeSlot(ref(path), name);
};

let msg = function(code) {
  return _MakeMessageHandler(code);
};
/* END MODULE PRELUDE */

let mod = ref("World.Modules.three");

slot(
  "World.ExternalLoaders",
  "ThreeLoader",
  msg(`async function() {
    let External = World.Core.ExternalHelpers;

    await External.LoadScript('https://unpkg.com/three@0.118.3/build/three.js',
      'sha384-qQhLZ5gRm6yz7WN7KtS80moGWX2kS305Xs6TtHB7j1eybDuFqFNm8w8yN6bVg/Ly');
    await External.LoadScript('https://unpkg.com/three@0.118.3/examples/js/controls/OrbitControls.js',
        'sha384-aHZK0JB6f+K4eOrQ+BIWQa88w82nDxM6oc3CIvIXEv3SXGiqCMkvvDDywH2uUE7E');
    await External.LoadScript('https://unpkg.com/three@0.118.3/examples/js/loaders/GLTFLoader.js',
        'sha384-1T3gvqA6EWz+X9LnoJ/yUf+9YAQUhn/4QTRd0Gsbl1rtn96UlGjB/WsI6sXpT//s');
}`)
);

slot(
  "World.Interface.AssetLoaders",
  "GLTFLoader",
  msg(`function(data, contentType, filename) {
    if (filename.endsWith('.glb') || filename.endsWith('.gltf')) {
      return World.Three.GLTFAsset.New(data, contentType);
    }
}`),
  { priority: 1 }
);

slot(
  "World.Math.Vec3",
  "FromThree",
  msg(`function(threeVec) {
    return this.New(threeVec.x, threeVec.y, threeVec.z);
}`)
);

slot(
  "World.Math.Vec3",
  "ToThree",
  msg(`function() {
    return new THREE.Vector3(this.x, this.y, this.z);
}`)
);

slot(
  "World.Modules",
  "three",
  (function() {
    let object = ref("World.Modules.three");
    _SetAnnotation(object, "creator", ref("World.Modules"));
    _SetAnnotation(object, "creatorSlot", `three`);
    _SetAnnotation(object, "name", `ThreeModule`);
    _SetAnnotation(object, "description", ``);

    return object;
  })()
);

prototype_slot("World.Modules.three", "parent", ref("World.Core.Module"));

slot(
  "World",
  "Three",
  (function() {
    let object = ref("World.Three");
    _SetAnnotation(object, "name", `Three`);
    _SetAnnotation(object, "description", ``);
    _SetAnnotation(object, "creator", ref("World"));
    _SetAnnotation(object, "creatorSlot", `Three`);

    return object;
  })()
);

slot(
  "World.Three",
  "GLTFAsset",
  (function() {
    let object = ref("World.Three.GLTFAsset");
    _SetAnnotation(object, "name", `GLTFAsset`);
    _SetAnnotation(object, "description", ``);
    _SetAnnotation(object, "creator", ref("World.Three"));
    _SetAnnotation(object, "creatorSlot", `GLTFAsset`);

    return object;
  })()
);

slot(
  "World.Three.GLTFAsset",
  "CreateEditor",
  msg(`function() {
    if (this.data) {
       return World.Three.GLTFViewer.New(this);
    } else {
       return World.Core.TopObject.CreateEditor.call(this);
    }
}`)
);

prototype_slot("World.Three.GLTFAsset", "parent", ref("World.Core.Asset"));

slot(
  "World.Three",
  "GLTFViewer",
  (function() {
    let object = ref("World.Three.GLTFViewer");
    _SetAnnotation(object, "name", `GLTFViewer`);
    _SetAnnotation(object, "description", ``);
    _SetAnnotation(object, "creator", ref("World.Three"));
    _SetAnnotation(object, "creatorSlot", `GLTFViewer`);

    return object;
  })()
);

slot(
  "World.Three.GLTFViewer",
  "RenderContent",
  msg(`function() {
    if (this.canvas && this.canvas instanceof HTMLElement) {
        this.light.position.copy(this.camera.position);
        this.light.target.position.copy(this.controls.target);
        this.renderer.render(this.scene, this.camera);
    }

  return (
    <div>
      {this.RenderDescriptionWidget()}
      <hr />

      <canvas ref={(canvas) => {
            if (canvas && canvas != this.canvas) {
                this.canvas = canvas;
                this.scene = new THREE.Scene();

                this.renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
                this.renderer.setSize(canvas.width, canvas.height, false);
                this.SetSlotAnnotation('renderer', 'transient', true);

                this.camera = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 1, 1000);
                this.SetSlotAnnotation('camera', 'transient', true);

                this.light = new THREE.DirectionalLight( 0xffffff, 0.5 );
                this.scene.add(this.light);

                this.camera.position.z = 5;

                this.controls = new THREE.OrbitControls(this.camera, this.canvas);
				this.controls.minDistance = 2;
				this.controls.maxDistance = 10;
				this.controls.target.set(0, 0, 0);
				this.controls.update();

                var loader = new THREE.GLTFLoader();
                loader.load(
                	this.target.GetObjectURL(),
                	 (gltf) => {
                	 console.log(gltf);
                		this.scene.add(gltf.scene);
                	},
                	(xhr) => {},
                	(error) => {
                		console.error(error);
                	}
                );
            }
        }}></canvas>

      <div>Asset Size: {this.target.data.byteLength} bytes.</div>
      <button onClick={() => this.target.Download()}>Download</button>
    </div>
  );
}`)
);

prototype_slot(
  "World.Three.GLTFViewer",
  "parent",
  ref("World.Interface.AssetViewer")
);

prototype_slot("World.Three", "parent", ref("World.Core.Namespace"));
