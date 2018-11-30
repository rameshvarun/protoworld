/*
ToolsModule - ProtoWorld Module
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

let mod = ref("World.Modules.tools");

slot(
  "World.Modules",
  "tools",
  (function() {
    let object = ref("World.Modules.tools");
    _SetAnnotation(object, "name", `ToolsModule`);
    _SetAnnotation(object, "creator", ref("World.Modules"));
    _SetAnnotation(object, "creatorSlot", `tools`);

    return object;
  })()
);

prototype_slot("World.Modules.tools", "parent", ref("World.Core.Module"));

slot(
  "World",
  "Tools",
  (function() {
    let object = ref("World.Tools");
    _SetAnnotation(object, "name", `Tools`);
    _SetAnnotation(object, "creator", ref("World"));
    _SetAnnotation(object, "creatorSlot", `Tools`);

    return object;
  })()
);

slot(
  "World.Tools",
  "ModuleScanner",
  (function() {
    let object = ref("World.Tools.ModuleScanner");
    _SetAnnotation(object, "name", `ModuleScanner`);
    _SetAnnotation(
      object,
      "description",
      `A tool that can be used to find slots with no module assignment.`
    );
    _SetAnnotation(object, "creator", ref("World.Tools"));
    _SetAnnotation(object, "creatorSlot", `ModuleScanner`);

    return object;
  })()
);

slot(
  "World.Tools.ModuleScanner",
  "FindSlots",
  msg(`function() {
  let visited = new Set();
  let slots = [];

  var findSlots = (object) => {
    if(!_IsProtoObject(object)) return;
    if(visited.has(object)) return;

    visited.add(object);
    for(let slot of object.GetSlotNames()) {
      if (!_GetSlotAnnotation(object, slot, 'module')) {
        slots.push({object, slot});
      } else {
        findSlots(object[slot]);
      }
    }
  }

  findSlots(World);
  return slots;
}`)
);

slot(
  "World.Tools.ModuleScanner",
  "GetTitle",
  msg(`function() {
    return "Module Scanner";
}`)
);

slot(
  "World.Tools.ModuleScanner",
  "New",
  msg(`function() {
    let inst = World.Interface.Window.New.call(this);
    inst.foundSlots = inst.FindSlots();
    return inst;
}`)
);

slot(
  "World.Tools.ModuleScanner",
  "RenderContent",
  msg(`function() {
    return <div>
        <div>The slots below are missing module annotations.</div>
        <button onClick={() => this.foundSlots = this.FindSlots()}>Rescan</button>
        <hr/>
        {this.foundSlots.map(({object, slot}) => <div>{object.RenderWidget()}->{slot}</div> )}
    </div>
}`)
);

prototype_slot(
  "World.Tools.ModuleScanner",
  "parent",
  ref("World.Interface.Window")
);

prototype_slot("World.Tools", "parent", ref("World.Core.Namespace"));
