"use strict";

var _require = require("./doc-utils.js"),
  startsWith = _require.startsWith,
  endsWith = _require.endsWith,
  isStarting = _require.isStarting,
  isEnding = _require.isEnding,
  isWhiteSpace = _require.isWhiteSpace;
var filetypes = require("./filetypes.js");
function addEmptyParagraphAfterTable(parts) {
  var lastNonEmpty = "";
  for (var i = 0, len = parts.length; i < len; i++) {
    var p = parts[i];
    if (isWhiteSpace(p)) {
      continue;
    }
    if (endsWith(lastNonEmpty, "</w:tbl>")) {
      if (!startsWith(p, "<w:p") && !startsWith(p, "<w:tbl") && !startsWith(p, "<w:sectPr")) {
        p = "<w:p/>".concat(p);
      }
    }
    lastNonEmpty = p;
    parts[i] = p;
  }
  return parts;
}

// eslint-disable-next-line complexity
function joinUncorrupt(parts, options) {
  var contains = options.fileTypeConfig.tagShouldContain || [];
  /* Before doing this "uncorruption" method here, this was done with the
   * `part.emptyValue` trick, however, there were some corruptions that were
   * not handled, for example with a template like this :
   *
   * ------------------------------------------------
   * | {-w:p falsy}My para{/falsy}   |              |
   * | {-w:p falsy}My para{/falsy}   |              |
   */
  var collecting = "";
  var currentlyCollecting = -1;
  if (filetypes.docx.indexOf(options.contentType) !== -1) {
    parts = addEmptyParagraphAfterTable(parts);
  }
  var startIndex = -1;
  for (var i = 0, len = parts.length; i < len; i++) {
    var part = parts[i];
    for (var j = 0, len2 = contains.length; j < len2; j++) {
      var _contains$j = contains[j],
        tag = _contains$j.tag,
        shouldContain = _contains$j.shouldContain,
        value = _contains$j.value,
        drop = _contains$j.drop,
        dropParent = _contains$j.dropParent;
      if (currentlyCollecting === j) {
        if (isEnding(part, tag)) {
          currentlyCollecting = -1;
          if (dropParent) {
            var start = void 0,
              end = void 0;
            for (var k = startIndex; k > 0; k--) {
              if (isStarting(parts[k], dropParent)) {
                start = k;
                break;
              }
            }
            for (var _k = i; _k < parts.length; _k++) {
              if (isEnding(parts[_k], dropParent)) {
                end = _k;
                break;
              }
            }
            for (var _k2 = start; _k2 <= end; _k2++) {
              parts[_k2] = "";
            }
          } else if (drop) {
            for (var _k3 = startIndex; _k3 <= i; _k3++) {
              parts[_k3] = "";
            }
          } else {
            for (var _k4 = startIndex; _k4 < i; _k4++) {
              parts[_k4] = "";
            }
            parts[i] = collecting + value + part;
          }
          break;
        }
        collecting += part;
        for (var _k5 = 0, len3 = shouldContain.length; _k5 < len3; _k5++) {
          var sc = shouldContain[_k5];
          if (isStarting(part, sc)) {
            currentlyCollecting = -1;
            // parts[i] = collecting;
            break;
          }
        }
        if (currentlyCollecting > -1) {
          // parts[i] = "";
        }
        break;
      }
      if (currentlyCollecting === -1 && isStarting(part, tag) &&
      // to verify that the part doesn't have multiple tags, such as <w:tc><w:p>
      part.substr(1).indexOf("<") === -1) {
        // self-closing tag such as <w:t/>
        if (part[part.length - 2] === "/") {
          parts[i] = "";
          break;
        } else {
          startIndex = i;
          currentlyCollecting = j;
          collecting = part;
          // parts[i] = "";
          break;
        }
      }
    }
  }
  return parts;
}
module.exports = joinUncorrupt;