import {makeMessageHandler} from './core/MessageHandler';
require('./core/object');
import {serialize, deserialize} from './core/serializer';

import ReactDOM from 'react-dom';
import MainLoop from 'mainloop.js';

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

import brace from 'brace';
import 'brace/mode/jsx';
import 'brace/theme/monokai';
import AceEditor from 'react-ace';
window.AceEditor = AceEditor;

window._SaveImage = function() {
  return serialize(RootPackage);
}

window._LoadImage = function(json) {
  window.RootPackage = deserialize(json);
}

window.RootPackage = deserialize(require('./defaultimage.json'));

window.FileSaver = require('file-saver');
window.React = require('react');

window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = 'If you leave before saving, your changes will be lost.';
    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});


window.h = React.createElement

window.jsesc = require('jsesc');

MainLoop.setUpdate(function(dt) {
  RootPackage.InterfacePackage.WindowManager.Update(dt)
}).setDraw(function() {
  var tree = RootPackage.InterfacePackage.WindowManager.Render();
  ReactDOM.render(tree, document.getElementById('root'));
}).start();
