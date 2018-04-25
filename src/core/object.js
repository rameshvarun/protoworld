import {makeMessageHandler} from './MessageHandler';

const ObjectLookupHandler = {
  get: function(target, prop, receiver) {
    if (prop === "__repr__") return target;
    if (prop === "__isProtoObject__") return true;

    if (prop in target.slot_values) {
      return Reflect.get(target.slot_values, prop, receiver);
    } else {
      for (let slot of target.prototype_slots) {
        return target.slot_values[slot][prop];
      }
    }
  },
  set: function(target, property, value, receiver) {
    return Reflect.set(target.slot_values, property, value);
  }
};

window._ObjectFromRepr = function(repr) {
  return new Proxy(repr, ObjectLookupHandler);
}

window._EmptyObject = function() {
  return new Proxy({
    annotations: {},
    slot_values: {},
    slot_annotations: {},
    prototype_slots: []
  }, ObjectLookupHandler);
}

window._IsProtoObject = function(obj) {
  return typeof obj == "object" && obj.__isProtoObject__;
}

window._AddSlot = function(object, name, value) {
  object.__repr__.slot_values[name] = value;
}

window._SetAnnotation = function(object, name, value) {
  object.__repr__.annotations[name] = value;
}
window._GetAnnotation = function(object, name) {
  return object.__repr__.annotations[name];
}

window._GetSlotNames = function(object) {
  return Object.keys(object.__repr__.slot_values);
}

window._AddPrototypeSlot = function(object, name) {
  object.__repr__.prototype_slots.push(name)
}
