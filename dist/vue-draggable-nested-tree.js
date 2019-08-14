/*!
 * vue-draggable-nested-tree v2.2.18
 * (c) 2018-present phphe <phphe@outlook.com>
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.vueDraggableNestedTree = {})));
}(this, (function (exports) { 'use strict';

  // 7.2.1 RequireObjectCoercible(argument)
  var _defined = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  // 7.1.13 ToObject(argument)

  var _toObject = function (it) {
    return Object(_defined(it));
  };

  var hasOwnProperty = {}.hasOwnProperty;
  var _has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var toString = {}.toString;

  var _cof = function (it) {
    return toString.call(it).slice(8, -1);
  };

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return _cof(it) == 'String' ? it.split('') : Object(it);
  };

  // to indexed object, toObject with fallback for non-array-like ES3 strings


  var _toIobject = function (it) {
    return _iobject(_defined(it));
  };

  // 7.1.4 ToInteger
  var ceil = Math.ceil;
  var floor = Math.floor;
  var _toInteger = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };

  // 7.1.15 ToLength

  var min = Math.min;
  var _toLength = function (it) {
    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;
  var _toAbsoluteIndex = function (index, length) {
    index = _toInteger(index);
    return index < 0 ? max(index + length, 0) : min$1(index, length);
  };

  // false -> Array#indexOf
  // true  -> Array#includes



  var _arrayIncludes = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = _toIobject($this);
      var length = _toLength(O.length);
      var index = _toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _core = createCommonjsModule(function (module) {
  var core = module.exports = { version: '2.6.1' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });
  var _core_1 = _core.version;

  var _global = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math
    ? window : typeof self != 'undefined' && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  });

  var _library = true;

  var _shared = createCommonjsModule(function (module) {
  var SHARED = '__core-js_shared__';
  var store = _global[SHARED] || (_global[SHARED] = {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: _core.version,
    mode: _library ? 'pure' : 'global',
    copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id = 0;
  var px = Math.random();
  var _uid = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };

  var shared = _shared('keys');

  var _sharedKey = function (key) {
    return shared[key] || (shared[key] = _uid(key));
  };

  var arrayIndexOf = _arrayIncludes(false);
  var IE_PROTO = _sharedKey('IE_PROTO');

  var _objectKeysInternal = function (object, names) {
    var O = _toIobject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (_has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE 8- don't enum bug keys
  var _enumBugKeys = (
    'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
  ).split(',');

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)



  var _objectKeys = Object.keys || function keys(O) {
    return _objectKeysInternal(O, _enumBugKeys);
  };

  var _aFunction = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };

  // optional / simple context binding

  var _ctx = function (fn, that, length) {
    _aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var _isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var _anObject = function (it) {
    if (!_isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  var _fails = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var _descriptors = !_fails(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var document$1 = _global.document;
  // typeof document.createElement is 'object' in old IE
  var is = _isObject(document$1) && _isObject(document$1.createElement);
  var _domCreate = function (it) {
    return is ? document$1.createElement(it) : {};
  };

  var _ie8DomDefine = !_descriptors && !_fails(function () {
    return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
  });

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var _toPrimitive = function (it, S) {
    if (!_isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP = Object.defineProperty;

  var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject(O);
    P = _toPrimitive(P, true);
    _anObject(Attributes);
    if (_ie8DomDefine) try {
      return dP(O, P, Attributes);
    } catch (e) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var _objectDp = {
  	f: f
  };

  var _propertyDesc = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var _hide = _descriptors ? function (object, key, value) {
    return _objectDp.f(object, key, _propertyDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var PROTOTYPE = 'prototype';

  var $export = function (type, name, source) {
    var IS_FORCED = type & $export.F;
    var IS_GLOBAL = type & $export.G;
    var IS_STATIC = type & $export.S;
    var IS_PROTO = type & $export.P;
    var IS_BIND = type & $export.B;
    var IS_WRAP = type & $export.W;
    var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
    var expProto = exports[PROTOTYPE];
    var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
    var key, own, out;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      if (own && _has(exports, key)) continue;
      // export native or passed
      out = own ? target[key] : source[key];
      // prevent global pollution for namespaces
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
      // bind timers to global for call from export context
      : IS_BIND && own ? _ctx(out, _global)
      // wrap global constructors for prevent change them in library
      : IS_WRAP && target[key] == out ? (function (C) {
        var F = function (a, b, c) {
          if (this instanceof C) {
            switch (arguments.length) {
              case 0: return new C();
              case 1: return new C(a);
              case 2: return new C(a, b);
            } return new C(a, b, c);
          } return C.apply(this, arguments);
        };
        F[PROTOTYPE] = C[PROTOTYPE];
        return F;
      // make static versions for prototype methods
      })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
      // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
      if (IS_PROTO) {
        (exports.virtual || (exports.virtual = {}))[key] = out;
        // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
        if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
      }
    }
  };
  // type bitmap
  $export.F = 1;   // forced
  $export.G = 2;   // global
  $export.S = 4;   // static
  $export.P = 8;   // proto
  $export.B = 16;  // bind
  $export.W = 32;  // wrap
  $export.U = 64;  // safe
  $export.R = 128; // real proto method for `library`
  var _export = $export;

  // most Object methods by ES6 should accept primitives



  var _objectSap = function (KEY, exec) {
    var fn = (_core.Object || {})[KEY] || Object[KEY];
    var exp = {};
    exp[KEY] = exec(fn);
    _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
  };

  // 19.1.2.14 Object.keys(O)



  _objectSap('keys', function () {
    return function keys(it) {
      return _objectKeys(_toObject(it));
    };
  });

  var keys = _core.Object.keys;

  var keys$1 = keys;

  var _core$1 = createCommonjsModule(function (module) {
  var core = module.exports = { version: '2.6.1' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });
  var _core_1$1 = _core$1.version;

  var _global$1 = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math
    ? window : typeof self != 'undefined' && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  });

  var _library$1 = false;

  var _shared$1 = createCommonjsModule(function (module) {
  var SHARED = '__core-js_shared__';
  var store = _global$1[SHARED] || (_global$1[SHARED] = {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: _core$1.version,
    mode: _library$1 ? 'pure' : 'global',
    copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id$1 = 0;
  var px$1 = Math.random();
  var _uid$1 = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$1 + px$1).toString(36));
  };

  var _wks = createCommonjsModule(function (module) {
  var store = _shared$1('wks');

  var Symbol = _global$1.Symbol;
  var USE_SYMBOL = typeof Symbol == 'function';

  var $exports = module.exports = function (name) {
    return store[name] || (store[name] =
      USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid$1)('Symbol.' + name));
  };

  $exports.store = store;
  });

  var _isObject$1 = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var _anObject$1 = function (it) {
    if (!_isObject$1(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  var _fails$1 = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var _descriptors$1 = !_fails$1(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var document$2 = _global$1.document;
  // typeof document.createElement is 'object' in old IE
  var is$1 = _isObject$1(document$2) && _isObject$1(document$2.createElement);
  var _domCreate$1 = function (it) {
    return is$1 ? document$2.createElement(it) : {};
  };

  var _ie8DomDefine$1 = !_descriptors$1 && !_fails$1(function () {
    return Object.defineProperty(_domCreate$1('div'), 'a', { get: function () { return 7; } }).a != 7;
  });

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var _toPrimitive$1 = function (it, S) {
    if (!_isObject$1(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject$1(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP$1 = Object.defineProperty;

  var f$1 = _descriptors$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject$1(O);
    P = _toPrimitive$1(P, true);
    _anObject$1(Attributes);
    if (_ie8DomDefine$1) try {
      return dP$1(O, P, Attributes);
    } catch (e) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var _objectDp$1 = {
  	f: f$1
  };

  var _propertyDesc$1 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var _hide$1 = _descriptors$1 ? function (object, key, value) {
    return _objectDp$1.f(object, key, _propertyDesc$1(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  // 22.1.3.31 Array.prototype[@@unscopables]
  var UNSCOPABLES = _wks('unscopables');
  var ArrayProto = Array.prototype;
  if (ArrayProto[UNSCOPABLES] == undefined) _hide$1(ArrayProto, UNSCOPABLES, {});
  var _addToUnscopables = function (key) {
    ArrayProto[UNSCOPABLES][key] = true;
  };

  var _iterStep = function (done, value) {
    return { value: value, done: !!done };
  };

  var _iterators = {};

  var toString$1 = {}.toString;

  var _cof$1 = function (it) {
    return toString$1.call(it).slice(8, -1);
  };

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  var _iobject$1 = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return _cof$1(it) == 'String' ? it.split('') : Object(it);
  };

  // 7.2.1 RequireObjectCoercible(argument)
  var _defined$1 = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  // to indexed object, toObject with fallback for non-array-like ES3 strings


  var _toIobject$1 = function (it) {
    return _iobject$1(_defined$1(it));
  };

  var hasOwnProperty$1 = {}.hasOwnProperty;
  var _has$1 = function (it, key) {
    return hasOwnProperty$1.call(it, key);
  };

  var _redefine = createCommonjsModule(function (module) {
  var SRC = _uid$1('src');
  var TO_STRING = 'toString';
  var $toString = Function[TO_STRING];
  var TPL = ('' + $toString).split(TO_STRING);

  _core$1.inspectSource = function (it) {
    return $toString.call(it);
  };

  (module.exports = function (O, key, val, safe) {
    var isFunction = typeof val == 'function';
    if (isFunction) _has$1(val, 'name') || _hide$1(val, 'name', key);
    if (O[key] === val) return;
    if (isFunction) _has$1(val, SRC) || _hide$1(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    if (O === _global$1) {
      O[key] = val;
    } else if (!safe) {
      delete O[key];
      _hide$1(O, key, val);
    } else if (O[key]) {
      O[key] = val;
    } else {
      _hide$1(O, key, val);
    }
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, TO_STRING, function toString() {
    return typeof this == 'function' && this[SRC] || $toString.call(this);
  });
  });

  var _aFunction$1 = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };

  // optional / simple context binding

  var _ctx$1 = function (fn, that, length) {
    _aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var PROTOTYPE$1 = 'prototype';

  var $export$1 = function (type, name, source) {
    var IS_FORCED = type & $export$1.F;
    var IS_GLOBAL = type & $export$1.G;
    var IS_STATIC = type & $export$1.S;
    var IS_PROTO = type & $export$1.P;
    var IS_BIND = type & $export$1.B;
    var target = IS_GLOBAL ? _global$1 : IS_STATIC ? _global$1[name] || (_global$1[name] = {}) : (_global$1[name] || {})[PROTOTYPE$1];
    var exports = IS_GLOBAL ? _core$1 : _core$1[name] || (_core$1[name] = {});
    var expProto = exports[PROTOTYPE$1] || (exports[PROTOTYPE$1] = {});
    var key, own, out, exp;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      // export native or passed
      out = (own ? target : source)[key];
      // bind timers to global for call from export context
      exp = IS_BIND && own ? _ctx$1(out, _global$1) : IS_PROTO && typeof out == 'function' ? _ctx$1(Function.call, out) : out;
      // extend global
      if (target) _redefine(target, key, out, type & $export$1.U);
      // export
      if (exports[key] != out) _hide$1(exports, key, exp);
      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
    }
  };
  _global$1.core = _core$1;
  // type bitmap
  $export$1.F = 1;   // forced
  $export$1.G = 2;   // global
  $export$1.S = 4;   // static
  $export$1.P = 8;   // proto
  $export$1.B = 16;  // bind
  $export$1.W = 32;  // wrap
  $export$1.U = 64;  // safe
  $export$1.R = 128; // real proto method for `library`
  var _export$1 = $export$1;

  // 7.1.4 ToInteger
  var ceil$1 = Math.ceil;
  var floor$1 = Math.floor;
  var _toInteger$1 = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor$1 : ceil$1)(it);
  };

  // 7.1.15 ToLength

  var min$2 = Math.min;
  var _toLength$1 = function (it) {
    return it > 0 ? min$2(_toInteger$1(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  var max$1 = Math.max;
  var min$3 = Math.min;
  var _toAbsoluteIndex$1 = function (index, length) {
    index = _toInteger$1(index);
    return index < 0 ? max$1(index + length, 0) : min$3(index, length);
  };

  // false -> Array#indexOf
  // true  -> Array#includes



  var _arrayIncludes$1 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = _toIobject$1($this);
      var length = _toLength$1(O.length);
      var index = _toAbsoluteIndex$1(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var shared$1 = _shared$1('keys');

  var _sharedKey$1 = function (key) {
    return shared$1[key] || (shared$1[key] = _uid$1(key));
  };

  var arrayIndexOf$1 = _arrayIncludes$1(false);
  var IE_PROTO$1 = _sharedKey$1('IE_PROTO');

  var _objectKeysInternal$1 = function (object, names) {
    var O = _toIobject$1(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) if (key != IE_PROTO$1) _has$1(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (_has$1(O, key = names[i++])) {
      ~arrayIndexOf$1(result, key) || result.push(key);
    }
    return result;
  };

  // IE 8- don't enum bug keys
  var _enumBugKeys$1 = (
    'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
  ).split(',');

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)



  var _objectKeys$1 = Object.keys || function keys(O) {
    return _objectKeysInternal$1(O, _enumBugKeys$1);
  };

  var _objectDps = _descriptors$1 ? Object.defineProperties : function defineProperties(O, Properties) {
    _anObject$1(O);
    var keys = _objectKeys$1(Properties);
    var length = keys.length;
    var i = 0;
    var P;
    while (length > i) _objectDp$1.f(O, P = keys[i++], Properties[P]);
    return O;
  };

  var document$3 = _global$1.document;
  var _html = document$3 && document$3.documentElement;

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



  var IE_PROTO$2 = _sharedKey$1('IE_PROTO');
  var Empty = function () { /* empty */ };
  var PROTOTYPE$2 = 'prototype';

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = _domCreate$1('iframe');
    var i = _enumBugKeys$1.length;
    var lt = '<';
    var gt = '>';
    var iframeDocument;
    iframe.style.display = 'none';
    _html.appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (i--) delete createDict[PROTOTYPE$2][_enumBugKeys$1[i]];
    return createDict();
  };

  var _objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE$2] = _anObject$1(O);
      result = new Empty();
      Empty[PROTOTYPE$2] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$2] = O;
    } else result = createDict();
    return Properties === undefined ? result : _objectDps(result, Properties);
  };

  var def = _objectDp$1.f;

  var TAG = _wks('toStringTag');

  var _setToStringTag = function (it, tag, stat) {
    if (it && !_has$1(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
  };

  var IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _hide$1(IteratorPrototype, _wks('iterator'), function () { return this; });

  var _iterCreate = function (Constructor, NAME, next) {
    Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc$1(1, next) });
    _setToStringTag(Constructor, NAME + ' Iterator');
  };

  // 7.1.13 ToObject(argument)

  var _toObject$1 = function (it) {
    return Object(_defined$1(it));
  };

  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


  var IE_PROTO$3 = _sharedKey$1('IE_PROTO');
  var ObjectProto = Object.prototype;

  var _objectGpo = Object.getPrototypeOf || function (O) {
    O = _toObject$1(O);
    if (_has$1(O, IE_PROTO$3)) return O[IE_PROTO$3];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto : null;
  };

  var ITERATOR = _wks('iterator');
  var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
  var FF_ITERATOR = '@@iterator';
  var KEYS = 'keys';
  var VALUES = 'values';

  var returnThis = function () { return this; };

  var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    _iterCreate(Constructor, NAME, next);
    var getMethod = function (kind) {
      if (!BUGGY && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS: return function keys() { return new Constructor(this, kind); };
        case VALUES: return function values() { return new Constructor(this, kind); };
      } return function entries() { return new Constructor(this, kind); };
    };
    var TAG = NAME + ' Iterator';
    var DEF_VALUES = DEFAULT == VALUES;
    var VALUES_BUG = false;
    var proto = Base.prototype;
    var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
    var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype;
    // Fix native
    if ($anyNative) {
      IteratorPrototype = _objectGpo($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        _setToStringTag(IteratorPrototype, TAG, true);
        // fix for some old engines
        if (!_library$1 && typeof IteratorPrototype[ITERATOR] != 'function') _hide$1(IteratorPrototype, ITERATOR, returnThis);
      }
    }
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native && $native.name !== VALUES) {
      VALUES_BUG = true;
      $default = function values() { return $native.call(this); };
    }
    // Define iterator
    if ((!_library$1 || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      _hide$1(proto, ITERATOR, $default);
    }
    // Plug for library
    _iterators[NAME] = $default;
    _iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries
      };
      if (FORCED) for (key in methods) {
        if (!(key in proto)) _redefine(proto, key, methods[key]);
      } else _export$1(_export$1.P + _export$1.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
    this._t = _toIobject$1(iterated); // target
    this._i = 0;                   // next index
    this._k = kind;                // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var kind = this._k;
    var index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return _iterStep(1);
    }
    if (kind == 'keys') return _iterStep(0, index);
    if (kind == 'values') return _iterStep(0, O[index]);
    return _iterStep(0, [index, O[index]]);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  _iterators.Arguments = _iterators.Array;

  _addToUnscopables('keys');
  _addToUnscopables('values');
  _addToUnscopables('entries');

  var ITERATOR$1 = _wks('iterator');
  var TO_STRING_TAG = _wks('toStringTag');
  var ArrayValues = _iterators.Array;

  var DOMIterables = {
    CSSRuleList: true, // TODO: Not spec compliant, should be false.
    CSSStyleDeclaration: false,
    CSSValueList: false,
    ClientRectList: false,
    DOMRectList: false,
    DOMStringList: false,
    DOMTokenList: true,
    DataTransferItemList: false,
    FileList: false,
    HTMLAllCollection: false,
    HTMLCollection: false,
    HTMLFormElement: false,
    HTMLSelectElement: false,
    MediaList: true, // TODO: Not spec compliant, should be false.
    MimeTypeArray: false,
    NamedNodeMap: false,
    NodeList: true,
    PaintRequestList: false,
    Plugin: false,
    PluginArray: false,
    SVGLengthList: false,
    SVGNumberList: false,
    SVGPathSegList: false,
    SVGPointList: false,
    SVGStringList: false,
    SVGTransformList: false,
    SourceBufferList: false,
    StyleSheetList: true, // TODO: Not spec compliant, should be false.
    TextTrackCueList: false,
    TextTrackList: false,
    TouchList: false
  };

  for (var collections = _objectKeys$1(DOMIterables), i = 0; i < collections.length; i++) {
    var NAME = collections[i];
    var explicit = DOMIterables[NAME];
    var Collection = _global$1[NAME];
    var proto = Collection && Collection.prototype;
    var key;
    if (proto) {
      if (!proto[ITERATOR$1]) _hide$1(proto, ITERATOR$1, ArrayValues);
      if (!proto[TO_STRING_TAG]) _hide$1(proto, TO_STRING_TAG, NAME);
      _iterators[NAME] = ArrayValues;
      if (explicit) for (key in es6_array_iterator) if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
    }
  }

  var f$2 = Object.getOwnPropertySymbols;

  var _objectGops = {
  	f: f$2
  };

  var f$3 = {}.propertyIsEnumerable;

  var _objectPie = {
  	f: f$3
  };

  // 19.1.2.1 Object.assign(target, source, ...)





  var $assign = Object.assign;

  // should work with symbols and should have deterministic property order (V8 bug)
  var _objectAssign = !$assign || _fails(function () {
    var A = {};
    var B = {};
    // eslint-disable-next-line no-undef
    var S = Symbol();
    var K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function (k) { B[k] = k; });
    return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars
    var T = _toObject(target);
    var aLen = arguments.length;
    var index = 1;
    var getSymbols = _objectGops.f;
    var isEnum = _objectPie.f;
    while (aLen > index) {
      var S = _iobject(arguments[index++]);
      var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    } return T;
  } : $assign;

  // 19.1.3.1 Object.assign(target, source)


  _export(_export.S + _export.F, 'Object', { assign: _objectAssign });

  var assign = _core.Object.assign;

  var assign$1 = assign;

  var f$4 = {}.propertyIsEnumerable;

  var _objectPie$1 = {
  	f: f$4
  };

  var gOPD = Object.getOwnPropertyDescriptor;

  var f$5 = _descriptors$1 ? gOPD : function getOwnPropertyDescriptor(O, P) {
    O = _toIobject$1(O);
    P = _toPrimitive$1(P, true);
    if (_ie8DomDefine$1) try {
      return gOPD(O, P);
    } catch (e) { /* empty */ }
    if (_has$1(O, P)) return _propertyDesc$1(!_objectPie$1.f.call(O, P), O[P]);
  };

  var _objectGopd = {
  	f: f$5
  };

  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */


  var check = function (O, proto) {
    _anObject$1(O);
    if (!_isObject$1(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
  };
  var _setProto = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
      function (test, buggy, set) {
        try {
          set = _ctx$1(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
          set(test, []);
          buggy = !(test instanceof Array);
        } catch (e) { buggy = true; }
        return function setPrototypeOf(O, proto) {
          check(O, proto);
          if (buggy) O.__proto__ = proto;
          else set(O, proto);
          return O;
        };
      }({}, false) : undefined),
    check: check
  };

  var setPrototypeOf = _setProto.set;
  var _inheritIfRequired = function (that, target, C) {
    var S = target.constructor;
    var P;
    if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject$1(P) && setPrototypeOf) {
      setPrototypeOf(that, P);
    } return that;
  };

  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

  var hiddenKeys = _enumBugKeys$1.concat('length', 'prototype');

  var f$6 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return _objectKeysInternal$1(O, hiddenKeys);
  };

  var _objectGopn = {
  	f: f$6
  };

  var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
    '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var space = '[' + _stringWs + ']';
  var non = '\u200b\u0085';
  var ltrim = RegExp('^' + space + space + '*');
  var rtrim = RegExp(space + space + '*$');

  var exporter = function (KEY, exec, ALIAS) {
    var exp = {};
    var FORCE = _fails$1(function () {
      return !!_stringWs[KEY]() || non[KEY]() != non;
    });
    var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
    if (ALIAS) exp[ALIAS] = fn;
    _export$1(_export$1.P + _export$1.F * FORCE, 'String', exp);
  };

  // 1 -> String#trimLeft
  // 2 -> String#trimRight
  // 3 -> String#trim
  var trim = exporter.trim = function (string, TYPE) {
    string = String(_defined$1(string));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };

  var _stringTrim = exporter;

  var gOPN = _objectGopn.f;
  var gOPD$1 = _objectGopd.f;
  var dP$2 = _objectDp$1.f;
  var $trim = _stringTrim.trim;
  var NUMBER = 'Number';
  var $Number = _global$1[NUMBER];
  var Base = $Number;
  var proto$1 = $Number.prototype;
  // Opera ~12 has broken Object#toString
  var BROKEN_COF = _cof$1(_objectCreate(proto$1)) == NUMBER;
  var TRIM = 'trim' in String.prototype;

  // 7.1.3 ToNumber(argument)
  var toNumber = function (argument) {
    var it = _toPrimitive$1(argument, false);
    if (typeof it == 'string' && it.length > 2) {
      it = TRIM ? it.trim() : $trim(it, 3);
      var first = it.charCodeAt(0);
      var third, radix, maxCode;
      if (first === 43 || first === 45) {
        third = it.charCodeAt(2);
        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
      } else if (first === 48) {
        switch (it.charCodeAt(1)) {
          case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
          case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
          default: return +it;
        }
        for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
          code = digits.charCodeAt(i);
          // parseInt parses a string to a first unavailable symbol
          // but ToNumber should return NaN if a string contains unavailable symbols
          if (code < 48 || code > maxCode) return NaN;
        } return parseInt(digits, radix);
      }
    } return +it;
  };

  if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
    $Number = function Number(value) {
      var it = arguments.length < 1 ? 0 : value;
      var that = this;
      return that instanceof $Number
        // check on 1..constructor(foo) case
        && (BROKEN_COF ? _fails$1(function () { proto$1.valueOf.call(that); }) : _cof$1(that) != NUMBER)
          ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
    };
    for (var keys$2 = _descriptors$1 ? gOPN(Base) : (
      // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
      // ES6 (in case, if modules with ES6 Number statics required before):
      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
      'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
    ).split(','), j = 0, key$1; keys$2.length > j; j++) {
      if (_has$1(Base, key$1 = keys$2[j]) && !_has$1($Number, key$1)) {
        dP$2($Number, key$1, gOPD$1(Base, key$1));
      }
    }
    $Number.prototype = proto$1;
    proto$1.constructor = $Number;
    _redefine(_global$1, NUMBER, $Number);
  }

  /*!
   * helper-js v1.3.7
   * (c) 2018-present phphe <phphe@outlook.com> (https://github.com/phphe)
   * Released under the MIT License.
   */

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return _get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  // local store
  var store = {}; // get global

  function glb() {
    if (store.glb) {
      return store.glb;
    } else {
      // resolve global
      var t;

      try {
        t = global;
      } catch (e) {
        t = window;
      }

      store.glb = t;
      return t;
    }
  } // is 各种判断
  function isArray(v) {
    return Object.prototype.toString.call(v) === '[object Array]';
  }

  function numRand(min, max) {
    if (arguments.length === 1) {
      max = min;
      min = 0;
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function strRand() {
    var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var r = '';
    var seeds = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < len; i++) {
      r += seeds[numRand(seeds.length - 1)];
    }

    return prefix + r;
  }

  function arrayRemove(arr, v) {
    var index;
    var count = 0;

    while ((index = arr.indexOf(v)) > -1) {
      arr.splice(index, 1);
      count++;
    }

    return count;
  }

  function getScroll() {
    if (typeof pageYOffset != 'undefined') {
      //most browsers except IE before #9
      return {
        top: pageYOffset,
        left: pageXOffset
      };
    } else {
      var B = document.body; //IE 'quirks'

      var D = document.documentElement; //IE with doctype

      D = D.clientHeight ? D : B;
      return {
        top: D.scrollTop,
        left: D.scrollLeft
      };
    }
  } // refer: https://gist.github.com/aderaaij/89547e34617b95ac29d1

  function getOffset(el) {
    var rect = el.getBoundingClientRect();
    var scroll = getScroll();
    return {
      x: rect.left + scroll.left,
      y: rect.top + scroll.top
    };
  } // there is some trap in el.offsetParent, so use this func to fix

  function getOffsetParent(el) {
    var offsetParent = el.offsetParent;

    if (!offsetParent || offsetParent === document.body && getComputedStyle(document.body).position === 'static') {
      offsetParent = document.body.parentElement;
    }

    return offsetParent;
  } // get el current position. like jQuery.position
  // the position is relative to offsetParent viewport left top. it is for set absolute position, absolute position is relative to offsetParent viewport left top.
  // 相对于offsetParent可视区域左上角(el.offsetLeft或top包含父元素的滚动距离, 所以要减去). position一般用于设置绝对定位的情况, 而绝对定位就是以可视区域左上角为原点.

  function getPosition(el) {
    var offsetParent = getOffsetParent(el);
    var ps = {
      x: el.offsetLeft,
      y: el.offsetTop
    };
    var parent = el;

    while (true) {
      parent = parent.parentElement;

      if (parent === offsetParent || !parent) {
        break;
      }

      ps.x -= parent.scrollLeft;
      ps.y -= parent.scrollTop;
    }

    return ps;
  } // get position of a el if its offset is given. like jQuery.offset.
  function backupAttr(el, name) {
    var key = "original_".concat(name);
    el[key] = el.getAttribute(name);
  }
  function restoreAttr(el, name) {
    var key = "original_".concat(name);
    el.setAttribute(name, el[key]);
  } // source: http://youmightnotneedjquery.com/

  function hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  } // source: http://youmightnotneedjquery.com/

  function addClass(el, className) {
    if (!hasClass(el, className)) {
      if (el.classList) {
        el.classList.add(className);
      } else {
        el.className += ' ' + className;
      }
    }
  } // source: http://youmightnotneedjquery.com/
  function getElSize(el) {
    var originDisplay = el.style.display;
    el.style.display = 'block';
    var size = {
      width: el.offsetWidth,
      height: el.offsetHeight
    };
    el.style.display = originDisplay;
    return size;
  }

  function onDOM(el, name, handler) {
    for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key6 = 3; _key6 < _len5; _key6++) {
      args[_key6 - 3] = arguments[_key6];
    }

    if (el.addEventListener) {
      // 所有主流浏览器，除了 IE 8 及更早 IE版本
      el.addEventListener.apply(el, [name, handler].concat(args));
    } else if (el.attachEvent) {
      // IE 8 及更早 IE 版本
      el.attachEvent.apply(el, ["on".concat(name), handler].concat(args));
    }
  }
  function offDOM(el, name, handler) {
    for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key7 = 3; _key7 < _len6; _key7++) {
      args[_key7 - 3] = arguments[_key7];
    }

    if (el.removeEventListener) {
      // 所有主流浏览器，除了 IE 8 及更早 IE版本
      el.removeEventListener.apply(el, [name, handler].concat(args));
    } else if (el.detachEvent) {
      // IE 8 及更早 IE 版本
      el.detachEvent.apply(el, ["on".concat(name), handler].concat(args));
    }
  }
  // binarySearch 二分查找

  function binarySearch(arr, callback, start, end, returnNearestIfNoHit) {
    var max = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1000;
    var midNum;
    var mid;

    if (start == null) {
      start = 0;
      end = arr.length - 1;
    }

    var i = 0;
    var r;

    while (start >= 0 && start <= end) {
      if (i >= max) {
        throw Error("binarySearch: loop times is over ".concat(max, ", you can increase the limit."));
      }

      midNum = Math.floor((end - start) / 2 + start);
      mid = arr[midNum];
      r = callback(mid, i);

      if (r > 0) {
        end = midNum - 1;
      } else if (r < 0) {
        start = midNum + 1;
      } else {
        return {
          index: midNum,
          value: mid,
          count: i + 1,
          hit: true
        };
      }

      i++;
    }

    return returnNearestIfNoHit ? {
      index: midNum,
      value: mid,
      count: i + 1,
      hit: false,
      bigger: r > 0
    } : null;
  } //
  var URLHelper =
  /*#__PURE__*/
  function () {
    // protocol, hostname, port, pastname
    function URLHelper(baseUrl) {
      var _this3 = this;

      _classCallCheck(this, URLHelper);

      Object.defineProperty(this, "baseUrl", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: ''
      });
      Object.defineProperty(this, "search", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: {}
      });
      var t = decodeURI(baseUrl).split('?');
      this.baseUrl = t[0];

      if (t[1]) {
        t[1].split('&').forEach(function (v) {
          var t2 = v.split('=');
          _this3.search[t2[0]] = t2[1] == null ? '' : decodeURIComponent(t2[1]);
        });
      }
    }

    _createClass(URLHelper, [{
      key: "getHref",
      value: function getHref() {
        var _this4 = this;

        var t = [this.baseUrl];
        var searchStr = Object.keys(this.search).map(function (k) {
          return "".concat(k, "=").concat(encodeURIComponent(_this4.search[k]));
        }).join('&');

        if (searchStr) {
          t.push(searchStr);
        }

        return t.join('?');
      }
    }]);

    return URLHelper;
  }(); // 解析函数参数, 帮助重载

  var EventProcessor =
  /*#__PURE__*/
  function () {
    function EventProcessor() {
      _classCallCheck(this, EventProcessor);

      Object.defineProperty(this, "eventStore", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: []
      });
    }

    _createClass(EventProcessor, [{
      key: "on",
      value: function on(name, handler) {
        this.eventStore.push({
          name: name,
          handler: handler
        });
      }
    }, {
      key: "once",
      value: function once(name, handler) {
        var _this5 = this;

        var off = function off() {
          _this5.off(name, wrappedHandler);
        };

        var wrappedHandler = function wrappedHandler() {
          handler();
          off();
        };

        this.on(name, wrappedHandler);
        return off;
      }
    }, {
      key: "off",
      value: function off(name, handler) {
        var indexes = []; // to remove indexes; reverse; 倒序的

        var len = this.eventStore.length;

        for (var i = 0; i < len; i++) {
          var item = this.eventStore[i];

          if (item.name === name && item.handler === handler) {
            indexes.unshift(i);
          }
        }

        for (var _i8 = 0; _i8 < indexes.length; _i8++) {
          var index = indexes[_i8];
          this.eventStore.splice(index, 1);
        }
      }
    }, {
      key: "emit",
      value: function emit(name) {
        // 重要: 先找到要执行的项放在新数组里, 因为执行项会改变事件项存储数组
        var items = [];
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = this.eventStore[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var item = _step9.value;

            if (item.name === name) {
              items.push(item);
            }
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
              _iterator9.return();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }

        for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key9 = 1; _key9 < _len8; _key9++) {
          args[_key9 - 1] = arguments[_key9];
        }

        for (var _i9 = 0; _i9 < items.length; _i9++) {
          var _item = items[_i9];

          _item.handler.apply(_item, args);
        }
      }
    }]);

    return EventProcessor;
  }();
  var CrossWindow =
  /*#__PURE__*/
  function (_EventProcessor) {
    _inherits(CrossWindow, _EventProcessor);

    function CrossWindow() {
      var _this6;

      _classCallCheck(this, CrossWindow);

      _this6 = _possibleConstructorReturn(this, (CrossWindow.__proto__ || Object.getPrototypeOf(CrossWindow)).call(this));
      Object.defineProperty(_assertThisInitialized(_this6), "storageName", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: '_crossWindow'
      });
      var cls = CrossWindow;

      if (!cls._listen) {
        cls._listen = true;
        onDOM(window, 'storage', function (ev) {
          if (ev.key === _this6.storageName) {
            var _get2;

            var event = JSON.parse(ev.newValue);

            (_get2 = _get(CrossWindow.prototype.__proto__ || Object.getPrototypeOf(CrossWindow.prototype), "emit", _assertThisInitialized(_this6))).call.apply(_get2, [_this6, event.name].concat(_toConsumableArray(event.args)));
          }
        });
      }

      return _this6;
    }

    _createClass(CrossWindow, [{
      key: "emit",
      value: function emit(name) {
        var _get3;

        for (var _len9 = arguments.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key10 = 1; _key10 < _len9; _key10++) {
          args[_key10 - 1] = arguments[_key10];
        }

        (_get3 = _get(CrossWindow.prototype.__proto__ || Object.getPrototypeOf(CrossWindow.prototype), "emit", this)).call.apply(_get3, [this, name].concat(args));

        glb().localStorage.setItem(this.storageName, JSON.stringify({
          name: name,
          args: args,
          // use random make storage event triggered every time
          // 加入随机保证触发storage事件
          random: Math.random()
        }));
      }
    }]);

    return CrossWindow;
  }(EventProcessor);

  /*!
   * tree-helper v1.0.5
   * phphe <phphe@outlook.com> (https://github.com/phphe)
   * https://github.com/phphe/tree-helper.git
   * Released under the MIT License.
   */

  var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  function _toConsumableArray$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  // 广度优先遍历
  // Breadth-First-Search
  function breadthFirstSearch(obj, handler) {
    var reverse = arguments[3];

    var rootChildren = isArray(obj) ? obj : [obj];
    //
    var stack = rootChildren.map(function (v, i) {
      return { item: v, index: i };
    });
    if (reverse) {
      stack.reverse();
    }

    var _loop = function _loop() {
      var _stack$shift = stack.shift(),
          item = _stack$shift.item,
          index = _stack$shift.index,
          parent = _stack$shift.parent;

      var r = handler(item, index, parent);
      if (r === false) {
        // stop
        return {
          v: void 0
        };
      } else if (r === 'skip children') {
        return 'continue';
      } else if (r === 'skip siblings') {
        stack = stack.filter(function (v) {
          return v.parent !== parent;
        });
      }
      if (item.children) {
        var _stack;

        var children = item.children;
        if (reverse) {
          children = children.slice();
          children.reverse();
        }
        var pushStack = children.map(function (v, i) {
          return { item: v, index: i, parent: item };
        });
        (_stack = stack).push.apply(_stack, _toConsumableArray$1(pushStack));
      }
    };

    while (stack.length) {
      var _ret = _loop();

      switch (_ret) {
        case 'continue':
          continue;

        default:
          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof$1(_ret)) === "object") return _ret.v;
      }
    }
  }

  function _changeParent(item, parent) {
    var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
    var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'parent';

    // remove item from original list
    if (item[parentKey]) {
      arrayRemove(item[parentKey][childrenKey], item);
    }
    item[parentKey] = parent;
  }
  function insertBefore(item, target) {
    var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
    var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'parent';

    if (item === target) {
      return;
    }
    var siblings = target[parentKey][childrenKey];
    var index = siblings.indexOf(target);
    if (siblings[index - 1] !== item) {
      if (item[parentKey] === target[parentKey]) {
        arrayRemove(siblings, item);
        index = siblings.indexOf(target);
      } else {
        _changeParent(item, target[parentKey]);
      }
      siblings.splice(index, 0, item);
    }
  }
  function insertAfter(item, target) {
    var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
    var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'parent';

    if (item === target) {
      return;
    }
    var targetParent = target[parentKey];
    var siblings = targetParent[childrenKey];
    var index = siblings.indexOf(target);
    if (siblings[index + 1] !== item) {
      if (item[parentKey] === target[parentKey]) {
        arrayRemove(siblings, item);
        index = siblings.indexOf(target);
      } else {
        _changeParent(item, target[parentKey]);
      }
      siblings.splice(index + 1, 0, item);
    }
  }
  function prependTo(item, target) {
    var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

    if (item === target) {
      throw 'can\'t prepend to self';
    }
    var targetChildren = target[childrenKey];
    if (targetChildren[0] !== item) {
      _changeParent(item, target);
      targetChildren.splice(0, 0, item);
    }
  }
  function appendTo(item, target) {
    var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

    if (item === target) {
      throw 'can\'t append to self';
    }
    var targetChildren = target[childrenKey];
    var targetChildrenLast = targetChildren[targetChildren.length - 1];
    if (targetChildrenLast !== item) {
      _changeParent(item, target);
      targetChildren.push(item);
    }
  }

  //
  var script = {
    name: 'TreeNode',
    props: {
      data: {},
      store: {},
      level: {
        default: 0
      } // readonly

    },
    data: function data() {
      return {
        vm: this
      };
    },
    computed: {
      childrenLevel: function childrenLevel() {
        return this.level + 1;
      },
      isRoot: function isRoot() {
        return this.data && this.data.isRoot;
      },
      childrenVisible: function childrenVisible() {
        var data = this.data;
        return this.isRoot || data && data.children && data.children.length && data.open;
      },
      innerBackStyle: function innerBackStyle() {
        var r = {
          marginBottom: this.store.space + 'px'
        };

        if (!this.isRoot && this.level > 1) {
          r.paddingLeft = (this.level - 1) * this.store.indent + 'px';
        }

        return r;
      }
    },
    watch: {
      data: {
        immediate: true,
        handler: function handler(data) {
          if (data) {
            data._vm = this;

            if (!data._treeNodePropertiesCompleted && !data.isRoot) {
              this.store.compeleteNode(data, this.$parent.data);
            }
          }
        }
      }
    } // methods: {},
    // created() {},
    // mounted() {},

  };

  /* script */
              const __vue_script__ = script;
              
  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tree-node",class:[_vm.data.active ? _vm.store.activatedClass : '', _vm.data.open ? _vm.store.openedClass : '', _vm.data.class],style:(_vm.data.style),attrs:{"id":_vm.data._id}},[(!_vm.isRoot)?_vm._t("node-inner-back",[_c('div',{staticClass:"tree-node-inner-back",class:[_vm.data.innerBackClass],style:([_vm.innerBackStyle, _vm.data.innerBackStyle])},[_c('div',{staticClass:"tree-node-inner",class:[_vm.data.innerClass],style:([_vm.data.innerStyle])},[_vm._t("default",null,{data:_vm.data,store:_vm.store,vm:_vm.vm})],2)])],{styleObj:_vm.innerBackStyle,data:_vm.data,store:_vm.store,vm:_vm.vm}):_vm._e(),_c('transition',{attrs:{"name":_vm.store.childrenTransitionName}},[(_vm.childrenVisible)?_c('div',{staticClass:"tree-node-children"},_vm._l((_vm.data.children),function(child){return _c('TreeNode',{key:child._id,attrs:{"data":child,"store":_vm.store,"level":_vm.childrenLevel},scopedSlots:_vm._u([{key:"default",fn:function(props){return [_vm._t("default",null,{data:props.data,store:props.store,vm:props.vm})]}},{key:"node-inner-back",fn:function(props){return (_vm.store.customInnerBack)?[_vm._t("node-inner-back",null,{styleObj:props.styleObj,data:props.data,store:props.store,vm:props.vm})]:undefined}}])})}),1):_vm._e()])],2)};
  var __vue_staticRenderFns__ = [];

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* component normalizer */
    function __vue_normalize__(
      template, style, script$$1,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "TreeNode.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var TreeNode = __vue_normalize__(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      undefined,
      undefined
    );

  var script$1 = {
    props: {
      data: {},
      idLength: {
        type: Number,
        default: 5
      },
      indent: {
        type: Number,
        default: 16
      },
      activatedClass: {
        default: 'active'
      },
      openedClass: {
        default: 'open'
      },
      space: {
        type: Number,
        default: 10
      },
      // space between node, unit px
      childrenTransitionName: {},
      // there are issues under draggable tree
      customInnerBack: {}
    },
    components: {
      TreeNode: TreeNode
    },
    data: function data() {
      return {
        store: this,
        rootData: null
      };
    },
    // computed: {},
    watch: {
      data: {
        immediate: true,
        handler: function handler(data, old) {
          var _this = this;

          if (data === old) {
            return;
          } // make rootData always use a same object


          this.rootData = this.rootData || {
            isRoot: true,
            _id: "tree_".concat(this._uid, "_node_root"),
            children: []
          };
          breadthFirstSearch(data, function (node, k, parent) {
            _this.compeleteNode(node, parent);
          });
          this.rootData.children = data;
        }
      }
    },
    methods: {
      compeleteNode: function compeleteNode(node, parent) {
        var compeletedData = {
          open: true,
          children: [],
          active: false,
          style: {},
          class: '',
          innerStyle: {},
          innerClass: '',
          innerBackStyle: {},
          innerBackClass: {}
        };

        for (var key in compeletedData) {
          if (!node.hasOwnProperty(key)) {
            this.$set(node, key, compeletedData[key]);
          }
        }

        this.$set(node, 'parent', parent || this.rootData);

        if (!node.hasOwnProperty('_id')) {
          node._id = "tree_".concat(this._uid, "_node_").concat(strRand(this.idLength));
        }

        node._treeNodePropertiesCompleted = true;
      },
      // pure node self
      pure: function pure(node, withChildren, after) {
        var _this2 = this;

        var t = assign$1({}, node);

        delete t._id;
        delete t.parent;
        delete t.children;
        delete t.open;
        delete t.active;
        delete t.style;
        delete t.class;
        delete t.innerStyle;
        delete t.innerClass;
        delete t.innerBackStyle;
        delete t.innerBackClass;

        var _arr = keys$1(t);

        for (var _i = 0; _i < _arr.length; _i++) {
          var key = _arr[_i];

          if (key[0] === '_') {
            delete t[key];
          }
        }

        if (withChildren && node.children) {
          t.children = node.children.slice();
          t.children.forEach(function (v, k) {
            t.children[k] = _this2.pure(v, withChildren);
          });
        }

        if (after) {
          return after(t, node) || t;
        }

        return t;
      },
      getNodeById: function getNodeById(id) {
        var r;
        breadthFirstSearch(this.rootData.children, function (node) {
          if (node._id === id) {
            r = node;
            return false;
          }
        });
        return r;
      },
      getActivated: function getActivated() {
        var r = [];
        breadthFirstSearch(this.rootData.children, function (node) {
          if (node.active) {
            r.push(node);
          }
        });
        return r;
      },
      getOpened: function getOpened() {
        var r = [];
        breadthFirstSearch(this.rootData.children, function (node) {
          if (node.open) {
            r.push(node);
          }
        });
        return r;
      },
      activeNode: function activeNode(node, inactiveOld) {
        var activated = this.activated;

        if (inactiveOld) {
          this.getActivated().forEach(function (node2) {
            node2.active = false;
          });
        }

        node.active = true;
      },
      toggleActive: function toggleActive(node, inactiveOld) {
        if (node.active) {
          node.active = false;
        } else {
          this.activeNode(node, inactiveOld);
        }
      },
      openNode: function openNode(node, closeOld) {
        var _this3 = this;

        var opened = this.opened;

        if (closeOld) {
          this.getOpened().forEach(function (node2) {
            node2.open = false;

            _this3.$emit('nodeOpenChanged', node2);
          });
        }

        node.open = true;
        this.$emit('nodeOpenChanged', node);
      },
      toggleOpen: function toggleOpen(node, closeOld) {
        if (node.open) {
          node.open = false;
          this.$emit('nodeOpenChanged', node);
        } else {
          this.openNode(node, closeOld);
        }
      },
      getPureData: function getPureData(after) {
        return this.pure(this.rootData, true, after).children;
      },
      deleteNode: function deleteNode(node) {
        return arrayRemove(node.parent.children, node);
      }
    } // created() {},
    // mounted() {},

  };

  /* script */
              const __vue_script__$1 = script$1;
              
  /* template */
  var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"he-tree tree"},[_c('TreeNode',{attrs:{"data":_vm.rootData,"store":_vm.store},scopedSlots:_vm._u([{key:"default",fn:function(props){return [_vm._t("default",null,{data:props.data,store:_vm.store,vm:props.vm})]}},{key:"node-inner-back",fn:function(props){return (_vm.customInnerBack)?[_vm._t("node-inner-back",null,{styleObj:props.styleObj,data:props.data,store:props.store,vm:props.vm})]:undefined}}])})],1)};
  var __vue_staticRenderFns__$1 = [];

    /* style */
    const __vue_inject_styles__$1 = undefined;
    /* scoped */
    const __vue_scope_id__$1 = undefined;
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* component normalizer */
    function __vue_normalize__$1(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Tree.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Tree = __vue_normalize__$1(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      undefined,
      undefined
    );

  // true  -> String#at
  // false -> String#codePointAt
  var _stringAt = function (TO_STRING) {
    return function (that, pos) {
      var s = String(_defined$1(that));
      var i = _toInteger$1(pos);
      var l = s.length;
      var a, b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  var at = _stringAt(true);

   // `AdvanceStringIndex` abstract operation
  // https://tc39.github.io/ecma262/#sec-advancestringindex
  var _advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? at(S, index).length : 1);
  };

  // getting tag from 19.1.3.6 Object.prototype.toString()

  var TAG$1 = _wks('toStringTag');
  // ES3 wrong here
  var ARG = _cof$1(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (e) { /* empty */ }
  };

  var _classof = function (it) {
    var O, T, B;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
      // builtinTag case
      : ARG ? _cof$1(O)
      // ES3 arguments fallback
      : (B = _cof$1(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };

  var builtinExec = RegExp.prototype.exec;

   // `RegExpExec` abstract operation
  // https://tc39.github.io/ecma262/#sec-regexpexec
  var _regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (typeof exec === 'function') {
      var result = exec.call(R, S);
      if (typeof result !== 'object') {
        throw new TypeError('RegExp exec method returned something other than an Object or null');
      }
      return result;
    }
    if (_classof(R) !== 'RegExp') {
      throw new TypeError('RegExp#exec called on incompatible receiver');
    }
    return builtinExec.call(R, S);
  };

  // 21.2.5.3 get RegExp.prototype.flags

  var _flags = function () {
    var that = _anObject$1(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var nativeExec = RegExp.prototype.exec;
  // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.
  var nativeReplace = String.prototype.replace;

  var patchedExec = nativeExec;

  var LAST_INDEX = 'lastIndex';

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/,
        re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
  })();

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

      match = nativeExec.call(re, str);

      if (UPDATES_LAST_INDEX_WRONG && match) {
        re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        // eslint-disable-next-line no-loop-func
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  var _regexpExec = patchedExec;

  _export$1({
    target: 'RegExp',
    proto: true,
    forced: _regexpExec !== /./.exec
  }, {
    exec: _regexpExec
  });

  var SPECIES = _wks('species');

  var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails$1(function () {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    return ''.replace(re, '$<a>') !== '7';
  });

  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
    // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length === 2 && result[0] === 'a' && result[1] === 'b';
  })();

  var _fixReWks = function (KEY, length, exec) {
    var SYMBOL = _wks(KEY);

    var DELEGATES_TO_SYMBOL = !_fails$1(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails$1(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;
      re.exec = function () { execCalled = true; return null; };
      if (KEY === 'split') {
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES] = function () { return re; };
      }
      re[SYMBOL]('');
      return !execCalled;
    }) : undefined;

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
      (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var fns = exec(
        _defined$1,
        SYMBOL,
        ''[KEY],
        function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
          if (regexp.exec === _regexpExec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              // The native String method already delegates to @@method (this
              // polyfilled function), leasing to infinite recursion.
              // We avoid it by directly calling the native @@method method.
              return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
            }
            return { done: true, value: nativeMethod.call(str, regexp, arg2) };
          }
          return { done: false };
        }
      );
      var strfn = fns[0];
      var rxfn = fns[1];

      _redefine(String.prototype, KEY, strfn);
      _hide$1(RegExp.prototype, SYMBOL, length == 2
        // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
        ? function (string, arg) { return rxfn.call(string, this, arg); }
        // 21.2.5.6 RegExp.prototype[@@match](string)
        // 21.2.5.9 RegExp.prototype[@@search](string)
        : function (string) { return rxfn.call(string, this); }
      );
    }
  };

  var max$3 = Math.max;
  var min$5 = Math.min;
  var floor$2 = Math.floor;
  var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // @@replace logic
  _fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
    return [
      // `String.prototype.replace` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = defined(this);
        var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
        return fn !== undefined
          ? fn.call(searchValue, O, replaceValue)
          : $replace.call(String(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
      function (regexp, replaceValue) {
        var res = maybeCallNative($replace, regexp, this, replaceValue);
        if (res.done) return res.value;

        var rx = _anObject$1(regexp);
        var S = String(this);
        var functionalReplace = typeof replaceValue === 'function';
        if (!functionalReplace) replaceValue = String(replaceValue);
        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = _regexpExecAbstract(rx, S);
          if (result === null) break;
          results.push(result);
          if (!global) break;
          var matchStr = String(result[0]);
          if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength$1(rx.lastIndex), fullUnicode);
        }
        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];
          var matched = String(result[0]);
          var position = max$3(min$5(_toInteger$1(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];

      // https://tc39.github.io/ecma262/#sec-getsubstitution
    function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
      if (namedCaptures !== undefined) {
        namedCaptures = _toObject$1(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
      }
      return $replace.call(replacement, symbols, function (match, ch) {
        var capture;
        switch (ch.charAt(0)) {
          case '$': return '$';
          case '&': return matched;
          case '`': return str.slice(0, position);
          case "'": return str.slice(tailPos);
          case '<':
            capture = namedCaptures[ch.slice(1, -1)];
            break;
          default: // \d\d?
            var n = +ch;
            if (n === 0) return ch;
            if (n > m) {
              var f = floor$2(n / 10);
              if (f === 0) return ch;
              if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
              return ch;
            }
            capture = captures[n - 1];
        }
        return capture === undefined ? '' : capture;
      });
    }
  });

  /*!
   * drag-event-service v0.0.6
   * (c) 2018-present phphe <phphe@outlook.com> (https://github.com/phphe)
   * Released under the MIT License.
   */

  // support desktop and mobile
  var events = {
    start: ['mousedown', 'touchstart'],
    move: ['mousemove', 'touchmove'],
    end: ['mouseup', 'touchend']
  };
  var index = {
    isTouch: function isTouch(e) {
      return e.type && e.type.startsWith('touch');
    },
    _getStore: function _getStore(el) {
      if (!el._wrapperStore) {
        el._wrapperStore = [];
      }

      return el._wrapperStore;
    },
    on: function on(el, name, handler) {
      var _hp$onDOM, _hp$onDOM2;

      var store$$1 = this._getStore(el);

      var ts = this;

      var wrapper = function wrapper(e) {
        var mouse;
        var isTouch = ts.isTouch(e);

        if (isTouch) {
          // touch
          mouse = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
          };
        } else {
          // mouse
          mouse = {
            x: e.pageX,
            y: e.pageY
          };

          if (name === 'start' && e.which !== 1) {
            // not left button mousedown
            return;
          }
        }

        return handler.call(this, e, mouse);
      };

      store$$1.push({
        handler: handler,
        wrapper: wrapper
      }); // follow format will cause big bundle size
      // 以下写法将会使打包工具认为hp是上下文, 导致打包整个hp
      // hp.onDOM(el, events[name][0], wrapper, ...args)

      for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        args[_key - 3] = arguments[_key];
      }

      (_hp$onDOM = onDOM).call.apply(_hp$onDOM, [null, el, events[name][0], wrapper].concat(args));

      (_hp$onDOM2 = onDOM).call.apply(_hp$onDOM2, [null, el, events[name][1], wrapper].concat(args));
    },
    off: function off(el, name, handler) {
      var store$$1 = this._getStore(el);

      for (var _len2 = arguments.length, args = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        args[_key2 - 3] = arguments[_key2];
      }

      for (var i = store$$1.length - 1; i >= 0; i--) {
        var _store$i = store$$1[i],
            handler2 = _store$i.handler,
            wrapper = _store$i.wrapper;

        if (handler === handler2) {
          var _hp$offDOM, _hp$offDOM2;

          (_hp$offDOM = offDOM).call.apply(_hp$offDOM, [null, el, events[name][0], wrapper].concat(args));

          (_hp$offDOM2 = offDOM).call.apply(_hp$offDOM2, [null, el, events[name][1], wrapper].concat(args));

          store$$1.splice(i, 1);
        }
      }
    }
  };

  /*!
   * draggable-helper v1.0.20
   * (c) 2018-present phphe <phphe@outlook.com> (https://github.com/phphe)
   * Released under the MIT License.
   */

  /***
  const destroy = draggableHelper(HTMLElement dragHandlerEl, Object opt = {})
  opt.drag(e, opt, store)
  [Object] opt.style || opt.getStyle(opt) set style of moving el style
  [Boolean] opt.clone
  opt.draggingClass, default dragging
  opt.moving(e, opt, store) return false can prevent moving
  opt.drop(e, opt, store)
  opt.getEl(dragHandlerEl, opt) get the el that will be moved. default is dragHandlerEl
  opt.minTranslate default 10, unit px
  add other prop into opt, you get opt in callback
  store{
    el
    initialMouse
    initialPosition
    mouse
    move
    movedCount // start from 0
  }
  e.g.
  draggable(this.$el, {
    vm: this,
    data: this.data,
    drag: (e, opt, store) => {
      dplh.style.height = store.el.querySelector('.TreeNodeSelf').offsetHeight + 'px'
      th.insertAfter(dplh, opt.data)
    },
    moving: (e, opt, store) => {
      hp.arrayRemove(dplh.parent.children, dplh)
    },
    drop: (e, opt, store) => {
      hp.arrayRemove(dplh.parent.children, dplh)
    },
  })
  ***/

  function index$1 (dragHandlerEl) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (opt.minTranslate == null) {
      opt.minTranslate = 10;
    }

    var store$$1 = getPureStore();

    var destroy = function destroy() {
      index.off(dragHandlerEl, 'end', dragHandlerEl._draggbleEventHandler);
      offDOM(dragHandlerEl, 'selectstart', preventSelect);
      delete dragHandlerEl._draggbleEventHandler;
    };

    if (dragHandlerEl._draggbleEventHandler) {
      destroy();
    }

    dragHandlerEl._draggbleEventHandler = start;
    index.on(dragHandlerEl, 'start', dragHandlerEl._draggbleEventHandler);
    onDOM(dragHandlerEl, 'selectstart', preventSelect);
    return destroy;

    function start(e, mouse) {
      // e.stopPropagation()
      store$$1.mouse = {
        x: mouse.x,
        y: mouse.y
      };
      store$$1.initialMouse = Object.assign({}, store$$1.mouse);
      index.on(document, 'move', moving, {
        passive: false
      }); // passive: false is for touchmove event

      index.on(window, 'end', drop);
    }

    function drag(e) {
      var _resolveDragedElAndIn = resolveDragedElAndInitialPosition(),
          el = _resolveDragedElAndIn.el,
          position = _resolveDragedElAndIn.position;

      store$$1.el = el;
      store$$1.initialPosition = Object.assign({}, position);
      var r = opt.drag && opt.drag(e, opt, store$$1);

      if (r === false) {
        return false;
      } // dom actions


      var size = getElSize(el);
      var style = Object.assign({
        width: "".concat(size.width, "px"),
        height: "".concat(size.height, "px"),
        zIndex: 9999,
        opacity: 0.6,
        position: 'absolute',
        left: position.x + 'px',
        top: position.y + 'px'
      }, opt.style || opt.getStyle && opt.getStyle(opt) || {});
      backupAttr(el, 'style');

      for (var key in style) {
        el.style[key] = style[key];
      } // add class


      backupAttr(el, 'class');
      addClass(el, opt.draggingClass);
    }

    function moving(e, mouse) {
      store$$1.mouse = {
        x: mouse.x,
        y: mouse.y
      };
      var move = store$$1.move = {
        x: store$$1.mouse.x - store$$1.initialMouse.x,
        y: store$$1.mouse.y - store$$1.initialMouse.y
      };

      if (store$$1.movedCount === 0 && opt.minTranslate) {
        var x2 = Math.pow(store$$1.move.x, 2);
        var y2 = Math.pow(store$$1.move.y, 2);
        var dtc = Math.pow(x2 + y2, 0.5);

        if (dtc < opt.minTranslate) {
          return;
        }
      }

      var canMove = true;

      if (store$$1.movedCount === 0) {
        if (drag(e) === false) {
          canMove = false;
        }
      } // move started
      // e.preventDefault() to prevent text selection and page scrolling when touch


      e.preventDefault();

      if (canMove && opt.moving) {
        if (opt.moving(e, opt, store$$1) === false) {
          canMove = false;
        }
      }

      if (canMove) {
        if (!store$$1 || !store$$1.el) {
          return;
        }

        Object.assign(store$$1.el.style, {
          left: store$$1.initialPosition.x + move.x + 'px',
          top: store$$1.initialPosition.y + move.y + 'px'
        });
        store$$1.movedCount++;
      }
    }

    function drop(e) {
      index.off(document, 'move', moving, {
        passive: false
      });
      index.off(window, 'end', drop); // drag executed if movedCount > 0

      if (store$$1.movedCount > 0) {
        store$$1.movedCount = 0;
        var _store = store$$1,
            el = _store.el;

        if (opt.clone) {
          el.parentElement.removeChild(el);
        } else {
          restoreAttr(el, 'style');
          restoreAttr(el, 'class');
        }

        opt.drop && opt.drop(e, opt, store$$1);
      }

      store$$1 = getPureStore();
    }

    function resolveDragedElAndInitialPosition() {
      var el0 = opt.getEl ? opt.getEl(dragHandlerEl, opt) : dragHandlerEl;
      var el = el0;

      if (opt.clone) {
        store$$1.triggerEl = el0;
        el = el0.cloneNode(true);
        el0.parentElement.appendChild(el);
      }

      return {
        position: getPosition(el),
        el: el
      };
    }

    function getPureStore() {
      return {
        movedCount: 0
      };
    }

    function preventSelect(e) {
      e.preventDefault();
    }
  }

  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
  _export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

  var $Object = _core.Object;
  var defineProperty = function defineProperty(it, key, desc) {
    return $Object.defineProperty(it, key, desc);
  };

  var defineProperty$1 = defineProperty;

  var dP$3 = _objectDp$1.f;
  var FProto = Function.prototype;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME$1 = 'name';

  // 19.2.4.2 name
  NAME$1 in FProto || _descriptors$1 && dP$3(FProto, NAME$1, {
    configurable: true,
    get: function () {
      try {
        return ('' + this).match(nameRE)[1];
      } catch (e) {
        return '';
      }
    }
  });

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      defineProperty$1(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      defineProperty$1(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var Cache =
  /*#__PURE__*/
  function () {
    function Cache() {
      _classCallCheck$1(this, Cache);

      _defineProperty(this, "store", {});
    }

    _createClass$1(Cache, [{
      key: "has",
      value: function has(name) {
        return this.store.hasOwnProperty(name);
      }
    }, {
      key: "remember",
      value: function remember(name, getter) {
        if (!this.has(name)) {
          this.store[name] = {
            value: getter()
          };
        }

        return this.store[name].value;
      }
    }, {
      key: "forget",
      value: function forget(name) {
        if (name) {
          if (this.has(name)) {
            delete this.store[name];
          }
        } else {
          this.store = {};
        }
      }
    }]);

    return Cache;
  }();
  function attachCache(obj, cache, toCache) {
    var _loop = function _loop(key) {
      defineProperty$1(obj, key, {
        get: function get() {
          var _this = this;

          return cache.remember(key, function () {
            return toCache[key].call(_this);
          });
        }
      });
    };

    for (var key in toCache) {
      _loop(key);
    }
  }

  /*!
   * vue-functions v1.0.3
   * (c) 2019-present phphe <phphe@outlook.com> (https://github.com/phphe)
   * Released under the MIT License.
   */
  function isPropTrue(value) {
    return value === '' || value;
  } // the dependences in getter can't be auto resolved. must use exec to include dependences

  var _iterStep$1 = function (done, value) {
    return { value: value, done: !!done };
  };

  var _iterators$1 = {};

  var _redefine$1 = _hide;

  var _objectDps$1 = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    _anObject(O);
    var keys = _objectKeys(Properties);
    var length = keys.length;
    var i = 0;
    var P;
    while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
    return O;
  };

  var document$4 = _global.document;
  var _html$1 = document$4 && document$4.documentElement;

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



  var IE_PROTO$4 = _sharedKey('IE_PROTO');
  var Empty$1 = function () { /* empty */ };
  var PROTOTYPE$3 = 'prototype';

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict$1 = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = _domCreate('iframe');
    var i = _enumBugKeys.length;
    var lt = '<';
    var gt = '>';
    var iframeDocument;
    iframe.style.display = 'none';
    _html$1.appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
    iframeDocument.close();
    createDict$1 = iframeDocument.F;
    while (i--) delete createDict$1[PROTOTYPE$3][_enumBugKeys[i]];
    return createDict$1();
  };

  var _objectCreate$1 = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty$1[PROTOTYPE$3] = _anObject(O);
      result = new Empty$1();
      Empty$1[PROTOTYPE$3] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$4] = O;
    } else result = createDict$1();
    return Properties === undefined ? result : _objectDps$1(result, Properties);
  };

  var _wks$1 = createCommonjsModule(function (module) {
  var store = _shared('wks');

  var Symbol = _global.Symbol;
  var USE_SYMBOL = typeof Symbol == 'function';

  var $exports = module.exports = function (name) {
    return store[name] || (store[name] =
      USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
  };

  $exports.store = store;
  });

  var def$1 = _objectDp.f;

  var TAG$2 = _wks$1('toStringTag');

  var _setToStringTag$1 = function (it, tag, stat) {
    if (it && !_has(it = stat ? it : it.prototype, TAG$2)) def$1(it, TAG$2, { configurable: true, value: tag });
  };

  var IteratorPrototype$1 = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _hide(IteratorPrototype$1, _wks$1('iterator'), function () { return this; });

  var _iterCreate$1 = function (Constructor, NAME, next) {
    Constructor.prototype = _objectCreate$1(IteratorPrototype$1, { next: _propertyDesc(1, next) });
    _setToStringTag$1(Constructor, NAME + ' Iterator');
  };

  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


  var IE_PROTO$5 = _sharedKey('IE_PROTO');
  var ObjectProto$1 = Object.prototype;

  var _objectGpo$1 = Object.getPrototypeOf || function (O) {
    O = _toObject(O);
    if (_has(O, IE_PROTO$5)) return O[IE_PROTO$5];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto$1 : null;
  };

  var ITERATOR$2 = _wks$1('iterator');
  var BUGGY$1 = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
  var FF_ITERATOR$1 = '@@iterator';
  var KEYS$1 = 'keys';
  var VALUES$1 = 'values';

  var returnThis$1 = function () { return this; };

  var _iterDefine$1 = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    _iterCreate$1(Constructor, NAME, next);
    var getMethod = function (kind) {
      if (!BUGGY$1 && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS$1: return function keys() { return new Constructor(this, kind); };
        case VALUES$1: return function values() { return new Constructor(this, kind); };
      } return function entries() { return new Constructor(this, kind); };
    };
    var TAG = NAME + ' Iterator';
    var DEF_VALUES = DEFAULT == VALUES$1;
    var VALUES_BUG = false;
    var proto = Base.prototype;
    var $native = proto[ITERATOR$2] || proto[FF_ITERATOR$1] || DEFAULT && proto[DEFAULT];
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
    var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype;
    // Fix native
    if ($anyNative) {
      IteratorPrototype = _objectGpo$1($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        _setToStringTag$1(IteratorPrototype, TAG, true);
        // fix for some old engines
        if (!_library && typeof IteratorPrototype[ITERATOR$2] != 'function') _hide(IteratorPrototype, ITERATOR$2, returnThis$1);
      }
    }
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native && $native.name !== VALUES$1) {
      VALUES_BUG = true;
      $default = function values() { return $native.call(this); };
    }
    // Define iterator
    if ((!_library || FORCED) && (BUGGY$1 || VALUES_BUG || !proto[ITERATOR$2])) {
      _hide(proto, ITERATOR$2, $default);
    }
    // Plug for library
    _iterators$1[NAME] = $default;
    _iterators$1[TAG] = returnThis$1;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES$1),
        keys: IS_SET ? $default : getMethod(KEYS$1),
        entries: $entries
      };
      if (FORCED) for (key in methods) {
        if (!(key in proto)) _redefine$1(proto, key, methods[key]);
      } else _export(_export.P + _export.F * (BUGGY$1 || VALUES_BUG), NAME, methods);
    }
    return methods;
  };

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  var es6_array_iterator$1 = _iterDefine$1(Array, 'Array', function (iterated, kind) {
    this._t = _toIobject(iterated); // target
    this._i = 0;                   // next index
    this._k = kind;                // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var kind = this._k;
    var index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return _iterStep$1(1);
    }
    if (kind == 'keys') return _iterStep$1(0, index);
    if (kind == 'values') return _iterStep$1(0, O[index]);
    return _iterStep$1(0, [index, O[index]]);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  _iterators$1.Arguments = _iterators$1.Array;

  var TO_STRING_TAG$1 = _wks$1('toStringTag');

  var DOMIterables$1 = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
    'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
    'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
    'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
    'TextTrackList,TouchList').split(',');

  for (var i$1 = 0; i$1 < DOMIterables$1.length; i$1++) {
    var NAME$2 = DOMIterables$1[i$1];
    var Collection$1 = _global[NAME$2];
    var proto$2 = Collection$1 && Collection$1.prototype;
    if (proto$2 && !proto$2[TO_STRING_TAG$1]) _hide(proto$2, TO_STRING_TAG$1, NAME$2);
    _iterators$1[NAME$2] = _iterators$1.Array;
  }

  // true  -> String#at
  // false -> String#codePointAt
  var _stringAt$1 = function (TO_STRING) {
    return function (that, pos) {
      var s = String(_defined(that));
      var i = _toInteger(pos);
      var l = s.length;
      var a, b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  var $at = _stringAt$1(true);

  // 21.1.3.27 String.prototype[@@iterator]()
  _iterDefine$1(String, 'String', function (iterated) {
    this._t = String(iterated); // target
    this._i = 0;                // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var index = this._i;
    var point;
    if (index >= O.length) return { value: undefined, done: true };
    point = $at(O, index);
    this._i += point.length;
    return { value: point, done: false };
  });

  // getting tag from 19.1.3.6 Object.prototype.toString()

  var TAG$3 = _wks$1('toStringTag');
  // ES3 wrong here
  var ARG$1 = _cof(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet$1 = function (it, key) {
    try {
      return it[key];
    } catch (e) { /* empty */ }
  };

  var _classof$1 = function (it) {
    var O, T, B;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (T = tryGet$1(O = Object(it), TAG$3)) == 'string' ? T
      // builtinTag case
      : ARG$1 ? _cof(O)
      // ES3 arguments fallback
      : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };

  var ITERATOR$3 = _wks$1('iterator');

  var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$3]
      || it['@@iterator']
      || _iterators$1[_classof$1(it)];
  };

  var core_getIterator = _core.getIterator = function (it) {
    var iterFn = core_getIteratorMethod(it);
    if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
    return _anObject(iterFn.call(it));
  };

  var getIterator = core_getIterator;

  var getIterator$1 = getIterator;

  // 7.2.2 IsArray(argument)

  var _isArray = Array.isArray || function isArray(arg) {
    return _cof$1(arg) == 'Array';
  };

  var SPECIES$1 = _wks('species');

  var _arraySpeciesConstructor = function (original) {
    var C;
    if (_isArray(original)) {
      C = original.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
      if (_isObject$1(C)) {
        C = C[SPECIES$1];
        if (C === null) C = undefined;
      }
    } return C === undefined ? Array : C;
  };

  // 9.4.2.3 ArraySpeciesCreate(originalArray, length)


  var _arraySpeciesCreate = function (original, length) {
    return new (_arraySpeciesConstructor(original))(length);
  };

  // 0 -> Array#forEach
  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex





  var _arrayMethods = function (TYPE, $create) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    var create = $create || _arraySpeciesCreate;
    return function ($this, callbackfn, that) {
      var O = _toObject$1($this);
      var self = _iobject$1(O);
      var f = _ctx$1(callbackfn, that, 3);
      var length = _toLength$1(self.length);
      var index = 0;
      var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var val, res;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        val = self[index];
        res = f(val, index, O);
        if (TYPE) {
          if (IS_MAP) result[index] = res;   // map
          else if (res) switch (TYPE) {
            case 3: return true;             // some
            case 5: return val;              // find
            case 6: return index;            // findIndex
            case 2: result.push(val);        // filter
          } else if (IS_EVERY) return false; // every
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };

  // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

  var $find = _arrayMethods(5);
  var KEY = 'find';
  var forced = true;
  // Shouldn't skip holes
  if (KEY in []) Array(1)[KEY](function () { forced = false; });
  _export$1(_export$1.P + _export$1.F * forced, 'Array', {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });
  _addToUnscopables(KEY);

  // from https://gist.github.com/iddan/54d5d9e58311b0495a91bf06de661380

  if (!document.elementsFromPoint) {
    document.elementsFromPoint = elementsFromPoint;
  }

  function elementsFromPoint(x, y) {
    var parents = [];
    var parent = void 0;

    do {
      if (parent !== document.elementFromPoint(x, y)) {
        parent = document.elementFromPoint(x, y);
        parents.push(parent);
        parent.style.pointerEvents = 'none';
      } else {
        parent = false;
      }
    } while (parent);

    parents.forEach(function (parent) {
      return parent.style.pointerEvents = 'all';
    });
    return parents;
  }

  function getTreeByPoint(x, y, trees) {
    var els = document.elementsFromPoint(x, y);
    var treeEl;
    var nodeEl;
    var betweenEls = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = getIterator$1(els), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _el = _step.value;

        if (!nodeEl) {
          if (hasClass(_el, 'tree-node')) {
            nodeEl = _el;
          }
        } else {
          // console.log(el);
          if (hasClass(_el, 'tree')) {
            treeEl = _el;
            break;
          }

          betweenEls.push(_el);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (treeEl) {
      // is target tree is another tree, and be covered by other element, like modal, popup
      var covered = false;

      if (!isParent(nodeEl, treeEl)) {
        // cross tree
        for (var _i = 0; _i < betweenEls.length; _i++) {
          var el = betweenEls[_i];

          if (!isParent(el, treeEl)) {
            covered = true;
            break;
          }
        }
      } //


      if (!covered) {
        return trees.find(function (v) {
          return v.$el === treeEl;
        });
      }
    }
  }

  function isParent(child, parent) {
    var cur = child;

    while (cur) {
      cur = cur.parentNode;

      if (cur === parent) {
        return true;
      }
    }
  }

  // 对 drag placeholder进行的操作

  var targets = {
    'nothing': function nothing(info) {},
    'after': function after(info) {
      insertDplhAfterTo(info.dplh, info.targetNode, info);
    },
    'before': function before(info) {
      if (isNodeDroppable(info.targetNode.parent)) {
        insertBefore(info.dplh, info.targetNode);
      } else {
        insertDplhAfterTo(info.dplh, info.targetNode.parent, info);
      }
    },
    'append': function append(info) {
      if (isNodeDroppable(info.targetNode)) {
        appendTo(info.dplh, info.targetNode);
        if (!info.targetNode.open) info.store.toggleOpen(info.targetNode);
      } else {
        insertDplhAfterTo(info.dplh, info.targetNode, info);
      }
    },
    'prepend': function prepend(info) {
      if (isNodeDroppable(info.targetNode)) {
        prependTo(info.dplh, info.targetNode);
        if (!info.targetNode.open) info.store.toggleOpen(info.targetNode);
      } else {
        insertDplhAfterTo(info.dplh, info.targetNode, info);
      }
    },
    'after target parent': function afterTargetParent(info) {
      insertDplhAfterTo(info.dplh, info.targetNode.parent, info);
    },
    // append to prev sibling
    'append prev': function appendPrev(info) {
      if (isNodeDroppable(info.targetPrev)) {
        appendTo(info.dplh, info.targetPrev);
        if (!info.targetPrev.open) info.store.toggleOpen(info.targetPrev);
      } else {
        insertDplhAfterTo(info.dplh, info.targetPrev, info);
      }
    },
    // append to current tree
    'append current tree': function appendCurrentTree(info) {
      if (isNodeDroppable(info.currentTree.rootData)) {
        appendTo(info.dplh, info.currentTree.rootData);
      }
    }
  };

  function insertDplhAfterTo(dplh, targetNode, info) {
    if (!targetNode) {
      return false;
    } else {
      var closest = findParent$1(targetNode, function (node) {
        return node.parent && isNodeDroppable(node.parent);
      });

      if (closest) {
        insertAfter(dplh, closest);
      } else {
        return false;
      }
    }

    return true;
  }

  function isNodeDraggable(node) {
    if (!draggableIds.hasOwnProperty(node._id)) {
      var r;

      if (node.hasOwnProperty('draggable')) {
        r = node.draggable;
      } else if (node.parent) {
        r = isNodeDraggable(node.parent);
      } else {
        r = true;
      }

      draggableIds[node._id] = r;
    }

    return draggableIds[node._id];
  }
  function isNodeDroppable(node) {
    if (!droppableIds.hasOwnProperty(node._id)) {
      var r;

      if (node.hasOwnProperty('droppable')) {
        r = node.droppable;
      } else if (node.parent) {
        r = isNodeDroppable(node.parent);
      } else {
        r = true;
      }

      droppableIds[node._id] = r;
    }

    return droppableIds[node._id];
  } // find child, excluding dragging node default

  function findChild(info, children, handler, reverse) {
    var len = children.length;

    if (reverse) {
      for (var i = len - 1; i >= 0; i--) {
        var item = children[i]; // excluding dragging node

        if (item !== info.node) {
          if (handler(item, i)) {
            return item;
          }
        }
      }
    } else {
      for (var _i = 0; _i < len; _i++) {
        var _item = children[_i]; // excluding dragging node

        if (_item !== info.node) {
          if (handler(_item, _i)) {
            return _item;
          }
        }
      }
    }
  } // start from node self


  function findParent$1(node, handle) {
    var current = node;

    while (current) {
      if (handle(current)) {
        return current;
      }

      current = current.parent;
    }
  }

  var rules = {
    // 另一节点存在
    'targetNode existed': function targetNodeExisted(info) {
      return info.targetNode;
    },
    // 另一节点是拖动占位节点
    'targetNode is placeholder': function targetNodeIsPlaceholder(info) {
      return info.targetNode.isDragPlaceHolder;
    },
    // 另一节点在最上面
    'targetNode at top': function targetNodeAtTop(info) {
      return info.targetAtTop;
    },
    // 另一节点在最下面
    'targetNode at bottom': function targetNodeAtBottom(info) {
      return info.targetAtBottom;
    },
    // 另一节点是根节点第二个子
    'targetNode is the second child of root': function targetNodeIsTheSecondChildOfRoot(info) {
      return info.currentTreeRootSecondChildExcludingDragging === info.targetNode;
    },
    // 拖动点坐标在任一树中, 同时, 起始树要可拖出, 当前树要可拖入
    'currentTree existed': function currentTreeExisted(info) {
      return info.currentTree;
    },
    // 当前树为空(不包括占位节点)
    'currentTree empty': function currentTreeEmpty(info) {
      return !findChild(info, info.currentTree.rootData.children, function (v) {
        return v;
      });
    },
    // 占位节点存在
    'placeholder existed': function placeholderExisted(info) {
      return info.dplhEl;
    },
    // 占位节点在当前树中
    'placeholder in currentTree': function placeholderInCurrentTree(info) {
      return info.dplhElInCurrentTree;
    },
    // 占位节点在最上面
    'placeholder at top': function placeholderAtTop(info) {
      return info.dplhAtTop;
    },
    // 另一节点是打开的
    'targetNode is open': function targetNodeIsOpen(info) {
      return info.targetNode.open;
    },
    // 另一节点有子(不包括占位节点)
    'targetNode has children excluding placeholder': function targetNodeHasChildrenExcludingPlaceholder(info) {
      return findChild(info, info.targetNode.children, function (v) {
        return v !== info.dplh;
      });
    },
    // 另一节点是第一个节点
    'targetNode is 1st child': function targetNodeIs1stChild(info) {
      return findChild(info, info.targetNode.parent.children, function (v) {
        return v;
      }) === info.targetNode;
    },
    // 另一节点是最后节点
    'targetNode is last child': function targetNodeIsLastChild(info) {
      return findChild(info, info.targetNode.parent.children, function (v) {
        return v;
      }, true) === info.targetNode;
    },
    // 当前位置在另一节点inner垂直中线上
    'on targetNode middle': function onTargetNodeMiddle(info) {
      return info.offset.y <= info.tiMiddleY;
    },
    // 当前位置在另一节点inner左边
    'at left': function atLeft(info) {
      return info.offset.x < info.tiOffset.x;
    },
    // 当前位置在另一节点innner indent位置右边
    'at indent right': function atIndentRight(info) {
      return info.offset.x > info.tiOffset.x + info.currentTree.indent;
    } // convert rule output to Boolean

  };

  var _arr = keys$1(rules);

  var _loop$1 = function _loop() {
    var key = _arr[_i2];
    var old = rules[key];

    rules[key] = function () {
      return Boolean(old.apply(void 0, arguments));
    };
  };

  for (var _i2 = 0; _i2 < _arr.length; _i2++) {
    _loop$1();
  }

  var prevTree;
  var droppableIds = {};
  var draggableIds = {}; // context is vm

  function autoMoveDragPlaceHolder(draggableHelperInfo) {
    var trees = this.store.trees;
    var dhStore = draggableHelperInfo.store; // make info

    var info = {
      event: draggableHelperInfo.event,
      el: dhStore.el,
      vm: this,
      node: this.data,
      store: this.store,
      dplh: this.store.dplh,
      draggableHelperData: {
        opt: draggableHelperInfo.options,
        store: dhStore
      } //

    };
    attachCache(info, new Cache(), {
      // dragging node coordinate
      // 拖动中的节点相关坐标
      nodeInnerEl: function nodeInnerEl() {
        return this.el.querySelector('.tree-node-inner');
      },
      offset: function offset() {
        return getOffset(this.nodeInnerEl);
      },
      // left top point
      offset2: function offset2() {
        return {
          x: this.offset.x + this.nodeInnerEl.offsetWidth,
          y: this.offset.y + this.nodeInnerEl.offsetHeight
        };
      },
      // right bottom point
      offsetToViewPort: function offsetToViewPort() {
        var r = this.nodeInnerEl.getBoundingClientRect();
        r.x = r.left;
        r.y = r.top;
        return r;
      },
      // tree
      currentTree: function currentTree() {
        // const currentTree = trees.find(tree => hp.isOffsetInEl(this.offset.x, this.offset.y, tree.$el))
        var currentTree = getTreeByPoint(this.offsetToViewPort.x, this.offsetToViewPort.y, trees);

        if (currentTree) {
          var dragStartTree = this.store;

          if (prevTree == null) {
            prevTree = dragStartTree;
          }

          if (prevTree !== currentTree) {
            if (!isPropTrue(dragStartTree.crossTree) || !isPropTrue(currentTree.crossTree)) {
              return;
            }

            prevTree = currentTree;
          }

          if (!isPropTrue(currentTree.droppable)) {
            return;
          }

          return currentTree;
        }
      },
      currentTreeRootEl: function currentTreeRootEl() {
        return document.getElementById(this.currentTree.rootData._id);
      },
      currentTreeRootOf4: function currentTreeRootOf4() {
        return getOf4(this.currentTreeRootEl, this.currentTree.space);
      },
      // the second child of currentTree root, excluding dragging node
      currentTreeRootSecondChildExcludingDragging: function currentTreeRootSecondChildExcludingDragging() {
        var _this = this;

        return this.currentTree.rootData.children.slice(0, 3).filter(function (v) {
          return v !== _this.node;
        })[1];
      },
      // placeholder
      dplhEl: function dplhEl() {
        return document.getElementById(this.dplh._id);
      },
      dplhElInCurrentTree: function dplhElInCurrentTree() {
        return Boolean(this.currentTree.$el.querySelector("#".concat(this.dplh._id)));
      },
      dplhOf4: function dplhOf4() {
        return getOf4(this.dplhEl, this.currentTree.space);
      },
      dplhAtTop: function dplhAtTop() {
        return Math.abs(this.dplhOf4.y - this.currentTreeRootOf4.y) < 5;
      },
      targetAtTop: function targetAtTop() {
        return Math.abs(this.tiOf4.y - this.currentTreeRootOf4.y) < 5;
      },
      targetAtBottom: function targetAtBottom() {
        return Math.abs(this.tiOf4.y2 - this.currentTreeRootOf4.y2) < 5;
      },
      // most related node
      // 最相关的另一个节点
      targetNode: function targetNode() {
        var currentTree = this.currentTree;

        if (!currentTree) {
          throw 'no currentTree';
        } //


        var _this$offset = this.offset,
            x = _this$offset.x,
            y = _this$offset.y;
        var currentNode = currentTree.rootData;

        while (true) {
          var children = currentNode.children;

          if (!children) {
            break;
          }

          if (this.node.parent === currentNode) {
            // dragging node is in currentNode children, remove it first
            children = children.slice();
            children.splice(children.indexOf(this.node), 1);
          }

          if (children.length === 0) {
            break;
          }

          var t = binarySearch(children, function (node) {
            var el = document.getElementById(node._id);
            var ty = getOffset(el).y;
            var ty2 = ty + el.offsetHeight + currentTree.space;

            if (ty2 < y) {
              return -1;
            } else if (ty <= y) {
              return 0;
            } else {
              return 1;
            }
          }, null, null, true);

          if (t.hit) {
            currentNode = t.value;
          } else {
            if (t.bigger) {
              currentNode = children[t.index - 1];
            } else {
              currentNode = t.value;
            }
          }

          if (!currentNode) {
            currentNode = children[0];
            break;
          }

          if (!currentNode) {
            break;
          }

          var innerEl = document.getElementById(currentNode._id).querySelector('.tree-node-inner');
          var of = getOf4(innerEl, currentTree.space);

          if (of.y <= y && y <= of.y2) {
            break;
          }
        }

        return currentNode;
      },
      targetNodeEl: function targetNodeEl() {
        return document.getElementById(this.targetNode._id);
      },
      // targetNodeInnerElOffset
      tiInnerEl: function tiInnerEl() {
        return this.targetNodeEl.querySelector('.tree-node-inner');
      },
      tiOffset: function tiOffset() {
        return getOffset(this.tiInnerEl);
      },
      tiOf4: function tiOf4() {
        return getOf4(this.tiInnerEl, this.currentTree.space);
      },
      tiMiddleY: function tiMiddleY() {
        return this.tiOffset.y + this.tiInnerEl.offsetHeight / 2;
      },
      //
      targetPrevEl: function targetPrevEl() {
        // tree node 之间不要有其他元素, 否则这里会获取到错误的元素
        var r = this.targetNodeEl.previousSibling;

        if (hasClass(r, 'dragging')) {
          r = r.previousSibling;
        }

        return r;
      },
      targetPrev: function targetPrev() {
        var id = this.targetPrevEl.getAttribute('id');
        return this.currentTree.getNodeById(id);
      }
    }); // attachCache end
    // decision start =================================

    var executedRuleCache = {}; // exec rule

    var exec = function exec(ruleId) {
      if (!executedRuleCache.hasOwnProperty(ruleId)) {
        var r;

        try {
          r = rules[ruleId](info);
        } catch (e) {
          r = e;

          try {
            if (process.env.DEVELOPE_SELF) {
              // only visible when develop its self
              console.warn("failed to execute rule '".concat(ruleId, "'"), e);
            }
          } catch (e2) {}
        }

        executedRuleCache[ruleId] = r;
      }

      return executedRuleCache[ruleId];
    };

    if (exec('currentTree existed') === true) {
      if (exec('targetNode is placeholder') === false) {
        if (exec('targetNode is the second child of root') === true) {
          if (exec('targetNode has children excluding placeholder') === false) {
            if (exec('on targetNode middle') === true) {
              targets['before'](info);
            } else if (exec('on targetNode middle') === false) {
              if (exec('at indent right') === true) {
                targets['append'](info);
              } else if (exec('at indent right') === false) {
                targets['after'](info);
              }
            }
          } else if (exec('targetNode has children excluding placeholder') === true) {
            targets['prepend'](info);
          }
        } else if (exec('targetNode is the second child of root') === false) {
          if (exec('currentTree empty') === false) {
            if (exec('targetNode at top') === true) {
              if (exec('placeholder in currentTree') === true) {
                if (exec('targetNode has children excluding placeholder') === false) {
                  if (exec('on targetNode middle') === false) {
                    if (exec('at indent right') === false) {
                      targets['after'](info);
                    } else if (exec('at indent right') === true) {
                      targets['append'](info);
                    }
                  } else if (exec('on targetNode middle') === true) {
                    targets['before'](info);
                  }
                } else if (exec('targetNode has children excluding placeholder') === true) {
                  if (exec('on targetNode middle') === false) {
                    targets['prepend'](info);
                  } else if (exec('on targetNode middle') === true) {
                    targets['before'](info);
                  }
                }
              } else if (exec('placeholder in currentTree') === false) {
                targets['before'](info);
              }
            } else if (exec('targetNode at top') === false) {
              if (exec('targetNode at bottom') === false) {
                if (exec('placeholder at top') === true) {
                  targets['prepend'](info);
                } else if (exec('placeholder at top') === false) {
                  if (exec('targetNode has children excluding placeholder') === true) {
                    targets['prepend'](info);
                  } else if (exec('targetNode has children excluding placeholder') === false) {
                    if (exec('targetNode is 1st child') === false) {
                      if (exec('targetNode is last child') === false) {
                        if (exec('on targetNode middle') === true) {
                          if (exec('at indent right') === true) {
                            targets['append'](info);
                          } else if (exec('at indent right') === false) {
                            targets['after'](info);
                          }
                        } else if (exec('on targetNode middle') === false) {
                          if (exec('at indent right') === true) {
                            targets['append'](info);
                          } else if (exec('at indent right') === false) {
                            targets['after'](info);
                          }
                        }
                      } else if (exec('targetNode is last child') === true) {
                        if (exec('at indent right') === true) {
                          targets['append'](info);
                        } else if (exec('at indent right') === false) {
                          targets['after'](info);
                        }
                      }
                    } else if (exec('targetNode is 1st child') === true) {
                      if (exec('targetNode is last child') === true) {
                        targets['append'](info);
                      } else if (exec('targetNode is last child') === false) {
                        if (exec('on targetNode middle') === false) {
                          if (exec('at indent right') === false) {
                            targets['after'](info);
                          } else if (exec('at indent right') === true) {
                            targets['append'](info);
                          }
                        } else if (exec('on targetNode middle') === true) {
                          if (exec('at indent right') === false) {
                            targets['after'](info);
                          } else if (exec('at indent right') === true) {
                            targets['append'](info);
                          }
                        }
                      }
                    }
                  }
                }
              } else if (exec('targetNode at bottom') === true) {
                if (exec('placeholder in currentTree') === true) {
                  if (exec('on targetNode middle') === false) {
                    if (exec('at indent right') === true) {
                      targets['append'](info);
                    } else if (exec('at indent right') === false) {
                      targets['after'](info);
                    }
                  } else if (exec('on targetNode middle') === true) {
                    targets['append'](info);
                  }
                } else if (exec('placeholder in currentTree') === false) {
                  targets['append'](info);
                }
              }
            }
          } else if (exec('currentTree empty') === true) {
            targets['append current tree'](info);
          }
        }
      } else if (exec('targetNode is placeholder') === true) {
        if (exec('targetNode at bottom') === false) {
          if (exec('targetNode is the second child of root') === false) {
            if (exec('targetNode is 1st child') === true) {
              if (exec('targetNode is last child') === false) ; else if (exec('targetNode is last child') === true) {
                if (exec('on targetNode middle') === false) {
                  if (exec('at left') === true) {
                    targets['after target parent'](info);
                  } else if (exec('at left') === false) ;
                } else if (exec('on targetNode middle') === true) {
                  if (exec('at left') === true) {
                    targets['after target parent'](info);
                  } else if (exec('at left') === false) ;
                }
              }
            } else if (exec('targetNode is 1st child') === false) {
              if (exec('targetNode is last child') === true) {
                if (exec('on targetNode middle') === true) {
                  if (exec('at left') === true) {
                    targets['after target parent'](info);
                  } else if (exec('at left') === false) {
                    if (exec('at indent right') === true) {
                      targets['append prev'](info);
                    } else if (exec('at indent right') === false) ;
                  }
                } else if (exec('on targetNode middle') === false) {
                  if (exec('at left') === true) {
                    targets['after target parent'](info);
                  } else if (exec('at left') === false) {
                    if (exec('at indent right') === true) {
                      targets['append prev'](info);
                    } else if (exec('at indent right') === false) ;
                  }
                }
              } else if (exec('targetNode is last child') === false) {
                if (exec('on targetNode middle') === true) {
                  if (exec('at left') === true) ; else if (exec('at left') === false) {
                    if (exec('at indent right') === true) {
                      targets['append prev'](info);
                    } else if (exec('at indent right') === false) ;
                  }
                } else if (exec('on targetNode middle') === false) {
                  if (exec('at left') === true) ; else if (exec('at left') === false) {
                    if (exec('at indent right') === true) {
                      targets['append prev'](info);
                    } else if (exec('at indent right') === false) ;
                  }
                }
              }
            }
          } else if (exec('targetNode is the second child of root') === true) {
            if (exec('on targetNode middle') === true) {
              if (exec('at indent right') === true) {
                targets['append prev'](info);
              } else if (exec('at indent right') === false) ;
            } else if (exec('on targetNode middle') === false) {
              if (exec('at indent right') === true) {
                targets['append prev'](info);
              } else if (exec('at indent right') === false) ;
            }
          }
        } else if (exec('targetNode at bottom') === true) {
          if (exec('targetNode is 1st child') === true) {
            if (exec('on targetNode middle') === false) {
              if (exec('at left') === true) {
                targets['after target parent'](info);
              } else if (exec('at left') === false) ;
            } else if (exec('on targetNode middle') === true) {
              if (exec('at left') === false) ; else if (exec('at left') === true) {
                targets['after target parent'](info);
              }
            }
          } else if (exec('targetNode is 1st child') === false) {
            if (exec('on targetNode middle') === false) {
              if (exec('at left') === true) {
                targets['after target parent'](info);
              } else if (exec('at left') === false) {
                if (exec('at indent right') === true) {
                  targets['append prev'](info);
                } else if (exec('at indent right') === false) ;
              }
            } else if (exec('on targetNode middle') === true) {
              if (exec('at left') === true) {
                targets['after target parent'](info);
              } else if (exec('at left') === false) {
                if (exec('at indent right') === true) {
                  targets['append prev'](info);
                } else if (exec('at indent right') === false) ;
              }
            }
          }
        }
      }
    } else if (exec('currentTree existed') === false) ; // decision end =================================
    //

  }

  function getOf4(el, space) {
    var r = getOffset(el);
    r.x2 = r.x + el.offsetWidth;
    r.y2 = r.y + el.offsetHeight + space;
    return r;
  }

  autoMoveDragPlaceHolder.dragStart = function dragStart() {};

  autoMoveDragPlaceHolder.dragEnd = function dragEnd() {
    prevTree = null;
    droppableIds = {};
    draggableIds = {};
  };

  var script$2 = {
    extends: TreeNode,
    name: 'TreeNode',
    mounted: function mounted() {
      var _this = this;

      this.store.isNodeDraggable = isNodeDraggable;
      this.store.isNodeDroppable = isNodeDroppable;

      if (this.isRoot || this.data.isDragPlaceHolder) {
        return;
      }

      var dplh = this.store.dplh;
      this.$watch('store.draggable', function (draggable) {
        if (isPropTrue(draggable)) {
          var triggerEl = _this.store.getTriggerEl ? _this.store.getTriggerEl(_this) : _this.$el.querySelector('.tree-node-inner');
          _this._draggableDestroy = index$1(triggerEl, {
            preventSelect: isPropTrue(_this.store.preventSelect),
            // trigger el
            getEl: function getEl() {
              return _this.$el;
            },
            minTranslate: 10,
            drag: function drag(e, opt, store$$1) {
              autoMoveDragPlaceHolder.dragStart(); // this store is not tree

              var draggableHelperInfo = {
                event: e,
                options: opt,
                store: store$$1
              };

              if (_this.store.ondragstart && _this.store.ondragstart(_this.data, draggableHelperInfo) === false) {
                return false;
              }

              if (!isNodeDraggable(_this.data)) {
                return false;
              }

              _this.store.$emit('drag', _this.data); // record start positon


              var siblings = _this.data.parent.children;
              _this.startPosition = {
                siblings: siblings,
                index: siblings.indexOf(_this.data) //

              };
              dplh.innerStyle.height = store$$1.el.offsetHeight + 'px';
              insertAfter(dplh, _this.data);
              _this.data.class += ' dragging'; // console.log('drag start');
            },
            moving: function moving(e, opt, store$$1) {
              if (store$$1.movedCount === 0) {
                return;
              }

              var draggableHelperInfo = {
                event: e,
                options: opt,
                store: store$$1
              };
              return autoMoveDragPlaceHolder.call(_this, draggableHelperInfo);
            },
            drop: function drop(e, opt, store$$1) {
              autoMoveDragPlaceHolder.dragEnd();
              var draggableHelperInfo = {
                event: e,
                options: opt,
                store: store$$1
              };

              if (_this.store.ondragend && _this.store.ondragend(_this.data, draggableHelperInfo) === false) {
                arrayRemove(dplh.parent.children, dplh); // can't drop, no change
              } else {
                var targetTree = dplh._vm.store;
                var crossTree = targetTree !== _this.store;
                var oldTree = crossTree ? _this.store : null;
                insertAfter(_this.data, dplh);
                arrayRemove(dplh.parent.children, dplh);
                _this.data.class = _this.data.class.replace(/(^| )dragging( |$)/g, ' ');
                targetTree.$emit('drop', _this.data, targetTree, oldTree);
                oldTree && oldTree.$emit('drop', _this.data, targetTree, oldTree); // emit change event if changed

                var siblings = _this.data.parent.children;

                if (siblings === _this.startPosition.siblings && siblings.indexOf(_this.data) === _this.startPosition.index) ; else {
                  _this.store.$emit('change', _this.data, targetTree, oldTree);

                  oldTree && oldTree.$emit('change', _this.data, targetTree, oldTree);
                }

                _this.startPosition = null;
              } // console.log('drag end');

            }
          });
        } else {
          if (_this._draggableDestroy) {
            _this._draggableDestroy();

            _this._draggableDestroy = null;
          }
        }
      }, {
        immediate: true
      });
    }
  };

  /* script */
              const __vue_script__$2 = script$2;
              
  /* template */

    /* style */
    const __vue_inject_styles__$2 = undefined;
    /* scoped */
    const __vue_scope_id__$2 = undefined;
    /* module identifier */
    const __vue_module_identifier__$2 = undefined;
    /* functional template */
    const __vue_is_functional_template__$2 = undefined;
    /* component normalizer */
    function __vue_normalize__$2(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "DraggableTreeNode.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var DraggableTreeNode = __vue_normalize__$2(
      {},
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      undefined,
      undefined
    );

  var trees = []; // for multiple trees
  // DragPlaceHolder, unique

  var dplh = {
    _id: 'draggable_tree_drag_placeHolder',
    level: null,
    droppable: false,
    isDragPlaceHolder: true,
    class: 'draggable-placeholder',
    style: {},
    innerStyle: {},
    innerClass: 'draggable-placeholder-inner',
    innerBackStyle: {},
    innerBackClass: 'draggable-placeholder-inner-back' // children: [],

  };
  var script$3 = {
    extends: Tree,
    props: {
      getTriggerEl: {
        type: Function
      },
      draggable: {},
      droppable: {
        default: true
      },
      crossTree: {},
      ondragstart: {
        type: Function
      },
      ondragend: {
        type: Function
      },
      preventSelect: {
        default: true
      }
    },
    components: {
      TreeNode: DraggableTreeNode
    },
    data: function data() {
      return {
        // DragPlaceHolder
        dplh: dplh,
        trees: trees
      };
    },
    // computed: {},
    // watch: {},
    // methods: {},
    created: function created() {
      trees.push(this);
    },
    mounted: function mounted() {},
    beforeDestroy: function beforeDestroy() {
      arrayRemove(trees, this);
    }
  };

  /* script */
              const __vue_script__$3 = script$3;
              
  /* template */

    /* style */
    const __vue_inject_styles__$3 = undefined;
    /* scoped */
    const __vue_scope_id__$3 = undefined;
    /* module identifier */
    const __vue_module_identifier__$3 = undefined;
    /* functional template */
    const __vue_is_functional_template__$3 = undefined;
    /* component normalizer */
    function __vue_normalize__$3(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "DraggableTree.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var DraggableTree = __vue_normalize__$3(
      {},
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      undefined,
      undefined
    );

  exports.Tree = Tree;
  exports.TreeNode = TreeNode;
  exports.DraggableTree = DraggableTree;
  exports.DraggableTreeNode = DraggableTreeNode;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
