import {makeMessageHandler} from './core/MessageHandler';
require('./core/object');
import {serialize, deserialize} from './core/serializer';

import ReactDOM from 'react-dom';
import MainLoop from 'mainloop.js';

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

import Console from 'react-console-component';
import 'react-console-component/main.css';
window.ReactConsole = Console;

window.uuid = {
  v1: require('uuid/v1'),
  v4: require('uuid/v4')
}

MainLoop.setUpdate(function(dt) {
  RootPackage.InterfacePackage.WindowManager.Update(dt)
}).setDraw(function() {
  var tree = RootPackage.InterfacePackage.WindowManager.Render();
  ReactDOM.render(tree, document.getElementById('root'));
}).start();
