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

let mod = ref("World.Modules.interface");

slot(
  "World.Core.Asset",
  "CreateEditor",
  msg(`function() {
    if (this.data) {
       return World.Interface.AssetViewer.New(this);
    } else {
       return World.Core.TopObject.CreateEditor.call(this);
    }
}`)
);

slot(
  "World.Core.Asset",
  "Download",
  msg(`function() {
    saveAs(this.GetBlob());
}`)
);

slot(
  "World.Core.TopObject",
  "CreateEditor",
  msg(`
function() {
  return World.Interface.ObjectEditor.New(this);
}
`),
  { category: `editor` }
);

slot(
  "World.Core.TopObject",
  "OpenEditor",
  msg(`
function() {
  return this.CreateEditor().Open();
}
`),
  { category: `editor` }
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
  { category: `editor` }
);

slot(
  "World.Core.Module",
  "Export",
  msg(`function() {
  let code = this.GenerateCode();
  var blob = new Blob([code], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "module.js");
}`)
);

slot(
  "World.ExternalLoaders",
  "InterfaceLoader",
  msg(`function() {
    let External = World.Core.ExternalHelpers;

    return Promise.all([
      External.LoadScript('https://unpkg.com/react@16.6.3/umd/react.development.js',
        'sha384-zHkyH/cHeRLWVzS7+I74y+1cMs9KGBxWsVCWzoHHXct9Q/erTk2KElocQaGOQ+yk'),
      External.LoadCSS('https://use.fontawesome.com/releases/v5.0.10/css/all.css',
        'sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg'),
      External.LoadScript('https://cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.4.3/mobile-detect.js',
        'sha256-qRwMbhq9rGx6VsrTZu8+Adq4w23C0FzpEhqOo0J147A='),
      External.LoadScript('https://cdnjs.cloudflare.com/ajax/libs/node-uuid/1.4.8/uuid.js',
        'sha256-di30dL7N9597Q8UApQWE7AIjWlR2hbVHreqxh7NiX4I='),
      External.LoadScript('https://unpkg.com/file-saver@2.0.0/dist/FileSaver.min.js',
        'sha384-Am74NQ3uTJzrL9/oVeHH9mtj2Vabxh7LjdkDS0pzqNgZ9MSYl3DrklSXtv+/4+CE'),
    ]);
}`)
);

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
  })()
);

slot(
  "World.Interface",
  "AssetLoaders",
  (function() {
    let object = ref("World.Interface.AssetLoaders");
    _SetAnnotation(object, "name", `AssetLoaders`);
    _SetAnnotation(
      object,
      "description",
      `An object that stores a bunch of asset loaders. When an asset is uploaded, we try each of these functions to see which Asset (eg: Image, Audio, Video) subclass is actually created.`
    );
    _SetAnnotation(object, "creator", ref("World.Interface"));
    _SetAnnotation(object, "creatorSlot", `AssetLoaders`);

    return object;
  })()
);

slot(
  "World.Interface.AssetLoaders",
  "AssetLoader",
  msg(`function(data, contentType) {
    return World.Core.Asset.New(data, contentType);
}`),
  { priority: 0 }
);

slot(
  "World.Interface.AssetLoaders",
  "ImageLoader",
  msg(`function(data, contentType) {
    if (contentType.startsWith("image/")) {
        return World.Interface.Image.New(data, contentType);
    }
}`),
  { priority: 1 }
);

slot(
  "World.Interface.AssetLoaders",
  "VideoLoader",
  msg(`function(data, contentType) {
    if (contentType.startsWith("video/")) {
        return World.Interface.Video.New(data, contentType);
    }
}`),
  { priority: 1 }
);

prototype_slot(
  "World.Interface.AssetLoaders",
  "parent",
  ref("World.Core.TopObject")
);

slot(
  "World.Interface",
  "AssetViewer",
  (function() {
    let object = ref("World.Interface.AssetViewer");
    _SetAnnotation(object, "name", `AssetViewer`);
    _SetAnnotation(object, "creator", ref("World.Interface"));
    _SetAnnotation(object, "creatorSlot", `AssetViewer`);

    return object;
  })()
);

slot(
  "World.Interface.AssetViewer",
  "GetTitle",
  msg(`function() {
    return \`\${(this.target.GetAnnotation('name') || "Unnamed Object")} (Asset Viewer)\`;
}`)
);

slot(
  "World.Interface.AssetViewer",
  "RenderContent",
  msg(`function() {
  let description = this.target.GetAnnotation("description");
  let modules = Array.from(this.target.ListModules());
  let categories = Array.from(this.target.ListCategories());

  return (
    <div>
      {this.RenderDescriptionWidget()}
      <hr />

      <div>Asset Size: {this.target.data.byteLength} bytes.</div>
      <div>Content Type: {this.target.contentType}</div>
      <button onClick={() => this.target.Download()}>Download</button>
    </div>
  );
}`)
);

prototype_slot(
  "World.Interface.AssetViewer",
  "parent",
  ref("World.Interface.ObjectEditor")
);

slot(
  "World.Interface.ObjectEditor",
  "GetTitle",
  msg(`function() {
    return \`\${(this.target.GetAnnotation('name') || "Unnamed Object")} (Object Editor)\`;
}`)
);

