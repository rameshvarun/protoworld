import Package from './core/Package';
import ProtoObject from './core/ProtoObject';

const WindowManager = new ProtoObject();
WindowManager.AddSlot('windows', []);

const Window = new ProtoObject();

const rootPackage = new Package();
rootPackage.AddObject(WindowManager);
