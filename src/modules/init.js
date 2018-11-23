/*
InitModule - ProtoWorld Module
This module contains the core ProtoWorld objects.
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

let mod = ref("World.Modules.init");

slot(
  "World",
  "Core",
  (function() {
    let object = ref("World.Core");
    _SetAnnotation(object, "name", `Core`);
    _SetAnnotation(
      object,
      "description",
      `A collection of core objects that should exist in every world.`
    );
    _SetAnnotation(object, "creator", ref("World"));
    _SetAnnotation(object, "creatorSlot", `Core`);

    return object;
  })()
);

slot(
  "World.Core",
  "Asset",
  (function() {
    let object = ref("World.Core.Asset");
    _SetAnnotation(object, "name", `Asset`);
    _SetAnnotation(
      object,
      "description",
      `An object representing an asset, such as images or meshes.`
    );
    _SetAnnotation(object, "creator", ref("World.Core"));
    _SetAnnotation(object, "creatorSlot", `Asset`);

    return object;
  })()
);

slot(
  "World.Core.Asset",
  "GetBlob",
  msg(`function() {
    if (!(this.blob instanceof Blob)) {
        this.blob = new Blob([this.data]);
        this.SetSlotAnnotation('blob', 'transient', true);
    }
    return this.blob;
}`)
);

slot(
  "World.Core.Asset",
  "GetObjectURL",
  msg(`function() {
    if (!this.objectURL) {
        this.objectURL = URL.createObjectURL(this.GetBlob());
        this.SetSlotAnnotation('objectURL', 'transient', true);
    }
    return this.objectURL;
}`)
);

slot(
  "World.Core.Asset",
  "New",
  msg(`function(data, contentType) {
    let inst = this.Extend();
    inst.data = data;
    inst.contentType = contentType;
    return inst;
}`)
);

prototype_slot("World.Core.Asset", "parent", ref("World.Core.TopObject"));

slot(
  "World.Core.TopObject",
  "AddMessageHandler",
  msg(`function(slot) {
    this.AddSlot(slot, _MakeMessageHandler('function() {\\n}'))
}`)
);

slot(
  "World.Core.TopObject",
  "AddSlot",
  msg(`function(name, value) {
  _AddSlot(this, name, value);
}`),
  {
    description: `Takes in a slot name and value, and creates a slot on this object.`
  }
);

slot(
  "World.Core.TopObject",
  "Extend",
  msg(`function(name, value) {
  let child = _EmptyObject();
  _AddSlot(child, 'parent', this)
  _AddPrototypeSlot(child, 'parent')
  return child;
}`),
  { description: `Creates a new object with this object as a parent.` }
);

slot(
  "World.Core.TopObject",
  "GetAnnotation",
  msg(`
function(name) {
	return _GetAnnotation(this, name);
}
`)
);

slot(
  "World.Core.TopObject",
  "GetCreator",
  msg(`function() {
    return this.GetAnnotation('creator');
}`)
);

slot(
  "World.Core.TopObject",
  "GetDescription",
  msg(`function() {
    return this.GetAnnotation('description');
}`)
);

slot(
  "World.Core.TopObject",
  "GetName",
  msg(`function() {
    return this.GetAnnotation('name');
}`)
);

slot(
  "World.Core.TopObject",
  "GetSlotAnnotation",
  msg(`function(slot, name) {
    return _GetSlotAnnotation(this, slot, name);
}`)
);

slot(
  "World.Core.TopObject",
  "GetSlotAnnotations",
  msg(`function(slot) {
    return _GetSlotAnnotations(this, slot)
}`)
);

slot(
  "World.Core.TopObject",
  "GetSlotCategory",
  msg(`function(slot) {
    return this.GetSlotAnnotation(slot, "category");
}`),
  { category: `categories` }
);

slot(
  "World.Core.TopObject",
  "GetSlotDescription",
  msg(`function(slot) {
    return this.GetSlotAnnotation(slot, 'description')
}`)
);

slot(
  "World.Core.TopObject",
  "GetSlotModule",
  msg(`function(slot) {
    return this.GetSlotAnnotation(slot, "module");
}`)
);

slot(
  "World.Core.TopObject",
  "GetSlotNames",
  msg(`
function() {
	return _GetSlotNames(this);
}
`)
);

slot(
  "World.Core.TopObject",
  "GetSlotsByCategory",
  msg(`function(cat) {
    return this.GetSlotNames().filter(slot => this.GetSlotCategory(slot) == cat)
}`),
  { category: `categories` }
);

slot(
  "World.Core.TopObject",
  "InstanceOf",
  msg(`function(other) {
    let current = this;
    do {
        if (current == other) return true;
        current = current.parent;
    } while (current)
    return false;
}`)
);

slot(
  "World.Core.TopObject",
  "ListCategories",
  msg(`function() {
    let categories = new Set();
    for (let slot of this.GetSlotNames()) {
        let cat = this.GetSlotCategory(slot);
        if (cat) categories.add(cat);
    }
    return categories;
}`),
  { category: `categories` }
);

slot(
  "World.Core.TopObject",
  "ListModules",
  msg(`function() {
    let modules = new Set();
    for (let slot of this.GetSlotNames()) {
        let module = this.GetSlotModule(slot);
        if (module) modules.add(module);
    }
    return modules;
}`)
);

slot(
  "World.Core.TopObject",
  "RemoveSlot",
  msg(`function(name) {
  _RemoveSlot(this, name);
}`)
);

slot(
  "World.Core.TopObject",
  "SetAnnotation",
  msg(`
function(name, value) {
	_SetAnnotation(this, name, value);
}
`)
);

slot(
  "World.Core.TopObject",
  "SetAsCreator",
  msg(`function(slot) {
    this[slot].SetCreator(this, slot);
}`)
);

slot(
  "World.Core.TopObject",
  "SetCreator",
  msg(`function(object, slot) {
  this.SetAnnotation('creator', object);
  this.SetAnnotation('creatorSlot', slot);
}`)
);

slot(
  "World.Core.TopObject",
  "SetDescription",
  msg(`function(desc) {
  this.SetAnnotation('description', desc);
}`)
);

slot(
  "World.Core.TopObject",
  "SetModule",
  msg(`function(module) {
    for (let slot of this.GetSlotNames()) {
        this.SetSlotModule(slot, module);
    }
}`)
);

slot(
  "World.Core.TopObject",
  "SetName",
  msg(`function(name) {
  this.SetAnnotation('name', name);
}`)
);

slot(
  "World.Core.TopObject",
  "SetSlotAnnotation",
  msg(
    `function(slot, name, value) { _SetSlotAnnotation(this, slot, name, value); }`
  )
);

slot(
  "World.Core.TopObject",
  "SetSlotCategory",
  msg(`function(slot, category) {
    this.SetSlotAnnotation(slot, "category", category);
}`),
  { category: `categories` }
);

slot(
  "World.Core.TopObject",
  "SetSlotDescription",
  msg(`function(slot, desc) {
    this.SetSlotAnnotation(slot, "description", desc);
}`)
);

slot(
  "World.Core.TopObject",
  "SetSlotModule",
  msg(`function(slot, module) {
    this.SetSlotAnnotation(slot, 'module', module);
}`)
);

slot(
  "World.Core.TopObject",
  "ToString",
  msg(`
function() {
	return this.GetAnnotation('name') || 'Unnamed Object';
}
`)
);

slot(
  "World.Core",
  "Module",
  (function() {
    let object = ref("World.Core.Module");
    _SetAnnotation(object, "name", `Module`);
    _SetAnnotation(object, "description", `The traits object for modules.`);
    _SetAnnotation(object, "creator", ref("World.Core"));
    _SetAnnotation(object, "creatorSlot", `Module`);

    return object;
  })()
);

slot(
  "World.Core.Module",
  "FindSlots",
  msg(`function() {
  // Get all slots in objects tagged with the module.
  let visited = new Set();
  let slots = [];

  var findSlots = (object) => {
    if(!_IsProtoObject(object)) return;
    if(visited.has(object)) return;

    visited.add(object);

    let objectSlots = object.GetSlotNames();
    objectSlots.sort();

    for(let slot of objectSlots) {
      if (_GetSlotAnnotation(object, slot, 'module') == this) {
        slots.push({object, slot});
      }
      findSlots(object[slot]);
    }
  }

  findSlots(World);
  return slots;
}`),
  { description: `Find all slots that have been annotated with this module.` }
);

slot(
  "World.Core.Module",
  "GenerateCode",
  msg(`function() {
  let slots = this.FindSlots();

  let info = \`/*
\${this.GetName()} - ProtoWorld Module
\${this.GetDescription()}
*/
\`;

  let code = info + this.prelude;
  code += \`let mod = ref("\${this.TracePath(this).join('.')}");\\n\\n\`;
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

    let annotations = object.GetSlotAnnotations(slot).filter(name =>
      name !== "module");
    let annotationObj = '{' + annotations.map(annotation => {
      let value = object.GetSlotAnnotation(slot, annotation);
      let valueExpr = this.GenerateValueExpression(value);
      return \`"\${annotation}": \${valueExpr}\`;
    }).join(',') + '}';

    let annotationArg = "";
    if (annotations.length > 0) {
      annotationArg = \`, \${annotationObj}\`;
    }

    let func = _IsPrototypeSlot(object, slot) ? 'prototype_slot' : 'slot';
    code += \`\${func}("\${objpath}", "\${slot}", \${valueExpr} \${annotationArg});\\n\`
    code += '\\n';
  }

  code = Prettier.format(code, {plugins: [PrettierBabylon]});
  return code;
}`)
);

