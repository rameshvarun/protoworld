import Package from './core/Package';
import ProtoObject from './core/ProtoObject';
import MessageHandler from './core/MessageHandler';

const WindowManager = new ProtoObject();
WindowManager.AddSlot('windows', []);

const Window = new ProtoObject();
Window.AddSlot('Mount', new MessageHandler(`return function () {
  WindowManager.push(this);
  var root = document.createElement("div");

  document.getElementById("screen").appendChild(root);
})`);

const ReactWindow = Window.Clone();
const CanvasWindow = Window.Clone();

const rootPackage = new Package();
rootPackage.AddObject(WindowManager);
