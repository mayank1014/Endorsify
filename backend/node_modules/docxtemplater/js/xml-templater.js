"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require("./doc-utils.js"),
  wordToUtf8 = _require.wordToUtf8,
  convertSpaces = _require.convertSpaces;
var xmlMatcher = require("./xml-matcher.js");
var Lexer = require("./lexer.js");
var Parser = require("./parser.js");
var _render = require("./render.js");
var postrender = require("./postrender.js");
var resolve = require("./resolve.js");
var joinUncorrupt = require("./join-uncorrupt.js");
function _getFullText(content, tagsXmlArray) {
  var matcher = xmlMatcher(content, tagsXmlArray);
  var result = matcher.matches.map(function (match) {
    return match.array[2];
  });
  return wordToUtf8(convertSpaces(result.join("")));
}
module.exports = /*#__PURE__*/function () {
  function XmlTemplater(content, options) {
    var _this = this;
    _classCallCheck(this, XmlTemplater);
    this.cachedParsers = {};
    this.content = content;
    Object.keys(options).forEach(function (key) {
      _this[key] = options[key];
    });
    this.setModules({
      inspect: {
        filePath: options.filePath
      }
    });
  }
  _createClass(XmlTemplater, [{
    key: "resolveTags",
    value: function resolveTags(tags) {
      var _this2 = this;
      this.tags = tags;
      var options = this.getOptions();
      var filePath = this.filePath;
      options.scopeManager = this.scopeManager;
      options.resolve = resolve;
      var errors = [];
      return Promise.all(this.modules.map(function (module) {
        return Promise.resolve(module.preResolve(options))["catch"](function (e) {
          errors.push(e);
        });
      })).then(function () {
        if (errors.length !== 0) {
          throw errors;
        }
        return resolve(options).then(function (_ref) {
          var resolved = _ref.resolved,
            errors = _ref.errors;
          errors = errors.map(function (error) {
            // If a string is thrown, convert it to a real Error
            if (!(error instanceof Error)) {
              error = new Error(error);
            }
            // error properties might not be defined if some foreign error
            // (unhandled error not thrown by docxtemplater willingly) is
            // thrown.
            error.properties = error.properties || {};
            error.properties.file = filePath;
            return error;
          });
          if (errors.length !== 0) {
            throw errors;
          }
          return Promise.all(resolved).then(function (resolved) {
            options.scopeManager.root.finishedResolving = true;
            options.scopeManager.resolved = resolved;
            _this2.setModules({
              inspect: {
                resolved: resolved,
                filePath: filePath
              }
            });
            return resolved;
          });
        });
      });
    }
  }, {
    key: "getFullText",
    value: function getFullText() {
      return _getFullText(this.content, this.fileTypeConfig.tagsXmlTextArray);
    }
  }, {
    key: "setModules",
    value: function setModules(obj) {
      this.modules.forEach(function (module) {
        module.set(obj);
      });
    }
  }, {
    key: "preparse",
    value: function preparse() {
      this.allErrors = [];
      this.xmllexed = Lexer.xmlparse(this.content, {
        text: this.fileTypeConfig.tagsXmlTextArray,
        other: this.fileTypeConfig.tagsXmlLexedArray
      });
      this.setModules({
        inspect: {
          filePath: this.filePath,
          xmllexed: this.xmllexed
        }
      });
      var _Lexer$parse = Lexer.parse(this.xmllexed, this.delimiters, this.syntax, this.fileType),
        lexed = _Lexer$parse.lexed,
        lexerErrors = _Lexer$parse.errors;
      this.allErrors = this.allErrors.concat(lexerErrors);
      this.lexed = lexed;
      this.setModules({
        inspect: {
          filePath: this.filePath,
          lexed: this.lexed
        }
      });
      var options = this.getOptions();
      Parser.preparse(this.lexed, this.modules, options);
    }
  }, {
    key: "parse",
    value: function parse() {
      this.setModules({
        inspect: {
          filePath: this.filePath
        }
      });
      var options = this.getOptions();
      this.parsed = Parser.parse(this.lexed, this.modules, options);
      this.setModules({
        inspect: {
          filePath: this.filePath,
          parsed: this.parsed
        }
      });
      var _Parser$postparse = Parser.postparse(this.parsed, this.modules, options),
        postparsed = _Parser$postparse.postparsed,
        postparsedErrors = _Parser$postparse.errors;
      this.postparsed = postparsed;
      this.setModules({
        inspect: {
          filePath: this.filePath,
          postparsed: this.postparsed
        }
      });
      this.allErrors = this.allErrors.concat(postparsedErrors);
      this.errorChecker(this.allErrors);
      return this;
    }
  }, {
    key: "errorChecker",
    value: function errorChecker(errors) {
      var _this3 = this;
      errors.forEach(function (error) {
        // error properties might not be defined if some foreign
        // (unhandled error not thrown by docxtemplater willingly) is
        // thrown.
        error.properties = error.properties || {};
        error.properties.file = _this3.filePath;
      });
      this.modules.forEach(function (module) {
        errors = module.errorsTransformer(errors);
      });
    }
  }, {
    key: "baseNullGetter",
    value: function baseNullGetter(part, sm) {
      var _this4 = this;
      var value = this.modules.reduce(function (value, module) {
        if (value != null) {
          return value;
        }
        return module.nullGetter(part, sm, _this4);
      }, null);
      if (value != null) {
        return value;
      }
      return this.nullGetter(part, sm);
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return {
        compiled: this.postparsed,
        cachedParsers: this.cachedParsers,
        tags: this.tags,
        modules: this.modules,
        parser: this.parser,
        contentType: this.contentType,
        relsType: this.relsType,
        baseNullGetter: this.baseNullGetter.bind(this),
        filePath: this.filePath,
        fileTypeConfig: this.fileTypeConfig,
        fileType: this.fileType,
        linebreaks: this.linebreaks
      };
    }
  }, {
    key: "render",
    value: function render(to) {
      this.filePath = to;
      var options = this.getOptions();
      options.resolved = this.scopeManager.resolved;
      options.scopeManager = this.scopeManager;
      options.render = _render;
      options.joinUncorrupt = joinUncorrupt;
      var _render2 = _render(options),
        errors = _render2.errors,
        parts = _render2.parts;
      if (errors.length > 0) {
        this.allErrors = errors;
        this.errorChecker(errors);
        return this;
      }
      this.content = postrender(parts, options);
      this.setModules({
        inspect: {
          filePath: this.filePath,
          content: this.content
        }
      });
      return this;
    }
  }]);
  return XmlTemplater;
}();