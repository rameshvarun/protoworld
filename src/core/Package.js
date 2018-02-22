export default class Package {
  constructor() {
    this.docstring = "";
    this.components = new Map();
  }

  AddComponent(name ,object) {
    this.components[name] = object;
  }
}
