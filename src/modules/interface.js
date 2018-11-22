/*
InterfaceModule - ProtoWorld Module
This module contains objects relating to ProtoWorld's interface, including the windowing system as well as the default ObjectEditor.
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
  "World.Core.TopObject",
  "CreateEditor",
  msg(`
function() {
  return World.Interface.ObjectEditor.New(this);
}
`),
  { module: ref("World.Modules.interface"), category: `editor` }
);

slot(
  "World.Core.TopObject",
  "OpenEditor",
  msg(`
function() {
  return this.CreateEditor().Open();
}
`),
  { module: ref("World.Modules.interface"), category: `editor` }
);

slot(
  "World.Core.TopObject",
  "RenderWidget",
  msg(`function() {
    return <button
              title={this.GetDescription()}
              onClick={() => this.OpenEditor()}>
              {this.ToString()}
            </button>;
}`),
  { category: `editor`, module: ref("World.Modules.interface") }
);

slot(
  "World.Core.Module",
  "Export",
  msg(`function() {
  let code = this.GenerateCode();
  var blob = new Blob([code], {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(blob, "module.js");
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Modules",
  "interface",
  (function() {
    let object = ref("World.Modules.interface");
    _SetAnnotation(object, "name", `InterfaceModule`);
    _SetAnnotation(object, "creator", ref("World.Modules"));
    _SetAnnotation(object, "creatorSlot", `interface`);
    _SetAnnotation(
      object,
      "description",
      `This module contains objects relating to ProtoWorld's interface, including the windowing system as well as the default ObjectEditor.`
    );

    return object;
  })(),
  { module: ref("World.Modules.interface") }
);

slot("World.Modules.interface", "parent", ref("World.Core.Module"), {
  module: ref("World.Modules.interface")
});
_AddPrototypeSlot(ref("World.Modules.interface"), "parent");

slot(
  "World",
  "Interface",
  (function() {
    let object = ref("World.Interface");
    _SetAnnotation(object, "name", `Interface`);
    _SetAnnotation(
      object,
      "description",
      `A collection of objects related to the user interface.`
    );
    _SetAnnotation(object, "creator", ref("World"));
    _SetAnnotation(object, "creatorSlot", `Interface`);

    return object;
  })(),
  { module: ref("World.Modules.interface") }
);

slot("World.Interface", "parent", ref("World.Core.Namespace"), {
  module: ref("World.Modules.interface")
});
_AddPrototypeSlot(ref("World.Interface"), "parent");

slot(
  "World.Interface",
  "WindowManager",
  (function() {
    let object = ref("World.Interface.WindowManager");
    _SetAnnotation(object, "name", `WindowManager`);
    _SetAnnotation(
      object,
      "description",
      `The window manager and entry point for the render and update main loop.`
    );
    _SetAnnotation(object, "creator", ref("World.Interface"));
    _SetAnnotation(object, "creatorSlot", `WindowManager`);

    return object;
  })(),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.WindowManager",
  "Render",
  msg(`function() {
  return <>
    {World.Interface.MainMenu.Render()}
    {(this.windows || []).map(w => w.Render())}</>
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.WindowManager",
  "Update",
  msg(`function(dt) {
    World.Interface.MainMenu.Update(dt);
    (this.windows || []).forEach(w => w.Update(dt));
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.WindowManager",
  "AddWindow",
  msg(`function(window) {
    this.windows = this.windows || [];
    this.windows.push(window);
    window.zIndex = this.GetMaxZ() + 1;
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.WindowManager",
  "RemoveWindow",
  msg(`function(window) {
    this.windows = this.windows || [];
    this.windows = this.windows.filter(item => item !== window);
}`),
  { module: ref("World.Modules.interface") }
);

slot("World.Interface.WindowManager", "parent", ref("World.Core.TopObject"), {
  module: ref("World.Modules.interface")
});
_AddPrototypeSlot(ref("World.Interface.WindowManager"), "parent");

slot(
  "World.Interface.WindowManager",
  "IsOpen",
  msg(`function(window) {
    return this.windows.includes(window);
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.WindowManager",
  "MoveToFront",
  msg(`function(window) {
    if (!this.IsOpen(window))
        throw new Error('Tried to move a non-open window to the front.');
    window.zIndex = this.GetMaxZ() + 1;
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.WindowManager",
  "GetMaxZ",
  msg(`function() {
    return Math.max(0, ...this.windows.map(window => window.zIndex));
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface",
  "Window",
  (function() {
    let object = ref("World.Interface.Window");
    _SetAnnotation(object, "name", `Window`);
    _SetAnnotation(object, "creator", ref("World.Interface"));
    _SetAnnotation(object, "creatorSlot", `Window`);

    return object;
  })(),
  { module: ref("World.Modules.interface") }
);

slot("World.Interface.Window", "parent", ref("World.Core.TopObject"), {
  module: ref("World.Modules.interface")
});
_AddPrototypeSlot(ref("World.Interface.Window"), "parent");

slot("World.Interface.Window", "top", 0, {
  module: ref("World.Modules.interface")
});

slot("World.Interface.Window", "left", 0, {
  module: ref("World.Modules.interface")
});

slot(
  "World.Interface.Window",
  "Open",
  msg(`function() { World.Interface.WindowManager.AddWindow(this) }`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.Window",
  "Close",
  msg(`function() { World.Interface.WindowManager.RemoveWindow(this) }`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.Window",
  "Update",
  msg(`function(dt) {
    if (this.windowDiv && this.windowDiv instanceof HTMLElement) {
        this.width = this.windowDiv.offsetWidth;
        this.height = this.windowDiv.offsetHeight;
    }
}`),
  { module: ref("World.Modules.interface") }
);

slot("World.Interface.Window", "RenderContent", msg(`function() { }`), {
  module: ref("World.Modules.interface")
});

slot(
  "World.Interface.Window",
  "GetTitle",
  msg(`function() { return 'Untitled Window'; }`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.Window",
  "Render",
  msg(`function() {
  let isMobile = MobileDetect.mobile() !== null;

  let windowStyle = isMobile ? {
        border: "1px solid black",
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)",
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#f1f1f1",
        marginTop: '15px',
        marginBottom: '10px',
      } : {
        resize: "both",
        overflow: "auto",
        border: "1px solid black",
        position: "absolute",
        backgroundColor: "#f1f1f1",
        top: this.top + "px",
        left: this.left + "px",
        width: this.width + "px",
        height: this.height + "px",
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)",
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        isolation: 'isolate',
        zIndex: this.zIndex,
      };

  let contentStyle = isMobile ? {
      padding: this.padding, flexGrow: 1, overflow: 'auto', height: '500px'}
    : { padding: this.padding, flexGrow: 1, overflow: 'auto', height: '0px' };

  let content = null;

  try {
      content = this.RenderContent();
  } catch(e) {
      content = <div>
        An error occurred while rendering window content.
        <pre>{e.stack || e.toString()}</pre>
      </div>;
  }

  return (
    <div
      key={this.windowID}
      style={windowStyle}
      ref={(div) => this.windowDiv = div}
      onMouseDown={() => this.MoveToFront()}
    >
      <div
        key="topbar"
        style={{
          "backgroundColor": this.barColor,
          padding: "3px",
          color: "white",
          cursor: "move",
          display: "flex",
          justifyContent: "space-between",
          flexShrink: 0
        }}
        onMouseDown={e => {
          var x = e.clientX;
          var y = e.clientY;

          document.onmousemove = e => {
            var dx = e.clientX - x;
            var dy = e.clientY - y;
            x = e.clientX;
            y = e.clientY;

            this.left = this.left + dx;
            this.top = this.top + dy;
          };

          document.onmouseup = () => {
            document.onmouseup = null;
            document.onmousemove = null;
          };
        }}
      >
        <b>{this.GetTitle()}</b>
        <span>
          <i
            className="fas fa-search"
            title="Inspect Window Object"
            style={{ cursor: "default", marginRight: "5px" }}
            onClick={() =>
              World.Interface.ObjectEditor.New(this).Open()
            }
          />
          <i
            className="fas fa-times"
            title="Close Window"
            style={{ cursor: "default" }}
            onClick={() => this.Close()}
          />
        </span>
      </div>
      <div key="content" style={contentStyle}>{content}</div>
      <div key="bottombar" style={{backgroundColor: this.barColor, height: '10px'}}></div>
    </div>
  );
}`),
  { module: ref("World.Modules.interface") }
);

slot("World.Interface.Window", "width", 400, {
  module: ref("World.Modules.interface")
});

slot("World.Interface.Window", "height", 600, {
  module: ref("World.Modules.interface")
});

slot("World.Interface.Window", "barColor", `#285477`, {
  module: ref("World.Modules.interface")
});

slot(
  "World.Interface.Window",
  "IsOpen",
  msg(`function() {
    return World.Interface.WindowManager.IsOpen(this);
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.Window",
  "MoveToFront",
  msg(`function() {
    World.Interface.WindowManager.MoveToFront(this);
}`),
  { module: ref("World.Modules.interface") }
);

slot("World.Interface.Window", "padding", `5px`, {
  module: ref("World.Modules.interface")
});

slot("World.Interface.Window", "zIndex", 0, {
  module: ref("World.Modules.interface")
});

slot(
  "World.Interface.Window",
  "New",
  msg(`function() {
    let inst = this.Extend();
    inst.windowID = uuid.v1();
    inst.SetSlotAnnotation('windowDiv', 'transient', true);
    return inst;
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface",
  "HandlerEditor",
  (function() {
    let object = ref("World.Interface.HandlerEditor");
    _SetAnnotation(object, "name", `HandlerEditor`);
    _SetAnnotation(
      object,
      "description",
      `The default editor for message handlers.`
    );
    _SetAnnotation(object, "creator", ref("World.Interface"));
    _SetAnnotation(object, "creatorSlot", `HandlerEditor`);

    return object;
  })(),
  { module: ref("World.Modules.interface") }
);

slot("World.Interface.HandlerEditor", "parent", ref("World.Interface.Window"), {
  module: ref("World.Modules.interface")
});
_AddPrototypeSlot(ref("World.Interface.HandlerEditor"), "parent");

slot(
  "World.Interface.HandlerEditor",
  "RenderContent",
  msg(`function() {
  return <div style={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
    <div style={{display: 'flex'}}>
        <button onClick={() => this.target[this.slot] = _MakeMessageHandler(this.code)}>Save</button>
    </div>
    <AceEditor style={{width: '100%', flexGrow: 1}} mode="jsx" theme="monokai" value={this.code} onChange={(value) => this.code = value}/>
  </div>;
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.HandlerEditor",
  "New",
  msg(`function(target, slot) {
  let inst = World.Interface.Window.New.call(this);
  inst.AddSlot('target', target);
  inst.AddSlot('slot', slot);
  inst.AddSlot('code', _GetMessageHandlerCode(target[slot]));
  return inst;
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.HandlerEditor",
  "GetTitle",
  msg(`function() {
 return "HandlerEditor: " + this.target.toString() + "->" + this.slot;
}`),
  { module: ref("World.Modules.interface") }
);

slot("World.Interface.HandlerEditor", "padding", `0px`, {
  module: ref("World.Modules.interface")
});

slot(
  "World.Interface",
  "ObjectEditor",
  (function() {
    let object = ref("World.Interface.ObjectEditor");
    _SetAnnotation(object, "name", `ObjectEditor`);
    _SetAnnotation(object, "description", `The default editor for objects.`);
    _SetAnnotation(object, "creator", ref("World.Interface"));
    _SetAnnotation(object, "creatorSlot", `ObjectEditor`);

    return object;
  })(),
  { module: ref("World.Modules.interface") }
);

slot("World.Interface.ObjectEditor", "parent", ref("World.Interface.Window"), {
  module: ref("World.Modules.interface")
});
_AddPrototypeSlot(ref("World.Interface.ObjectEditor"), "parent");

slot(
  "World.Interface.ObjectEditor",
  "GetTitle",
  msg(`function() {
    return \`\${(this.target.GetAnnotation('name') || "Unnamed Object")} (Object Editor)\`;
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.ObjectEditor",
  "RenderContent",
  msg(`function() {
  let description = this.target.GetAnnotation("description");
  let modules = Array.from(this.target.ListModules());
  let categories = Array.from(this.target.ListCategories());

  return (
    <div>
      {this.RenderDescriptionWidget()}
      <hr />
      <div>
        <b>Modules:</b>
        {modules.length > 0 ? (
          modules.map(m => m.RenderWidget())
        ) : (
          <span> none</span>
        )}
      </div>
      <hr />
      <div><b>Slots</b></div>
      <div style={{ paddingTop: '5px'}}>
        <div ><em>uncategorized</em></div>
        <div style={{ paddingLeft: '5px'}}>{this.target.GetSlotsByCategory(null).map(slot => this.RenderSlot(slot))}</div>
      </div>
      {categories.map(cat => <div style={{ paddingTop: '5px'}}>
          <div ><em>{cat}</em></div>
          <div style={{ paddingLeft: '5px'}}>{this.target.GetSlotsByCategory(cat).map(slot => this.RenderSlot(slot))}</div>
      </div>)}
      <hr />
      <ReactConsole
        welcomeMessage={\`Evaluator for \${this.target.ToString()}.\`}
        ref={e => (this.evaluator = e)}
        handler={code => {
          function evalInContext() {
            return eval(code);
          }

          try {
             let result = evalInContext.call(this.target);
             this.evaluator.log(new String(result));
          } catch (e) {
            this.evaluator.log(new String(e));
          }
          this.evaluator.return();
        }}
      />
    </div>
  );
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.ObjectEditor",
  "New",
  msg(`function(target) {
    let inst = World.Interface.Window.New.call(this);
    inst.AddSlot('target', target);
    inst.SetSlotAnnotation('evaluator', 'transient', true);
    return inst;
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.ObjectEditor",
  "RenderSlot",
  msg(`function(slot) {
    let value = this.target[slot];
    let description = this.target.GetSlotDescription(slot);

    let namespan = _IsPrototypeSlot(this.target, slot) ? <b>{slot}*</b> : slot;

    let slotspan = null;
    if (_IsMessageHandler(value)) {
      slotspan = <button onClick= {() =>
              World.Interface.HandlerEditor.New(this.target, slot).Open()}>Edit Code</button>;
    } else if (_IsProtoObject(value)) {
      slotspan = value.RenderWidget();
    } else if (typeof value == "number") {
        slotspan = value;
    } else {
        slotspan = new String(value);
    }

    return <div key={slot} style={{
            paddingBottom: '5px',
            display: 'flex',
            'justifyContent': 'space-between',
            'alignItems': 'flex-end',
            'flexWrap': 'wrap'
    }}>
        <span title={description}>{namespan}</span>
        <span>{slotspan}</span>
    </div>;
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.ObjectEditor",
  "RenderDescriptionWidget",
  msg(`function() {
    let description = this.target.GetAnnotation("description");

    if (this.editingDescription) {
        return <div>
            <div><input ref={input => this.nameInput = input} defaultValue={this.target.GetName()}/></div>
            <div><textarea ref={input => this.descriptionInput = input} style={{width: '100%'}}
                defaultValue={this.target.GetDescription()}></textarea></div>

            <button onClick={() => {
                if (this.nameInput.value != this.target.GetName())
                  this.target.SetName(this.nameInput.value);

                if (this.descriptionInput.value != this.target.GetDescription())
                  this.target.SetDescription(this.descriptionInput.value);

                this.editingDescription = false;
            }}>Save</button>
            <button onClick={() => this.editingDescription = false}>Cancel</button>
        </div>;
    } else {
        return <div onClick={() => {
            this.editingDescription = true;
        }}>{description ? description : "(No Description)"}</div>
    }
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface",
  "MainMenu",
  (function() {
    let object = ref("World.Interface.MainMenu");
    _SetAnnotation(
      object,
      "description",
      `The Main Menu at the top of the screen.`
    );
    _SetAnnotation(object, "name", `MainMenu`);
    _SetAnnotation(object, "creator", ref("World.Interface"));
    _SetAnnotation(object, "creatorSlot", `MainMenu`);

    return object;
  })(),
  { module: ref("World.Modules.interface") }
);

slot("World.Interface.MainMenu", "parent", ref("World.Interface.Window"), {
  module: ref("World.Modules.interface")
});
_AddPrototypeSlot(ref("World.Interface.MainMenu"), "parent");

slot("World.Interface.MainMenu", "left", 0, {
  module: ref("World.Modules.interface")
});

slot("World.Interface.MainMenu", "top", 0, {
  module: ref("World.Modules.interface")
});

slot(
  "World.Interface.MainMenu",
  "Render",
  msg(`function() {
  let isMobile = MobileDetect.mobile() !== null;
  let barStyle = isMobile ? {
     'backgroundColor': '#285477',
     width: '100%',
     display: 'flex'
   } : {
     'backgroundColor': '#285477',
     'position': 'fixed',
     top: '0px',
     left: '0px',
     width: '100%',
     display: 'flex'
   };

  return <div
    style={barStyle}>
   <button onClick={() => {
     var blob = new Blob([_SaveImage(World)], {type: "text/plain;charset=utf-8"});
     FileSaver.saveAs(blob, "image.json");
   }}>Save Image</button>
   <button onClick={() => {
        var fileInput = document.getElementById('file-input');
        var changeHandler = function() {
          var file = fileInput.files[0];

          if (file.name.match(/\\.(txt|json)\$/)) {
            var reader = new FileReader();

            reader.onload = function() {
              // console.log(JSON.parse(reader.result));
              _LoadImage(JSON.parse(reader.result));
            };

            reader.readAsText(file);
          } else {
           alert("File not supported, .txt or .json files only");
          }

          fileInput.removeEventListener('change', changeHandler);
          this.value = null;
        }

        fileInput.addEventListener('change', changeHandler);

       fileInput.click();
   }}>Open Image</button>
   <button onClick={() => {
     World.Interface.ObjectEditor.New(World).Open();
   }}>Open World</button>
    <button onClick={() => {
        var fileInput = document.getElementById('file-input');
        var changeHandler = function() {
          var file = fileInput.files[0];

          if (file.name.match(/\\.js\$/)) {
            var reader = new FileReader();

            reader.onload = function() {
              eval(reader.result);
            };

            reader.readAsText(file);
          } else {
           alert("File not supported, .js files only");
          }

          fileInput.removeEventListener('change', changeHandler);
          this.value = null;
        }

        fileInput.addEventListener('change', changeHandler);

       fileInput.click();
   }}>Load Module</button>
  </div>;
}`),
  { module: ref("World.Modules.interface") }
);

slot("World.Interface.MainMenu", "windowID", `mainmenu`, {
  module: ref("World.Modules.interface")
});

slot(
  "World.Interface",
  "CanvasWindow",
  (function() {
    let object = ref("World.Interface.CanvasWindow");
    _SetAnnotation(object, "name", `CanvasWindow`);
    _SetAnnotation(object, "creator", ref("World.Interface"));
    _SetAnnotation(object, "creatorSlot", `CanvasWindow`);

    return object;
  })(),
  { module: ref("World.Modules.interface") }
);

slot("World.Interface.CanvasWindow", "parent", ref("World.Interface.Window"), {
  module: ref("World.Modules.interface")
});
_AddPrototypeSlot(ref("World.Interface.CanvasWindow"), "parent");

slot(
  "World.Interface.CanvasWindow",
  "RenderContent",
  msg(`function() {
    if (this.canvas && this.canvas instanceof HTMLElement) {
        // Handle resizing.
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;

        if (this.canvas.width !== width || this.canvas.height !== height) {
            this.canvas.width = width;
            this.canvas.height = height;
        }

        this.RenderCanvas(this.canvas);
    }

    return <div style={{width: "100%", height: "100%", overflow: 'hidden'}}>
        <canvas ref={(canvas) => {
            if (canvas && canvas != this.canvas)
                this.SetCanvas(canvas);
        }} style={{width: "100%", height: "100%"}}>
        </canvas>
    </div>;
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.CanvasWindow",
  "New",
  msg(`function(target) {
    let inst = World.Interface.Window.New.call(this);
    inst.SetSlotAnnotation('canvas', 'transient', true);
    return inst;
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.CanvasWindow",
  "GetTitle",
  msg(`function() {
    return "CanvasWindow"
}`),
  { module: ref("World.Modules.interface") }
);

slot("World.Interface.CanvasWindow", "padding", `0px`, {
  module: ref("World.Modules.interface")
});

slot(
  "World.Interface.CanvasWindow",
  "RenderCanvas",
  msg(`function(canvas) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
}`),
  { module: ref("World.Modules.interface") }
);

slot(
  "World.Interface.CanvasWindow",
  "SetCanvas",
  msg(`function(canvas) {
    this.canvas = canvas;
}`),
  { module: ref("World.Modules.interface") }
);
