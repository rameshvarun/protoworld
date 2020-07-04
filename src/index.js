import {makeMessageHandler} from './core/MessageHandler';
require('./core/object');
import {serialize, deserialize} from './core/serializer';

window.React = require('react');
window.h = React.createElement;

import ReactDOM from 'react-dom';
import MainLoop from 'mainloop.js';

import ErrorBoundary from 'react-error-boundary';
window.ErrorBoundary = ErrorBoundary;

function RunExternalLoaders() {
  let promise = Promise.resolve();
  let slots = World.ExternalLoaders.GetSlotNames().filter(s => s != "parent");
  return slots.reduce((accum, slot) =>
    accum.then(() => World.ExternalLoaders[slot]()), promise);
}

window._SaveImage = function() {
  return serialize(World);
}

window._LoadImage = function(json) {
  window.World = deserialize(json);
  RunExternalLoaders();
}

require('./modules/init.js')
require('./modules/interface.js')
require('./modules/random.js')
require('./modules/manual.js')
require('./modules/tools.js')
require('./modules/math.js')
require('./modules/protothree.js')


window.Dropdown = require('react-simple-dropdown')
import 'react-simple-dropdown/styles/Dropdown.css';

window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = 'If you leave before saving, your changes will be lost.';
    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});


import Console from 'react-console-component';
import 'react-console-component/main.css';
window.ReactConsole = Console;

window.escapeTemplateString = require('escape-template-string');

RunExternalLoaders().then(() => {
  document.getElementById('root').innerHTML = "";

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
});
