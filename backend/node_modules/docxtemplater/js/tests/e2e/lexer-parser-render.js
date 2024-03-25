"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require("../utils.js"),
  expect = _require.expect,
  makeDocxV4 = _require.makeDocxV4,
  makePptxV4 = _require.makePptxV4,
  cleanRecursive = _require.cleanRecursive,
  errorVerifier = _require.errorVerifier,
  captureLogs = _require.captureLogs;
var fixtures = require("./fixtures.js");
var inspectModule = require("../../inspect-module.js");
var AssertionModule = require("../assertion-module.js");
var utf8decode = require("../../uintarray-to-string.js");
function expectations(iModule, fixture) {
  cleanRecursive(iModule.inspect);
  if (fixture.error) {
    throw new Error("Fixture should have failed but did not fail");
  }
  if (fixture.result !== null) {
    var content = iModule.inspect.content;
    if (iModule.inspect.content instanceof Uint8Array) {
      content = utf8decode(content);
    }
    expect(content).to.be.deep.equal(fixture.result, "Content incorrect");
  }
  if (fixture.lexed !== null) {
    expect(iModule.inspect.lexed).to.be.deep.equal(fixture.lexed, "Lexed incorrect");
  }
  if (fixture.parsed !== null) {
    expect(iModule.inspect.parsed).to.be.deep.equal(fixture.parsed, "Parsed incorrect");
  }
  if (fixture.postparsed !== null) {
    expect(iModule.inspect.postparsed).to.be.deep.equal(fixture.postparsed, "Postparsed incorrect");
  }
  if (fixture.xmllexed != null) {
    expect(iModule.inspect.xmllexed).to.be.deep.equal(fixture.xmllexed, "Xmllexed incorrect");
  }
}
function runTest(fixture) {
  var async = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  fixture.options = fixture.options || {};
  var modules = [];
  var iModule = inspectModule();
  modules.push(iModule, new AssertionModule());
  if (fixture.options.modules) {
    fixture.options.modules().forEach(function (mod) {
      modules.push(mod);
    });
  }
  var doc;
  var capture = captureLogs();
  try {
    doc = fixture.pptx ? makePptxV4(fixture.content, _objectSpread(_objectSpread({}, fixture.options), {}, {
      modules: modules
    })) : makeDocxV4(fixture.content, _objectSpread(_objectSpread({}, fixture.options), {}, {
      modules: modules
    }));
    doc.setData(fixture.scope);
    capture.stop();
  } catch (error) {
    capture.stop();
    if (!fixture.error) {
      throw error;
    }
    errorVerifier(error, fixture.errorType, fixture.error);
    return;
  }
  var capture2 = captureLogs();
  if (async === false) {
    try {
      doc.render();
      capture2.stop();
    } catch (error) {
      capture2.stop();
      if (!fixture.error) {
        throw error;
      }
      errorVerifier(error, fixture.errorType, fixture.error);
      return;
    }
    capture2.stop();
    expectations(iModule, fixture);
  } else {
    return doc.renderAsync(fixture.scope).then(function () {
      capture2.stop();
      expectations(iModule, fixture);
      if (fixture.resolved) {
        expect(iModule.inspect.resolved).to.be.deep.equal(fixture.resolved, "Resolved incorrect");
      }
    }, function (error) {
      capture2.stop();
      if (!fixture.error) {
        throw error;
      }
      errorVerifier(error, fixture.errorType, fixture.error);
    });
  }
}
describe("Algorithm", function () {
  fixtures.forEach(function (fixture) {
    (fixture.onlySync ? it.only : it)(fixture.it, function () {
      return runTest(fixture, false);
    });
    (fixture.only ? it.only : it)("Async ".concat(fixture.it), function () {
      // Return is important to make the test fail if there is an async error
      return runTest(fixture, true);
    });
  });
});