slot(
  "World.Interface.ObjectEditor",
  "New",
  msg(`function(target) {
    let inst = World.Interface.Window.New.call(this);
    inst.AddSlot('target', target);
    inst.SetSlotAnnotation('evaluator', 'transient', true);
    return inst;
}`)
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

        {modules.length > 0 && (
          <>
          <b>Modules: {modules.map(m => m.RenderWidget())}</b>
          <hr />
          </>
        )}


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
}`)
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
}`)
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
}`)
);

prototype_slot(
  "World.Interface.ObjectEditor",
  "parent",
  ref("World.Interface.Window")
);

slot(
  "World.Interface.Window",
  "Close",
  msg(`function() { World.Interface.WindowManager.RemoveWindow(this) }`)
);

slot(
  "World.Interface.Window",
  "GetTitle",
  msg(`function() { return 'Untitled Window'; }`)
);

slot(
  "World.Interface.Window",
  "IsOpen",
  msg(`function() {
    return World.Interface.WindowManager.IsOpen(this);
}`)
);

slot(
  "World.Interface.Window",
  "MoveToFront",
  msg(`function() {
    World.Interface.WindowManager.MoveToFront(this);
}`)
);

slot(
  "World.Interface.Window",
  "New",
  msg(`function() {
    let inst = this.Extend();
    inst.windowID = uuid.v1();
    inst.SetSlotAnnotation('windowDiv', 'transient', true);
    return inst;
}`)
);

slot(
  "World.Interface.Window",
  "Open",
  msg(`function() { World.Interface.WindowManager.AddWindow(this) }`)
);

slot(
  "World.Interface.Window",
  "Render",
  msg(`function() {
  let isMobile = new MobileDetect(window.navigator.userAgent).mobile() !== null;

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
        <pre style={{
                    whiteSpace: 'pre-wrap'
                }}>{e.stack || e.toString()}</pre>
      </div>;
  }
  content = content || <div></div>;

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
      <div key="content" style={contentStyle}>
        <ErrorBoundary FallbackComponent={({ componentStack, error }) => {
            return <div>A React error occurred while rendering this window.
                <pre style={{
                    whiteSpace: 'pre-wrap'
                }}>{error.toString()}</pre>
            </div>;
        }}>{content}</ErrorBoundary>
      </div>
      <div key="bottombar" style={{backgroundColor: this.barColor, height: '10px'}}></div>
    </div>
  );
}`)
);

slot("World.Interface.Window", "RenderContent", msg(`function() { }`));

slot(
  "World.Interface.Window",
  "Update",
  msg(`function(dt) {
    if (this.windowDiv && this.windowDiv instanceof HTMLElement) {
        this.width = this.windowDiv.offsetWidth;
        this.height = this.windowDiv.offsetHeight;
    }
}`)
);

slot("World.Interface.Window", "barColor", `#285477`);

slot("World.Interface.Window", "height", 600);

slot("World.Interface.Window", "left", 0);

slot("World.Interface.Window", "padding", `5px`);

prototype_slot("World.Interface.Window", "parent", ref("World.Core.TopObject"));

slot("World.Interface.Window", "top", 0);

slot("World.Interface.Window", "width", 400);

slot("World.Interface.Window", "zIndex", 0);

slot(
  "World.Interface",
  "CanvasWindow",
  (function() {
    let object = ref("World.Interface.CanvasWindow");
    _SetAnnotation(object, "name", `CanvasWindow`);
    _SetAnnotation(object, "creator", ref("World.Interface"));
    _SetAnnotation(object, "creatorSlot", `CanvasWindow`);
    _SetAnnotation(
      object,
      "description",
      `A base class for Windows that create and draw to an HTML5 canvas.`
    );

    return object;
  })()
);

slot(
  "World.Interface.CanvasWindow",
  "GetTitle",
  msg(`function() {
    return "CanvasWindow"
}`)
);

slot(
  "World.Interface.CanvasWindow",
  "New",
  msg(`function(target) {
    let inst = World.Interface.Window.New.call(this);
    inst.SetSlotAnnotation('canvas', 'transient', true);
    return inst;
}`)
);

slot(
  "World.Interface.CanvasWindow",
  "OnResize",
  msg(`function() {
}`)
);

slot(
  "World.Interface.CanvasWindow",
  "RenderCanvas",
  msg(`function(canvas) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
}`)
);

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
            this.OnResize();
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
}`)
);

slot(
  "World.Interface.CanvasWindow",
  "SetCanvas",
  msg(`function(canvas) {
    this.canvas = canvas;
}`)
);

slot("World.Interface.CanvasWindow", "padding", `0px`);

prototype_slot(
  "World.Interface.CanvasWindow",
  "parent",
  ref("World.Interface.Window")
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
  })()
);

slot(
  "World.Interface.HandlerEditor",
  "GetTitle",
  msg(`function() {
 return "HandlerEditor: " + this.target.toString() + "->" + this.slot;
}`)
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
}`)
);

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
}`)
);

slot("World.Interface.HandlerEditor", "padding", `0px`);

prototype_slot(
  "World.Interface.HandlerEditor",
  "parent",
  ref("World.Interface.Window")
);

slot(
  "World.Interface",
  "Image",
  (function() {
    let object = ref("World.Interface.Image");
    _SetAnnotation(object, "name", `Image`);
    _SetAnnotation(object, "description", `Represents an image asset.`);
    _SetAnnotation(object, "creator", ref("World.Interface"));
    _SetAnnotation(object, "creatorSlot", `Image`);

    return object;
  })()
);

slot(
  "World.Interface.Image",
  "CreateEditor",
  msg(`function() {
    if (this.data) {
       return World.Interface.ImageViewer.New(this);
    } else {
       return World.Core.TopObject.CreateEditor.call(this);
    }
}`)
);

slot(
  "World.Interface.Image",
  "GetImage",
  msg(`function() {
    if (!this.image) {
        this.image = new Image();
        this.image.src = this.GetObjectURL();
        this.SetSlotAnnotation('image', 'transient', true);
    }
    return this.image;
}`)
);

slot(
  "World.Interface.Image",
  "GetTHREETexture",
  msg(`function() {
    if (!this.three) {
        this.three = new THREE.TextureLoader().load(this.GetObjectURL());
        this.SetSlotAnnotation('three', 'transient', true);
    }
    return this.three;
}`)
);

prototype_slot("World.Interface.Image", "parent", ref("World.Core.Asset"));

slot(
  "World.Interface",
  "ImageViewer",
  (function() {
    let object = ref("World.Interface.ImageViewer");
    _SetAnnotation(object, "name", `ImageViewer`);
    _SetAnnotation(object, "description", ``);
    _SetAnnotation(object, "creator", ref("World.Interface"));
    _SetAnnotation(object, "creatorSlot", `ImageViewer`);

    return object;
  })()
);

slot(
  "World.Interface.ImageViewer",
  "GetTitle",
  msg(`function() {
    return \`\${(this.target.GetAnnotation('name') || "Unnamed Object")} (Image Viewer)\`;
}`)
);

