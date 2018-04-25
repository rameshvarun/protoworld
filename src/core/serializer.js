const Replicator = require('replicator');
const replicator = new Replicator({
    serialize (val) {
        return JSON.stringify(val, undefined, 2);
    },
    deserialize: JSON.parse
});

import {getHandlerCode, isMessageHandler, makeMessageHandler} from './MessageHandler';

replicator.addTransforms([
  {
    type: 'ProtoObject',
    shouldTransform (type, val) {
      return type == "object" && val.__isProtoObject__;
    },
    toSerializable (val) {
      return val.__repr__;
    },
    fromSerializable (val){
      return makeObjectFromRepr(val);
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
      return makeMessageHandler;
    }
  },
]);

export function serialize(root) {
  return replicator.encode(root);
}

export function deserialize(root) {
  return replicator.decode(root);
}
