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
    await External.LoadScript('https://unpkg.com/three@0.118.3/examples/jsm/loaders/GLTFLoader.js',
        'sha384-mfxWJ8SX+XNW8zN9AcDYAHq/BbyWxVpuCgIN8aEr+U6p5tD25Cf5I7o+SdDSgf/p');
}`)
);

slot(
  "World.Interface.AssetLoaders",
  "GLTFLoader",
  msg(`function() {
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

prototype_slot("World.Three.GLTFAsset", "parent", ref("World.Core.Asset"));

prototype_slot("World.Three", "parent", ref("World.Core.Namespace"));
