"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var wrapper = require("../module-wrapper.js");
var _require = require("../doc-utils.js"),
  isTextStart = _require.isTextStart,
  isTextEnd = _require.isTextEnd,
  endsWith = _require.endsWith,
  startsWith = _require.startsWith;
var wTpreserve = '<w:t xml:space="preserve">';
var wTpreservelen = wTpreserve.length;
var wtEnd = "</w:t>";
var wtEndlen = wtEnd.length;
function isWtStart(part) {
  return isTextStart(part) && part.tag === "w:t";
}
function addXMLPreserve(chunk, index) {
  var tag = chunk[index].value;
  if (chunk[index + 1].value === "</w:t>") {
    return tag;
  }
  if (tag.indexOf('xml:space="preserve"') !== -1) {
    return tag;
  }
  return tag.substr(0, tag.length - 1) + ' xml:space="preserve">';
}
function isInsideLoop(meta, chunk) {
  return meta && meta.basePart && chunk.length > 1;
}
var SpacePreserve = /*#__PURE__*/function () {
  function SpacePreserve() {
    _classCallCheck(this, SpacePreserve);
    this.name = "SpacePreserveModule";
  }
  _createClass(SpacePreserve, [{
    key: "postparse",
    value: function postparse(postparsed, meta) {
      var chunk = [],
        inTextTag = false,
        endLindex = 0,
        lastTextTag = 0;
      function isStartingPlaceHolder(part, chunk) {
        return part.type === "placeholder" && chunk.length > 1;
      }
      var result = postparsed.reduce(function (postparsed, part) {
        if (isWtStart(part)) {
          inTextTag = true;
          lastTextTag = chunk.length;
        }
        if (!inTextTag) {
          postparsed.push(part);
          return postparsed;
        }
        chunk.push(part);
        if (isInsideLoop(meta, chunk)) {
          endLindex = meta.basePart.endLindex;
          chunk[0].value = addXMLPreserve(chunk, 0);
        }
        if (isStartingPlaceHolder(part, chunk)) {
          chunk[lastTextTag].value = addXMLPreserve(chunk, lastTextTag);
          endLindex = part.endLindex;
        }
        if (isTextEnd(part) && part.lIndex > endLindex) {
          if (endLindex !== 0) {
            chunk[lastTextTag].value = addXMLPreserve(chunk, lastTextTag);
          }
          Array.prototype.push.apply(postparsed, chunk);
          chunk = [];
          inTextTag = false;
          endLindex = 0;
          lastTextTag = 0;
        }
        return postparsed;
      }, []);
      Array.prototype.push.apply(result, chunk);
      return result;
    }
  }, {
    key: "postrender",
    value: function postrender(parts) {
      var lastNonEmpty = "";
      var lastNonEmptyIndex = 0;
      for (var i = 0, len = parts.length; i < len; i++) {
        var index = i;
        var p = parts[i];
        if (p === "") {
          continue;
        }
        if (endsWith(lastNonEmpty, wTpreserve) && startsWith(p, wtEnd)) {
          parts[lastNonEmptyIndex] = lastNonEmpty.substr(0, lastNonEmpty.length - wTpreservelen) + "<w:t/>";
          p = p.substr(wtEndlen);
        }
        lastNonEmpty = p;
        lastNonEmptyIndex = index;
        parts[i] = p;
      }
      return parts;
    }
  }]);
  return SpacePreserve;
}();
module.exports = function () {
  return wrapper(new SpacePreserve());
};