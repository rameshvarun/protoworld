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
  "tools",
  (function() {
    let object = ref("World.Modules.tools");
    _SetAnnotation(object, "name", `ToolsModule`);
    _SetAnnotation(object, "creator", ref("World.Modules"));
    _SetAnnotation(object, "creatorSlot", `tools`);

    return object;
  })()
);
_SetSlotAnnotation(
  ref("World.Modules"),
  "tools",
  "module",
  ref("World.Modules.tools")
);

_AddSlot(ref("World.Modules.tools"), "parent", ref("World.Core.Module"));
_AddPrototypeSlot(ref("World.Modules.tools"), "parent");
_SetSlotAnnotation(
  ref("World.Modules.tools"),
  "parent",
  "module",
  ref("World.Modules.tools")
);

_AddSlot(
  ref("World"),
  "Tools",
  (function() {
    let object = ref("World.Tools");
    _SetAnnotation(object, "name", `Tools`);
    _SetAnnotation(object, "creator", ref("World"));
    _SetAnnotation(object, "creatorSlot", `Tools`);

    return object;
  })()
);
_SetSlotAnnotation(ref("World"), "Tools", "module", ref("World.Modules.tools"));

_AddSlot(ref("World.Tools"), "parent", ref("World.Core.Namespace"));
_AddPrototypeSlot(ref("World.Tools"), "parent");
_SetSlotAnnotation(
  ref("World.Tools"),
  "parent",
  "module",
  ref("World.Modules.tools")
);

_AddSlot(
  ref("World.Tools"),
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
_SetSlotAnnotation(
  ref("World.Tools"),
  "ModuleScanner",
  "module",
  ref("World.Modules.tools")
);

_AddSlot(
  ref("World.Tools.ModuleScanner"),
  "parent",
  ref("World.Interface.Window")
);
_AddPrototypeSlot(ref("World.Tools.ModuleScanner"), "parent");
_SetSlotAnnotation(
  ref("World.Tools.ModuleScanner"),
  "parent",
  "module",
  ref("World.Modules.tools")
);

_AddSlot(
  ref("World.Tools.ModuleScanner"),
  "New",
  _MakeMessageHandler(`function() {
    let inst = this.Extend();
    inst.AddSlot('windowID', uuid.v1());
    inst.foundSlots = inst.FindSlots();
    return inst;
}`)
);
_SetSlotAnnotation(
  ref("World.Tools.ModuleScanner"),
  "New",
  "module",
  ref("World.Modules.tools")
);

_AddSlot(
  ref("World.Tools.ModuleScanner"),
  "FindSlots",
  _MakeMessageHandler(`function() {
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
_SetSlotAnnotation(
  ref("World.Tools.ModuleScanner"),
  "FindSlots",
  "module",
  ref("World.Modules.tools")
);

_AddSlot(
  ref("World.Tools.ModuleScanner"),
  "GetTitle",
  _MakeMessageHandler(`function() {
    return "Module Scanner";
}`)
);
_SetSlotAnnotation(
  ref("World.Tools.ModuleScanner"),
  "GetTitle",
  "module",
  ref("World.Modules.tools")
);

_AddSlot(
  ref("World.Tools.ModuleScanner"),
  "RenderContent",
  _MakeMessageHandler(`function() {
    return <div>
        <div>The slots below are missing module annotations.</div>
        <button onClick={() => this.foundSlots = this.FindSlots()}>Rescan</button>
        <hr/>
        {this.foundSlots.map(({object, slot}) => <div>{object.RenderWidget()}->{slot}</div> )}
    </div>
}`)
);
_SetSlotAnnotation(
  ref("World.Tools.ModuleScanner"),
  "RenderContent",
  "module",
  ref("World.Modules.tools")
);
