let ref = function(path) {
  var parts = path.split(".");
  var current = window;
  for (let part of parts) {
    current = current[part] = current[part] || _EmptyObject();
  }
  return current;
};

let slot = function(path, name, value) {
  _AddSlot(ref(path), name, value);
};

slot(
  "World.Modules",
  "math",
  (function() {
    let object = ref("World.Modules.math");
    _SetAnnotation(object, "name", `MathModule`);
    _SetAnnotation(object, "creator", ref("World.Modules"));
    _SetAnnotation(object, "creatorSlot", `math`);

    return object;
  })()
);
_SetSlotAnnotation(
  ref("World.Modules"),
  "math",
  "module",
  ref("World.Modules.math")
);

slot("World.Modules.math", "parent", ref("World.Core.Module"));
_AddPrototypeSlot(ref("World.Modules.math"), "parent");
_SetSlotAnnotation(
  ref("World.Modules.math"),
  "parent",
  "module",
  ref("World.Modules.math")
);

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
_SetSlotAnnotation(ref("World"), "Math", "module", ref("World.Modules.math"));

slot("World.Math", "parent", ref("World.Core.Namespace"));
_AddPrototypeSlot(ref("World.Math"), "parent");
_SetSlotAnnotation(
  ref("World.Math"),
  "parent",
  "module",
  ref("World.Modules.math")
);

slot(
  "World.Math",
  "Vec2",
  (function() {
    let object = ref("World.Math.Vec2");
    _SetAnnotation(object, "creator", ref("World.Math"));
    _SetAnnotation(object, "creatorSlot", `Vec2`);

    return object;
  })()
);
_SetSlotAnnotation(
  ref("World.Math"),
  "Vec2",
  "module",
  ref("World.Modules.math")
);

slot("World.Math.Vec2", "parent", ref("World.Core.TopObject"));
_AddPrototypeSlot(ref("World.Math.Vec2"), "parent");
_SetSlotAnnotation(
  ref("World.Math.Vec2"),
  "parent",
  "module",
  ref("World.Modules.math")
);

slot("World.Math.Vec2", "x", 0);
_SetSlotAnnotation(
  ref("World.Math.Vec2"),
  "x",
  "module",
  ref("World.Modules.math")
);

slot("World.Math.Vec2", "y", 0);
_SetSlotAnnotation(
  ref("World.Math.Vec2"),
  "y",
  "module",
  ref("World.Modules.math")
);

slot(
  "World.Math.Vec2",
  "Length",
  _MakeMessageHandler(`function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
}`)
);
_SetSlotAnnotation(
  ref("World.Math.Vec2"),
  "Length",
  "module",
  ref("World.Modules.math")
);

slot(
  "World.Math.Vec2",
  "FromXY",
  _MakeMessageHandler(`function(x, y) {
    let inst = this.Extend();
    inst.x = x;
    inst.y = y;
    return inst;
}`)
);
_SetSlotAnnotation(
  ref("World.Math.Vec2"),
  "FromXY",
  "module",
  ref("World.Modules.math")
);

slot(
  "World.Math.Vec2",
  "Add",
  _MakeMessageHandler(`function(other) {
    return World.Math.Vec2.FromXY(this.x + other.x, this.y + other.y);
}`)
);
_SetSlotAnnotation(
  ref("World.Math.Vec2"),
  "Add",
  "module",
  ref("World.Modules.math")
);

slot(
  "World.Math.Vec2",
  "ToString",
  _MakeMessageHandler(`function() {
    if (this === World.Math.Vec2)
	    return "Vec2";
	else
	    return \`<\${this.x}, \${this.y}>\`;
}`)
);
_SetSlotAnnotation(
  ref("World.Math.Vec2"),
  "ToString",
  "module",
  ref("World.Modules.math")
);

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
_SetSlotAnnotation(
  ref("World.Math"),
  "Vec3",
  "module",
  ref("World.Modules.math")
);

slot("World.Math.Vec3", "parent", ref("World.Core.TopObject"));
_AddPrototypeSlot(ref("World.Math.Vec3"), "parent");
_SetSlotAnnotation(
  ref("World.Math.Vec3"),
  "parent",
  "module",
  ref("World.Modules.math")
);

slot("World.Math.Vec3", "x", 0);
_SetSlotAnnotation(
  ref("World.Math.Vec3"),
  "x",
  "module",
  ref("World.Modules.math")
);

slot("World.Math.Vec3", "y", 0);
_SetSlotAnnotation(
  ref("World.Math.Vec3"),
  "y",
  "module",
  ref("World.Modules.math")
);

slot("World.Math.Vec3", "z", 0);
_SetSlotAnnotation(
  ref("World.Math.Vec3"),
  "z",
  "module",
  ref("World.Modules.math")
);
