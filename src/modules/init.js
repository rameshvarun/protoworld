function ref(path) {
    var parts = path.split('.');
	var current = window;
	for(let part of parts) {
	  current = (current[part] = current[part] || _EmptyObject());
    }
	return current;
}

_AddSlot(ref("World.Core.Namespace"), "parent", ref("World.Core.TopObject"));
_SetSlotAnnotation(ref("World.Core.Namespace"), "parent", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "AddSlot", _MakeMessageHandler(`function(name, value) {
  _AddSlot(this, name, value);
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "AddSlot", "description", `Takes in a slot name and value, and creates a slot on this object.`);
_SetSlotAnnotation(ref("World.Core.TopObject"), "AddSlot", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "Extend", _MakeMessageHandler(`function(name, value) {
  let child = _EmptyObject();
  _AddSlot(child, 'parent', this)
  _AddPrototypeSlot(child, 'parent')
  return child;
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "Extend", "description", `Creates a new object with this object as a parent.`);
_SetSlotAnnotation(ref("World.Core.TopObject"), "Extend", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "SetAnnotation", _MakeMessageHandler(`
function(name, value) {
	_SetAnnotation(this, name, value);
}
`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "SetAnnotation", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "GetAnnotation", _MakeMessageHandler(`
function(name) {
	return _GetAnnotation(this, name);
}
`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "GetAnnotation", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "GetSlotNames", _MakeMessageHandler(`
function() {
	return _GetSlotNames(this);
}
`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "GetSlotNames", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "ToString", _MakeMessageHandler(`
function() {
	return this.GetAnnotation('name') || 'Unnamed Object';
}
`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "ToString", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "SetName", _MakeMessageHandler(`function(name) {
  this.SetAnnotation('name', name);
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "SetName", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "SetDescription", _MakeMessageHandler(`function(desc) {
  this.SetAnnotation('description', desc);
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "SetDescription", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "SetSlotAnnotation", _MakeMessageHandler(`function(slot, name, value) { _SetSlotAnnotation(this, slot, name, value); }`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "SetSlotAnnotation", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "SetSlotModule", _MakeMessageHandler(`function(slot, module) {
    this.SetSlotAnnotation(slot, 'module', module);
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "SetSlotModule", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "SetCreator", _MakeMessageHandler(`function(object, slot) {
  this.SetAnnotation('creator', object);
  this.SetAnnotation('creatorSlot', slot);
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "SetCreator", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "GetCreator", _MakeMessageHandler(`function() {
    return this.GetAnnotation('creator');
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "GetCreator", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "GetName", _MakeMessageHandler(`function() {
    return this.GetAnnotation('name');
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "GetName", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "GetDescription", _MakeMessageHandler(`function() {
    return this.GetAnnotation('description');
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "GetDescription", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "GetSlotAnnotation", _MakeMessageHandler(`function(slot, name) {
    return _GetSlotAnnotation(this, slot, name);
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "GetSlotAnnotation", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "GetSlotModule", _MakeMessageHandler(`function(slot) {
    return this.GetSlotAnnotation(slot, "module");
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "GetSlotModule", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "ListModules", _MakeMessageHandler(`function() {
    let modules = new Set();
    for (let slot of this.GetSlotNames()) {
        let module = this.GetSlotModule(slot);
        if (module) modules.add(module);
    }
    return modules;
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "ListModules", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "SetSlotDescription", _MakeMessageHandler(`function(slot, desc) {
    this.SetSlotAnnotation(slot, "description", desc);
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "SetSlotDescription", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "GetSlotDescription", _MakeMessageHandler(`function(slot) {
    return this.GetSlotAnnotation(slot, 'description')
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "GetSlotDescription", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "AddMessageHandler", _MakeMessageHandler(`function(slot) {
    this.AddSlot(slot, _MakeMessageHandler('function() {\\n}'))
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "AddMessageHandler", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "SetSlotCategory", _MakeMessageHandler(`function(slot, category) {
    this.SetSlotAnnotation(slot, "category", category);
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "SetSlotCategory", "category", `categories`);
_SetSlotAnnotation(ref("World.Core.TopObject"), "SetSlotCategory", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "GetSlotCategory", _MakeMessageHandler(`function(slot) {
    return this.GetSlotAnnotation(slot, "category");
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "GetSlotCategory", "category", `categories`);
_SetSlotAnnotation(ref("World.Core.TopObject"), "GetSlotCategory", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "ListCategories", _MakeMessageHandler(`function() {
    let categories = new Set();
    for (let slot of this.GetSlotNames()) {
        let cat = this.GetSlotCategory(slot);
        if (cat) categories.add(cat);
    }
    return categories;
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "ListCategories", "category", `categories`);
_SetSlotAnnotation(ref("World.Core.TopObject"), "ListCategories", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "GetSlotsByCategory", _MakeMessageHandler(`function(cat) {
    return this.GetSlotNames().filter(slot => this.GetSlotCategory(slot) == cat)
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "GetSlotsByCategory", "category", `categories`);
_SetSlotAnnotation(ref("World.Core.TopObject"), "GetSlotsByCategory", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "GetSlotAnnotations", _MakeMessageHandler(`function(slot) {
    return _GetSlotAnnotations(this, slot)
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "GetSlotAnnotations", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.TopObject"), "SetModule", _MakeMessageHandler(`function(module) {
    for (let slot of this.GetSlotNames()) {
        this.SetSlotModule(slot, module);
    }
}`));
_SetSlotAnnotation(ref("World.Core.TopObject"), "SetModule", "module", ref("World.Modules.init"));

_AddSlot(ref("World"), "Core", (function() {
            let object = ref("World.Core");
            _SetAnnotation(object, "name", `Core`)
_SetAnnotation(object, "description", `A collection of core objects that should exist in every world.`)
_SetAnnotation(object, "creator", ref("World"))
_SetAnnotation(object, "creatorSlot", `Core`)

            return object;
        })());
_SetSlotAnnotation(ref("World"), "Core", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core"), "parent", ref("World.Core.Namespace"));
_SetSlotAnnotation(ref("World.Core"), "parent", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core"), "TopObject", (function() {
            let object = ref("World.Core.TopObject");
            _SetAnnotation(object, "name", `TopObject`)
_SetAnnotation(object, "description", `TopObject at the top of the inheritance heirarchy. All objects should descend from this.`)
_SetAnnotation(object, "creator", ref("World.Core"))
_SetAnnotation(object, "creatorSlot", `TopObject`)

            return object;
        })());
_SetSlotAnnotation(ref("World.Core"), "TopObject", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core"), "Namespace", (function() {
            let object = ref("World.Core.Namespace");
            _SetAnnotation(object, "name", `Namespace`)
_SetAnnotation(object, "description", `A namespace is a logical grouping of objects. It is a distinct concept from modules.`)
_SetAnnotation(object, "creator", ref("World.Core"))
_SetAnnotation(object, "creatorSlot", `Namespace`)

            return object;
        })());
_SetSlotAnnotation(ref("World.Core"), "Namespace", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core"), "Module", (function() {
            let object = ref("World.Core.Module");
            _SetAnnotation(object, "name", `Module`)
_SetAnnotation(object, "description", `The traits object for modules.`)
_SetAnnotation(object, "creator", ref("World.Core"))
_SetAnnotation(object, "creatorSlot", `Module`)

            return object;
        })());
_SetSlotAnnotation(ref("World.Core"), "Module", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.Module"), "parent", ref("World.Core.TopObject"));
_SetSlotAnnotation(ref("World.Core.Module"), "parent", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.Module"), "FindSlots", _MakeMessageHandler(`function() {
  // Get all slots in objects tagged with the module.
  let visited = new Set();
  let slots = [];

  var findSlots = (object) => {
    if(!_IsProtoObject(object)) return;
    if(visited.has(object)) return;

    visited.add(object);
    for(let slot of object.GetSlotNames()) {
      if (_GetSlotAnnotation(object, slot, 'module') == this) {
        slots.push({object, slot});
      }
      findSlots(object[slot]);
    }
  }

  findSlots(World);
  return slots;
}`));
_SetSlotAnnotation(ref("World.Core.Module"), "FindSlots", "module", ref("World.Modules.init"));
_SetSlotAnnotation(ref("World.Core.Module"), "FindSlots", "description", `Find all slots that have been annotated with this module.`);

_AddSlot(ref("World.Core.Module"), "GenerateCode", _MakeMessageHandler(`function() {
  let slots = this.FindSlots();

  let code = this.prelude;
  for (let {object, slot} of slots) {
    let path = this.TracePath(object);

    let value = object[slot];
    let objpath = path.join('.');

    let valueExpr = null;
    if(_IsProtoObject(value) && _GetAnnotation(value, 'creator') == object && _GetAnnotation(value, 'creatorSlot') == slot) {
        let path = this.TracePath(value);
        
        let objAnnotations = "";
        for (let annotation of _GetAnnotations(value)) {
            let annotationVal = _GetAnnotation(value, annotation);
            objAnnotations += \`_SetAnnotation(object, "\${annotation}", \${this.GenerateValueExpression(annotationVal)})\\n\`;
        }
        
        valueExpr = \`(function() {
            let object = ref("\${path.join('.')}");
            \${objAnnotations}
            return object;
        })()\`;
    } else {
        valueExpr = this.GenerateValueExpression(value)
    }
    code += \`_AddSlot(ref("\${objpath}"), "\${slot}", \${valueExpr});\\n\`
    
    let annotations = object.GetSlotAnnotations(slot);
    for (let annotation of annotations) {
        let value = object.GetSlotAnnotation(slot, annotation);
        let valueExpr = this.GenerateValueExpression(value);
        code += \`_SetSlotAnnotation(ref("\${objpath}"), "\${slot}", "\${annotation}", \${valueExpr});\\n\`
    }

    code += '\\n';
  }

  return code;
}`));
_SetSlotAnnotation(ref("World.Core.Module"), "GenerateCode", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.Module"), "TracePath", _MakeMessageHandler(`function(object) {
    if (object == World) return ['World'];
    else {
        let creator = _GetAnnotation(object, 'creator');
        let creatorSlot = _GetAnnotation(object, 'creatorSlot');
        if (!creator || !creatorSlot)
            throw new Error(\`\${object.ToString()} missing creator slot.\`);
        if (creator[creatorSlot] != object)
            throw new Error(\`\${object.ToString()}'s creator slot doesn't actually point to it.\`);
        
        var path = this.TracePath(creator);
        path.push(creatorSlot);
        return path;
    }
}`));
_SetSlotAnnotation(ref("World.Core.Module"), "TracePath", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.Module"), "prelude", `function ref(path) {
    var parts = path.split('.');
	var current = window;
	for(let part of parts) {
	  current = (current[part] = current[part] || _EmptyObject());
    }
	return current;
}

`);
_SetSlotAnnotation(ref("World.Core.Module"), "prelude", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Core.Module"), "GenerateValueExpression", _MakeMessageHandler(`function(value) {
    if (_IsMessageHandler(value)) {
      let handlerCode = _GetMessageHandlerCode(value);
      let escapedCode = escapeTemplateString(handlerCode);
      return \`_MakeMessageHandler(\${escapedCode})\`
    } else if (_IsProtoObject(value)) {
      return \`ref("\${this.TracePath(value).join('.')}")\`;
    } else if (typeof value == "string") {
        return escapeTemplateString(value);
    } else if (typeof value == "number") {
        return JSON.stringify(value);
    } else {
      throw new Error(\`Encountered an object of Unknown type.\`);
    }
}`));
_SetSlotAnnotation(ref("World.Core.Module"), "GenerateValueExpression", "module", ref("World.Modules.init"));

_AddSlot(ref("World"), "Modules", (function() {
            let object = ref("World.Modules");
            _SetAnnotation(object, "name", `Modules`)
_SetAnnotation(object, "description", `An object that contains all of the modules currently loaded into the program. You can launch modules from here in order to write them out to a file.`)
_SetAnnotation(object, "creator", ref("World"))
_SetAnnotation(object, "creatorSlot", `Modules`)

            return object;
        })());
_SetSlotAnnotation(ref("World"), "Modules", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Modules"), "init", (function() {
            let object = ref("World.Modules.init");
            _SetAnnotation(object, "name", `InitModule`)
_SetAnnotation(object, "creator", ref("World.Modules"))
_SetAnnotation(object, "creatorSlot", `init`)

            return object;
        })());
_SetSlotAnnotation(ref("World.Modules"), "init", "module", ref("World.Modules.init"));

_AddSlot(ref("World.Modules.init"), "parent", ref("World.Core.Module"));
_SetSlotAnnotation(ref("World.Modules.init"), "parent", "module", ref("World.Modules.init"));

