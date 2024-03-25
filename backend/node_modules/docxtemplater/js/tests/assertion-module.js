"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function logContext(parsed, i) {
  var context = parsed.slice(i - 2, i + 2);
  // eslint-disable-next-line no-console
  console.log(JSON.stringify({
    context: context
  }));
}
function isArray(thing) {
  return thing instanceof Array;
}
function isObject(thing) {
  return thing instanceof Object && !isArray(thing);
}
function isString(thing) {
  return typeof thing === "string";
}
function verifyPart(part) {
  if (part == null) {
    throw new Error("postparsed contains nullish value");
  }
  if (!part) {
    throw new Error("postparsed contains falsy value");
  }
  if (typeof part.type !== "string") {
    throw new Error("postparsed contains part without type");
  }
  if (["content", "tag", "placeholder"].indexOf(part.type) === -1) {
    throw new Error("postparsed contains part with invalid type : '".concat(part.type, "'"));
  }
}
function verifyOptions(options) {
  if (!isString(options.contentType)) {
    throw new Error("contentType should be a string");
  }
  if (!isString(options.filePath)) {
    throw new Error("filePath should be a string");
  }
  if (!isString(options.fileType)) {
    throw new Error("fileType should be a string");
  }
  if (!isObject(options.fileTypeConfig)) {
    throw new Error("fileTypeConfig should be an object");
  }
  if (!isObject(options.cachedParsers)) {
    throw new Error("cachedParsers should be an object");
  }
}
var AssertionModule = /*#__PURE__*/function () {
  function AssertionModule() {
    _classCallCheck(this, AssertionModule);
    this.name = "AssertionModule";
  }
  _createClass(AssertionModule, [{
    key: "optionsTransformer",
    value: function optionsTransformer(options, docxtemplater) {
      docxtemplater.modules.forEach(function (module) {
        if (!module.name) {
          throw new Error("Unnamed module");
        }
      });
      return options;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new AssertionModule();
    }
  }, {
    key: "preparse",
    value: function preparse(parsed) {
      if (!isArray(parsed)) {
        throw new Error("Parsed should be an array");
      }
    }
  }, {
    key: "matchers",
    value: function matchers(options) {
      if (!isArray(options.modules)) {
        throw new Error("Options.modules should be an array");
      }
      return [];
    }
  }, {
    key: "parse",
    value: function parse(placeholderContent, options) {
      if (!isString(placeholderContent)) {
        throw new Error("placeholderContent should be a string");
      }
      var type = options.type,
        position = options.position,
        filePath = options.filePath,
        contentType = options.contentType,
        lIndex = options.lIndex;
      if (typeof type !== "string") {
        throw new Error("parsed contains part without type");
      }
      if (type !== "delimiter") {
        throw new Error("parsed contains part with invalid type : '".concat(type, "'"));
      }
      if (position !== "end") {
        throw new Error("parsed contains part with invalid position : '".concat(position, "'"));
      }
      if (typeof filePath !== "string" || filePath.length === 0) {
        throw new Error("parsed contains part without filePath");
      }
      if (typeof contentType !== "string" || contentType.length === 0) {
        throw new Error("parsed contains part without contentType");
      }
      if (!lIndex) {
        throw new Error("parsed contains part without lIndex");
      }
    }
  }, {
    key: "postparse",
    value: function postparse(parsed, options) {
      verifyOptions(options);
      if (!isArray(parsed)) {
        throw new Error("Parsed should be an array");
      }
      parsed.forEach(function (part, i) {
        try {
          verifyPart(part);
        } catch (e) {
          logContext(parsed, i);
          throw e;
        }
      });
    }
  }, {
    key: "resolve",
    value: function resolve(part, options) {
      verifyOptions(options);
    }
  }, {
    key: "render",
    value: function render(part, options) {
      verifyPart(part);
      verifyOptions(options);
      if (!isObject(part)) {
        throw new Error("part should be an object");
      }
    }
  }, {
    key: "postrender",
    value: function postrender(parts) {
      if (!isArray(parts)) {
        throw new Error("Parts should be an array");
      }
      return parts;
    }
  }]);
  return AssertionModule;
}();
module.exports = AssertionModule;