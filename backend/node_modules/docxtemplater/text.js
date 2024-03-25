"use strict";

var Lexer = require("./js/lexer.js");
var Parser = require("./js/parser.js");
var DocUtils = require("./js/doc-utils.js");
var createScope = require("./js/scope-manager.js");
var utf8decode = require("./js/uintarray-to-string.js");
var defaults = DocUtils.defaults;
var _require = require("./js/errors.js"),
  throwMultiError = _require.throwMultiError;
var renderModule = require("./js/modules/render.js");
var loopModule = require("./js/modules/loop.js");
var expandPairTrait = require("./js/modules/expand-pair-trait.js");
var XmlTemplater = require("./js/xml-templater.js");
function TxtTemplater(text) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var filePath = "text";
  var xmlt = new XmlTemplater(text, {
    modules: []
  });
  xmlt.fileType = "text";
  xmlt.fileTypeConfig = options.fileTypeConfig = {
    droppedTagsInsidePlaceholder: [],
    expandTags: []
  };
  this.fileTypeConfig = options.fileTypeConfig;
  Object.keys(defaults).forEach(function (key) {
    var defaultValue = defaults[key];
    xmlt[key] = options[key] = options[key] != null ? options[key] : defaultValue;
  });
  xmlt.modules = [loopModule(), expandPairTrait(), renderModule()];
  xmlt.modules.forEach(function (module) {
    module.optionsTransformer(options, {
      fileTypeConfig: xmlt.fileTypeConfig,
      parser: xmlt.parser,
      options: xmlt
    });
  });
  xmlt.allErrors = [];
  // Fake XML parsing : surround the text with an empty tag of type text: true
  xmlt.xmllexed = [{
    type: "tag",
    position: "start",
    value: "",
    text: true
  }, {
    type: "content",
    value: text
  }, {
    type: "tag",
    position: "end",
    value: ""
  }];
  xmlt.setModules({
    inspect: {
      filePath: filePath,
      xmllexed: xmlt.xmllexed
    }
  });
  var _Lexer$parse = Lexer.parse(xmlt.xmllexed, xmlt.delimiters, xmlt.syntax, xmlt.fileType),
    lexed = _Lexer$parse.lexed,
    lexerErrors = _Lexer$parse.errors;
  xmlt.allErrors = xmlt.allErrors.concat(lexerErrors);
  xmlt.lexed = lexed;
  xmlt.setModules({
    inspect: {
      filePath: filePath,
      lexed: xmlt.lexed
    }
  });
  Parser.preparse(xmlt.lexed, xmlt.modules, xmlt.getOptions());
  xmlt.parse();
  if (xmlt.allErrors.length > 0) {
    throwMultiError(xmlt.allErrors);
  }
  this.render = function (tags) {
    xmlt.scopeManager = createScope({
      tags: tags,
      parser: xmlt.parser
    });
    return utf8decode(xmlt.render().content);
  };
  return this;
}
module.exports = TxtTemplater;