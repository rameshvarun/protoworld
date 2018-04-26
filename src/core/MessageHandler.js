var babel = require("@babel/standalone");

const codeMap = new WeakMap();

export function makeMessageHandler(code) {
  let expression = `(${code})`;

  let transformed = babel.transform(expression, {
    "plugins": [
      ["transform-react-jsx", {
        "pragma": "h"
      }]
    ]
  }).code;

  const impl = eval(transformed);
  codeMap.set(impl, code);
  return impl;
}

window._MakeMessageHandler = function(code) {
  return makeMessageHandler(code);
};

window._IsMessageHandler = function(func) {
  return isMessageHandler(func);
}

window._GetMessageHandlerCode = function(func) {
  return getHandlerCode(func);
}

export function isMessageHandler(func) {
  return codeMap.has(func);
}

export function getHandlerCode(func) {
  return codeMap.get(func);
}
