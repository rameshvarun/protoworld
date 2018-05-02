function ref(path) {
    var parts = path.split('.');
	var current = window;
	for(let part of parts) {
	  current = (current[part] = current[part] || _EmptyObject());
    }
	return current;
}

_AddSlot(ref("World.Core.TopObject"), "CreateEditor", _MakeMessageHandler(`
function() {
	return World.Interface.ObjectEditor.New(this);
}
`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "CreateEditor", "module", ref("World.Modules.interface"));
_SetSlotAnnotation(ref("World.Core.TopObject"), "CreateEditor", "category", `editor`);

_AddSlot(ref("World.Core.TopObject"), "OpenEditor", _MakeMessageHandler(`
function() {
	return this.CreateEditor().Open();
}
`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "OpenEditor", "module", ref("World.Modules.interface"));
_SetSlotAnnotation(ref("World.Core.TopObject"), "OpenEditor", "category", `editor`);

_AddSlot(ref("World.Core.TopObject"), "RenderWidget", _MakeMessageHandler(`function() {
    return <button
              title={this.GetDescription()}
              onClick={() => this.OpenEditor()}>
              {this.ToString()}
            </button>;
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "RenderWidget", "category", `editor`);
_SetSlotAnnotation(ref("World.Core.TopObject"), "RenderWidget", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Core.Module"), "Export", _MakeMessageHandler(`function() {
  let code = this.GenerateCode();
  var blob = new Blob([code], {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(blob, "module.js");
}`));
_SetSlotAnnotation(ref("World.Core.Module"), "Export", "module", ref("World.Modules.interface"));

_AddSlot(ref("World"), "Interface", (function() {
            let object = ref("World.Interface");
            _SetAnnotation(object, "name", `Interface`)
_SetAnnotation(object, "description", `A collection of objects related to the user interface.`)
_SetAnnotation(object, "creator", ref("World"))
_SetAnnotation(object, "creatorSlot", `Interface`)

            return object;
        })());
_SetSlotAnnotation(ref("World"), "Interface", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface"), "parent", ref("World.Core.Namespace"));
_SetSlotAnnotation(ref("World.Interface"), "parent", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface"), "WindowManager", (function() {
            let object = ref("World.Interface.WindowManager");
            _SetAnnotation(object, "name", `WindowManager`)
_SetAnnotation(object, "description", `The window manager and entry point for the render and update main loop.`)
_SetAnnotation(object, "creator", ref("World.Interface"))
_SetAnnotation(object, "creatorSlot", `WindowManager`)

            return object;
        })());
_SetSlotAnnotation(ref("World.Interface"), "WindowManager", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.WindowManager"), "Render", _MakeMessageHandler(`function() {
  return <>
    {World.Interface.MainMenu.Render()}
    {this.windows.map(w => w.Render())}</>
}`));
_SetSlotAnnotation(ref("World.Interface.WindowManager"), "Render", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.WindowManager"), "Update", _MakeMessageHandler(`function(dt) {
    World.Interface.MainMenu.Update(dt)
    this.windows.forEach(w => w.Update(dt));
}`));
_SetSlotAnnotation(ref("World.Interface.WindowManager"), "Update", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.WindowManager"), "AddWindow", _MakeMessageHandler(`function(window) { this.windows.push(window); }`));
_SetSlotAnnotation(ref("World.Interface.WindowManager"), "AddWindow", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.WindowManager"), "RemoveWindow", _MakeMessageHandler(`function(window) { this.windows = this.windows.filter(item => item !== window); }`));
_SetSlotAnnotation(ref("World.Interface.WindowManager"), "RemoveWindow", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.WindowManager"), "parent", ref("World.Core.TopObject"));
_SetSlotAnnotation(ref("World.Interface.WindowManager"), "parent", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface"), "Window", (function() {
            let object = ref("World.Interface.Window");
            _SetAnnotation(object, "name", `Window`)
_SetAnnotation(object, "creator", ref("World.Interface"))
_SetAnnotation(object, "creatorSlot", `Window`)

            return object;
        })());
_SetSlotAnnotation(ref("World.Interface"), "Window", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.Window"), "parent", ref("World.Core.TopObject"));
_SetSlotAnnotation(ref("World.Interface.Window"), "parent", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.Window"), "top", 0);
_SetSlotAnnotation(ref("World.Interface.Window"), "top", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.Window"), "left", 0);
_SetSlotAnnotation(ref("World.Interface.Window"), "left", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.Window"), "Open", _MakeMessageHandler(`function() { World.Interface.WindowManager.AddWindow(this) }`));
_SetSlotAnnotation(ref("World.Interface.Window"), "Open", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.Window"), "Close", _MakeMessageHandler(`function() { World.Interface.WindowManager.RemoveWindow(this) }`));
_SetSlotAnnotation(ref("World.Interface.Window"), "Close", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.Window"), "Update", _MakeMessageHandler(`function(dt) {
    if (this.windowDiv && this.windowDiv instanceof HTMLElement) {
        this.width = this.windowDiv.offsetWidth;
        this.height = this.windowDiv.offsetHeight;
    }
}`));
_SetSlotAnnotation(ref("World.Interface.Window"), "Update", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.Window"), "RenderContent", _MakeMessageHandler(`function() { }`));
_SetSlotAnnotation(ref("World.Interface.Window"), "RenderContent", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.Window"), "GetTitle", _MakeMessageHandler(`function() { return 'Untitled Window'; }`));
_SetSlotAnnotation(ref("World.Interface.Window"), "GetTitle", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.Window"), "Render", _MakeMessageHandler(`function() {
  let isMobile = MobileDetect.mobile() !== null;

  let windowStyle = isMobile ? {
        border: "1px solid black",
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)",
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#f1f1f1",
        marginTop: '10px',
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
        boxSizing: 'border-box'
      };

  return (
    <div
      key={this.windowID}
      style={windowStyle}
      ref={(div) => this.windowDiv = div}
    >
      <div
        style={{
          "backgroundColor": "#285477",
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
      <div style={{ padding: "5px", flexGrow: 1, overflow: 'auto', marginBottom: '10px' }}>{this.RenderContent()}</div>
    </div>
  );
}`));
_SetSlotAnnotation(ref("World.Interface.Window"), "Render", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.Window"), "width", 400);
_SetSlotAnnotation(ref("World.Interface.Window"), "width", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.Window"), "height", 400);
_SetSlotAnnotation(ref("World.Interface.Window"), "height", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface"), "HandlerEditor", (function() {
            let object = ref("World.Interface.HandlerEditor");
            _SetAnnotation(object, "name", `HandlerEditor`)
_SetAnnotation(object, "description", `The default editor for message handlers.`)
_SetAnnotation(object, "creator", ref("World.Interface"))
_SetAnnotation(object, "creatorSlot", `HandlerEditor`)

            return object;
        })());
_SetSlotAnnotation(ref("World.Interface"), "HandlerEditor", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface"), "ObjectEditor", (function() {
            let object = ref("World.Interface.ObjectEditor");
            _SetAnnotation(object, "name", `ObjectEditor`)
_SetAnnotation(object, "description", `The default editor for objects.`)
_SetAnnotation(object, "creator", ref("World.Interface"))
_SetAnnotation(object, "creatorSlot", `ObjectEditor`)

            return object;
        })());
_SetSlotAnnotation(ref("World.Interface"), "ObjectEditor", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface"), "MainMenu", (function() {
            let object = ref("World.Interface.MainMenu");
            _SetAnnotation(object, "description", `The Main Menu at the top of the screen.`)
_SetAnnotation(object, "name", `MainMenu`)
_SetAnnotation(object, "creator", ref("World.Interface"))
_SetAnnotation(object, "creatorSlot", `MainMenu`)

            return object;
        })());
_SetSlotAnnotation(ref("World.Interface"), "MainMenu", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.MainMenu"), "parent", ref("World.Interface.Window"));
_SetSlotAnnotation(ref("World.Interface.MainMenu"), "parent", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.MainMenu"), "left", 0);
_SetSlotAnnotation(ref("World.Interface.MainMenu"), "left", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.MainMenu"), "top", 0);
_SetSlotAnnotation(ref("World.Interface.MainMenu"), "top", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.MainMenu"), "Render", _MakeMessageHandler(`function() {
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
    <button onClick={() => {
     World.debug = !World.debug;
   }}>Toggle Debug</button>

    <button onClick={() => {
     World.FTS.GameState.New().OpenGameWindow()
   }}>From the Stars</button>
  </div>;
}`));
_SetSlotAnnotation(ref("World.Interface.MainMenu"), "Render", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Interface.MainMenu"), "windowID", `mainmenu`);
_SetSlotAnnotation(ref("World.Interface.MainMenu"), "windowID", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Modules"), "interface", (function() {
            let object = ref("World.Modules.interface");
            _SetAnnotation(object, "name", `InterfaceModule`)
_SetAnnotation(object, "creator", ref("World.Modules"))
_SetAnnotation(object, "creatorSlot", `interface`)

            return object;
        })());
_SetSlotAnnotation(ref("World.Modules"), "interface", "module", ref("World.Modules.interface"));

_AddSlot(ref("World.Modules.interface"), "parent", ref("World.Core.Module"));
_SetSlotAnnotation(ref("World.Modules.interface"), "parent", "module", ref("World.Modules.interface"));
