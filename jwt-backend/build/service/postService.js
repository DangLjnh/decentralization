"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj &&
              "function" == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          }),
    _typeof(obj)
  );
}
function _regeneratorRuntime() {
  "use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime =
    function _regeneratorRuntime() {
      return exports;
    };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty =
      Object.defineProperty ||
      function (obj, key, desc) {
        obj[key] = desc.value;
      },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return (
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      }),
      obj[key]
    );
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return (obj[key] = value);
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator =
        outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return (
      defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context),
      }),
      generator
    );
  }
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype &&
    NativeIteratorPrototype !== Op &&
    hasOwn.call(NativeIteratorPrototype, iteratorSymbol) &&
    (IteratorPrototype = NativeIteratorPrototype);
  var Gp =
    (GeneratorFunctionPrototype.prototype =
    Generator.prototype =
      Object.create(IteratorPrototype));
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value &&
          "object" == _typeof(value) &&
          hasOwn.call(value, "__await")
          ? PromiseImpl.resolve(value.__await).then(
              function (value) {
                invoke("next", value, resolve, reject);
              },
              function (err) {
                invoke("throw", err, resolve, reject);
              }
            )
          : PromiseImpl.resolve(value).then(
              function (unwrapped) {
                (result.value = unwrapped), resolve(result);
              },
              function (error) {
                return invoke("throw", error, resolve, reject);
              }
            );
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return (previousPromise = previousPromise
          ? previousPromise.then(
              callInvokeWithMethodAndArg,
              callInvokeWithMethodAndArg
            )
          : callInvokeWithMethodAndArg());
      },
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state)
        throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg; ; ) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method)
          context.sent = context._sent = context.arg;
        else if ("throw" === context.method) {
          if ("suspendedStart" === state)
            throw ((state = "completed"), context.arg);
          context.dispatchException(context.arg);
        } else
          "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (
            ((state = context.done ? "completed" : "suspendedYield"),
            record.arg === ContinueSentinel)
          )
            continue;
          return { value: record.arg, done: context.done };
        }
        "throw" === record.type &&
          ((state = "completed"),
          (context.method = "throw"),
          (context.arg = record.arg));
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method)
      return (
        (context.delegate = null),
        ("throw" === methodName &&
          delegate.iterator["return"] &&
          ((context.method = "return"),
          (context.arg = undefined),
          maybeInvokeDelegate(delegate, context),
          "throw" === context.method)) ||
          ("return" !== methodName &&
            ((context.method = "throw"),
            (context.arg = new TypeError(
              "The iterator does not provide a '" + methodName + "' method"
            )))),
        ContinueSentinel
      );
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type)
      return (
        (context.method = "throw"),
        (context.arg = record.arg),
        (context.delegate = null),
        ContinueSentinel
      );
    var info = record.arg;
    return info
      ? info.done
        ? ((context[delegate.resultName] = info.value),
          (context.next = delegate.nextLoc),
          "return" !== context.method &&
            ((context.method = "next"), (context.arg = undefined)),
          (context.delegate = null),
          ContinueSentinel)
        : info
      : ((context.method = "throw"),
        (context.arg = new TypeError("iterator result is not an object")),
        (context.delegate = null),
        ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };
    1 in locs && (entry.catchLoc = locs[1]),
      2 in locs && ((entry.finallyLoc = locs[2]), (entry.afterLoc = locs[3])),
      this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    (record.type = "normal"), delete record.arg, (entry.completion = record);
  }
  function Context(tryLocsList) {
    (this.tryEntries = [{ tryLoc: "root" }]),
      tryLocsList.forEach(pushTryEntry, this),
      this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length; ) {
              if (hasOwn.call(iterable, i))
                return (next.value = iterable[i]), (next.done = !1), next;
            }
            return (next.value = undefined), (next.done = !0), next;
          };
        return (next.next = next);
      }
    }
    return { next: doneResult };
  }
  function doneResult() {
    return { value: undefined, done: !0 };
  }
  return (
    (GeneratorFunction.prototype = GeneratorFunctionPrototype),
    defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0,
    }),
    defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0,
    }),
    (GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    )),
    (exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return (
        !!ctor &&
        (ctor === GeneratorFunction ||
          "GeneratorFunction" === (ctor.displayName || ctor.name))
      );
    }),
    (exports.mark = function (genFun) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype)
          : ((genFun.__proto__ = GeneratorFunctionPrototype),
            define(genFun, toStringTagSymbol, "GeneratorFunction")),
        (genFun.prototype = Object.create(Gp)),
        genFun
      );
    }),
    (exports.awrap = function (arg) {
      return { __await: arg };
    }),
    defineIteratorMethods(AsyncIterator.prototype),
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }),
    (exports.AsyncIterator = AsyncIterator),
    (exports.async = function (
      innerFn,
      outerFn,
      self,
      tryLocsList,
      PromiseImpl
    ) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );
      return exports.isGeneratorFunction(outerFn)
        ? iter
        : iter.next().then(function (result) {
            return result.done ? result.value : iter.next();
          });
    }),
    defineIteratorMethods(Gp),
    define(Gp, toStringTagSymbol, "Generator"),
    define(Gp, iteratorSymbol, function () {
      return this;
    }),
    define(Gp, "toString", function () {
      return "[object Generator]";
    }),
    (exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) {
        keys.push(key);
      }
      return (
        keys.reverse(),
        function next() {
          for (; keys.length; ) {
            var key = keys.pop();
            if (key in object)
              return (next.value = key), (next.done = !1), next;
          }
          return (next.done = !0), next;
        }
      );
    }),
    (exports.values = values),
    (Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = undefined),
          (this.done = !1),
          (this.delegate = null),
          (this.method = "next"),
          (this.arg = undefined),
          this.tryEntries.forEach(resetTryEntry),
          !skipTempReset)
        )
          for (var name in this) {
            "t" === name.charAt(0) &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1)) &&
              (this[name] = undefined);
          }
      },
      stop: function stop() {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return (
            (record.type = "throw"),
            (record.arg = exception),
            (context.next = loc),
            caught && ((context.method = "next"), (context.arg = undefined)),
            !!caught
          );
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally)
                throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (
            entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc
          ) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry &&
          ("break" === type || "continue" === type) &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc &&
          (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return (
          (record.type = type),
          (record.arg = arg),
          finallyEntry
            ? ((this.method = "next"),
              (this.next = finallyEntry.finallyLoc),
              ContinueSentinel)
            : this.complete(record)
        );
      },
      complete: function complete(record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return (
          "break" === record.type || "continue" === record.type
            ? (this.next = record.arg)
            : "return" === record.type
            ? ((this.rval = this.arg = record.arg),
              (this.method = "return"),
              (this.next = "end"))
            : "normal" === record.type && afterLoc && (this.next = afterLoc),
          ContinueSentinel
        );
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc)
            return (
              this.complete(entry.completion, entry.afterLoc),
              resetTryEntry(entry),
              ContinueSentinel
            );
        }
      },
      catch: function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        return (
          (this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc,
          }),
          "next" === this.method && (this.arg = undefined),
          ContinueSentinel
        );
      },
    }),
    exports
  );
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
var db = require("../models");
var cloudinary = require("cloudinary").v2;
var streamifier = require("streamifier");

