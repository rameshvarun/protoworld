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
    FileSaver.saveAs(this.GetBlob());
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
  FileSaver.saveAs(blob, "module.js");
}`)
);

slot(
  "World.ExternalLoaders",
  "InterfaceLoader",
  msg(`function() {
    return new Promise((resolve, reject) => {
        let link = document.createElement('link');
        link.rel  = 'stylesheet';
        link.href = 'https://use.fontawesome.com/releases/v5.0.10/css/all.css';
        link.crossOrigin = 'anonymous';
        link.integrity = 'sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg';

        link.onload = () => resolve();
        document.head.appendChild(link);
    });
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
     paddingTop: '2px',
     width: '100%',
     display: 'flex'
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
            style={{ cursor: 'pointer', color: 'white', paddingRight: '8px', paddingLeft: '5px', paddingBottom: '2px'}}
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
   FileSaver.saveAs(blob, "image.prw");
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
