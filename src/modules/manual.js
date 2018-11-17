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
  "manual",
  (function() {
    let object = ref("World.Modules.manual");
    _SetAnnotation(object, "name", `ManualModule`);
    _SetAnnotation(object, "creator", ref("World.Modules"));
    _SetAnnotation(object, "creatorSlot", `manual`);

    return object;
  })()
);
_SetSlotAnnotation(
  ref("World.Modules"),
  "manual",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(ref("World.Modules.manual"), "parent", ref("World.Core.Module"));
_AddPrototypeSlot(ref("World.Modules.manual"), "parent");
_SetSlotAnnotation(
  ref("World.Modules.manual"),
  "parent",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(
  ref("World"),
  "Manual",
  (function() {
    let object = ref("World.Manual");
    _SetAnnotation(object, "name", `Manual`);
    _SetAnnotation(object, "creator", ref("World"));
    _SetAnnotation(object, "creatorSlot", `Manual`);

    return object;
  })()
);
_SetSlotAnnotation(
  ref("World"),
  "Manual",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(ref("World.Manual"), "parent", ref("World.Core.Namespace"));
_AddPrototypeSlot(ref("World.Manual"), "parent");
_SetSlotAnnotation(
  ref("World.Manual"),
  "parent",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(
  ref("World.Manual"),
  "ManualCategory",
  (function() {
    let object = ref("World.Manual.ManualCategory");
    _SetAnnotation(object, "creator", ref("World.Manual"));
    _SetAnnotation(object, "creatorSlot", `ManualCategory`);
    _SetAnnotation(object, "name", `ManualCategory`);

    return object;
  })()
);
_SetSlotAnnotation(
  ref("World.Manual"),
  "ManualCategory",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(
  ref("World.Manual.ManualCategory"),
  "parent",
  ref("World.Core.TopObject")
);
_AddPrototypeSlot(ref("World.Manual.ManualCategory"), "parent");
_SetSlotAnnotation(
  ref("World.Manual.ManualCategory"),
  "parent",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(
  ref("World.Manual"),
  "ManualPage",
  (function() {
    let object = ref("World.Manual.ManualPage");
    _SetAnnotation(object, "creator", ref("World.Manual"));
    _SetAnnotation(object, "creatorSlot", `ManualPage`);

    return object;
  })()
);
_SetSlotAnnotation(
  ref("World.Manual"),
  "ManualPage",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(ref("World.Manual.ManualPage"), "parent", ref("World.Core.TopObject"));
_AddPrototypeSlot(ref("World.Manual.ManualPage"), "parent");
_SetSlotAnnotation(
  ref("World.Manual.ManualPage"),
  "parent",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(
  ref("World.Manual"),
  "ManualViewer",
  (function() {
    let object = ref("World.Manual.ManualViewer");
    _SetAnnotation(object, "creator", ref("World.Manual"));
    _SetAnnotation(object, "creatorSlot", `ManualViewer`);
    _SetAnnotation(object, "name", `ManualViewer`);

    return object;
  })()
);
_SetSlotAnnotation(
  ref("World.Manual"),
  "ManualViewer",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(
  ref("World.Manual.ManualViewer"),
  "parent",
  ref("World.Interface.Window")
);
_AddPrototypeSlot(ref("World.Manual.ManualViewer"), "parent");
_SetSlotAnnotation(
  ref("World.Manual.ManualViewer"),
  "parent",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(
  ref("World.Manual.ManualViewer"),
  "New",
  _MakeMessageHandler(`function(target) {
    let inst = this.Extend();
    inst.AddSlot('windowID', uuid.v1());
    return inst;
}`)
);
_SetSlotAnnotation(
  ref("World.Manual.ManualViewer"),
  "New",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(
  ref("World.Manual.ManualViewer"),
  "RenderContent",
  _MakeMessageHandler(`function() {
    return <div style={{display: 'flex', height: '100%'}}>
        <div style={{padding: '10px'}}>
            {World.Manual.root.introduction.RenderPage()}
        </div>
    </div>;
}`)
);
_SetSlotAnnotation(
  ref("World.Manual.ManualViewer"),
  "RenderContent",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(ref("World.Manual.ManualViewer"), "padding", `0px`);
_SetSlotAnnotation(
  ref("World.Manual.ManualViewer"),
  "padding",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(
  ref("World.Manual.ManualViewer"),
  "GetTitle",
  _MakeMessageHandler(`function() {
    return "Manual Viewer";
}`)
);
_SetSlotAnnotation(
  ref("World.Manual.ManualViewer"),
  "GetTitle",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(ref("World.Manual.ManualViewer"), "width", 800);
_SetSlotAnnotation(
  ref("World.Manual.ManualViewer"),
  "width",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(ref("World.Manual.ManualViewer"), "height", 600);
_SetSlotAnnotation(
  ref("World.Manual.ManualViewer"),
  "height",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(
  ref("World.Manual"),
  "root",
  (function() {
    let object = ref("World.Manual.root");
    _SetAnnotation(object, "creator", ref("World.Manual"));
    _SetAnnotation(object, "creatorSlot", `root`);

    return object;
  })()
);
_SetSlotAnnotation(
  ref("World.Manual"),
  "root",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(
  ref("World.Manual.root"),
  "parent",
  ref("World.Manual.ManualCategory")
);
_AddPrototypeSlot(ref("World.Manual.root"), "parent");
_SetSlotAnnotation(
  ref("World.Manual.root"),
  "parent",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(
  ref("World.Manual.root"),
  "introduction",
  (function() {
    let object = ref("World.Manual.root.introduction");
    _SetAnnotation(object, "creator", ref("World.Manual.root"));
    _SetAnnotation(object, "creatorSlot", `introduction`);

    return object;
  })()
);
_SetSlotAnnotation(
  ref("World.Manual.root"),
  "introduction",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(
  ref("World.Manual.root.introduction"),
  "parent",
  ref("World.Manual.ManualPage")
);
_AddPrototypeSlot(ref("World.Manual.root.introduction"), "parent");
_SetSlotAnnotation(
  ref("World.Manual.root.introduction"),
  "parent",
  "module",
  ref("World.Modules.manual")
);

_AddSlot(
  ref("World.Manual.root.introduction"),
  "RenderPage",
  _MakeMessageHandler(`function() {
    return <>
        <h1>Welcome to ProtoWorld</h1>
        <p>ProtoWorld is a live object environment,
        inspired by languages like Smalltalk and Self. Eveything is an object,
        and all objects can be inspected in real-time. You can even edit an object's
        code without having to reload.</p>

        <p><button onClick={() => World.OpenEditor()}>Click here</button> to inspect
        "World", which is the root object from which all other objects can be
        reached.</p>

        <p> At any time, you can click the <i
          className="fas fa-search"
        /> icon on a window to inspect that window as an object. Try it with this window!</p>

        <p>
        At any time, you can save an image, which serializes the current
        state of your workspace - This includes any open windows.
        You can reload an image at any time.</p>
    </>
}`)
);
_SetSlotAnnotation(
  ref("World.Manual.root.introduction"),
  "RenderPage",
  "module",
  ref("World.Modules.manual")
);
