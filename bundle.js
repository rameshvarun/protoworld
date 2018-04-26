/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = isWidget

function isWidget(w) {
    return w && w.type === "Widget"
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "2"


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var version = __webpack_require__(1)

module.exports = isVirtualNode

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = isThunk

function isThunk(t) {
    return t && t.type === "Thunk"
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = isHook

function isHook(hook) {
    return hook &&
      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var version = __webpack_require__(1)

module.exports = isVirtualText

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = makeMessageHandler;
/* harmony export (immutable) */ __webpack_exports__["b"] = isMessageHandler;
/* harmony export (immutable) */ __webpack_exports__["a"] = getHandlerCode;
const codeMap = new WeakMap();

function makeMessageHandler(code) {
  const impl = eval(`(${code})`);
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

function isMessageHandler(func) {
  return codeMap.has(func);
}

function getHandlerCode(func) {
  return codeMap.get(func);
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var nativeIsArray = Array.isArray
var toString = Object.prototype.toString

module.exports = nativeIsArray || isArray

function isArray(obj) {
    return toString.call(obj) === "[object Array]"
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var version = __webpack_require__(1)

VirtualPatch.NONE = 0
VirtualPatch.VTEXT = 1
VirtualPatch.VNODE = 2
VirtualPatch.WIDGET = 3
VirtualPatch.PROPS = 4
VirtualPatch.ORDER = 5
VirtualPatch.INSERT = 6
VirtualPatch.REMOVE = 7
VirtualPatch.THUNK = 8

module.exports = VirtualPatch

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type)
    this.vNode = vNode
    this.patch = patch
}

VirtualPatch.prototype.version = version
VirtualPatch.prototype.type = "VirtualPatch"


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var isVNode = __webpack_require__(2)
var isVText = __webpack_require__(5)
var isWidget = __webpack_require__(0)
var isThunk = __webpack_require__(3)

module.exports = handleThunk

function handleThunk(a, b) {
    var renderedA = a
    var renderedB = b

    if (isThunk(b)) {
        renderedB = renderThunk(b, a)
    }

    if (isThunk(a)) {
        renderedA = renderThunk(a, null)
    }

    return {
        a: renderedA,
        b: renderedB
    }
}

function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode

    if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous)
    }

    if (!(isVNode(renderedThunk) ||
            isVText(renderedThunk) ||
            isWidget(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = __webpack_require__(35);

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(12)

var applyProperties = __webpack_require__(14)

var isVNode = __webpack_require__(2)
var isVText = __webpack_require__(5)
var isWidget = __webpack_require__(0)
var handleThunk = __webpack_require__(10)

module.exports = createElement

function createElement(vnode, opts) {
    var doc = opts ? opts.document || document : document
    var warn = opts ? opts.warn : null

    vnode = handleThunk(vnode).a

    if (isWidget(vnode)) {
        return vnode.init()
    } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!isVNode(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode)
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName) :
        doc.createElementNS(vnode.namespace, vnode.tagName)

    var props = vnode.properties
    applyProperties(node, props)

    var children = vnode.children

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts)
        if (childNode) {
            node.appendChild(childNode)
        }
    }

    return node
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(11)
var isHook = __webpack_require__(4)

module.exports = applyProperties

function applyProperties(node, props, previous) {
    for (var propName in props) {
        var propValue = props[propName]

        if (propValue === undefined) {
            removeProperty(node, propName, propValue, previous);
        } else if (isHook(propValue)) {
            removeProperty(node, propName, propValue, previous)
            if (propValue.hook) {
                propValue.hook(node,
                    propName,
                    previous ? previous[propName] : undefined)
            }
        } else {
            if (isObject(propValue)) {
                patchObject(node, props, previous, propName, propValue);
            } else {
                node[propName] = propValue
            }
        }
    }
}

function removeProperty(node, propName, propValue, previous) {
    if (previous) {
        var previousValue = previous[propName]

        if (!isHook(previousValue)) {
            if (propName === "attributes") {
                for (var attrName in previousValue) {
                    node.removeAttribute(attrName)
                }
            } else if (propName === "style") {
                for (var i in previousValue) {
                    node.style[i] = ""
                }
            } else if (typeof previousValue === "string") {
                node[propName] = ""
            } else {
                node[propName] = null
            }
        } else if (previousValue.unhook) {
            previousValue.unhook(node, propName, propValue)
        }
    }
}

function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined

    // Set attributes
    if (propName === "attributes") {
        for (var attrName in propValue) {
            var attrValue = propValue[attrName]

            if (attrValue === undefined) {
                node.removeAttribute(attrName)
            } else {
                node.setAttribute(attrName, attrValue)
            }
        }

        return
    }

    if(previousValue && isObject(previousValue) &&
        getPrototype(previousValue) !== getPrototype(propValue)) {
        node[propName] = propValue
        return
    }

    if (!isObject(node[propName])) {
        node[propName] = {}
    }

    var replacer = propName === "style" ? "" : undefined

    for (var k in propValue) {
        var value = propValue[k]
        node[propName][k] = (value === undefined) ? replacer : value
    }
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value)
    } else if (value.__proto__) {
        return value.__proto__
    } else if (value.constructor) {
        return value.constructor.prototype
    }
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_MessageHandler__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_serializer__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mainloop_js__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mainloop_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_mainloop_js__);

__webpack_require__(16);


window.h = __webpack_require__(19);
var diff = __webpack_require__(30);
var patch = __webpack_require__(33);
var createElement = __webpack_require__(39);

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

window._SaveImage = function() {
  return Object(__WEBPACK_IMPORTED_MODULE_1__core_serializer__["b" /* serialize */])(RootPackage);
}

window._LoadImage = function(json) {
  window.RootPackage = Object(__WEBPACK_IMPORTED_MODULE_1__core_serializer__["a" /* deserialize */])(json);
}

window.RootPackage = Object(__WEBPACK_IMPORTED_MODULE_1__core_serializer__["a" /* deserialize */])(__webpack_require__(40));

window.FileSaver = __webpack_require__(41);

var tree = RootPackage.InterfacePackage.WindowManager.Render();
var rootNode = createElement(tree);
document.body.appendChild(rootNode);



__WEBPACK_IMPORTED_MODULE_2_mainloop_js___default.a.setUpdate(function(dt) {
  RootPackage.InterfacePackage.WindowManager.Update(dt)
}).setDraw(function() {
  var newTree = RootPackage.InterfacePackage.WindowManager.Render();
  var patches = diff(tree, newTree);
  rootNode = patch(rootNode, patches);
  tree = newTree;
}).start();


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MessageHandler__ = __webpack_require__(6);


const ObjectLookupHandler = {
  get: function(target, prop, receiver) {
    if (prop === "__repr__") return target;
    if (prop === "__isProtoObject__") return true;

    if (prop in target.slot_values) {
      return Reflect.get(target.slot_values, prop, receiver);
    } else {
      for (let slot of target.prototype_slots) {
        return target.slot_values[slot][prop];
      }
    }
  },
  set: function(target, property, value, receiver) {
    return Reflect.set(target.slot_values, property, value);
  }
};

window._ObjectFromRepr = function(repr) {
  return new Proxy(repr, ObjectLookupHandler);
}

window._EmptyObject = function() {
  return new Proxy({
    annotations: {},
    slot_values: {},
    slot_annotations: {},
    prototype_slots: []
  }, ObjectLookupHandler);
}

window._IsProtoObject = function(obj) {
  return typeof obj == "object" && obj.__isProtoObject__;
}

window._AddSlot = function(object, name, value) {
  object.__repr__.slot_values[name] = value;
}

window._SetAnnotation = function(object, name, value) {
  object.__repr__.annotations[name] = value;
}
window._GetAnnotation = function(object, name) {
  return object.__repr__.annotations[name];
}

window._GetSlotNames = function(object) {
  return Object.keys(object.__repr__.slot_values);
}

window._AddPrototypeSlot = function(object, name) {
  object.__repr__.prototype_slots.push(name)
}


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = serialize;
/* harmony export (immutable) */ __webpack_exports__["a"] = deserialize;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MessageHandler__ = __webpack_require__(6);
const Replicator = __webpack_require__(18);
const replicator = new Replicator({
    serialize (val) {
        return JSON.stringify(val, undefined, 2);
    },
    deserialize: x => x
});



replicator.addTransforms([
  {
    type: 'ProtoObject',
    shouldTransform (type, val) {
      return type == "object" && val.__isProtoObject__;
    },
    toSerializable (val) {
      return val.__repr__;
    },
    fromSerializable (val){
      return _ObjectFromRepr(val);
    }
  },
  {
    type: 'MessageHandler',
    shouldTransform (type, val) {
      return type == "function" && Object(__WEBPACK_IMPORTED_MODULE_0__MessageHandler__["b" /* isMessageHandler */])(val);
    },
    toSerializable (val) {
      return Object(__WEBPACK_IMPORTED_MODULE_0__MessageHandler__["a" /* getHandlerCode */])(val);
    },
    fromSerializable (val){
      return Object(__WEBPACK_IMPORTED_MODULE_0__MessageHandler__["c" /* makeMessageHandler */])(val);
    }
  },
]);

function serialize(root) {
  return replicator.encode(root);
}

function deserialize(root) {
  return replicator.decode(root);
}


/***/ }),
/* 18 */
/***/ (function(module, exports) {

// Const
var TRANSFORMED_TYPE_KEY    = '@t';
var CIRCULAR_REF_KEY        = '@r';
var KEY_REQUIRE_ESCAPING_RE = /^#*@(t|r)$/;

var GLOBAL = (function getGlobal () {
    // NOTE: see http://www.ecma-international.org/ecma-262/6.0/index.html#sec-performeval step 10
    var savedEval = eval;

    return savedEval('this');
})();

var ARRAY_BUFFER_SUPPORTED = typeof ArrayBuffer === 'function';
var MAP_SUPPORTED          = typeof Map === 'function';
var SET_SUPPORTED          = typeof Set === 'function';

var TYPED_ARRAY_CTORS = [
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array'
];


// Saved proto functions
var arrSlice = Array.prototype.slice;


// Default serializer
var JSONSerializer = {
    serialize: function (val) {
        return JSON.stringify(val);
    },

    deserialize: function (val) {
        return JSON.parse(val);
    }
};


// EncodingTransformer
var EncodingTransformer = function (val, transforms) {
    this.references               = val;
    this.transforms               = transforms;
    this.circularCandidates       = [];
    this.circularCandidatesDescrs = [];
    this.circularRefCount         = 0;
};

EncodingTransformer._createRefMark = function (idx) {
    var obj = Object.create(null);

    obj[CIRCULAR_REF_KEY] = idx;

    return obj;
};

EncodingTransformer.prototype._createCircularCandidate = function (val, parent, key) {
    this.circularCandidates.push(val);
    this.circularCandidatesDescrs.push({ parent: parent, key: key, refIdx: -1 });
};

EncodingTransformer.prototype._applyTransform = function (val, parent, key, transform) {
    var result          = Object.create(null);
    var serializableVal = transform.toSerializable(val);

    if (typeof serializableVal === 'object')
        this._createCircularCandidate(val, parent, key);

    result[TRANSFORMED_TYPE_KEY] = transform.type;
    result.data                  = this._handleValue(serializableVal, parent, key);

    return result;
};

EncodingTransformer.prototype._handleArray = function (arr) {
    var result = [];

    for (var i = 0; i < arr.length; i++)
        result[i] = this._handleValue(arr[i], result, i);

    return result;
};

EncodingTransformer.prototype._handlePlainObject = function (obj) {
    var result = Object.create(null);

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var resultKey = KEY_REQUIRE_ESCAPING_RE.test(key) ? '#' + key : key;

            result[resultKey] = this._handleValue(obj[key], result, resultKey);
        }
    }

    return result;
};

EncodingTransformer.prototype._handleObject = function (obj, parent, key) {
    this._createCircularCandidate(obj, parent, key);

    return Array.isArray(obj) ? this._handleArray(obj) : this._handlePlainObject(obj);
};

EncodingTransformer.prototype._ensureCircularReference = function (obj) {
    var circularCandidateIdx = this.circularCandidates.indexOf(obj);

    if (circularCandidateIdx > -1) {
        var descr = this.circularCandidatesDescrs[circularCandidateIdx];

        if (descr.refIdx === -1)
            descr.refIdx = descr.parent ? ++this.circularRefCount : 0;

        return EncodingTransformer._createRefMark(descr.refIdx);
    }

    return null;
};

EncodingTransformer.prototype._handleValue = function (val, parent, key) {
    var type     = typeof val;
    var isObject = type === 'object' && val !== null;

    if (isObject) {
        var refMark = this._ensureCircularReference(val);

        if (refMark)
            return refMark;
    }

    for (var i = 0; i < this.transforms.length; i++) {
        var transform = this.transforms[i];

        if (transform.shouldTransform(type, val))
            return this._applyTransform(val, parent, key, transform);
    }

    if (isObject)
        return this._handleObject(val, parent, key);

    return val;
};

EncodingTransformer.prototype.transform = function () {
    var references = [this._handleValue(this.references, null, null)];

    for (var i = 0; i < this.circularCandidatesDescrs.length; i++) {
        var descr = this.circularCandidatesDescrs[i];

        if (descr.refIdx > 0) {
            references[descr.refIdx] = descr.parent[descr.key];
            descr.parent[descr.key]  = EncodingTransformer._createRefMark(descr.refIdx);
        }
    }

    return references;
};

// DecodingTransform
var DecodingTransformer = function (references, transformsMap) {
    this.references            = references;
    this.transformMap          = transformsMap;
    this.activeTransformsStack = [];
    this.visitedRefs           = Object.create(null);
};

DecodingTransformer.prototype._handlePlainObject = function (obj) {
    var unescaped = Object.create(null);

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            this._handleValue(obj[key], obj, key);

            if (KEY_REQUIRE_ESCAPING_RE.test(key)) {
                // NOTE: use intermediate object to avoid unescaped and escaped keys interference
                // E.g. unescaped "##@t" will be "#@t" which can overwrite escaped "#@t".
                unescaped[key.substring(1)] = obj[key];
                delete obj[key];
            }
        }
    }

    for (var unsecapedKey in unescaped)
        obj[unsecapedKey] = unescaped[unsecapedKey];
};

DecodingTransformer.prototype._handleTransformedObject = function (obj, parent, key) {
    var transformType = obj[TRANSFORMED_TYPE_KEY];
    var transform     = this.transformMap[transformType];

    if (!transform)
        throw new Error('Can\'t find transform for "' + transformType + '" type.');

    this.activeTransformsStack.push(obj);
    this._handleValue(obj.data, obj, 'data');
    this.activeTransformsStack.pop();

    parent[key] = transform.fromSerializable(obj.data);
};

DecodingTransformer.prototype._handleCircularSelfRefDuringTransform = function (refIdx, parent, key) {
    // NOTE: we've hit a hard case: object reference itself during transformation.
    // We can't dereference it since we don't have resulting object yet. And we'll
    // not be able to restore reference lately because we will need to traverse
    // transformed object again and reference might be unreachable or new object contain
    // new circular references. As a workaround we create getter, so once transformation
    // complete, dereferenced property will point to correct transformed object.
    var references = this.references;

    Object.defineProperty(parent, key, {
        val:          void 0,
        configurable: true,
        enumerable:   true,

        get: function () {
            if (this.val === void 0)
                this.val = references[refIdx];

            return this.val;
        },

        set: function (value) {
            this.val = value;
        }
    });
};

DecodingTransformer.prototype._handleCircularRef = function (refIdx, parent, key) {
    if (this.activeTransformsStack.indexOf(this.references[refIdx]) > -1)
        this._handleCircularSelfRefDuringTransform(refIdx, parent, key);

    else {
        if (!this.visitedRefs[refIdx]) {
            this.visitedRefs[refIdx] = true;
            this._handleValue(this.references[refIdx], this.references, refIdx);
        }

        parent[key] = this.references[refIdx];
    }
};

DecodingTransformer.prototype._handleValue = function (val, parent, key) {
    if (typeof val !== 'object' || val === null)
        return;

    var refIdx = val[CIRCULAR_REF_KEY];

    if (refIdx !== void 0)
        this._handleCircularRef(refIdx, parent, key);

    else if (val[TRANSFORMED_TYPE_KEY])
        this._handleTransformedObject(val, parent, key);

    else if (Array.isArray(val)) {
        for (var i = 0; i < val.length; i++)
            this._handleValue(val[i], val, i);
    }

    else
        this._handlePlainObject(val);
};

DecodingTransformer.prototype.transform = function () {
    this.visitedRefs[0] = true;
    this._handleValue(this.references[0], this.references, 0);

    return this.references[0];
};


// Transforms
var builtInTransforms = [
    {
        type: '[[NaN]]',

        shouldTransform: function (type, val) {
            return type === 'number' && isNaN(val);
        },

        toSerializable: function () {
            return '';
        },

        fromSerializable: function () {
            return NaN;
        }
    },

    {
        type: '[[undefined]]',

        shouldTransform: function (type) {
            return type === 'undefined';
        },

        toSerializable: function () {
            return '';
        },

        fromSerializable: function () {
            return void 0;
        }
    },
    {
        type: '[[Date]]',

        shouldTransform: function (type, val) {
            return val instanceof Date;
        },

        toSerializable: function (date) {
            return date.getTime();
        },

        fromSerializable: function (val) {
            var date = new Date();

            date.setTime(val);
            return date;
        }
    },
    {
        type: '[[RegExp]]',

        shouldTransform: function (type, val) {
            return val instanceof RegExp;
        },

        toSerializable: function (re) {
            var result = {
                src:   re.source,
                flags: ''
            };

            if (re.global)
                result.flags += 'g';

            if (re.ignoreCase)
                result.flags += 'i';

            if (re.multiline)
                result.flags += 'm';

            return result;
        },

        fromSerializable: function (val) {
            return new RegExp(val.src, val.flags);
        }
    },

    {
        type: '[[Error]]',

        shouldTransform: function (type, val) {
            return val instanceof Error;
        },

        toSerializable: function (err) {
            return {
                name:    err.name,
                message: err.message,
                stack:   err.stack
            };
        },

        fromSerializable: function (val) {
            var Ctor = GLOBAL[val.name] || Error;
            var err  = new Ctor(val.message);

            err.stack = val.stack;
            return err;
        }
    },

    {
        type: '[[ArrayBuffer]]',

        shouldTransform: function (type, val) {
            return ARRAY_BUFFER_SUPPORTED && val instanceof ArrayBuffer;
        },

        toSerializable: function (buffer) {
            var view = new Int8Array(buffer);

            return arrSlice.call(view);
        },

        fromSerializable: function (val) {
            if (ARRAY_BUFFER_SUPPORTED) {
                var buffer = new ArrayBuffer(val.length);
                var view   = new Int8Array(buffer);

                view.set(val);

                return buffer;
            }

            return val;
        }
    },

    {
        type: '[[TypedArray]]',

        shouldTransform: function (type, val) {
            for (var i = 0; i < TYPED_ARRAY_CTORS.length; i++) {
                var ctorName = TYPED_ARRAY_CTORS[i];

                if (typeof GLOBAL[ctorName] === 'function' && val instanceof GLOBAL[ctorName])
                    return true;
            }

            return false;
        },

        toSerializable: function (arr) {
            return {
                ctorName: arr.constructor.name,
                arr:      arrSlice.call(arr)
            };
        },

        fromSerializable: function (val) {
            return typeof GLOBAL[val.ctorName] === 'function' ? new GLOBAL[val.ctorName](val.arr) : val.arr;
        }
    },

    {
        type: '[[Map]]',

        shouldTransform: function (type, val) {
            return MAP_SUPPORTED && val instanceof Map;
        },

        toSerializable: function (map) {
            var flattenedKVArr = [];

            map.forEach(function (val, key) {
                flattenedKVArr.push(key);
                flattenedKVArr.push(val);
            });

            return flattenedKVArr;
        },

        fromSerializable: function (val) {
            if (MAP_SUPPORTED) {
                // NOTE: new Map(iterable) is not supported by all browsers
                var map = new Map();

                for (var i = 0; i < val.length; i += 2)
                    map.set(val[i], val[i + 1]);

                return map;
            }

            var kvArr = [];

            for (var j = 0; j < val.length; j += 2)
                kvArr.push([val[i], val[i + 1]]);

            return kvArr;
        }
    },

    {
        type: '[[Set]]',

        shouldTransform: function (type, val) {
            return SET_SUPPORTED && val instanceof Set;
        },

        toSerializable: function (set) {
            var arr = [];

            set.forEach(function (val) {
                arr.push(val);
            });

            return arr;
        },

        fromSerializable: function (val) {
            if (SET_SUPPORTED) {
                // NOTE: new Set(iterable) is not supported by all browsers
                var set = new Set();

                for (var i = 0; i < val.length; i++)
                    set.add(val[i]);

                return set;
            }

            return val;
        }
    }
];

// Replicator
var Replicator = module.exports = function (serializer) {
    this.transforms    = [];
    this.transformsMap = Object.create(null);
    this.serializer    = serializer || JSONSerializer;

    this.addTransforms(builtInTransforms);
};

// Manage transforms
Replicator.prototype.addTransforms = function (transforms) {
    transforms = Array.isArray(transforms) ? transforms : [transforms];

    for (var i = 0; i < transforms.length; i++) {
        var transform = transforms[i];

        if (this.transformsMap[transform.type])
            throw new Error('Transform with type "' + transform.type + '" was already added.');

        this.transforms.push(transform);
        this.transformsMap[transform.type] = transform;
    }

    return this;
};

Replicator.prototype.removeTransforms = function (transforms) {
    transforms = Array.isArray(transforms) ? transforms : [transforms];

    for (var i = 0; i < transforms.length; i++) {
        var transform = transforms[i];
        var idx       = this.transforms.indexOf(transform);

        if (idx > -1)
            this.transforms.splice(idx, 1);

        delete this.transformsMap[transform.type];
    }

    return this;
};

Replicator.prototype.encode = function (val) {
    var transformer = new EncodingTransformer(val, this.transforms);
    var references  = transformer.transform();

    return this.serializer.serialize(references);
};

Replicator.prototype.decode = function (val) {
    var references  = this.serializer.deserialize(val);
    var transformer = new DecodingTransformer(references, this.transformsMap);

    return transformer.transform();
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var h = __webpack_require__(20)

module.exports = h


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(7);

var VNode = __webpack_require__(21);
var VText = __webpack_require__(22);
var isVNode = __webpack_require__(2);
var isVText = __webpack_require__(5);
var isWidget = __webpack_require__(0);
var isHook = __webpack_require__(4);
var isVThunk = __webpack_require__(3);

var parseTag = __webpack_require__(23);
var softSetHook = __webpack_require__(25);
var evHook = __webpack_require__(26);

module.exports = h;

function h(tagName, properties, children) {
    var childNodes = [];
    var tag, props, key, namespace;

    if (!children && isChildren(properties)) {
        children = properties;
        props = {};
    }

    props = props || properties || {};
    tag = parseTag(tagName, props);

    // support keys
    if (props.hasOwnProperty('key')) {
        key = props.key;
        props.key = undefined;
    }

    // support namespace
    if (props.hasOwnProperty('namespace')) {
        namespace = props.namespace;
        props.namespace = undefined;
    }

    // fix cursor bug
    if (tag === 'INPUT' &&
        !namespace &&
        props.hasOwnProperty('value') &&
        props.value !== undefined &&
        !isHook(props.value)
    ) {
        props.value = softSetHook(props.value);
    }

    transformProperties(props);

    if (children !== undefined && children !== null) {
        addChild(children, childNodes, tag, props);
    }


    return new VNode(tag, props, childNodes, key, namespace);
}

function addChild(c, childNodes, tag, props) {
    if (typeof c === 'string') {
        childNodes.push(new VText(c));
    } else if (typeof c === 'number') {
        childNodes.push(new VText(String(c)));
    } else if (isChild(c)) {
        childNodes.push(c);
    } else if (isArray(c)) {
        for (var i = 0; i < c.length; i++) {
            addChild(c[i], childNodes, tag, props);
        }
    } else if (c === null || c === undefined) {
        return;
    } else {
        throw UnexpectedVirtualElement({
            foreignObject: c,
            parentVnode: {
                tagName: tag,
                properties: props
            }
        });
    }
}

function transformProperties(props) {
    for (var propName in props) {
        if (props.hasOwnProperty(propName)) {
            var value = props[propName];

            if (isHook(value)) {
                continue;
            }

            if (propName.substr(0, 3) === 'ev-') {
                // add ev-foo support
                props[propName] = evHook(value);
            }
        }
    }
}

function isChild(x) {
    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
}

function isChildren(x) {
    return typeof x === 'string' || isArray(x) || isChild(x);
}

function UnexpectedVirtualElement(data) {
    var err = new Error();

    err.type = 'virtual-hyperscript.unexpected.virtual-element';
    err.message = 'Unexpected virtual child passed to h().\n' +
        'Expected a VNode / Vthunk / VWidget / string but:\n' +
        'got:\n' +
        errorString(data.foreignObject) +
        '.\n' +
        'The parent vnode is:\n' +
        errorString(data.parentVnode)
        '\n' +
        'Suggested fix: change your `h(..., [ ... ])` callsite.';
    err.foreignObject = data.foreignObject;
    err.parentVnode = data.parentVnode;

    return err;
}

function errorString(obj) {
    try {
        return JSON.stringify(obj, null, '    ');
    } catch (e) {
        return String(obj);
    }
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var version = __webpack_require__(1)
var isVNode = __webpack_require__(2)
var isWidget = __webpack_require__(0)
var isThunk = __webpack_require__(3)
var isVHook = __webpack_require__(4)

module.exports = VirtualNode

var noProperties = {}
var noChildren = []

function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName
    this.properties = properties || noProperties
    this.children = children || noChildren
    this.key = key != null ? String(key) : undefined
    this.namespace = (typeof namespace === "string") ? namespace : null

    var count = (children && children.length) || 0
    var descendants = 0
    var hasWidgets = false
    var hasThunks = false
    var descendantHooks = false
    var hooks

    for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
            var property = properties[propName]
            if (isVHook(property) && property.unhook) {
                if (!hooks) {
                    hooks = {}
                }

                hooks[propName] = property
            }
        }
    }

    for (var i = 0; i < count; i++) {
        var child = children[i]
        if (isVNode(child)) {
            descendants += child.count || 0

            if (!hasWidgets && child.hasWidgets) {
                hasWidgets = true
            }

            if (!hasThunks && child.hasThunks) {
                hasThunks = true
            }

            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
                descendantHooks = true
            }
        } else if (!hasWidgets && isWidget(child)) {
            if (typeof child.destroy === "function") {
                hasWidgets = true
            }
        } else if (!hasThunks && isThunk(child)) {
            hasThunks = true;
        }
    }

    this.count = count + descendants
    this.hasWidgets = hasWidgets
    this.hasThunks = hasThunks
    this.hooks = hooks
    this.descendantHooks = descendantHooks
}

VirtualNode.prototype.version = version
VirtualNode.prototype.type = "VirtualNode"


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var version = __webpack_require__(1)

module.exports = VirtualText

function VirtualText(text) {
    this.text = String(text)
}

VirtualText.prototype.version = version
VirtualText.prototype.type = "VirtualText"


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var split = __webpack_require__(24);

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var notClassId = /^\.|#/;

module.exports = parseTag;

function parseTag(tag, props) {
    if (!tag) {
        return 'DIV';
    }

    var noId = !(props.hasOwnProperty('id'));

    var tagParts = split(tag, classIdSplit);
    var tagName = null;

    if (notClassId.test(tagParts[1])) {
        tagName = 'DIV';
    }

    var classes, part, type, i;

    for (i = 0; i < tagParts.length; i++) {
        part = tagParts[i];

        if (!part) {
            continue;
        }

        type = part.charAt(0);

        if (!tagName) {
            tagName = part;
        } else if (type === '.') {
            classes = classes || [];
            classes.push(part.substring(1, part.length));
        } else if (type === '#' && noId) {
            props.id = part.substring(1, part.length);
        }
    }

    if (classes) {
        if (props.className) {
            classes.push(props.className);
        }

        props.className = classes.join(' ');
    }

    return props.namespace ? tagName : tagName.toUpperCase();
}


/***/ }),
/* 24 */
/***/ (function(module, exports) {

/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
module.exports = (function split(undef) {

  var nativeSplit = String.prototype.split,
    compliantExecNpcg = /()??/.exec("")[1] === undef,
    // NPCG: nonparticipating capturing group
    self;

  self = function(str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
      return nativeSplit.call(str, separator, limit);
    }
    var output = [],
      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
      (separator.sticky ? "y" : ""),
      // Firefox 3+
      lastLastIndex = 0,
      // Make `global` and avoid `lastIndex` issues by working with a copy
      separator = new RegExp(separator.source, flags + "g"),
      separator2, match, lastIndex, lastLength;
    str += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
    limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(str)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function() {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undef) {
                match[i] = undef;
              }
            }
          });
        }
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  };

  return self;
})();


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = SoftSetHook;

function SoftSetHook(value) {
    if (!(this instanceof SoftSetHook)) {
        return new SoftSetHook(value);
    }

    this.value = value;
}

SoftSetHook.prototype.hook = function (node, propertyName) {
    if (node[propertyName] !== this.value) {
        node[propertyName] = this.value;
    }
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EvStore = __webpack_require__(27);

module.exports = EvHook;

function EvHook(value) {
    if (!(this instanceof EvHook)) {
        return new EvHook(value);
    }

    this.value = value;
}

EvHook.prototype.hook = function (node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = this.value;
};

EvHook.prototype.unhook = function(node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = undefined;
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var OneVersionConstraint = __webpack_require__(28);

var MY_VERSION = '7';
OneVersionConstraint('ev-store', MY_VERSION);

var hashKey = '__EV_STORE_KEY@' + MY_VERSION;

module.exports = EvStore;

function EvStore(elem) {
    var hash = elem[hashKey];

    if (!hash) {
        hash = elem[hashKey] = {};
    }

    return hash;
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Individual = __webpack_require__(29);

module.exports = OneVersion;

function OneVersion(moduleName, version, defaultValue) {
    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
    var enforceKey = key + '_ENFORCE_SINGLETON';

    var versionValue = Individual(enforceKey, version);

    if (versionValue !== version) {
        throw new Error('Can only have one copy of ' +
            moduleName + '.\n' +
            'You already have version ' + versionValue +
            ' installed.\n' +
            'This means you cannot install version ' + version);
    }

    return Individual(key, defaultValue);
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/*global window, global*/

var root = typeof window !== 'undefined' ?
    window : typeof global !== 'undefined' ?
    global : {};

module.exports = Individual;

function Individual(key, value) {
    if (key in root) {
        return root[key];
    }

    root[key] = value;

    return value;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var diff = __webpack_require__(31)

module.exports = diff


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(7)

var VPatch = __webpack_require__(9)
var isVNode = __webpack_require__(2)
var isVText = __webpack_require__(5)
var isWidget = __webpack_require__(0)
var isThunk = __webpack_require__(3)
var handleThunk = __webpack_require__(10)

var diffProps = __webpack_require__(32)

module.exports = diff

function diff(a, b) {
    var patch = { a: a }
    walk(a, b, patch, 0)
    return patch
}

function walk(a, b, patch, index) {
    if (a === b) {
        return
    }

    var apply = patch[index]
    var applyClear = false

    if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index)
    } else if (b == null) {

        // If a is a widget we will add a remove patch for it
        // Otherwise any child widgets/hooks must be destroyed.
        // This prevents adding two remove patches for a widget.
        if (!isWidget(a)) {
            clearState(a, patch, index)
            apply = patch[index]
        }

        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
    } else if (isVNode(b)) {
        if (isVNode(a)) {
            if (a.tagName === b.tagName &&
                a.namespace === b.namespace &&
                a.key === b.key) {
                var propsPatch = diffProps(a.properties, b.properties)
                if (propsPatch) {
                    apply = appendPatch(apply,
                        new VPatch(VPatch.PROPS, a, propsPatch))
                }
                apply = diffChildren(a, b, patch, apply, index)
            } else {
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
                applyClear = true
            }
        } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
            applyClear = true
        }
    } else if (isVText(b)) {
        if (!isVText(a)) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
            applyClear = true
        } else if (a.text !== b.text) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
        }
    } else if (isWidget(b)) {
        if (!isWidget(a)) {
            applyClear = true
        }

        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
    }

    if (apply) {
        patch[index] = apply
    }

    if (applyClear) {
        clearState(a, patch, index)
    }
}

