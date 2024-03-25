"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require("../doc-utils.js"),
  setSingleAttribute = _require.setSingleAttribute,
  isTagStart = _require.isTagStart;

// We use a class here because this object is storing "state" in this.Lexer,
// this.zip, this.xmlDocuments
//
// In version 3.34.3 and before, the state could be overwritten if the module
// was attached to two docxtemplater instances
//
// Now, since the module will be cloned if already attached, it should work
// correctly even on multiple instances in parallel
var FixDocPRCorruptionModule = /*#__PURE__*/function () {
  function FixDocPRCorruptionModule() {
    _classCallCheck(this, FixDocPRCorruptionModule);
    this.name = "FixDocPRCorruptionModule";
  }
  _createClass(FixDocPRCorruptionModule, [{
    key: "clone",
    value: function clone() {
      return new FixDocPRCorruptionModule();
    }
  }, {
    key: "set",
    value: function set(options) {
      if (options.Lexer) {
        this.Lexer = options.Lexer;
      }
      if (options.zip) {
        this.zip = options.zip;
      }
      if (options.xmlDocuments) {
        this.xmlDocuments = options.xmlDocuments;
      }
    }
  }, {
    key: "on",
    value: function on(event) {
      var _this = this;
      // Stryker disable all : because this is an optimisation that won't make any tests fail
      if (event !== "syncing-zip") {
        return;
      }
      this.attached = false;
      // Stryker restore all
      var zip = this.zip;
      var Lexer = this.Lexer;
      var prId = 1;
      zip.file(/\.xml$/).forEach(function (f) {
        var xmlDoc = _this.xmlDocuments[f.name];
        if (xmlDoc) {
          var prs = xmlDoc.getElementsByTagName("wp:docPr");
          for (var i = 0, len = prs.length; i < len; i++) {
            var pr = prs[i];
            pr.setAttribute("id", prId++);
          }
          return;
        }
        var text = f.asText();
        var xmllexed = Lexer.xmlparse(text, {
          text: [],
          other: ["wp:docPr"]
        });
        if (xmllexed.length > 1) {
          text = xmllexed.reduce(function (fullText, part) {
            if (isTagStart("wp:docPr", part)) {
              return fullText + setSingleAttribute(part.value, "id", prId++);
            }
            return fullText + part.value;
          }, "");
        }
        zip.file(f.name, text);
      });
    }
  }]);
  return FixDocPRCorruptionModule;
}();
module.exports = new FixDocPRCorruptionModule();