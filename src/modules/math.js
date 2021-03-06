/*
MathModule - ProtoWorld Module
Object-oriented Math utilities, include Vector and Matrix classes.
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

let mod = ref("World.Modules.math");

slot(
  "World",
  "Math",
  (function() {
    let object = ref("World.Math");
    _SetAnnotation(object, "name", `Math`);
    _SetAnnotation(object, "description", `Math utilities, including vectors.`);
    _SetAnnotation(object, "creator", ref("World"));
    _SetAnnotation(object, "creatorSlot", `Math`);

    return object;
  })()
);

slot(
  "World.Math",
  "Quat",
  (function() {
    let object = ref("World.Math.Quat");
    _SetAnnotation(object, "creator", ref("World.Math"));
    _SetAnnotation(object, "creatorSlot", `Quat`);

    return object;
  })()
);

slot(
  "World.Math.Quat",
  "New",
  msg(`function(x, y, z, w) {
    let inst = this.Extend();
    inst.x = x;
    inst.y = y;
    inst.z = z;
    inst.w = w;
    return inst;
}`)
);

slot(
  "World.Math.Quat",
  "ToString",
  msg(`function() {
    if (this === World.Math.Quat)
        return "Quat"
    else
        return \`Quat<\${this.x}, \${this.y}, \${this.z}, \${this.w}>\`;
}`)
);

prototype_slot("World.Math.Quat", "parent", ref("World.Core.TopObject"));

slot("World.Math.Quat", "w", 0);

slot("World.Math.Quat", "x", 0);

slot("World.Math.Quat", "y", 0);

slot("World.Math.Quat", "z", 0);

slot(
  "World.Math",
  "Vec2",
  (function() {
    let object = ref("World.Math.Vec2");
    _SetAnnotation(object, "creator", ref("World.Math"));
    _SetAnnotation(object, "creatorSlot", `Vec2`);
    _SetAnnotation(object, "name", `Vec2`);
    _SetAnnotation(object, "description", `A 2 element vector.`);

    return object;
  })()
);

slot(
  "World.Math.Vec2",
  "Add",
  msg(`function(other) {
    return World.Math.Vec2.FromXY(this.x + other.x, this.y + other.y);
}`)
);

slot(
  "World.Math.Vec2",
  "AngleTo",
  msg(`function(other) {
    return Math.acos(this.Dot(other) / (this.Length() * other.Length()));
}`)
);

slot(
  "World.Math.Vec2",
  "DivScalar",
  msg(`function(s) {
    return this.New(this.x / s, this.y / s);
}`)
);

slot(
  "World.Math.Vec2",
  "Dot",
  msg(`function(other) {
    return this.x * other.x + this.y * other.y;
}`)
);

slot(
  "World.Math.Vec2",
  "Length",
  msg(`function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
}`)
);

slot(
  "World.Math.Vec2",
  "New",
  msg(`function(x, y) {
    let inst = this.Extend();
    inst.x = x;
    inst.y = y;
    return inst;
}`)
);

slot(
  "World.Math.Vec2",
  "Normalize",
  msg(`function() {
    return this.DivScalar(this.Length());
}`)
);

slot(
  "World.Math.Vec2",
  "ToString",
  msg(`function() {
    if (this === World.Math.Vec2)
	    return "Vec2";
	else
	    return \`Vec2<\${this.x}, \${this.y}>\`;
}`)
);

prototype_slot("World.Math.Vec2", "parent", ref("World.Core.TopObject"));

slot("World.Math.Vec2", "x", 0);

slot("World.Math.Vec2", "y", 0);

slot(
  "World.Math",
  "Vec3",
  (function() {
    let object = ref("World.Math.Vec3");
    _SetAnnotation(object, "name", `Vec3`);
    _SetAnnotation(object, "creator", ref("World.Math"));
    _SetAnnotation(object, "creatorSlot", `Vec3`);

    return object;
  })()
);

slot(
  "World.Math.Vec3",
  "Add",
  msg(`function(other) {
    return this.New(
        this.x + other.x,
        this.y + other.y,
        this.z + other.z);
}`)
);

slot(
  "World.Math.Vec3",
  "IsInteger",
  msg(`function() {
    return Number.isInteger(this.x) &&
        Number.isInteger(this.y) &&
        Number.isInteger(this.z);
}`)
);

slot(
  "World.Math.Vec3",
  "New",
  msg(`function(x, y, z) {
    let inst = this.Extend();
    inst.x = x;
    inst.y = y;
    inst.z = z;
    return inst;
}`)
);

slot(
  "World.Math.Vec3",
  "Sub",
  msg(`function(other) {
    return this.New(
        this.x - other.x,
        this.y - other.y,
        this.z - other.z);
}`)
);

slot(
  "World.Math.Vec3",
  "ToString",
  msg(`function() {
    if (this === World.Math.Vec3)
	    return "Vec3";
	else
	    return \`Vec3<\${this.x}, \${this.y}, \${this.z}>\`;
}`)
);

slot(
  "World.Math.Vec3",
  "XZ",
  msg(`function() {
    return World.Math.Vec2.New(this.x, this.z);
}`)
);

prototype_slot("World.Math.Vec3", "parent", ref("World.Core.TopObject"));

slot("World.Math.Vec3", "x", 0);

slot("World.Math.Vec3", "y", 0);

slot("World.Math.Vec3", "z", 0);

prototype_slot("World.Math", "parent", ref("World.Core.Namespace"));

slot(
  "World.Modules",
  "math",
  (function() {
    let object = ref("World.Modules.math");
    _SetAnnotation(object, "name", `MathModule`);
    _SetAnnotation(object, "creator", ref("World.Modules"));
    _SetAnnotation(object, "creatorSlot", `math`);
    _SetAnnotation(
      object,
      "description",
      `Object-oriented Math utilities, include Vector and Matrix classes.`
    );

    return object;
  })()
);

prototype_slot("World.Modules.math", "parent", ref("World.Core.Module"));
