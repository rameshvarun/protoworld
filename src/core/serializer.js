const Replicator = require('replicator');
const replicator = new Replicator({
    serialize (val) {
        return JSON.stringify(val, undefined, 2);
    },
    deserialize: x => x
});

import {getHandlerCode, isMessageHandler, makeMessageHandler} from './MessageHandler';

replicator.addTransforms([
  {
    type: 'ProtoObject',
    shouldTransform (type, val) {
      return type == "object" && val !== null && val.__isProtoObject__;
    },
    toSerializable (val) {
      // First, we filter out slot values that are annotated with "noserialize"
      let filtered_values = {};
      for(let slot of _GetSlotNames(val)) {
        if(_GetSlotAnnotation(val, slot, 'transient') !== true) {
          filtered_values[slot] = val.__repr__.slot_values[slot];
        }
      }

      // Use the existing __repr__, but override slot_values.
      return {
        ...val.__repr__,
        slot_values: filtered_values,
      };
    },
    fromSerializable (val){
      return _ObjectFromRepr(val);
    }
  },
  {
    type: 'MessageHandler',
    shouldTransform (type, val) {
      return type == "function" && isMessageHandler(val);
    },
    toSerializable (val) {
      return getHandlerCode(val);
    },
    fromSerializable (val){
      return makeMessageHandler(val);
    }
  },
]);

export function serialize(root) {
  return replicator.encode(root);
}

export function deserialize(root) {
  return replicator.decode(root);
}
