function ref(path) {
    var parts = path.split('.');
	var current = window;
	for(let part of parts) {
	  current = (current[part] = current[part] || _EmptyObject());
    }
	return current;
}

_AddSlot(ref("World.Modules"), "random", (function() {
            let object = ref("World.Modules.random");
            _SetAnnotation(object, "name", `RandomModule`)
_SetAnnotation(object, "creator", ref("World.Modules"))
_SetAnnotation(object, "creatorSlot", `random`)

            return object;
        })());
_SetSlotAnnotation(ref("World.Modules"), "random", "module", ref("World.Modules.random"));

_AddSlot(ref("World.Modules.random"), "parent", ref("World.Core.Module"));
_AddPrototypeSlot(ref("World.Modules.random"), "parent")
_SetSlotAnnotation(ref("World.Modules.random"), "parent", "module", ref("World.Modules.random"));

_AddSlot(ref("World"), "Random", (function() {
            let object = ref("World.Random");
            _SetAnnotation(object, "name", `Random`)
_SetAnnotation(object, "description", `Utilities for generating random values.`)
_SetAnnotation(object, "creator", ref("World"))
_SetAnnotation(object, "creatorSlot", `Random`)

            return object;
        })());
_SetSlotAnnotation(ref("World"), "Random", "module", ref("World.Modules.random"));

_AddSlot(ref("World.Random"), "parent", ref("World.Core.TopObject"));
_AddPrototypeSlot(ref("World.Random"), "parent")
_SetSlotAnnotation(ref("World.Random"), "parent", "module", ref("World.Modules.random"));

_AddSlot(ref("World.Random"), "Chance", _MakeMessageHandler(`function(prob = 0.5) {
    return Math.random() < prob;
}`));
_SetSlotAnnotation(ref("World.Random"), "Chance", "description", `Takes in a probability \`prob\` and returns true with probability \`prob\`.`);
_SetSlotAnnotation(ref("World.Random"), "Chance", "module", ref("World.Modules.random"));

_AddSlot(ref("World.Random"), "Choice", _MakeMessageHandler(`function(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}`));
_SetSlotAnnotation(ref("World.Random"), "Choice", "description", `Takes in an array and returns a random element from that array.`);
_SetSlotAnnotation(ref("World.Random"), "Choice", "module", ref("World.Modules.random"));

_AddSlot(ref("World.Random"), "Uniform", _MakeMessageHandler(`function(min = 0.0, max = 1.0) {
    return Math.random() * (max - min) + min;
}`));
_SetSlotAnnotation(ref("World.Random"), "Uniform", "module", ref("World.Modules.random"));

_AddSlot(ref("World.Random"), "Integer", _MakeMessageHandler(`function(min, max) {
    return Math.floor(this.Uniform(min, max));
}`));
_SetSlotAnnotation(ref("World.Random"), "Integer", "module", ref("World.Modules.random"));

_AddSlot(ref("World.Random"), "CharacterFromString", _MakeMessageHandler(`function(chars) {
    return chars[Math.floor(Math.random() * chars.length)];
}`));
_SetSlotAnnotation(ref("World.Random"), "CharacterFromString", "module", ref("World.Modules.random"));
