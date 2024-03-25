"use strict";

var _require = require("../utils.js"),
  expect = _require.expect,
  expectToThrow = _require.expectToThrow,
  wrapMultiError = _require.wrapMultiError;
var Errors = require("../../errors.js");
var expressionParser = require("../../expressions.js");
var TxtTemplater = require("../../text.js");
describe("Text templating", function () {
  it("should be possible to template text files", function () {
    var doc = new TxtTemplater("Hello {user}, how are you ?");
    expect(doc.render({
      user: "John"
    })).to.be.equal("Hello John, how are you ?");
  });
  it("should be possible to template text files with expressionParser", function () {
    var doc = new TxtTemplater("Hello {user + age}, how are you ?", {
      parser: expressionParser
    });
    expect(doc.render({
      user: "John ",
      age: 12
    })).to.be.equal("Hello John 12, how are you ?");
  });
  it("should be possible to template xml files with expressionParser", function () {
    var doc = new TxtTemplater("<t>&gt;  {user}</t>", {
      parser: expressionParser
    });
    expect(doc.render({
      user: "<zaza> ",
      age: 12
    })).to.be.equal("<t>&gt;  <zaza> </t>");
  });
  it("should be possible to use loops", function () {
    var doc = new TxtTemplater("Hello {#users}{name},{/users} how are you ?", {
      parser: expressionParser
    });
    expect(doc.render({
      users: [{
        name: "John"
      }, {
        name: "Baz"
      }]
    })).to.be.equal("Hello John,Baz, how are you ?");
  });
  it("should throw specific error if loop not closed", function () {
    var expectedError = wrapMultiError({
      name: "TemplateError",
      message: "Unclosed loop",
      properties: {
        id: "unclosed_loop",
        xtag: "users",
        offset: 6
      }
    });
    expectToThrow(function () {
      return new TxtTemplater("Hello {#users}");
    }, Errors.XTTemplateError, expectedError);
  });
  it("should work with xml-namespace", function () {
    var doc = new TxtTemplater('<?xml version="1.0" encoding="UTF-8”?> Hello {name}');
    expect(doc.render({
      name: "John"
    })).to.be.equal('<?xml version="1.0" encoding="UTF-8”?> Hello John');
  });
  it("should not regress with paragraphLoop: true or linebreaks: true", function () {
    var doc = new TxtTemplater("Text {#users}{name}{/}", {
      paragraphLoop: true,
      linebreaks: true
    });
    expect(doc.render({
      users: [{
        name: "John\nFoo"
      }]
    })).to.be.equal("Text John\nFoo");
  });
  it("should be possible to render special characters in the output", function () {
    var doc = new TxtTemplater("Text {name}", {
      paragraphLoop: true,
      linebreaks: true
    });
    expect(doc.render({
      name: "&& <n>Baz</n> &nbsp;"
    })).to.be.equal("Text && <n>Baz</n> &nbsp;");
  });
  it("should be possible to use < and > as delimiters", function () {
    var doc = new TxtTemplater("Hello <name>", {
      delimiters: {
        start: "<",
        end: ">"
      }
    });
    expect(doc.render({
      name: "John"
    })).to.be.equal("Hello John");
  });
});