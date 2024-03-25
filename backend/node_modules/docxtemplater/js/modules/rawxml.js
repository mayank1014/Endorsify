"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var traits = require("../traits.js");
var _require = require("../doc-utils.js"),
  isContent = _require.isContent;
var _require2 = require("../errors.js"),
  throwRawTagShouldBeOnlyTextInParagraph = _require2.throwRawTagShouldBeOnlyTextInParagraph,
  getInvalidRawXMLValueException = _require2.getInvalidRawXMLValueException;
var moduleName = "rawxml";
var wrapper = require("../module-wrapper.js");
function getInner(_ref) {
  var part = _ref.part,
    left = _ref.left,
    right = _ref.right,
    postparsed = _ref.postparsed,
    index = _ref.index;
  var paragraphParts = postparsed.slice(left + 1, right);
  paragraphParts.forEach(function (p, i) {
    if (i === index - left - 1) {
      return;
    }
    if (isContent(p)) {
      throwRawTagShouldBeOnlyTextInParagraph({
        paragraphParts: paragraphParts,
        part: part
      });
    }
  });
  return part;
}
var RawXmlModule = /*#__PURE__*/function () {
  function RawXmlModule() {
    _classCallCheck(this, RawXmlModule);
    this.name = "RawXmlModule";
    this.prefix = "@";
  }
  _createClass(RawXmlModule, [{
    key: "optionsTransformer",
    value: function optionsTransformer(options, docxtemplater) {
      this.fileTypeConfig = docxtemplater.fileTypeConfig;
      return options;
    }
  }, {
    key: "matchers",
    value: function matchers() {
      return [[this.prefix, moduleName]];
    }
  }, {
    key: "postparse",
    value: function postparse(postparsed) {
      return traits.expandToOne(postparsed, {
        moduleName: moduleName,
        getInner: getInner,
        expandTo: this.fileTypeConfig.tagRawXml,
        error: {
          message: "Raw tag not in paragraph",
          id: "raw_tag_outerxml_invalid",
          explanation: function explanation(part) {
            return "The tag \"".concat(part.value, "\" is not inside a paragraph, putting raw tags inside an inline loop is disallowed.");
          }
        }
      });
    }
  }, {
    key: "render",
    value: function render(part, options) {
      if (part.module !== moduleName) {
        return null;
      }
      var value;
      var errors = [];
      try {
        value = options.scopeManager.getValue(part.value, {
          part: part
        });
        if (value == null) {
          value = options.nullGetter(part);
        }
      } catch (e) {
        errors.push(e);
        return {
          errors: errors
        };
      }
      value = value ? value : "";
      if (typeof value === "string") {
        return {
          value: value
        };
      }
      return {
        errors: [getInvalidRawXMLValueException({
          tag: part.value,
          value: value,
          offset: part.offset
        })]
      };
    }
  }]);
  return RawXmlModule;
}();
module.exports = function () {
  return wrapper(new RawXmlModule());
};