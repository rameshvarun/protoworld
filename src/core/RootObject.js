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
  }
};


window.makeObjectFromRepr = function(repr) {
  return new Proxy(repr, ObjectLookupHandler);
}

const RootObjectRepr = {
    annotations: {},
    slot_values: {
      AddSlot: makeMessageHandler(`function(name, value) {
        this.__repr__.slot_values.name = value;
      }`),
      Extend: makeMessageHandler(`function() {
        let repr = {
          slot_values: {
            parent: this
          },
          slot_annotations: {},
          prototype_slots: ['parent']
        };
        return makeObjectFromRepr(repr);
      }`),
    },
    slot_annotations: {},
    prototype_slots: []
}

const RootObject = makeObjectFromRepr(RootObjectRepr);
export default RootObject;
