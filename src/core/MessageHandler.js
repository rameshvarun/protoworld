const codeMap = new WeakMap();

export function makeMessageHandler(code) {
  const impl = eval(`(${code})`);
  codeMap.set(impl, code);
  return impl;
}

export function isMessageHandler(func) {
  return codeMap.has(func);
}

export function getHandlerCode(func) {
  return codeMap.get(func);
}