slot(
  "World.Interface.ImageViewer",
  "RenderContent",
  msg(`function() {
  return (
    <div>
      {this.RenderDescriptionWidget()}
      <hr />

      <img style={{width: '100%'}} src={this.target.GetObjectURL()}></img>

      <div>Asset Size: {this.target.data.byteLength} bytes.</div>
      <div>Content Type: {this.target.contentType}</div>
      <button onClick={() => this.target.Download()}>Download</button>
    </div>
  );
}`)
);

prototype_slot(
  "World.Interface.ImageViewer",
  "parent",
  ref("World.Interface.AssetViewer")
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
  })()
);

slot(
  "World.Interface.MainMenu",
  "Render",
  msg(`function() {
  let isMobile = new MobileDetect(window.navigator.userAgent).mobile() !== null;
  let barStyle = isMobile ? {
     'backgroundColor': '#285477',
     maxWidth: '100%',
     padding: '5px',
     whiteSpace: 'nowrap',
     overflowX: 'scroll'
   } : {
     'backgroundColor': '#285477',
     'position': 'fixed',
     top: '0px',
     left: '0px',
     paddingTop: '2px',
     width: '100%',
   };

  let MenuRoot = World.Interface.MenuRoot;
  let MenuCategory = World.Interface.MenuCategory;
  let menuItems = MenuRoot.GetSlotNames();
  menuItems.sort((a, b) => MenuRoot.GetSlotAnnotation(b, 'priority') - MenuRoot.GetSlotAnnotation(a, 'priority'));
  return <div style={barStyle}>
    {menuItems.map(slot => {
        if (slot == "parent") return;
        if (MenuCategory.IsParentOf(MenuRoot[slot])) {
            return <Dropdown.default>
                <Dropdown.DropdownTrigger>
                <span
                    style={{ cursor: 'pointer', color: 'white', paddingRight: '8px', paddingLeft: '5px', paddingBottom: '2px'}}
                    ><b>{slot} <i class="fas fa-caret-down"></i></b></span>
                </Dropdown.DropdownTrigger>
                <Dropdown.DropdownContent>
                    <div style={{cursor: 'pointer', padding: '5px', minWidth: '150px', color: 'black', backgroundColor: '#f1f1f1', boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)"}}>
                        {MenuRoot[slot].GetSlotNames().map(subslot => {
                            if (subslot == "parent") return;
                            return <div  onClick={() => MenuRoot[slot][subslot]()} >{subslot}</div>;

                        })}
                    </div>
                </Dropdown.DropdownContent>
            </Dropdown.default>;
        }
        return <span
            style={{ whiteSpace: 'nowrap', cursor: 'pointer', color: 'white', paddingRight: '8px', paddingLeft: '5px', paddingBottom: '2px'}}
            onClick={() => MenuRoot[slot]()}><b>{slot}</b></span>})}
  </div>;
}`)
);

slot("World.Interface.MainMenu", "left", 0);

prototype_slot(
  "World.Interface.MainMenu",
  "parent",
  ref("World.Interface.Window")
);

slot("World.Interface.MainMenu", "top", 0);

slot("World.Interface.MainMenu", "windowID", `mainmenu`);

slot(
  "World.Interface",
  "MenuCategory",
  (function() {
    let object = ref("World.Interface.MenuCategory");
    _SetAnnotation(object, "name", `MenuCategory`);
    _SetAnnotation(object, "description", ``);
    _SetAnnotation(object, "creator", ref("World.Interface"));
    _SetAnnotation(object, "creatorSlot", `MenuCategory`);

    return object;
  })()
);

prototype_slot(
  "World.Interface.MenuCategory",
  "parent",
  ref("World.Core.TopObject")
);

slot(
  "World.Interface",
  "MenuRoot",
  (function() {
    let object = ref("World.Interface.MenuRoot");
    _SetAnnotation(object, "name", `MenuRoot`);
    _SetAnnotation(object, "description", ``);
    _SetAnnotation(object, "creator", ref("World.Interface"));
    _SetAnnotation(object, "creatorSlot", `MenuRoot`);

    return object;
  })()
);

slot(
  "World.Interface.MenuRoot",
  "File",
  (function() {
    let object = ref("World.Interface.MenuRoot.File");
    _SetAnnotation(object, "name", `FileMenu`);
    _SetAnnotation(object, "description", ``);
    _SetAnnotation(object, "creator", ref("World.Interface.MenuRoot"));
    _SetAnnotation(object, "creatorSlot", `File`);

    return object;
  })(),
  { priority: 10 }
);

slot(
  "World.Interface.MenuRoot.File",
  "Open Image",
  msg(`function() {
            var fileInput = document.getElementById('file-input');
        var changeHandler = function() {
          var file = fileInput.files[0];

          if (file.name.match(/\\.prw\$/)) {
            var reader = new FileReader();

            reader.onload = function() {
              _LoadImage(reader.result);
            };

            reader.readAsArrayBuffer(file);
          } else {
          alert("File not supported, .txt or .json files only");
          }

          fileInput.removeEventListener('change', changeHandler);
          this.value = null;
        }

        fileInput.addEventListener('change', changeHandler);

      fileInput.click();
    }`)
);

slot(
  "World.Interface.MenuRoot.File",
  "Save Image",
  msg(`function() {
   var blob = new Blob([_SaveImage(World)], {type: "application/x-protoworld"});
   saveAs(blob, "image.prw");
}`)
);

