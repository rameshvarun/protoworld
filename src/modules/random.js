/*
RandomModule - ProtoWorld Module
undefined
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

let mod = ref("World.Modules.random");

slot(
  "World.Modules",
  "random",
  (function() {
    let object = ref("World.Modules.random");
    _SetAnnotation(object, "name", `RandomModule`);
    _SetAnnotation(object, "creator", ref("World.Modules"));
    _SetAnnotation(object, "creatorSlot", `random`);

    return object;
  })()
);

prototype_slot("World.Modules.random", "parent", ref("World.Core.Module"));

slot(
  "World",
  "Random",
  (function() {
    let object = ref("World.Random");
    _SetAnnotation(object, "name", `Random`);
    _SetAnnotation(
      object,
      "description",
      `Utilities for generating random values.`
    );
    _SetAnnotation(object, "creator", ref("World"));
    _SetAnnotation(object, "creatorSlot", `Random`);

    return object;
  })()
);

slot(
  "World.Random",
  "Chance",
  msg(`function(prob = 0.5) {
    return Math.random() < prob;
}`),
  {
    description: `Takes in a probability \`prob\` and returns true with probability \`prob\`.`
  }
);

slot(
  "World.Random",
  "CharacterFromString",
  msg(`function(chars) {
    return chars[Math.floor(Math.random() * chars.length)];
}`)
);

slot(
  "World.Random",
  "Choice",
  msg(`function(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}`),
  {
    description: `Takes in an array and returns a random element from that array.`
  }
);

slot(
  "World.Random",
  "Integer",
  msg(`function(min, max) {
    return Math.floor(this.Uniform(min, max));
}`)
);

slot(
  "World.Random",
  "Uniform",
  msg(`function(min = 0.0, max = 1.0) {
    return Math.random() * (max - min) + min;
}`)
);

prototype_slot("World.Random", "parent", ref("World.Core.TopObject"));