function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children
    var orderedSet = reorder(aChildren, b.children)
    var bChildren = orderedSet.children

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen

    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i]
        var rightNode = bChildren[i]
        index += 1

        if (!leftNode) {
            if (rightNode) {
                // Excess nodes in b need to be added
                apply = appendPatch(apply,
                    new VPatch(VPatch.INSERT, null, rightNode))
            }
        } else {
            walk(leftNode, rightNode, patch, index)
        }

        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count
        }
    }

    if (orderedSet.moves) {
        // Reorder nodes last
        apply = appendPatch(apply, new VPatch(
            VPatch.ORDER,
            a,
            orderedSet.moves
        ))
    }

    return apply
}

function clearState(vNode, patch, index) {
    // TODO: Make this a single walk, not two
    unhook(vNode, patch, index)
    destroyWidgets(vNode, patch, index)
}

// Patch records for all destroyed widgets must be added because we need
// a DOM node reference for the destroy function
function destroyWidgets(vNode, patch, index) {
    if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(VPatch.REMOVE, vNode, null)
            )
        }
    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
        var children = vNode.children
        var len = children.length
        for (var i = 0; i < len; i++) {
            var child = children[i]
            index += 1

            destroyWidgets(child, patch, index)

            if (isVNode(child) && child.count) {
                index += child.count
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

// Create a sub-patch for thunks
function thunks(a, b, patch, index) {
    var nodes = handleThunk(a, b)
    var thunkPatch = diff(nodes.a, nodes.b)
    if (hasPatches(thunkPatch)) {
        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
    }
}

function hasPatches(patch) {
    for (var index in patch) {
        if (index !== "a") {
            return true
        }
    }

    return false
}

// Execute hooks when two nodes are identical
function unhook(vNode, patch, index) {
    if (isVNode(vNode)) {
        if (vNode.hooks) {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(
                    VPatch.PROPS,
                    vNode,
                    undefinedKeys(vNode.hooks)
                )
            )
        }

        if (vNode.descendantHooks || vNode.hasThunks) {
            var children = vNode.children
            var len = children.length
            for (var i = 0; i < len; i++) {
                var child = children[i]
                index += 1

                unhook(child, patch, index)

                if (isVNode(child) && child.count) {
                    index += child.count
                }
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

function undefinedKeys(obj) {
    var result = {}

    for (var key in obj) {
        result[key] = undefined
    }

    return result
}

// List diff, naive left to right reordering
function reorder(aChildren, bChildren) {
    // O(M) time, O(M) memory
    var bChildIndex = keyIndex(bChildren)
    var bKeys = bChildIndex.keys
    var bFree = bChildIndex.free

    if (bFree.length === bChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(N) time, O(N) memory
    var aChildIndex = keyIndex(aChildren)
    var aKeys = aChildIndex.keys
    var aFree = aChildIndex.free

    if (aFree.length === aChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(MAX(N, M)) memory
    var newChildren = []

    var freeIndex = 0
    var freeCount = bFree.length
    var deletedItems = 0

    // Iterate through a and match a node in b
    // O(N) time,
    for (var i = 0 ; i < aChildren.length; i++) {
        var aItem = aChildren[i]
        var itemIndex

        if (aItem.key) {
            if (bKeys.hasOwnProperty(aItem.key)) {
                // Match up the old keys
                itemIndex = bKeys[aItem.key]
                newChildren.push(bChildren[itemIndex])

            } else {
                // Remove old keyed items
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        } else {
            // Match the item in a with the next free item in b
            if (freeIndex < freeCount) {
                itemIndex = bFree[freeIndex++]
                newChildren.push(bChildren[itemIndex])
            } else {
                // There are no free items in b to match with
                // the free items in a, so the extra free nodes
                // are deleted.
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        }
    }

    var lastFreeIndex = freeIndex >= bFree.length ?
        bChildren.length :
        bFree[freeIndex]

    // Iterate through b and append any new keys
    // O(M) time
    for (var j = 0; j < bChildren.length; j++) {
        var newItem = bChildren[j]

        if (newItem.key) {
            if (!aKeys.hasOwnProperty(newItem.key)) {
                // Add any new keyed items
                // We are adding new items to the end and then sorting them
                // in place. In future we should insert new items in place.
                newChildren.push(newItem)
            }
        } else if (j >= lastFreeIndex) {
            // Add any leftover non-keyed items
            newChildren.push(newItem)
        }
    }

    var simulate = newChildren.slice()
    var simulateIndex = 0
    var removes = []
    var inserts = []
    var simulateItem

    for (var k = 0; k < bChildren.length;) {
        var wantedItem = bChildren[k]
        simulateItem = simulate[simulateIndex]

        // remove items
        while (simulateItem === null && simulate.length) {
            removes.push(remove(simulate, simulateIndex, null))
            simulateItem = simulate[simulateIndex]
        }

        if (!simulateItem || simulateItem.key !== wantedItem.key) {
            // if we need a key in this position...
            if (wantedItem.key) {
                if (simulateItem && simulateItem.key) {
                    // if an insert doesn't put this key in place, it needs to move
                    if (bKeys[simulateItem.key] !== k + 1) {
                        removes.push(remove(simulate, simulateIndex, simulateItem.key))
                        simulateItem = simulate[simulateIndex]
                        // if the remove didn't put the wanted item in place, we need to insert it
                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
                            inserts.push({key: wantedItem.key, to: k})
                        }
                        // items are matching, so skip ahead
                        else {
                            simulateIndex++
                        }
                    }
                    else {
                        inserts.push({key: wantedItem.key, to: k})
                    }
                }
                else {
                    inserts.push({key: wantedItem.key, to: k})
                }
                k++
            }
            // a key in simulate has no matching wanted key, remove it
            else if (simulateItem && simulateItem.key) {
                removes.push(remove(simulate, simulateIndex, simulateItem.key))
            }
        }
        else {
            simulateIndex++
            k++
        }
    }

    // remove all the remaining nodes from simulate
    while(simulateIndex < simulate.length) {
        simulateItem = simulate[simulateIndex]
        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key))
    }

    // If the only moves we have are deletes then we can just
    // let the delete patch remove these items.
    if (removes.length === deletedItems && !inserts.length) {
        return {
            children: newChildren,
            moves: null
        }
    }

    return {
        children: newChildren,
        moves: {
            removes: removes,
            inserts: inserts
        }
    }
}

function remove(arr, index, key) {
    arr.splice(index, 1)

    return {
        from: index,
        key: key
    }
}

function keyIndex(children) {
    var keys = {}
    var free = []
    var length = children.length

    for (var i = 0; i < length; i++) {
        var child = children[i]

        if (child.key) {
            keys[child.key] = i
        } else {
            free.push(i)
        }
    }

    return {
        keys: keys,     // A hash of key name to index
        free: free      // An array of unkeyed item indices
    }
}

function appendPatch(apply, patch) {
    if (apply) {
        if (isArray(apply)) {
            apply.push(patch)
        } else {
            apply = [apply, patch]
        }

        return apply
    } else {
        return patch
    }
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(11)
var isHook = __webpack_require__(4)

module.exports = diffProps

function diffProps(a, b) {
    var diff

    for (var aKey in a) {
        if (!(aKey in b)) {
            diff = diff || {}
            diff[aKey] = undefined
        }

        var aValue = a[aKey]
        var bValue = b[aKey]

        if (aValue === bValue) {
            continue
        } else if (isObject(aValue) && isObject(bValue)) {
            if (getPrototype(bValue) !== getPrototype(aValue)) {
                diff = diff || {}
                diff[aKey] = bValue
            } else if (isHook(bValue)) {
                 diff = diff || {}
                 diff[aKey] = bValue
            } else {
                var objectDiff = diffProps(aValue, bValue)
                if (objectDiff) {
                    diff = diff || {}
                    diff[aKey] = objectDiff
                }
            }
        } else {
            diff = diff || {}
            diff[aKey] = bValue
        }
    }

    for (var bKey in b) {
        if (!(bKey in a)) {
            diff = diff || {}
            diff[bKey] = b[bKey]
        }
    }

    return diff
}

function getPrototype(value) {
  if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(value)
  } else if (value.__proto__) {
    return value.__proto__
  } else if (value.constructor) {
    return value.constructor.prototype
  }
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var patch = __webpack_require__(34)

module.exports = patch


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(12)
var isArray = __webpack_require__(7)

var render = __webpack_require__(13)
var domIndex = __webpack_require__(36)
var patchOp = __webpack_require__(37)
module.exports = patch

function patch(rootNode, patches, renderOptions) {
    renderOptions = renderOptions || {}
    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch
        ? renderOptions.patch
        : patchRecursive
    renderOptions.render = renderOptions.render || render

    return renderOptions.patch(rootNode, patches, renderOptions)
}

function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches)

    if (indices.length === 0) {
        return rootNode
    }

    var index = domIndex(rootNode, patches.a, indices)
    var ownerDocument = rootNode.ownerDocument

    if (!renderOptions.document && ownerDocument !== document) {
        renderOptions.document = ownerDocument
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i]
        rootNode = applyPatch(rootNode,
            index[nodeIndex],
            patches[nodeIndex],
            renderOptions)
    }

    return rootNode
}

function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
        return rootNode
    }

    var newNode

    if (isArray(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
            newNode = patchOp(patchList[i], domNode, renderOptions)

            if (domNode === rootNode) {
                rootNode = newNode
            }
        }
    } else {
        newNode = patchOp(patchList, domNode, renderOptions)

        if (domNode === rootNode) {
            rootNode = newNode
        }
    }

    return rootNode
}

function patchIndices(patches) {
    var indices = []

    for (var key in patches) {
        if (key !== "a") {
            indices.push(Number(key))
        }
    }

    return indices
}


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
// We don't want to read all of the DOM nodes in the tree so we use
// the in-order tree indexing to eliminate recursion down certain branches.
// We only recurse into a DOM node if we know that it contains a child of
// interest.

var noChild = {}

module.exports = domIndex

function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
        return {}
    } else {
        indices.sort(ascending)
        return recurse(rootNode, tree, indices, nodes, 0)
    }
}

function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {}


    if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
            nodes[rootIndex] = rootNode
        }

        var vChildren = tree.children

        if (vChildren) {

            var childNodes = rootNode.childNodes

            for (var i = 0; i < tree.children.length; i++) {
                rootIndex += 1

                var vChild = vChildren[i] || noChild
                var nextIndex = rootIndex + (vChild.count || 0)

                // skip recursion down the tree if there are no nodes down here
                if (indexInRange(indices, rootIndex, nextIndex)) {
                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
                }

                rootIndex = nextIndex
            }
        }
    }

    return nodes
}

// Binary search for an index in the interval [left, right]
function indexInRange(indices, left, right) {
    if (indices.length === 0) {
        return false
    }

    var minIndex = 0
    var maxIndex = indices.length - 1
    var currentIndex
    var currentItem

    while (minIndex <= maxIndex) {
        currentIndex = ((maxIndex + minIndex) / 2) >> 0
        currentItem = indices[currentIndex]

        if (minIndex === maxIndex) {
            return currentItem >= left && currentItem <= right
        } else if (currentItem < left) {
            minIndex = currentIndex + 1
        } else  if (currentItem > right) {
            maxIndex = currentIndex - 1
        } else {
            return true
        }
    }

    return false;
}

function ascending(a, b) {
    return a > b ? 1 : -1
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var applyProperties = __webpack_require__(14)

var isWidget = __webpack_require__(0)
var VPatch = __webpack_require__(9)

var updateWidget = __webpack_require__(38)

module.exports = applyPatch

function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type
    var vNode = vpatch.vNode
    var patch = vpatch.patch

    switch (type) {
        case VPatch.REMOVE:
            return removeNode(domNode, vNode)
        case VPatch.INSERT:
            return insertNode(domNode, patch, renderOptions)
        case VPatch.VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions)
        case VPatch.WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions)
        case VPatch.VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions)
        case VPatch.ORDER:
            reorderChildren(domNode, patch)
            return domNode
        case VPatch.PROPS:
            applyProperties(domNode, patch, vNode.properties)
            return domNode
        case VPatch.THUNK:
            return replaceRoot(domNode,
                renderOptions.patch(domNode, patch, renderOptions))
        default:
            return domNode
    }
}

function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode

    if (parentNode) {
        parentNode.removeChild(domNode)
    }

    destroyWidget(domNode, vNode);

    return null
}

function insertNode(parentNode, vNode, renderOptions) {
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode) {
        parentNode.appendChild(newNode)
    }

    return parentNode
}

function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode

    if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text)
        newNode = domNode
    } else {
        var parentNode = domNode.parentNode
        newNode = renderOptions.render(vText, renderOptions)

        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode)
        }
    }

    return newNode
}

function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updateWidget(leftVNode, widget)
    var newNode

    if (updating) {
        newNode = widget.update(leftVNode, domNode) || domNode
    } else {
        newNode = renderOptions.render(widget, renderOptions)
    }

    var parentNode = domNode.parentNode

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    if (!updating) {
        destroyWidget(domNode, leftVNode)
    }

    return newNode
}

function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    return newNode
}

function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget(w)) {
        w.destroy(domNode)
    }
}

function reorderChildren(domNode, moves) {
    var childNodes = domNode.childNodes
    var keyMap = {}
    var node
    var remove
    var insert

    for (var i = 0; i < moves.removes.length; i++) {
        remove = moves.removes[i]
        node = childNodes[remove.from]
        if (remove.key) {
            keyMap[remove.key] = node
        }
        domNode.removeChild(node)
    }

    var length = childNodes.length
    for (var j = 0; j < moves.inserts.length; j++) {
        insert = moves.inserts[j]
        node = keyMap[insert.key]
        // this is the weirdest bug i've ever seen in webkit
        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
    }
}

function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
    }

    return newRoot;
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var isWidget = __webpack_require__(0)

module.exports = updateWidget

function updateWidget(a, b) {
    if (isWidget(a) && isWidget(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id
        } else {
            return a.init === b.init
        }
    }

    return false
}


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var createElement = __webpack_require__(13)