//upload file to cloudinary
var uploadFromBuffer = function uploadFromBuffer(request) {
  return new Promise(function (resolve, reject) {
    var cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: "foo",
      },
      function (error, result) {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(request.data).pipe(cld_upload_stream);
  });
};
var updatePostApi = /*#__PURE__*/ (function () {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(file, data) {
      var _ref2, url, public_id, dataPost, totalData, post, res;
      return _regeneratorRuntime().wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.t0 = file !== undefined;
                if (!_context.t0) {
                  _context.next = 5;
                  break;
                }
                _context.next = 4;
                return uploadFromBuffer(file);
              case 4:
                _context.t0 = _context.sent;
              case 5:
                _ref2 = _context.t0;
                url = _ref2.url;
                public_id = _ref2.public_id;
                dataPost = JSON.parse(data);
                totalData = _objectSpread(
                  _objectSpread({}, dataPost),
                  {},
                  {
                    categoryID: +dataPost.categoryID,
                    photoURL: file !== undefined ? url : dataPost.photoURL,
                    status: "ACTIVE",
                    publicID:
                      file !== undefined ? public_id : dataPost.publicID,
                  }
                );
                _context.prev = 10;
                _context.next = 13;
                return db.Post.findOne({
                  where: {
                    zz: dataPost.postID,
                  },
                });
              case 13:
                post = _context.sent;
                if (!post) {
                  _context.next = 20;
                  break;
                }
                file !== undefined &&
                  cloudinary.uploader.destroy(
                    dataPost.publicID,
                    function (error, result) {
                      console.log(result, error);
                    }
                  );
                _context.next = 18;
                return db.Post.update(totalData, {
                  where: {
                    id: dataPost.postID,
                  },
                });
              case 18:
                res = _context.sent;
                return _context.abrupt("return", {
                  EM: "Update post successfully",
                  EC: 0,
                  DT: {},
                });
              case 20:
                _context.next = 26;
                break;
              case 22:
                _context.prev = 22;
                _context.t1 = _context["catch"](10);
                console.log(_context.t1);
                return _context.abrupt("return", {
                  EM: "Something wrong with services",
                  EC: 1,
                  DT: [],
                });
              case 26:
              case "end":
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [[10, 22]]
      );
    })
  );
  return function updatePostApi(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
var createNewPost = /*#__PURE__*/ (function () {
  var _ref3 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2(file, data) {
      var _yield$uploadFromBuff, url, public_id, dataPost, totalData;
      return _regeneratorRuntime().wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.next = 2;
                return uploadFromBuffer(file);
              case 2:
                _yield$uploadFromBuff = _context2.sent;
                url = _yield$uploadFromBuff.url;
                public_id = _yield$uploadFromBuff.public_id;
                dataPost = JSON.parse(data);
                totalData = _objectSpread(
                  _objectSpread({}, dataPost),
                  {},
                  {
                    categoryID: +dataPost.categoryID,
                    photoURL: url,
                    status: "ACTIVE",
                    publicID: public_id,
                  }
                );
                _context2.prev = 7;
                _context2.next = 10;
                return db.Post.create(totalData);
              case 10:
                return _context2.abrupt("return", {
                  EM: "Create post successfully",
                  EC: 0,
                  DT: {},
                });
              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](7);
                console.log(_context2.t0);
                return _context2.abrupt("return", {
                  EM: "Something wrong with services",
                  EC: 1,
                  DT: [],
                });
              case 17:
              case "end":
                return _context2.stop();
            }
          }
        },
        _callee2,
        null,
        [[7, 13]]
      );
    })
  );
  return function createNewPost(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
})();
var readPostApi = /*#__PURE__*/ (function () {
  var _ref4 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee3() {
      var data;
      return _regeneratorRuntime().wrap(
        function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return db.Post.findAll({
                  attributes: [
                    "postID",
                    "userID",
                    "categoryID",
                    "name",
                    "slug",
                    "photoURL",
                    "publicID",
                    "hot",
                    "content",
                    "createdAt",
                  ],
                  include: [
                    {
                      model: db.User,
                      attributes: ["id", "email", "username", "groupID"],
                    },
                    {
                      model: db.Category,
                      attributes: ["id", "name", "slug"],
                    },
                  ],
                  raw: true,
                  nest: true,
                });
              case 3:
                data = _context3.sent;
                return _context3.abrupt("return", {
                  EM: "Get all post successful!",
                  EC: 0,
                  DT: data,
                });
              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                console.log(_context3.t0);
                return _context3.abrupt("return", {
                  EM: "Something wrong with services",
                  EC: 1,
                  DT: [],
                });
              case 11:
              case "end":
                return _context3.stop();
            }
          }
        },
        _callee3,
        null,
        [[0, 7]]
      );
    })
  );
  return function readPostApi() {
    return _ref4.apply(this, arguments);
  };
})();
var readPostIemBySlugApi = /*#__PURE__*/ (function () {
  var _ref5 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee4(slug) {
      var data;
      return _regeneratorRuntime().wrap(
        function _callee4$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return db.Post.findOne({
                  where: {
                    slug: slug,
                  },
                  attributes: [
                    "postID",
                    "name",
                    "slug",
                    "photoURL",
                    "publicID",
                    "hot",
                    "content",
                    "createdAt",
                  ],
                  include: [
                    {
                      model: db.User,
                      attributes: ["id", "email", "username", "groupID"],
                    },
                    {
                      model: db.Category,
                      attributes: ["id", "name", "slug"],
                    },
                  ],
                  raw: true,
                  nest: true,
                });
              case 3:
                data = _context4.sent;
                return _context4.abrupt("return", {
                  EM: "Get all post successful!",
                  EC: 0,
                  DT: data,
                });
              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                console.log(_context4.t0);
                return _context4.abrupt("return", {
                  EM: "Something wrong with services",
                  EC: 1,
                  DT: [],
                });
              case 11:
              case "end":
                return _context4.stop();
            }
          }
        },
        _callee4,
        null,
        [[0, 7]]
      );
    })
  );
  return function readPostIemBySlugApi(_x5) {
    return _ref5.apply(this, arguments);
  };
})();
var readHotPostApi = /*#__PURE__*/ (function () {
  var _ref6 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee5() {
      var data;
      return _regeneratorRuntime().wrap(
        function _callee5$(_context5) {
          while (1) {
            switch ((_context5.prev = _context5.next)) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return db.Post.findAll({
                  where: {
                    hot: false,
                  },
                  attributes: [
                    "postID",
                    "name",
                    "slug",
                    "photoURL",
                    "publicID",
                    "hot",
                    "content",
                    "createdAt",
                  ],
                  include: [
                    {
                      model: db.User,
                      attributes: ["id", "email", "username", "groupID"],
                    },
                    {
                      model: db.Category,
                      attributes: ["id", "name", "slug"],
                    },
                  ],
                  raw: true,
                  nest: true,
                });
              case 3:
                data = _context5.sent;
                return _context5.abrupt("return", {
                  EM: "Get all post successful!",
                  EC: 0,
                  DT: data,
                });
              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](0);
                console.log(_context5.t0);
                return _context5.abrupt("return", {
                  EM: "Something wrong with services",
                  EC: 1,
                  DT: [],
                });
              case 11:
              case "end":
                return _context5.stop();
            }
          }
        },
        _callee5,
        null,
        [[0, 7]]
      );
    })
  );
  return function readHotPostApi() {
    return _ref6.apply(this, arguments);
  };
})();
var readRelatedApi = /*#__PURE__*/ (function () {
  var _ref7 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee6(categoryID) {
      var data;
      return _regeneratorRuntime().wrap(
        function _callee6$(_context6) {
          while (1) {
            switch ((_context6.prev = _context6.next)) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return db.Post.findAll({
                  where: {
                    categoryID: categoryID,
                  },
                  attributes: [
                    "postID",
                    "name",
                    "slug",
                    "photoURL",
                    "publicID",
                    "hot",
                    "content",
                    "createdAt",
                  ],
                  include: [
                    {
                      model: db.User,
                      attributes: ["id", "email", "username", "groupID"],
                    },
                    {
                      model: db.Category,
                      attributes: ["id", "name", "slug"],
                    },
                  ],
                  raw: true,
                  nest: true,
                });
              case 3:
                data = _context6.sent;
                return _context6.abrupt("return", {
                  EM: "Get all post successful!",
                  EC: 0,
                  DT: data,
                });
              case 7:
                _context6.prev = 7;
                _context6.t0 = _context6["catch"](0);
                console.log(_context6.t0);
                return _context6.abrupt("return", {
                  EM: "Something wrong with services",
                  EC: 1,
                  DT: [],
                });
              case 11:
              case "end":
                return _context6.stop();
            }
          }
        },
        _callee6,
        null,
        [[0, 7]]
      );
    })
  );
  return function readRelatedApi(_x6) {
    return _ref7.apply(this, arguments);
  };
})();
var readPostByCategoryApi = /*#__PURE__*/ (function () {
  var _ref8 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee7(slug) {
      var data;
      return _regeneratorRuntime().wrap(
        function _callee7$(_context7) {
          while (1) {
            switch ((_context7.prev = _context7.next)) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return db.Post.findAll({
                  attributes: [
                    "postID",
                    "name",
                    "slug",
                    "photoURL",
                    "publicID",
                    "hot",
                    "content",
                    "createdAt",
                  ],
                  include: [
                    {
                      model: db.User,
                      attributes: ["id", "email", "username", "groupID"],
                    },
                    {
                      model: db.Category,
                      where: {
                        slug: slug,
                      },
                      attributes: ["id", "name", "slug"],
                    },
                  ],
                  raw: true,
                  nest: true,
                });
              case 3:
                data = _context7.sent;
                return _context7.abrupt("return", {
                  EM: "Get all post successful!",
                  EC: 0,
                  DT: data,
                });
              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7["catch"](0);
                console.log(_context7.t0);
                return _context7.abrupt("return", {
                  EM: "Something wrong with services",
                  EC: 1,
                  DT: [],
                });
              case 11:
              case "end":
                return _context7.stop();
            }
          }
        },
        _callee7,
        null,
        [[0, 7]]
      );
    })
  );
  return function readPostByCategoryApi(_x7) {
    return _ref8.apply(this, arguments);
  };
})();
var readPostByUsernameApi = /*#__PURE__*/ (function () {
  var _ref9 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee8(username) {
      var data;
      return _regeneratorRuntime().wrap(
        function _callee8$(_context8) {
          while (1) {
            switch ((_context8.prev = _context8.next)) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return db.Post.findAll({
                  attributes: [
                    "postID",
                    "name",
                    "slug",
                    "photoURL",
                    "publicID",
                    "hot",
                    "content",
                    "createdAt",
                  ],
                  include: [
                    {
                      model: db.User,
                      where: {
                        username: username,
                      },
                      attributes: ["id", "email", "username", "groupID"],
                    },
                    {
                      model: db.Category,
                      attributes: ["id", "name", "slug"],
                    },
                  ],
                  raw: true,
                  nest: true,
                });
              case 3:
                data = _context8.sent;
                return _context8.abrupt("return", {
                  EM: "Get all post successful!",
                  EC: 0,
                  DT: data,
                });
              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8["catch"](0);
                console.log(_context8.t0);
                return _context8.abrupt("return", {
                  EM: "Something wrong with services",
                  EC: 1,
                  DT: [],
                });
              case 11:
              case "end":
                return _context8.stop();
            }
          }
        },
        _callee8,
        null,
        [[0, 7]]
      );
    })
  );
  return function readPostByUsernameApi(_x8) {
    return _ref9.apply(this, arguments);
  };
})();
var searchPostApi = /*#__PURE__*/ (function () {
  var _ref10 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee9(keyword) {
      var listPost, searchListPost;
      return _regeneratorRuntime().wrap(
        function _callee9$(_context9) {
          while (1) {
            switch ((_context9.prev = _context9.next)) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return db.Post.findAll({
                  attributes: [
                    "postID",
                    "name",
                    "slug",
                    "photoURL",
                    "publicID",
                    "hot",
                    "content",
                    "createdAt",
                  ],
                  include: [
                    {
                      model: db.User,
                      attributes: ["id", "email", "username", "groupID"],
                    },
                    {
                      model: db.Category,
                      attributes: ["id", "name", "slug"],
                    },
                  ],
                  raw: true,
                  nest: true,
                });
              case 3:
                listPost = _context9.sent;
                searchListPost = listPost.filter(function (item) {
                  return item.slug
                    .toLowerCase()
                    .includes(keyword.toLowerCase());
                });
                return _context9.abrupt("return", {
                  EM: "Get post by keyword successful!",
                  EC: 0,
                  DT: searchListPost,
                });
              case 8:
                _context9.prev = 8;
                _context9.t0 = _context9["catch"](0);
                console.log(_context9.t0);
                return _context9.abrupt("return", {
                  EM: "Something wrong with services",
                  EC: 1,
                  DT: [],
                });
              case 12:
              case "end":
                return _context9.stop();
            }
          }
        },
        _callee9,
        null,
        [[0, 8]]
      );
    })
  );
  return function searchPostApi(_x9) {
    return _ref10.apply(this, arguments);
  };
})();
var deletePostApi = /*#__PURE__*/ (function () {
  var _ref12 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee10(_ref11) {
      var postID, publicID, post;
      return _regeneratorRuntime().wrap(
        function _callee10$(_context10) {
          while (1) {
            switch ((_context10.prev = _context10.next)) {
              case 0:
                (postID = _ref11.postID), (publicID = _ref11.publicID);
                _context10.prev = 1;
                _context10.next = 4;
                return db.Post.findOne({
                  where: {
                    id: postID,
                  },
                });
              case 4:
                post = _context10.sent;
                if (!post) {
                  _context10.next = 12;
                  break;
                }
                cloudinary.uploader.destroy(publicID, function (error, result) {
                  // console.log(result, error);
                });
                _context10.next = 9;
                return db.Post.destroy({
                  where: {
                    id: postID,
                  },
                });
              case 9:
                return _context10.abrupt("return", {
                  EM: "Delete post successfully",
                  EC: 0,
                  DT: [],
                });
              case 12:
                return _context10.abrupt("return", {
                  EM: "Post doesn't exist",
                  EC: 1,
                  DT: [],
                });
              case 13:
                _context10.next = 19;
                break;
              case 15:
                _context10.prev = 15;
                _context10.t0 = _context10["catch"](1);
                console.log(_context10.t0);
                return _context10.abrupt("return", {
                  EM: "Something wrong with services",
                  EC: 1,
                  DT: [],
                });
              case 19:
              case "end":
                return _context10.stop();
            }
          }
        },
        _callee10,
        null,
        [[1, 15]]
      );
    })
  );
  return function deletePostApi(_x10) {
    return _ref12.apply(this, arguments);
  };
})();
module.exports = {
  createNewPost: createNewPost,
  readPostApi: readPostApi,
  readHotPostApi: readHotPostApi,
  readRelatedApi: readRelatedApi,
  readPostIemBySlugApi: readPostIemBySlugApi,
  updatePostApi: updatePostApi,
  deletePostApi: deletePostApi,
  readPostByCategoryApi: readPostByCategoryApi,
  readPostByUsernameApi: readPostByUsernameApi,
  searchPostApi: searchPostApi,
};
