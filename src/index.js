import Package from './core/Package';
import RootObject from './core/RootObject';
import MessageHandler from './core/MessageHandler';

import serialize from './core/serialize';

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

const rootPackage = new Package();
rootPackage.AddComponent('RootObject', RootObject);
console.log(serialize(rootPackage));
