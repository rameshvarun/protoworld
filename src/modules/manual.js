/*
ManualModule - ProtoWorld Module
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

let mod = ref("World.Modules.manual");

slot(
  "World",
  "Manual",
  (function() {
    let object = ref("World.Manual");
    _SetAnnotation(object, "name", `Manual`);
    _SetAnnotation(object, "creator", ref("World"));
    _SetAnnotation(object, "creatorSlot", `Manual`);

    return object;
  })()
);

slot(
  "World.Manual",
  "ManualCategory",
  (function() {
    let object = ref("World.Manual.ManualCategory");
    _SetAnnotation(object, "creator", ref("World.Manual"));
    _SetAnnotation(object, "creatorSlot", `ManualCategory`);
    _SetAnnotation(object, "name", `ManualCategory`);

    return object;
  })()
);

prototype_slot(
  "World.Manual.ManualCategory",
  "parent",
  ref("World.Core.TopObject")
);

slot(
  "World.Manual",
  "ManualPage",
  (function() {
    let object = ref("World.Manual.ManualPage");
    _SetAnnotation(object, "creator", ref("World.Manual"));
    _SetAnnotation(object, "creatorSlot", `ManualPage`);
    _SetAnnotation(object, "name", `ManualPage`);

    return object;
  })()
);

slot(
  "World.Manual.ManualPage",
  "RenderPage",
  msg(`function() {
    return <h1>Empty Manual Page</h1>;
}`)
);

prototype_slot(
  "World.Manual.ManualPage",
  "parent",
  ref("World.Core.TopObject")
);

slot("World.Manual.ManualPage", "title", `Untitled Manual Page`);

slot(
  "World.Manual",
  "ManualViewer",
  (function() {
    let object = ref("World.Manual.ManualViewer");
    _SetAnnotation(object, "creator", ref("World.Manual"));
    _SetAnnotation(object, "creatorSlot", `ManualViewer`);
    _SetAnnotation(object, "name", `ManualViewer`);

    return object;
  })()
);

slot(
  "World.Manual.ManualViewer",
  "GetTitle",
  msg(`function() {
    return "Manual Viewer";
}`)
);

slot(
  "World.Manual.ManualViewer",
  "New",
  msg(`function(target) {
    let inst = World.Interface.Window.New.call(this);
    inst.path = "introduction";
    return inst;
}`)
);

slot(
  "World.Manual.ManualViewer",
  "RenderContent",
  msg(`function() {
    return <div style={{display: 'flex', height: '100%'}}>
        <div style={{minWidth: '150px', borderRight: '1px solid black', padding: '5px'}}>
            {this.RenderNavigation(this.path)}
        </div>
        <div style={{padding: '10px'}}>
            {World.Manual.root[this.path].RenderPage()}
        </div>
    </div>;
}`)
);

slot(
  "World.Manual.ManualViewer",
  "RenderNavigation",
  msg(`function(current) {
    let root = World.Manual.root;
    return root.GetSlotNames().map(slot => {
        if (slot == "parent") return;
        let style = slot == current ? {fontWeight: 'bold'} : {};
        return <div style={style} onClick={() => this.path = slot}>{root[slot].title}</div>
    });
}`)
);

slot("World.Manual.ManualViewer", "height", 600);

slot("World.Manual.ManualViewer", "padding", `0px`);

prototype_slot(
  "World.Manual.ManualViewer",
  "parent",
  ref("World.Interface.Window")
);

slot("World.Manual.ManualViewer", "width", 800);

prototype_slot("World.Manual", "parent", ref("World.Core.Namespace"));

slot(
  "World.Manual",
  "root",
  (function() {
    let object = ref("World.Manual.root");
    _SetAnnotation(object, "creator", ref("World.Manual"));
    _SetAnnotation(object, "creatorSlot", `root`);

    return object;
  })()
);

slot(
  "World.Manual.root",
  "introduction",
  (function() {
    let object = ref("World.Manual.root.introduction");
    _SetAnnotation(object, "creator", ref("World.Manual.root"));
    _SetAnnotation(object, "creatorSlot", `introduction`);

    return object;
  })()
);

slot(
  "World.Manual.root.introduction",
  "RenderPage",
  msg(`function() {
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

prototype_slot(
  "World.Manual.root.introduction",
  "parent",
  ref("World.Manual.ManualPage")
);

slot("World.Manual.root.introduction", "title", `Introduction`);

slot(
  "World.Manual.root",
  "modules",
  (function() {
    let object = ref("World.Manual.root.modules");
    _SetAnnotation(object, "creator", ref("World.Manual.root"));
    _SetAnnotation(object, "creatorSlot", `modules`);

    return object;
  })()
);

slot(
  "World.Manual.root.modules",
  "RenderPage",
  msg(`function() {
    return <>
        <h1>Understanding Modules</h1>
        <p>You've been building a live environment.
            You want to commit the code that you've written to Git so that you can
            diff and merge with other developers. This is where modules come in.
            Modules enable you to serialize part of an object graph into regular
            JS code that can be loaded into another instance of ProtoWorld. ProtoWorld
            modules are heavily based off of the <a target="_blank" href="http://handbook.selflanguage.org/2017.1/howtoprg.html#the-transporter">Transporter from Self</a>.
        </p>

        <p>
        A module is a collection of slots that have been annotated with a specific tag.
        When you export the module, all of those slots are written out to a JS file.
        </p>
        <p>
        Note that slots are the units of code packaging, not modules.
        This allows a module to patch in new slots onto an existing object.
        For example, the interface module patches in slots such as "OpenEditor"
        onto TopObject.
        </p>
        <p>
        Modules also require that exported objects have a unique path, from the root
        that identifies the object. This is done by giving every object a creator
        annotation consisting of the object/slot that "creates" it. Tracing creator annotaions
        back to root gives us the path of the object.
        </p>

        <p>
        Once exported, modules are idempotent and can be loaded back in any order. They can even be edited manually.
        </p>

        <p>
        Modules are how ProtoWorld itself is versioned.
        </p>
    </>;
}`)
);

prototype_slot(
  "World.Manual.root.modules",
  "parent",
  ref("World.Manual.ManualPage")
);

slot("World.Manual.root.modules", "title", `Modules`);

prototype_slot(
  "World.Manual.root",
  "parent",
  ref("World.Manual.ManualCategory")
);

slot(
  "World.Modules",
  "manual",
  (function() {
    let object = ref("World.Modules.manual");
    _SetAnnotation(object, "name", `ManualModule`);
    _SetAnnotation(object, "creator", ref("World.Modules"));
    _SetAnnotation(object, "creatorSlot", `manual`);

    return object;
  })()
);

prototype_slot("World.Modules.manual", "parent", ref("World.Core.Module"));
