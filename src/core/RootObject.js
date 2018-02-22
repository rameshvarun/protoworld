import makeMessageHandler from './MessageHandler';

const ObjectLookupHandler = {
  get: function(target, prop, receiver) {
    if (prop === "__repr__") return target;
    return Reflect.get(target.slot_values, prop, receiver);
  }
};


const RootObjectRepr = {
    slot_values: {
      AddSlot: makeMessageHandler(`function(name, value, prototype = false) {
        this.__repr__.slot_values.name = value;
        if (prototype) this.__repr__.prototype_slots.push(name);
      }`),
      Clone: makeMessageHandler(`function() {
        return {
          slot_values: {
            parent: this
          },
          slot_metadata: {},
          prototype_slots: ['parent']
        }
      }`),
    },
    slot_metadata: {},
    prototype_slots: []
}

const RootObject = new Proxy(RootObjectRepr, ObjectLookupHandler);
export default RootObject;
