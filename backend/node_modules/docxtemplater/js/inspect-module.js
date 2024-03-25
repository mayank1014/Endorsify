"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require("lodash"),
  merge = _require.merge,
  cloneDeep = _require.cloneDeep;
function isPlaceholder(part) {
  return part.type === "placeholder";
}
var slideNumRegex = /ppt\/slides\/slide([0-9]+).xml/;
function getSlideIndex(path) {
  return parseInt(path.replace(slideNumRegex, "$1"), 10) - 1;
}
function _getTags(postParsed) {
  return postParsed.filter(isPlaceholder).reduce(function (tags, part) {
    // Stryker disable all : because this is for the xlsx module
    if (part.cellParsed) {
      part.cellParsed.forEach(function (cp) {
        if (cp.type === "placeholder" && cp.module !== "pro-xml-templating/xls-module-loop") {
          tags[cp.value] = tags[cp.value] || {};
        }
      });
      return tags;
    }
    // Stryker disable all : because this is for the table,chart,image, xlsx module
    if (part.dataBound === false) {
      if (part.subparsed) {
        tags = merge(tags, _getTags(part.subparsed));
      }
      return tags;
    }
    tags[part.value] = tags[part.value] || {};
    // Stryker restore all

    if (part.subparsed) {
      tags[part.value] = merge(tags[part.value], _getTags(part.subparsed));
    }
    return tags;
  }, {});
}
function _getStructuredTags(postParsed) {
  return postParsed.filter(isPlaceholder).map(function (part) {
    if (part.subparsed) {
      part.subparsed = _getStructuredTags(part.subparsed);
    }
    return part;
  }, {});
}
var InspectModule = /*#__PURE__*/function () {
  function InspectModule() {
    _classCallCheck(this, InspectModule);
    this.name = "InspectModule";
    this.inspect = {};
    this.fullInspected = {};
    this.filePath = null;
  }
  _createClass(InspectModule, [{
    key: "clone",
    value: function clone() {
      return new InspectModule();
    }
  }, {
    key: "optionsTransformer",
    value: function optionsTransformer(options, docxtemplater) {
      this.fileTypeConfig = docxtemplater.fileTypeConfig;
      this.zip = docxtemplater.zip;
      this.targets = docxtemplater.targets;
      this.fileType = docxtemplater.fileType;
      this.docxtemplater = docxtemplater;
      return options;
    }
    // eslint-disable-next-line complexity
  }, {
    key: "set",
    value: function set(obj) {
      if (obj.data) {
        this.inspect.tags = obj.data;
      }
      if (obj.pptxCustomMap) {
        this.pptxCustomMap = obj.pptxCustomMap;
      }
      if (obj.inspect) {
        if (obj.inspect.filePath) {
          this.filePath = obj.inspect.filePath;
          this.inspect = this.fullInspected[this.filePath] || {};
        }
        if (obj.inspect.content) {
          this.inspect.content = obj.inspect.content;
        } else if (obj.inspect.postparsed) {
          this.inspect.postparsed = cloneDeep(obj.inspect.postparsed);
        } else if (obj.inspect.parsed) {
          this.inspect.parsed = cloneDeep(obj.inspect.parsed);
        } else if (obj.inspect.lexed) {
          this.inspect.lexed = cloneDeep(obj.inspect.lexed);
        } else if (obj.inspect.xmllexed) {
          this.inspect.xmllexed = cloneDeep(obj.inspect.xmllexed);
        }
        if (obj.inspect.resolved) {
          this.inspect.resolved = obj.inspect.resolved;
        }
        this.fullInspected[this.filePath] = this.inspect;
      }
    }
  }, {
    key: "nullGetter",
    value: function nullGetter(part, scopeManager, xt) {
      var inspected = this.fullInspected[xt.filePath];
      inspected.nullValues = inspected.nullValues || {
        summary: [],
        detail: []
      };
      inspected.nullValues.detail.push({
        part: part,
        scopeManager: scopeManager
      });
      inspected.nullValues.summary.push(scopeManager.scopePath.concat(part.value));
    }
  }, {
    key: "getInspected",
    value: function getInspected(file) {
      var si = getSlideIndex(file);
      var inspected = cloneDeep(this.fullInspected[file].postparsed);
      if (si != null && !isNaN(si) && this.pptxCustomMap && this.pptxCustomMap[si]) {
        var map = this.pptxCustomMap[si];
        if (map) {
          inspected = [_objectSpread(_objectSpread({}, map), {}, {
            type: "placeholder",
            module: "pro-xml-templating/slides-module-repeat",
            subparsed: inspected
          })];
        }
      }
      return inspected;
    }
  }, {
    key: "getTags",
    value: function getTags(file) {
      file = file || this.fileTypeConfig.textPath(this.docxtemplater);
      var inspected = this.getInspected(file);
      return _getTags(inspected);
    }
  }, {
    key: "getAllTags",
    value: function getAllTags() {
      var _this = this;
      return Object.keys(this.fullInspected).reduce(function (result, file) {
        return merge(result, _this.getTags(file));
      }, {});
    }
  }, {
    key: "getStructuredTags",
    value: function getStructuredTags(file) {
      file = file || this.fileTypeConfig.textPath(this.docxtemplater);
      var inspected = this.getInspected(file);
      return _getStructuredTags(inspected);
    }
  }, {
    key: "getAllStructuredTags",
    value: function getAllStructuredTags() {
      var _this2 = this;
      return Object.keys(this.fullInspected).reduce(function (result, file) {
        return result.concat(_this2.getStructuredTags(file));
      }, []);
    }
  }, {
    key: "getFileType",
    value: function getFileType() {
      return this.fileType;
    }
  }, {
    key: "getTemplatedFiles",
    value: function getTemplatedFiles() {
      return this.docxtemplater.templatedFiles;
    }
  }]);
  return InspectModule;
}();
module.exports = function () {
  return new InspectModule();
};