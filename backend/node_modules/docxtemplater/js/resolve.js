"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var getResolvedId = require("./get-resolved-id.js");
function moduleResolve(part, options) {
  var moduleResolved;
  for (var i = 0, l = options.modules.length; i < l; i++) {
    var _module = options.modules[i];
    moduleResolved = _module.resolve(part, options);
    if (moduleResolved) {
      return moduleResolved;
    }
  }
  return false;
}
function resolve(options) {
  var resolved = [];
  var baseNullGetter = options.baseNullGetter;
  var compiled = options.compiled,
    scopeManager = options.scopeManager;
  options.nullGetter = function (part, sm) {
    return baseNullGetter(part, sm || scopeManager);
  };
  options.resolved = resolved;
  var errors = [];
  return Promise.all(compiled.filter(function (part) {
    return ["content", "tag"].indexOf(part.type) === -1;
  }).reduce(function (promises, part) {
    options.resolvedId = getResolvedId(part, options);
    var moduleResolved = moduleResolve(part, _objectSpread(_objectSpread({}, options), {}, {
      resolvedId: getResolvedId(part, options)
    }));
    var result;
    if (moduleResolved) {
      result = moduleResolved.then(function (value) {
        resolved.push({
          tag: part.value,
          lIndex: part.lIndex,
          value: value
        });
      });
    } else if (part.type === "placeholder") {
      result = scopeManager.getValueAsync(part.value, {
        part: part
      }).then(function (value) {
        return value == null ? options.nullGetter(part) : value;
      }).then(function (value) {
        resolved.push({
          tag: part.value,
          lIndex: part.lIndex,
          value: value
        });
        return value;
      });
    } else {
      return;
    }
    promises.push(result["catch"](function (e) {
      if (e instanceof Array) {
        errors.push.apply(errors, _toConsumableArray(e));
      } else {
        errors.push(e);
      }
    }));
    return promises;
  }, [])).then(function () {
    return {
      errors: errors,
      resolved: resolved
    };
  });
}
module.exports = resolve;