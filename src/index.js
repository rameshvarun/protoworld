import RootObject from './core/RootObject';
import MessageHandler from './core/MessageHandler';

import {serialize, deserialize} from './core/serializer';

// const WindowManager = new ProtoObject();
// WindowManager.AddSlot('windows', []);
//
// const Window = new ProtoObject();
// Window.AddSlot('Mount', new MessageHandler(`return function () {
//   WindowManager.push(this);
//   var root = document.createElement("div");
//
//   document.getElementById("screen").appendChild(root);
// })`);
//
// const ReactWindow = Window.Clone();
// const CanvasWindow = Window.Clone();

var PackageTrait = RootObject.Extend();

var PackageCore = PackageTrait.Extend();
PackageCore.AddSlot('TopObject', RootObject);
PackageCore.AddSlot('PackageTrait', PackageTrait);

var PackageRoot = PackageTrait.Extend();
PackageRoot.AddSlot('Core', PackageCore);

window.ProtoRoot = PackageRoot;

var image = serialize(PackageRoot);
console.log(image);
console.log(deserialize(image));
