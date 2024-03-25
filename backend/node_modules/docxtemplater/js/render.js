"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require("./errors.js"),
  throwUnimplementedTagType = _require.throwUnimplementedTagType,
  XTScopeParserError = _require.XTScopeParserError;
var getResolvedId = require("./get-resolved-id.js");
function moduleRender(part, options) {
  var moduleRendered;
  for (var i = 0, l = options.modules.length; i < l; i++) {
    var _module = options.modules[i];
    moduleRendered = _module.render(part, options);
    if (moduleRendered) {
      return moduleRendered;
    }
  }
  return false;
}
function render(options) {
  var baseNullGetter = options.baseNullGetter;
  var compiled = options.compiled,
    scopeManager = options.scopeManager;
  options.nullGetter = function (part, sm) {
    return baseNullGetter(part, sm || scopeManager);
  };
  var errors = [];
  var parts = compiled.map(function (part, i) {
    options.index = i;
    var moduleRendered;
    try {
      moduleRendered = moduleRender(part, _objectSpread(_objectSpread({}, options), {}, {
        resolvedId: getResolvedId(part, options)
      }));
    } catch (e) {
      if (e instanceof XTScopeParserError) {
        errors.push(e);
        return part;
      }
      throw e;
    }
    if (moduleRendered) {
      if (moduleRendered.errors) {
        Array.prototype.push.apply(errors, moduleRendered.errors);
      }
      return moduleRendered;
    }
    if (part.type === "content" || part.type === "tag") {
      return part;
    }
    throwUnimplementedTagType(part, i);
  }).reduce(function (parts, _ref) {
    var value = _ref.value;
    if (value instanceof Array) {
      for (var i = 0, len = value.length; i < len; i++) {
        parts.push(value[i]);
      }
    } else if (value) {
      parts.push(value);
    }
    return parts;
  }, []);
  return {
    errors: errors,
    parts: parts
  };
}
module.exports = render;