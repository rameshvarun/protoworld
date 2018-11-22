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

import ErrorBoundary from 'react-error-boundary';
window.ErrorBoundary = ErrorBoundary;

window.PIXI = require('pixi.js');

window.Prettier = require("prettier/standalone");
window.PrettierBabylon = require("prettier/parser-babylon");

window._SaveImage = function() {
  return serialize(World);
}

window._LoadImage = function(json) {
  window.World = deserialize(json);
}

require('./modules/init.js')
require('./modules/interface.js')
require('./modules/random.js')
require('./modules/manual.js')
require('./modules/tools.js')
require('./modules/math.js')
require('./modules/protopixi.js')


window.FileSaver = require('file-saver');
window.React = require('react');

// MobileDetect
var MobileDetect = require('mobile-detect');
window.MobileDetect = new MobileDetect(window.navigator.userAgent);

window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = 'If you leave before saving, your changes will be lost.';
    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});


window.h = React.createElement

import Console from 'react-console-component';
import 'react-console-component/main.css';
window.ReactConsole = Console;

window.escapeTemplateString = require('escape-template-string');

window.uuid = {
  v1: require('uuid/v1'),
  v4: require('uuid/v4')
}

MainLoop.setUpdate(function(dt) {
  World.Interface.WindowManager.Update(dt)
}).setDraw(function() {
  var tree = World.Interface.WindowManager.Render();
  ReactDOM.render(tree, document.getElementById('root'));
}).start();

let manualViewer = World.Manual.ManualViewer.New();
manualViewer.left = 60;
manualViewer.top = 60;
manualViewer.Open();
