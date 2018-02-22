const codeMap = new WeakMap();

export default function makeMessageHandler(code) {
  const impl = eval(`(${code})`);
  codeMap.set(impl, code);
  return impl;
}
