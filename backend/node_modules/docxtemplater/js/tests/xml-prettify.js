"use strict";

/* eslint-disable complexity */
var repeat = require("./string-repeat.js");
function getIndent(indent) {
  return repeat("    ", indent);
}
var attributeRegex = /<[A-Za-z0-9:]+ (.*?)([/ ]*)>/;
function normalizeValue(value) {
  return value.replace(/&#([0-9]+);/g, function (_, _int) {
    return "&#x".concat(parseInt(_int, 10).toString(16).toUpperCase(), ";");
  });
}
function attributeSorter(ln, namespaces) {
  var rest;
  if (attributeRegex.test(ln)) {
    rest = ln.replace(attributeRegex, "$1");
  }
  var attrRegex = / *([a-zA-Z0-9:]+)="([^"]+)"/g;
  var match = attrRegex.exec(rest);
  var attributes = [];
  var _loop = function _loop() {
    // matched text: match[0]
    // match start: match.index
    // capturing group n: match[n]
    var key = match[1];
    var value = match[2];
    value = normalizeValue(value);
    var found = false;
    namespaces.forEach(function (ns) {
      if (ns) {
        ns.forEach(function (n) {
          if (n.key === key && n.value === value) {
            found = true;
          }
        });
      }
    });
    if (!found) {
      attributes.push({
        key: key,
        value: value
      });
    }
    match = attrRegex.exec(rest);
  };
  while (match != null) {
    _loop();
  }
  attributes.sort(function (a1, a2) {
    if (a1.key === a2.key) {
      return 0;
    }
    return a1.key > a2.key ? 1 : -1;
  });
  var stringifiedAttrs = attributes.map(function (attribute) {
    return "".concat(attribute.key, "=\"").concat(attribute.value, "\"");
  }).join(" ");
  if (rest != null) {
    ln = ln.replace(rest, stringifiedAttrs).replace(/ +>/, ">");
  }
  return {
    replacement: ln,
    attributes: attributes
  };
}
function xmlprettify(xml) {
  var result = "",
    skip = 0,
    indent = 0;
  var parsed = miniparser(xml);
  parsed.forEach(function (_ref, i) {
    var type = _ref.type,
      value = _ref.value;
    if (skip > 0) {
      skip--;
      return;
    }
    var nextType = i < parsed.length - 1 ? parsed[i + 1].type : "";
    var nnextType = i < parsed.length - 2 ? parsed[i + 2].type : "";
    if (type === "processing-instruction") {
      result += value + "\n";
    }
    if (type === "opening" && nextType === "content" && nnextType === "closing") {
      result += getIndent(indent) + value + parsed[i + 1].value + parsed[i + 2].value + "\n";
      skip = 2;
      return;
    }
    if (type === "opening") {
      result += getIndent(indent) + value + "\n";
      indent++;
    }
    if (type === "closing") {
      indent--;
      if (indent < 0) {
        throw new Error("Malformed xml near ".concat(result.substr(result.length - 30), "**").concat(value, "** : ").concat(xml));
      }
      result += getIndent(indent) + value + "\n";
    }
    if (type === "single") {
      result += getIndent(indent) + value + "\n";
    }
    if (type === "content" && !/^[ \n\r\t]+$/.test(value)) {
      result += getIndent(indent) + value.trim() + "\n";
    }
  });
  if (indent !== 0) {
    throw new Error("Malformed xml indent at the end : ".concat(indent, " : ").concat(xml));
  }
  return result;
}
function getNamespaces(attributes) {
  return attributes.filter(function (_ref2) {
    var key = _ref2.key;
    return key.indexOf("xmlns") !== -1;
  });
}
function miniparser(xml) {
  var cursor = 0;
  var state = "outside";
  var currentType = "";
  var content = "";
  var renderedArray = [];
  var level = 0;
  var namespaces = [];
  while (cursor < xml.length) {
    if (state === "outside") {
      var opening = xml.indexOf("<", cursor);
      if (opening !== -1) {
        if (opening !== cursor) {
          content = xml.substr(cursor, opening - cursor);
          content = content.replace(/>/g, "&gt;");
          renderedArray.push({
            type: "content",
            value: content
          });
        }
        state = "inside";
        cursor = opening;
      } else {
        var _content = xml.substr(cursor);
        renderedArray.push({
          type: "content",
          value: _content
        });
        return renderedArray;
      }
    }
    if (state === "inside") {
      var closing = xml.indexOf(">", cursor);
      if (closing !== -1) {
        var inAttr = false;
        var i = cursor;
        while (inAttr || xml[i] !== ">") {
          i++;
          if (xml[i] === '"') {
            inAttr = !inAttr;
          }
        }
        closing = i;
        var tag = xml.substr(cursor, closing - cursor + 1);
        var isSingle = Boolean(tag.match(/^<.+\/>/)); // is this line a single tag? ex. <br />
        var isClosing = Boolean(tag.match(/^<\/.+>/)); // is this a closing tag? ex. </a>
        var isProcessingInstruction = Boolean(tag.match(/^<\?.*\?>$/)); // is this an xml declaration tag? ex. <?xml version="1.0" encoding="UTF-8" standalone="yes"?> or <?mso-contentType?>

        state = "outside";
        cursor = closing + 1;
        if (isProcessingInstruction) {
          var encodingRegex = / encoding="([^"]+)"/;
          if (encodingRegex.test(tag)) {
            tag = tag.replace(encodingRegex, function (x, encoding) {
              encoding = encoding.toUpperCase();
              if (encoding === "UTF-8") {
                return "";
              }
              return " encoding=\"".concat(encoding, "\"");
            });
          }
          currentType = "processing-instruction";
        } else if (isSingle) {
          // drop whitespace at the end
          tag = tag.replace(/\s*\/\s*>$/g, "/>");
          var sorted = attributeSorter(tag, namespaces);
          tag = sorted.replacement;
          currentType = "single";
        } else if (isClosing) {
          // drop whitespace at the end
          tag = tag.replace(/\s+>$/g, ">");
          currentType = "closing";
          namespaces.pop();
          level--;
        } else {
          // drop whitespace at the end
          tag = tag.replace(/\s+>$/g, ">");
          var _sorted = attributeSorter(tag, namespaces);
          tag = _sorted.replacement;
          namespaces[level] = getNamespaces(_sorted.attributes);
          currentType = "opening";
          level++;
        }
        renderedArray.push({
          type: currentType,
          value: tag
        });
      } else {
        var _content2 = xml.substr(cursor);
        renderedArray.push({
          type: "content",
          value: _content2
        });
        return renderedArray;
      }
    }
  }
  return renderedArray;
}
module.exports = xmlprettify;