prototype_slot(
  "World.Interface.MenuRoot.File",
  "parent",
  ref("World.Interface.MenuCategory")
);

slot(
  "World.Interface.MenuRoot",
  "Load Module",
  msg(`function() {
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
}`),
  { priority: 0 }
);

slot(
  "World.Interface.MenuRoot",
  "Open World",
  msg(`function() {
    World.Interface.ObjectEditor.New(World).Open();
}`),
  { priority: 0 }
);

slot(
  "World.Interface.MenuRoot",
  "Tools",
  (function() {
    let object = ref("World.Interface.MenuRoot.Tools");
    _SetAnnotation(object, "name", `ToolsMenu`);
    _SetAnnotation(object, "description", ``);
    _SetAnnotation(object, "creator", ref("World.Interface.MenuRoot"));
    _SetAnnotation(object, "creatorSlot", `Tools`);

    return object;
  })(),
  { priority: 9 }
);

slot(
  "World.Interface.MenuRoot.Tools",
  "Module Scanner",
  msg(`function() {
    World.Tools.ModuleScanner.New().Open()
}`)
);

prototype_slot(
  "World.Interface.MenuRoot.Tools",
  "parent",
  ref("World.Interface.MenuCategory")
);

slot(
  "World.Interface.MenuRoot",
  "Upload Asset",
  msg(`function() {
            var fileInput = document.getElementById('file-input');
        var changeHandler = function() {
          var file = fileInput.files[0];
          var reader = new FileReader();

          reader.onload = function() {
             let assetLoaders = World.Interface.AssetLoaders;
             let loaders = assetLoaders.GetSlotNames();
             loaders.sort((a, b) =>
                assetLoaders.GetSlotAnnotation(b, 'priority') - assetLoaders.GetSlotAnnotation(a, 'priority'));
             console.log(loaders);

             for (let loader of loaders) {
                 if (loader == "parent") continue;
                 let asset = assetLoaders[loader](reader.result, file.type);
                 if (asset) {
                     asset.OpenEditor();
                     break;
                 }
             }
          };

          reader.readAsArrayBuffer(file);

          fileInput.removeEventListener('change', changeHandler);
          this.value = null;
        }

      fileInput.addEventListener('change', changeHandler);
      fileInput.click();
}`)
);

prototype_slot(
  "World.Interface.MenuRoot",
  "parent",
  ref("World.Interface.MenuCategory")
);

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
  })()
);

slot(
  "World.Interface",
  "Video",
  (function() {
    let object = ref("World.Interface.Video");
    _SetAnnotation(object, "name", `Video`);
    _SetAnnotation(object, "description", `Represents a video asset.`);
    _SetAnnotation(object, "creator", ref("World.Interface"));
    _SetAnnotation(object, "creatorSlot", `Video`);

    return object;
  })()
);

slot(
  "World.Interface.Video",
  "CreateEditor",
  msg(`function() {
    if (this.data) {
       return World.Interface.VideoViewer.New(this);
    } else {
       return World.Core.TopObject.CreateEditor.call(this);
    }
}`)
);

prototype_slot("World.Interface.Video", "parent", ref("World.Core.Asset"));

slot(
  "World.Interface",
  "VideoViewer",
  (function() {
    let object = ref("World.Interface.VideoViewer");
    _SetAnnotation(object, "creator", ref("World.Interface"));
    _SetAnnotation(object, "creatorSlot", `VideoViewer`);

    return object;
  })()
);

slot(
  "World.Interface.VideoViewer",
  "GetTitle",
  msg(`function() {
    return \`\${(this.target.GetAnnotation('name') || "Unnamed Object")} (Video Viewer)\`;
}`)
);

slot(
  "World.Interface.VideoViewer",
  "RenderContent",
  msg(`function() {
  return (
    <div>
      {this.RenderDescriptionWidget()}
      <hr />

      <video controls={true} style={{width: '100%'}} src={this.target.GetObjectURL()}></video>

      <div>Asset Size: {this.target.data.byteLength} bytes.</div>
      <div>Content Type: {this.target.contentType}</div>
      <button onClick={() => this.target.Download()}>Download</button>
    </div>
  );
}`)
);

prototype_slot(
  "World.Interface.VideoViewer",
  "parent",
  ref("World.Interface.AssetViewer")
);

slot(
  "World.Interface",
  "Window",
  (function() {
    let object = ref("World.Interface.Window");
    _SetAnnotation(object, "name", `Window`);
    _SetAnnotation(object, "creator", ref("World.Interface"));
    _SetAnnotation(object, "creatorSlot", `Window`);
    _SetAnnotation(object, "description", `A base class for all windows.`);

    return object;
  })()
);

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
  })()
);

slot(
  "World.Interface.WindowManager",
  "AddWindow",
  msg(`function(window) {
    this.windows = this.windows || [];
    this.windows.push(window);
    window.zIndex = this.GetMaxZ() + 1;
}`)
);

slot(
  "World.Interface.WindowManager",
  "GetMaxZ",
  msg(`function() {
    return Math.max(0, ...this.windows.map(window => window.zIndex));
}`)
);

slot(
  "World.Interface.WindowManager",
  "IsOpen",
  msg(`function(window) {
    return this.windows.includes(window);
}`)
);

slot(
  "World.Interface.WindowManager",
  "MoveToFront",
  msg(`function(window) {
    if (!this.IsOpen(window))
        throw new Error('Tried to move a non-open window to the front.');
    window.zIndex = this.GetMaxZ() + 1;
}`)
);

slot(
  "World.Interface.WindowManager",
  "RemoveWindow",
  msg(`function(window) {
    this.windows = this.windows || [];
    this.windows = this.windows.filter(item => item !== window);
}`)
);

slot(
  "World.Interface.WindowManager",
  "Render",
  msg(`function() {
  return <>
    <img style={{zIndex: -1, position: 'absolute', marginTop: '30px', maxWidth: '400px'}}
        src={World.Interface.logo.GetObjectURL()}></img>
    {World.Interface.MainMenu.Render()}
    {(this.windows || []).map(w => w.Render())}</>
}`)
);

