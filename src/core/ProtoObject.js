export class Slot {
  constructor(name, value, transient = false, prototype = false) {
    this.name = name;
    this.value = value;
    this.transient = transient;
    this.prototype = prototype;
  }
}

export default class ProtoObject {
  constructor() {
    this.slots = [];
  }
  AddSlot(name, value) {
    this.slots.push(new Slot(name, value));
  }
}
