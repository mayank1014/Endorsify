"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require("./errors.js"),
  getUnclosedTagException = _require.getUnclosedTagException,
  getUnopenedTagException = _require.getUnopenedTagException,
  getDuplicateOpenTagException = _require.getDuplicateOpenTagException,
  getDuplicateCloseTagException = _require.getDuplicateCloseTagException,
  throwMalformedXml = _require.throwMalformedXml,
  throwXmlInvalid = _require.throwXmlInvalid,
  XTTemplateError = _require.XTTemplateError;
var _require2 = require("./doc-utils.js"),
  isTextStart = _require2.isTextStart,
  isTextEnd = _require2.isTextEnd,
  wordToUtf8 = _require2.wordToUtf8;
var DELIMITER_NONE = 0,
  DELIMITER_EQUAL = 1,
  DELIMITER_START = 2,
  DELIMITER_END = 3;
function inRange(range, match) {
  return range[0] <= match.offset && match.offset < range[1];
}
function updateInTextTag(part, inTextTag) {
  if (isTextStart(part)) {
    if (inTextTag) {
      throwMalformedXml();
    }
    return true;
  }
  if (isTextEnd(part)) {
    if (!inTextTag) {
      throwMalformedXml();
    }
    return false;
  }
  return inTextTag;
}
function getTag(tag) {
  var position = "";
  var start = 1;
  var end = tag.indexOf(" ");
  if (tag[tag.length - 2] === "/") {
    position = "selfclosing";
    if (end === -1) {
      end = tag.length - 2;
    }
  } else if (tag[1] === "/") {
    start = 2;
    position = "end";
    if (end === -1) {
      end = tag.length - 1;
    }
  } else {
    position = "start";
    if (end === -1) {
      end = tag.length - 1;
    }
  }
  return {
    tag: tag.slice(start, end),
    position: position
  };
}
function tagMatcher(content, textMatchArray, othersMatchArray) {
  var cursor = 0;
  var contentLength = content.length;
  var allMatches = {};
  for (var i = 0, len = textMatchArray.length; i < len; i++) {
    allMatches[textMatchArray[i]] = true;
  }
  for (var _i = 0, _len = othersMatchArray.length; _i < _len; _i++) {
    allMatches[othersMatchArray[_i]] = false;
  }
  var totalMatches = [];
  while (cursor < contentLength) {
    cursor = content.indexOf("<", cursor);
    if (cursor === -1) {
      break;
    }
    var offset = cursor;
    var nextOpening = content.indexOf("<", cursor + 1);
    cursor = content.indexOf(">", cursor);
    if (cursor === -1 || nextOpening !== -1 && cursor > nextOpening) {
      throwXmlInvalid(content, offset);
    }
    var tagText = content.slice(offset, cursor + 1);
    var _getTag = getTag(tagText),
      tag = _getTag.tag,
      position = _getTag.position;
    var text = allMatches[tag];
    if (text == null) {
      continue;
    }
    totalMatches.push({
      type: "tag",
      position: position,
      text: text,
      offset: offset,
      value: tagText,
      tag: tag
    });
  }
  return totalMatches;
}
function getDelimiterErrors(delimiterMatches, fullText, syntaxOptions) {
  var errors = [];
  var inDelimiter = false;
  var lastDelimiterMatch = {
    offset: 0
  };
  var xtag;
  var delimiterWithErrors = delimiterMatches.reduce(function (delimiterAcc, currDelimiterMatch) {
    var position = currDelimiterMatch.position;
    var delimiterOffset = currDelimiterMatch.offset;
    var lastDelimiterOffset = lastDelimiterMatch.offset;
    var lastDelimiterLength = lastDelimiterMatch.length;
    xtag = fullText.substr(lastDelimiterOffset, delimiterOffset - lastDelimiterOffset);
    if (inDelimiter && position === "start") {
      if (lastDelimiterOffset + lastDelimiterLength === delimiterOffset) {
        xtag = fullText.substr(lastDelimiterOffset, delimiterOffset - lastDelimiterOffset + lastDelimiterLength + 4);
        errors.push(getDuplicateOpenTagException({
          xtag: xtag,
          offset: lastDelimiterOffset
        }));
        lastDelimiterMatch = currDelimiterMatch;
        delimiterAcc.push(_objectSpread(_objectSpread({}, currDelimiterMatch), {}, {
          error: true
        }));
        return delimiterAcc;
      }
      errors.push(getUnclosedTagException({
        xtag: wordToUtf8(xtag),
        offset: lastDelimiterOffset
      }));
      lastDelimiterMatch = currDelimiterMatch;
      delimiterAcc.push(_objectSpread(_objectSpread({}, currDelimiterMatch), {}, {
        error: true
      }));
      return delimiterAcc;
    }
    if (!inDelimiter && position === "end") {
      if (syntaxOptions.allowUnopenedTag) {
        return delimiterAcc;
      }
      if (lastDelimiterOffset + lastDelimiterLength === delimiterOffset) {
        xtag = fullText.substr(lastDelimiterOffset - 4, delimiterOffset - lastDelimiterOffset + lastDelimiterLength + 4);
        errors.push(getDuplicateCloseTagException({
          xtag: xtag,
          offset: lastDelimiterOffset
        }));
        lastDelimiterMatch = currDelimiterMatch;
        delimiterAcc.push(_objectSpread(_objectSpread({}, currDelimiterMatch), {}, {
          error: true
        }));
        return delimiterAcc;
      }
      errors.push(getUnopenedTagException({
        xtag: xtag,
        offset: delimiterOffset
      }));
      lastDelimiterMatch = currDelimiterMatch;
      delimiterAcc.push(_objectSpread(_objectSpread({}, currDelimiterMatch), {}, {
        error: true
      }));
      return delimiterAcc;
    }
    inDelimiter = !inDelimiter;
    lastDelimiterMatch = currDelimiterMatch;
    delimiterAcc.push(currDelimiterMatch);
    return delimiterAcc;
  }, []);
  if (inDelimiter) {
    var lastDelimiterOffset = lastDelimiterMatch.offset;
    xtag = fullText.substr(lastDelimiterOffset, fullText.length - lastDelimiterOffset);
    errors.push(getUnclosedTagException({
      xtag: wordToUtf8(xtag),
      offset: lastDelimiterOffset
    }));
  }
  return {
    delimiterWithErrors: delimiterWithErrors,
    errors: errors
  };
}
function compareOffsets(startOffset, endOffset) {
  if (startOffset === -1 && endOffset === -1) {
    return DELIMITER_NONE;
  }
  if (startOffset === endOffset) {
    return DELIMITER_EQUAL;
  }
  if (startOffset === -1 || endOffset === -1) {
    return endOffset < startOffset ? DELIMITER_START : DELIMITER_END;
  }
  return startOffset < endOffset ? DELIMITER_START : DELIMITER_END;
}
function splitDelimiters(inside) {
  var newDelimiters = inside.split(" ");
  if (newDelimiters.length !== 2) {
    var err = new XTTemplateError("New Delimiters cannot be parsed");
    err.properties = {
      id: "change_delimiters_invalid",
      explanation: "Cannot parser delimiters"
    };
    throw err;
  }
  var _newDelimiters = _slicedToArray(newDelimiters, 2),
    start = _newDelimiters[0],
    end = _newDelimiters[1];
  if (start.length === 0 || end.length === 0) {
    var _err = new XTTemplateError("New Delimiters cannot be parsed");
    _err.properties = {
      id: "change_delimiters_invalid",
      explanation: "Cannot parser delimiters"
    };
    throw _err;
  }
  return [start, end];
}
function getAllDelimiterIndexes(fullText, delimiters) {
  var indexes = [];
  var start = delimiters.start,
    end = delimiters.end;
  var offset = -1;
  var insideTag = false;
  while (true) {
    var startOffset = fullText.indexOf(start, offset + 1);
    var endOffset = fullText.indexOf(end, offset + 1);
    var position = null;
    var len = void 0;
    var compareResult = compareOffsets(startOffset, endOffset);
    if (compareResult === DELIMITER_EQUAL) {
      compareResult = insideTag ? DELIMITER_END : DELIMITER_START;
    }
    switch (compareResult) {
      case DELIMITER_NONE:
        return indexes;
      case DELIMITER_END:
        insideTag = false;
        offset = endOffset;
        position = "end";
        len = end.length;
        break;
      case DELIMITER_START:
        insideTag = true;
        offset = startOffset;
        position = "start";
        len = start.length;
        break;
    }
    // if tag starts with =, such as {=[ ]=}
    if (compareResult === DELIMITER_START && fullText[offset + start.length] === "=") {
      indexes.push({
        offset: startOffset,
        position: "start",
        length: start.length,
        changedelimiter: true
      });
      var nextEqual = fullText.indexOf("=", offset + start.length + 1);
      var nextEndOffset = fullText.indexOf(end, nextEqual + 1);
      indexes.push({
        offset: nextEndOffset,
        position: "end",
        length: end.length,
        changedelimiter: true
      });
      var _insideTag = fullText.substr(offset + start.length + 1, nextEqual - offset - start.length - 1);
      var _splitDelimiters = splitDelimiters(_insideTag);
      var _splitDelimiters2 = _slicedToArray(_splitDelimiters, 2);
      start = _splitDelimiters2[0];
      end = _splitDelimiters2[1];
      offset = nextEndOffset;
      continue;
    }
    indexes.push({
      offset: offset,
      position: position,
      length: len
    });
  }
}
function parseDelimiters(innerContentParts, delimiters, syntaxOptions) {
  var full = innerContentParts.map(function (p) {
    return p.value;
  }).join("");
  var delimiterMatches = getAllDelimiterIndexes(full, delimiters);
  var offset = 0;
  var ranges = innerContentParts.map(function (part) {
    offset += part.value.length;
    return {
      offset: offset - part.value.length,
      lIndex: part.lIndex
    };
  });
  var _getDelimiterErrors = getDelimiterErrors(delimiterMatches, full, syntaxOptions),
    delimiterWithErrors = _getDelimiterErrors.delimiterWithErrors,
    errors = _getDelimiterErrors.errors;
  var cutNext = 0;
  var delimiterIndex = 0;
  var parsed = ranges.map(function (p, i) {
    var offset = p.offset;
    var range = [offset, offset + innerContentParts[i].value.length];
    var partContent = innerContentParts[i].value;
    var delimitersInOffset = [];
    while (delimiterIndex < delimiterWithErrors.length && inRange(range, delimiterWithErrors[delimiterIndex])) {
      delimitersInOffset.push(delimiterWithErrors[delimiterIndex]);
      delimiterIndex++;
    }
    var parts = [];
    var cursor = 0;
    if (cutNext > 0) {
      cursor = cutNext;
      cutNext = 0;
    }
    delimitersInOffset.forEach(function (delimiterInOffset) {
      var value = partContent.substr(cursor, delimiterInOffset.offset - offset - cursor);
      if (delimiterInOffset.changedelimiter) {
        if (delimiterInOffset.position === "start") {
          if (value.length > 0) {
            parts.push({
              type: "content",
              value: value
            });
          }
        } else {
          cursor = delimiterInOffset.offset - offset + delimiterInOffset.length;
        }
        return;
      }
      if (value.length > 0) {
        parts.push({
          type: "content",
          value: value
        });
        cursor += value.length;
      }
      var delimiterPart = {
        type: "delimiter",
        position: delimiterInOffset.position,
        offset: cursor + offset
      };
      parts.push(delimiterPart);
      cursor = delimiterInOffset.offset - offset + delimiterInOffset.length;
    });
    cutNext = cursor - partContent.length;
    var value = partContent.substr(cursor);
    if (value.length > 0) {
      parts.push({
        type: "content",
        value: value
      });
    }
    return parts;
  }, this);
  return {
    parsed: parsed,
    errors: errors
  };
}
function isInsideContent(part) {
  // Stryker disable all : because the part.position === "insidetag" would be enough but we want to make the API future proof
  return part.type === "content" && part.position === "insidetag";
  // Stryker restore all
}
function getContentParts(xmlparsed) {
  return xmlparsed.filter(isInsideContent);
}
function decodeContentParts(xmlparsed, fileType) {
  var inTextTag = false;
  xmlparsed.forEach(function (part) {
    inTextTag = updateInTextTag(part, inTextTag);
    if (part.type === "content") {
      part.position = inTextTag ? "insidetag" : "outsidetag";
    }
    if (fileType !== "text" && isInsideContent(part)) {
      part.value = part.value.replace(/>/g, "&gt;");
    }
  });
}
module.exports = {
  parseDelimiters: parseDelimiters,
  parse: function parse(xmllexed, delimiters, syntax, fileType) {
    decodeContentParts(xmllexed, fileType);
    var _parseDelimiters = parseDelimiters(getContentParts(xmllexed), delimiters, syntax),
      delimiterParsed = _parseDelimiters.parsed,
      errors = _parseDelimiters.errors;
    var lexed = [];
    var index = 0;
    var lIndex = 0;
    xmllexed.forEach(function (part) {
      if (isInsideContent(part)) {
        Array.prototype.push.apply(lexed, delimiterParsed[index].map(function (p) {
          if (p.type === "content") {
            p.position = "insidetag";
          }
          p.lIndex = lIndex++;
          return p;
        }));
        index++;
      } else {
        part.lIndex = lIndex++;
        lexed.push(part);
      }
    });
    return {
      errors: errors,
      lexed: lexed
    };
  },
  xmlparse: function xmlparse(content, xmltags) {
    var matches = tagMatcher(content, xmltags.text, xmltags.other);
    var cursor = 0;
    var parsed = matches.reduce(function (parsed, match) {
      var value = content.substr(cursor, match.offset - cursor);
      if (value.length > 0) {
        parsed.push({
          type: "content",
          value: value
        });
      }
      cursor = match.offset + match.value.length;
      delete match.offset;
      parsed.push(match);
      return parsed;
    }, []);
    var value = content.substr(cursor);
    if (value.length > 0) {
      parsed.push({
        type: "content",
        value: value
      });
    }
    return parsed;
  }
};