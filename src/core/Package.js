export default class Package {
  constructor() {
    this.subpackages = [];
    this.objects = [];
  }

  AddObject(object) {
    this.objects.push(object);
  }
}
