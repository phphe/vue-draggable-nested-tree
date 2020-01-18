/*!
 * vue-draggable-nested-tree v3.0.0-beta
 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.vueDraggableNestedTree = {}));
}(this, (function (exports) { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	});

	var getPrototypeOf = createCommonjsModule(function (module) {
	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	module.exports = _getPrototypeOf;
	});

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	var superPropBase = _superPropBase;

	var get = createCommonjsModule(function (module) {
	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    module.exports = _get = Reflect.get;
	  } else {
	    module.exports = _get = function _get(target, property, receiver) {
	      var base = superPropBase(target, property);
	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get(target, property, receiver || target);
	}

	module.exports = _get;
	});

	var setPrototypeOf = createCommonjsModule(function (module) {
	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	module.exports = _setPrototypeOf;
	});

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

	var createClass = _createClass;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	var runtime_1 = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var runtime = (function (exports) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined$1; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined$1) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined$1;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined$1;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined$1;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined$1, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined$1;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined$1;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined$1;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined$1;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined$1;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	   module.exports 
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  Function("r", "regeneratorRuntime = r")(runtime);
	}
	});

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

	var defineProperty = _defineProperty;

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
	  var rect = getBoundingClientRect(el);
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

	function getBoundingClientRect(el) {
	  // refer: http://www.51xuediannao.com/javascript/getBoundingClientRect.html
	  var xy = el.getBoundingClientRect();
	  var top = xy.top - document.documentElement.clientTop,
	      //document.documentElement.clientTop 在IE67中始终为2，其他高级点的浏览器为0
	  bottom = xy.bottom,
	      left = xy.left - document.documentElement.clientLeft,
	      //document.documentElement.clientLeft 在IE67中始终为2，其他高级点的浏览器为0
	  right = xy.right,
	      width = xy.width || right - left,
	      //IE67不存在width 使用right - left获得
	  height = xy.height || bottom - top;
	  var x = left;
	  var y = top;
	  return {
	    top: top,
	    right: right,
	    bottom: bottom,
	    left: left,
	    width: width,
	    height: height,
	    x: x,
	    y: y
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
	  backupAttr(el, 'style');
	  el.style.display = 'block';
	  var t = getBoundingClientRect(el);
	  var size = {
	    width: t.width,
	    height: t.height
	  };
	  restoreAttr(el, 'style');
	  return size;
	}


	function onDOM(el, name, handler) {
	  for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key8 = 3; _key8 < _len6; _key8++) {
	    args[_key8 - 3] = arguments[_key8];
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
	  for (var _len7 = arguments.length, args = new Array(_len7 > 3 ? _len7 - 3 : 0), _key9 = 3; _key9 < _len7; _key9++) {
	    args[_key9 - 3] = arguments[_key9];
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
	// callback(mid, i) should return mid - your_value


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

	var _typeof = typeof Symbol === "function" && _typeof_1(Symbol.iterator) === "symbol" ? function (obj) {
	  return _typeof_1(obj);
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof_1(obj);
	};

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}
	// Breadth-First-Search


	function breadthFirstSearch(obj, handler) {
	  var reverse = arguments[3];
	  var rootChildren = isArray(obj) ? obj : [obj]; //

	  var stack = rootChildren.map(function (v, i) {
	    return {
	      item: v,
	      index: i
	    };
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
	        return {
	          item: v,
	          index: i,
	          parent: item
	        };
	      });

	      (_stack = stack).push.apply(_stack, _toConsumableArray(pushStack));
	    }
	  };

	  while (stack.length) {
	    var _ret = _loop();

	    switch (_ret) {
	      case 'continue':
	        continue;

	      default:
	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }
	  }
	}

	function _changeParent(item, parent) {
	  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
	  var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'parent'; // remove item from original list

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
	      "default": 0
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

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
	/* server only */
	, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	  if (typeof shadowMode !== 'boolean') {
	    createInjectorSSR = createInjector;
	    createInjector = shadowMode;
	    shadowMode = false;
	  } // Vue.extend constructor export interop.


	  var options = typeof script === 'function' ? script.options : script; // render functions

	  if (template && template.render) {
	    options.render = template.render;
	    options.staticRenderFns = template.staticRenderFns;
	    options._compiled = true; // functional template

	    if (isFunctionalTemplate) {
	      options.functional = true;
	    }
	  } // scopedId


	  if (scopeId) {
	    options._scopeId = scopeId;
	  }

	  var hook;

	  if (moduleIdentifier) {
	    // server build
	    hook = function hook(context) {
	      // 2.3 injection
	      context = context || // cached call
	      this.$vnode && this.$vnode.ssrContext || // stateful
	      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
	      // 2.2 with runInNewContext: true

	      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	        context = __VUE_SSR_CONTEXT__;
	      } // inject component styles


	      if (style) {
	        style.call(this, createInjectorSSR(context));
	      } // register component module identifier for async chunk inference


	      if (context && context._registeredComponents) {
	        context._registeredComponents.add(moduleIdentifier);
	      }
	    }; // used by ssr in case component is cached and beforeCreate
	    // never gets called


	    options._ssrRegister = hook;
	  } else if (style) {
	    hook = shadowMode ? function (context) {
	      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
	    } : function (context) {
	      style.call(this, createInjector(context));
	    };
	  }

	  if (hook) {
	    if (options.functional) {
	      // register for functional component in vue file
	      var originalRender = options.render;

	      options.render = function renderWithStyleInjection(h, context) {
	        hook.call(context);
	        return originalRender(h, context);
	      };
	    } else {
	      // inject component registration as beforeCreate hook
	      var existing = options.beforeCreate;
	      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	    }
	  }

	  return script;
	}

	/* script */
	var __vue_script__ = script;
	/* template */

	var __vue_render__ = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c("div", {
	    staticClass: "tree-node",
	    "class": [_vm.data.active ? _vm.store.activatedClass : "", _vm.data.open ? _vm.store.openedClass : "", _vm.data["class"]],
	    style: _vm.data.style,
	    attrs: {
	      id: _vm.data._id
	    }
	  }, [!_vm.isRoot ? _vm._t("node-inner-back", [_c("div", {
	    staticClass: "tree-node-inner-back",
	    "class": [_vm.data.innerBackClass],
	    style: [_vm.innerBackStyle, _vm.data.innerBackStyle]
	  }, [_c("div", {
	    staticClass: "tree-node-inner",
	    "class": [_vm.data.innerClass],
	    style: [_vm.data.innerStyle]
	  }, [_vm._t("default", null, {
	    data: _vm.data,
	    store: _vm.store,
	    vm: _vm.vm
	  })], 2)])], {
	    styleObj: _vm.innerBackStyle,
	    data: _vm.data,
	    store: _vm.store,
	    vm: _vm.vm
	  }) : _vm._e(), _c("transition", {
	    attrs: {
	      name: _vm.store.childrenTransitionName
	    }
	  }, [_vm.childrenVisible ? _c("div", {
	    staticClass: "tree-node-children"
	  }, _vm._l(_vm.data.children, function (child) {
	    return _c("TreeNode", {
	      key: child._id,
	      attrs: {
	        data: child,
	        store: _vm.store,
	        level: _vm.childrenLevel
	      },
	      scopedSlots: _vm._u([{
	        key: "default",
	        fn: function fn(props) {
	          return [_vm._t("default", null, {
	            data: props.data,
	            store: props.store,
	            vm: props.vm
	          })];
	        }
	      }, {
	        key: "node-inner-back",
	        fn: function fn(props) {
	          return _vm.store.customInnerBack ? [_vm._t("node-inner-back", null, {
	            styleObj: props.styleObj,
	            data: props.data,
	            store: props.store,
	            vm: props.vm
	          })] : undefined;
	        }
	      }], null, true)
	    });
	  }), 1) : _vm._e()])], 2);
	};

	var __vue_staticRenderFns__ = [];
	__vue_render__._withStripped = true;
	/* style */

	var __vue_inject_styles__ = undefined;
	/* scoped */

	var __vue_scope_id__ = undefined;
	/* module identifier */

	var __vue_module_identifier__ = undefined;
	/* functional template */

	var __vue_is_functional_template__ = false;
	/* style inject */

	/* style inject SSR */

	/* style inject shadow dom */

	var __vue_component__ = normalizeComponent({
	  render: __vue_render__,
	  staticRenderFns: __vue_staticRenderFns__
	}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

	//
	var script$1 = {
	  props: {
	    data: {},
	    idLength: {
	      type: Number,
	      "default": 5
	    },
	    indent: {
	      type: Number,
	      "default": 16
	    },
	    activatedClass: {
	      "default": 'active'
	    },
	    openedClass: {
	      "default": 'open'
	    },
	    space: {
	      type: Number,
	      "default": 10
	    },
	    // space between node, unit px
	    childrenTransitionName: {},
	    // there are issues under draggable tree
	    customInnerBack: {}
	  },
	  components: {
	    TreeNode: __vue_component__
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
	        "class": '',
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

	      var t = Object.assign({}, node);
	      delete t._id;
	      delete t.parent;
	      delete t.children;
	      delete t.open;
	      delete t.active;
	      delete t.style;
	      delete t["class"];
	      delete t.innerStyle;
	      delete t.innerClass;
	      delete t.innerBackStyle;
	      delete t.innerBackClass;

	      for (var _i = 0, _Object$keys = Object.keys(t); _i < _Object$keys.length; _i++) {
	        var key = _Object$keys[_i];

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
	var __vue_script__$1 = script$1;
	/* template */

	var __vue_render__$1 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c("div", {
	    staticClass: "he-tree tree"
	  }, [_c("TreeNode", {
	    attrs: {
	      data: _vm.rootData,
	      store: _vm.store
	    },
	    scopedSlots: _vm._u([{
	      key: "default",
	      fn: function fn(props) {
	        return [_vm._t("default", null, {
	          data: props.data,
	          store: _vm.store,
	          vm: props.vm
	        })];
	      }
	    }, {
	      key: "node-inner-back",
	      fn: function fn(props) {
	        return _vm.customInnerBack ? [_vm._t("node-inner-back", null, {
	          styleObj: props.styleObj,
	          data: props.data,
	          store: props.store,
	          vm: props.vm
	        })] : undefined;
	      }
	    }], null, true)
	  })], 1);
	};

	var __vue_staticRenderFns__$1 = [];
	__vue_render__$1._withStripped = true;
	/* style */

	var __vue_inject_styles__$1 = undefined;
	/* scoped */

	var __vue_scope_id__$1 = undefined;
	/* module identifier */

	var __vue_module_identifier__$1 = undefined;
	/* functional template */

	var __vue_is_functional_template__$1 = false;
	/* style inject */

	/* style inject SSR */

	/* style inject shadow dom */

	var __vue_component__$1 = normalizeComponent({
	  render: __vue_render__$1,
	  staticRenderFns: __vue_staticRenderFns__$1
	}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

	/*!
	 * drag-event-service v0.0.6
	 * (c) 2018-present phphe <phphe@outlook.com> (https://github.com/phphe)
	 * Released under the MIT License.
	 */

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

	    var store = this._getStore(el);

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

	    store.push({
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
	    var store = this._getStore(el);

	    for (var _len2 = arguments.length, args = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
	      args[_key2 - 3] = arguments[_key2];
	    }

	    for (var i = store.length - 1; i >= 0; i--) {
	      var _store$i = store[i],
	          handler2 = _store$i.handler,
	          wrapper = _store$i.wrapper;

	      if (handler === handler2) {
	        var _hp$offDOM, _hp$offDOM2;

	        (_hp$offDOM = offDOM).call.apply(_hp$offDOM, [null, el, events[name][0], wrapper].concat(args));

	        (_hp$offDOM2 = offDOM).call.apply(_hp$offDOM2, [null, el, events[name][1], wrapper].concat(args));

	        store.splice(i, 1);
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

	function index$1(dragHandlerEl) {
	  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  if (opt.minTranslate == null) {
	    opt.minTranslate = 10;
	  }

	  var store = getPureStore();

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
	    store.mouse = {
	      x: mouse.x,
	      y: mouse.y
	    };
	    store.initialMouse = Object.assign({}, store.mouse);
	    index.on(document, 'move', moving, {
	      passive: false
	    }); // passive: false is for touchmove event

	    index.on(window, 'end', drop);
	  }

	  function drag(e) {
	    var _resolveDragedElAndIn = resolveDragedElAndInitialPosition(),
	        el = _resolveDragedElAndIn.el,
	        position = _resolveDragedElAndIn.position;

	    store.el = el;
	    store.initialPosition = Object.assign({}, position);
	    var r = opt.drag && opt.drag(e, opt, store);

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
	    store.mouse = {
	      x: mouse.x,
	      y: mouse.y
	    };
	    var move = store.move = {
	      x: store.mouse.x - store.initialMouse.x,
	      y: store.mouse.y - store.initialMouse.y
	    };

	    if (store.movedCount === 0 && opt.minTranslate) {
	      var x2 = Math.pow(store.move.x, 2);
	      var y2 = Math.pow(store.move.y, 2);
	      var dtc = Math.pow(x2 + y2, 0.5);

	      if (dtc < opt.minTranslate) {
	        return;
	      }
	    }

	    var canMove = true;

	    if (store.movedCount === 0) {
	      if (drag(e) === false) {
	        canMove = false;
	      }
	    } // move started
	    // e.preventDefault() to prevent text selection and page scrolling when touch


	    e.preventDefault();

	    if (canMove && opt.moving) {
	      if (opt.moving(e, opt, store) === false) {
	        canMove = false;
	      }
	    }

	    if (canMove) {
	      if (!store || !store.el) {
	        return;
	      }

	      Object.assign(store.el.style, {
	        left: store.initialPosition.x + move.x + 'px',
	        top: store.initialPosition.y + move.y + 'px'
	      });
	      store.movedCount++;
	    }
	  }

	  function drop(e) {
	    index.off(document, 'move', moving, {
	      passive: false
	    });
	    index.off(window, 'end', drop); // drag executed if movedCount > 0

	    if (store.movedCount > 0) {
	      store.movedCount = 0;
	      var _store = store,
	          el = _store.el;

	      if (opt.clone) {
	        el.parentElement.removeChild(el);
	      } else {
	        restoreAttr(el, 'style');
	        restoreAttr(el, 'class');
	      }

	      opt.drop && opt.drop(e, opt, store);
	    }

	    store = getPureStore();
	  }

	  function resolveDragedElAndInitialPosition() {
	    var el0 = opt.getEl ? opt.getEl(dragHandlerEl, opt) : dragHandlerEl;
	    var el = el0;

	    if (opt.clone) {
	      store.triggerEl = el0;
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

	var Cache =
	/*#__PURE__*/
	function () {
	  function Cache() {
	    classCallCheck(this, Cache);

	    defineProperty(this, "store", {});
	  }

	  createClass(Cache, [{
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

	function isPropTrue(value) {
	  return value === '' || value;
	} // the dependences in getter can't be auto resolved. must use exec to include dependences

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
	    for (var _iterator = els[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
	      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
	        _iterator["return"]();
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
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = betweenEls[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var el = _step2.value;

	          if (!isParent(el, treeEl)) {
	            covered = true;
	            break;
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
	            _iterator2["return"]();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
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
	    insertDplhAfterTo(info.dplh, info.targetNode);
	  },
	  'before': function before(info) {
	    if (isNodeDroppable(info.targetNode.parent)) {
	      insertBefore(info.dplh, info.targetNode);
	    } else {
	      insertDplhAfterTo(info.dplh, info.targetNode.parent);
	    }
	  },
	  'append': function append(info) {
	    if (isNodeDroppable(info.targetNode)) {
	      appendTo(info.dplh, info.targetNode);
	      if (!info.targetNode.open) info.store.toggleOpen(info.targetNode);
	    } else {
	      insertDplhAfterTo(info.dplh, info.targetNode);
	    }
	  },
	  'prepend': function prepend(info) {
	    if (isNodeDroppable(info.targetNode)) {
	      prependTo(info.dplh, info.targetNode);
	      if (!info.targetNode.open) info.store.toggleOpen(info.targetNode);
	    } else {
	      insertDplhAfterTo(info.dplh, info.targetNode);
	    }
	  },
	  'after target parent': function afterTargetParent(info) {
	    insertDplhAfterTo(info.dplh, info.targetNode.parent);
	  },
	  // append to prev sibling
	  'append prev': function appendPrev(info) {
	    if (isNodeDroppable(info.targetPrev)) {
	      appendTo(info.dplh, info.targetPrev);
	      if (!info.targetPrev.open) info.store.toggleOpen(info.targetPrev);
	    } else {
	      insertDplhAfterTo(info.dplh, info.targetPrev);
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
	    var closest = findParent(targetNode, function (node) {
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


	function findParent(node, handle) {
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
	  }
	}; // convert rule output to Boolean

	var _loop = function _loop() {
	  var key = _Object$keys[_i2];
	  var old = rules[key];

	  rules[key] = function () {
	    return Boolean(old.apply(void 0, arguments));
	  };
	};

	for (var _i2 = 0, _Object$keys = Object.keys(rules); _i2 < _Object$keys.length; _i2++) {
	  _loop();
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
	    }
	  }; //

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
	            if (exec('targetNode is last child') === false) {
	              targets['nothing'](info);
	            } else if (exec('targetNode is last child') === true) {
	              if (exec('on targetNode middle') === false) {
	                if (exec('at left') === true) {
	                  targets['after target parent'](info);
	                } else if (exec('at left') === false) {
	                  targets['nothing'](info);
	                }
	              } else if (exec('on targetNode middle') === true) {
	                if (exec('at left') === true) {
	                  targets['after target parent'](info);
	                } else if (exec('at left') === false) {
	                  targets['nothing'](info);
	                }
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
	                  } else if (exec('at indent right') === false) {
	                    targets['nothing'](info);
	                  }
	                }
	              } else if (exec('on targetNode middle') === false) {
	                if (exec('at left') === true) {
	                  targets['after target parent'](info);
	                } else if (exec('at left') === false) {
	                  if (exec('at indent right') === true) {
	                    targets['append prev'](info);
	                  } else if (exec('at indent right') === false) {
	                    targets['nothing'](info);
	                  }
	                }
	              }
	            } else if (exec('targetNode is last child') === false) {
	              if (exec('on targetNode middle') === true) {
	                if (exec('at left') === true) {
	                  targets['nothing'](info);
	                } else if (exec('at left') === false) {
	                  if (exec('at indent right') === true) {
	                    targets['append prev'](info);
	                  } else if (exec('at indent right') === false) {
	                    targets['nothing'](info);
	                  }
	                }
	              } else if (exec('on targetNode middle') === false) {
	                if (exec('at left') === true) {
	                  targets['nothing'](info);
	                } else if (exec('at left') === false) {
	                  if (exec('at indent right') === true) {
	                    targets['append prev'](info);
	                  } else if (exec('at indent right') === false) {
	                    targets['nothing'](info);
	                  }
	                }
	              }
	            }
	          }
	        } else if (exec('targetNode is the second child of root') === true) {
	          if (exec('on targetNode middle') === true) {
	            if (exec('at indent right') === true) {
	              targets['append prev'](info);
	            } else if (exec('at indent right') === false) {
	              targets['nothing'](info);
	            }
	          } else if (exec('on targetNode middle') === false) {
	            if (exec('at indent right') === true) {
	              targets['append prev'](info);
	            } else if (exec('at indent right') === false) {
	              targets['nothing'](info);
	            }
	          }
	        }
	      } else if (exec('targetNode at bottom') === true) {
	        if (exec('targetNode is 1st child') === true) {
	          if (exec('on targetNode middle') === false) {
	            if (exec('at left') === true) {
	              targets['after target parent'](info);
	            } else if (exec('at left') === false) {
	              targets['nothing'](info);
	            }
	          } else if (exec('on targetNode middle') === true) {
	            if (exec('at left') === false) {
	              targets['nothing'](info);
	            } else if (exec('at left') === true) {
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
	              } else if (exec('at indent right') === false) {
	                targets['nothing'](info);
	              }
	            }
	          } else if (exec('on targetNode middle') === true) {
	            if (exec('at left') === true) {
	              targets['after target parent'](info);
	            } else if (exec('at left') === false) {
	              if (exec('at indent right') === true) {
	                targets['append prev'](info);
	              } else if (exec('at indent right') === false) {
	                targets['nothing'](info);
	              }
	            }
	          }
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
	}

	autoMoveDragPlaceHolder.dragStart = function dragStart() {};

	autoMoveDragPlaceHolder.dragEnd = function dragEnd() {
	  prevTree = null;
	  droppableIds = {};
	  draggableIds = {};
	};

	var script$2 = {
	  "extends": __vue_component__,
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
	          drag: function drag(e, opt, store) {
	            autoMoveDragPlaceHolder.dragStart(); // this store is not tree

	            var draggableHelperInfo = {
	              event: e,
	              options: opt,
	              store: store
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
	              index: siblings.indexOf(_this.data)
	            }; //

	            dplh.innerStyle.height = store.el.offsetHeight + 'px';
	            insertAfter(dplh, _this.data);
	            _this.data["class"] += ' dragging'; // console.log('drag start');
	          },
	          moving: function moving(e, opt, store) {
	            if (store.movedCount === 0) {
	              return;
	            }

	            var draggableHelperInfo = {
	              event: e,
	              options: opt,
	              store: store
	            };
	            return autoMoveDragPlaceHolder.call(_this, draggableHelperInfo);
	          },
	          drop: function drop(e, opt, store) {
	            autoMoveDragPlaceHolder.dragEnd();
	            var draggableHelperInfo = {
	              event: e,
	              options: opt,
	              store: store
	            };

	            if (_this.store.ondragend && _this.store.ondragend(_this.data, draggableHelperInfo) === false) {
	              arrayRemove(dplh.parent.children, dplh); // can't drop, no change
	            } else {
	              var targetTree = dplh._vm.store;
	              var crossTree = targetTree !== _this.store;
	              var oldTree = crossTree ? _this.store : null;
	              insertAfter(_this.data, dplh);
	              arrayRemove(dplh.parent.children, dplh);
	              _this.data["class"] = _this.data["class"].replace(/(^| )dragging( |$)/g, ' ');
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
	var __vue_script__$2 = script$2;
	/* template */

	/* style */

	var __vue_inject_styles__$2 = undefined;
	/* scoped */

	var __vue_scope_id__$2 = undefined;
	/* module identifier */

	var __vue_module_identifier__$2 = undefined;
	/* functional template */

	var __vue_is_functional_template__$2 = undefined;
	/* style inject */

	/* style inject SSR */

	/* style inject shadow dom */

	var __vue_component__$2 = normalizeComponent({}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

	var trees = []; // for multiple trees
	// DragPlaceHolder, unique

	var dplh = {
	  _id: 'draggable_tree_drag_placeHolder',
	  level: null,
	  droppable: false,
	  isDragPlaceHolder: true,
	  "class": 'draggable-placeholder',
	  style: {},
	  innerStyle: {},
	  innerClass: 'draggable-placeholder-inner',
	  innerBackStyle: {},
	  innerBackClass: 'draggable-placeholder-inner-back' // children: [],

	};
	var script$3 = {
	  "extends": __vue_component__$1,
	  props: {
	    getTriggerEl: {
	      type: Function
	    },
	    draggable: {},
	    droppable: {
	      "default": true
	    },
	    crossTree: {},
	    ondragstart: {
	      type: Function
	    },
	    ondragend: {
	      type: Function
	    },
	    preventSelect: {
	      "default": true
	    }
	  },
	  components: {
	    TreeNode: __vue_component__$2
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
	var __vue_script__$3 = script$3;
	/* template */

	/* style */

	var __vue_inject_styles__$3 = undefined;
	/* scoped */

	var __vue_scope_id__$3 = undefined;
	/* module identifier */

	var __vue_module_identifier__$3 = undefined;
	/* functional template */

	var __vue_is_functional_template__$3 = undefined;
	/* style inject */

	/* style inject SSR */

	/* style inject shadow dom */

	var __vue_component__$3 = normalizeComponent({}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

	exports.DraggableTree = __vue_component__$3;
	exports.DraggableTreeNode = __vue_component__$2;
	exports.Tree = __vue_component__$1;
	exports.TreeNode = __vue_component__;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
