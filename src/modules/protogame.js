/*
ProtoGameModule - ProtoWorld Module

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

let mod = ref("World.Modules.protogame");

slot(
  "World.Modules",
  "protogame",
  (function() {
    let object = ref("World.Modules.protogame");
    _SetAnnotation(object, "name", `ProtoGameModule`);
    _SetAnnotation(object, "description", ``);
    _SetAnnotation(object, "creator", ref("World.Modules"));
    _SetAnnotation(object, "creatorSlot", `protogame`);

    return object;
  })()
);

prototype_slot("World.Modules.protogame", "parent", ref("World.Core.Module"));

slot(
  "World",
  "ProtoGame",
  (function() {
    let object = ref("World.ProtoGame");
    _SetAnnotation(object, "name", `ProtoGame`);
    _SetAnnotation(
      object,
      "description",
      `The built-in game engine of ProtoWorld.`
    );
    _SetAnnotation(object, "creator", ref("World"));
    _SetAnnotation(object, "creatorSlot", `ProtoGame`);

    return object;
  })()
);

slot(
  "World.ProtoGame",
  "ChildrenList",
  (function() {
    let object = ref("World.ProtoGame.ChildrenList");
    _SetAnnotation(object, "name", `ChildrenList`);
    _SetAnnotation(
      object,
      "description",
      `Represents a list of children of a node. Rather than simply being a list, the children of a node are identified by slots on an instance of this object. This powers the prefab-like system and also allows for merging when necessary.`
    );
    _SetAnnotation(object, "creator", ref("World.ProtoGame"));
    _SetAnnotation(object, "creatorSlot", `ChildrenList`);

    return object;
  })()
);

prototype_slot(
  "World.ProtoGame.ChildrenList",
  "parent",
  ref("World.Core.TopObject")
);

slot(
  "World.ProtoGame",
  "Component",
  (function() {
    let object = ref("World.ProtoGame.Component");
    _SetAnnotation(object, "name", `Component`);
    _SetAnnotation(
      object,
      "description",
      `This is the base class for components. A component represents a encapsulation of a particular behavior that can be reused and applied to many different objects.`
    );
    _SetAnnotation(object, "creator", ref("World.ProtoGame"));
    _SetAnnotation(object, "creatorSlot", `Component`);

    return object;
  })()
);

prototype_slot(
  "World.ProtoGame.Component",
  "parent",
  ref("World.Core.TopObject")
);

slot(
  "World.ProtoGame",
  "ComponentList",
  (function() {
    let object = ref("World.ProtoGame.ComponentList");
    _SetAnnotation(object, "name", `ComponentList`);
    _SetAnnotation(object, "description", ``);
    _SetAnnotation(object, "creator", ref("World.ProtoGame"));
    _SetAnnotation(object, "creatorSlot", `ComponentList`);

    return object;
  })()
);

prototype_slot(
  "World.ProtoGame.ComponentList",
  "parent",
  ref("World.Core.TopObject")
);

slot(
  "World.ProtoGame",
  "Components",
  (function() {
    let object = ref("World.ProtoGame.Components");
    _SetAnnotation(object, "name", `Components`);
    _SetAnnotation(
      object,
      "description",
      `A namespace consisting of all of the components built in to ProtoGame.`
    );
    _SetAnnotation(object, "creator", ref("World.ProtoGame"));
    _SetAnnotation(object, "creatorSlot", `Components`);

    return object;
  })()
);

prototype_slot(
  "World.ProtoGame.Components",
  "parent",
  ref("World.Core.Namespace")
);

slot(
  "World.ProtoGame",
  "GameWindow",
  (function() {
    let object = ref("World.ProtoGame.GameWindow");
    _SetAnnotation(object, "name", `GameWindow`);
    _SetAnnotation(
      object,
      "description",
      `A window where you can actually play a scene.`
    );
    _SetAnnotation(object, "creator", ref("World.ProtoGame"));
    _SetAnnotation(object, "creatorSlot", `GameWindow`);

    return object;
  })()
);

slot(
  "World.ProtoGame.GameWindow",
  "New",
  msg(`function(scene) {
    let inst = World.Interface.CanvasWindow.New.call(this);
    inst.scene = scene;
    return inst;
}`)
);

slot(
  "World.ProtoGame.GameWindow",
  "OnResize",
  msg(`function() {
    this.renderer.setSize(this.canvas.width, this.canvas.height, false);
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix();
}`)
);

slot(
  "World.ProtoGame.GameWindow",
  "RenderCanvas",
  msg(`function() {
    this.renderer.render(this.scene.GetThreeNode(), this.camera);
}`)
);

slot(
  "World.ProtoGame.GameWindow",
  "SetCanvas",
  msg(`function(canvas) {
    World.Interface.CanvasWindow.SetCanvas.call(this, canvas)

    this.renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
    this.renderer.setSize(canvas.width, canvas.height, false);
    this.SetSlotAnnotation('renderer', 'transient', true);

    // this.scene = new THREE.Scene();
    // this.SetSlotAnnotation('scene', 'transient', true);

    this.camera = new THREE.PerspectiveCamera(60,
        canvas.width / canvas.height, 1, 1000 );
    this.SetSlotAnnotation('camera', 'transient', true);

//     var geometry = new THREE.BoxGeometry();
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// this.scene.add( cube );

this.camera.position.z = 5;
}`)
);

prototype_slot(
  "World.ProtoGame.GameWindow",
  "parent",
  ref("World.Interface.CanvasWindow")
);

slot(
  "World.ProtoGame",
  "Node",
  (function() {
    let object = ref("World.ProtoGame.Node");
    _SetAnnotation(object, "creator", ref("World.ProtoGame"));
    _SetAnnotation(object, "creatorSlot", `Node`);
    _SetAnnotation(object, "name", `Node`);
    _SetAnnotation(
      object,
      "description",
      `This is the base object type that comprises scenes in ProtoGame.`
    );

    return object;
  })()
);

slot(
  "World.ProtoGame.Node",
  "AddChild",
  msg(`function(node) {
    let id = uuid.v1();
    this.children[id] = node;
}`)
);

slot(
  "World.ProtoGame.Node",
  "AddComponent",
  msg(`function(component) {
    let id = uuid.v1();
    this.components[id] = component;
}`)
);

slot(
  "World.ProtoGame.Node",
  "GetThreeNode",
  msg(`function() {
    if (!this.three) {
        this.three = (this === World.ProtoGame.Scene) ? new THREE.Object3D() : new THREE.Scene();
        this.SetSlotAnnotation('three', 'transient', true);
    }

    // Update the transform of this current node.
    this.three.position.copy(this.position.ToThree());
    this.three.scale.copy(this.scale.ToThree());

    // Update the list of children.
    let children = this.children.GetSlotNames().filter(slot => slot !== "parent").map(slot => this.children[slot].GetThreeNode());
    this.three.children = children;

    return this.three;
}`)
);

slot(
  "World.ProtoGame.Node",
  "Instantiate",
  msg(`function() {
    let inst = this.Extend();
    inst.children = World.ProtoGame.ChildrenList.Extend();
    for (let childID of this.children.GetSlotNames().filter(slot => slot !== "parent")) {
        inst.children[childID] = this.children[childID].Instantiate();
    }

    inst.components = this.components.Extend();
    return inst;
}`)
);

slot(
  "World.ProtoGame.Node",
  "children",
  (function() {
    let object = ref("World.ProtoGame.Node.children");
    _SetAnnotation(object, "creator", ref("World.ProtoGame.Node"));
    _SetAnnotation(object, "creatorSlot", `children`);
    _SetAnnotation(object, "name", `NodeChildrenList`);
    _SetAnnotation(object, "description", ``);

    return object;
  })()
);

prototype_slot(
  "World.ProtoGame.Node.children",
  "parent",
  ref("World.ProtoGame.ChildrenList")
);

slot(
  "World.ProtoGame.Node",
  "components",
  (function() {
    let object = ref("World.ProtoGame.Node.components");
    _SetAnnotation(object, "creator", ref("World.ProtoGame.Node"));
    _SetAnnotation(object, "creatorSlot", `components`);
    _SetAnnotation(object, "name", `NodeChildrenComponents`);
    _SetAnnotation(object, "description", ``);

    return object;
  })()
);

prototype_slot(
  "World.ProtoGame.Node.components",
  "parent",
  ref("World.ProtoGame.ComponentList")
);

slot(
  "World.ProtoGame.Node",
  "orientation",
  (function() {
    let object = ref("World.ProtoGame.Node.orientation");
    _SetAnnotation(object, "creator", ref("World.ProtoGame.Node"));
    _SetAnnotation(object, "creatorSlot", `orientation`);

    return object;
  })()
);

prototype_slot(
  "World.ProtoGame.Node.orientation",
  "parent",
  ref("World.Math.Quat")
);

slot("World.ProtoGame.Node.orientation", "w", 0);

slot("World.ProtoGame.Node.orientation", "x", 0);

slot("World.ProtoGame.Node.orientation", "y", 0);

slot("World.ProtoGame.Node.orientation", "z", 0);

prototype_slot("World.ProtoGame.Node", "parent", ref("World.Core.TopObject"));

slot(
  "World.ProtoGame.Node",
  "position",
  (function() {
    let object = ref("World.ProtoGame.Node.position");
    _SetAnnotation(object, "creator", ref("World.ProtoGame.Node"));
    _SetAnnotation(object, "creatorSlot", `position`);

    return object;
  })()
);

prototype_slot(
  "World.ProtoGame.Node.position",
  "parent",
  ref("World.Math.Vec3")
);

slot("World.ProtoGame.Node.position", "x", 0);

slot("World.ProtoGame.Node.position", "y", 0);

slot("World.ProtoGame.Node.position", "z", 0);

slot(
  "World.ProtoGame.Node",
  "scale",
  (function() {
    let object = ref("World.ProtoGame.Node.scale");
    _SetAnnotation(object, "creator", ref("World.ProtoGame.Node"));
    _SetAnnotation(object, "creatorSlot", `scale`);

    return object;
  })()
);

prototype_slot("World.ProtoGame.Node.scale", "parent", ref("World.Math.Vec3"));

slot("World.ProtoGame.Node.scale", "x", 1);

slot("World.ProtoGame.Node.scale", "y", 1);

slot("World.ProtoGame.Node.scale", "z", 1);

slot(
  "World.ProtoGame",
  "Scene",
  (function() {
    let object = ref("World.ProtoGame.Scene");
    _SetAnnotation(object, "name", `Scene`);
    _SetAnnotation(
      object,
      "description",
      `The base node that represents an empty scene.`
    );
    _SetAnnotation(object, "creator", ref("World.ProtoGame"));
    _SetAnnotation(object, "creatorSlot", `Scene`);

    return object;
  })()
);

slot(
  "World.ProtoGame.Scene",
  "Play",
  msg(`function() {
    let inst = this.Instantiate();
    World.ProtoGame.GameWindow.New(inst).Open();
}`)
);

slot(
  "World.ProtoGame.Scene",
  "children",
  (function() {
    let object = ref("World.ProtoGame.Scene.children");
    _SetAnnotation(object, "creator", ref("World.ProtoGame.Scene"));
    _SetAnnotation(object, "creatorSlot", `children`);

    return object;
  })()
);

prototype_slot(
  "World.ProtoGame.Scene.children",
  "parent",
  ref("World.ProtoGame.Node.children")
);

slot(
  "World.ProtoGame.Scene",
  "components",
  (function() {
    let object = ref("World.ProtoGame.Scene.components");
    _SetAnnotation(object, "creator", ref("World.ProtoGame.Scene"));
    _SetAnnotation(object, "creatorSlot", `components`);

    return object;
  })()
);

prototype_slot(
  "World.ProtoGame.Scene.components",
  "parent",
  ref("World.ProtoGame.Node.components")
);

prototype_slot("World.ProtoGame.Scene", "parent", ref("World.ProtoGame.Node"));

prototype_slot("World.ProtoGame", "parent", ref("World.Core.Namespace"));