module.exports = createElement


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = [{"@t":"ProtoObject","data":{"annotations":{"name":"RootPackage"},"slot_values":{"parent":{"@r":1},"CorePackage":{"@t":"ProtoObject","data":{"annotations":{"name":"CorePackage"},"slot_values":{"parent":{"@r":1},"TopObject":{"@r":2},"TraitsPackage":{"@r":1}},"slot_annotations":{},"prototype_slots":["parent"]}},"InterfacePackage":{"@t":"ProtoObject","data":{"annotations":{"name":"InterfacePackage"},"slot_values":{"parent":{"@r":1},"WindowManager":{"@t":"ProtoObject","data":{"annotations":{"name":"WindowManager"},"slot_values":{"windows":[{"@r":4}],"Render":{"@t":"MessageHandler","data":"function() { return h('div', null, this.windows.map(w => w.Render())); }"},"Update":{"@t":"MessageHandler","data":"function(dt) { this.windows.forEach(w => w.Update(dt)); }"},"AddWindow":{"@t":"MessageHandler","data":"function(window) { this.windows.push(window); }"},"RemoveWindow":{"@t":"MessageHandler","data":"function(window) { this.windows = this.windows.filter(item => item !== window); }"},"parent":{"@r":2}},"slot_annotations":{},"prototype_slots":["parent"]}},"TraitsWindow":{"@r":3},"HandlerEditor":{"@t":"ProtoObject","data":{"annotations":{"name":"HandlerEditor","description":"The default editor for message handlers."},"slot_values":{"parent":{"@r":3},"RenderContent":{"@t":"MessageHandler","data":"function() { return [h('div', null, ['Editing Slot ', this.slot]), h('textarea', {onkeyup: (e) => this.code = e.target.value}, this.code), h('button', {onclick: () => this.target[this.slot] = _MakeMessageHandler(this.code)}, 'Save')]; }"},"New":{"@t":"MessageHandler","data":"function(target, slot) { let inst = this.Extend(); inst.AddSlot('target', target); inst.AddSlot('slot', slot); inst.AddSlot('code', _GetMessageHandlerCode(target[slot])); return inst; }"},"GetTitle":{"@t":"MessageHandler","data":"function() {\n return \"HandlerEditor: \" + this.target.toString() + \"->\" + this.slot;\n}"}},"slot_annotations":{},"prototype_slots":["parent"]}},"ObjectEditor":{"@t":"ProtoObject","data":{"annotations":{"name":"ObjectEditor","description":"The default editor for objects."},"slot_values":{"parent":{"@r":3},"GetTitle":{"@t":"MessageHandler","data":"function() {\n    return 'ObjectEditor: ' + (this.target.GetAnnotation('name') || \"Unnamed Object\");\n}"},"RenderContent":{"@t":"MessageHandler","data":"function() {\n  return h('div', null, [\n    this.target.GetAnnotation('description'),\n    this.target.GetSlotNames().map(slot => {\n      let value = this.target[slot]; \n      if (_IsMessageHandler(value)) {\n        return [h('div', null, slot), h('button', {onclick: () => RootPackage.InterfacePackage.HandlerEditor.New(this.target, slot).Open() }, ['Edit Code'])];\n      }\n      if (_IsProtoObject(value)) {\n        return h('div', null, [slot + \" \", h('button', {onclick: () => value.OpenEditor() }, value.toString()) ]);\n      }\n      return h('div', null, [slot, value.toString() ]);\n   } )]);\n}"},"New":{"@t":"MessageHandler","data":"function(target) { let inst = this.Extend(); inst.AddSlot('target', target); return inst; }"}},"slot_annotations":{},"prototype_slots":["parent"]}},"MainMenu":{"@r":4}},"slot_annotations":{},"prototype_slots":["parent"]}}},"slot_annotations":{},"prototype_slots":["parent"]}},{"@t":"ProtoObject","data":{"annotations":{"name":"TraitsPackage"},"slot_values":{"parent":{"@r":2}},"slot_annotations":{},"prototype_slots":["parent"]}},{"@t":"ProtoObject","data":{"annotations":{"name":"TopObject"},"slot_values":{"AddSlot":{"@t":"MessageHandler","data":"function(name, value) {\n  _AddSlot(this, name, value);\n}"},"Extend":{"@t":"MessageHandler","data":"function(name, value) {\n  let child = _EmptyObject();\n  _AddSlot(child, 'parent', this)\n  _AddPrototypeSlot(child, 'parent')\n  return child;\n}"},"SetAnnotation":{"@t":"MessageHandler","data":"\nfunction(name, value) {\n\t_SetAnnotation(this, name, value);\n}\n"},"GetAnnotation":{"@t":"MessageHandler","data":"\nfunction(name) {\n\treturn _GetAnnotation(this, name);\n}\n"},"GetSlotNames":{"@t":"MessageHandler","data":"\nfunction() {\n\treturn _GetSlotNames(this);\n}\n"},"CreateEditor":{"@t":"MessageHandler","data":"\nfunction() {\n\treturn RootPackage.InterfacePackage.ObjectEditor.New(this);\n}\n"},"OpenEditor":{"@t":"MessageHandler","data":"\nfunction() {\n\treturn this.CreateEditor().Open();\n}\n"}},"slot_annotations":{},"prototype_slots":[]}},{"@t":"ProtoObject","data":{"annotations":{"name":"TraitsWindow"},"slot_values":{"parent":{"@r":2},"top":0,"left":0,"Open":{"@t":"MessageHandler","data":"function() { RootPackage.InterfacePackage.WindowManager.AddWindow(this) }"},"Close":{"@t":"MessageHandler","data":"function() { RootPackage.InterfacePackage.WindowManager.RemoveWindow(this) }"},"Update":{"@t":"MessageHandler","data":"function(dt) {}"},"RenderContent":{"@t":"MessageHandler","data":"function() { }"},"GetTitle":{"@t":"MessageHandler","data":"function() { return 'Untitled Window'; }"},"Render":{"@t":"MessageHandler","data":"function() {\n  return h('div', { style: {\n      resize: 'both',\n      overflow: 'auto',\n      border: '1px solid black',\n      position: 'absolute',\n      'background-color': '#f1f1f1',\n      top: this.top + 'px',\n      left: this.left + 'px',\n      'box-shadow': '5px 5px 5px rgba(0, 0, 0, 0.5)'\n    } }, [\n    h('div', {style: {\n       'background-color': '#285477', padding: '3px', color: 'white', cursor: 'move',\n       display: 'flex', 'justify-content': 'space-between' },\n       onmousedown: (e) => {\n         var x = e.clientX;\n         var y = e.clientY;\n\n         document.onmousemove = (e) => {\n           var dx = e.clientX - x;\n           var dy = e.clientY - y;\n           x = e.clientX;\n           y = e.clientY;\n\n           this.left = this.left + dx;\n           this.top = this.top + dy;\n         };\n\n         document.onmouseup = () => {\n            document.onmouseup = null;\n            document.onmousemove = null;\n         };\n       }}, [\n      this.GetTitle(),\n      h('span', {}, [\n        h('i.fas.fa-search', {title: \"Inspect Window Object\", style: {cursor: 'default', 'margin-right': '5px'}, onclick: () => RootPackage.InterfacePackage.ObjectEditor.New(this).Open() }),\n        h('i.fas.fa-times', {title: \"Close Window\", style: {cursor: 'default'}, onclick: () => this.Close()}),\n        ]),\n    ]),\n    h('div', { style: {padding: '5px'}}, this.RenderContent())\n  ]);\n}"}},"slot_annotations":{},"prototype_slots":["parent"]}},{"@t":"ProtoObject","data":{"annotations":{},"slot_values":{"parent":{"@r":3},"left":0,"top":0,"Render":{"@t":"MessageHandler","data":"function() {\n  return h('div', {\n    style: {\n     'background-color': '#285477',\n     'position': 'fixed',\n     top: '0px',\n     left: '0px',\n     width: '100%',\n     display: 'flex'\n    }\n   }, [\n   h('button', {onclick: () => {\n     var blob = new Blob([_SaveImage(RootPackage)], {type: \"text/plain;charset=utf-8\"});\n     FileSaver.saveAs(blob, \"image.json\");\n   }}, 'Save Image'),\n   h('button', {onclick: () => {\n        var fileInput = document.getElementById('file-input');\n        var changeHandler = function() {\n          var file = fileInput.files[0];\n\n          if (file.name.match(/\\.(txt|json)$/)) {\n            var reader = new FileReader();\n\n            reader.onload = function() {\n              // console.log(JSON.parse(reader.result));\n              _LoadImage(JSON.parse(reader.result));\n            };\n\n            reader.readAsText(file);    \n          } else {\n           alert(\"File not supported, .txt or .json files only\");\n          }\n\n          fileInput.removeEventListener('change', changeHandler);\n          this.value = null;\n        }\n         \n        fileInput.addEventListener('change', changeHandler);\n\n       fileInput.click();\n\n   }}, 'Open Image'),\n   h('button', {onclick: () => {\n     RootPackage.InterfacePackage.ObjectEditor.New(RootPackage).Open();\n   }}, 'Open Root Package'),\n   h('button', null, 'About')\n  ]);\n}"}},"slot_annotations":{},"prototype_slots":["parent"]}}]

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		}
		, is_safari = /constructor/i.test(view.HTMLElement) || view.safari
		, is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
		, arbitrary_revoke_timeout = 1000 * 40 // in ms
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			setTimeout(revoker, arbitrary_revoke_timeout);
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, auto_bom = function(blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
			}
			return blob;
		}
		, FileSaver = function(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, force = type === force_saveable_type
				, object_url
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
						// Safari doesn't allow downloading of blob urls
						var reader = new FileReader();
						reader.onloadend = function() {
							var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
							var popup = view.open(url, '_blank');
							if(!popup) view.location.href = url;
							url=undefined; // release reference before dispatching
							filesaver.readyState = filesaver.DONE;
							dispatch_all();
						};
						reader.readAsDataURL(blob);
						filesaver.readyState = filesaver.INIT;
						return;
					}
					// don't create more object URLs than needed
					if (!object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (force) {
						view.location.href = object_url;
					} else {
						var opened = view.open(object_url, "_blank");
						if (!opened) {
							// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
							view.location.href = object_url;
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
			;
			filesaver.readyState = filesaver.INIT;

			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				setTimeout(function() {
					save_link.href = object_url;
					save_link.download = name;
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}

			fs_error();
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name, no_auto_bom) {
			return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
		}
	;
	// IE 10+ (native saveAs)
	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
		return function(blob, name, no_auto_bom) {
			name = name || blob.name || "download";

			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name);
		};
	}

	FS_proto.abort = function(){};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if (("function" !== "undefined" && __webpack_require__(42) !== null) && (__webpack_require__(43) !== null)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
    return saveAs;
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * mainloop.js 1.0.3-20170529
 *
 * @author Isaac Sukin (http://www.isaacsukin.com/)
 * @license MIT
 */

!function(a){function b(a){if(x=q(b),!(a<e+l)){for(d+=a-e,e=a,t(a,d),a>i+h&&(f=g*j*1e3/(a-i)+(1-g)*f,i=a,j=0),j++,k=0;d>=c;)if(u(c),d-=c,++k>=240){o=!0;break}v(d/c),w(f,o),o=!1}}var c=1e3/60,d=0,e=0,f=60,g=.9,h=1e3,i=0,j=0,k=0,l=0,m=!1,n=!1,o=!1,p="object"==typeof window?window:a,q=p.requestAnimationFrame||function(){var a=Date.now(),b,d;return function(e){return b=Date.now(),d=Math.max(0,c-(b-a)),a=b+d,setTimeout(function(){e(b+d)},d)}}(),r=p.cancelAnimationFrame||clearTimeout,s=function(){},t=s,u=s,v=s,w=s,x;a.MainLoop={getSimulationTimestep:function(){return c},setSimulationTimestep:function(a){return c=a,this},getFPS:function(){return f},getMaxAllowedFPS:function(){return 1e3/l},setMaxAllowedFPS:function(a){return"undefined"==typeof a&&(a=1/0),0===a?this.stop():l=1e3/a,this},resetFrameDelta:function(){var a=d;return d=0,a},setBegin:function(a){return t=a||t,this},setUpdate:function(a){return u=a||u,this},setDraw:function(a){return v=a||v,this},setEnd:function(a){return w=a||w,this},start:function(){return n||(n=!0,x=q(function(a){v(1),m=!0,e=a,i=a,j=0,x=q(b)})),this},stop:function(){return m=!1,n=!1,r(x),this},isRunning:function(){return m}}, true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (a.MainLoop),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof module&&null!==module&&"object"==typeof module.exports&&(module.exports=a.MainLoop)}(this);
//# sourceMappingURL=mainloop.min.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmQ0YTdjZDAyZjExMTFiYTMwNTAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zub2RlL2lzLXdpZGdldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdm5vZGUvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdm5vZGUvaXMtdm5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zub2RlL2lzLXRodW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS9pcy12aG9vay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdm5vZGUvaXMtdnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvTWVzc2FnZUhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3gtaXMtYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdm5vZGUvdnBhdGNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS9oYW5kbGUtdGh1bmsuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLW9iamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2xvYmFsL2RvY3VtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92ZG9tL2NyZWF0ZS1lbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92ZG9tL2FwcGx5LXByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL29iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9zZXJpYWxpemVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZXBsaWNhdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS9oLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92aXJ0dWFsLWh5cGVyc2NyaXB0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS92bm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdm5vZGUvdnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3ZpcnR1YWwtaHlwZXJzY3JpcHQvcGFyc2UtdGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9icm93c2VyLXNwbGl0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92aXJ0dWFsLWh5cGVyc2NyaXB0L2hvb2tzL3NvZnQtc2V0LWhvb2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3ZpcnR1YWwtaHlwZXJzY3JpcHQvaG9va3MvZXYtaG9vay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXYtc3RvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2luZGl2aWR1YWwvb25lLXZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2luZGl2aWR1YWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL2RpZmYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Z0cmVlL2RpZmYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Z0cmVlL2RpZmYtcHJvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3BhdGNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92ZG9tL3BhdGNoLmpzIiwid2VicGFjazovLy9taW4tZG9jdW1lbnQgKGlnbm9yZWQpIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92ZG9tL2RvbS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdmRvbS9wYXRjaC1vcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdmRvbS91cGRhdGUtd2lkZ2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS9jcmVhdGUtZWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGVmYXVsdGltYWdlLmpzb24iLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZpbGUtc2F2ZXIvRmlsZVNhdmVyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtZGVmaW5lLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWFpbmxvb3AuanMvYnVpbGQvbWFpbmxvb3AubWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7O0FDMUQwQjs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixtQkFBbUI7QUFDbkIsd0JBQXdCO0FBQ3hCO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN0REE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7O0FBRTREOztBQUU3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLHVDQUF1QztBQUMvRTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUIsZ0JBQWdCO0FBQ25DOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLDRCQUE0QjtBQUMvQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUJBQW1CLDBDQUEwQztBQUM3RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixnQkFBZ0I7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLDhCQUE4QjtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtCQUErQixnQkFBZ0I7QUFDL0M7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSwyQkFBMkIsZ0JBQWdCO0FBQzNDOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLGdCQUFnQjtBQUMvQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLHVCQUF1QjtBQUMxQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUJBQW1CLHVCQUF1QjtBQUMxQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDOWlCQTs7QUFFQTs7Ozs7Ozs7QUNGQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMLHVCQUF1QixjQUFjO0FBQ3JDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7O0FDeElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixXQUFXO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdkVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQ1RBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsZUFBZSxxQkFBcUI7QUFDcEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsT0FBTztBQUNsQixhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwwQkFBMEI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOzs7Ozs7OztBQ3pHRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDaEJBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDMUJBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNuQkE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OzhDQ3JCQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNsQkE7O0FBRUE7Ozs7Ozs7QUNGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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OztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUMvRUEsZTs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsMkJBQTJCLDBCQUEwQjtBQUNyRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwRkE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTs7Ozs7OztBQ0ZBO0FBQ0E7Ozs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsY0FBYyxvQkFBb0IsdUVBQXVFLEtBQUssd0JBQXdCLEtBQUssTUFBTSxvQkFBb0IsNklBQTZJLHFCQUFxQixtQkFBbUIsc0VBQXNFLE9BQU8sS0FBSyx3REFBd0QsbUJBQW1CLFlBQVksaUNBQWlDLFNBQVMsbUNBQW1DLGdCQUFnQixtQkFBbUIsU0FBUyw2QkFBNkIsYUFBYSw4QkFBOEIsb0VBQW9FLDRCQUE0QixRQUFRLGFBQWEsc0JBQXNCLG1CQUFtQix1QkFBdUIsbUJBQW1CLHFCQUFxQixtQkFBbUIsb0JBQW9CLG1CQUFtQixrQkFBa0IsZ0NBQWdDLDZCQUE2QixRQUFRLGlCQUFpQiwyQkFBMkIsc0JBQXNCLFVBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQSwwTUFBK0o7QUFDMXlDLHdDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmZDRhN2NkMDJmMTExMWJhMzA1MCIsIm1vZHVsZS5leHBvcnRzID0gaXNXaWRnZXRcblxuZnVuY3Rpb24gaXNXaWRnZXQodykge1xuICAgIHJldHVybiB3ICYmIHcudHlwZSA9PT0gXCJXaWRnZXRcIlxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdm5vZGUvaXMtd2lkZ2V0LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCIyXCJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zub2RlL3ZlcnNpb24uanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHZlcnNpb24gPSByZXF1aXJlKFwiLi92ZXJzaW9uXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gaXNWaXJ0dWFsTm9kZVxuXG5mdW5jdGlvbiBpc1ZpcnR1YWxOb2RlKHgpIHtcbiAgICByZXR1cm4geCAmJiB4LnR5cGUgPT09IFwiVmlydHVhbE5vZGVcIiAmJiB4LnZlcnNpb24gPT09IHZlcnNpb25cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zub2RlL2lzLXZub2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gaXNUaHVua1xyXG5cclxuZnVuY3Rpb24gaXNUaHVuayh0KSB7XHJcbiAgICByZXR1cm4gdCAmJiB0LnR5cGUgPT09IFwiVGh1bmtcIlxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zub2RlL2lzLXRodW5rLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gaXNIb29rXG5cbmZ1bmN0aW9uIGlzSG9vayhob29rKSB7XG4gICAgcmV0dXJuIGhvb2sgJiZcbiAgICAgICh0eXBlb2YgaG9vay5ob29rID09PSBcImZ1bmN0aW9uXCIgJiYgIWhvb2suaGFzT3duUHJvcGVydHkoXCJob29rXCIpIHx8XG4gICAgICAgdHlwZW9mIGhvb2sudW5ob29rID09PSBcImZ1bmN0aW9uXCIgJiYgIWhvb2suaGFzT3duUHJvcGVydHkoXCJ1bmhvb2tcIikpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS9pcy12aG9vay5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdmVyc2lvbiA9IHJlcXVpcmUoXCIuL3ZlcnNpb25cIilcblxubW9kdWxlLmV4cG9ydHMgPSBpc1ZpcnR1YWxUZXh0XG5cbmZ1bmN0aW9uIGlzVmlydHVhbFRleHQoeCkge1xuICAgIHJldHVybiB4ICYmIHgudHlwZSA9PT0gXCJWaXJ0dWFsVGV4dFwiICYmIHgudmVyc2lvbiA9PT0gdmVyc2lvblxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdm5vZGUvaXMtdnRleHQuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgY29kZU1hcCA9IG5ldyBXZWFrTWFwKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlTWVzc2FnZUhhbmRsZXIoY29kZSkge1xuICBjb25zdCBpbXBsID0gZXZhbChgKCR7Y29kZX0pYCk7XG4gIGNvZGVNYXAuc2V0KGltcGwsIGNvZGUpO1xuICByZXR1cm4gaW1wbDtcbn1cblxud2luZG93Ll9NYWtlTWVzc2FnZUhhbmRsZXIgPSBmdW5jdGlvbihjb2RlKSB7XG4gIHJldHVybiBtYWtlTWVzc2FnZUhhbmRsZXIoY29kZSk7XG59O1xuXG53aW5kb3cuX0lzTWVzc2FnZUhhbmRsZXIgPSBmdW5jdGlvbihmdW5jKSB7XG4gIHJldHVybiBpc01lc3NhZ2VIYW5kbGVyKGZ1bmMpO1xufVxuXG53aW5kb3cuX0dldE1lc3NhZ2VIYW5kbGVyQ29kZSA9IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgcmV0dXJuIGdldEhhbmRsZXJDb2RlKGZ1bmMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNZXNzYWdlSGFuZGxlcihmdW5jKSB7XG4gIHJldHVybiBjb2RlTWFwLmhhcyhmdW5jKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhhbmRsZXJDb2RlKGZ1bmMpIHtcbiAgcmV0dXJuIGNvZGVNYXAuZ2V0KGZ1bmMpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29yZS9NZXNzYWdlSGFuZGxlci5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbmF0aXZlSXNBcnJheSA9IEFycmF5LmlzQXJyYXlcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcblxubW9kdWxlLmV4cG9ydHMgPSBuYXRpdmVJc0FycmF5IHx8IGlzQXJyYXlcblxuZnVuY3Rpb24gaXNBcnJheShvYmopIHtcbiAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSBcIltvYmplY3QgQXJyYXldXCJcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3gtaXMtYXJyYXkvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB2ZXJzaW9uID0gcmVxdWlyZShcIi4vdmVyc2lvblwiKVxuXG5WaXJ0dWFsUGF0Y2guTk9ORSA9IDBcblZpcnR1YWxQYXRjaC5WVEVYVCA9IDFcblZpcnR1YWxQYXRjaC5WTk9ERSA9IDJcblZpcnR1YWxQYXRjaC5XSURHRVQgPSAzXG5WaXJ0dWFsUGF0Y2guUFJPUFMgPSA0XG5WaXJ0dWFsUGF0Y2guT1JERVIgPSA1XG5WaXJ0dWFsUGF0Y2guSU5TRVJUID0gNlxuVmlydHVhbFBhdGNoLlJFTU9WRSA9IDdcblZpcnR1YWxQYXRjaC5USFVOSyA9IDhcblxubW9kdWxlLmV4cG9ydHMgPSBWaXJ0dWFsUGF0Y2hcblxuZnVuY3Rpb24gVmlydHVhbFBhdGNoKHR5cGUsIHZOb2RlLCBwYXRjaCkge1xuICAgIHRoaXMudHlwZSA9IE51bWJlcih0eXBlKVxuICAgIHRoaXMudk5vZGUgPSB2Tm9kZVxuICAgIHRoaXMucGF0Y2ggPSBwYXRjaFxufVxuXG5WaXJ0dWFsUGF0Y2gucHJvdG90eXBlLnZlcnNpb24gPSB2ZXJzaW9uXG5WaXJ0dWFsUGF0Y2gucHJvdG90eXBlLnR5cGUgPSBcIlZpcnR1YWxQYXRjaFwiXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS92cGF0Y2guanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzVk5vZGUgPSByZXF1aXJlKFwiLi9pcy12bm9kZVwiKVxudmFyIGlzVlRleHQgPSByZXF1aXJlKFwiLi9pcy12dGV4dFwiKVxudmFyIGlzV2lkZ2V0ID0gcmVxdWlyZShcIi4vaXMtd2lkZ2V0XCIpXG52YXIgaXNUaHVuayA9IHJlcXVpcmUoXCIuL2lzLXRodW5rXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gaGFuZGxlVGh1bmtcblxuZnVuY3Rpb24gaGFuZGxlVGh1bmsoYSwgYikge1xuICAgIHZhciByZW5kZXJlZEEgPSBhXG4gICAgdmFyIHJlbmRlcmVkQiA9IGJcblxuICAgIGlmIChpc1RodW5rKGIpKSB7XG4gICAgICAgIHJlbmRlcmVkQiA9IHJlbmRlclRodW5rKGIsIGEpXG4gICAgfVxuXG4gICAgaWYgKGlzVGh1bmsoYSkpIHtcbiAgICAgICAgcmVuZGVyZWRBID0gcmVuZGVyVGh1bmsoYSwgbnVsbClcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhOiByZW5kZXJlZEEsXG4gICAgICAgIGI6IHJlbmRlcmVkQlxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyVGh1bmsodGh1bmssIHByZXZpb3VzKSB7XG4gICAgdmFyIHJlbmRlcmVkVGh1bmsgPSB0aHVuay52bm9kZVxuXG4gICAgaWYgKCFyZW5kZXJlZFRodW5rKSB7XG4gICAgICAgIHJlbmRlcmVkVGh1bmsgPSB0aHVuay52bm9kZSA9IHRodW5rLnJlbmRlcihwcmV2aW91cylcbiAgICB9XG5cbiAgICBpZiAoIShpc1ZOb2RlKHJlbmRlcmVkVGh1bmspIHx8XG4gICAgICAgICAgICBpc1ZUZXh0KHJlbmRlcmVkVGh1bmspIHx8XG4gICAgICAgICAgICBpc1dpZGdldChyZW5kZXJlZFRodW5rKSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGh1bmsgZGlkIG5vdCByZXR1cm4gYSB2YWxpZCBub2RlXCIpO1xuICAgIH1cblxuICAgIHJldHVybiByZW5kZXJlZFRodW5rXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS9oYW5kbGUtdGh1bmsuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcblx0cmV0dXJuIHR5cGVvZiB4ID09PSBcIm9iamVjdFwiICYmIHggIT09IG51bGw7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaXMtb2JqZWN0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9wTGV2ZWwgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6XG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB7fVxudmFyIG1pbkRvYyA9IHJlcXVpcmUoJ21pbi1kb2N1bWVudCcpO1xuXG52YXIgZG9jY3k7XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZG9jY3kgPSBkb2N1bWVudDtcbn0gZWxzZSB7XG4gICAgZG9jY3kgPSB0b3BMZXZlbFsnX19HTE9CQUxfRE9DVU1FTlRfQ0FDSEVANCddO1xuXG4gICAgaWYgKCFkb2NjeSkge1xuICAgICAgICBkb2NjeSA9IHRvcExldmVsWydfX0dMT0JBTF9ET0NVTUVOVF9DQUNIRUA0J10gPSBtaW5Eb2M7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvY2N5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2xvYmFsL2RvY3VtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKFwiZ2xvYmFsL2RvY3VtZW50XCIpXG5cbnZhciBhcHBseVByb3BlcnRpZXMgPSByZXF1aXJlKFwiLi9hcHBseS1wcm9wZXJ0aWVzXCIpXG5cbnZhciBpc1ZOb2RlID0gcmVxdWlyZShcIi4uL3Zub2RlL2lzLXZub2RlLmpzXCIpXG52YXIgaXNWVGV4dCA9IHJlcXVpcmUoXCIuLi92bm9kZS9pcy12dGV4dC5qc1wiKVxudmFyIGlzV2lkZ2V0ID0gcmVxdWlyZShcIi4uL3Zub2RlL2lzLXdpZGdldC5qc1wiKVxudmFyIGhhbmRsZVRodW5rID0gcmVxdWlyZShcIi4uL3Zub2RlL2hhbmRsZS10aHVuay5qc1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUVsZW1lbnRcblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh2bm9kZSwgb3B0cykge1xuICAgIHZhciBkb2MgPSBvcHRzID8gb3B0cy5kb2N1bWVudCB8fCBkb2N1bWVudCA6IGRvY3VtZW50XG4gICAgdmFyIHdhcm4gPSBvcHRzID8gb3B0cy53YXJuIDogbnVsbFxuXG4gICAgdm5vZGUgPSBoYW5kbGVUaHVuayh2bm9kZSkuYVxuXG4gICAgaWYgKGlzV2lkZ2V0KHZub2RlKSkge1xuICAgICAgICByZXR1cm4gdm5vZGUuaW5pdCgpXG4gICAgfSBlbHNlIGlmIChpc1ZUZXh0KHZub2RlKSkge1xuICAgICAgICByZXR1cm4gZG9jLmNyZWF0ZVRleHROb2RlKHZub2RlLnRleHQpXG4gICAgfSBlbHNlIGlmICghaXNWTm9kZSh2bm9kZSkpIHtcbiAgICAgICAgaWYgKHdhcm4pIHtcbiAgICAgICAgICAgIHdhcm4oXCJJdGVtIGlzIG5vdCBhIHZhbGlkIHZpcnR1YWwgZG9tIG5vZGVcIiwgdm5vZGUpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICB2YXIgbm9kZSA9ICh2bm9kZS5uYW1lc3BhY2UgPT09IG51bGwpID9cbiAgICAgICAgZG9jLmNyZWF0ZUVsZW1lbnQodm5vZGUudGFnTmFtZSkgOlxuICAgICAgICBkb2MuY3JlYXRlRWxlbWVudE5TKHZub2RlLm5hbWVzcGFjZSwgdm5vZGUudGFnTmFtZSlcblxuICAgIHZhciBwcm9wcyA9IHZub2RlLnByb3BlcnRpZXNcbiAgICBhcHBseVByb3BlcnRpZXMobm9kZSwgcHJvcHMpXG5cbiAgICB2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hpbGROb2RlID0gY3JlYXRlRWxlbWVudChjaGlsZHJlbltpXSwgb3B0cylcbiAgICAgICAgaWYgKGNoaWxkTm9kZSkge1xuICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChjaGlsZE5vZGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdmRvbS9jcmVhdGUtZWxlbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZShcImlzLW9iamVjdFwiKVxudmFyIGlzSG9vayA9IHJlcXVpcmUoXCIuLi92bm9kZS9pcy12aG9vay5qc1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFwcGx5UHJvcGVydGllc1xuXG5mdW5jdGlvbiBhcHBseVByb3BlcnRpZXMobm9kZSwgcHJvcHMsIHByZXZpb3VzKSB7XG4gICAgZm9yICh2YXIgcHJvcE5hbWUgaW4gcHJvcHMpIHtcbiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXVxuXG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVtb3ZlUHJvcGVydHkobm9kZSwgcHJvcE5hbWUsIHByb3BWYWx1ZSwgcHJldmlvdXMpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzSG9vayhwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgICByZW1vdmVQcm9wZXJ0eShub2RlLCBwcm9wTmFtZSwgcHJvcFZhbHVlLCBwcmV2aW91cylcbiAgICAgICAgICAgIGlmIChwcm9wVmFsdWUuaG9vaykge1xuICAgICAgICAgICAgICAgIHByb3BWYWx1ZS5ob29rKG5vZGUsXG4gICAgICAgICAgICAgICAgICAgIHByb3BOYW1lLFxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA/IHByZXZpb3VzW3Byb3BOYW1lXSA6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpc09iamVjdChwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hPYmplY3Qobm9kZSwgcHJvcHMsIHByZXZpb3VzLCBwcm9wTmFtZSwgcHJvcFZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZVtwcm9wTmFtZV0gPSBwcm9wVmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlUHJvcGVydHkobm9kZSwgcHJvcE5hbWUsIHByb3BWYWx1ZSwgcHJldmlvdXMpIHtcbiAgICBpZiAocHJldmlvdXMpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzVmFsdWUgPSBwcmV2aW91c1twcm9wTmFtZV1cblxuICAgICAgICBpZiAoIWlzSG9vayhwcmV2aW91c1ZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKHByb3BOYW1lID09PSBcImF0dHJpYnV0ZXNcIikge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGF0dHJOYW1lIGluIHByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gXCJzdHlsZVwiKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc3R5bGVbaV0gPSBcIlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcHJldmlvdXNWYWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIG5vZGVbcHJvcE5hbWVdID0gXCJcIlxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlW3Byb3BOYW1lXSA9IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChwcmV2aW91c1ZhbHVlLnVuaG9vaykge1xuICAgICAgICAgICAgcHJldmlvdXNWYWx1ZS51bmhvb2sobm9kZSwgcHJvcE5hbWUsIHByb3BWYWx1ZSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGF0Y2hPYmplY3Qobm9kZSwgcHJvcHMsIHByZXZpb3VzLCBwcm9wTmFtZSwgcHJvcFZhbHVlKSB7XG4gICAgdmFyIHByZXZpb3VzVmFsdWUgPSBwcmV2aW91cyA/IHByZXZpb3VzW3Byb3BOYW1lXSA6IHVuZGVmaW5lZFxuXG4gICAgLy8gU2V0IGF0dHJpYnV0ZXNcbiAgICBpZiAocHJvcE5hbWUgPT09IFwiYXR0cmlidXRlc1wiKSB7XG4gICAgICAgIGZvciAodmFyIGF0dHJOYW1lIGluIHByb3BWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIGF0dHJWYWx1ZSA9IHByb3BWYWx1ZVthdHRyTmFtZV1cblxuICAgICAgICAgICAgaWYgKGF0dHJWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZihwcmV2aW91c1ZhbHVlICYmIGlzT2JqZWN0KHByZXZpb3VzVmFsdWUpICYmXG4gICAgICAgIGdldFByb3RvdHlwZShwcmV2aW91c1ZhbHVlKSAhPT0gZ2V0UHJvdG90eXBlKHByb3BWYWx1ZSkpIHtcbiAgICAgICAgbm9kZVtwcm9wTmFtZV0gPSBwcm9wVmFsdWVcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKCFpc09iamVjdChub2RlW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgbm9kZVtwcm9wTmFtZV0gPSB7fVxuICAgIH1cblxuICAgIHZhciByZXBsYWNlciA9IHByb3BOYW1lID09PSBcInN0eWxlXCIgPyBcIlwiIDogdW5kZWZpbmVkXG5cbiAgICBmb3IgKHZhciBrIGluIHByb3BWYWx1ZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBwcm9wVmFsdWVba11cbiAgICAgICAgbm9kZVtwcm9wTmFtZV1ba10gPSAodmFsdWUgPT09IHVuZGVmaW5lZCkgPyByZXBsYWNlciA6IHZhbHVlXG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRQcm90b3R5cGUodmFsdWUpIHtcbiAgICBpZiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpXG4gICAgfSBlbHNlIGlmICh2YWx1ZS5fX3Byb3RvX18pIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLl9fcHJvdG9fX1xuICAgIH0gZWxzZSBpZiAodmFsdWUuY29uc3RydWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yLnByb3RvdHlwZVxuICAgIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zkb20vYXBwbHktcHJvcGVydGllcy5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHttYWtlTWVzc2FnZUhhbmRsZXJ9IGZyb20gJy4vY29yZS9NZXNzYWdlSGFuZGxlcic7XG5yZXF1aXJlKCcuL2NvcmUvb2JqZWN0Jyk7XG5pbXBvcnQge3NlcmlhbGl6ZSwgZGVzZXJpYWxpemV9IGZyb20gJy4vY29yZS9zZXJpYWxpemVyJztcblxud2luZG93LmggPSByZXF1aXJlKCd2aXJ0dWFsLWRvbS9oJyk7XG52YXIgZGlmZiA9IHJlcXVpcmUoJ3ZpcnR1YWwtZG9tL2RpZmYnKTtcbnZhciBwYXRjaCA9IHJlcXVpcmUoJ3ZpcnR1YWwtZG9tL3BhdGNoJyk7XG52YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJ3ZpcnR1YWwtZG9tL2NyZWF0ZS1lbGVtZW50Jyk7XG5cbi8vIGNvbnN0IFRvcE9iamVjdCA9IF9FbXB0eU9iamVjdCgpO1xuLy8gX0FkZFNsb3QoVG9wT2JqZWN0LCAnQWRkU2xvdCcsIF9NYWtlTWVzc2FnZUhhbmRsZXIoYGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4vLyAgIF9BZGRTbG90KHRoaXMsIG5hbWUsIHZhbHVlKTtcbi8vIH1gKSk7XG4vLyBfQWRkU2xvdChUb3BPYmplY3QsICdFeHRlbmQnLCBfTWFrZU1lc3NhZ2VIYW5kbGVyKGBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuLy8gICBsZXQgY2hpbGQgPSBfRW1wdHlPYmplY3QoKTtcbi8vICAgX0FkZFNsb3QoY2hpbGQsICdwYXJlbnQnLCB0aGlzKVxuLy8gICBfQWRkUHJvdG90eXBlU2xvdChjaGlsZCwgJ3BhcmVudCcpXG4vLyAgIHJldHVybiBjaGlsZDtcbi8vIH1gKSk7XG4vLyBfU2V0QW5ub3RhdGlvbihUb3BPYmplY3QsICduYW1lJywgJ1RvcE9iamVjdCcpXG4vL1xuLy8gY29uc3QgVHJhaXRzUGFja2FnZSA9IFRvcE9iamVjdC5FeHRlbmQoKVxuLy8gX1NldEFubm90YXRpb24oVHJhaXRzUGFja2FnZSwgJ25hbWUnLCAnVHJhaXRzUGFja2FnZScpXG4vL1xuLy8gY29uc3QgQ29yZVBhY2thZ2UgPSBUcmFpdHNQYWNrYWdlLkV4dGVuZCgpXG4vLyBfU2V0QW5ub3RhdGlvbihDb3JlUGFja2FnZSwgJ25hbWUnLCAnQ29yZVBhY2thZ2UnKVxuLy8gQ29yZVBhY2thZ2UuQWRkU2xvdCgnVG9wT2JqZWN0JywgVG9wT2JqZWN0KVxuLy8gQ29yZVBhY2thZ2UuQWRkU2xvdCgnVHJhaXRzUGFja2FnZScsIFRyYWl0c1BhY2thZ2UpXG4vL1xuLy8gY29uc3QgUm9vdFBhY2thZ2UgPSBUcmFpdHNQYWNrYWdlLkV4dGVuZCgpXG4vLyBfU2V0QW5ub3RhdGlvbihSb290UGFja2FnZSwgJ25hbWUnLCAnUm9vdFBhY2thZ2UnKVxuLy8gUm9vdFBhY2thZ2UuQWRkU2xvdCgnQ29yZVBhY2thZ2UnLCBDb3JlUGFja2FnZSlcblxud2luZG93Ll9TYXZlSW1hZ2UgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHNlcmlhbGl6ZShSb290UGFja2FnZSk7XG59XG5cbndpbmRvdy5fTG9hZEltYWdlID0gZnVuY3Rpb24oanNvbikge1xuICB3aW5kb3cuUm9vdFBhY2thZ2UgPSBkZXNlcmlhbGl6ZShqc29uKTtcbn1cblxud2luZG93LlJvb3RQYWNrYWdlID0gZGVzZXJpYWxpemUocmVxdWlyZSgnLi9kZWZhdWx0aW1hZ2UuanNvbicpKTtcblxud2luZG93LkZpbGVTYXZlciA9IHJlcXVpcmUoJ2ZpbGUtc2F2ZXInKTtcblxudmFyIHRyZWUgPSBSb290UGFja2FnZS5JbnRlcmZhY2VQYWNrYWdlLldpbmRvd01hbmFnZXIuUmVuZGVyKCk7XG52YXIgcm9vdE5vZGUgPSBjcmVhdGVFbGVtZW50KHRyZWUpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyb290Tm9kZSk7XG5cbmltcG9ydCBNYWluTG9vcCBmcm9tICdtYWlubG9vcC5qcyc7XG5cbk1haW5Mb29wLnNldFVwZGF0ZShmdW5jdGlvbihkdCkge1xuICBSb290UGFja2FnZS5JbnRlcmZhY2VQYWNrYWdlLldpbmRvd01hbmFnZXIuVXBkYXRlKGR0KVxufSkuc2V0RHJhdyhmdW5jdGlvbigpIHtcbiAgdmFyIG5ld1RyZWUgPSBSb290UGFja2FnZS5JbnRlcmZhY2VQYWNrYWdlLldpbmRvd01hbmFnZXIuUmVuZGVyKCk7XG4gIHZhciBwYXRjaGVzID0gZGlmZih0cmVlLCBuZXdUcmVlKTtcbiAgcm9vdE5vZGUgPSBwYXRjaChyb290Tm9kZSwgcGF0Y2hlcyk7XG4gIHRyZWUgPSBuZXdUcmVlO1xufSkuc3RhcnQoKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge21ha2VNZXNzYWdlSGFuZGxlcn0gZnJvbSAnLi9NZXNzYWdlSGFuZGxlcic7XG5cbmNvbnN0IE9iamVjdExvb2t1cEhhbmRsZXIgPSB7XG4gIGdldDogZnVuY3Rpb24odGFyZ2V0LCBwcm9wLCByZWNlaXZlcikge1xuICAgIGlmIChwcm9wID09PSBcIl9fcmVwcl9fXCIpIHJldHVybiB0YXJnZXQ7XG4gICAgaWYgKHByb3AgPT09IFwiX19pc1Byb3RvT2JqZWN0X19cIikgcmV0dXJuIHRydWU7XG5cbiAgICBpZiAocHJvcCBpbiB0YXJnZXQuc2xvdF92YWx1ZXMpIHtcbiAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQuc2xvdF92YWx1ZXMsIHByb3AsIHJlY2VpdmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgc2xvdCBvZiB0YXJnZXQucHJvdG90eXBlX3Nsb3RzKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQuc2xvdF92YWx1ZXNbc2xvdF1bcHJvcF07XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKHRhcmdldCwgcHJvcGVydHksIHZhbHVlLCByZWNlaXZlcikge1xuICAgIHJldHVybiBSZWZsZWN0LnNldCh0YXJnZXQuc2xvdF92YWx1ZXMsIHByb3BlcnR5LCB2YWx1ZSk7XG4gIH1cbn07XG5cbndpbmRvdy5fT2JqZWN0RnJvbVJlcHIgPSBmdW5jdGlvbihyZXByKSB7XG4gIHJldHVybiBuZXcgUHJveHkocmVwciwgT2JqZWN0TG9va3VwSGFuZGxlcik7XG59XG5cbndpbmRvdy5fRW1wdHlPYmplY3QgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBQcm94eSh7XG4gICAgYW5ub3RhdGlvbnM6IHt9LFxuICAgIHNsb3RfdmFsdWVzOiB7fSxcbiAgICBzbG90X2Fubm90YXRpb25zOiB7fSxcbiAgICBwcm90b3R5cGVfc2xvdHM6IFtdXG4gIH0sIE9iamVjdExvb2t1cEhhbmRsZXIpO1xufVxuXG53aW5kb3cuX0lzUHJvdG9PYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT0gXCJvYmplY3RcIiAmJiBvYmouX19pc1Byb3RvT2JqZWN0X187XG59XG5cbndpbmRvdy5fQWRkU2xvdCA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZSwgdmFsdWUpIHtcbiAgb2JqZWN0Ll9fcmVwcl9fLnNsb3RfdmFsdWVzW25hbWVdID0gdmFsdWU7XG59XG5cbndpbmRvdy5fU2V0QW5ub3RhdGlvbiA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZSwgdmFsdWUpIHtcbiAgb2JqZWN0Ll9fcmVwcl9fLmFubm90YXRpb25zW25hbWVdID0gdmFsdWU7XG59XG53aW5kb3cuX0dldEFubm90YXRpb24gPSBmdW5jdGlvbihvYmplY3QsIG5hbWUpIHtcbiAgcmV0dXJuIG9iamVjdC5fX3JlcHJfXy5hbm5vdGF0aW9uc1tuYW1lXTtcbn1cblxud2luZG93Ll9HZXRTbG90TmFtZXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iamVjdC5fX3JlcHJfXy5zbG90X3ZhbHVlcyk7XG59XG5cbndpbmRvdy5fQWRkUHJvdG90eXBlU2xvdCA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZSkge1xuICBvYmplY3QuX19yZXByX18ucHJvdG90eXBlX3Nsb3RzLnB1c2gobmFtZSlcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvcmUvb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBSZXBsaWNhdG9yID0gcmVxdWlyZSgncmVwbGljYXRvcicpO1xuY29uc3QgcmVwbGljYXRvciA9IG5ldyBSZXBsaWNhdG9yKHtcbiAgICBzZXJpYWxpemUgKHZhbCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsLCB1bmRlZmluZWQsIDIpO1xuICAgIH0sXG4gICAgZGVzZXJpYWxpemU6IHggPT4geFxufSk7XG5cbmltcG9ydCB7Z2V0SGFuZGxlckNvZGUsIGlzTWVzc2FnZUhhbmRsZXIsIG1ha2VNZXNzYWdlSGFuZGxlcn0gZnJvbSAnLi9NZXNzYWdlSGFuZGxlcic7XG5cbnJlcGxpY2F0b3IuYWRkVHJhbnNmb3JtcyhbXG4gIHtcbiAgICB0eXBlOiAnUHJvdG9PYmplY3QnLFxuICAgIHNob3VsZFRyYW5zZm9ybSAodHlwZSwgdmFsKSB7XG4gICAgICByZXR1cm4gdHlwZSA9PSBcIm9iamVjdFwiICYmIHZhbC5fX2lzUHJvdG9PYmplY3RfXztcbiAgICB9LFxuICAgIHRvU2VyaWFsaXphYmxlICh2YWwpIHtcbiAgICAgIHJldHVybiB2YWwuX19yZXByX187XG4gICAgfSxcbiAgICBmcm9tU2VyaWFsaXphYmxlICh2YWwpe1xuICAgICAgcmV0dXJuIF9PYmplY3RGcm9tUmVwcih2YWwpO1xuICAgIH1cbiAgfSxcbiAge1xuICAgIHR5cGU6ICdNZXNzYWdlSGFuZGxlcicsXG4gICAgc2hvdWxkVHJhbnNmb3JtICh0eXBlLCB2YWwpIHtcbiAgICAgIHJldHVybiB0eXBlID09IFwiZnVuY3Rpb25cIiAmJiBpc01lc3NhZ2VIYW5kbGVyKHZhbCk7XG4gICAgfSxcbiAgICB0b1NlcmlhbGl6YWJsZSAodmFsKSB7XG4gICAgICByZXR1cm4gZ2V0SGFuZGxlckNvZGUodmFsKTtcbiAgICB9LFxuICAgIGZyb21TZXJpYWxpemFibGUgKHZhbCl7XG4gICAgICByZXR1cm4gbWFrZU1lc3NhZ2VIYW5kbGVyKHZhbCk7XG4gICAgfVxuICB9LFxuXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemUocm9vdCkge1xuICByZXR1cm4gcmVwbGljYXRvci5lbmNvZGUocm9vdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXNlcmlhbGl6ZShyb290KSB7XG4gIHJldHVybiByZXBsaWNhdG9yLmRlY29kZShyb290KTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvcmUvc2VyaWFsaXplci5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29uc3RcbnZhciBUUkFOU0ZPUk1FRF9UWVBFX0tFWSAgICA9ICdAdCc7XG52YXIgQ0lSQ1VMQVJfUkVGX0tFWSAgICAgICAgPSAnQHInO1xudmFyIEtFWV9SRVFVSVJFX0VTQ0FQSU5HX1JFID0gL14jKkAodHxyKSQvO1xuXG52YXIgR0xPQkFMID0gKGZ1bmN0aW9uIGdldEdsb2JhbCAoKSB7XG4gICAgLy8gTk9URTogc2VlIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvaW5kZXguaHRtbCNzZWMtcGVyZm9ybWV2YWwgc3RlcCAxMFxuICAgIHZhciBzYXZlZEV2YWwgPSBldmFsO1xuXG4gICAgcmV0dXJuIHNhdmVkRXZhbCgndGhpcycpO1xufSkoKTtcblxudmFyIEFSUkFZX0JVRkZFUl9TVVBQT1JURUQgPSB0eXBlb2YgQXJyYXlCdWZmZXIgPT09ICdmdW5jdGlvbic7XG52YXIgTUFQX1NVUFBPUlRFRCAgICAgICAgICA9IHR5cGVvZiBNYXAgPT09ICdmdW5jdGlvbic7XG52YXIgU0VUX1NVUFBPUlRFRCAgICAgICAgICA9IHR5cGVvZiBTZXQgPT09ICdmdW5jdGlvbic7XG5cbnZhciBUWVBFRF9BUlJBWV9DVE9SUyA9IFtcbiAgICAnSW50OEFycmF5JyxcbiAgICAnVWludDhBcnJheScsXG4gICAgJ1VpbnQ4Q2xhbXBlZEFycmF5JyxcbiAgICAnSW50MTZBcnJheScsXG4gICAgJ1VpbnQxNkFycmF5JyxcbiAgICAnSW50MzJBcnJheScsXG4gICAgJ1VpbnQzMkFycmF5JyxcbiAgICAnRmxvYXQzMkFycmF5JyxcbiAgICAnRmxvYXQ2NEFycmF5J1xuXTtcblxuXG4vLyBTYXZlZCBwcm90byBmdW5jdGlvbnNcbnZhciBhcnJTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuXG4vLyBEZWZhdWx0IHNlcmlhbGl6ZXJcbnZhciBKU09OU2VyaWFsaXplciA9IHtcbiAgICBzZXJpYWxpemU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgfSxcblxuICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbCk7XG4gICAgfVxufTtcblxuXG4vLyBFbmNvZGluZ1RyYW5zZm9ybWVyXG52YXIgRW5jb2RpbmdUcmFuc2Zvcm1lciA9IGZ1bmN0aW9uICh2YWwsIHRyYW5zZm9ybXMpIHtcbiAgICB0aGlzLnJlZmVyZW5jZXMgICAgICAgICAgICAgICA9IHZhbDtcbiAgICB0aGlzLnRyYW5zZm9ybXMgICAgICAgICAgICAgICA9IHRyYW5zZm9ybXM7XG4gICAgdGhpcy5jaXJjdWxhckNhbmRpZGF0ZXMgICAgICAgPSBbXTtcbiAgICB0aGlzLmNpcmN1bGFyQ2FuZGlkYXRlc0Rlc2NycyA9IFtdO1xuICAgIHRoaXMuY2lyY3VsYXJSZWZDb3VudCAgICAgICAgID0gMDtcbn07XG5cbkVuY29kaW5nVHJhbnNmb3JtZXIuX2NyZWF0ZVJlZk1hcmsgPSBmdW5jdGlvbiAoaWR4KSB7XG4gICAgdmFyIG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICBvYmpbQ0lSQ1VMQVJfUkVGX0tFWV0gPSBpZHg7XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxuRW5jb2RpbmdUcmFuc2Zvcm1lci5wcm90b3R5cGUuX2NyZWF0ZUNpcmN1bGFyQ2FuZGlkYXRlID0gZnVuY3Rpb24gKHZhbCwgcGFyZW50LCBrZXkpIHtcbiAgICB0aGlzLmNpcmN1bGFyQ2FuZGlkYXRlcy5wdXNoKHZhbCk7XG4gICAgdGhpcy5jaXJjdWxhckNhbmRpZGF0ZXNEZXNjcnMucHVzaCh7IHBhcmVudDogcGFyZW50LCBrZXk6IGtleSwgcmVmSWR4OiAtMSB9KTtcbn07XG5cbkVuY29kaW5nVHJhbnNmb3JtZXIucHJvdG90eXBlLl9hcHBseVRyYW5zZm9ybSA9IGZ1bmN0aW9uICh2YWwsIHBhcmVudCwga2V5LCB0cmFuc2Zvcm0pIHtcbiAgICB2YXIgcmVzdWx0ICAgICAgICAgID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB2YXIgc2VyaWFsaXphYmxlVmFsID0gdHJhbnNmb3JtLnRvU2VyaWFsaXphYmxlKHZhbCk7XG5cbiAgICBpZiAodHlwZW9mIHNlcmlhbGl6YWJsZVZhbCA9PT0gJ29iamVjdCcpXG4gICAgICAgIHRoaXMuX2NyZWF0ZUNpcmN1bGFyQ2FuZGlkYXRlKHZhbCwgcGFyZW50LCBrZXkpO1xuXG4gICAgcmVzdWx0W1RSQU5TRk9STUVEX1RZUEVfS0VZXSA9IHRyYW5zZm9ybS50eXBlO1xuICAgIHJlc3VsdC5kYXRhICAgICAgICAgICAgICAgICAgPSB0aGlzLl9oYW5kbGVWYWx1ZShzZXJpYWxpemFibGVWYWwsIHBhcmVudCwga2V5KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5FbmNvZGluZ1RyYW5zZm9ybWVyLnByb3RvdHlwZS5faGFuZGxlQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspXG4gICAgICAgIHJlc3VsdFtpXSA9IHRoaXMuX2hhbmRsZVZhbHVlKGFycltpXSwgcmVzdWx0LCBpKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5FbmNvZGluZ1RyYW5zZm9ybWVyLnByb3RvdHlwZS5faGFuZGxlUGxhaW5PYmplY3QgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdEtleSA9IEtFWV9SRVFVSVJFX0VTQ0FQSU5HX1JFLnRlc3Qoa2V5KSA/ICcjJyArIGtleSA6IGtleTtcblxuICAgICAgICAgICAgcmVzdWx0W3Jlc3VsdEtleV0gPSB0aGlzLl9oYW5kbGVWYWx1ZShvYmpba2V5XSwgcmVzdWx0LCByZXN1bHRLZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbkVuY29kaW5nVHJhbnNmb3JtZXIucHJvdG90eXBlLl9oYW5kbGVPYmplY3QgPSBmdW5jdGlvbiAob2JqLCBwYXJlbnQsIGtleSkge1xuICAgIHRoaXMuX2NyZWF0ZUNpcmN1bGFyQ2FuZGlkYXRlKG9iaiwgcGFyZW50LCBrZXkpO1xuXG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkob2JqKSA/IHRoaXMuX2hhbmRsZUFycmF5KG9iaikgOiB0aGlzLl9oYW5kbGVQbGFpbk9iamVjdChvYmopO1xufTtcblxuRW5jb2RpbmdUcmFuc2Zvcm1lci5wcm90b3R5cGUuX2Vuc3VyZUNpcmN1bGFyUmVmZXJlbmNlID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBjaXJjdWxhckNhbmRpZGF0ZUlkeCA9IHRoaXMuY2lyY3VsYXJDYW5kaWRhdGVzLmluZGV4T2Yob2JqKTtcblxuICAgIGlmIChjaXJjdWxhckNhbmRpZGF0ZUlkeCA+IC0xKSB7XG4gICAgICAgIHZhciBkZXNjciA9IHRoaXMuY2lyY3VsYXJDYW5kaWRhdGVzRGVzY3JzW2NpcmN1bGFyQ2FuZGlkYXRlSWR4XTtcblxuICAgICAgICBpZiAoZGVzY3IucmVmSWR4ID09PSAtMSlcbiAgICAgICAgICAgIGRlc2NyLnJlZklkeCA9IGRlc2NyLnBhcmVudCA/ICsrdGhpcy5jaXJjdWxhclJlZkNvdW50IDogMDtcblxuICAgICAgICByZXR1cm4gRW5jb2RpbmdUcmFuc2Zvcm1lci5fY3JlYXRlUmVmTWFyayhkZXNjci5yZWZJZHgpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufTtcblxuRW5jb2RpbmdUcmFuc2Zvcm1lci5wcm90b3R5cGUuX2hhbmRsZVZhbHVlID0gZnVuY3Rpb24gKHZhbCwgcGFyZW50LCBrZXkpIHtcbiAgICB2YXIgdHlwZSAgICAgPSB0eXBlb2YgdmFsO1xuICAgIHZhciBpc09iamVjdCA9IHR5cGUgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbDtcblxuICAgIGlmIChpc09iamVjdCkge1xuICAgICAgICB2YXIgcmVmTWFyayA9IHRoaXMuX2Vuc3VyZUNpcmN1bGFyUmVmZXJlbmNlKHZhbCk7XG5cbiAgICAgICAgaWYgKHJlZk1hcmspXG4gICAgICAgICAgICByZXR1cm4gcmVmTWFyaztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudHJhbnNmb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm1zW2ldO1xuXG4gICAgICAgIGlmICh0cmFuc2Zvcm0uc2hvdWxkVHJhbnNmb3JtKHR5cGUsIHZhbCkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlUcmFuc2Zvcm0odmFsLCBwYXJlbnQsIGtleSwgdHJhbnNmb3JtKTtcbiAgICB9XG5cbiAgICBpZiAoaXNPYmplY3QpXG4gICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVPYmplY3QodmFsLCBwYXJlbnQsIGtleSk7XG5cbiAgICByZXR1cm4gdmFsO1xufTtcblxuRW5jb2RpbmdUcmFuc2Zvcm1lci5wcm90b3R5cGUudHJhbnNmb3JtID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZWZlcmVuY2VzID0gW3RoaXMuX2hhbmRsZVZhbHVlKHRoaXMucmVmZXJlbmNlcywgbnVsbCwgbnVsbCldO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNpcmN1bGFyQ2FuZGlkYXRlc0Rlc2Nycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZGVzY3IgPSB0aGlzLmNpcmN1bGFyQ2FuZGlkYXRlc0Rlc2Nyc1tpXTtcblxuICAgICAgICBpZiAoZGVzY3IucmVmSWR4ID4gMCkge1xuICAgICAgICAgICAgcmVmZXJlbmNlc1tkZXNjci5yZWZJZHhdID0gZGVzY3IucGFyZW50W2Rlc2NyLmtleV07XG4gICAgICAgICAgICBkZXNjci5wYXJlbnRbZGVzY3Iua2V5XSAgPSBFbmNvZGluZ1RyYW5zZm9ybWVyLl9jcmVhdGVSZWZNYXJrKGRlc2NyLnJlZklkeCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVmZXJlbmNlcztcbn07XG5cbi8vIERlY29kaW5nVHJhbnNmb3JtXG52YXIgRGVjb2RpbmdUcmFuc2Zvcm1lciA9IGZ1bmN0aW9uIChyZWZlcmVuY2VzLCB0cmFuc2Zvcm1zTWFwKSB7XG4gICAgdGhpcy5yZWZlcmVuY2VzICAgICAgICAgICAgPSByZWZlcmVuY2VzO1xuICAgIHRoaXMudHJhbnNmb3JtTWFwICAgICAgICAgID0gdHJhbnNmb3Jtc01hcDtcbiAgICB0aGlzLmFjdGl2ZVRyYW5zZm9ybXNTdGFjayA9IFtdO1xuICAgIHRoaXMudmlzaXRlZFJlZnMgICAgICAgICAgID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbn07XG5cbkRlY29kaW5nVHJhbnNmb3JtZXIucHJvdG90eXBlLl9oYW5kbGVQbGFpbk9iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICB2YXIgdW5lc2NhcGVkID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVWYWx1ZShvYmpba2V5XSwgb2JqLCBrZXkpO1xuXG4gICAgICAgICAgICBpZiAoS0VZX1JFUVVJUkVfRVNDQVBJTkdfUkUudGVzdChrZXkpKSB7XG4gICAgICAgICAgICAgICAgLy8gTk9URTogdXNlIGludGVybWVkaWF0ZSBvYmplY3QgdG8gYXZvaWQgdW5lc2NhcGVkIGFuZCBlc2NhcGVkIGtleXMgaW50ZXJmZXJlbmNlXG4gICAgICAgICAgICAgICAgLy8gRS5nLiB1bmVzY2FwZWQgXCIjI0B0XCIgd2lsbCBiZSBcIiNAdFwiIHdoaWNoIGNhbiBvdmVyd3JpdGUgZXNjYXBlZCBcIiNAdFwiLlxuICAgICAgICAgICAgICAgIHVuZXNjYXBlZFtrZXkuc3Vic3RyaW5nKDEpXSA9IG9ialtrZXldO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmpba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIHVuc2VjYXBlZEtleSBpbiB1bmVzY2FwZWQpXG4gICAgICAgIG9ialt1bnNlY2FwZWRLZXldID0gdW5lc2NhcGVkW3Vuc2VjYXBlZEtleV07XG59O1xuXG5EZWNvZGluZ1RyYW5zZm9ybWVyLnByb3RvdHlwZS5faGFuZGxlVHJhbnNmb3JtZWRPYmplY3QgPSBmdW5jdGlvbiAob2JqLCBwYXJlbnQsIGtleSkge1xuICAgIHZhciB0cmFuc2Zvcm1UeXBlID0gb2JqW1RSQU5TRk9STUVEX1RZUEVfS0VZXTtcbiAgICB2YXIgdHJhbnNmb3JtICAgICA9IHRoaXMudHJhbnNmb3JtTWFwW3RyYW5zZm9ybVR5cGVdO1xuXG4gICAgaWYgKCF0cmFuc2Zvcm0pXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuXFwndCBmaW5kIHRyYW5zZm9ybSBmb3IgXCInICsgdHJhbnNmb3JtVHlwZSArICdcIiB0eXBlLicpO1xuXG4gICAgdGhpcy5hY3RpdmVUcmFuc2Zvcm1zU3RhY2sucHVzaChvYmopO1xuICAgIHRoaXMuX2hhbmRsZVZhbHVlKG9iai5kYXRhLCBvYmosICdkYXRhJyk7XG4gICAgdGhpcy5hY3RpdmVUcmFuc2Zvcm1zU3RhY2sucG9wKCk7XG5cbiAgICBwYXJlbnRba2V5XSA9IHRyYW5zZm9ybS5mcm9tU2VyaWFsaXphYmxlKG9iai5kYXRhKTtcbn07XG5cbkRlY29kaW5nVHJhbnNmb3JtZXIucHJvdG90eXBlLl9oYW5kbGVDaXJjdWxhclNlbGZSZWZEdXJpbmdUcmFuc2Zvcm0gPSBmdW5jdGlvbiAocmVmSWR4LCBwYXJlbnQsIGtleSkge1xuICAgIC8vIE5PVEU6IHdlJ3ZlIGhpdCBhIGhhcmQgY2FzZTogb2JqZWN0IHJlZmVyZW5jZSBpdHNlbGYgZHVyaW5nIHRyYW5zZm9ybWF0aW9uLlxuICAgIC8vIFdlIGNhbid0IGRlcmVmZXJlbmNlIGl0IHNpbmNlIHdlIGRvbid0IGhhdmUgcmVzdWx0aW5nIG9iamVjdCB5ZXQuIEFuZCB3ZSdsbFxuICAgIC8vIG5vdCBiZSBhYmxlIHRvIHJlc3RvcmUgcmVmZXJlbmNlIGxhdGVseSBiZWNhdXNlIHdlIHdpbGwgbmVlZCB0byB0cmF2ZXJzZVxuICAgIC8vIHRyYW5zZm9ybWVkIG9iamVjdCBhZ2FpbiBhbmQgcmVmZXJlbmNlIG1pZ2h0IGJlIHVucmVhY2hhYmxlIG9yIG5ldyBvYmplY3QgY29udGFpblxuICAgIC8vIG5ldyBjaXJjdWxhciByZWZlcmVuY2VzLiBBcyBhIHdvcmthcm91bmQgd2UgY3JlYXRlIGdldHRlciwgc28gb25jZSB0cmFuc2Zvcm1hdGlvblxuICAgIC8vIGNvbXBsZXRlLCBkZXJlZmVyZW5jZWQgcHJvcGVydHkgd2lsbCBwb2ludCB0byBjb3JyZWN0IHRyYW5zZm9ybWVkIG9iamVjdC5cbiAgICB2YXIgcmVmZXJlbmNlcyA9IHRoaXMucmVmZXJlbmNlcztcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwYXJlbnQsIGtleSwge1xuICAgICAgICB2YWw6ICAgICAgICAgIHZvaWQgMCxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIHRydWUsXG5cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy52YWwgPT09IHZvaWQgMClcbiAgICAgICAgICAgICAgICB0aGlzLnZhbCA9IHJlZmVyZW5jZXNbcmVmSWR4XTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5EZWNvZGluZ1RyYW5zZm9ybWVyLnByb3RvdHlwZS5faGFuZGxlQ2lyY3VsYXJSZWYgPSBmdW5jdGlvbiAocmVmSWR4LCBwYXJlbnQsIGtleSkge1xuICAgIGlmICh0aGlzLmFjdGl2ZVRyYW5zZm9ybXNTdGFjay5pbmRleE9mKHRoaXMucmVmZXJlbmNlc1tyZWZJZHhdKSA+IC0xKVxuICAgICAgICB0aGlzLl9oYW5kbGVDaXJjdWxhclNlbGZSZWZEdXJpbmdUcmFuc2Zvcm0ocmVmSWR4LCBwYXJlbnQsIGtleSk7XG5cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpc2l0ZWRSZWZzW3JlZklkeF0pIHtcbiAgICAgICAgICAgIHRoaXMudmlzaXRlZFJlZnNbcmVmSWR4XSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVWYWx1ZSh0aGlzLnJlZmVyZW5jZXNbcmVmSWR4XSwgdGhpcy5yZWZlcmVuY2VzLCByZWZJZHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyZW50W2tleV0gPSB0aGlzLnJlZmVyZW5jZXNbcmVmSWR4XTtcbiAgICB9XG59O1xuXG5EZWNvZGluZ1RyYW5zZm9ybWVyLnByb3RvdHlwZS5faGFuZGxlVmFsdWUgPSBmdW5jdGlvbiAodmFsLCBwYXJlbnQsIGtleSkge1xuICAgIGlmICh0eXBlb2YgdmFsICE9PSAnb2JqZWN0JyB8fCB2YWwgPT09IG51bGwpXG4gICAgICAgIHJldHVybjtcblxuICAgIHZhciByZWZJZHggPSB2YWxbQ0lSQ1VMQVJfUkVGX0tFWV07XG5cbiAgICBpZiAocmVmSWR4ICE9PSB2b2lkIDApXG4gICAgICAgIHRoaXMuX2hhbmRsZUNpcmN1bGFyUmVmKHJlZklkeCwgcGFyZW50LCBrZXkpO1xuXG4gICAgZWxzZSBpZiAodmFsW1RSQU5TRk9STUVEX1RZUEVfS0VZXSlcbiAgICAgICAgdGhpcy5faGFuZGxlVHJhbnNmb3JtZWRPYmplY3QodmFsLCBwYXJlbnQsIGtleSk7XG5cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVWYWx1ZSh2YWxbaV0sIHZhbCwgaSk7XG4gICAgfVxuXG4gICAgZWxzZVxuICAgICAgICB0aGlzLl9oYW5kbGVQbGFpbk9iamVjdCh2YWwpO1xufTtcblxuRGVjb2RpbmdUcmFuc2Zvcm1lci5wcm90b3R5cGUudHJhbnNmb3JtID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudmlzaXRlZFJlZnNbMF0gPSB0cnVlO1xuICAgIHRoaXMuX2hhbmRsZVZhbHVlKHRoaXMucmVmZXJlbmNlc1swXSwgdGhpcy5yZWZlcmVuY2VzLCAwKTtcblxuICAgIHJldHVybiB0aGlzLnJlZmVyZW5jZXNbMF07XG59O1xuXG5cbi8vIFRyYW5zZm9ybXNcbnZhciBidWlsdEluVHJhbnNmb3JtcyA9IFtcbiAgICB7XG4gICAgICAgIHR5cGU6ICdbW05hTl1dJyxcblxuICAgICAgICBzaG91bGRUcmFuc2Zvcm06IGZ1bmN0aW9uICh0eXBlLCB2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlID09PSAnbnVtYmVyJyAmJiBpc05hTih2YWwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHRvU2VyaWFsaXphYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZnJvbVNlcmlhbGl6YWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB7XG4gICAgICAgIHR5cGU6ICdbW3VuZGVmaW5lZF1dJyxcblxuICAgICAgICBzaG91bGRUcmFuc2Zvcm06IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZSA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdG9TZXJpYWxpemFibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfSxcblxuICAgICAgICBmcm9tU2VyaWFsaXphYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIHR5cGU6ICdbW0RhdGVdXScsXG5cbiAgICAgICAgc2hvdWxkVHJhbnNmb3JtOiBmdW5jdGlvbiAodHlwZSwgdmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsIGluc3RhbmNlb2YgRGF0ZTtcbiAgICAgICAgfSxcblxuICAgICAgICB0b1NlcmlhbGl6YWJsZTogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBmcm9tU2VyaWFsaXphYmxlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgICAgIGRhdGUuc2V0VGltZSh2YWwpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgdHlwZTogJ1tbUmVnRXhwXV0nLFxuXG4gICAgICAgIHNob3VsZFRyYW5zZm9ybTogZnVuY3Rpb24gKHR5cGUsIHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbCBpbnN0YW5jZW9mIFJlZ0V4cDtcbiAgICAgICAgfSxcblxuICAgICAgICB0b1NlcmlhbGl6YWJsZTogZnVuY3Rpb24gKHJlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIHNyYzogICByZS5zb3VyY2UsXG4gICAgICAgICAgICAgICAgZmxhZ3M6ICcnXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAocmUuZ2xvYmFsKVxuICAgICAgICAgICAgICAgIHJlc3VsdC5mbGFncyArPSAnZyc7XG5cbiAgICAgICAgICAgIGlmIChyZS5pZ25vcmVDYXNlKVxuICAgICAgICAgICAgICAgIHJlc3VsdC5mbGFncyArPSAnaSc7XG5cbiAgICAgICAgICAgIGlmIChyZS5tdWx0aWxpbmUpXG4gICAgICAgICAgICAgICAgcmVzdWx0LmZsYWdzICs9ICdtJztcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSxcblxuICAgICAgICBmcm9tU2VyaWFsaXphYmxlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCh2YWwuc3JjLCB2YWwuZmxhZ3MpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHtcbiAgICAgICAgdHlwZTogJ1tbRXJyb3JdXScsXG5cbiAgICAgICAgc2hvdWxkVHJhbnNmb3JtOiBmdW5jdGlvbiAodHlwZSwgdmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsIGluc3RhbmNlb2YgRXJyb3I7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdG9TZXJpYWxpemFibGU6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbmFtZTogICAgZXJyLm5hbWUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgc3RhY2s6ICAgZXJyLnN0YWNrXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIGZyb21TZXJpYWxpemFibGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIHZhciBDdG9yID0gR0xPQkFMW3ZhbC5uYW1lXSB8fCBFcnJvcjtcbiAgICAgICAgICAgIHZhciBlcnIgID0gbmV3IEN0b3IodmFsLm1lc3NhZ2UpO1xuXG4gICAgICAgICAgICBlcnIuc3RhY2sgPSB2YWwuc3RhY2s7XG4gICAgICAgICAgICByZXR1cm4gZXJyO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHtcbiAgICAgICAgdHlwZTogJ1tbQXJyYXlCdWZmZXJdXScsXG5cbiAgICAgICAgc2hvdWxkVHJhbnNmb3JtOiBmdW5jdGlvbiAodHlwZSwgdmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gQVJSQVlfQlVGRkVSX1NVUFBPUlRFRCAmJiB2YWwgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjtcbiAgICAgICAgfSxcblxuICAgICAgICB0b1NlcmlhbGl6YWJsZTogZnVuY3Rpb24gKGJ1ZmZlcikge1xuICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgSW50OEFycmF5KGJ1ZmZlcik7XG5cbiAgICAgICAgICAgIHJldHVybiBhcnJTbGljZS5jYWxsKHZpZXcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGZyb21TZXJpYWxpemFibGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGlmIChBUlJBWV9CVUZGRVJfU1VQUE9SVEVEKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcih2YWwubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB2YXIgdmlldyAgID0gbmV3IEludDhBcnJheShidWZmZXIpO1xuXG4gICAgICAgICAgICAgICAgdmlldy5zZXQodmFsKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAge1xuICAgICAgICB0eXBlOiAnW1tUeXBlZEFycmF5XV0nLFxuXG4gICAgICAgIHNob3VsZFRyYW5zZm9ybTogZnVuY3Rpb24gKHR5cGUsIHZhbCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBUWVBFRF9BUlJBWV9DVE9SUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBjdG9yTmFtZSA9IFRZUEVEX0FSUkFZX0NUT1JTW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBHTE9CQUxbY3Rvck5hbWVdID09PSAnZnVuY3Rpb24nICYmIHZhbCBpbnN0YW5jZW9mIEdMT0JBTFtjdG9yTmFtZV0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdG9TZXJpYWxpemFibGU6IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY3Rvck5hbWU6IGFyci5jb25zdHJ1Y3Rvci5uYW1lLFxuICAgICAgICAgICAgICAgIGFycjogICAgICBhcnJTbGljZS5jYWxsKGFycilcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgZnJvbVNlcmlhbGl6YWJsZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBHTE9CQUxbdmFsLmN0b3JOYW1lXSA9PT0gJ2Z1bmN0aW9uJyA/IG5ldyBHTE9CQUxbdmFsLmN0b3JOYW1lXSh2YWwuYXJyKSA6IHZhbC5hcnI7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAge1xuICAgICAgICB0eXBlOiAnW1tNYXBdXScsXG5cbiAgICAgICAgc2hvdWxkVHJhbnNmb3JtOiBmdW5jdGlvbiAodHlwZSwgdmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gTUFQX1NVUFBPUlRFRCAmJiB2YWwgaW5zdGFuY2VvZiBNYXA7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdG9TZXJpYWxpemFibGU6IGZ1bmN0aW9uIChtYXApIHtcbiAgICAgICAgICAgIHZhciBmbGF0dGVuZWRLVkFyciA9IFtdO1xuXG4gICAgICAgICAgICBtYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBrZXkpIHtcbiAgICAgICAgICAgICAgICBmbGF0dGVuZWRLVkFyci5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgZmxhdHRlbmVkS1ZBcnIucHVzaCh2YWwpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBmbGF0dGVuZWRLVkFycjtcbiAgICAgICAgfSxcblxuICAgICAgICBmcm9tU2VyaWFsaXphYmxlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBpZiAoTUFQX1NVUFBPUlRFRCkge1xuICAgICAgICAgICAgICAgIC8vIE5PVEU6IG5ldyBNYXAoaXRlcmFibGUpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgYWxsIGJyb3dzZXJzXG4gICAgICAgICAgICAgICAgdmFyIG1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSArPSAyKVxuICAgICAgICAgICAgICAgICAgICBtYXAuc2V0KHZhbFtpXSwgdmFsW2kgKyAxXSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIga3ZBcnIgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWwubGVuZ3RoOyBqICs9IDIpXG4gICAgICAgICAgICAgICAga3ZBcnIucHVzaChbdmFsW2ldLCB2YWxbaSArIDFdXSk7XG5cbiAgICAgICAgICAgIHJldHVybiBrdkFycjtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB7XG4gICAgICAgIHR5cGU6ICdbW1NldF1dJyxcblxuICAgICAgICBzaG91bGRUcmFuc2Zvcm06IGZ1bmN0aW9uICh0eXBlLCB2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiBTRVRfU1VQUE9SVEVEICYmIHZhbCBpbnN0YW5jZW9mIFNldDtcbiAgICAgICAgfSxcblxuICAgICAgICB0b1NlcmlhbGl6YWJsZTogZnVuY3Rpb24gKHNldCkge1xuICAgICAgICAgICAgdmFyIGFyciA9IFtdO1xuXG4gICAgICAgICAgICBzZXQuZm9yRWFjaChmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2godmFsKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gYXJyO1xuICAgICAgICB9LFxuXG4gICAgICAgIGZyb21TZXJpYWxpemFibGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGlmIChTRVRfU1VQUE9SVEVEKSB7XG4gICAgICAgICAgICAgICAgLy8gTk9URTogbmV3IFNldChpdGVyYWJsZSkgaXMgbm90IHN1cHBvcnRlZCBieSBhbGwgYnJvd3NlcnNcbiAgICAgICAgICAgICAgICB2YXIgc2V0ID0gbmV3IFNldCgpO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICAgICAgICAgIHNldC5hZGQodmFsW2ldKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzZXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICB9XG5dO1xuXG4vLyBSZXBsaWNhdG9yXG52YXIgUmVwbGljYXRvciA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlcmlhbGl6ZXIpIHtcbiAgICB0aGlzLnRyYW5zZm9ybXMgICAgPSBbXTtcbiAgICB0aGlzLnRyYW5zZm9ybXNNYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuc2VyaWFsaXplciAgICA9IHNlcmlhbGl6ZXIgfHwgSlNPTlNlcmlhbGl6ZXI7XG5cbiAgICB0aGlzLmFkZFRyYW5zZm9ybXMoYnVpbHRJblRyYW5zZm9ybXMpO1xufTtcblxuLy8gTWFuYWdlIHRyYW5zZm9ybXNcblJlcGxpY2F0b3IucHJvdG90eXBlLmFkZFRyYW5zZm9ybXMgPSBmdW5jdGlvbiAodHJhbnNmb3Jtcykge1xuICAgIHRyYW5zZm9ybXMgPSBBcnJheS5pc0FycmF5KHRyYW5zZm9ybXMpID8gdHJhbnNmb3JtcyA6IFt0cmFuc2Zvcm1zXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhbnNmb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdHJhbnNmb3JtID0gdHJhbnNmb3Jtc1tpXTtcblxuICAgICAgICBpZiAodGhpcy50cmFuc2Zvcm1zTWFwW3RyYW5zZm9ybS50eXBlXSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVHJhbnNmb3JtIHdpdGggdHlwZSBcIicgKyB0cmFuc2Zvcm0udHlwZSArICdcIiB3YXMgYWxyZWFkeSBhZGRlZC4nKTtcblxuICAgICAgICB0aGlzLnRyYW5zZm9ybXMucHVzaCh0cmFuc2Zvcm0pO1xuICAgICAgICB0aGlzLnRyYW5zZm9ybXNNYXBbdHJhbnNmb3JtLnR5cGVdID0gdHJhbnNmb3JtO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuUmVwbGljYXRvci5wcm90b3R5cGUucmVtb3ZlVHJhbnNmb3JtcyA9IGZ1bmN0aW9uICh0cmFuc2Zvcm1zKSB7XG4gICAgdHJhbnNmb3JtcyA9IEFycmF5LmlzQXJyYXkodHJhbnNmb3JtcykgPyB0cmFuc2Zvcm1zIDogW3RyYW5zZm9ybXNdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmFuc2Zvcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1zW2ldO1xuICAgICAgICB2YXIgaWR4ICAgICAgID0gdGhpcy50cmFuc2Zvcm1zLmluZGV4T2YodHJhbnNmb3JtKTtcblxuICAgICAgICBpZiAoaWR4ID4gLTEpXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybXMuc3BsaWNlKGlkeCwgMSk7XG5cbiAgICAgICAgZGVsZXRlIHRoaXMudHJhbnNmb3Jtc01hcFt0cmFuc2Zvcm0udHlwZV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXBsaWNhdG9yLnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgdmFyIHRyYW5zZm9ybWVyID0gbmV3IEVuY29kaW5nVHJhbnNmb3JtZXIodmFsLCB0aGlzLnRyYW5zZm9ybXMpO1xuICAgIHZhciByZWZlcmVuY2VzICA9IHRyYW5zZm9ybWVyLnRyYW5zZm9ybSgpO1xuXG4gICAgcmV0dXJuIHRoaXMuc2VyaWFsaXplci5zZXJpYWxpemUocmVmZXJlbmNlcyk7XG59O1xuXG5SZXBsaWNhdG9yLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgdmFyIHJlZmVyZW5jZXMgID0gdGhpcy5zZXJpYWxpemVyLmRlc2VyaWFsaXplKHZhbCk7XG4gICAgdmFyIHRyYW5zZm9ybWVyID0gbmV3IERlY29kaW5nVHJhbnNmb3JtZXIocmVmZXJlbmNlcywgdGhpcy50cmFuc2Zvcm1zTWFwKTtcblxuICAgIHJldHVybiB0cmFuc2Zvcm1lci50cmFuc2Zvcm0oKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZXBsaWNhdG9yL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaCA9IHJlcXVpcmUoXCIuL3ZpcnR1YWwtaHlwZXJzY3JpcHQvaW5kZXguanNcIilcblxubW9kdWxlLmV4cG9ydHMgPSBoXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS9oLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0FycmF5ID0gcmVxdWlyZSgneC1pcy1hcnJheScpO1xuXG52YXIgVk5vZGUgPSByZXF1aXJlKCcuLi92bm9kZS92bm9kZS5qcycpO1xudmFyIFZUZXh0ID0gcmVxdWlyZSgnLi4vdm5vZGUvdnRleHQuanMnKTtcbnZhciBpc1ZOb2RlID0gcmVxdWlyZSgnLi4vdm5vZGUvaXMtdm5vZGUnKTtcbnZhciBpc1ZUZXh0ID0gcmVxdWlyZSgnLi4vdm5vZGUvaXMtdnRleHQnKTtcbnZhciBpc1dpZGdldCA9IHJlcXVpcmUoJy4uL3Zub2RlL2lzLXdpZGdldCcpO1xudmFyIGlzSG9vayA9IHJlcXVpcmUoJy4uL3Zub2RlL2lzLXZob29rJyk7XG52YXIgaXNWVGh1bmsgPSByZXF1aXJlKCcuLi92bm9kZS9pcy10aHVuaycpO1xuXG52YXIgcGFyc2VUYWcgPSByZXF1aXJlKCcuL3BhcnNlLXRhZy5qcycpO1xudmFyIHNvZnRTZXRIb29rID0gcmVxdWlyZSgnLi9ob29rcy9zb2Z0LXNldC1ob29rLmpzJyk7XG52YXIgZXZIb29rID0gcmVxdWlyZSgnLi9ob29rcy9ldi1ob29rLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gaDtcblxuZnVuY3Rpb24gaCh0YWdOYW1lLCBwcm9wZXJ0aWVzLCBjaGlsZHJlbikge1xuICAgIHZhciBjaGlsZE5vZGVzID0gW107XG4gICAgdmFyIHRhZywgcHJvcHMsIGtleSwgbmFtZXNwYWNlO1xuXG4gICAgaWYgKCFjaGlsZHJlbiAmJiBpc0NoaWxkcmVuKHByb3BlcnRpZXMpKSB7XG4gICAgICAgIGNoaWxkcmVuID0gcHJvcGVydGllcztcbiAgICAgICAgcHJvcHMgPSB7fTtcbiAgICB9XG5cbiAgICBwcm9wcyA9IHByb3BzIHx8IHByb3BlcnRpZXMgfHwge307XG4gICAgdGFnID0gcGFyc2VUYWcodGFnTmFtZSwgcHJvcHMpO1xuXG4gICAgLy8gc3VwcG9ydCBrZXlzXG4gICAgaWYgKHByb3BzLmhhc093blByb3BlcnR5KCdrZXknKSkge1xuICAgICAgICBrZXkgPSBwcm9wcy5rZXk7XG4gICAgICAgIHByb3BzLmtleSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0IG5hbWVzcGFjZVxuICAgIGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eSgnbmFtZXNwYWNlJykpIHtcbiAgICAgICAgbmFtZXNwYWNlID0gcHJvcHMubmFtZXNwYWNlO1xuICAgICAgICBwcm9wcy5uYW1lc3BhY2UgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLy8gZml4IGN1cnNvciBidWdcbiAgICBpZiAodGFnID09PSAnSU5QVVQnICYmXG4gICAgICAgICFuYW1lc3BhY2UgJiZcbiAgICAgICAgcHJvcHMuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgJiZcbiAgICAgICAgcHJvcHMudmFsdWUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAhaXNIb29rKHByb3BzLnZhbHVlKVxuICAgICkge1xuICAgICAgICBwcm9wcy52YWx1ZSA9IHNvZnRTZXRIb29rKHByb3BzLnZhbHVlKTtcbiAgICB9XG5cbiAgICB0cmFuc2Zvcm1Qcm9wZXJ0aWVzKHByb3BzKTtcblxuICAgIGlmIChjaGlsZHJlbiAhPT0gdW5kZWZpbmVkICYmIGNoaWxkcmVuICE9PSBudWxsKSB7XG4gICAgICAgIGFkZENoaWxkKGNoaWxkcmVuLCBjaGlsZE5vZGVzLCB0YWcsIHByb3BzKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBuZXcgVk5vZGUodGFnLCBwcm9wcywgY2hpbGROb2Rlcywga2V5LCBuYW1lc3BhY2UpO1xufVxuXG5mdW5jdGlvbiBhZGRDaGlsZChjLCBjaGlsZE5vZGVzLCB0YWcsIHByb3BzKSB7XG4gICAgaWYgKHR5cGVvZiBjID09PSAnc3RyaW5nJykge1xuICAgICAgICBjaGlsZE5vZGVzLnB1c2gobmV3IFZUZXh0KGMpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjID09PSAnbnVtYmVyJykge1xuICAgICAgICBjaGlsZE5vZGVzLnB1c2gobmV3IFZUZXh0KFN0cmluZyhjKSkpO1xuICAgIH0gZWxzZSBpZiAoaXNDaGlsZChjKSkge1xuICAgICAgICBjaGlsZE5vZGVzLnB1c2goYyk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KGMpKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYWRkQ2hpbGQoY1tpXSwgY2hpbGROb2RlcywgdGFnLCBwcm9wcyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGMgPT09IG51bGwgfHwgYyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBVbmV4cGVjdGVkVmlydHVhbEVsZW1lbnQoe1xuICAgICAgICAgICAgZm9yZWlnbk9iamVjdDogYyxcbiAgICAgICAgICAgIHBhcmVudFZub2RlOiB7XG4gICAgICAgICAgICAgICAgdGFnTmFtZTogdGFnLFxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHByb3BzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdHJhbnNmb3JtUHJvcGVydGllcyhwcm9wcykge1xuICAgIGZvciAodmFyIHByb3BOYW1lIGluIHByb3BzKSB7XG4gICAgICAgIGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcblxuICAgICAgICAgICAgaWYgKGlzSG9vayh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHByb3BOYW1lLnN1YnN0cigwLCAzKSA9PT0gJ2V2LScpIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgZXYtZm9vIHN1cHBvcnRcbiAgICAgICAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBldkhvb2sodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0NoaWxkKHgpIHtcbiAgICByZXR1cm4gaXNWTm9kZSh4KSB8fCBpc1ZUZXh0KHgpIHx8IGlzV2lkZ2V0KHgpIHx8IGlzVlRodW5rKHgpO1xufVxuXG5mdW5jdGlvbiBpc0NoaWxkcmVuKHgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHggPT09ICdzdHJpbmcnIHx8IGlzQXJyYXkoeCkgfHwgaXNDaGlsZCh4KTtcbn1cblxuZnVuY3Rpb24gVW5leHBlY3RlZFZpcnR1YWxFbGVtZW50KGRhdGEpIHtcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCk7XG5cbiAgICBlcnIudHlwZSA9ICd2aXJ0dWFsLWh5cGVyc2NyaXB0LnVuZXhwZWN0ZWQudmlydHVhbC1lbGVtZW50JztcbiAgICBlcnIubWVzc2FnZSA9ICdVbmV4cGVjdGVkIHZpcnR1YWwgY2hpbGQgcGFzc2VkIHRvIGgoKS5cXG4nICtcbiAgICAgICAgJ0V4cGVjdGVkIGEgVk5vZGUgLyBWdGh1bmsgLyBWV2lkZ2V0IC8gc3RyaW5nIGJ1dDpcXG4nICtcbiAgICAgICAgJ2dvdDpcXG4nICtcbiAgICAgICAgZXJyb3JTdHJpbmcoZGF0YS5mb3JlaWduT2JqZWN0KSArXG4gICAgICAgICcuXFxuJyArXG4gICAgICAgICdUaGUgcGFyZW50IHZub2RlIGlzOlxcbicgK1xuICAgICAgICBlcnJvclN0cmluZyhkYXRhLnBhcmVudFZub2RlKVxuICAgICAgICAnXFxuJyArXG4gICAgICAgICdTdWdnZXN0ZWQgZml4OiBjaGFuZ2UgeW91ciBgaCguLi4sIFsgLi4uIF0pYCBjYWxsc2l0ZS4nO1xuICAgIGVyci5mb3JlaWduT2JqZWN0ID0gZGF0YS5mb3JlaWduT2JqZWN0O1xuICAgIGVyci5wYXJlbnRWbm9kZSA9IGRhdGEucGFyZW50Vm5vZGU7XG5cbiAgICByZXR1cm4gZXJyO1xufVxuXG5mdW5jdGlvbiBlcnJvclN0cmluZyhvYmopIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCAnICAgICcpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhvYmopO1xuICAgIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3ZpcnR1YWwtaHlwZXJzY3JpcHQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB2ZXJzaW9uID0gcmVxdWlyZShcIi4vdmVyc2lvblwiKVxudmFyIGlzVk5vZGUgPSByZXF1aXJlKFwiLi9pcy12bm9kZVwiKVxudmFyIGlzV2lkZ2V0ID0gcmVxdWlyZShcIi4vaXMtd2lkZ2V0XCIpXG52YXIgaXNUaHVuayA9IHJlcXVpcmUoXCIuL2lzLXRodW5rXCIpXG52YXIgaXNWSG9vayA9IHJlcXVpcmUoXCIuL2lzLXZob29rXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gVmlydHVhbE5vZGVcblxudmFyIG5vUHJvcGVydGllcyA9IHt9XG52YXIgbm9DaGlsZHJlbiA9IFtdXG5cbmZ1bmN0aW9uIFZpcnR1YWxOb2RlKHRhZ05hbWUsIHByb3BlcnRpZXMsIGNoaWxkcmVuLCBrZXksIG5hbWVzcGFjZSkge1xuICAgIHRoaXMudGFnTmFtZSA9IHRhZ05hbWVcbiAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IG5vUHJvcGVydGllc1xuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbiB8fCBub0NoaWxkcmVuXG4gICAgdGhpcy5rZXkgPSBrZXkgIT0gbnVsbCA/IFN0cmluZyhrZXkpIDogdW5kZWZpbmVkXG4gICAgdGhpcy5uYW1lc3BhY2UgPSAodHlwZW9mIG5hbWVzcGFjZSA9PT0gXCJzdHJpbmdcIikgPyBuYW1lc3BhY2UgOiBudWxsXG5cbiAgICB2YXIgY291bnQgPSAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoKSB8fCAwXG4gICAgdmFyIGRlc2NlbmRhbnRzID0gMFxuICAgIHZhciBoYXNXaWRnZXRzID0gZmFsc2VcbiAgICB2YXIgaGFzVGh1bmtzID0gZmFsc2VcbiAgICB2YXIgZGVzY2VuZGFudEhvb2tzID0gZmFsc2VcbiAgICB2YXIgaG9va3NcblxuICAgIGZvciAodmFyIHByb3BOYW1lIGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgICAgICB2YXIgcHJvcGVydHkgPSBwcm9wZXJ0aWVzW3Byb3BOYW1lXVxuICAgICAgICAgICAgaWYgKGlzVkhvb2socHJvcGVydHkpICYmIHByb3BlcnR5LnVuaG9vaykge1xuICAgICAgICAgICAgICAgIGlmICghaG9va3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaG9va3MgPSB7fVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGhvb2tzW3Byb3BOYW1lXSA9IHByb3BlcnR5XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV1cbiAgICAgICAgaWYgKGlzVk5vZGUoY2hpbGQpKSB7XG4gICAgICAgICAgICBkZXNjZW5kYW50cyArPSBjaGlsZC5jb3VudCB8fCAwXG5cbiAgICAgICAgICAgIGlmICghaGFzV2lkZ2V0cyAmJiBjaGlsZC5oYXNXaWRnZXRzKSB7XG4gICAgICAgICAgICAgICAgaGFzV2lkZ2V0cyA9IHRydWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFoYXNUaHVua3MgJiYgY2hpbGQuaGFzVGh1bmtzKSB7XG4gICAgICAgICAgICAgICAgaGFzVGh1bmtzID0gdHJ1ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWRlc2NlbmRhbnRIb29rcyAmJiAoY2hpbGQuaG9va3MgfHwgY2hpbGQuZGVzY2VuZGFudEhvb2tzKSkge1xuICAgICAgICAgICAgICAgIGRlc2NlbmRhbnRIb29rcyA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghaGFzV2lkZ2V0cyAmJiBpc1dpZGdldChjaGlsZCkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hpbGQuZGVzdHJveSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgaGFzV2lkZ2V0cyA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghaGFzVGh1bmtzICYmIGlzVGh1bmsoY2hpbGQpKSB7XG4gICAgICAgICAgICBoYXNUaHVua3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jb3VudCA9IGNvdW50ICsgZGVzY2VuZGFudHNcbiAgICB0aGlzLmhhc1dpZGdldHMgPSBoYXNXaWRnZXRzXG4gICAgdGhpcy5oYXNUaHVua3MgPSBoYXNUaHVua3NcbiAgICB0aGlzLmhvb2tzID0gaG9va3NcbiAgICB0aGlzLmRlc2NlbmRhbnRIb29rcyA9IGRlc2NlbmRhbnRIb29rc1xufVxuXG5WaXJ0dWFsTm9kZS5wcm90b3R5cGUudmVyc2lvbiA9IHZlcnNpb25cblZpcnR1YWxOb2RlLnByb3RvdHlwZS50eXBlID0gXCJWaXJ0dWFsTm9kZVwiXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS92bm9kZS5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHZlcnNpb24gPSByZXF1aXJlKFwiLi92ZXJzaW9uXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gVmlydHVhbFRleHRcblxuZnVuY3Rpb24gVmlydHVhbFRleHQodGV4dCkge1xuICAgIHRoaXMudGV4dCA9IFN0cmluZyh0ZXh0KVxufVxuXG5WaXJ0dWFsVGV4dC5wcm90b3R5cGUudmVyc2lvbiA9IHZlcnNpb25cblZpcnR1YWxUZXh0LnByb3RvdHlwZS50eXBlID0gXCJWaXJ0dWFsVGV4dFwiXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS92dGV4dC5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3BsaXQgPSByZXF1aXJlKCdicm93c2VyLXNwbGl0Jyk7XG5cbnZhciBjbGFzc0lkU3BsaXQgPSAvKFtcXC4jXT9bYS16QS1aMC05XFx1MDA3Ri1cXHVGRkZGXzotXSspLztcbnZhciBub3RDbGFzc0lkID0gL15cXC58Iy87XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2VUYWc7XG5cbmZ1bmN0aW9uIHBhcnNlVGFnKHRhZywgcHJvcHMpIHtcbiAgICBpZiAoIXRhZykge1xuICAgICAgICByZXR1cm4gJ0RJVic7XG4gICAgfVxuXG4gICAgdmFyIG5vSWQgPSAhKHByb3BzLmhhc093blByb3BlcnR5KCdpZCcpKTtcblxuICAgIHZhciB0YWdQYXJ0cyA9IHNwbGl0KHRhZywgY2xhc3NJZFNwbGl0KTtcbiAgICB2YXIgdGFnTmFtZSA9IG51bGw7XG5cbiAgICBpZiAobm90Q2xhc3NJZC50ZXN0KHRhZ1BhcnRzWzFdKSkge1xuICAgICAgICB0YWdOYW1lID0gJ0RJVic7XG4gICAgfVxuXG4gICAgdmFyIGNsYXNzZXMsIHBhcnQsIHR5cGUsIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgdGFnUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGFydCA9IHRhZ1BhcnRzW2ldO1xuXG4gICAgICAgIGlmICghcGFydCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB0eXBlID0gcGFydC5jaGFyQXQoMCk7XG5cbiAgICAgICAgaWYgKCF0YWdOYW1lKSB7XG4gICAgICAgICAgICB0YWdOYW1lID0gcGFydDtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnLicpIHtcbiAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzIHx8IFtdO1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKHBhcnQuc3Vic3RyaW5nKDEsIHBhcnQubGVuZ3RoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJyMnICYmIG5vSWQpIHtcbiAgICAgICAgICAgIHByb3BzLmlkID0gcGFydC5zdWJzdHJpbmcoMSwgcGFydC5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgaWYgKHByb3BzLmNsYXNzTmFtZSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKHByb3BzLmNsYXNzTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9wcy5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHMubmFtZXNwYWNlID8gdGFnTmFtZSA6IHRhZ05hbWUudG9VcHBlckNhc2UoKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3ZpcnR1YWwtaHlwZXJzY3JpcHQvcGFyc2UtdGFnLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIENyb3NzLUJyb3dzZXIgU3BsaXQgMS4xLjFcbiAqIENvcHlyaWdodCAyMDA3LTIwMTIgU3RldmVuIExldml0aGFuIDxzdGV2ZW5sZXZpdGhhbi5jb20+XG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG4gKiBFQ01BU2NyaXB0IGNvbXBsaWFudCwgdW5pZm9ybSBjcm9zcy1icm93c2VyIHNwbGl0IG1ldGhvZFxuICovXG5cbi8qKlxuICogU3BsaXRzIGEgc3RyaW5nIGludG8gYW4gYXJyYXkgb2Ygc3RyaW5ncyB1c2luZyBhIHJlZ2V4IG9yIHN0cmluZyBzZXBhcmF0b3IuIE1hdGNoZXMgb2YgdGhlXG4gKiBzZXBhcmF0b3IgYXJlIG5vdCBpbmNsdWRlZCBpbiB0aGUgcmVzdWx0IGFycmF5LiBIb3dldmVyLCBpZiBgc2VwYXJhdG9yYCBpcyBhIHJlZ2V4IHRoYXQgY29udGFpbnNcbiAqIGNhcHR1cmluZyBncm91cHMsIGJhY2tyZWZlcmVuY2VzIGFyZSBzcGxpY2VkIGludG8gdGhlIHJlc3VsdCBlYWNoIHRpbWUgYHNlcGFyYXRvcmAgaXMgbWF0Y2hlZC5cbiAqIEZpeGVzIGJyb3dzZXIgYnVncyBjb21wYXJlZCB0byB0aGUgbmF0aXZlIGBTdHJpbmcucHJvdG90eXBlLnNwbGl0YCBhbmQgY2FuIGJlIHVzZWQgcmVsaWFibHlcbiAqIGNyb3NzLWJyb3dzZXIuXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFN0cmluZyB0byBzcGxpdC5cbiAqIEBwYXJhbSB7UmVnRXhwfFN0cmluZ30gc2VwYXJhdG9yIFJlZ2V4IG9yIHN0cmluZyB0byB1c2UgZm9yIHNlcGFyYXRpbmcgdGhlIHN0cmluZy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbbGltaXRdIE1heGltdW0gbnVtYmVyIG9mIGl0ZW1zIHRvIGluY2x1ZGUgaW4gdGhlIHJlc3VsdCBhcnJheS5cbiAqIEByZXR1cm5zIHtBcnJheX0gQXJyYXkgb2Ygc3Vic3RyaW5ncy5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQmFzaWMgdXNlXG4gKiBzcGxpdCgnYSBiIGMgZCcsICcgJyk7XG4gKiAvLyAtPiBbJ2EnLCAnYicsICdjJywgJ2QnXVxuICpcbiAqIC8vIFdpdGggbGltaXRcbiAqIHNwbGl0KCdhIGIgYyBkJywgJyAnLCAyKTtcbiAqIC8vIC0+IFsnYScsICdiJ11cbiAqXG4gKiAvLyBCYWNrcmVmZXJlbmNlcyBpbiByZXN1bHQgYXJyYXlcbiAqIHNwbGl0KCcuLndvcmQxIHdvcmQyLi4nLCAvKFthLXpdKykoXFxkKykvaSk7XG4gKiAvLyAtPiBbJy4uJywgJ3dvcmQnLCAnMScsICcgJywgJ3dvcmQnLCAnMicsICcuLiddXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uIHNwbGl0KHVuZGVmKSB7XG5cbiAgdmFyIG5hdGl2ZVNwbGl0ID0gU3RyaW5nLnByb3RvdHlwZS5zcGxpdCxcbiAgICBjb21wbGlhbnRFeGVjTnBjZyA9IC8oKT8/Ly5leGVjKFwiXCIpWzFdID09PSB1bmRlZixcbiAgICAvLyBOUENHOiBub25wYXJ0aWNpcGF0aW5nIGNhcHR1cmluZyBncm91cFxuICAgIHNlbGY7XG5cbiAgc2VsZiA9IGZ1bmN0aW9uKHN0ciwgc2VwYXJhdG9yLCBsaW1pdCkge1xuICAgIC8vIElmIGBzZXBhcmF0b3JgIGlzIG5vdCBhIHJlZ2V4LCB1c2UgYG5hdGl2ZVNwbGl0YFxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc2VwYXJhdG9yKSAhPT0gXCJbb2JqZWN0IFJlZ0V4cF1cIikge1xuICAgICAgcmV0dXJuIG5hdGl2ZVNwbGl0LmNhbGwoc3RyLCBzZXBhcmF0b3IsIGxpbWl0KTtcbiAgICB9XG4gICAgdmFyIG91dHB1dCA9IFtdLFxuICAgICAgZmxhZ3MgPSAoc2VwYXJhdG9yLmlnbm9yZUNhc2UgPyBcImlcIiA6IFwiXCIpICsgKHNlcGFyYXRvci5tdWx0aWxpbmUgPyBcIm1cIiA6IFwiXCIpICsgKHNlcGFyYXRvci5leHRlbmRlZCA/IFwieFwiIDogXCJcIikgKyAvLyBQcm9wb3NlZCBmb3IgRVM2XG4gICAgICAoc2VwYXJhdG9yLnN0aWNreSA/IFwieVwiIDogXCJcIiksXG4gICAgICAvLyBGaXJlZm94IDMrXG4gICAgICBsYXN0TGFzdEluZGV4ID0gMCxcbiAgICAgIC8vIE1ha2UgYGdsb2JhbGAgYW5kIGF2b2lkIGBsYXN0SW5kZXhgIGlzc3VlcyBieSB3b3JraW5nIHdpdGggYSBjb3B5XG4gICAgICBzZXBhcmF0b3IgPSBuZXcgUmVnRXhwKHNlcGFyYXRvci5zb3VyY2UsIGZsYWdzICsgXCJnXCIpLFxuICAgICAgc2VwYXJhdG9yMiwgbWF0Y2gsIGxhc3RJbmRleCwgbGFzdExlbmd0aDtcbiAgICBzdHIgKz0gXCJcIjsgLy8gVHlwZS1jb252ZXJ0XG4gICAgaWYgKCFjb21wbGlhbnRFeGVjTnBjZykge1xuICAgICAgLy8gRG9lc24ndCBuZWVkIGZsYWdzIGd5LCBidXQgdGhleSBkb24ndCBodXJ0XG4gICAgICBzZXBhcmF0b3IyID0gbmV3IFJlZ0V4cChcIl5cIiArIHNlcGFyYXRvci5zb3VyY2UgKyBcIiQoPyFcXFxccylcIiwgZmxhZ3MpO1xuICAgIH1cbiAgICAvKiBWYWx1ZXMgZm9yIGBsaW1pdGAsIHBlciB0aGUgc3BlYzpcbiAgICAgKiBJZiB1bmRlZmluZWQ6IDQyOTQ5NjcyOTUgLy8gTWF0aC5wb3coMiwgMzIpIC0gMVxuICAgICAqIElmIDAsIEluZmluaXR5LCBvciBOYU46IDBcbiAgICAgKiBJZiBwb3NpdGl2ZSBudW1iZXI6IGxpbWl0ID0gTWF0aC5mbG9vcihsaW1pdCk7IGlmIChsaW1pdCA+IDQyOTQ5NjcyOTUpIGxpbWl0IC09IDQyOTQ5NjcyOTY7XG4gICAgICogSWYgbmVnYXRpdmUgbnVtYmVyOiA0Mjk0OTY3Mjk2IC0gTWF0aC5mbG9vcihNYXRoLmFicyhsaW1pdCkpXG4gICAgICogSWYgb3RoZXI6IFR5cGUtY29udmVydCwgdGhlbiB1c2UgdGhlIGFib3ZlIHJ1bGVzXG4gICAgICovXG4gICAgbGltaXQgPSBsaW1pdCA9PT0gdW5kZWYgPyAtMSA+Pj4gMCA6IC8vIE1hdGgucG93KDIsIDMyKSAtIDFcbiAgICBsaW1pdCA+Pj4gMDsgLy8gVG9VaW50MzIobGltaXQpXG4gICAgd2hpbGUgKG1hdGNoID0gc2VwYXJhdG9yLmV4ZWMoc3RyKSkge1xuICAgICAgLy8gYHNlcGFyYXRvci5sYXN0SW5kZXhgIGlzIG5vdCByZWxpYWJsZSBjcm9zcy1icm93c2VyXG4gICAgICBsYXN0SW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgIGlmIChsYXN0SW5kZXggPiBsYXN0TGFzdEluZGV4KSB7XG4gICAgICAgIG91dHB1dC5wdXNoKHN0ci5zbGljZShsYXN0TGFzdEluZGV4LCBtYXRjaC5pbmRleCkpO1xuICAgICAgICAvLyBGaXggYnJvd3NlcnMgd2hvc2UgYGV4ZWNgIG1ldGhvZHMgZG9uJ3QgY29uc2lzdGVudGx5IHJldHVybiBgdW5kZWZpbmVkYCBmb3JcbiAgICAgICAgLy8gbm9ucGFydGljaXBhdGluZyBjYXB0dXJpbmcgZ3JvdXBzXG4gICAgICAgIGlmICghY29tcGxpYW50RXhlY05wY2cgJiYgbWF0Y2gubGVuZ3RoID4gMSkge1xuICAgICAgICAgIG1hdGNoWzBdLnJlcGxhY2Uoc2VwYXJhdG9yMiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAyOyBpKyspIHtcbiAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSA9PT0gdW5kZWYpIHtcbiAgICAgICAgICAgICAgICBtYXRjaFtpXSA9IHVuZGVmO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hdGNoLmxlbmd0aCA+IDEgJiYgbWF0Y2guaW5kZXggPCBzdHIubGVuZ3RoKSB7XG4gICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkob3V0cHV0LCBtYXRjaC5zbGljZSgxKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdExlbmd0aCA9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgbGFzdExhc3RJbmRleCA9IGxhc3RJbmRleDtcbiAgICAgICAgaWYgKG91dHB1dC5sZW5ndGggPj0gbGltaXQpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNlcGFyYXRvci5sYXN0SW5kZXggPT09IG1hdGNoLmluZGV4KSB7XG4gICAgICAgIHNlcGFyYXRvci5sYXN0SW5kZXgrKzsgLy8gQXZvaWQgYW4gaW5maW5pdGUgbG9vcFxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobGFzdExhc3RJbmRleCA9PT0gc3RyLmxlbmd0aCkge1xuICAgICAgaWYgKGxhc3RMZW5ndGggfHwgIXNlcGFyYXRvci50ZXN0KFwiXCIpKSB7XG4gICAgICAgIG91dHB1dC5wdXNoKFwiXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQucHVzaChzdHIuc2xpY2UobGFzdExhc3RJbmRleCkpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0Lmxlbmd0aCA+IGxpbWl0ID8gb3V0cHV0LnNsaWNlKDAsIGxpbWl0KSA6IG91dHB1dDtcbiAgfTtcblxuICByZXR1cm4gc2VsZjtcbn0pKCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9icm93c2VyLXNwbGl0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gU29mdFNldEhvb2s7XG5cbmZ1bmN0aW9uIFNvZnRTZXRIb29rKHZhbHVlKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNvZnRTZXRIb29rKSkge1xuICAgICAgICByZXR1cm4gbmV3IFNvZnRTZXRIb29rKHZhbHVlKTtcbiAgICB9XG5cbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG59XG5cblNvZnRTZXRIb29rLnByb3RvdHlwZS5ob29rID0gZnVuY3Rpb24gKG5vZGUsIHByb3BlcnR5TmFtZSkge1xuICAgIGlmIChub2RlW3Byb3BlcnR5TmFtZV0gIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgbm9kZVtwcm9wZXJ0eU5hbWVdID0gdGhpcy52YWx1ZTtcbiAgICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdmlydHVhbC1oeXBlcnNjcmlwdC9ob29rcy9zb2Z0LXNldC1ob29rLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBFdlN0b3JlID0gcmVxdWlyZSgnZXYtc3RvcmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdkhvb2s7XG5cbmZ1bmN0aW9uIEV2SG9vayh2YWx1ZSkge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBFdkhvb2spKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXZIb29rKHZhbHVlKTtcbiAgICB9XG5cbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG59XG5cbkV2SG9vay5wcm90b3R5cGUuaG9vayA9IGZ1bmN0aW9uIChub2RlLCBwcm9wZXJ0eU5hbWUpIHtcbiAgICB2YXIgZXMgPSBFdlN0b3JlKG5vZGUpO1xuICAgIHZhciBwcm9wTmFtZSA9IHByb3BlcnR5TmFtZS5zdWJzdHIoMyk7XG5cbiAgICBlc1twcm9wTmFtZV0gPSB0aGlzLnZhbHVlO1xufTtcblxuRXZIb29rLnByb3RvdHlwZS51bmhvb2sgPSBmdW5jdGlvbihub2RlLCBwcm9wZXJ0eU5hbWUpIHtcbiAgICB2YXIgZXMgPSBFdlN0b3JlKG5vZGUpO1xuICAgIHZhciBwcm9wTmFtZSA9IHByb3BlcnR5TmFtZS5zdWJzdHIoMyk7XG5cbiAgICBlc1twcm9wTmFtZV0gPSB1bmRlZmluZWQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdmlydHVhbC1oeXBlcnNjcmlwdC9ob29rcy9ldi1ob29rLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBPbmVWZXJzaW9uQ29uc3RyYWludCA9IHJlcXVpcmUoJ2luZGl2aWR1YWwvb25lLXZlcnNpb24nKTtcblxudmFyIE1ZX1ZFUlNJT04gPSAnNyc7XG5PbmVWZXJzaW9uQ29uc3RyYWludCgnZXYtc3RvcmUnLCBNWV9WRVJTSU9OKTtcblxudmFyIGhhc2hLZXkgPSAnX19FVl9TVE9SRV9LRVlAJyArIE1ZX1ZFUlNJT047XG5cbm1vZHVsZS5leHBvcnRzID0gRXZTdG9yZTtcblxuZnVuY3Rpb24gRXZTdG9yZShlbGVtKSB7XG4gICAgdmFyIGhhc2ggPSBlbGVtW2hhc2hLZXldO1xuXG4gICAgaWYgKCFoYXNoKSB7XG4gICAgICAgIGhhc2ggPSBlbGVtW2hhc2hLZXldID0ge307XG4gICAgfVxuXG4gICAgcmV0dXJuIGhhc2g7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9ldi1zdG9yZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgSW5kaXZpZHVhbCA9IHJlcXVpcmUoJy4vaW5kZXguanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPbmVWZXJzaW9uO1xuXG5mdW5jdGlvbiBPbmVWZXJzaW9uKG1vZHVsZU5hbWUsIHZlcnNpb24sIGRlZmF1bHRWYWx1ZSkge1xuICAgIHZhciBrZXkgPSAnX19JTkRJVklEVUFMX09ORV9WRVJTSU9OXycgKyBtb2R1bGVOYW1lO1xuICAgIHZhciBlbmZvcmNlS2V5ID0ga2V5ICsgJ19FTkZPUkNFX1NJTkdMRVRPTic7XG5cbiAgICB2YXIgdmVyc2lvblZhbHVlID0gSW5kaXZpZHVhbChlbmZvcmNlS2V5LCB2ZXJzaW9uKTtcblxuICAgIGlmICh2ZXJzaW9uVmFsdWUgIT09IHZlcnNpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gb25seSBoYXZlIG9uZSBjb3B5IG9mICcgK1xuICAgICAgICAgICAgbW9kdWxlTmFtZSArICcuXFxuJyArXG4gICAgICAgICAgICAnWW91IGFscmVhZHkgaGF2ZSB2ZXJzaW9uICcgKyB2ZXJzaW9uVmFsdWUgK1xuICAgICAgICAgICAgJyBpbnN0YWxsZWQuXFxuJyArXG4gICAgICAgICAgICAnVGhpcyBtZWFucyB5b3UgY2Fubm90IGluc3RhbGwgdmVyc2lvbiAnICsgdmVyc2lvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIEluZGl2aWR1YWwoa2V5LCBkZWZhdWx0VmFsdWUpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaW5kaXZpZHVhbC9vbmUtdmVyc2lvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKmdsb2JhbCB3aW5kb3csIGdsb2JhbCovXG5cbnZhciByb290ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgP1xuICAgIHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID9cbiAgICBnbG9iYWwgOiB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbmRpdmlkdWFsO1xuXG5mdW5jdGlvbiBJbmRpdmlkdWFsKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5IGluIHJvb3QpIHtcbiAgICAgICAgcmV0dXJuIHJvb3Rba2V5XTtcbiAgICB9XG5cbiAgICByb290W2tleV0gPSB2YWx1ZTtcblxuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2luZGl2aWR1YWwvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkaWZmID0gcmVxdWlyZShcIi4vdnRyZWUvZGlmZi5qc1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL2RpZmYuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc0FycmF5ID0gcmVxdWlyZShcIngtaXMtYXJyYXlcIilcblxudmFyIFZQYXRjaCA9IHJlcXVpcmUoXCIuLi92bm9kZS92cGF0Y2hcIilcbnZhciBpc1ZOb2RlID0gcmVxdWlyZShcIi4uL3Zub2RlL2lzLXZub2RlXCIpXG52YXIgaXNWVGV4dCA9IHJlcXVpcmUoXCIuLi92bm9kZS9pcy12dGV4dFwiKVxudmFyIGlzV2lkZ2V0ID0gcmVxdWlyZShcIi4uL3Zub2RlL2lzLXdpZGdldFwiKVxudmFyIGlzVGh1bmsgPSByZXF1aXJlKFwiLi4vdm5vZGUvaXMtdGh1bmtcIilcbnZhciBoYW5kbGVUaHVuayA9IHJlcXVpcmUoXCIuLi92bm9kZS9oYW5kbGUtdGh1bmtcIilcblxudmFyIGRpZmZQcm9wcyA9IHJlcXVpcmUoXCIuL2RpZmYtcHJvcHNcIilcblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmXG5cbmZ1bmN0aW9uIGRpZmYoYSwgYikge1xuICAgIHZhciBwYXRjaCA9IHsgYTogYSB9XG4gICAgd2FsayhhLCBiLCBwYXRjaCwgMClcbiAgICByZXR1cm4gcGF0Y2hcbn1cblxuZnVuY3Rpb24gd2FsayhhLCBiLCBwYXRjaCwgaW5kZXgpIHtcbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB2YXIgYXBwbHkgPSBwYXRjaFtpbmRleF1cbiAgICB2YXIgYXBwbHlDbGVhciA9IGZhbHNlXG5cbiAgICBpZiAoaXNUaHVuayhhKSB8fCBpc1RodW5rKGIpKSB7XG4gICAgICAgIHRodW5rcyhhLCBiLCBwYXRjaCwgaW5kZXgpXG4gICAgfSBlbHNlIGlmIChiID09IG51bGwpIHtcblxuICAgICAgICAvLyBJZiBhIGlzIGEgd2lkZ2V0IHdlIHdpbGwgYWRkIGEgcmVtb3ZlIHBhdGNoIGZvciBpdFxuICAgICAgICAvLyBPdGhlcndpc2UgYW55IGNoaWxkIHdpZGdldHMvaG9va3MgbXVzdCBiZSBkZXN0cm95ZWQuXG4gICAgICAgIC8vIFRoaXMgcHJldmVudHMgYWRkaW5nIHR3byByZW1vdmUgcGF0Y2hlcyBmb3IgYSB3aWRnZXQuXG4gICAgICAgIGlmICghaXNXaWRnZXQoYSkpIHtcbiAgICAgICAgICAgIGNsZWFyU3RhdGUoYSwgcGF0Y2gsIGluZGV4KVxuICAgICAgICAgICAgYXBwbHkgPSBwYXRjaFtpbmRleF1cbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5ID0gYXBwZW5kUGF0Y2goYXBwbHksIG5ldyBWUGF0Y2goVlBhdGNoLlJFTU9WRSwgYSwgYikpXG4gICAgfSBlbHNlIGlmIChpc1ZOb2RlKGIpKSB7XG4gICAgICAgIGlmIChpc1ZOb2RlKGEpKSB7XG4gICAgICAgICAgICBpZiAoYS50YWdOYW1lID09PSBiLnRhZ05hbWUgJiZcbiAgICAgICAgICAgICAgICBhLm5hbWVzcGFjZSA9PT0gYi5uYW1lc3BhY2UgJiZcbiAgICAgICAgICAgICAgICBhLmtleSA9PT0gYi5rZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcHNQYXRjaCA9IGRpZmZQcm9wcyhhLnByb3BlcnRpZXMsIGIucHJvcGVydGllcylcbiAgICAgICAgICAgICAgICBpZiAocHJvcHNQYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBhcHBseSA9IGFwcGVuZFBhdGNoKGFwcGx5LFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFZQYXRjaChWUGF0Y2guUFJPUFMsIGEsIHByb3BzUGF0Y2gpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcHBseSA9IGRpZmZDaGlsZHJlbihhLCBiLCBwYXRjaCwgYXBwbHksIGluZGV4KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcHBseSA9IGFwcGVuZFBhdGNoKGFwcGx5LCBuZXcgVlBhdGNoKFZQYXRjaC5WTk9ERSwgYSwgYikpXG4gICAgICAgICAgICAgICAgYXBwbHlDbGVhciA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFwcGx5ID0gYXBwZW5kUGF0Y2goYXBwbHksIG5ldyBWUGF0Y2goVlBhdGNoLlZOT0RFLCBhLCBiKSlcbiAgICAgICAgICAgIGFwcGx5Q2xlYXIgPSB0cnVlXG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzVlRleHQoYikpIHtcbiAgICAgICAgaWYgKCFpc1ZUZXh0KGEpKSB7XG4gICAgICAgICAgICBhcHBseSA9IGFwcGVuZFBhdGNoKGFwcGx5LCBuZXcgVlBhdGNoKFZQYXRjaC5WVEVYVCwgYSwgYikpXG4gICAgICAgICAgICBhcHBseUNsZWFyID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKGEudGV4dCAhPT0gYi50ZXh0KSB7XG4gICAgICAgICAgICBhcHBseSA9IGFwcGVuZFBhdGNoKGFwcGx5LCBuZXcgVlBhdGNoKFZQYXRjaC5WVEVYVCwgYSwgYikpXG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzV2lkZ2V0KGIpKSB7XG4gICAgICAgIGlmICghaXNXaWRnZXQoYSkpIHtcbiAgICAgICAgICAgIGFwcGx5Q2xlYXIgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBhcHBseSA9IGFwcGVuZFBhdGNoKGFwcGx5LCBuZXcgVlBhdGNoKFZQYXRjaC5XSURHRVQsIGEsIGIpKVxuICAgIH1cblxuICAgIGlmIChhcHBseSkge1xuICAgICAgICBwYXRjaFtpbmRleF0gPSBhcHBseVxuICAgIH1cblxuICAgIGlmIChhcHBseUNsZWFyKSB7XG4gICAgICAgIGNsZWFyU3RhdGUoYSwgcGF0Y2gsIGluZGV4KVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGlmZkNoaWxkcmVuKGEsIGIsIHBhdGNoLCBhcHBseSwgaW5kZXgpIHtcbiAgICB2YXIgYUNoaWxkcmVuID0gYS5jaGlsZHJlblxuICAgIHZhciBvcmRlcmVkU2V0ID0gcmVvcmRlcihhQ2hpbGRyZW4sIGIuY2hpbGRyZW4pXG4gICAgdmFyIGJDaGlsZHJlbiA9IG9yZGVyZWRTZXQuY2hpbGRyZW5cblxuICAgIHZhciBhTGVuID0gYUNoaWxkcmVuLmxlbmd0aFxuICAgIHZhciBiTGVuID0gYkNoaWxkcmVuLmxlbmd0aFxuICAgIHZhciBsZW4gPSBhTGVuID4gYkxlbiA/IGFMZW4gOiBiTGVuXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBsZWZ0Tm9kZSA9IGFDaGlsZHJlbltpXVxuICAgICAgICB2YXIgcmlnaHROb2RlID0gYkNoaWxkcmVuW2ldXG4gICAgICAgIGluZGV4ICs9IDFcblxuICAgICAgICBpZiAoIWxlZnROb2RlKSB7XG4gICAgICAgICAgICBpZiAocmlnaHROb2RlKSB7XG4gICAgICAgICAgICAgICAgLy8gRXhjZXNzIG5vZGVzIGluIGIgbmVlZCB0byBiZSBhZGRlZFxuICAgICAgICAgICAgICAgIGFwcGx5ID0gYXBwZW5kUGF0Y2goYXBwbHksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWUGF0Y2goVlBhdGNoLklOU0VSVCwgbnVsbCwgcmlnaHROb2RlKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdhbGsobGVmdE5vZGUsIHJpZ2h0Tm9kZSwgcGF0Y2gsIGluZGV4KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzVk5vZGUobGVmdE5vZGUpICYmIGxlZnROb2RlLmNvdW50KSB7XG4gICAgICAgICAgICBpbmRleCArPSBsZWZ0Tm9kZS5jb3VudFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9yZGVyZWRTZXQubW92ZXMpIHtcbiAgICAgICAgLy8gUmVvcmRlciBub2RlcyBsYXN0XG4gICAgICAgIGFwcGx5ID0gYXBwZW5kUGF0Y2goYXBwbHksIG5ldyBWUGF0Y2goXG4gICAgICAgICAgICBWUGF0Y2guT1JERVIsXG4gICAgICAgICAgICBhLFxuICAgICAgICAgICAgb3JkZXJlZFNldC5tb3Zlc1xuICAgICAgICApKVxuICAgIH1cblxuICAgIHJldHVybiBhcHBseVxufVxuXG5mdW5jdGlvbiBjbGVhclN0YXRlKHZOb2RlLCBwYXRjaCwgaW5kZXgpIHtcbiAgICAvLyBUT0RPOiBNYWtlIHRoaXMgYSBzaW5nbGUgd2Fsaywgbm90IHR3b1xuICAgIHVuaG9vayh2Tm9kZSwgcGF0Y2gsIGluZGV4KVxuICAgIGRlc3Ryb3lXaWRnZXRzKHZOb2RlLCBwYXRjaCwgaW5kZXgpXG59XG5cbi8vIFBhdGNoIHJlY29yZHMgZm9yIGFsbCBkZXN0cm95ZWQgd2lkZ2V0cyBtdXN0IGJlIGFkZGVkIGJlY2F1c2Ugd2UgbmVlZFxuLy8gYSBET00gbm9kZSByZWZlcmVuY2UgZm9yIHRoZSBkZXN0cm95IGZ1bmN0aW9uXG5mdW5jdGlvbiBkZXN0cm95V2lkZ2V0cyh2Tm9kZSwgcGF0Y2gsIGluZGV4KSB7XG4gICAgaWYgKGlzV2lkZ2V0KHZOb2RlKSkge1xuICAgICAgICBpZiAodHlwZW9mIHZOb2RlLmRlc3Ryb3kgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcGF0Y2hbaW5kZXhdID0gYXBwZW5kUGF0Y2goXG4gICAgICAgICAgICAgICAgcGF0Y2hbaW5kZXhdLFxuICAgICAgICAgICAgICAgIG5ldyBWUGF0Y2goVlBhdGNoLlJFTU9WRSwgdk5vZGUsIG51bGwpXG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzVk5vZGUodk5vZGUpICYmICh2Tm9kZS5oYXNXaWRnZXRzIHx8IHZOb2RlLmhhc1RodW5rcykpIHtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdk5vZGUuY2hpbGRyZW5cbiAgICAgICAgdmFyIGxlbiA9IGNoaWxkcmVuLmxlbmd0aFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuICAgICAgICAgICAgaW5kZXggKz0gMVxuXG4gICAgICAgICAgICBkZXN0cm95V2lkZ2V0cyhjaGlsZCwgcGF0Y2gsIGluZGV4KVxuXG4gICAgICAgICAgICBpZiAoaXNWTm9kZShjaGlsZCkgJiYgY2hpbGQuY291bnQpIHtcbiAgICAgICAgICAgICAgICBpbmRleCArPSBjaGlsZC5jb3VudFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1RodW5rKHZOb2RlKSkge1xuICAgICAgICB0aHVua3Modk5vZGUsIG51bGwsIHBhdGNoLCBpbmRleClcbiAgICB9XG59XG5cbi8vIENyZWF0ZSBhIHN1Yi1wYXRjaCBmb3IgdGh1bmtzXG5mdW5jdGlvbiB0aHVua3MoYSwgYiwgcGF0Y2gsIGluZGV4KSB7XG4gICAgdmFyIG5vZGVzID0gaGFuZGxlVGh1bmsoYSwgYilcbiAgICB2YXIgdGh1bmtQYXRjaCA9IGRpZmYobm9kZXMuYSwgbm9kZXMuYilcbiAgICBpZiAoaGFzUGF0Y2hlcyh0aHVua1BhdGNoKSkge1xuICAgICAgICBwYXRjaFtpbmRleF0gPSBuZXcgVlBhdGNoKFZQYXRjaC5USFVOSywgbnVsbCwgdGh1bmtQYXRjaClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhhc1BhdGNoZXMocGF0Y2gpIHtcbiAgICBmb3IgKHZhciBpbmRleCBpbiBwYXRjaCkge1xuICAgICAgICBpZiAoaW5kZXggIT09IFwiYVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlXG59XG5cbi8vIEV4ZWN1dGUgaG9va3Mgd2hlbiB0d28gbm9kZXMgYXJlIGlkZW50aWNhbFxuZnVuY3Rpb24gdW5ob29rKHZOb2RlLCBwYXRjaCwgaW5kZXgpIHtcbiAgICBpZiAoaXNWTm9kZSh2Tm9kZSkpIHtcbiAgICAgICAgaWYgKHZOb2RlLmhvb2tzKSB7XG4gICAgICAgICAgICBwYXRjaFtpbmRleF0gPSBhcHBlbmRQYXRjaChcbiAgICAgICAgICAgICAgICBwYXRjaFtpbmRleF0sXG4gICAgICAgICAgICAgICAgbmV3IFZQYXRjaChcbiAgICAgICAgICAgICAgICAgICAgVlBhdGNoLlBST1BTLFxuICAgICAgICAgICAgICAgICAgICB2Tm9kZSxcbiAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkS2V5cyh2Tm9kZS5ob29rcylcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodk5vZGUuZGVzY2VuZGFudEhvb2tzIHx8IHZOb2RlLmhhc1RodW5rcykge1xuICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gdk5vZGUuY2hpbGRyZW5cbiAgICAgICAgICAgIHZhciBsZW4gPSBjaGlsZHJlbi5sZW5ndGhcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuICAgICAgICAgICAgICAgIGluZGV4ICs9IDFcblxuICAgICAgICAgICAgICAgIHVuaG9vayhjaGlsZCwgcGF0Y2gsIGluZGV4KVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzVk5vZGUoY2hpbGQpICYmIGNoaWxkLmNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ICs9IGNoaWxkLmNvdW50XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1RodW5rKHZOb2RlKSkge1xuICAgICAgICB0aHVua3Modk5vZGUsIG51bGwsIHBhdGNoLCBpbmRleClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHVuZGVmaW5lZEtleXMob2JqKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFxufVxuXG4vLyBMaXN0IGRpZmYsIG5haXZlIGxlZnQgdG8gcmlnaHQgcmVvcmRlcmluZ1xuZnVuY3Rpb24gcmVvcmRlcihhQ2hpbGRyZW4sIGJDaGlsZHJlbikge1xuICAgIC8vIE8oTSkgdGltZSwgTyhNKSBtZW1vcnlcbiAgICB2YXIgYkNoaWxkSW5kZXggPSBrZXlJbmRleChiQ2hpbGRyZW4pXG4gICAgdmFyIGJLZXlzID0gYkNoaWxkSW5kZXgua2V5c1xuICAgIHZhciBiRnJlZSA9IGJDaGlsZEluZGV4LmZyZWVcblxuICAgIGlmIChiRnJlZS5sZW5ndGggPT09IGJDaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBiQ2hpbGRyZW4sXG4gICAgICAgICAgICBtb3ZlczogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gTyhOKSB0aW1lLCBPKE4pIG1lbW9yeVxuICAgIHZhciBhQ2hpbGRJbmRleCA9IGtleUluZGV4KGFDaGlsZHJlbilcbiAgICB2YXIgYUtleXMgPSBhQ2hpbGRJbmRleC5rZXlzXG4gICAgdmFyIGFGcmVlID0gYUNoaWxkSW5kZXguZnJlZVxuXG4gICAgaWYgKGFGcmVlLmxlbmd0aCA9PT0gYUNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2hpbGRyZW46IGJDaGlsZHJlbixcbiAgICAgICAgICAgIG1vdmVzOiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPKE1BWChOLCBNKSkgbWVtb3J5XG4gICAgdmFyIG5ld0NoaWxkcmVuID0gW11cblxuICAgIHZhciBmcmVlSW5kZXggPSAwXG4gICAgdmFyIGZyZWVDb3VudCA9IGJGcmVlLmxlbmd0aFxuICAgIHZhciBkZWxldGVkSXRlbXMgPSAwXG5cbiAgICAvLyBJdGVyYXRlIHRocm91Z2ggYSBhbmQgbWF0Y2ggYSBub2RlIGluIGJcbiAgICAvLyBPKE4pIHRpbWUsXG4gICAgZm9yICh2YXIgaSA9IDAgOyBpIDwgYUNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhSXRlbSA9IGFDaGlsZHJlbltpXVxuICAgICAgICB2YXIgaXRlbUluZGV4XG5cbiAgICAgICAgaWYgKGFJdGVtLmtleSkge1xuICAgICAgICAgICAgaWYgKGJLZXlzLmhhc093blByb3BlcnR5KGFJdGVtLmtleSkpIHtcbiAgICAgICAgICAgICAgICAvLyBNYXRjaCB1cCB0aGUgb2xkIGtleXNcbiAgICAgICAgICAgICAgICBpdGVtSW5kZXggPSBiS2V5c1thSXRlbS5rZXldXG4gICAgICAgICAgICAgICAgbmV3Q2hpbGRyZW4ucHVzaChiQ2hpbGRyZW5baXRlbUluZGV4XSlcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgb2xkIGtleWVkIGl0ZW1zXG4gICAgICAgICAgICAgICAgaXRlbUluZGV4ID0gaSAtIGRlbGV0ZWRJdGVtcysrXG4gICAgICAgICAgICAgICAgbmV3Q2hpbGRyZW4ucHVzaChudWxsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTWF0Y2ggdGhlIGl0ZW0gaW4gYSB3aXRoIHRoZSBuZXh0IGZyZWUgaXRlbSBpbiBiXG4gICAgICAgICAgICBpZiAoZnJlZUluZGV4IDwgZnJlZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgaXRlbUluZGV4ID0gYkZyZWVbZnJlZUluZGV4KytdXG4gICAgICAgICAgICAgICAgbmV3Q2hpbGRyZW4ucHVzaChiQ2hpbGRyZW5baXRlbUluZGV4XSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVGhlcmUgYXJlIG5vIGZyZWUgaXRlbXMgaW4gYiB0byBtYXRjaCB3aXRoXG4gICAgICAgICAgICAgICAgLy8gdGhlIGZyZWUgaXRlbXMgaW4gYSwgc28gdGhlIGV4dHJhIGZyZWUgbm9kZXNcbiAgICAgICAgICAgICAgICAvLyBhcmUgZGVsZXRlZC5cbiAgICAgICAgICAgICAgICBpdGVtSW5kZXggPSBpIC0gZGVsZXRlZEl0ZW1zKytcbiAgICAgICAgICAgICAgICBuZXdDaGlsZHJlbi5wdXNoKG51bGwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbGFzdEZyZWVJbmRleCA9IGZyZWVJbmRleCA+PSBiRnJlZS5sZW5ndGggP1xuICAgICAgICBiQ2hpbGRyZW4ubGVuZ3RoIDpcbiAgICAgICAgYkZyZWVbZnJlZUluZGV4XVxuXG4gICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGIgYW5kIGFwcGVuZCBhbnkgbmV3IGtleXNcbiAgICAvLyBPKE0pIHRpbWVcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGJDaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgbmV3SXRlbSA9IGJDaGlsZHJlbltqXVxuXG4gICAgICAgIGlmIChuZXdJdGVtLmtleSkge1xuICAgICAgICAgICAgaWYgKCFhS2V5cy5oYXNPd25Qcm9wZXJ0eShuZXdJdGVtLmtleSkpIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgYW55IG5ldyBrZXllZCBpdGVtc1xuICAgICAgICAgICAgICAgIC8vIFdlIGFyZSBhZGRpbmcgbmV3IGl0ZW1zIHRvIHRoZSBlbmQgYW5kIHRoZW4gc29ydGluZyB0aGVtXG4gICAgICAgICAgICAgICAgLy8gaW4gcGxhY2UuIEluIGZ1dHVyZSB3ZSBzaG91bGQgaW5zZXJ0IG5ldyBpdGVtcyBpbiBwbGFjZS5cbiAgICAgICAgICAgICAgICBuZXdDaGlsZHJlbi5wdXNoKG5ld0l0ZW0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaiA+PSBsYXN0RnJlZUluZGV4KSB7XG4gICAgICAgICAgICAvLyBBZGQgYW55IGxlZnRvdmVyIG5vbi1rZXllZCBpdGVtc1xuICAgICAgICAgICAgbmV3Q2hpbGRyZW4ucHVzaChuZXdJdGVtKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHNpbXVsYXRlID0gbmV3Q2hpbGRyZW4uc2xpY2UoKVxuICAgIHZhciBzaW11bGF0ZUluZGV4ID0gMFxuICAgIHZhciByZW1vdmVzID0gW11cbiAgICB2YXIgaW5zZXJ0cyA9IFtdXG4gICAgdmFyIHNpbXVsYXRlSXRlbVxuXG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCBiQ2hpbGRyZW4ubGVuZ3RoOykge1xuICAgICAgICB2YXIgd2FudGVkSXRlbSA9IGJDaGlsZHJlbltrXVxuICAgICAgICBzaW11bGF0ZUl0ZW0gPSBzaW11bGF0ZVtzaW11bGF0ZUluZGV4XVxuXG4gICAgICAgIC8vIHJlbW92ZSBpdGVtc1xuICAgICAgICB3aGlsZSAoc2ltdWxhdGVJdGVtID09PSBudWxsICYmIHNpbXVsYXRlLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVtb3Zlcy5wdXNoKHJlbW92ZShzaW11bGF0ZSwgc2ltdWxhdGVJbmRleCwgbnVsbCkpXG4gICAgICAgICAgICBzaW11bGF0ZUl0ZW0gPSBzaW11bGF0ZVtzaW11bGF0ZUluZGV4XVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzaW11bGF0ZUl0ZW0gfHwgc2ltdWxhdGVJdGVtLmtleSAhPT0gd2FudGVkSXRlbS5rZXkpIHtcbiAgICAgICAgICAgIC8vIGlmIHdlIG5lZWQgYSBrZXkgaW4gdGhpcyBwb3NpdGlvbi4uLlxuICAgICAgICAgICAgaWYgKHdhbnRlZEl0ZW0ua2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHNpbXVsYXRlSXRlbSAmJiBzaW11bGF0ZUl0ZW0ua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGFuIGluc2VydCBkb2Vzbid0IHB1dCB0aGlzIGtleSBpbiBwbGFjZSwgaXQgbmVlZHMgdG8gbW92ZVxuICAgICAgICAgICAgICAgICAgICBpZiAoYktleXNbc2ltdWxhdGVJdGVtLmtleV0gIT09IGsgKyAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVzLnB1c2gocmVtb3ZlKHNpbXVsYXRlLCBzaW11bGF0ZUluZGV4LCBzaW11bGF0ZUl0ZW0ua2V5KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpbXVsYXRlSXRlbSA9IHNpbXVsYXRlW3NpbXVsYXRlSW5kZXhdXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcmVtb3ZlIGRpZG4ndCBwdXQgdGhlIHdhbnRlZCBpdGVtIGluIHBsYWNlLCB3ZSBuZWVkIHRvIGluc2VydCBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzaW11bGF0ZUl0ZW0gfHwgc2ltdWxhdGVJdGVtLmtleSAhPT0gd2FudGVkSXRlbS5rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRzLnB1c2goe2tleTogd2FudGVkSXRlbS5rZXksIHRvOiBrfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0ZW1zIGFyZSBtYXRjaGluZywgc28gc2tpcCBhaGVhZFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2ltdWxhdGVJbmRleCsrXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRzLnB1c2goe2tleTogd2FudGVkSXRlbS5rZXksIHRvOiBrfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0cy5wdXNoKHtrZXk6IHdhbnRlZEl0ZW0ua2V5LCB0bzoga30pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGsrK1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gYSBrZXkgaW4gc2ltdWxhdGUgaGFzIG5vIG1hdGNoaW5nIHdhbnRlZCBrZXksIHJlbW92ZSBpdFxuICAgICAgICAgICAgZWxzZSBpZiAoc2ltdWxhdGVJdGVtICYmIHNpbXVsYXRlSXRlbS5rZXkpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVzLnB1c2gocmVtb3ZlKHNpbXVsYXRlLCBzaW11bGF0ZUluZGV4LCBzaW11bGF0ZUl0ZW0ua2V5KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNpbXVsYXRlSW5kZXgrK1xuICAgICAgICAgICAgaysrXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZW1vdmUgYWxsIHRoZSByZW1haW5pbmcgbm9kZXMgZnJvbSBzaW11bGF0ZVxuICAgIHdoaWxlKHNpbXVsYXRlSW5kZXggPCBzaW11bGF0ZS5sZW5ndGgpIHtcbiAgICAgICAgc2ltdWxhdGVJdGVtID0gc2ltdWxhdGVbc2ltdWxhdGVJbmRleF1cbiAgICAgICAgcmVtb3Zlcy5wdXNoKHJlbW92ZShzaW11bGF0ZSwgc2ltdWxhdGVJbmRleCwgc2ltdWxhdGVJdGVtICYmIHNpbXVsYXRlSXRlbS5rZXkpKVxuICAgIH1cblxuICAgIC8vIElmIHRoZSBvbmx5IG1vdmVzIHdlIGhhdmUgYXJlIGRlbGV0ZXMgdGhlbiB3ZSBjYW4ganVzdFxuICAgIC8vIGxldCB0aGUgZGVsZXRlIHBhdGNoIHJlbW92ZSB0aGVzZSBpdGVtcy5cbiAgICBpZiAocmVtb3Zlcy5sZW5ndGggPT09IGRlbGV0ZWRJdGVtcyAmJiAhaW5zZXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBuZXdDaGlsZHJlbixcbiAgICAgICAgICAgIG1vdmVzOiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjaGlsZHJlbjogbmV3Q2hpbGRyZW4sXG4gICAgICAgIG1vdmVzOiB7XG4gICAgICAgICAgICByZW1vdmVzOiByZW1vdmVzLFxuICAgICAgICAgICAgaW5zZXJ0czogaW5zZXJ0c1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmUoYXJyLCBpbmRleCwga2V5KSB7XG4gICAgYXJyLnNwbGljZShpbmRleCwgMSlcblxuICAgIHJldHVybiB7XG4gICAgICAgIGZyb206IGluZGV4LFxuICAgICAgICBrZXk6IGtleVxuICAgIH1cbn1cblxuZnVuY3Rpb24ga2V5SW5kZXgoY2hpbGRyZW4pIHtcbiAgICB2YXIga2V5cyA9IHt9XG4gICAgdmFyIGZyZWUgPSBbXVxuICAgIHZhciBsZW5ndGggPSBjaGlsZHJlbi5sZW5ndGhcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV1cblxuICAgICAgICBpZiAoY2hpbGQua2V5KSB7XG4gICAgICAgICAgICBrZXlzW2NoaWxkLmtleV0gPSBpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcmVlLnB1c2goaSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGtleXM6IGtleXMsICAgICAvLyBBIGhhc2ggb2Yga2V5IG5hbWUgdG8gaW5kZXhcbiAgICAgICAgZnJlZTogZnJlZSAgICAgIC8vIEFuIGFycmF5IG9mIHVua2V5ZWQgaXRlbSBpbmRpY2VzXG4gICAgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmRQYXRjaChhcHBseSwgcGF0Y2gpIHtcbiAgICBpZiAoYXBwbHkpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkoYXBwbHkpKSB7XG4gICAgICAgICAgICBhcHBseS5wdXNoKHBhdGNoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXBwbHkgPSBbYXBwbHksIHBhdGNoXVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFwcGx5XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHBhdGNoXG4gICAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdnRyZWUvZGlmZi5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZShcImlzLW9iamVjdFwiKVxudmFyIGlzSG9vayA9IHJlcXVpcmUoXCIuLi92bm9kZS9pcy12aG9va1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZQcm9wc1xuXG5mdW5jdGlvbiBkaWZmUHJvcHMoYSwgYikge1xuICAgIHZhciBkaWZmXG5cbiAgICBmb3IgKHZhciBhS2V5IGluIGEpIHtcbiAgICAgICAgaWYgKCEoYUtleSBpbiBiKSkge1xuICAgICAgICAgICAgZGlmZiA9IGRpZmYgfHwge31cbiAgICAgICAgICAgIGRpZmZbYUtleV0gPSB1bmRlZmluZWRcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhVmFsdWUgPSBhW2FLZXldXG4gICAgICAgIHZhciBiVmFsdWUgPSBiW2FLZXldXG5cbiAgICAgICAgaWYgKGFWYWx1ZSA9PT0gYlZhbHVlKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGFWYWx1ZSkgJiYgaXNPYmplY3QoYlZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKGdldFByb3RvdHlwZShiVmFsdWUpICE9PSBnZXRQcm90b3R5cGUoYVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGRpZmYgPSBkaWZmIHx8IHt9XG4gICAgICAgICAgICAgICAgZGlmZlthS2V5XSA9IGJWYWx1ZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0hvb2soYlZhbHVlKSkge1xuICAgICAgICAgICAgICAgICBkaWZmID0gZGlmZiB8fCB7fVxuICAgICAgICAgICAgICAgICBkaWZmW2FLZXldID0gYlZhbHVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBvYmplY3REaWZmID0gZGlmZlByb3BzKGFWYWx1ZSwgYlZhbHVlKVxuICAgICAgICAgICAgICAgIGlmIChvYmplY3REaWZmKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpZmYgPSBkaWZmIHx8IHt9XG4gICAgICAgICAgICAgICAgICAgIGRpZmZbYUtleV0gPSBvYmplY3REaWZmXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlmZiA9IGRpZmYgfHwge31cbiAgICAgICAgICAgIGRpZmZbYUtleV0gPSBiVmFsdWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGJLZXkgaW4gYikge1xuICAgICAgICBpZiAoIShiS2V5IGluIGEpKSB7XG4gICAgICAgICAgICBkaWZmID0gZGlmZiB8fCB7fVxuICAgICAgICAgICAgZGlmZltiS2V5XSA9IGJbYktleV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaWZmXG59XG5cbmZ1bmN0aW9uIGdldFByb3RvdHlwZSh2YWx1ZSkge1xuICBpZiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWx1ZSlcbiAgfSBlbHNlIGlmICh2YWx1ZS5fX3Byb3RvX18pIHtcbiAgICByZXR1cm4gdmFsdWUuX19wcm90b19fXG4gIH0gZWxzZSBpZiAodmFsdWUuY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gdmFsdWUuY29uc3RydWN0b3IucHJvdG90eXBlXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Z0cmVlL2RpZmYtcHJvcHMuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBwYXRjaCA9IHJlcXVpcmUoXCIuL3Zkb20vcGF0Y2guanNcIilcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRjaFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vcGF0Y2guanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkb2N1bWVudCA9IHJlcXVpcmUoXCJnbG9iYWwvZG9jdW1lbnRcIilcbnZhciBpc0FycmF5ID0gcmVxdWlyZShcIngtaXMtYXJyYXlcIilcblxudmFyIHJlbmRlciA9IHJlcXVpcmUoXCIuL2NyZWF0ZS1lbGVtZW50XCIpXG52YXIgZG9tSW5kZXggPSByZXF1aXJlKFwiLi9kb20taW5kZXhcIilcbnZhciBwYXRjaE9wID0gcmVxdWlyZShcIi4vcGF0Y2gtb3BcIilcbm1vZHVsZS5leHBvcnRzID0gcGF0Y2hcblxuZnVuY3Rpb24gcGF0Y2gocm9vdE5vZGUsIHBhdGNoZXMsIHJlbmRlck9wdGlvbnMpIHtcbiAgICByZW5kZXJPcHRpb25zID0gcmVuZGVyT3B0aW9ucyB8fCB7fVxuICAgIHJlbmRlck9wdGlvbnMucGF0Y2ggPSByZW5kZXJPcHRpb25zLnBhdGNoICYmIHJlbmRlck9wdGlvbnMucGF0Y2ggIT09IHBhdGNoXG4gICAgICAgID8gcmVuZGVyT3B0aW9ucy5wYXRjaFxuICAgICAgICA6IHBhdGNoUmVjdXJzaXZlXG4gICAgcmVuZGVyT3B0aW9ucy5yZW5kZXIgPSByZW5kZXJPcHRpb25zLnJlbmRlciB8fCByZW5kZXJcblxuICAgIHJldHVybiByZW5kZXJPcHRpb25zLnBhdGNoKHJvb3ROb2RlLCBwYXRjaGVzLCByZW5kZXJPcHRpb25zKVxufVxuXG5mdW5jdGlvbiBwYXRjaFJlY3Vyc2l2ZShyb290Tm9kZSwgcGF0Y2hlcywgcmVuZGVyT3B0aW9ucykge1xuICAgIHZhciBpbmRpY2VzID0gcGF0Y2hJbmRpY2VzKHBhdGNoZXMpXG5cbiAgICBpZiAoaW5kaWNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHJvb3ROb2RlXG4gICAgfVxuXG4gICAgdmFyIGluZGV4ID0gZG9tSW5kZXgocm9vdE5vZGUsIHBhdGNoZXMuYSwgaW5kaWNlcylcbiAgICB2YXIgb3duZXJEb2N1bWVudCA9IHJvb3ROb2RlLm93bmVyRG9jdW1lbnRcblxuICAgIGlmICghcmVuZGVyT3B0aW9ucy5kb2N1bWVudCAmJiBvd25lckRvY3VtZW50ICE9PSBkb2N1bWVudCkge1xuICAgICAgICByZW5kZXJPcHRpb25zLmRvY3VtZW50ID0gb3duZXJEb2N1bWVudFxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbm9kZUluZGV4ID0gaW5kaWNlc1tpXVxuICAgICAgICByb290Tm9kZSA9IGFwcGx5UGF0Y2gocm9vdE5vZGUsXG4gICAgICAgICAgICBpbmRleFtub2RlSW5kZXhdLFxuICAgICAgICAgICAgcGF0Y2hlc1tub2RlSW5kZXhdLFxuICAgICAgICAgICAgcmVuZGVyT3B0aW9ucylcbiAgICB9XG5cbiAgICByZXR1cm4gcm9vdE5vZGVcbn1cblxuZnVuY3Rpb24gYXBwbHlQYXRjaChyb290Tm9kZSwgZG9tTm9kZSwgcGF0Y2hMaXN0LCByZW5kZXJPcHRpb25zKSB7XG4gICAgaWYgKCFkb21Ob2RlKSB7XG4gICAgICAgIHJldHVybiByb290Tm9kZVxuICAgIH1cblxuICAgIHZhciBuZXdOb2RlXG5cbiAgICBpZiAoaXNBcnJheShwYXRjaExpc3QpKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0Y2hMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBuZXdOb2RlID0gcGF0Y2hPcChwYXRjaExpc3RbaV0sIGRvbU5vZGUsIHJlbmRlck9wdGlvbnMpXG5cbiAgICAgICAgICAgIGlmIChkb21Ob2RlID09PSByb290Tm9kZSkge1xuICAgICAgICAgICAgICAgIHJvb3ROb2RlID0gbmV3Tm9kZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmV3Tm9kZSA9IHBhdGNoT3AocGF0Y2hMaXN0LCBkb21Ob2RlLCByZW5kZXJPcHRpb25zKVxuXG4gICAgICAgIGlmIChkb21Ob2RlID09PSByb290Tm9kZSkge1xuICAgICAgICAgICAgcm9vdE5vZGUgPSBuZXdOb2RlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcm9vdE5vZGVcbn1cblxuZnVuY3Rpb24gcGF0Y2hJbmRpY2VzKHBhdGNoZXMpIHtcbiAgICB2YXIgaW5kaWNlcyA9IFtdXG5cbiAgICBmb3IgKHZhciBrZXkgaW4gcGF0Y2hlcykge1xuICAgICAgICBpZiAoa2V5ICE9PSBcImFcIikge1xuICAgICAgICAgICAgaW5kaWNlcy5wdXNoKE51bWJlcihrZXkpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGljZXNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zkb20vcGF0Y2guanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIG1pbi1kb2N1bWVudCAoaWdub3JlZClcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIE1hcHMgYSB2aXJ0dWFsIERPTSB0cmVlIG9udG8gYSByZWFsIERPTSB0cmVlIGluIGFuIGVmZmljaWVudCBtYW5uZXIuXG4vLyBXZSBkb24ndCB3YW50IHRvIHJlYWQgYWxsIG9mIHRoZSBET00gbm9kZXMgaW4gdGhlIHRyZWUgc28gd2UgdXNlXG4vLyB0aGUgaW4tb3JkZXIgdHJlZSBpbmRleGluZyB0byBlbGltaW5hdGUgcmVjdXJzaW9uIGRvd24gY2VydGFpbiBicmFuY2hlcy5cbi8vIFdlIG9ubHkgcmVjdXJzZSBpbnRvIGEgRE9NIG5vZGUgaWYgd2Uga25vdyB0aGF0IGl0IGNvbnRhaW5zIGEgY2hpbGQgb2Zcbi8vIGludGVyZXN0LlxuXG52YXIgbm9DaGlsZCA9IHt9XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tSW5kZXhcblxuZnVuY3Rpb24gZG9tSW5kZXgocm9vdE5vZGUsIHRyZWUsIGluZGljZXMsIG5vZGVzKSB7XG4gICAgaWYgKCFpbmRpY2VzIHx8IGluZGljZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB7fVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGljZXMuc29ydChhc2NlbmRpbmcpXG4gICAgICAgIHJldHVybiByZWN1cnNlKHJvb3ROb2RlLCB0cmVlLCBpbmRpY2VzLCBub2RlcywgMClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlY3Vyc2Uocm9vdE5vZGUsIHRyZWUsIGluZGljZXMsIG5vZGVzLCByb290SW5kZXgpIHtcbiAgICBub2RlcyA9IG5vZGVzIHx8IHt9XG5cblxuICAgIGlmIChyb290Tm9kZSkge1xuICAgICAgICBpZiAoaW5kZXhJblJhbmdlKGluZGljZXMsIHJvb3RJbmRleCwgcm9vdEluZGV4KSkge1xuICAgICAgICAgICAgbm9kZXNbcm9vdEluZGV4XSA9IHJvb3ROb2RlXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdkNoaWxkcmVuID0gdHJlZS5jaGlsZHJlblxuXG4gICAgICAgIGlmICh2Q2hpbGRyZW4pIHtcblxuICAgICAgICAgICAgdmFyIGNoaWxkTm9kZXMgPSByb290Tm9kZS5jaGlsZE5vZGVzXG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJlZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHJvb3RJbmRleCArPSAxXG5cbiAgICAgICAgICAgICAgICB2YXIgdkNoaWxkID0gdkNoaWxkcmVuW2ldIHx8IG5vQ2hpbGRcbiAgICAgICAgICAgICAgICB2YXIgbmV4dEluZGV4ID0gcm9vdEluZGV4ICsgKHZDaGlsZC5jb3VudCB8fCAwKVxuXG4gICAgICAgICAgICAgICAgLy8gc2tpcCByZWN1cnNpb24gZG93biB0aGUgdHJlZSBpZiB0aGVyZSBhcmUgbm8gbm9kZXMgZG93biBoZXJlXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4SW5SYW5nZShpbmRpY2VzLCByb290SW5kZXgsIG5leHRJbmRleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVjdXJzZShjaGlsZE5vZGVzW2ldLCB2Q2hpbGQsIGluZGljZXMsIG5vZGVzLCByb290SW5kZXgpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcm9vdEluZGV4ID0gbmV4dEluZGV4XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZXNcbn1cblxuLy8gQmluYXJ5IHNlYXJjaCBmb3IgYW4gaW5kZXggaW4gdGhlIGludGVydmFsIFtsZWZ0LCByaWdodF1cbmZ1bmN0aW9uIGluZGV4SW5SYW5nZShpbmRpY2VzLCBsZWZ0LCByaWdodCkge1xuICAgIGlmIChpbmRpY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICB2YXIgbWluSW5kZXggPSAwXG4gICAgdmFyIG1heEluZGV4ID0gaW5kaWNlcy5sZW5ndGggLSAxXG4gICAgdmFyIGN1cnJlbnRJbmRleFxuICAgIHZhciBjdXJyZW50SXRlbVxuXG4gICAgd2hpbGUgKG1pbkluZGV4IDw9IG1heEluZGV4KSB7XG4gICAgICAgIGN1cnJlbnRJbmRleCA9ICgobWF4SW5kZXggKyBtaW5JbmRleCkgLyAyKSA+PiAwXG4gICAgICAgIGN1cnJlbnRJdGVtID0gaW5kaWNlc1tjdXJyZW50SW5kZXhdXG5cbiAgICAgICAgaWYgKG1pbkluZGV4ID09PSBtYXhJbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRJdGVtID49IGxlZnQgJiYgY3VycmVudEl0ZW0gPD0gcmlnaHRcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50SXRlbSA8IGxlZnQpIHtcbiAgICAgICAgICAgIG1pbkluZGV4ID0gY3VycmVudEluZGV4ICsgMVxuICAgICAgICB9IGVsc2UgIGlmIChjdXJyZW50SXRlbSA+IHJpZ2h0KSB7XG4gICAgICAgICAgICBtYXhJbmRleCA9IGN1cnJlbnRJbmRleCAtIDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGFzY2VuZGluZyhhLCBiKSB7XG4gICAgcmV0dXJuIGEgPiBiID8gMSA6IC0xXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92ZG9tL2RvbS1pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFwcGx5UHJvcGVydGllcyA9IHJlcXVpcmUoXCIuL2FwcGx5LXByb3BlcnRpZXNcIilcblxudmFyIGlzV2lkZ2V0ID0gcmVxdWlyZShcIi4uL3Zub2RlL2lzLXdpZGdldC5qc1wiKVxudmFyIFZQYXRjaCA9IHJlcXVpcmUoXCIuLi92bm9kZS92cGF0Y2guanNcIilcblxudmFyIHVwZGF0ZVdpZGdldCA9IHJlcXVpcmUoXCIuL3VwZGF0ZS13aWRnZXRcIilcblxubW9kdWxlLmV4cG9ydHMgPSBhcHBseVBhdGNoXG5cbmZ1bmN0aW9uIGFwcGx5UGF0Y2godnBhdGNoLCBkb21Ob2RlLCByZW5kZXJPcHRpb25zKSB7XG4gICAgdmFyIHR5cGUgPSB2cGF0Y2gudHlwZVxuICAgIHZhciB2Tm9kZSA9IHZwYXRjaC52Tm9kZVxuICAgIHZhciBwYXRjaCA9IHZwYXRjaC5wYXRjaFxuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgVlBhdGNoLlJFTU9WRTpcbiAgICAgICAgICAgIHJldHVybiByZW1vdmVOb2RlKGRvbU5vZGUsIHZOb2RlKVxuICAgICAgICBjYXNlIFZQYXRjaC5JTlNFUlQ6XG4gICAgICAgICAgICByZXR1cm4gaW5zZXJ0Tm9kZShkb21Ob2RlLCBwYXRjaCwgcmVuZGVyT3B0aW9ucylcbiAgICAgICAgY2FzZSBWUGF0Y2guVlRFWFQ6XG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nUGF0Y2goZG9tTm9kZSwgdk5vZGUsIHBhdGNoLCByZW5kZXJPcHRpb25zKVxuICAgICAgICBjYXNlIFZQYXRjaC5XSURHRVQ6XG4gICAgICAgICAgICByZXR1cm4gd2lkZ2V0UGF0Y2goZG9tTm9kZSwgdk5vZGUsIHBhdGNoLCByZW5kZXJPcHRpb25zKVxuICAgICAgICBjYXNlIFZQYXRjaC5WTk9ERTpcbiAgICAgICAgICAgIHJldHVybiB2Tm9kZVBhdGNoKGRvbU5vZGUsIHZOb2RlLCBwYXRjaCwgcmVuZGVyT3B0aW9ucylcbiAgICAgICAgY2FzZSBWUGF0Y2guT1JERVI6XG4gICAgICAgICAgICByZW9yZGVyQ2hpbGRyZW4oZG9tTm9kZSwgcGF0Y2gpXG4gICAgICAgICAgICByZXR1cm4gZG9tTm9kZVxuICAgICAgICBjYXNlIFZQYXRjaC5QUk9QUzpcbiAgICAgICAgICAgIGFwcGx5UHJvcGVydGllcyhkb21Ob2RlLCBwYXRjaCwgdk5vZGUucHJvcGVydGllcylcbiAgICAgICAgICAgIHJldHVybiBkb21Ob2RlXG4gICAgICAgIGNhc2UgVlBhdGNoLlRIVU5LOlxuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2VSb290KGRvbU5vZGUsXG4gICAgICAgICAgICAgICAgcmVuZGVyT3B0aW9ucy5wYXRjaChkb21Ob2RlLCBwYXRjaCwgcmVuZGVyT3B0aW9ucykpXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gZG9tTm9kZVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlTm9kZShkb21Ob2RlLCB2Tm9kZSkge1xuICAgIHZhciBwYXJlbnROb2RlID0gZG9tTm9kZS5wYXJlbnROb2RlXG5cbiAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRvbU5vZGUpXG4gICAgfVxuXG4gICAgZGVzdHJveVdpZGdldChkb21Ob2RlLCB2Tm9kZSk7XG5cbiAgICByZXR1cm4gbnVsbFxufVxuXG5mdW5jdGlvbiBpbnNlcnROb2RlKHBhcmVudE5vZGUsIHZOb2RlLCByZW5kZXJPcHRpb25zKSB7XG4gICAgdmFyIG5ld05vZGUgPSByZW5kZXJPcHRpb25zLnJlbmRlcih2Tm9kZSwgcmVuZGVyT3B0aW9ucylcblxuICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICAgIHBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobmV3Tm9kZSlcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyZW50Tm9kZVxufVxuXG5mdW5jdGlvbiBzdHJpbmdQYXRjaChkb21Ob2RlLCBsZWZ0Vk5vZGUsIHZUZXh0LCByZW5kZXJPcHRpb25zKSB7XG4gICAgdmFyIG5ld05vZGVcblxuICAgIGlmIChkb21Ob2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgIGRvbU5vZGUucmVwbGFjZURhdGEoMCwgZG9tTm9kZS5sZW5ndGgsIHZUZXh0LnRleHQpXG4gICAgICAgIG5ld05vZGUgPSBkb21Ob2RlXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHBhcmVudE5vZGUgPSBkb21Ob2RlLnBhcmVudE5vZGVcbiAgICAgICAgbmV3Tm9kZSA9IHJlbmRlck9wdGlvbnMucmVuZGVyKHZUZXh0LCByZW5kZXJPcHRpb25zKVxuXG4gICAgICAgIGlmIChwYXJlbnROb2RlICYmIG5ld05vZGUgIT09IGRvbU5vZGUpIHtcbiAgICAgICAgICAgIHBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld05vZGUsIGRvbU5vZGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3Tm9kZVxufVxuXG5mdW5jdGlvbiB3aWRnZXRQYXRjaChkb21Ob2RlLCBsZWZ0Vk5vZGUsIHdpZGdldCwgcmVuZGVyT3B0aW9ucykge1xuICAgIHZhciB1cGRhdGluZyA9IHVwZGF0ZVdpZGdldChsZWZ0Vk5vZGUsIHdpZGdldClcbiAgICB2YXIgbmV3Tm9kZVxuXG4gICAgaWYgKHVwZGF0aW5nKSB7XG4gICAgICAgIG5ld05vZGUgPSB3aWRnZXQudXBkYXRlKGxlZnRWTm9kZSwgZG9tTm9kZSkgfHwgZG9tTm9kZVxuICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld05vZGUgPSByZW5kZXJPcHRpb25zLnJlbmRlcih3aWRnZXQsIHJlbmRlck9wdGlvbnMpXG4gICAgfVxuXG4gICAgdmFyIHBhcmVudE5vZGUgPSBkb21Ob2RlLnBhcmVudE5vZGVcblxuICAgIGlmIChwYXJlbnROb2RlICYmIG5ld05vZGUgIT09IGRvbU5vZGUpIHtcbiAgICAgICAgcGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Tm9kZSwgZG9tTm9kZSlcbiAgICB9XG5cbiAgICBpZiAoIXVwZGF0aW5nKSB7XG4gICAgICAgIGRlc3Ryb3lXaWRnZXQoZG9tTm9kZSwgbGVmdFZOb2RlKVxuICAgIH1cblxuICAgIHJldHVybiBuZXdOb2RlXG59XG5cbmZ1bmN0aW9uIHZOb2RlUGF0Y2goZG9tTm9kZSwgbGVmdFZOb2RlLCB2Tm9kZSwgcmVuZGVyT3B0aW9ucykge1xuICAgIHZhciBwYXJlbnROb2RlID0gZG9tTm9kZS5wYXJlbnROb2RlXG4gICAgdmFyIG5ld05vZGUgPSByZW5kZXJPcHRpb25zLnJlbmRlcih2Tm9kZSwgcmVuZGVyT3B0aW9ucylcblxuICAgIGlmIChwYXJlbnROb2RlICYmIG5ld05vZGUgIT09IGRvbU5vZGUpIHtcbiAgICAgICAgcGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Tm9kZSwgZG9tTm9kZSlcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3Tm9kZVxufVxuXG5mdW5jdGlvbiBkZXN0cm95V2lkZ2V0KGRvbU5vZGUsIHcpIHtcbiAgICBpZiAodHlwZW9mIHcuZGVzdHJveSA9PT0gXCJmdW5jdGlvblwiICYmIGlzV2lkZ2V0KHcpKSB7XG4gICAgICAgIHcuZGVzdHJveShkb21Ob2RlKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVvcmRlckNoaWxkcmVuKGRvbU5vZGUsIG1vdmVzKSB7XG4gICAgdmFyIGNoaWxkTm9kZXMgPSBkb21Ob2RlLmNoaWxkTm9kZXNcbiAgICB2YXIga2V5TWFwID0ge31cbiAgICB2YXIgbm9kZVxuICAgIHZhciByZW1vdmVcbiAgICB2YXIgaW5zZXJ0XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vdmVzLnJlbW92ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVtb3ZlID0gbW92ZXMucmVtb3Zlc1tpXVxuICAgICAgICBub2RlID0gY2hpbGROb2Rlc1tyZW1vdmUuZnJvbV1cbiAgICAgICAgaWYgKHJlbW92ZS5rZXkpIHtcbiAgICAgICAgICAgIGtleU1hcFtyZW1vdmUua2V5XSA9IG5vZGVcbiAgICAgICAgfVxuICAgICAgICBkb21Ob2RlLnJlbW92ZUNoaWxkKG5vZGUpXG4gICAgfVxuXG4gICAgdmFyIGxlbmd0aCA9IGNoaWxkTm9kZXMubGVuZ3RoXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBtb3Zlcy5pbnNlcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGluc2VydCA9IG1vdmVzLmluc2VydHNbal1cbiAgICAgICAgbm9kZSA9IGtleU1hcFtpbnNlcnQua2V5XVxuICAgICAgICAvLyB0aGlzIGlzIHRoZSB3ZWlyZGVzdCBidWcgaSd2ZSBldmVyIHNlZW4gaW4gd2Via2l0XG4gICAgICAgIGRvbU5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIGluc2VydC50byA+PSBsZW5ndGgrKyA/IG51bGwgOiBjaGlsZE5vZGVzW2luc2VydC50b10pXG4gICAgfVxufVxuXG5mdW5jdGlvbiByZXBsYWNlUm9vdChvbGRSb290LCBuZXdSb290KSB7XG4gICAgaWYgKG9sZFJvb3QgJiYgbmV3Um9vdCAmJiBvbGRSb290ICE9PSBuZXdSb290ICYmIG9sZFJvb3QucGFyZW50Tm9kZSkge1xuICAgICAgICBvbGRSb290LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld1Jvb3QsIG9sZFJvb3QpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1Jvb3Q7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92ZG9tL3BhdGNoLW9wLmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNXaWRnZXQgPSByZXF1aXJlKFwiLi4vdm5vZGUvaXMtd2lkZ2V0LmpzXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gdXBkYXRlV2lkZ2V0XG5cbmZ1bmN0aW9uIHVwZGF0ZVdpZGdldChhLCBiKSB7XG4gICAgaWYgKGlzV2lkZ2V0KGEpICYmIGlzV2lkZ2V0KGIpKSB7XG4gICAgICAgIGlmIChcIm5hbWVcIiBpbiBhICYmIFwibmFtZVwiIGluIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBhLmlkID09PSBiLmlkXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYS5pbml0ID09PSBiLmluaXRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdmRvbS91cGRhdGUtd2lkZ2V0LmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoXCIuL3Zkb20vY3JlYXRlLWVsZW1lbnQuanNcIilcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVFbGVtZW50XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS9jcmVhdGUtZWxlbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBbe1wiQHRcIjpcIlByb3RvT2JqZWN0XCIsXCJkYXRhXCI6e1wiYW5ub3RhdGlvbnNcIjp7XCJuYW1lXCI6XCJSb290UGFja2FnZVwifSxcInNsb3RfdmFsdWVzXCI6e1wicGFyZW50XCI6e1wiQHJcIjoxfSxcIkNvcmVQYWNrYWdlXCI6e1wiQHRcIjpcIlByb3RvT2JqZWN0XCIsXCJkYXRhXCI6e1wiYW5ub3RhdGlvbnNcIjp7XCJuYW1lXCI6XCJDb3JlUGFja2FnZVwifSxcInNsb3RfdmFsdWVzXCI6e1wicGFyZW50XCI6e1wiQHJcIjoxfSxcIlRvcE9iamVjdFwiOntcIkByXCI6Mn0sXCJUcmFpdHNQYWNrYWdlXCI6e1wiQHJcIjoxfX0sXCJzbG90X2Fubm90YXRpb25zXCI6e30sXCJwcm90b3R5cGVfc2xvdHNcIjpbXCJwYXJlbnRcIl19fSxcIkludGVyZmFjZVBhY2thZ2VcIjp7XCJAdFwiOlwiUHJvdG9PYmplY3RcIixcImRhdGFcIjp7XCJhbm5vdGF0aW9uc1wiOntcIm5hbWVcIjpcIkludGVyZmFjZVBhY2thZ2VcIn0sXCJzbG90X3ZhbHVlc1wiOntcInBhcmVudFwiOntcIkByXCI6MX0sXCJXaW5kb3dNYW5hZ2VyXCI6e1wiQHRcIjpcIlByb3RvT2JqZWN0XCIsXCJkYXRhXCI6e1wiYW5ub3RhdGlvbnNcIjp7XCJuYW1lXCI6XCJXaW5kb3dNYW5hZ2VyXCJ9LFwic2xvdF92YWx1ZXNcIjp7XCJ3aW5kb3dzXCI6W3tcIkByXCI6NH1dLFwiUmVuZGVyXCI6e1wiQHRcIjpcIk1lc3NhZ2VIYW5kbGVyXCIsXCJkYXRhXCI6XCJmdW5jdGlvbigpIHsgcmV0dXJuIGgoJ2RpdicsIG51bGwsIHRoaXMud2luZG93cy5tYXAodyA9PiB3LlJlbmRlcigpKSk7IH1cIn0sXCJVcGRhdGVcIjp7XCJAdFwiOlwiTWVzc2FnZUhhbmRsZXJcIixcImRhdGFcIjpcImZ1bmN0aW9uKGR0KSB7IHRoaXMud2luZG93cy5mb3JFYWNoKHcgPT4gdy5VcGRhdGUoZHQpKTsgfVwifSxcIkFkZFdpbmRvd1wiOntcIkB0XCI6XCJNZXNzYWdlSGFuZGxlclwiLFwiZGF0YVwiOlwiZnVuY3Rpb24od2luZG93KSB7IHRoaXMud2luZG93cy5wdXNoKHdpbmRvdyk7IH1cIn0sXCJSZW1vdmVXaW5kb3dcIjp7XCJAdFwiOlwiTWVzc2FnZUhhbmRsZXJcIixcImRhdGFcIjpcImZ1bmN0aW9uKHdpbmRvdykgeyB0aGlzLndpbmRvd3MgPSB0aGlzLndpbmRvd3MuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gd2luZG93KTsgfVwifSxcInBhcmVudFwiOntcIkByXCI6Mn19LFwic2xvdF9hbm5vdGF0aW9uc1wiOnt9LFwicHJvdG90eXBlX3Nsb3RzXCI6W1wicGFyZW50XCJdfX0sXCJUcmFpdHNXaW5kb3dcIjp7XCJAclwiOjN9LFwiSGFuZGxlckVkaXRvclwiOntcIkB0XCI6XCJQcm90b09iamVjdFwiLFwiZGF0YVwiOntcImFubm90YXRpb25zXCI6e1wibmFtZVwiOlwiSGFuZGxlckVkaXRvclwiLFwiZGVzY3JpcHRpb25cIjpcIlRoZSBkZWZhdWx0IGVkaXRvciBmb3IgbWVzc2FnZSBoYW5kbGVycy5cIn0sXCJzbG90X3ZhbHVlc1wiOntcInBhcmVudFwiOntcIkByXCI6M30sXCJSZW5kZXJDb250ZW50XCI6e1wiQHRcIjpcIk1lc3NhZ2VIYW5kbGVyXCIsXCJkYXRhXCI6XCJmdW5jdGlvbigpIHsgcmV0dXJuIFtoKCdkaXYnLCBudWxsLCBbJ0VkaXRpbmcgU2xvdCAnLCB0aGlzLnNsb3RdKSwgaCgndGV4dGFyZWEnLCB7b25rZXl1cDogKGUpID0+IHRoaXMuY29kZSA9IGUudGFyZ2V0LnZhbHVlfSwgdGhpcy5jb2RlKSwgaCgnYnV0dG9uJywge29uY2xpY2s6ICgpID0+IHRoaXMudGFyZ2V0W3RoaXMuc2xvdF0gPSBfTWFrZU1lc3NhZ2VIYW5kbGVyKHRoaXMuY29kZSl9LCAnU2F2ZScpXTsgfVwifSxcIk5ld1wiOntcIkB0XCI6XCJNZXNzYWdlSGFuZGxlclwiLFwiZGF0YVwiOlwiZnVuY3Rpb24odGFyZ2V0LCBzbG90KSB7IGxldCBpbnN0ID0gdGhpcy5FeHRlbmQoKTsgaW5zdC5BZGRTbG90KCd0YXJnZXQnLCB0YXJnZXQpOyBpbnN0LkFkZFNsb3QoJ3Nsb3QnLCBzbG90KTsgaW5zdC5BZGRTbG90KCdjb2RlJywgX0dldE1lc3NhZ2VIYW5kbGVyQ29kZSh0YXJnZXRbc2xvdF0pKTsgcmV0dXJuIGluc3Q7IH1cIn0sXCJHZXRUaXRsZVwiOntcIkB0XCI6XCJNZXNzYWdlSGFuZGxlclwiLFwiZGF0YVwiOlwiZnVuY3Rpb24oKSB7XFxuIHJldHVybiBcXFwiSGFuZGxlckVkaXRvcjogXFxcIiArIHRoaXMudGFyZ2V0LnRvU3RyaW5nKCkgKyBcXFwiLT5cXFwiICsgdGhpcy5zbG90O1xcbn1cIn19LFwic2xvdF9hbm5vdGF0aW9uc1wiOnt9LFwicHJvdG90eXBlX3Nsb3RzXCI6W1wicGFyZW50XCJdfX0sXCJPYmplY3RFZGl0b3JcIjp7XCJAdFwiOlwiUHJvdG9PYmplY3RcIixcImRhdGFcIjp7XCJhbm5vdGF0aW9uc1wiOntcIm5hbWVcIjpcIk9iamVjdEVkaXRvclwiLFwiZGVzY3JpcHRpb25cIjpcIlRoZSBkZWZhdWx0IGVkaXRvciBmb3Igb2JqZWN0cy5cIn0sXCJzbG90X3ZhbHVlc1wiOntcInBhcmVudFwiOntcIkByXCI6M30sXCJHZXRUaXRsZVwiOntcIkB0XCI6XCJNZXNzYWdlSGFuZGxlclwiLFwiZGF0YVwiOlwiZnVuY3Rpb24oKSB7XFxuICAgIHJldHVybiAnT2JqZWN0RWRpdG9yOiAnICsgKHRoaXMudGFyZ2V0LkdldEFubm90YXRpb24oJ25hbWUnKSB8fCBcXFwiVW5uYW1lZCBPYmplY3RcXFwiKTtcXG59XCJ9LFwiUmVuZGVyQ29udGVudFwiOntcIkB0XCI6XCJNZXNzYWdlSGFuZGxlclwiLFwiZGF0YVwiOlwiZnVuY3Rpb24oKSB7XFxuICByZXR1cm4gaCgnZGl2JywgbnVsbCwgW1xcbiAgICB0aGlzLnRhcmdldC5HZXRBbm5vdGF0aW9uKCdkZXNjcmlwdGlvbicpLFxcbiAgICB0aGlzLnRhcmdldC5HZXRTbG90TmFtZXMoKS5tYXAoc2xvdCA9PiB7XFxuICAgICAgbGV0IHZhbHVlID0gdGhpcy50YXJnZXRbc2xvdF07IFxcbiAgICAgIGlmIChfSXNNZXNzYWdlSGFuZGxlcih2YWx1ZSkpIHtcXG4gICAgICAgIHJldHVybiBbaCgnZGl2JywgbnVsbCwgc2xvdCksIGgoJ2J1dHRvbicsIHtvbmNsaWNrOiAoKSA9PiBSb290UGFja2FnZS5JbnRlcmZhY2VQYWNrYWdlLkhhbmRsZXJFZGl0b3IuTmV3KHRoaXMudGFyZ2V0LCBzbG90KS5PcGVuKCkgfSwgWydFZGl0IENvZGUnXSldO1xcbiAgICAgIH1cXG4gICAgICBpZiAoX0lzUHJvdG9PYmplY3QodmFsdWUpKSB7XFxuICAgICAgICByZXR1cm4gaCgnZGl2JywgbnVsbCwgW3Nsb3QgKyBcXFwiIFxcXCIsIGgoJ2J1dHRvbicsIHtvbmNsaWNrOiAoKSA9PiB2YWx1ZS5PcGVuRWRpdG9yKCkgfSwgdmFsdWUudG9TdHJpbmcoKSkgXSk7XFxuICAgICAgfVxcbiAgICAgIHJldHVybiBoKCdkaXYnLCBudWxsLCBbc2xvdCwgdmFsdWUudG9TdHJpbmcoKSBdKTtcXG4gICB9ICldKTtcXG59XCJ9LFwiTmV3XCI6e1wiQHRcIjpcIk1lc3NhZ2VIYW5kbGVyXCIsXCJkYXRhXCI6XCJmdW5jdGlvbih0YXJnZXQpIHsgbGV0IGluc3QgPSB0aGlzLkV4dGVuZCgpOyBpbnN0LkFkZFNsb3QoJ3RhcmdldCcsIHRhcmdldCk7IHJldHVybiBpbnN0OyB9XCJ9fSxcInNsb3RfYW5ub3RhdGlvbnNcIjp7fSxcInByb3RvdHlwZV9zbG90c1wiOltcInBhcmVudFwiXX19LFwiTWFpbk1lbnVcIjp7XCJAclwiOjR9fSxcInNsb3RfYW5ub3RhdGlvbnNcIjp7fSxcInByb3RvdHlwZV9zbG90c1wiOltcInBhcmVudFwiXX19fSxcInNsb3RfYW5ub3RhdGlvbnNcIjp7fSxcInByb3RvdHlwZV9zbG90c1wiOltcInBhcmVudFwiXX19LHtcIkB0XCI6XCJQcm90b09iamVjdFwiLFwiZGF0YVwiOntcImFubm90YXRpb25zXCI6e1wibmFtZVwiOlwiVHJhaXRzUGFja2FnZVwifSxcInNsb3RfdmFsdWVzXCI6e1wicGFyZW50XCI6e1wiQHJcIjoyfX0sXCJzbG90X2Fubm90YXRpb25zXCI6e30sXCJwcm90b3R5cGVfc2xvdHNcIjpbXCJwYXJlbnRcIl19fSx7XCJAdFwiOlwiUHJvdG9PYmplY3RcIixcImRhdGFcIjp7XCJhbm5vdGF0aW9uc1wiOntcIm5hbWVcIjpcIlRvcE9iamVjdFwifSxcInNsb3RfdmFsdWVzXCI6e1wiQWRkU2xvdFwiOntcIkB0XCI6XCJNZXNzYWdlSGFuZGxlclwiLFwiZGF0YVwiOlwiZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcXG4gIF9BZGRTbG90KHRoaXMsIG5hbWUsIHZhbHVlKTtcXG59XCJ9LFwiRXh0ZW5kXCI6e1wiQHRcIjpcIk1lc3NhZ2VIYW5kbGVyXCIsXCJkYXRhXCI6XCJmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xcbiAgbGV0IGNoaWxkID0gX0VtcHR5T2JqZWN0KCk7XFxuICBfQWRkU2xvdChjaGlsZCwgJ3BhcmVudCcsIHRoaXMpXFxuICBfQWRkUHJvdG90eXBlU2xvdChjaGlsZCwgJ3BhcmVudCcpXFxuICByZXR1cm4gY2hpbGQ7XFxufVwifSxcIlNldEFubm90YXRpb25cIjp7XCJAdFwiOlwiTWVzc2FnZUhhbmRsZXJcIixcImRhdGFcIjpcIlxcbmZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XFxuXFx0X1NldEFubm90YXRpb24odGhpcywgbmFtZSwgdmFsdWUpO1xcbn1cXG5cIn0sXCJHZXRBbm5vdGF0aW9uXCI6e1wiQHRcIjpcIk1lc3NhZ2VIYW5kbGVyXCIsXCJkYXRhXCI6XCJcXG5mdW5jdGlvbihuYW1lKSB7XFxuXFx0cmV0dXJuIF9HZXRBbm5vdGF0aW9uKHRoaXMsIG5hbWUpO1xcbn1cXG5cIn0sXCJHZXRTbG90TmFtZXNcIjp7XCJAdFwiOlwiTWVzc2FnZUhhbmRsZXJcIixcImRhdGFcIjpcIlxcbmZ1bmN0aW9uKCkge1xcblxcdHJldHVybiBfR2V0U2xvdE5hbWVzKHRoaXMpO1xcbn1cXG5cIn0sXCJDcmVhdGVFZGl0b3JcIjp7XCJAdFwiOlwiTWVzc2FnZUhhbmRsZXJcIixcImRhdGFcIjpcIlxcbmZ1bmN0aW9uKCkge1xcblxcdHJldHVybiBSb290UGFja2FnZS5JbnRlcmZhY2VQYWNrYWdlLk9iamVjdEVkaXRvci5OZXcodGhpcyk7XFxufVxcblwifSxcIk9wZW5FZGl0b3JcIjp7XCJAdFwiOlwiTWVzc2FnZUhhbmRsZXJcIixcImRhdGFcIjpcIlxcbmZ1bmN0aW9uKCkge1xcblxcdHJldHVybiB0aGlzLkNyZWF0ZUVkaXRvcigpLk9wZW4oKTtcXG59XFxuXCJ9fSxcInNsb3RfYW5ub3RhdGlvbnNcIjp7fSxcInByb3RvdHlwZV9zbG90c1wiOltdfX0se1wiQHRcIjpcIlByb3RvT2JqZWN0XCIsXCJkYXRhXCI6e1wiYW5ub3RhdGlvbnNcIjp7XCJuYW1lXCI6XCJUcmFpdHNXaW5kb3dcIn0sXCJzbG90X3ZhbHVlc1wiOntcInBhcmVudFwiOntcIkByXCI6Mn0sXCJ0b3BcIjowLFwibGVmdFwiOjAsXCJPcGVuXCI6e1wiQHRcIjpcIk1lc3NhZ2VIYW5kbGVyXCIsXCJkYXRhXCI6XCJmdW5jdGlvbigpIHsgUm9vdFBhY2thZ2UuSW50ZXJmYWNlUGFja2FnZS5XaW5kb3dNYW5hZ2VyLkFkZFdpbmRvdyh0aGlzKSB9XCJ9LFwiQ2xvc2VcIjp7XCJAdFwiOlwiTWVzc2FnZUhhbmRsZXJcIixcImRhdGFcIjpcImZ1bmN0aW9uKCkgeyBSb290UGFja2FnZS5JbnRlcmZhY2VQYWNrYWdlLldpbmRvd01hbmFnZXIuUmVtb3ZlV2luZG93KHRoaXMpIH1cIn0sXCJVcGRhdGVcIjp7XCJAdFwiOlwiTWVzc2FnZUhhbmRsZXJcIixcImRhdGFcIjpcImZ1bmN0aW9uKGR0KSB7fVwifSxcIlJlbmRlckNvbnRlbnRcIjp7XCJAdFwiOlwiTWVzc2FnZUhhbmRsZXJcIixcImRhdGFcIjpcImZ1bmN0aW9uKCkgeyB9XCJ9LFwiR2V0VGl0bGVcIjp7XCJAdFwiOlwiTWVzc2FnZUhhbmRsZXJcIixcImRhdGFcIjpcImZ1bmN0aW9uKCkgeyByZXR1cm4gJ1VudGl0bGVkIFdpbmRvdyc7IH1cIn0sXCJSZW5kZXJcIjp7XCJAdFwiOlwiTWVzc2FnZUhhbmRsZXJcIixcImRhdGFcIjpcImZ1bmN0aW9uKCkge1xcbiAgcmV0dXJuIGgoJ2RpdicsIHsgc3R5bGU6IHtcXG4gICAgICByZXNpemU6ICdib3RoJyxcXG4gICAgICBvdmVyZmxvdzogJ2F1dG8nLFxcbiAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibGFjaycsXFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXFxuICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnI2YxZjFmMScsXFxuICAgICAgdG9wOiB0aGlzLnRvcCArICdweCcsXFxuICAgICAgbGVmdDogdGhpcy5sZWZ0ICsgJ3B4JyxcXG4gICAgICAnYm94LXNoYWRvdyc6ICc1cHggNXB4IDVweCByZ2JhKDAsIDAsIDAsIDAuNSknXFxuICAgIH0gfSwgW1xcbiAgICBoKCdkaXYnLCB7c3R5bGU6IHtcXG4gICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnIzI4NTQ3NycsIHBhZGRpbmc6ICczcHgnLCBjb2xvcjogJ3doaXRlJywgY3Vyc29yOiAnbW92ZScsXFxuICAgICAgIGRpc3BsYXk6ICdmbGV4JywgJ2p1c3RpZnktY29udGVudCc6ICdzcGFjZS1iZXR3ZWVuJyB9LFxcbiAgICAgICBvbm1vdXNlZG93bjogKGUpID0+IHtcXG4gICAgICAgICB2YXIgeCA9IGUuY2xpZW50WDtcXG4gICAgICAgICB2YXIgeSA9IGUuY2xpZW50WTtcXG5cXG4gICAgICAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IChlKSA9PiB7XFxuICAgICAgICAgICB2YXIgZHggPSBlLmNsaWVudFggLSB4O1xcbiAgICAgICAgICAgdmFyIGR5ID0gZS5jbGllbnRZIC0geTtcXG4gICAgICAgICAgIHggPSBlLmNsaWVudFg7XFxuICAgICAgICAgICB5ID0gZS5jbGllbnRZO1xcblxcbiAgICAgICAgICAgdGhpcy5sZWZ0ID0gdGhpcy5sZWZ0ICsgZHg7XFxuICAgICAgICAgICB0aGlzLnRvcCA9IHRoaXMudG9wICsgZHk7XFxuICAgICAgICAgfTtcXG5cXG4gICAgICAgICBkb2N1bWVudC5vbm1vdXNldXAgPSAoKSA9PiB7XFxuICAgICAgICAgICAgZG9jdW1lbnQub25tb3VzZXVwID0gbnVsbDtcXG4gICAgICAgICAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IG51bGw7XFxuICAgICAgICAgfTtcXG4gICAgICAgfX0sIFtcXG4gICAgICB0aGlzLkdldFRpdGxlKCksXFxuICAgICAgaCgnc3BhbicsIHt9LCBbXFxuICAgICAgICBoKCdpLmZhcy5mYS1zZWFyY2gnLCB7dGl0bGU6IFxcXCJJbnNwZWN0IFdpbmRvdyBPYmplY3RcXFwiLCBzdHlsZToge2N1cnNvcjogJ2RlZmF1bHQnLCAnbWFyZ2luLXJpZ2h0JzogJzVweCd9LCBvbmNsaWNrOiAoKSA9PiBSb290UGFja2FnZS5JbnRlcmZhY2VQYWNrYWdlLk9iamVjdEVkaXRvci5OZXcodGhpcykuT3BlbigpIH0pLFxcbiAgICAgICAgaCgnaS5mYXMuZmEtdGltZXMnLCB7dGl0bGU6IFxcXCJDbG9zZSBXaW5kb3dcXFwiLCBzdHlsZToge2N1cnNvcjogJ2RlZmF1bHQnfSwgb25jbGljazogKCkgPT4gdGhpcy5DbG9zZSgpfSksXFxuICAgICAgICBdKSxcXG4gICAgXSksXFxuICAgIGgoJ2RpdicsIHsgc3R5bGU6IHtwYWRkaW5nOiAnNXB4J319LCB0aGlzLlJlbmRlckNvbnRlbnQoKSlcXG4gIF0pO1xcbn1cIn19LFwic2xvdF9hbm5vdGF0aW9uc1wiOnt9LFwicHJvdG90eXBlX3Nsb3RzXCI6W1wicGFyZW50XCJdfX0se1wiQHRcIjpcIlByb3RvT2JqZWN0XCIsXCJkYXRhXCI6e1wiYW5ub3RhdGlvbnNcIjp7fSxcInNsb3RfdmFsdWVzXCI6e1wicGFyZW50XCI6e1wiQHJcIjozfSxcImxlZnRcIjowLFwidG9wXCI6MCxcIlJlbmRlclwiOntcIkB0XCI6XCJNZXNzYWdlSGFuZGxlclwiLFwiZGF0YVwiOlwiZnVuY3Rpb24oKSB7XFxuICByZXR1cm4gaCgnZGl2Jywge1xcbiAgICBzdHlsZToge1xcbiAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnIzI4NTQ3NycsXFxuICAgICAncG9zaXRpb24nOiAnZml4ZWQnLFxcbiAgICAgdG9wOiAnMHB4JyxcXG4gICAgIGxlZnQ6ICcwcHgnLFxcbiAgICAgd2lkdGg6ICcxMDAlJyxcXG4gICAgIGRpc3BsYXk6ICdmbGV4J1xcbiAgICB9XFxuICAgfSwgW1xcbiAgIGgoJ2J1dHRvbicsIHtvbmNsaWNrOiAoKSA9PiB7XFxuICAgICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtfU2F2ZUltYWdlKFJvb3RQYWNrYWdlKV0sIHt0eXBlOiBcXFwidGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04XFxcIn0pO1xcbiAgICAgRmlsZVNhdmVyLnNhdmVBcyhibG9iLCBcXFwiaW1hZ2UuanNvblxcXCIpO1xcbiAgIH19LCAnU2F2ZSBJbWFnZScpLFxcbiAgIGgoJ2J1dHRvbicsIHtvbmNsaWNrOiAoKSA9PiB7XFxuICAgICAgICB2YXIgZmlsZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGUtaW5wdXQnKTtcXG4gICAgICAgIHZhciBjaGFuZ2VIYW5kbGVyID0gZnVuY3Rpb24oKSB7XFxuICAgICAgICAgIHZhciBmaWxlID0gZmlsZUlucHV0LmZpbGVzWzBdO1xcblxcbiAgICAgICAgICBpZiAoZmlsZS5uYW1lLm1hdGNoKC9cXFxcLih0eHR8anNvbikkLykpIHtcXG4gICAgICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcXG5cXG4gICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XFxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnBhcnNlKHJlYWRlci5yZXN1bHQpKTtcXG4gICAgICAgICAgICAgIF9Mb2FkSW1hZ2UoSlNPTi5wYXJzZShyZWFkZXIucmVzdWx0KSk7XFxuICAgICAgICAgICAgfTtcXG5cXG4gICAgICAgICAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlKTsgICAgXFxuICAgICAgICAgIH0gZWxzZSB7XFxuICAgICAgICAgICBhbGVydChcXFwiRmlsZSBub3Qgc3VwcG9ydGVkLCAudHh0IG9yIC5qc29uIGZpbGVzIG9ubHlcXFwiKTtcXG4gICAgICAgICAgfVxcblxcbiAgICAgICAgICBmaWxlSW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgY2hhbmdlSGFuZGxlcik7XFxuICAgICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xcbiAgICAgICAgfVxcbiAgICAgICAgIFxcbiAgICAgICAgZmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGNoYW5nZUhhbmRsZXIpO1xcblxcbiAgICAgICBmaWxlSW5wdXQuY2xpY2soKTtcXG5cXG4gICB9fSwgJ09wZW4gSW1hZ2UnKSxcXG4gICBoKCdidXR0b24nLCB7b25jbGljazogKCkgPT4ge1xcbiAgICAgUm9vdFBhY2thZ2UuSW50ZXJmYWNlUGFja2FnZS5PYmplY3RFZGl0b3IuTmV3KFJvb3RQYWNrYWdlKS5PcGVuKCk7XFxuICAgfX0sICdPcGVuIFJvb3QgUGFja2FnZScpLFxcbiAgIGgoJ2J1dHRvbicsIG51bGwsICdBYm91dCcpXFxuICBdKTtcXG59XCJ9fSxcInNsb3RfYW5ub3RhdGlvbnNcIjp7fSxcInByb3RvdHlwZV9zbG90c1wiOltcInBhcmVudFwiXX19XVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2RlZmF1bHRpbWFnZS5qc29uXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiBGaWxlU2F2ZXIuanNcbiAqIEEgc2F2ZUFzKCkgRmlsZVNhdmVyIGltcGxlbWVudGF0aW9uLlxuICogMS4zLjJcbiAqIDIwMTYtMDYtMTYgMTg6MjU6MTlcbiAqXG4gKiBCeSBFbGkgR3JleSwgaHR0cDovL2VsaWdyZXkuY29tXG4gKiBMaWNlbnNlOiBNSVRcbiAqICAgU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L0ZpbGVTYXZlci5qcy9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cblxuLypnbG9iYWwgc2VsZiAqL1xuLypqc2xpbnQgYml0d2lzZTogdHJ1ZSwgaW5kZW50OiA0LCBsYXhicmVhazogdHJ1ZSwgbGF4Y29tbWE6IHRydWUsIHNtYXJ0dGFiczogdHJ1ZSwgcGx1c3BsdXM6IHRydWUgKi9cblxuLyohIEBzb3VyY2UgaHR0cDovL3B1cmwuZWxpZ3JleS5jb20vZ2l0aHViL0ZpbGVTYXZlci5qcy9ibG9iL21hc3Rlci9GaWxlU2F2ZXIuanMgKi9cblxudmFyIHNhdmVBcyA9IHNhdmVBcyB8fCAoZnVuY3Rpb24odmlldykge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0Ly8gSUUgPDEwIGlzIGV4cGxpY2l0bHkgdW5zdXBwb3J0ZWRcblx0aWYgKHR5cGVvZiB2aWV3ID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIgJiYgL01TSUUgWzEtOV1cXC4vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyXG5cdFx0ICBkb2MgPSB2aWV3LmRvY3VtZW50XG5cdFx0ICAvLyBvbmx5IGdldCBVUkwgd2hlbiBuZWNlc3NhcnkgaW4gY2FzZSBCbG9iLmpzIGhhc24ndCBvdmVycmlkZGVuIGl0IHlldFxuXHRcdCwgZ2V0X1VSTCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHZpZXcuVVJMIHx8IHZpZXcud2Via2l0VVJMIHx8IHZpZXc7XG5cdFx0fVxuXHRcdCwgc2F2ZV9saW5rID0gZG9jLmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIiwgXCJhXCIpXG5cdFx0LCBjYW5fdXNlX3NhdmVfbGluayA9IFwiZG93bmxvYWRcIiBpbiBzYXZlX2xpbmtcblx0XHQsIGNsaWNrID0gZnVuY3Rpb24obm9kZSkge1xuXHRcdFx0dmFyIGV2ZW50ID0gbmV3IE1vdXNlRXZlbnQoXCJjbGlja1wiKTtcblx0XHRcdG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0fVxuXHRcdCwgaXNfc2FmYXJpID0gL2NvbnN0cnVjdG9yL2kudGVzdCh2aWV3LkhUTUxFbGVtZW50KSB8fCB2aWV3LnNhZmFyaVxuXHRcdCwgaXNfY2hyb21lX2lvcyA9L0NyaU9TXFwvW1xcZF0rLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG5cdFx0LCB0aHJvd19vdXRzaWRlID0gZnVuY3Rpb24oZXgpIHtcblx0XHRcdCh2aWV3LnNldEltbWVkaWF0ZSB8fCB2aWV3LnNldFRpbWVvdXQpKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR0aHJvdyBleDtcblx0XHRcdH0sIDApO1xuXHRcdH1cblx0XHQsIGZvcmNlX3NhdmVhYmxlX3R5cGUgPSBcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiXG5cdFx0Ly8gdGhlIEJsb2IgQVBJIGlzIGZ1bmRhbWVudGFsbHkgYnJva2VuIGFzIHRoZXJlIGlzIG5vIFwiZG93bmxvYWRmaW5pc2hlZFwiIGV2ZW50IHRvIHN1YnNjcmliZSB0b1xuXHRcdCwgYXJiaXRyYXJ5X3Jldm9rZV90aW1lb3V0ID0gMTAwMCAqIDQwIC8vIGluIG1zXG5cdFx0LCByZXZva2UgPSBmdW5jdGlvbihmaWxlKSB7XG5cdFx0XHR2YXIgcmV2b2tlciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAodHlwZW9mIGZpbGUgPT09IFwic3RyaW5nXCIpIHsgLy8gZmlsZSBpcyBhbiBvYmplY3QgVVJMXG5cdFx0XHRcdFx0Z2V0X1VSTCgpLnJldm9rZU9iamVjdFVSTChmaWxlKTtcblx0XHRcdFx0fSBlbHNlIHsgLy8gZmlsZSBpcyBhIEZpbGVcblx0XHRcdFx0XHRmaWxlLnJlbW92ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0c2V0VGltZW91dChyZXZva2VyLCBhcmJpdHJhcnlfcmV2b2tlX3RpbWVvdXQpO1xuXHRcdH1cblx0XHQsIGRpc3BhdGNoID0gZnVuY3Rpb24oZmlsZXNhdmVyLCBldmVudF90eXBlcywgZXZlbnQpIHtcblx0XHRcdGV2ZW50X3R5cGVzID0gW10uY29uY2F0KGV2ZW50X3R5cGVzKTtcblx0XHRcdHZhciBpID0gZXZlbnRfdHlwZXMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0XHR2YXIgbGlzdGVuZXIgPSBmaWxlc2F2ZXJbXCJvblwiICsgZXZlbnRfdHlwZXNbaV1dO1xuXHRcdFx0XHRpZiAodHlwZW9mIGxpc3RlbmVyID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0bGlzdGVuZXIuY2FsbChmaWxlc2F2ZXIsIGV2ZW50IHx8IGZpbGVzYXZlcik7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXgpIHtcblx0XHRcdFx0XHRcdHRocm93X291dHNpZGUoZXgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHQsIGF1dG9fYm9tID0gZnVuY3Rpb24oYmxvYikge1xuXHRcdFx0Ly8gcHJlcGVuZCBCT00gZm9yIFVURi04IFhNTCBhbmQgdGV4dC8qIHR5cGVzIChpbmNsdWRpbmcgSFRNTClcblx0XHRcdC8vIG5vdGU6IHlvdXIgYnJvd3NlciB3aWxsIGF1dG9tYXRpY2FsbHkgY29udmVydCBVVEYtMTYgVStGRUZGIHRvIEVGIEJCIEJGXG5cdFx0XHRpZiAoL15cXHMqKD86dGV4dFxcL1xcUyp8YXBwbGljYXRpb25cXC94bWx8XFxTKlxcL1xcUypcXCt4bWwpXFxzKjsuKmNoYXJzZXRcXHMqPVxccyp1dGYtOC9pLnRlc3QoYmxvYi50eXBlKSkge1xuXHRcdFx0XHRyZXR1cm4gbmV3IEJsb2IoW1N0cmluZy5mcm9tQ2hhckNvZGUoMHhGRUZGKSwgYmxvYl0sIHt0eXBlOiBibG9iLnR5cGV9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBibG9iO1xuXHRcdH1cblx0XHQsIEZpbGVTYXZlciA9IGZ1bmN0aW9uKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG5cdFx0XHRpZiAoIW5vX2F1dG9fYm9tKSB7XG5cdFx0XHRcdGJsb2IgPSBhdXRvX2JvbShibG9iKTtcblx0XHRcdH1cblx0XHRcdC8vIEZpcnN0IHRyeSBhLmRvd25sb2FkLCB0aGVuIHdlYiBmaWxlc3lzdGVtLCB0aGVuIG9iamVjdCBVUkxzXG5cdFx0XHR2YXJcblx0XHRcdFx0ICBmaWxlc2F2ZXIgPSB0aGlzXG5cdFx0XHRcdCwgdHlwZSA9IGJsb2IudHlwZVxuXHRcdFx0XHQsIGZvcmNlID0gdHlwZSA9PT0gZm9yY2Vfc2F2ZWFibGVfdHlwZVxuXHRcdFx0XHQsIG9iamVjdF91cmxcblx0XHRcdFx0LCBkaXNwYXRjaF9hbGwgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRkaXNwYXRjaChmaWxlc2F2ZXIsIFwid3JpdGVzdGFydCBwcm9ncmVzcyB3cml0ZSB3cml0ZWVuZFwiLnNwbGl0KFwiIFwiKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gb24gYW55IGZpbGVzeXMgZXJyb3JzIHJldmVydCB0byBzYXZpbmcgd2l0aCBvYmplY3QgVVJMc1xuXHRcdFx0XHQsIGZzX2Vycm9yID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKChpc19jaHJvbWVfaW9zIHx8IChmb3JjZSAmJiBpc19zYWZhcmkpKSAmJiB2aWV3LkZpbGVSZWFkZXIpIHtcblx0XHRcdFx0XHRcdC8vIFNhZmFyaSBkb2Vzbid0IGFsbG93IGRvd25sb2FkaW5nIG9mIGJsb2IgdXJsc1xuXHRcdFx0XHRcdFx0dmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHRcdFx0XHRyZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdHZhciB1cmwgPSBpc19jaHJvbWVfaW9zID8gcmVhZGVyLnJlc3VsdCA6IHJlYWRlci5yZXN1bHQucmVwbGFjZSgvXmRhdGE6W147XSo7LywgJ2RhdGE6YXR0YWNobWVudC9maWxlOycpO1xuXHRcdFx0XHRcdFx0XHR2YXIgcG9wdXAgPSB2aWV3Lm9wZW4odXJsLCAnX2JsYW5rJyk7XG5cdFx0XHRcdFx0XHRcdGlmKCFwb3B1cCkgdmlldy5sb2NhdGlvbi5ocmVmID0gdXJsO1xuXHRcdFx0XHRcdFx0XHR1cmw9dW5kZWZpbmVkOyAvLyByZWxlYXNlIHJlZmVyZW5jZSBiZWZvcmUgZGlzcGF0Y2hpbmdcblx0XHRcdFx0XHRcdFx0ZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcblx0XHRcdFx0XHRcdFx0ZGlzcGF0Y2hfYWxsKCk7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0cmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7XG5cdFx0XHRcdFx0XHRmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5JTklUO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBkb24ndCBjcmVhdGUgbW9yZSBvYmplY3QgVVJMcyB0aGFuIG5lZWRlZFxuXHRcdFx0XHRcdGlmICghb2JqZWN0X3VybCkge1xuXHRcdFx0XHRcdFx0b2JqZWN0X3VybCA9IGdldF9VUkwoKS5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChmb3JjZSkge1xuXHRcdFx0XHRcdFx0dmlldy5sb2NhdGlvbi5ocmVmID0gb2JqZWN0X3VybDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dmFyIG9wZW5lZCA9IHZpZXcub3BlbihvYmplY3RfdXJsLCBcIl9ibGFua1wiKTtcblx0XHRcdFx0XHRcdGlmICghb3BlbmVkKSB7XG5cdFx0XHRcdFx0XHRcdC8vIEFwcGxlIGRvZXMgbm90IGFsbG93IHdpbmRvdy5vcGVuLCBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2xpYnJhcnkvc2FmYXJpL2RvY3VtZW50YXRpb24vVG9vbHMvQ29uY2VwdHVhbC9TYWZhcmlFeHRlbnNpb25HdWlkZS9Xb3JraW5nd2l0aFdpbmRvd3NhbmRUYWJzL1dvcmtpbmd3aXRoV2luZG93c2FuZFRhYnMuaHRtbFxuXHRcdFx0XHRcdFx0XHR2aWV3LmxvY2F0aW9uLmhyZWYgPSBvYmplY3RfdXJsO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuXHRcdFx0XHRcdGRpc3BhdGNoX2FsbCgpO1xuXHRcdFx0XHRcdHJldm9rZShvYmplY3RfdXJsKTtcblx0XHRcdFx0fVxuXHRcdFx0O1xuXHRcdFx0ZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuSU5JVDtcblxuXHRcdFx0aWYgKGNhbl91c2Vfc2F2ZV9saW5rKSB7XG5cdFx0XHRcdG9iamVjdF91cmwgPSBnZXRfVVJMKCkuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHNhdmVfbGluay5ocmVmID0gb2JqZWN0X3VybDtcblx0XHRcdFx0XHRzYXZlX2xpbmsuZG93bmxvYWQgPSBuYW1lO1xuXHRcdFx0XHRcdGNsaWNrKHNhdmVfbGluayk7XG5cdFx0XHRcdFx0ZGlzcGF0Y2hfYWxsKCk7XG5cdFx0XHRcdFx0cmV2b2tlKG9iamVjdF91cmwpO1xuXHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGZzX2Vycm9yKCk7XG5cdFx0fVxuXHRcdCwgRlNfcHJvdG8gPSBGaWxlU2F2ZXIucHJvdG90eXBlXG5cdFx0LCBzYXZlQXMgPSBmdW5jdGlvbihibG9iLCBuYW1lLCBub19hdXRvX2JvbSkge1xuXHRcdFx0cmV0dXJuIG5ldyBGaWxlU2F2ZXIoYmxvYiwgbmFtZSB8fCBibG9iLm5hbWUgfHwgXCJkb3dubG9hZFwiLCBub19hdXRvX2JvbSk7XG5cdFx0fVxuXHQ7XG5cdC8vIElFIDEwKyAobmF0aXZlIHNhdmVBcylcblx0aWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIgJiYgbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pIHtcblx0XHRcdG5hbWUgPSBuYW1lIHx8IGJsb2IubmFtZSB8fCBcImRvd25sb2FkXCI7XG5cblx0XHRcdGlmICghbm9fYXV0b19ib20pIHtcblx0XHRcdFx0YmxvYiA9IGF1dG9fYm9tKGJsb2IpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKGJsb2IsIG5hbWUpO1xuXHRcdH07XG5cdH1cblxuXHRGU19wcm90by5hYm9ydCA9IGZ1bmN0aW9uKCl7fTtcblx0RlNfcHJvdG8ucmVhZHlTdGF0ZSA9IEZTX3Byb3RvLklOSVQgPSAwO1xuXHRGU19wcm90by5XUklUSU5HID0gMTtcblx0RlNfcHJvdG8uRE9ORSA9IDI7XG5cblx0RlNfcHJvdG8uZXJyb3IgPVxuXHRGU19wcm90by5vbndyaXRlc3RhcnQgPVxuXHRGU19wcm90by5vbnByb2dyZXNzID1cblx0RlNfcHJvdG8ub253cml0ZSA9XG5cdEZTX3Byb3RvLm9uYWJvcnQgPVxuXHRGU19wcm90by5vbmVycm9yID1cblx0RlNfcHJvdG8ub253cml0ZWVuZCA9XG5cdFx0bnVsbDtcblxuXHRyZXR1cm4gc2F2ZUFzO1xufShcblx0ICAgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZlxuXHR8fCB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvd1xuXHR8fCB0aGlzLmNvbnRlbnRcbikpO1xuLy8gYHNlbGZgIGlzIHVuZGVmaW5lZCBpbiBGaXJlZm94IGZvciBBbmRyb2lkIGNvbnRlbnQgc2NyaXB0IGNvbnRleHRcbi8vIHdoaWxlIGB0aGlzYCBpcyBuc0lDb250ZW50RnJhbWVNZXNzYWdlTWFuYWdlclxuLy8gd2l0aCBhbiBhdHRyaWJ1dGUgYGNvbnRlbnRgIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIHdpbmRvd1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cy5zYXZlQXMgPSBzYXZlQXM7XG59IGVsc2UgaWYgKCh0eXBlb2YgZGVmaW5lICE9PSBcInVuZGVmaW5lZFwiICYmIGRlZmluZSAhPT0gbnVsbCkgJiYgKGRlZmluZS5hbWQgIT09IG51bGwpKSB7XG4gIGRlZmluZShcIkZpbGVTYXZlci5qc1wiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc2F2ZUFzO1xuICB9KTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2ZpbGUtc2F2ZXIvRmlsZVNhdmVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHRocm93IG5ldyBFcnJvcihcImRlZmluZSBjYW5ub3QgYmUgdXNlZCBpbmRpcmVjdFwiKTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogZ2xvYmFscyBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXyAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19hbWRfb3B0aW9uc19fO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBtYWlubG9vcC5qcyAxLjAuMy0yMDE3MDUyOVxuICpcbiAqIEBhdXRob3IgSXNhYWMgU3VraW4gKGh0dHA6Ly93d3cuaXNhYWNzdWtpbi5jb20vKVxuICogQGxpY2Vuc2UgTUlUXG4gKi9cblxuIWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYSl7aWYoeD1xKGIpLCEoYTxlK2wpKXtmb3IoZCs9YS1lLGU9YSx0KGEsZCksYT5pK2gmJihmPWcqaioxZTMvKGEtaSkrKDEtZykqZixpPWEsaj0wKSxqKyssaz0wO2Q+PWM7KWlmKHUoYyksZC09YywrK2s+PTI0MCl7bz0hMDticmVha312KGQvYyksdyhmLG8pLG89ITF9fXZhciBjPTFlMy82MCxkPTAsZT0wLGY9NjAsZz0uOSxoPTFlMyxpPTAsaj0wLGs9MCxsPTAsbT0hMSxuPSExLG89ITEscD1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93P3dpbmRvdzphLHE9cC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fGZ1bmN0aW9uKCl7dmFyIGE9RGF0ZS5ub3coKSxiLGQ7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiBiPURhdGUubm93KCksZD1NYXRoLm1heCgwLGMtKGItYSkpLGE9YitkLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtlKGIrZCl9LGQpfX0oKSxyPXAuY2FuY2VsQW5pbWF0aW9uRnJhbWV8fGNsZWFyVGltZW91dCxzPWZ1bmN0aW9uKCl7fSx0PXMsdT1zLHY9cyx3PXMseDthLk1haW5Mb29wPXtnZXRTaW11bGF0aW9uVGltZXN0ZXA6ZnVuY3Rpb24oKXtyZXR1cm4gY30sc2V0U2ltdWxhdGlvblRpbWVzdGVwOmZ1bmN0aW9uKGEpe3JldHVybiBjPWEsdGhpc30sZ2V0RlBTOmZ1bmN0aW9uKCl7cmV0dXJuIGZ9LGdldE1heEFsbG93ZWRGUFM6ZnVuY3Rpb24oKXtyZXR1cm4gMWUzL2x9LHNldE1heEFsbG93ZWRGUFM6ZnVuY3Rpb24oYSl7cmV0dXJuXCJ1bmRlZmluZWRcIj09dHlwZW9mIGEmJihhPTEvMCksMD09PWE/dGhpcy5zdG9wKCk6bD0xZTMvYSx0aGlzfSxyZXNldEZyYW1lRGVsdGE6ZnVuY3Rpb24oKXt2YXIgYT1kO3JldHVybiBkPTAsYX0sc2V0QmVnaW46ZnVuY3Rpb24oYSl7cmV0dXJuIHQ9YXx8dCx0aGlzfSxzZXRVcGRhdGU6ZnVuY3Rpb24oYSl7cmV0dXJuIHU9YXx8dSx0aGlzfSxzZXREcmF3OmZ1bmN0aW9uKGEpe3JldHVybiB2PWF8fHYsdGhpc30sc2V0RW5kOmZ1bmN0aW9uKGEpe3JldHVybiB3PWF8fHcsdGhpc30sc3RhcnQ6ZnVuY3Rpb24oKXtyZXR1cm4gbnx8KG49ITAseD1xKGZ1bmN0aW9uKGEpe3YoMSksbT0hMCxlPWEsaT1hLGo9MCx4PXEoYil9KSksdGhpc30sc3RvcDpmdW5jdGlvbigpe3JldHVybiBtPSExLG49ITEscih4KSx0aGlzfSxpc1J1bm5pbmc6ZnVuY3Rpb24oKXtyZXR1cm4gbX19LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoYS5NYWluTG9vcCk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbnVsbCE9PW1vZHVsZSYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZS5leHBvcnRzJiYobW9kdWxlLmV4cG9ydHM9YS5NYWluTG9vcCl9KHRoaXMpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbmxvb3AubWluLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21haW5sb29wLmpzL2J1aWxkL21haW5sb29wLm1pbi5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==