slot(
  "World.Core.Module",
  "GenerateValueExpression",
  msg(`function(value) {
    if (_IsMessageHandler(value)) {
      let handlerCode = _GetMessageHandlerCode(value);
      let escapedCode = escapeTemplateString(handlerCode);
      return \`msg(\${escapedCode})\`
    } else if (_IsProtoObject(value)) {
      return \`ref("\${this.TracePath(value).join('.')}")\`;
    } else if (typeof value == "string") {
        return escapeTemplateString(value);
    } else if (typeof value == "number") {
        return JSON.stringify(value);
    } else {
      throw new Error(\`Encountered an object of Unknown type.\`);
    }
}`)
);

slot(
  "World.Core.Module",
  "TracePath",
  msg(`function(object) {
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
}`)
);

prototype_slot("World.Core.Module", "parent", ref("World.Core.TopObject"));

slot(
  "World.Core.Module",
  "prelude",
  `
/* BEGIN MODULE PRELUDE */
let ref = function(path) {
  var parts = path.split('.');
  var current = window;
  for(let part of parts) {
    current = (current[part] = current[part] || _EmptyObject());
  }
  return current;
}

let slot = function(path, name, value, annotations = {}) {
  _AddSlot(ref(path), name, value);
  for (let annotation in annotations) {
    _SetSlotAnnotation(ref(path), name, annotation, annotations[annotation]);
  }
  _SetSlotAnnotation(ref(path), name, 'module', mod);
}

let prototype_slot = function(path, name, value, annotations = {}) {
  slot(path, name, value, annotations);
  _AddPrototypeSlot(ref(path), name);
}

let msg = function(code) {
  return _MakeMessageHandler(code);
}
/* END MODULE PRELUDE */

`
);

