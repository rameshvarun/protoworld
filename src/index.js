import {makeMessageHandler} from './core/MessageHandler';
require('./core/object');
import {serialize, deserialize} from './core/serializer';

window.h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');

// const TopObject = _EmptyObject();
// _AddSlot(TopObject, 'AddSlot', _MakeMessageHandler(`function(name, value) {
//   _AddSlot(this, name, value);
// }`));
// _AddSlot(TopObject, 'Extend', _MakeMessageHandler(`function(name, value) {
//   let child = _EmptyObject();
//   _AddSlot(child, 'parent', this)
//   _AddPrototypeSlot(child, 'parent')
//   return child;
// }`));
// _SetAnnotation(TopObject, 'name', 'TopObject')
//
// const TraitsPackage = TopObject.Extend()
// _SetAnnotation(TraitsPackage, 'name', 'TraitsPackage')
//
// const CorePackage = TraitsPackage.Extend()
// _SetAnnotation(CorePackage, 'name', 'CorePackage')
// CorePackage.AddSlot('TopObject', TopObject)
// CorePackage.AddSlot('TraitsPackage', TraitsPackage)
//
// const RootPackage = TraitsPackage.Extend()
// _SetAnnotation(RootPackage, 'name', 'RootPackage')
// RootPackage.AddSlot('CorePackage', CorePackage)

window.writeImage = function() {
  console.log(serialize(RootPackage));
}

window.RootPackage = deserialize(require('./defaultimage.json'));


var tree = RootPackage.InterfacePackage.WindowManager.Render();
var rootNode = createElement(tree);
document.body.appendChild(rootNode);

import MainLoop from 'mainloop.js';

MainLoop.setUpdate(function(dt) {
  RootPackage.InterfacePackage.WindowManager.Update(dt)
}).setDraw(function() {
  var newTree = RootPackage.InterfacePackage.WindowManager.Render();
  var patches = diff(tree, newTree);
  rootNode = patch(rootNode, patches);
  tree = newTree;
}).start();
