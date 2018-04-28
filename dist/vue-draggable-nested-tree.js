/*!
 * vue-draggable-nested-tree v1.0.2
 * (c) 2018-present phphe <phphe@outlook.com>
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.vueDraggableNestedTree = {})));
}(this, (function (exports) { 'use strict';

  /*!
   * helper-js v1.0.53
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

  // resolve global
  var glb;

  try {
    glb = global;
  } catch (e) {
    glb = window;
  } // local store

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
  }
  function offsetToPosition(el, of) {
    var p = {
      x: el.offsetLeft,
      y: el.offsetTop // position

    };
    var elOf = getOffset(el);
    return {
      x: of.x - (elOf.x - p.x),
      y: of.y - (elOf.y - p.y)
    };
  }
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
  /**
   * [isOffsetInEl]
   * @param {Number} x
   * @param {Number} y
   * @param {Object} el HTML Element
   */

  function isOffsetInEl(x, y, el) {
    var offset = getOffset(el);
    return offset.x <= x && offset.x + el.offsetWidth >= x && offset.y <= y && offset.y + el.offsetHeight >= y;
  } // get border

  function onDOM(el, name, handler) {
    if (el.addEventListener) {
      // 所有主流浏览器，除了 IE 8 及更早 IE版本
      el.addEventListener(name, handler);
    } else if (el.attachEvent) {
      // IE 8 及更早 IE 版本
      el.attachEvent("on".concat(name), handler);
    }
  }
  function offDOM(el, name, handler) {
    if (el.removeEventListener) {
      // 所有主流浏览器，除了 IE 8 及更早 IE版本
      el.removeEventListener(name, handler);
    } else if (el.detachEvent) {
      // IE 8 及更早 IE 版本
      el.detachEvent("on".concat(name), handler);
    }
  } // advance
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
      var _this = this;

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
          _this.search[t2[0]] = t2[1] == null ? '' : decodeURIComponent(t2[1]);
        });
      }
    }

    _createClass(URLHelper, [{
      key: "getHref",
      value: function getHref() {
        var _this2 = this;

        var t = [this.baseUrl];
        var searchStr = Object.keys(this.search).map(function (k) {
          return "".concat(k, "=").concat(encodeURIComponent(_this2.search[k]));
        }).join('&');

        if (searchStr) {
          t.push(searchStr);
        }

        return t.join('?');
      }
    }]);

    return URLHelper;
  }(); // 解析函数参数, 帮助重载

  function makeStorageHelper(storage) {
    return {
      storage: storage,
      set: function set(name, value, minutes) {
        if (value == null) {
          this.storage.removeItem(name);
        } else {
          this.storage.setItem(name, JSON.stringify({
            value: value,
            expired_at: minutes && new Date().getTime() / 1000 + minutes * 60
          }));
        }
      },
      get: function get$$1(name) {
        var t = this.storage.getItem(name);

        if (t) {
          t = JSON.parse(t);

          if (!t.expired_at || t.expired_at > new Date().getTime()) {
            return t.value;
          } else {
            this.storage.removeItem(name);
          }
        }

        return null;
      },
      clear: function clear() {
        this.storage.clear();
      }
    };
  }
  var localStorage2 = makeStorageHelper(glb.localStorage);
  var sessionStorage2 = makeStorageHelper(glb.sessionStorage); // 事件处理

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
        var _this3 = this;

        var off = function off() {
          _this3.off(name, wrappedHandler);
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

        for (var _i4 = 0; _i4 < indexes.length; _i4++) {
          var index = indexes[_i4];
          this.eventStore.splice(index, 1);
        }
      }
    }, {
      key: "emit",
      value: function emit(name) {
        // 重要: 先找到要执行的项放在新数组里, 因为执行项会改变事件项存储数组
        var items = [];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.eventStore[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var item = _step3.value;

            if (item.name === name) {
              items.push(item);
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        for (var _i5 = 0; _i5 < items.length; _i5++) {
          var _item = items[_i5];

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
      var _this4;

      _classCallCheck(this, CrossWindow);

      _this4 = _possibleConstructorReturn(this, (CrossWindow.__proto__ || Object.getPrototypeOf(CrossWindow)).call(this));
      Object.defineProperty(_assertThisInitialized(_this4), "storageName", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: '_crossWindow'
      });
      var cls = CrossWindow;

      if (!cls._listen) {
        cls._listen = true;
        onDOM(window, 'storage', function (ev) {
          if (ev.key === _this4.storageName) {
            var _get2;

            var event = JSON.parse(ev.newValue);

            (_get2 = _get(CrossWindow.prototype.__proto__ || Object.getPrototypeOf(CrossWindow.prototype), "emit", _assertThisInitialized(_this4))).call.apply(_get2, [_this4, event.name].concat(_toConsumableArray(event.args)));
          }
        });
      }

      return _this4;
    }

    _createClass(CrossWindow, [{
      key: "emit",
      value: function emit(name) {
        var _get3;

        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        (_get3 = _get(CrossWindow.prototype.__proto__ || Object.getPrototypeOf(CrossWindow.prototype), "emit", this)).call.apply(_get3, [this, name].concat(args));

        glb.localStorage.setItem(this.storageName, JSON.stringify({
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
   * helper-js v1.0.48
   * (c) 2017-present phphe <phphe@outlook.com> (https://github.com/phphe)
   * Released under the MIT License.
   */

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
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }

  function _get$1(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return _get$1(parent, property, receiver);
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

  function _inherits$1(subClass, superClass) {
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

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn$1(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$1(self);
  }

  function _toConsumableArray$1(arr) {
    return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _nonIterableSpread$1();
  }

  function _arrayWithoutHoles$1(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray$1(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  // resolve global
  var glb$1;

  try {
    glb$1 = global;
  } catch (e) {
    glb$1 = window;
  } // local store
  function isArray$1(v) {
    return Object.prototype.toString.call(v) === '[object Array]';
  }

  function arrayRemove$1(arr, v) {
    var index;
    var count = 0;

    while ((index = arr.indexOf(v)) > -1) {
      arr.splice(index, 1);
      count++;
    }

    return count;
  }

  function onDOM$1(el, name, handler) {
    if (el.addEventListener) {
      // 所有主流浏览器，除了 IE 8 及更早 IE版本
      el.addEventListener(name, handler);
    } else if (el.attachEvent) {
      // IE 8 及更早 IE 版本
      el.attachEvent("on".concat(name), handler);
    }
  }
  var URLHelper$1 =
  /*#__PURE__*/
  function () {
    // protocol, hostname, port, pastname
    function URLHelper(baseUrl) {
      var _this = this;

      _classCallCheck$1(this, URLHelper);

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
          _this.search[t2[0]] = t2[1] == null ? '' : decodeURIComponent(t2[1]);
        });
      }
    }

    _createClass$1(URLHelper, [{
      key: "getHref",
      value: function getHref() {
        var _this2 = this;

        var t = [this.baseUrl];
        var searchStr = Object.keys(this.search).map(function (k) {
          return "".concat(k, "=").concat(encodeURIComponent(_this2.search[k]));
        }).join('&');

        if (searchStr) {
          t.push(searchStr);
        }

        return t.join('?');
      }
    }]);

    return URLHelper;
  }(); // 解析函数参数, 帮助重载

  function makeStorageHelper$1(storage) {
    return {
      storage: storage,
      set: function set(name, value, minutes) {
        if (value == null) {
          this.storage.removeItem(name);
        } else {
          this.storage.setItem(name, JSON.stringify({
            value: value,
            expired_at: minutes && new Date().getTime() / 1000 + minutes * 60
          }));
        }
      },
      get: function get$$1(name) {
        var t = this.storage.getItem(name);

        if (t) {
          t = JSON.parse(t);

          if (!t.expired_at || t.expired_at > new Date().getTime()) {
            return t.value;
          } else {
            this.storage.removeItem(name);
          }
        }

        return null;
      },
      clear: function clear() {
        this.storage.clear();
      }
    };
  }
  var localStorage2$1 = makeStorageHelper$1(glb$1.localStorage);
  var sessionStorage2$1 = makeStorageHelper$1(glb$1.sessionStorage); // 事件处理

  var EventProcessor$1 =
  /*#__PURE__*/
  function () {
    function EventProcessor() {
      _classCallCheck$1(this, EventProcessor);

      Object.defineProperty(this, "eventStore", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: []
      });
    }

    _createClass$1(EventProcessor, [{
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
        var _this3 = this;

        var off = function off() {
          _this3.off(name, wrappedHandler);
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

        for (var _i4 = 0; _i4 < indexes.length; _i4++) {
          var index = indexes[_i4];
          this.eventStore.splice(index, 1);
        }
      }
    }, {
      key: "emit",
      value: function emit(name) {
        // 重要: 先找到要执行的项放在新数组里, 因为执行项会改变事件项存储数组
        var items = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.eventStore[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var item = _step2.value;

            if (item.name === name) {
              items.push(item);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        for (var _i5 = 0; _i5 < items.length; _i5++) {
          var _item = items[_i5];

          _item.handler.apply(_item, args);
        }
      }
    }]);

    return EventProcessor;
  }();
  var CrossWindow$1 =
  /*#__PURE__*/
  function (_EventProcessor) {
    _inherits$1(CrossWindow, _EventProcessor);

    function CrossWindow() {
      var _this4;

      _classCallCheck$1(this, CrossWindow);

      _this4 = _possibleConstructorReturn$1(this, (CrossWindow.__proto__ || Object.getPrototypeOf(CrossWindow)).call(this));
      Object.defineProperty(_assertThisInitialized$1(_this4), "storageName", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: '_crossWindow'
      });
      var cls = CrossWindow;

      if (!cls._listen) {
        cls._listen = true;
        onDOM$1(window, 'storage', function (ev) {
          if (ev.key === _this4.storageName) {
            var _get2;

            var event = JSON.parse(ev.newValue);

            (_get2 = _get$1(CrossWindow.prototype.__proto__ || Object.getPrototypeOf(CrossWindow.prototype), "emit", _assertThisInitialized$1(_this4))).call.apply(_get2, [_this4, event.name].concat(_toConsumableArray$1(event.args)));
          }
        });
      }

      return _this4;
    }

    _createClass$1(CrossWindow, [{
      key: "emit",
      value: function emit(name) {
        var _get3;

        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        (_get3 = _get$1(CrossWindow.prototype.__proto__ || Object.getPrototypeOf(CrossWindow.prototype), "emit", this)).call.apply(_get3, [this, name].concat(args));

        glb$1.localStorage.setItem(this.storageName, JSON.stringify({
          name: name,
          args: args,
          // use random make storage event triggered every time
          // 加入随机保证触发storage事件
          random: Math.random()
        }));
      }
    }]);

    return CrossWindow;
  }(EventProcessor$1);

  /*!
   * tree-helper v1.0.5
   * phphe <phphe@outlook.com> (https://github.com/phphe)
   * https://github.com/phphe/tree-helper.git
   * Released under the MIT License.
   */

  // 旧版深度优先遍历
  // old Depth-First-Search
  function forIn(obj, handler) {
    var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

    var rootChildren, rootParent, _func;
    if (isArray$1(obj)) {
      rootChildren = obj;
      rootParent = null;
    } else {
      rootChildren = [obj];
      rootParent = null;
    }
    if (rootChildren) {
      _func = function func(children, parent) {
        for (var key in children) {
          var child = children[key];
          if (handler(child, key, parent) === false) {
            return false;
          }
          if (child[childrenKey] != null) {
            if (_func(child[childrenKey], child) === false) {
              return false;
            }
          }
        }
        return true;
      };
      _func(rootChildren, rootParent);
    }
    return obj;
  }

  // 深度优先遍历
  // Depth-First-Search
  function depthFirstSearch(obj, handler) {
    var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
    var reverse = arguments[3];

    var rootChildren = isArray$1(obj) ? obj : [obj];
    //
    var StopException = function StopException() {};
    var func = function func(children, parent) {
      if (reverse) {
        children = children.slice();
        children.reverse();
      }
      var len = children.length;
      for (var i = 0; i < len; i++) {
        var item = children[i];
        var r = handler(item, i, parent);
        if (r === false) {
          // stop
          throw new StopException();
        } else if (r === 'skip children') {
          continue;
        } else if (r === 'skip siblings') {
          break;
        }
        if (item[childrenKey] != null) {
          func(item[childrenKey], item);
        }
      }
    };
    try {
      func(rootChildren);
    } catch (e) {
      if (e instanceof StopException) {
        // stop
      } else {
        throw e;
      }
    }
  }

  function _changeParent(item, parent) {
    var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
    var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'parent';

    // remove item from original list
    if (item[parentKey]) {
      arrayRemove$1(item[parentKey][childrenKey], item);
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
        arrayRemove$1(siblings, item);
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
        arrayRemove$1(siblings, item);
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

  var TreeNode = {
    render: function render() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "tree-node",
        class: [_vm.data.active ? _vm.store.activatedClass : '', _vm.data.open ? _vm.store.openedClass : '', _vm.data.class],
        attrs: {
          "id": _vm.data._id,
          "data-level": _vm.level
        }
      }, [!_vm.isRoot ? _c('div', {
        staticClass: "tree-node-inner-back",
        class: [_vm.data.innerBackClass],
        style: [_vm.innerBackStyle, _vm.data.innerBackStyle]
      }, [_c('div', {
        staticClass: "tree-node-inner",
        class: [_vm.data.innerClass],
        style: [_vm.data.innerStyle]
      }, [_vm._t("default", null, {
        data: _vm.data,
        level: _vm.level,
        store: _vm.store
      })], 2)]) : _vm._e(), _vm.childrenVisible ? _c('div', {
        staticClass: "tree-node-children"
      }, _vm._l(_vm.data.children, function (child) {
        return _c('TreeNode', {
          key: child._id,
          attrs: {
            "data": child,
            "level": _vm.childLevel,
            "store": _vm.store
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(props) {
              return [_vm._t("default", null, {
                data: props.data,
                level: props.level,
                store: props.store
              })];
            }
          }])
        });
      })) : _vm._e()]);
    },
    staticRenderFns: [],
    name: 'TreeNode',
    props: {
      data: {},
      level: {},
      store: {}
    },
    data: function data() {
      return {};
    },
    computed: {
      isRoot: function isRoot() {
        return this.level === 0;
      },
      childLevel: function childLevel() {
        return this.level + 1;
      },
      childrenVisible: function childrenVisible() {
        var data = this.data;
        return this.isRoot || data.children && data.children.length && data.open;
      },
      innerBackStyle: function innerBackStyle() {
        var r = {
          marginBottom: this.store.space + 'px'
        };

        if (!this.isRoot && this.level > 1) {
          var indentType = this.store.indentType;
          r.paddingLeft = (this.level - 1) * this.store.indent + 'px';
        }

        return r;
      }
    } // watch: {},
    // methods: {},
    // created() {},
    // mounted() {},

  };

  var Tree = {
    render: function render() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "he-tree tree"
      }, [_c('TreeNode', {
        attrs: {
          "data": _vm.rootData,
          "level": 0,
          "store": _vm.store
        },
        scopedSlots: _vm._u([{
          key: "default",
          fn: function fn(props) {
            return [_vm._t("default", null, {
              data: props.data,
              level: props.level,
              store: _vm.store
            })];
          }
        }])
      })], 1);
    },
    staticRenderFns: [],
    props: {
      data: {},
      idLength: {
        default: 5
      },
      indent: {
        default: 16
      },
      activatedClass: {
        default: 'active'
      },
      openedClass: {
        default: 'open'
      },
      space: {
        default: 10
      } // space between node, unit px

    },
    components: {
      TreeNode: TreeNode
    },
    data: function data() {
      return {
        store: this,
        rootData: null,
        activated: [],
        opened: [],
        idMapping: {}
      };
    },
    computed: {},
    watch: {
      data: {
        immediate: true,
        handler: function handler(data, old) {
          var _this = this;

          // make rootData always use a same object
          this.rootData = this.rootData || {
            isRoot: true,
            _id: "tree_".concat(this._uid, "_node_root")
          };
          this.rootData.children = data;
          var activated = [];
          var opened = [];
          var idMapping = {};
          forIn(data, function (item, k, parent) {
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
              if (!item.hasOwnProperty(key)) {
                _this.$set(item, key, compeletedData[key]);
              }
            }

            _this.$set(item, 'parent', parent || _this.rootData);

            if (!item.hasOwnProperty('_id')) {
              item._id = "tree_".concat(_this._uid, "_node_").concat(strRand(_this.idLength));
            }

            idMapping[item._id] = item;

            if (item.active) {
              activated.push(item);
            }

            if (item.open) {
              opened.push(item);
            }
          });
          this.activated = activated;
          this.opened = opened;
          this.idMapping = idMapping;
        }
      }
    },
    methods: {
      // pure node self
      pure: function pure(data, withChildren) {
        var _this2 = this;

        var t = Object.assign({}, data);
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

        var _arr = Object.keys(t);

        for (var _i = 0; _i < _arr.length; _i++) {
          var key = _arr[_i];

          if (key.startsWidth('_')) {
            delete t[key];
          }
        }

        if (withChildren && data.children) {
          t.children = data.children.slice();
          t.children.forEach(function (v, k) {
            t.children[k] = _this2.pure(v, withChildren);
          });
        }

        return t;
      },
      activeNode: function activeNode(node, inactiveOld) {
        if (inactiveOld) {
          this.activated.forEach(function (item) {
            item.active = false;
          });
          this.activated = [];
        }

        this.activated.push(node);
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
        if (closeOld) {
          this.opened.forEach(function (item) {
            item.open = false;
          });
          this.opened = [];
        }

        this.opened.push(node);
        node.open = true;
      },
      toggleOpen: function toggleOpen(node, closeOld) {
        if (node.open) {
          node.open = false;
        } else {
          this.openNode(node, closeOld);
        }
      }
    } // created() {},
    // mounted() {},

  };

  /*!
   * draggable-helper v1.0.10
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

  function index (dragHandlerEl) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (opt.minTranslate == null) {
      opt.minTranslate = 10;
    }

    var store$$1 = getPureStore();

    var destroy = function destroy() {
      offDOM(dragHandlerEl, 'mousedown', dragHandlerEl._draggbleEventHandler);
      delete dragHandlerEl._draggbleEventHandler;
    };

    if (dragHandlerEl._draggbleEventHandler) {
      destroy();
    }

    dragHandlerEl._draggbleEventHandler = start;
    onDOM(dragHandlerEl, 'mousedown', start);
    return destroy;

    function start(e) {
      if (e.which !== 1) {
        // not left button
        return;
      }

      e.stopPropagation();
      onDOM(document.body, 'selectstart', preventSelect);
      store$$1.mouse = {
        x: e.pageX,
        y: e.pageY
      };
      store$$1.initialMouse = Object.assign({}, store$$1.mouse);
      onDOM(document, 'mousemove', moving);
      onDOM(window, 'mouseup', drop);
    }

    function drag(e) {
      var _resolveDragedElAndIn = resolveDragedElAndInitialPosition(),
          el = _resolveDragedElAndIn.el,
          position = _resolveDragedElAndIn.position;

      store$$1.el = el;
      store$$1.initialPosition = Object.assign({}, position);
      var r = opt.drag && opt.drag(e, opt, store$$1);

      if (r === false) {
        offDOM(document.body, 'selectstart', preventSelect);
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
      addClass(el, opt.draggingClass); //

      var _document = document,
          body = _document.body;
      var bodyOldStyle = (body.getAttribute('style') || '').trim();

      if (bodyOldStyle.length && !bodyOldStyle.endsWith(';')) {
        bodyOldStyle += ';';
      }

      backupAttr(body, 'style');
      body.style = bodyOldStyle + 'cursor: move;';
    }

    function moving(e) {
      store$$1.mouse = {
        x: e.pageX,
        y: e.pageY
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
      }

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
      offDOM(document, 'mousemove', moving);
      offDOM(window, 'mouseup', drop); // drag executed if movedCount > 0

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

        restoreAttr(document.body, 'style');
        offDOM(document.body, 'selectstart', preventSelect);
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
        position: offsetToPosition(el, getOffset(el0)),
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

  function _classCallCheck$2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$2(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$2(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$2(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
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
      _classCallCheck$2(this, Cache);

      _defineProperty(this, "store", {});
    }

    _createClass$2(Cache, [{
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
      Object.defineProperty(obj, key, {
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

  function isPropTrue(v) {
    return v || v === '';
  }

  // 对 drag placeholder进行的操作

  var targets = {
    'nothing': function nothing(info) {},
    'after': function after(_ref) {
      var dplh = _ref.dplh,
          targetNode = _ref.targetNode,
          currentTree = _ref.currentTree;
      // after targetNode or closest droppable parent
      var node = targetNode;

      while (!node.parent._droppable) {
        node = node.parent;
      }

      insertAfter(dplh, node);
    },
    'before': function before(_ref2) {
      var dplh = _ref2.dplh,
          targetNode = _ref2.targetNode;
      insertBefore(dplh, targetNode);
    },
    'append': function append(_ref3) {
      var dplh = _ref3.dplh,
          targetNode = _ref3.targetNode;
      appendTo(dplh, targetNode);
      targetNode.open = true;
    },
    'prepend': function prepend(info) {
      var dplh = info.dplh,
          targetNode = info.targetNode;
      prependTo(dplh, targetNode);
      targetNode.open = true; // prepend may open a closed node which has children

      if (!targetNode.open) {
        targetNode.open = true;
        resolveBranchDroppable(info, targetNode);
      }
    },
    'after target parent': function afterTargetParent(_ref4) {
      var dplh = _ref4.dplh,
          targetNode = _ref4.targetNode;
      insertAfter(dplh, targetNode.parent);
    },
    // append to prev sibling
    'append prev': function appendPrev(_ref5) {
      var dplh = _ref5.dplh,
          targetNode = _ref5.targetNode,
          node = _ref5.node,
          targetPrev = _ref5.targetPrev;
      appendTo(dplh, targetPrev);
      targetPrev.open = true;
    }
  };

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
    // 另一节点父级是根节点
    'targetNode parent is root': function targetNodeParentIsRoot(info) {
      return info.targetNode.parent.isRoot;
    },
    // 拖动点坐标在任一树中, 同时, 起始树要可拖出, 当前树要可拖入
    'currentTree existed': function currentTreeExisted(info) {
      return info.currentTree;
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
    // 另一节点是根节点
    'targetNode is root': function targetNodeIsRoot(info) {
      return info.targetNode.isRoot;
    },
    // 另一节点有子(不包括占位节点)
    'targetNode has children excluding placeholder': function targetNodeHasChildrenExcludingPlaceholder(info) {
      return findChild(info, info.targetNode.children, function (v) {
        return v !== info.dplh;
      });
    },
    // 另一节点可放置
    'targetNode is droppable': function targetNodeIsDroppable(info) {
      return info.targetNode._droppable;
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
    // 另一节点上一个节点可放置
    'targetNode prev is droppable': function targetNodePrevIsDroppable(info) {
      return info.targetPrev._droppable;
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

  var _arr = Object.keys(rules);

  var _loop = function _loop() {
    var key = _arr[_i2];
    var old = rules[key];

    rules[key] = function () {
      return Boolean(old.apply(void 0, arguments));
    };
  };

  for (var _i2 = 0; _i2 < _arr.length; _i2++) {
    _loop();
  }

  var prevTree; // context is vm
  // dhStore: draggable helper store

  function autoMoveDragPlaceHolder (e, opt, dhStore, trees) {
    // make info
    var info = {
      event: e,
      el: dhStore.el,
      vm: this,
      node: this.data,
      store: this.store,
      dplh: this.store.dplh,
      draggableHelperData: {
        opt: opt,
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
      // tree
      currentTree: function currentTree() {
        var _this = this;

        var currentTree = trees.find(function (tree) {
          return isOffsetInEl(_this.offset.x, _this.offset.y, tree.$el);
        });

        if (currentTree) {
          var dragStartTree = this.store;
          var treeChanged;

          if (dhStore.movedCount === 0) {
            prevTree = dragStartTree;
            treeChanged = true;
          }

          if (prevTree !== currentTree) {
            if (!isPropTrue(dragStartTree.crossTree) || !isPropTrue(currentTree.crossTree)) {
              return;
            }

            prevTree = currentTree;
            treeChanged = true;
          }

          if (!isPropTrue(currentTree.droppable)) {
            return;
          }

          if (treeChanged) {
            // when move start or drag move into another tree
            // resolve _droppable
            resolveBranchDroppable(info, currentTree.rootData);
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
        return Math.abs(dplhOf4.y - this.currentTreeRootOf4.y) < 5;
      },
      dplhAtBottom: function dplhAtBottom() {
        return Math.abs(dplhOf4.y2 - this.currentTreeRootOf4.y2) < 5;
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
        return this.currentTree.idMapping[id];
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
          console.warn("failed to execute rule '".concat(ruleId, "'"), e);
        }

        executedRuleCache[ruleId] = r;
      }

      return executedRuleCache[ruleId];
    };

    if (exec('currentTree existed') === true) {
      if (exec('targetNode is placeholder') === false) {
        if (exec('placeholder existed') === true) {
          if (exec('placeholder in currentTree') === true) {
            if (exec('targetNode parent is root') === false) {
              if (exec('targetNode is open') === true) {
                if (exec('targetNode has children excluding placeholder') === false) {
                  if (exec('targetNode is droppable') === true) {
                    if (exec('at left') === false) {
                      if (exec('targetNode is 1st child') === true) {
                        if (exec('at indent right') === true) {
                          targets['append'](info);
                        } else if (exec('at indent right') === false) {
                          targets['after'](info);
                        }
                      } else if (exec('targetNode is 1st child') === false) {
                        targets['append'](info);
                      }
                    } else if (exec('at left') === true) {
                      targets['after'](info);
                    }
                  } else if (exec('targetNode is droppable') === false) {
                    targets['after'](info);
                  }
                } else if (exec('targetNode has children excluding placeholder') === true) {
                  if (exec('targetNode is droppable') === true) {
                    targets['prepend'](info);
                  } else if (exec('targetNode is droppable') === false) {
                    targets['after'](info);
                  }
                }
              } else if (exec('targetNode is open') === false) {
                if (exec('targetNode is droppable') === true) {
                  if (exec('at indent right') === false) {
                    targets['after'](info);
                  } else if (exec('at indent right') === true) {
                    targets['prepend'](info);
                  }
                } else if (exec('targetNode is droppable') === false) {
                  targets['after'](info);
                }
              }
            } else if (exec('targetNode parent is root') === true) {
              if (exec('targetNode is open') === true) {
                if (exec('targetNode has children excluding placeholder') === false) {
                  if (exec('targetNode is droppable') === true) {
                    if (exec('targetNode is 1st child') === false) {
                      if (exec('targetNode prev is droppable') === false) {
                        targets['append'](info);
                      } else if (exec('targetNode prev is droppable') === true) {
                        if (exec('on targetNode middle') === false) {
                          if (exec('at indent right') === false) {
                            targets['after'](info);
                          } else if (exec('at indent right') === true) {
                            targets['append'](info);
                          }
                        } else if (exec('on targetNode middle') === true) {
                          targets['append'](info);
                        }
                      }
                    } else if (exec('targetNode is 1st child') === true) {
                      if (exec('on targetNode middle') === true) {
                        targets['before'](info);
                      } else if (exec('on targetNode middle') === false) {
                        if (exec('at indent right') === true) {
                          targets['append'](info);
                        } else if (exec('at indent right') === false) {
                          targets['after'](info);
                        }
                      }
                    }
                  } else if (exec('targetNode is droppable') === false) {
                    if (exec('targetNode is 1st child') === false) {
                      targets['after'](info);
                    } else if (exec('targetNode is 1st child') === true) {
                      if (exec('on targetNode middle') === true) {
                        targets['before'](info);
                      } else if (exec('on targetNode middle') === false) {
                        targets['after'](info);
                      }
                    }
                  }
                } else if (exec('targetNode has children excluding placeholder') === true) {
                  if (exec('targetNode is 1st child') === false) {
                    targets['prepend'](info);
                  } else if (exec('targetNode is 1st child') === true) {
                    if (exec('on targetNode middle') === true) {
                      targets['before'](info);
                    } else if (exec('on targetNode middle') === false) {
                      targets['prepend'](info);
                    }
                  }
                }
              } else if (exec('targetNode is open') === false) {
                if (exec('targetNode is 1st child') === true) {
                  if (exec('on targetNode middle') === false) {
                    if (exec('at indent right') === false) {
                      targets['after'](info);
                    } else if (exec('at indent right') === true) {
                      targets['prepend'](info);
                    }
                  } else if (exec('on targetNode middle') === true) {
                    targets['before'](info);
                  }
                } else if (exec('targetNode is 1st child') === false) {
                  if (exec('at indent right') === true) {
                    targets['prepend'](info);
                  } else if (exec('at indent right') === false) {
                    targets['after'](info);
                  }
                }
              }
            }
          } else if (exec('placeholder in currentTree') === false) {
            targets['append'](info);
          }
        } else if (exec('placeholder existed') === false) {
          targets['nothing'](info);
        }
      } else if (exec('targetNode is placeholder') === true) {
        if (exec('targetNode parent is root') === false) {
          if (exec('targetNode is 1st child') === true) {
            if (exec('targetNode is last child') === true) {
              if (exec('at left') === false) {
                targets['nothing'](info);
              } else if (exec('at left') === true) {
                targets['after target parent'](info);
              }
            } else if (exec('targetNode is last child') === false) {
              targets['nothing'](info);
            }
          } else if (exec('targetNode is 1st child') === false) {
            if (exec('targetNode is last child') === true) {
              if (exec('targetNode prev is droppable') === true) {
                if (exec('at left') === true) {
                  targets['after target parent'](info);
                } else if (exec('at left') === false) {
                  if (exec('at indent right') === true) {
                    targets['append prev'](info);
                  } else if (exec('at indent right') === false) {
                    targets['nothing'](info);
                  }
                }
              } else if (exec('targetNode prev is droppable') === false) {
                if (exec('at left') === false) {
                  targets['nothing'](info);
                } else if (exec('at left') === true) {
                  targets['after target parent'](info);
                }
              }
            } else if (exec('targetNode is last child') === false) {
              if (exec('targetNode prev is droppable') === true) {
                if (exec('at left') === true) {
                  targets['nothing'](info);
                } else if (exec('at left') === false) {
                  if (exec('at indent right') === true) {
                    targets['append prev'](info);
                  } else if (exec('at indent right') === false) {
                    targets['nothing'](info);
                  }
                }
              } else if (exec('targetNode prev is droppable') === false) {
                targets['nothing'](info);
              }
            }
          }
        } else if (exec('targetNode parent is root') === true) {
          if (exec('targetNode is 1st child') === false) {
            if (exec('targetNode prev is droppable') === true) {
              if (exec('at left') === true) {
                targets['nothing'](info);
              } else if (exec('at left') === false) {
                if (exec('at indent right') === true) {
                  targets['append prev'](info);
                } else if (exec('at indent right') === false) {
                  targets['nothing'](info);
                }
              }
            } else if (exec('targetNode prev is droppable') === false) {
              targets['nothing'](info);
            }
          } else if (exec('targetNode is 1st child') === true) {
            targets['nothing'](info);
          }
        }
      }
    } else if (exec('currentTree existed') === false) {
      targets['nothing'](info);
    } // decision end =================================
    //

  }

  function getOf4(el, space) {
    var r = getOffset(el);
    r.x2 = r.x + el.offsetWidth;
    r.y2 = r.y + el.offsetHeight + space;
    return r;
  } // branch is a node


  function resolveBranchDroppable(info, branch) {
    if (branch.hasOwnProperty('droppable')) {
      branch._droppable = branch.droppable;
    } else if (!branch.hasOwnProperty('_droppable')) {
      branch._droppable = true;
    }

    depthFirstSearch(branch, function (item, i, parent) {
      if (item === branch) {
        return;
      }

      if (item.isDragPlaceHolder || item === info.node) {
        return 'skip children';
      }

      item._droppable = item.hasOwnProperty('droppable') ? item.droppable : parent._droppable;

      if (!item.open) {
        return 'skip children';
      }
    });
  }

  var DraggableTreeNode = {
    extends: TreeNode,
    name: 'TreeNode',
    mounted: function mounted() {
      var _this = this;

      if (this.isRoot || this.data.isDragPlaceHolder) {
        return;
      }

      var dplh = this.store.dplh;
      this.$watch('store.draggable', function (draggable) {
        if (isPropTrue(draggable)) {
          var triggerEl = _this.store.getTriggerEl ? _this.store.getTriggerEl(_this) : _this.$el.querySelector('.tree-node-inner');
          _this._draggableDestroy = index(triggerEl, {
            // trigger el
            getEl: function getEl() {
              return _this.$el;
            },
            minTranslate: 10,
            drag: function drag(e, opt, store$$1) {
              // this store is not tree
              if (_this.store.ondragstart && _this.store.ondragstart(_this.data, _this, e, opt, store$$1) === false) {
                return false;
              }

              if (!isNodeDraggable(_this.data)) {
                return false;
              }

              dplh.innerStyle.height = store$$1.el.offsetHeight + 'px';
              insertAfter(dplh, _this.data);
              _this.data.class += ' dragging';
              console.log('drag start');
            },
            moving: function moving(e, opt, store$$1) {
              return autoMoveDragPlaceHolder.call(_this, e, opt, store$$1, _this.store.trees);
            },
            drop: function drop(e, opt, store$$1) {
              if (_this.store.ondragend && _this.store.ondragend(_this.data, _this, e, opt, store$$1) === false) {// can't drop
              } else {
                insertAfter(_this.data, dplh);
              }

              arrayRemove(dplh.parent.children, dplh);
              _this.data.class = _this.data.class.replace(/(^| )dragging( |$)/g, ' ');
              console.log('drag end');
            }
          });
        } else {
          if (_this._draggableDestroy) {
            _this._draggableDestroy();

            delete _this._draggableDestroy;
          }
        }
      }, {
        immediate: true
      });
    }
  };

  function isNodeDraggable(node) {
    while (!node.hasOwnProperty('draggable') && node.parent) {
      node = node.parent;
    }

    if (node.hasOwnProperty('draggable')) {
      return node.draggable;
    } else {
      return true;
    }
  }

  var trees = []; // for multiple trees
  // DragPlaceHolder, unique

  var dplh = {
    _id: 'draggable_tree_drag_placeHolder',
    droppable: false,
    isDragPlaceHolder: true,
    class: 'draggable-placeholder',
    style: {},
    innerStyle: {},
    innerClass: 'draggable-placeholder-inner',
    innerBackStyle: {},
    innerBackClass: 'draggable-placeholder-inner-back' // children: [],

  };
  var DraggableTree = {
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
    watch: {
      idMapping: {
        immediate: true,
        handler: function handler(idMapping) {
          idMapping[this.dplh._id] = this.dplh;
        }
      }
    },
    // methods: {},
    created: function created() {
      trees.push(this);
    },
    mounted: function mounted() {},
    beforeDestroy: function beforeDestroy() {
      arrayRemove(trees, this);
    }
  };

  exports.Tree = Tree;
  exports.TreeNode = TreeNode;
  exports.DraggableTree = DraggableTree;
  exports.DraggableTreeNode = DraggableTreeNode;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