slot(
  "World.Core",
  "Namespace",
  (function() {
    let object = ref("World.Core.Namespace");
    _SetAnnotation(object, "name", `Namespace`);
    _SetAnnotation(
      object,
      "description",
      `A namespace is a logical grouping of objects. It is a distinct concept from modules.`
    );
    _SetAnnotation(object, "creator", ref("World.Core"));
    _SetAnnotation(object, "creatorSlot", `Namespace`);

    return object;
  })()
);

prototype_slot("World.Core.Namespace", "parent", ref("World.Core.TopObject"));

slot(
  "World.Core",
  "TopObject",
  (function() {
    let object = ref("World.Core.TopObject");
    _SetAnnotation(object, "name", `TopObject`);
    _SetAnnotation(
      object,
      "description",
      `TopObject at the top of the inheritance heirarchy. All objects should descend from this.`
    );
    _SetAnnotation(object, "creator", ref("World.Core"));
    _SetAnnotation(object, "creatorSlot", `TopObject`);

    return object;
  })()
);

prototype_slot("World.Core", "parent", ref("World.Core.Namespace"));

slot(
  "World",
  "Modules",
  (function() {
    let object = ref("World.Modules");
    _SetAnnotation(object, "name", `Modules`);
    _SetAnnotation(
      object,
      "description",
      `An object that contains all of the modules currently loaded into the program. You can launch modules from here in order to write them out to a file.`
    );
    _SetAnnotation(object, "creator", ref("World"));
    _SetAnnotation(object, "creatorSlot", `Modules`);

    return object;
  })()
);

slot(
  "World.Modules",
  "init",
  (function() {
    let object = ref("World.Modules.init");
    _SetAnnotation(object, "name", `InitModule`);
    _SetAnnotation(object, "creator", ref("World.Modules"));
    _SetAnnotation(object, "creatorSlot", `init`);
    _SetAnnotation(
      object,
      "description",
      `This module contains the core ProtoWorld objects.`
    );

    return object;
  })()
);

prototype_slot("World.Modules.init", "parent", ref("World.Core.Module"));

prototype_slot("World.Modules", "parent", ref("World.Core.TopObject"));

slot(
  "World",
  "World",
  (function() {
    let object = ref("World");
    _SetAnnotation(object, "name", `World`);
    _SetAnnotation(
      object,
      "description",
      `The world. All objects in the world should be accessible from here. If not, they will not be persisted in the live image.`
    );
    _SetAnnotation(object, "creator", ref("World"));
    _SetAnnotation(object, "creatorSlot", `World`);

    return object;
  })()
);

prototype_slot("World", "parent", ref("World.Core.Namespace"));