slot(
  "World.Interface.WindowManager",
  "Update",
  msg(`function(dt) {
    World.Interface.MainMenu.Update(dt);
    (this.windows || []).forEach(w => w.Update(dt));
}`)
);

prototype_slot(
  "World.Interface.WindowManager",
  "parent",
  ref("World.Core.TopObject")
);

slot(
  "World.Interface",
  "logo",
  (function() {
    let object = ref("World.Interface.logo");
    _SetAnnotation(object, "creator", ref("World.Interface"));
    _SetAnnotation(object, "creatorSlot", `logo`);

    return object;
  })()
);

slot("World.Interface.logo", "contentType", `image/svg+xml`);

slot(
  "World.Interface.logo",
  "data",
  Int8Array.from([
    60,
    63,
    120,
    109,
    108,
    32,
    118,
    101,
    114,
    115,
    105,
    111,
    110,
    61,
    34,
    49,
    46,
    48,
    34,
    32,
    101,
    110,
    99,
    111,
    100,
    105,
    110,
    103,
    61,
    34,
    85,
    84,
    70,
    45,
    56,
    34,
    32,
    115,
    116,
    97,
    110,
    100,
    97,
    108,
    111,
    110,
    101,
    61,
    34,
    110,
    111,
    34,
    63,
    62,
    10,
    60,
    33,
    45,
    45,
    32,
    67,
    114,
    101,
    97,
    116,
    101,
    100,
    32,
    119,
    105,
    116,
    104,
    32,
    73,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    32,
    40,
    104,
    116,
    116,
    112,
    58,
    47,
    47,
    119,
    119,
    119,
    46,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    46,
    111,
    114,
    103,
    47,
    41,
    32,
    45,
    45,
    62,
    10,
    10,
    60,
    115,
    118,
    103,
    10,
    32,
    32,
    32,
    120,
    109,
    108,
    110,
    115,
    58,
    100,
    99,
    61,
    34,
    104,
    116,
    116,
    112,
    58,
    47,
    47,
    112,
    117,
    114,
    108,
    46,
    111,
    114,
    103,
    47,
    100,
    99,
    47,
    101,
    108,
    101,
    109,
    101,
    110,
    116,
    115,
    47,
    49,
    46,
    49,
    47,
    34,
    10,
    32,
    32,
    32,
    120,
    109,
    108,
    110,
    115,
    58,
    99,
    99,
    61,
    34,
    104,
    116,
    116,
    112,
    58,
    47,
    47,
    99,
    114,
    101,
    97,
    116,
    105,
    118,
    101,
    99,
    111,
    109,
    109,
    111,
    110,
    115,
    46,
    111,
    114,
    103,
    47,
    110,
    115,
    35,
    34,
    10,
    32,
    32,
    32,
    120,
    109,
    108,
    110,
    115,
    58,
    114,
    100,
    102,
    61,
    34,
    104,
    116,
    116,
    112,
    58,
    47,
    47,
    119,
    119,
    119,
    46,
    119,
    51,
    46,
    111,
    114,
    103,
    47,
    49,
    57,
    57,
    57,
    47,
    48,
    50,
    47,
    50,
    50,
    45,
    114,
    100,
    102,
    45,
    115,
    121,
    110,
    116,
    97,
    120,
    45,
    110,
    115,
    35,
    34,
    10,
    32,
    32,
    32,
    120,
    109,
    108,
    110,
    115,
    58,
    115,
    118,
    103,
    61,
    34,
    104,
    116,
    116,
    112,
    58,
    47,
    47,
    119,
    119,
    119,
    46,
    119,
    51,
    46,
    111,
    114,
    103,
    47,
    50,
    48,
    48,
    48,
    47,
    115,
    118,
    103,
    34,
    10,
    32,
    32,
    32,
    120,
    109,
    108,
    110,
    115,
    61,
    34,
    104,
    116,
    116,
    112,
    58,
    47,
    47,
    119,
    119,
    119,
    46,
    119,
    51,
    46,
    111,
    114,
    103,
    47,
    50,
    48,
    48,
    48,
    47,
    115,
    118,
    103,
    34,
    10,
    32,
    32,
    32,
    120,
    109,
    108,
    110,
    115,
    58,
    115,
    111,
    100,
    105,
    112,
    111,
    100,
    105,
    61,
    34,
    104,
    116,
    116,
    112,
    58,
    47,
    47,
    115,
    111,
    100,
    105,
    112,
    111,
    100,
    105,
    46,
    115,
    111,
    117,
    114,
    99,
    101,
    102,
    111,
    114,
    103,
    101,
    46,
    110,
    101,
    116,
    47,
    68,
    84,
    68,
    47,
    115,
    111,
    100,
    105,
    112,
    111,
    100,
    105,
    45,
    48,
    46,
    100,
    116,
    100,
    34,
    10,
    32,
    32,
    32,
    120,
    109,
    108,
    110,
    115,
    58,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    61,
    34,
    104,
    116,
    116,
    112,
    58,
    47,
    47,
    119,
    119,
    119,
    46,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    46,
    111,
    114,
    103,
    47,
    110,
    97,
    109,
    101,
    115,
    112,
    97,
    99,
    101,
    115,
    47,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    34,
    10,
    32,
    32,
    32,
    119,
    105,
    100,
    116,
    104,
    61,
    34,
    49,
    57,
    55,
    46,
    48,
    56,
    56,
    54,
    55,
    109,
    109,
    34,
    10,
    32,
    32,
    32,
    104,
    101,
    105,
    103,
    104,
    116,
    61,
    34,
    49,
    50,
    49,
    46,
    56,
    55,
    52,
    57,
    109,
    109,
    34,
    10,
    32,
    32,
    32,
    118,
    105,
    101,
    119,
    66,
    111,
    120,
    61,
    34,
    48,
    32,
    48,
    32,
    49,
    57,
    55,
    46,
    48,
    56,
    56,
    54,
    55,
    32,
    49,
    50,
    49,
    46,
    56,
    55,
    52,
    57,
    34,
    10,
    32,
    32,
    32,
    118,
    101,
    114,
    115,
    105,
    111,
    110,
    61,
    34,
    49,
    46,
    49,
    34,
    10,
    32,
    32,
    32,
    105,
    100,
    61,
    34,
    115,
    118,
    103,
    56,
    34,
    10,
    32,
    32,
    32,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    58,
    118,
    101,
    114,
    115,
    105,
    111,
    110,
    61,
    34,
    48,
    46,
    57,
    50,
    46,
    51,
    32,
    40,
    50,
    52,
    48,
    53,
    53,
    52,
    54,
    44,
    32,
    50,
    48,
    49,
    56,
    45,
    48,
    51,
    45,
    49,
    49,
    41,
    34,
    10,
    32,
    32,
    32,
    115,
    111,
    100,
    105,
    112,
    111,
    100,
    105,
    58,
    100,
    111,
    99,
    110,
    97,
    109,
    101,
    61,
    34,
    108,
    111,
    103,
    111,
    46,
    115,
    118,
    103,
    34,
    62,
    10,
    32,
    32,
    60,
    100,
    101,
    102,
    115,
    10,
    32,
    32,
    32,
    32,
    32,
    105,
    100,
    61,
    34,
    100,
    101,
    102,
    115,
    50,
    34,
    32,
    47,
    62,
    10,
    32,
    32,
    60,
    115,
    111,
    100,
    105,
    112,
    111,
    100,
    105,
    58,
    110,
    97,
    109,
    101,
    100,
    118,
    105,
    101,
    119,
    10,
    32,
    32,
    32,
    32,
    32,
    105,
    100,
    61,
    34,
    98,
    97,
    115,
    101,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    112,
    97,
    103,
    101,
    99,
    111,
    108,
    111,
    114,
    61,
    34,
    35,
    50,
    56,
    50,
    56,
    50,
    56,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    98,
    111,
    114,
    100,
    101,
    114,
    99,
    111,
    108,
    111,
    114,
    61,
    34,
    35,
    54,
    54,
    54,
    54,
    54,
    54,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    98,
    111,
    114,
    100,
    101,
    114,
    111,
    112,
    97,
    99,
    105,
    116,
    121,
    61,
    34,
    49,
    46,
    48,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    58,
    112,
    97,
    103,
    101,
    111,
    112,
    97,
    99,
    105,
    116,
    121,
    61,
    34,
    48,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    58,
    112,
    97,
    103,
    101,
    115,
    104,
    97,
    100,
    111,
    119,
    61,
    34,
    50,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    58,
    122,
    111,
    111,
    109,
    61,
    34,
    48,
    46,
    57,
    56,
    57,
    57,
    52,
    57,
    52,
    57,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    58,
    99,
    120,
    61,
    34,
    52,
    48,
    53,
    46,
    49,
    57,
    48,
    48,
    52,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    58,
    99,
    121,
    61,
    34,
    50,
    53,
    48,
    46,
    56,
    48,
    56,
    52,
    53,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    58,
    100,
    111,
    99,
    117,
    109,
    101,
    110,
    116,
    45,
    117,
    110,
    105,
    116,
    115,
    61,
    34,
    109,
    109,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    58,
    99,
    117,
    114,
    114,
    101,
    110,
    116,
    45,
    108,
    97,
    121,
    101,
    114,
    61,
    34,
    108,
    97,
    121,
    101,
    114,
    49,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    115,
    104,
    111,
    119,
    103,
    114,
    105,
    100,
    61,
    34,
    102,
    97,
    108,
    115,
    101,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    58,
    119,
    105,
    110,
    100,
    111,
    119,
    45,
    119,
    105,
    100,
    116,
    104,
    61,
    34,
    49,
    54,
    55,
    55,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    58,
    119,
    105,
    110,
    100,
    111,
    119,
    45,
    104,
    101,
    105,
    103,
    104,
    116,
    61,
    34,
    57,
    51,
    56,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    58,
    119,
    105,
    110,
    100,
    111,
    119,
    45,
    120,
    61,
    34,
    50,
    51,
    54,
    54,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    58,
    119,
    105,
    110,
    100,
    111,
    119,
    45,
    121,
    61,
    34,
    50,
    55,
    55,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    58,
    119,
    105,
    110,
    100,
    111,
    119,
    45,
    109,
    97,
    120,
    105,
    109,
    105,
    122,
    101,
    100,
    61,
    34,
    48,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    102,
    105,
    116,
    45,
    109,
    97,
    114,
    103,
    105,
    110,
    45,
    116,
    111,
    112,
    61,
    34,
    48,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    102,
    105,
    116,
    45,
    109,
    97,
    114,
    103,
    105,
    110,
    45,
    108,
    101,
    102,
    116,
    61,
    34,
    48,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    102,
    105,
    116,
    45,
    109,
    97,
    114,
    103,
    105,
    110,
    45,
    114,
    105,
    103,
    104,
    116,
    61,
    34,
    48,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    102,
    105,
    116,
    45,
    109,
    97,
    114,
    103,
    105,
    110,
    45,
    98,
    111,
    116,
    116,
    111,
    109,
    61,
    34,
    48,
    34,
    32,
    47,
    62,
    10,
    32,
    32,
    60,
    109,
    101,
    116,
    97,
    100,
    97,
    116,
    97,
    10,
    32,
    32,
    32,
    32,
    32,
    105,
    100,
    61,
    34,
    109,
    101,
    116,
    97,
    100,
    97,
    116,
    97,
    53,
    34,
    62,
    10,
    32,
    32,
    32,
    32,
    60,
    114,
    100,
    102,
    58,
    82,
    68,
    70,
    62,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    60,
    99,
    99,
    58,
    87,
    111,
    114,
    107,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    114,
    100,
    102,
    58,
    97,
    98,
    111,
    117,
    116,
    61,
    34,
    34,
    62,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    60,
    100,
    99,
    58,
    102,
    111,
    114,
    109,
    97,
    116,
    62,
    105,
    109,
    97,
    103,
    101,
    47,
    115,
    118,
    103,
    43,
    120,
    109,
    108,
    60,
    47,
    100,
    99,
    58,
    102,
    111,
    114,
    109,
    97,
    116,
    62,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    60,
    100,
    99,
    58,
    116,
    121,
    112,
    101,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    114,
    100,
    102,
    58,
    114,
    101,
    115,
    111,
    117,
    114,
    99,
    101,
    61,
    34,
    104,
    116,
    116,
    112,
    58,
    47,
    47,
    112,
    117,
    114,
    108,
    46,
    111,
    114,
    103,
    47,
    100,
    99,
    47,
    100,
    99,
    109,
    105,
    116,
    121,
    112,
    101,
    47,
    83,
    116,
    105,
    108,
    108,
    73,
    109,
    97,
    103,
    101,
    34,
    32,
    47,
    62,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    60,
    100,
    99,
    58,
    116,
    105,
    116,
    108,
    101,
    62,
    60,
    47,
    100,
    99,
    58,
    116,
    105,
    116,
    108,
    101,
    62,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    60,
    47,
    99,
    99,
    58,
    87,
    111,
    114,
    107,
    62,
    10,
    32,
    32,
    32,
    32,
    60,
    47,
    114,
    100,
    102,
    58,
    82,
    68,
    70,
    62,
    10,
    32,
    32,
    60,
    47,
    109,
    101,
    116,
    97,
    100,
    97,
    116,
    97,
    62,
    10,
    32,
    32,
    60,
    103,
    10,
    32,
    32,
    32,
    32,
    32,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    58,
    108,
    97,
    98,
    101,
    108,
    61,
    34,
    76,
    97,
    121,
    101,
    114,
    32,
    49,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    58,
    103,
    114,
    111,
    117,
    112,
    109,
    111,
    100,
    101,
    61,
    34,
    108,
    97,
    121,
    101,
    114,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    105,
    100,
    61,
    34,
    108,
    97,
    121,
    101,
    114,
    49,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    116,
    114,
    97,
    110,
    115,
    102,
    111,
    114,
    109,
    61,
    34,
    116,
    114,
    97,
    110,
    115,
    108,
    97,
    116,
    101,
    40,
    45,
    50,
    46,
    52,
    56,
    51,
    53,
    53,
    56,
    55,
    44,
    45,
    53,
    46,
    54,
    55,
    54,
    50,
    49,
    57,
    57,
    41,
    34,
    62,
    10,
    32,
    32,
    32,
    32,
    60,
    112,
    97,
    116,
    104,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    105,
    100,
    61,
    34,
    112,
    97,
    116,
    104,
    49,
    51,
    57,
    54,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    100,
    61,
    34,
    77,
    32,
    49,
    48,
    50,
    46,
    54,
    51,
    49,
    52,
    53,
    44,
    49,
    50,
    55,
    46,
    50,
    56,
    51,
    55,
    55,
    32,
    65,
    32,
    54,
    48,
    46,
    57,
    51,
    55,
    52,
    52,
    57,
    44,
    54,
    48,
    46,
    57,
    51,
    55,
    52,
    52,
    57,
    32,
    48,
    32,
    48,
    32,
    49,
    32,
    52,
    49,
    46,
    54,
    57,
    52,
    48,
    56,
    54,
    44,
    54,
    54,
    46,
    51,
    52,
    54,
    52,
    48,
    51,
    32,
    72,
    32,
    49,
    54,
    51,
    46,
    53,
    54,
    56,
    56,
    49,
    32,
    97,
    32,
    54,
    48,
    46,
    57,
    51,
    55,
    52,
    52,
    57,
    44,
    54,
    48,
    46,
    57,
    51,
    55,
    52,
    52,
    57,
    32,
    48,
    32,
    48,
    32,
    49,
    32,
    45,
    54,
    48,
    46,
    57,
    51,
    55,
    51,
    54,
    44,
    54,
    48,
    46,
    57,
    51,
    55,
    51,
    54,
    55,
    32,
    122,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    115,
    116,
    121,
    108,
    101,
    61,
    34,
    102,
    105,
    108,
    108,
    58,
    35,
    51,
    98,
    99,
    99,
    102,
    102,
    59,
    102,
    105,
    108,
    108,
    45,
    111,
    112,
    97,
    99,
    105,
    116,
    121,
    58,
    49,
    59,
    115,
    116,
    114,
    111,
    107,
    101,
    58,
    110,
    111,
    110,
    101,
    59,
    115,
    116,
    114,
    111,
    107,
    101,
    45,
    119,
    105,
    100,
    116,
    104,
    58,
    50,
    59,
    115,
    116,
    114,
    111,
    107,
    101,
    45,
    109,
    105,
    116,
    101,
    114,
    108,
    105,
    109,
    105,
    116,
    58,
    52,
    59,
    115,
    116,
    114,
    111,
    107,
    101,
    45,
    100,
    97,
    115,
    104,
    97,
    114,
    114,
    97,
    121,
    58,
    110,
    111,
    110,
    101,
    59,
    115,
    116,
    114,
    111,
    107,
    101,
    45,
    111,
    112,
    97,
    99,
    105,
    116,
    121,
    58,
    49,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    105,
    110,
    107,
    115,
    99,
    97,
    112,
    101,
    58,
    99,
    111,
    110,
    110,
    101,
    99,
    116,
    111,
    114,
    45,
    99,
    117,
    114,
    118,
    97,
    116,
    117,
    114,
    101,
    61,
    34,
    48,
    34,
    32,
    47,
    62,
    10,
    32,
    32,
    32,
    32,
    60,
    101,
    108,
    108,
    105,
    112,
    115,
    101,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    115,
    116,
    121,
    108,
    101,
    61,
    34,
    102,
    105,
    108,
    108,
    58,
    110,
    111,
    110,
    101,
    59,
    102,
    105,
    108,
    108,
    45,
    111,
    112,
    97,
    99,
    105,
    116,
    121,
    58,
    49,
    59,
    115,
    116,
    114,
    111,
    107,
    101,
    58,
    35,
    102,
    102,
    102,
    102,
    102,
    102,
    59,
    115,
    116,
    114,
    111,
    107,
    101,
    45,
    119,
    105,
    100,
    116,
    104,
    58,
    49,
    48,
    59,
    115,
    116,
    114,
    111,
    107,
    101,
    45,
    109,
    105,
    116,
    101,
    114,
    108,
    105,
    109,
    105,
    116,
    58,
    52,
    59,
    115,
    116,
    114,
    111,
    107,
    101,
    45,
    100,
    97,
    115,
    104,
    97,
    114,
    114,
    97,
    121,
    58,
    110,
    111,
    110,
    101,
    59,
    115,
    116,
    114,
    111,
    107,
    101,
    45,
    111,
    112,
    97,
    99,
    105,
    116,
    121,
    58,
    49,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    105,
    100,
    61,
    34,
    112,
    97,
    116,
    104,
    49,
    51,
    56,
    55,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    99,
    120,
    61,
    34,
    49,
    48,
    49,
    46,
    48,
    50,
    55,
    56,
    57,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    99,
    121,
    61,
    34,
    54,
    57,
    46,
    50,
    56,
    54,
    51,
    53,
    52,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    114,
    120,
    61,
    34,
    57,
    51,
    46,
    53,
    52,
    52,
    51,
    51,
    52,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    114,
    121,
    61,
    34,
    50,
    53,
    46,
    49,
    50,
    51,
    51,
    51,
    53,
    34,
    32,
    47,
    62,
    10,
    32,
    32,
    32,
    32,
    60,
    112,
    97,
    116,
    104,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    115,
    116,
    121,
    108,
    101,
    61,
    34,
    102,
    105,
    108,
    108,
    58,
    35,
    51,
    98,
    99,
    99,
    102,
    102,
    59,
    102,
    105,
    108,
    108,
    45,
    111,
    112,
    97,
    99,
    105,
    116,
    121,
    58,
    49,
    59,
    115,
    116,
    114,
    111,
    107,
    101,
    58,
    110,
    111,
    110,
    101,
    59,
    115,
    116,
    114,
    111,
    107,
    101,
    45,
    119,
    105,
    100,
    116,
    104,
    58,
    55,
    46,
    53,
    53,
    57,
    48,
    53,
    53,
    51,
    51,
    59,
    115,
    116,
    114,
    111,
    107,
    101,
    45,
    109,
    105,
    116,
    101,
    114,
    108,
    105,
    109,
    105,
    116,
    58,
    52,
    59,
    115,
    116,
    114,
    111,
    107,
    101,
    45,
    100,
    97,
    115,
    104,
    97,
    114,
    114,
    97,
    121,
    58,
    110,
    111,
    110,
    101,
    59,
    115,
    116,
    114,
    111,
    107,
    101,
    45,
    111,
    112,
    97,
    99,
    105,
    116,
    121,
    58,
    49,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    100,
    61,
    34,
    77,
    32,
    51,
    55,
    56,
    46,
    53,
    49,
    49,
    55,
    50,
    32,
    48,
    32,
    65,
    32,
    50,
    51,
    48,
    46,
    51,
    49,
    52,
    55,
    55,
    32,
    50,
    51,
    48,
    46,
    51,
    49,
    52,
    55,
    55,
    32,
    48,
    32,
    48,
    32,
    48,
    32,
    49,
    52,
    56,
    46,
    49,
    57,
    55,
    50,
    55,
    32,
    50,
    51,
    48,
    46,
    51,
    49,
    52,
    52,
    53,
    32,
    76,
    32,
    54,
    48,
    56,
    46,
    56,
    50,
    54,
    49,
    55,
    32,
    50,
    51,
    48,
    46,
    51,
    49,
    52,
    52,
    53,
    32,
    65,
    32,
    50,
    51,
    48,
    46,
    51,
    49,
    52,
    55,
    55,
    32,
    50,
    51,
    48,
    46,
    51,
    49,
    52,
    55,
    55,
    32,
    48,
    32,
    48,
    32,
    48,
    32,
    51,
    55,
    56,
    46,
    53,
    49,
    49,
    55,
    50,
    32,
    48,
    32,
    122,
    32,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    116,
    114,
    97,
    110,
    115,
    102,
    111,
    114,
    109,
    61,
    34,
    109,
    97,
    116,
    114,
    105,
    120,
    40,
    48,
    46,
    50,
    54,
    52,
    53,
    56,
    51,
    51,
    51,
    44,
    48,
    44,
    48,
    44,
    48,
    46,
    50,
    54,
    52,
    53,
    56,
    51,
    51,
    51,
    44,
    50,
    46,
    52,
    56,
    51,
    53,
    53,
    56,
    55,
    44,
    53,
    46,
    54,
    55,
    54,
    50,
    49,
    57,
    57,
    41,
    34,
    10,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    105,
    100,
    61,
    34,
    112,
    97,
    116,
    104,
    49,
    51,
    56,
    53,
    34,
    32,
    47,
    62,
    10,
    32,
    32,
    60,
    47,
    103,
    62,
    10,
    60,
    47,
    115,
    118,
    103,
    62,
    10
  ]).buffer
);

prototype_slot("World.Interface.logo", "parent", ref("World.Interface.Image"));

prototype_slot("World.Interface", "parent", ref("World.Core.Namespace"));

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
  })()
);

prototype_slot("World.Modules.interface", "parent", ref("World.Core.Module"));
