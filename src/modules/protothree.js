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
  msg(`function() {
    let External = World.Core.ExternalHelpers;

    return External.LoadScript('https://unpkg.com/three@0.99.0/build/three.js',
      'sha384-AaWSJ9gZ/BJmNotf51XmRNG+0nXt5E/tK9tN0ZCf/EuL01dGaW72dYsrY/aPlcB8').then(() =>
      External.LoadScript('https://unpkg.com/three@0.99.0/examples/js/controls/OrbitControls.js',
        'sha384-vNZUVS0TRz2KyXoSVHFGoCOVFuzxbHJd2HWauLZ9SRslzHhvIj4If9srU3stzFER'));
}`)
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
