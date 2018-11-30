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

let mod = ref("World.Modules.pixi");

slot(
  "World.Modules",
  "pixi",
  (function() {
    let object = ref("World.Modules.pixi");
    _SetAnnotation(object, "name", `ProtoPixiModule`);
    _SetAnnotation(object, "creator", ref("World.Modules"));
    _SetAnnotation(object, "creatorSlot", `pixi`);

    return object;
  })()
);

prototype_slot("World.Modules.pixi", "parent", ref("World.Core.Module"));

slot(
  "World",
  "PIXI",
  (function() {
    let object = ref("World.PIXI");
    _SetAnnotation(object, "creator", ref("World"));
    _SetAnnotation(object, "creatorSlot", `PIXI`);

    return object;
  })()
);

slot(
  "World.PIXI",
  "Actor",
  (function() {
    let object = ref("World.PIXI.Actor");
    _SetAnnotation(object, "creator", ref("World.PIXI"));
    _SetAnnotation(object, "creatorSlot", `Actor`);
    _SetAnnotation(object, "name", `Actor`);

    return object;
  })()
);

slot(
  "World.PIXI.Actor",
  "Init",
  msg(`function(stage) {
    this.container = new PIXI.Container();
    for(let component of this.components.GetComponents()) {
        component.Init(container);
    }
}`)
);

prototype_slot("World.PIXI.Actor", "parent", ref("World.Core.TopObject"));

slot(
  "World.PIXI",
  "ActorList",
  (function() {
    let object = ref("World.PIXI.ActorList");
    _SetAnnotation(object, "name", `ActorList`);
    _SetAnnotation(object, "creator", ref("World.PIXI"));
    _SetAnnotation(object, "creatorSlot", `ActorList`);

    return object;
  })()
);

prototype_slot("World.PIXI.ActorList", "parent", ref("World.Core.TopObject"));

slot(
  "World.PIXI",
  "Component",
  (function() {
    let object = ref("World.PIXI.Component");
    _SetAnnotation(object, "creator", ref("World.PIXI"));
    _SetAnnotation(object, "creatorSlot", `Component`);
    _SetAnnotation(object, "name", `Component`);

    return object;
  })()
);

prototype_slot("World.PIXI.Component", "parent", ref("World.Core.TopObject"));

slot(
  "World.PIXI",
  "ComponentList",
  (function() {
    let object = ref("World.PIXI.ComponentList");
    _SetAnnotation(object, "name", `ComponentList`);
    _SetAnnotation(object, "creator", ref("World.PIXI"));
    _SetAnnotation(object, "creatorSlot", `ComponentList`);

    return object;
  })()
);

prototype_slot(
  "World.PIXI.ComponentList",
  "parent",
  ref("World.Core.TopObject")
);

slot(
  "World.PIXI",
  "Components",
  (function() {
    let object = ref("World.PIXI.Components");
    _SetAnnotation(object, "name", `Components`);
    _SetAnnotation(object, "creator", ref("World.PIXI"));
    _SetAnnotation(object, "creatorSlot", `Components`);

    return object;
  })()
);

prototype_slot("World.PIXI.Components", "parent", ref("World.Core.Namespace"));

slot(
  "World.PIXI",
  "PIXIWindow",
  (function() {
    let object = ref("World.PIXI.PIXIWindow");
    _SetAnnotation(object, "creator", ref("World.PIXI"));
    _SetAnnotation(object, "creatorSlot", `PIXIWindow`);
    _SetAnnotation(object, "name", `PIXIWindow`);

    return object;
  })()
);

slot(
  "World.PIXI.PIXIWindow",
  "GetTitle",
  msg(`function() {
    return "PIXI Window"
}`)
);

slot(
  "World.PIXI.PIXIWindow",
  "New",
  msg(`function() {
    let inst = World.Interface.CanvasWindow.New.call(this);
    inst.SetSlotAnnotation('renderer', 'transient', true);
    inst.SetSlotAnnotation('stage', 'transient', true);
    return inst;
}`)
);

slot(
  "World.PIXI.PIXIWindow",
  "RenderCanvas",
  msg(`function() {
    this.renderer.render(this.stage);
}`)
);

slot(
  "World.PIXI.PIXIWindow",
  "SetCanvas",
  msg(`function(canvas) {
    World.Interface.CanvasWindow.SetCanvas.call(this, canvas)
    console.log("Recreating renderer and stage...")
    this.renderer = new PIXI.WebGLRenderer({
        view: canvas,
        width: 800,
        height: 600,
        backgroundColor: '0x1099bb'
    });
    this.stage = new PIXI.Container();
}`)
);

prototype_slot(
  "World.PIXI.PIXIWindow",
  "parent",
  ref("World.Interface.CanvasWindow")
);

slot(
  "World.PIXI",
  "Scene",
  (function() {
    let object = ref("World.PIXI.Scene");
    _SetAnnotation(object, "creator", ref("World.PIXI"));
    _SetAnnotation(object, "creatorSlot", `Scene`);
    _SetAnnotation(object, "name", `Scene`);
    _SetAnnotation(
      object,
      "description",
      `A Scene represents a world of game objects.`
    );

    return object;
  })()
);

slot(
  "World.PIXI.Scene",
  "Init",
  msg(`function(stage) {
    for(let actor of this.actors.GetActors()) {
        actor.Init(stage);
    }
}`)
);

slot(
  "World.PIXI.Scene",
  "New",
  msg(`function() {
    let inst = this.Extend();
    inst.actors = World.PIXI.ActorList.Extend();
    return inst;
}`)
);

prototype_slot("World.PIXI.Scene", "parent", ref("World.Core.TopObject"));

prototype_slot("World.PIXI", "parent", ref("World.Core.Namespace"));
