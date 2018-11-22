/*
ProtoPixiModule - ProtoWorld Module
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

let slot = function(path, name, value, annotations) {
  _AddSlot(ref(path), name, value);
  for (let annotation in annotations) {
    _SetSlotAnnotation(ref(path), name, annotation, annotations[annotation]);
  }
};

let msg = function(code) {
  return _MakeMessageHandler(code);
};
/* END MODULE PRELUDE */

slot(
  "World.Modules",
  "pixi",
  (function() {
    let object = ref("World.Modules.pixi");
    _SetAnnotation(object, "name", `ProtoPixiModule`);
    _SetAnnotation(object, "creator", ref("World.Modules"));
    _SetAnnotation(object, "creatorSlot", `pixi`);

    return object;
  })(),
  { module: ref("World.Modules.pixi") }
);

slot("World.Modules.pixi", "parent", ref("World.Core.Module"), {
  module: ref("World.Modules.pixi")
});
_AddPrototypeSlot(ref("World.Modules.pixi"), "parent");

slot(
  "World",
  "PIXI",
  (function() {
    let object = ref("World.PIXI");
    _SetAnnotation(object, "creator", ref("World"));
    _SetAnnotation(object, "creatorSlot", `PIXI`);

    return object;
  })(),
  { module: ref("World.Modules.pixi") }
);

slot("World.PIXI", "parent", ref("World.Core.Namespace"), {
  module: ref("World.Modules.pixi")
});
_AddPrototypeSlot(ref("World.PIXI"), "parent");

slot(
  "World.PIXI",
  "GameObject",
  (function() {
    let object = ref("World.PIXI.GameObject");
    _SetAnnotation(object, "creator", ref("World.PIXI"));
    _SetAnnotation(object, "creatorSlot", `GameObject`);

    return object;
  })(),
  { module: ref("World.Modules.pixi") }
);

slot("World.PIXI.GameObject", "parent", ref("World.Core.TopObject"), {
  module: ref("World.Modules.pixi")
});
_AddPrototypeSlot(ref("World.PIXI.GameObject"), "parent");

slot(
  "World.PIXI",
  "GameComponent",
  (function() {
    let object = ref("World.PIXI.GameComponent");
    _SetAnnotation(object, "creator", ref("World.PIXI"));
    _SetAnnotation(object, "creatorSlot", `GameComponent`);

    return object;
  })(),
  { module: ref("World.Modules.pixi") }
);

slot("World.PIXI.GameComponent", "parent", ref("World.Core.TopObject"), {
  module: ref("World.Modules.pixi")
});
_AddPrototypeSlot(ref("World.PIXI.GameComponent"), "parent");

slot(
  "World.PIXI",
  "Scene",
  (function() {
    let object = ref("World.PIXI.Scene");
    _SetAnnotation(object, "creator", ref("World.PIXI"));
    _SetAnnotation(object, "creatorSlot", `Scene`);

    return object;
  })(),
  { module: ref("World.Modules.pixi") }
);

slot("World.PIXI.Scene", "parent", ref("World.Core.TopObject"), {
  module: ref("World.Modules.pixi")
});
_AddPrototypeSlot(ref("World.PIXI.Scene"), "parent");

slot(
  "World.PIXI",
  "PIXIWindow",
  (function() {
    let object = ref("World.PIXI.PIXIWindow");
    _SetAnnotation(object, "creator", ref("World.PIXI"));
    _SetAnnotation(object, "creatorSlot", `PIXIWindow`);

    return object;
  })(),
  { module: ref("World.Modules.pixi") }
);

slot("World.PIXI.PIXIWindow", "parent", ref("World.Interface.CanvasWindow"), {
  module: ref("World.Modules.pixi")
});
_AddPrototypeSlot(ref("World.PIXI.PIXIWindow"), "parent");

slot(
  "World.PIXI.PIXIWindow",
  "SetCanvas",
  msg(`function(canvas) {
    World.Interface.CanvasWindow.SetCanvas.call(this, canvas)
    this.renderer = new PIXI.WebGLRenderer({
        height: 30, width: 30, view: canvas
    });
    this.stage = new PIXI.Container();
}`),
  { module: ref("World.Modules.pixi") }
);

slot(
  "World.PIXI.PIXIWindow",
  "GetTitle",
  msg(`function() {
    return "PIXI Window"
}`),
  { module: ref("World.Modules.pixi") }
);

slot(
  "World.PIXI.PIXIWindow",
  "RenderCanvas",
  msg(`function() {
}`),
  { module: ref("World.Modules.pixi") }
);

slot(
  "World.PIXI.PIXIWindow",
  "New",
  msg(`function() {
    let inst = World.Interface.CanvasWindow.New.call(this);
    inst.SetSlotAnnotation('renderer', 'transient', true);
    inst.SetSlotAnnotation('stage', 'transient', true);
    return inst;
}`),
  { module: ref("World.Modules.pixi") }
);
