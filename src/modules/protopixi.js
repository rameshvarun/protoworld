function ref(path) {
  var parts = path.split(".");
  var current = window;
  for (let part of parts) {
    current = current[part] = current[part] || _EmptyObject();
  }
  return current;
}

_AddSlot(
  ref("World.Modules"),
  "pixi",
  (function() {
    let object = ref("World.Modules.pixi");
    _SetAnnotation(object, "name", `ProtoPixiModule`);
    _SetAnnotation(object, "creator", ref("World.Modules"));
    _SetAnnotation(object, "creatorSlot", `pixi`);

    return object;
  })()
);
_SetSlotAnnotation(
  ref("World.Modules"),
  "pixi",
  "module",
  ref("World.Modules.pixi")
);

_AddSlot(ref("World.Modules.pixi"), "parent", ref("World.Core.Module"));
_AddPrototypeSlot(ref("World.Modules.pixi"), "parent");
_SetSlotAnnotation(
  ref("World.Modules.pixi"),
  "parent",
  "module",
  ref("World.Modules.pixi")
);

_AddSlot(
  ref("World"),
  "PIXI",
  (function() {
    let object = ref("World.PIXI");
    _SetAnnotation(object, "creator", ref("World"));
    _SetAnnotation(object, "creatorSlot", `PIXI`);

    return object;
  })()
);
_SetSlotAnnotation(ref("World"), "PIXI", "module", ref("World.Modules.pixi"));

_AddSlot(ref("World.PIXI"), "parent", ref("World.Core.Namespace"));
_AddPrototypeSlot(ref("World.PIXI"), "parent");
_SetSlotAnnotation(
  ref("World.PIXI"),
  "parent",
  "module",
  ref("World.Modules.pixi")
);

_AddSlot(
  ref("World.PIXI"),
  "GameObject",
  (function() {
    let object = ref("World.PIXI.GameObject");
    _SetAnnotation(object, "creator", ref("World.PIXI"));
    _SetAnnotation(object, "creatorSlot", `GameObject`);

    return object;
  })()
);
_SetSlotAnnotation(
  ref("World.PIXI"),
  "GameObject",
  "module",
  ref("World.Modules.pixi")
);

_AddSlot(ref("World.PIXI.GameObject"), "parent", ref("World.Core.TopObject"));
_AddPrototypeSlot(ref("World.PIXI.GameObject"), "parent");
_SetSlotAnnotation(
  ref("World.PIXI.GameObject"),
  "parent",
  "module",
  ref("World.Modules.pixi")
);

_AddSlot(
  ref("World.PIXI"),
  "GameComponent",
  (function() {
    let object = ref("World.PIXI.GameComponent");
    _SetAnnotation(object, "creator", ref("World.PIXI"));
    _SetAnnotation(object, "creatorSlot", `GameComponent`);

    return object;
  })()
);
_SetSlotAnnotation(
  ref("World.PIXI"),
  "GameComponent",
  "module",
  ref("World.Modules.pixi")
);

_AddSlot(
  ref("World.PIXI.GameComponent"),
  "parent",
  ref("World.Core.TopObject")
);
_AddPrototypeSlot(ref("World.PIXI.GameComponent"), "parent");
_SetSlotAnnotation(
  ref("World.PIXI.GameComponent"),
  "parent",
  "module",
  ref("World.Modules.pixi")
);

_AddSlot(
  ref("World.PIXI"),
  "Scene",
  (function() {
    let object = ref("World.PIXI.Scene");
    _SetAnnotation(object, "creator", ref("World.PIXI"));
    _SetAnnotation(object, "creatorSlot", `Scene`);

    return object;
  })()
);
_SetSlotAnnotation(
  ref("World.PIXI"),
  "Scene",
  "module",
  ref("World.Modules.pixi")
);

_AddSlot(ref("World.PIXI.Scene"), "parent", ref("World.Core.TopObject"));
_AddPrototypeSlot(ref("World.PIXI.Scene"), "parent");
_SetSlotAnnotation(
  ref("World.PIXI.Scene"),
  "parent",
  "module",
  ref("World.Modules.pixi")
);

_AddSlot(
  ref("World.PIXI"),
  "PIXIWindow",
  (function() {
    let object = ref("World.PIXI.PIXIWindow");
    _SetAnnotation(object, "creator", ref("World.PIXI"));
    _SetAnnotation(object, "creatorSlot", `PIXIWindow`);

    return object;
  })()
);
_SetSlotAnnotation(
  ref("World.PIXI"),
  "PIXIWindow",
  "module",
  ref("World.Modules.pixi")
);

_AddSlot(
  ref("World.PIXI.PIXIWindow"),
  "parent",
  ref("World.Interface.CanvasWindow")
);
_AddPrototypeSlot(ref("World.PIXI.PIXIWindow"), "parent");
_SetSlotAnnotation(
  ref("World.PIXI.PIXIWindow"),
  "parent",
  "module",
  ref("World.Modules.pixi")
);

_AddSlot(
  ref("World.PIXI.PIXIWindow"),
  "SetCanvas",
  _MakeMessageHandler(`function(canvas) {
    World.Interface.CanvasWindow.SetCanvas.call(this, canvas)
    this.renderer = new PIXI.WebGLRenderer({
        height: 30, width: 30, view: canvas
    });
    this.stage = new PIXI.Container();
}`)
);
_SetSlotAnnotation(
  ref("World.PIXI.PIXIWindow"),
  "SetCanvas",
  "module",
  ref("World.Modules.pixi")
);

_AddSlot(
  ref("World.PIXI.PIXIWindow"),
  "GetTitle",
  _MakeMessageHandler(`function() {
    return "PIXI Window"
}`)
);
_SetSlotAnnotation(
  ref("World.PIXI.PIXIWindow"),
  "GetTitle",
  "module",
  ref("World.Modules.pixi")
);

_AddSlot(
  ref("World.PIXI.PIXIWindow"),
  "RenderCanvas",
  _MakeMessageHandler(`function() {
}`)
);
_SetSlotAnnotation(
  ref("World.PIXI.PIXIWindow"),
  "RenderCanvas",
  "module",
  ref("World.Modules.pixi")
);
