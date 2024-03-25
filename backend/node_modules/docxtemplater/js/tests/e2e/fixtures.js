"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require("lodash"),
  assign = _require.assign;
var expressionParser = require("../../expressions.js");
var angularParserIE11 = require("../../expressions-ie11.js");
var Errors = require("../../errors.js");
var _require2 = require("../utils.js"),
  wrapMultiError = _require2.wrapMultiError;
var nbsp = String.fromCharCode(160);
expressionParser.filters.upper = function (str) {
  if (!str) {
    return str;
  }
  return str.toUpperCase();
};
expressionParser.filters.sum = function (num1, num2) {
  return num1 + num2;
};
var noInternals = {
  lexed: null,
  parsed: null,
  postparsed: null
};
var xmlSpacePreserveTag = {
  type: "tag",
  position: "start",
  value: '<w:t xml:space="preserve">',
  text: true,
  tag: "w:t"
};
var startText = {
  type: "tag",
  position: "start",
  value: "<w:t>",
  text: true,
  tag: "w:t"
};
var endText = {
  type: "tag",
  value: "</w:t>",
  text: true,
  position: "end",
  tag: "w:t"
};
var startParagraph = {
  type: "tag",
  value: "<w:p>",
  text: false,
  position: "start",
  tag: "w:p"
};
var endParagraph = {
  type: "tag",
  value: "</w:p>",
  text: false,
  position: "end",
  tag: "w:p"
};
var tableRowStart = {
  type: "tag",
  position: "start",
  text: false,
  value: "<w:tr>",
  tag: "w:tr"
};
var tableRowEnd = {
  type: "tag",
  value: "</w:tr>",
  text: false,
  position: "end",
  tag: "w:tr"
};
var delimiters = {
  start: {
    type: "delimiter",
    position: "start"
  },
  end: {
    type: "delimiter",
    position: "end"
  }
};
function content(value) {
  return {
    type: "content",
    value: value,
    position: "insidetag"
  };
}
function externalContent(value) {
  return {
    type: "content",
    value: value,
    position: "outsidetag"
  };
}
var fixtures = [{
  it: "should handle {user} with tag",
  content: "<w:t>Hi {user}</w:t>",
  scope: {
    user: "Foo"
  },
  result: '<w:t xml:space="preserve">Hi Foo</w:t>',
  xmllexed: [{
    position: "start",
    tag: "w:t",
    text: true,
    type: "tag",
    value: "<w:t>"
  }, {
    type: "content",
    value: "Hi {user}"
  }, {
    position: "end",
    tag: "w:t",
    text: true,
    type: "tag",
    value: "</w:t>"
  }],
  lexed: [startText, content("Hi "), delimiters.start, content("user"), delimiters.end, endText],
  parsed: [startText, content("Hi "), {
    type: "placeholder",
    value: "user"
  }, endText],
  postparsed: [xmlSpacePreserveTag, content("Hi "), {
    type: "placeholder",
    value: "user"
  }, endText]
}, {
  it: "should handle {.} with tag",
  content: "<w:t>Hi {.}</w:t>",
  scope: "Foo",
  result: '<w:t xml:space="preserve">Hi Foo</w:t>',
  lexed: [startText, content("Hi "), delimiters.start, content("."), delimiters.end, endText],
  parsed: [startText, content("Hi "), {
    type: "placeholder",
    value: "."
  }, endText],
  postparsed: [xmlSpacePreserveTag, content("Hi "), {
    type: "placeholder",
    value: "."
  }, endText]
}, _objectSpread(_objectSpread({
  it: "should handle {userGreeting} with lambda function",
  content: "<w:t>{#users}{userGreeting}{/}</w:t>"
}, noInternals), {}, {
  scope: {
    userGreeting: function userGreeting(scope, sm) {
      return "How is it going, " + scope.name + " ? " + sm.scopeLindex.length;
    },
    users: [{
      name: "John"
    }, {
      name: "Mary"
    }]
  },
  result: '<w:t xml:space="preserve">How is it going, John ? 1How is it going, Mary ? 1</w:t>'
}), _objectSpread(_objectSpread({
  it: "should handle non breaking space in tag",
  result: '<w:t xml:space="preserve">Hey Ho</w:t>'
}, noInternals), {}, {
  content: "<w:t>{:foo".concat(nbsp).concat(nbsp, "bar").concat(nbsp, "bar} {:zing").concat(nbsp).concat(nbsp).concat(nbsp, "bang}</w:t>"),
  options: {
    modules: function modules() {
      return [{
        name: "FooModule",
        parse: function parse(placeHolderContent, options) {
          if (options.match(":foo  ", placeHolderContent)) {
            return {
              type: "placeholder",
              value: options.getValue(":foo  ", placeHolderContent)
            };
          }
          if (options.match(/^:zing +(.*)/, placeHolderContent)) {
            return {
              type: "placeholder",
              value: options.getValue(/^:zing +(.*)/, placeHolderContent)
            };
          }
        }
      }];
    },
    parser: function parser(tag) {
      return {
        get: function get() {
          if (tag === "bar bar") {
            return "Hey";
          }
          if (tag === "bang") {
            return "Ho";
          }
          return "Bad";
        }
      };
    }
  }
}), _objectSpread(_objectSpread({
  it: "should be possible to add nullGetter to module",
  result: '<w:t xml:space="preserve">foo</w:t>'
}, noInternals), {}, {
  content: "<w:t>{foo}</w:t>",
  options: {
    modules: function modules() {
      return [{
        name: "MyModule",
        nullGetter: function nullGetter() {
          return "foo";
        }
      }, {
        name: "MyModule2",
        nullGetter: function nullGetter() {
          return "bar";
        }
      }];
    }
  }
}), _objectSpread(_objectSpread({
  it: "should handle {#userGet} with lambda function",
  content: "<w:t>{#userGet}- {name}{/}</w:t>"
}, noInternals), {}, {
  scope: {
    userGet: function userGet() {
      return [{
        name: "John"
      }, {
        name: "Mary"
      }];
    }
  },
  result: '<w:t xml:space="preserve">- John- Mary</w:t>'
}), _objectSpread(_objectSpread({
  it: "should allow to call a function up one scope with angular expressions",
  content: "<w:t>{#users}{hi(.)}{/}</w:t>"
}, noInternals), {}, {
  options: {
    parser: expressionParser
  },
  scope: {
    hi: function hi(user) {
      return "What's up, ".concat(user, " ?");
    },
    users: ["John", "Jackie"]
  },
  result: '<w:t xml:space="preserve">What&apos;s up, John ?What&apos;s up, Jackie ?</w:t>'
}), {
  it: "should xmlparse strange tags",
  content: "<w:t>{name} {</w:t>FOO<w:t>age</w:t>BAR<w:t>}</w:t>",
  scope: {
    name: "Foo",
    age: 12
  },
  result: '<w:t xml:space="preserve">Foo 12</w:t>FOO<w:t></w:t>BAR<w:t></w:t>',
  xmllexed: [startText, {
    type: "content",
    value: "{name} {"
  }, endText, {
    type: "content",
    value: "FOO"
  }, startText, {
    type: "content",
    value: "age"
  }, endText, {
    type: "content",
    value: "BAR"
  }, startText, {
    type: "content",
    value: "}"
  }, endText],
  lexed: [startText, delimiters.start, content("name"), delimiters.end, content(" "), delimiters.start, endText, externalContent("FOO"), startText, content("age"), endText, externalContent("BAR"), startText, delimiters.end, endText],
  parsed: [startText, {
    type: "placeholder",
    value: "name"
  }, content(" "), {
    type: "placeholder",
    value: "age"
  }, endText, externalContent("FOO"), startText, endText, externalContent("BAR"), startText, endText],
  postparsed: null
}, {
  it: "should work with custom delimiters",
  content: "<w:t>Hello [[[name]]</w:t>",
  scope: {
    name: "John Doe"
  },
  result: '<w:t xml:space="preserve">Hello John Doe</w:t>',
  delimiters: {
    start: "[[[",
    end: "]]"
  },
  lexed: [startText, content("Hello "), delimiters.start, content("name"), delimiters.end, endText],
  parsed: [startText, content("Hello "), {
    type: "placeholder",
    value: "name"
  }, endText],
  postparsed: null
}, {
  it: "should work with custom delimiters splitted",
  content: '<w:t>Hello {name}</w:t><w:t foo="bar">}, how is it ?</w:t>',
  scope: {
    name: "John Doe"
  },
  result: '<w:t xml:space="preserve">Hello John Doe</w:t><w:t foo="bar">, how is it ?</w:t>',
  delimiters: {
    start: "{",
    end: "}}"
  },
  lexed: [startText, content("Hello "), delimiters.start, content("name"), delimiters.end, endText, {
    type: "tag",
    value: '<w:t foo="bar">',
    text: true,
    position: "start",
    tag: "w:t"
  }, content(", how is it ?"), endText],
  parsed: [startText, content("Hello "), {
    type: "placeholder",
    value: "name"
  }, endText, {
    type: "tag",
    value: '<w:t foo="bar">',
    text: true,
    position: "start",
    tag: "w:t"
  }, content(", how is it ?"), endText],
  postparsed: null
}, {
  it: "should work with custom delimiters splitted over > 2 tags",
  content: "<w:t>Hello {name}</w:t><w:t>}</w:t>TAG<w:t>}</w:t><w:t>}}foobar</w:t>",
  scope: {
    name: "John Doe"
  },
  result: '<w:t xml:space="preserve">Hello John Doe</w:t><w:t></w:t>TAG<w:t></w:t><w:t>foobar</w:t>',
  delimiters: {
    start: "{",
    end: "}}}}}"
  },
  lexed: [startText, content("Hello "), delimiters.start, content("name"), delimiters.end, endText, startText, endText, externalContent("TAG"), startText, endText, startText, content("foobar"), endText],
  parsed: [startText, content("Hello "), {
    type: "placeholder",
    value: "name"
  }, endText, startText, endText, externalContent("TAG"), startText, endText, startText, content("foobar"), endText],
  postparsed: null
}, _objectSpread(_objectSpread({
  it: "should work when having equal sign after closing tag",
  content: "<w:r><w:t>{foo}====</w:t></w:r>",
  scope: {
    foo: "FOO"
  }
}, noInternals), {}, {
  result: '<w:r><w:t xml:space="preserve">FOO====</w:t></w:r>'
}), _objectSpread(_objectSpread({
  it: "should fail when having two open text tags",
  content: "<w:t><w:t>xxx"
}, noInternals), {}, {
  error: {
    message: "Malformed xml",
    name: "InternalError",
    properties: {
      id: "malformed_xml",
      explanation: "The template contains malformed xml"
    }
  },
  errorType: Errors.XTInternalError
}), _objectSpread(_objectSpread({
  it: "should fail when having two close text tags",
  content: "<w:t></w:t></w:t>xxx"
}, noInternals), {}, {
  error: {
    message: "Malformed xml",
    name: "InternalError",
    properties: {
      id: "malformed_xml",
      explanation: "The template contains malformed xml"
    }
  },
  errorType: Errors.XTInternalError
}), _objectSpread(_objectSpread({
  it: "should show multierror with loops",
  content: "<w:t>{#a}{b}{/a}</w:t>"
}, noInternals), {}, {
  options: {
    parser: function parser() {
      return {
        get: function get() {
          throw new Error("Foobar");
        }
      };
    }
  },
  error: wrapMultiError({
    name: "ScopeParserError",
    message: "Scope parser execution failed",
    properties: {
      explanation: "The scope parser for the tag a failed to execute",
      rootError: {
        message: "Foobar"
      },
      file: "word/document.xml",
      id: "scopeparser_execution_failed",
      xtag: "a",
      offset: 0
    }
  }),
  errorType: Errors.XTTemplateError
}), _objectSpread(_objectSpread({
  it: "should show multierror with loops",
  content: "<w:t>{#a}{b}{/a}</w:t>"
}, noInternals), {}, {
  options: {
    parser: function parser(tag) {
      return {
        get: function get(scope) {
          if (tag === "a") {
            return scope[tag];
          }
          throw new Error("Foobar");
        }
      };
    }
  },
  scope: {
    a: [1]
  },
  error: wrapMultiError({
    name: "ScopeParserError",
    message: "Scope parser execution failed",
    properties: {
      explanation: "The scope parser for the tag b failed to execute",
      rootError: {
        message: "Foobar"
      },
      file: "word/document.xml",
      id: "scopeparser_execution_failed",
      scope: 1,
      xtag: "b",
      offset: 4
    }
  }),
  errorType: Errors.XTTemplateError
}), {
  it: "should work with loops",
  content: "<w:t>Hello {#users}{name}, {/users}</w:t>",
  scope: {
    users: [{
      name: "John Doe"
    }, {
      name: "Jane Doe"
    }, {
      name: "Wane Doe"
    }]
  },
  result: '<w:t xml:space="preserve">Hello John Doe, Jane Doe, Wane Doe, </w:t>',
  lexed: [startText, content("Hello "), delimiters.start, content("#users"), delimiters.end, delimiters.start, content("name"), delimiters.end, content(", "), delimiters.start, content("/users"), delimiters.end, endText],
  parsed: [startText, content("Hello "), {
    type: "placeholder",
    value: "users",
    location: "start",
    module: "loop",
    inverted: false,
    expandTo: "auto"
  }, {
    type: "placeholder",
    value: "name"
  }, content(", "), {
    type: "placeholder",
    value: "users",
    location: "end",
    module: "loop"
  }, endText],
  postparsed: [xmlSpacePreserveTag, content("Hello "), {
    type: "placeholder",
    value: "users",
    module: "loop",
    inverted: false,
    sectPrCount: 0,
    subparsed: [{
      type: "placeholder",
      value: "name"
    }, content(", ")]
  }, endText]
}, {
  it: "should work with paragraph loops",
  content: "<w:p><w:t>Hello </w:t></w:p><w:p><w:t>{#users}</w:t></w:p><w:p><w:t>User {.}</w:t></w:p><w:p><w:t>{/users}</w:t></w:p>",
  options: {
    paragraphLoop: true
  },
  scope: {
    users: ["John Doe", "Jane Doe", "Wane Doe"]
  },
  result: '<w:p><w:t>Hello </w:t></w:p><w:p><w:t xml:space="preserve">User John Doe</w:t></w:p><w:p><w:t xml:space="preserve">User Jane Doe</w:t></w:p><w:p><w:t xml:space="preserve">User Wane Doe</w:t></w:p>',
  lexed: [startParagraph, startText, content("Hello "), endText, endParagraph, startParagraph, startText, delimiters.start, content("#users"), delimiters.end, endText, endParagraph, startParagraph, startText, content("User "), delimiters.start, content("."), delimiters.end, endText, endParagraph, startParagraph, startText, delimiters.start, content("/users"), delimiters.end, endText, endParagraph],
  parsed: [startParagraph, startText, content("Hello "), endText, endParagraph, startParagraph, startText, {
    type: "placeholder",
    value: "users",
    location: "start",
    module: "loop",
    inverted: false,
    expandTo: "auto"
  }, endText, endParagraph, startParagraph, startText, content("User "), {
    type: "placeholder",
    value: "."
  }, endText, endParagraph, startParagraph, startText, {
    type: "placeholder",
    value: "users",
    location: "end",
    module: "loop"
  }, endText, endParagraph],
  postparsed: [startParagraph, startText, content("Hello "), endText, endParagraph, {
    type: "placeholder",
    value: "users",
    module: "loop",
    paragraphLoop: true,
    sectPrCount: 0,
    hasPageBreak: false,
    hasPageBreakBeginning: false,
    inverted: false,
    subparsed: [startParagraph, xmlSpacePreserveTag, content("User "), {
      type: "placeholder",
      value: "."
    }, endText, endParagraph]
  }]
}, {
  it: "should work with paragraph loops and selfclosing paragraphs",
  content: "<w:p><w:t>{#foo}</w:t></w:p><w:p/><w:xxx></w:xxx><w:p><w:t>{/}</w:t></w:p>",
  options: {
    paragraphLoop: true
  },
  scope: {
    foo: true
  },
  result: "<w:p/><w:xxx></w:xxx>",
  lexed: null,
  parsed: null,
  postparsed: null
}, _objectSpread(_objectSpread({
  it: "should not fail with nested loops if using paragraphLoop",
  content: "<w:p><w:t>{#users} {#pets}</w:t></w:p><w:p><w:t>Pet {.}</w:t></w:p><w:p><w:t>{/pets}{/users}</w:t></w:p>"
}, noInternals), {}, {
  options: {
    paragraphLoop: true
  },
  scope: {
    users: [{
      pets: ["Cat", "Dog"]
    }, {
      pets: ["Cat", "Dog"]
    }]
  },
  result: '<w:p><w:t xml:space="preserve"> </w:t></w:p><w:p><w:t xml:space="preserve">Pet Cat</w:t></w:p><w:p><w:t/></w:p><w:p><w:t xml:space="preserve">Pet Dog</w:t></w:p><w:p><w:t xml:space="preserve"> </w:t></w:p><w:p><w:t xml:space="preserve">Pet Cat</w:t></w:p><w:p><w:t/></w:p><w:p><w:t xml:space="preserve">Pet Dog</w:t></w:p><w:p><w:t/></w:p>'
}), {
  it: "should work with spacing loops",
  content: "<w:t>{#condition</w:t><w:t>} hello{/</w:t><w:t>condition}</w:t>",
  scope: {
    condition: true
  },
  result: '<w:t/><w:t xml:space="preserve"> hello</w:t><w:t></w:t>',
  lexed: [startText, delimiters.start, content("#condition"), endText, startText, delimiters.end, content(" hello"), delimiters.start, content("/"), endText, startText, content("condition"), delimiters.end, endText],
  parsed: [startText, {
    type: "placeholder",
    value: "condition",
    location: "start",
    module: "loop",
    inverted: false,
    expandTo: "auto"
  }, endText, startText, content(" hello"), {
    type: "placeholder",
    value: "condition",
    location: "end",
    module: "loop"
  }, endText, startText, endText],
  postparsed: null
}, _objectSpread(_objectSpread({
  it: "should work with spacing loops 2"
}, noInternals), {}, {
  content: "<w:t>{#condition}{text}{/condition}</w:t>",
  scope: {
    condition: [{
      text: " hello "
    }]
  },
  result: '<w:t xml:space="preserve"> hello </w:t>'
}), _objectSpread(_objectSpread({
  it: "should work with empty condition"
}, noInternals), {}, {
  content: "<w:t>{#a}A{/a}{^b}{/b}</w:t>",
  scope: {
    a: true
  },
  result: '<w:t xml:space="preserve">A</w:t>'
}), _objectSpread(_objectSpread({
  it: "should work with spacing loops 3"
}, noInternals), {}, {
  content: "<w:t>{#condition}</w:t><w:t>{/condition} foo</w:t>",
  scope: {
    condition: false
  },
  result: '<w:t xml:space="preserve"> foo</w:t>'
}), _objectSpread(_objectSpread({
  it: "should work with spacing loops 4"
}, noInternals), {}, {
  content: "<w:t>{#condition}foo{/condition}</w:t>",
  scope: {
    condition: false
  },
  result: "<w:t/>"
}), {
  it: "should work with dashloops",
  content: "<w:p><w:t>Hello {-w:p users}{name}, {/users}</w:t></w:p>",
  scope: {
    users: [{
      name: "John Doe"
    }, {
      name: "Jane Doe"
    }, {
      name: "Wane Doe"
    }]
  },
  result: '<w:p><w:t xml:space="preserve">Hello John Doe, </w:t></w:p><w:p><w:t xml:space="preserve">Hello Jane Doe, </w:t></w:p><w:p><w:t xml:space="preserve">Hello Wane Doe, </w:t></w:p>',
  lexed: [startParagraph, startText, content("Hello "), delimiters.start, content("-w:p users"), delimiters.end, delimiters.start, content("name"), delimiters.end, content(", "), delimiters.start, content("/users"), delimiters.end, endText, endParagraph],
  parsed: [startParagraph, startText, content("Hello "), {
    type: "placeholder",
    value: "users",
    location: "start",
    module: "loop",
    inverted: false,
    expandTo: "w:p"
  }, {
    type: "placeholder",
    value: "name"
  }, content(", "), {
    type: "placeholder",
    value: "users",
    location: "end",
    module: "loop"
  }, endText, endParagraph],
  postparsed: [{
    type: "placeholder",
    value: "users",
    module: "loop",
    inverted: false,
    sectPrCount: 0,
    subparsed: [startParagraph, xmlSpacePreserveTag, content("Hello "), {
      type: "placeholder",
      value: "name"
    }, content(", "), endText, endParagraph]
  }]
}, {
  it: "should work with dashloops nested",
  content: "<w:tr><w:p><w:t>{-w:tr columns} Hello {-w:p users}{name}, {/users}</w:t><w:t>{/columns}</w:t></w:p></w:tr>",
  scope: {
    columns: [{
      users: [{
        name: "John Doe"
      }, {
        name: "Jane Doe"
      }, {
        name: "Wane Doe"
      }]
    }]
  },
  result: '<w:tr><w:p><w:t xml:space="preserve"> Hello John Doe, </w:t><w:t/></w:p><w:p><w:t xml:space="preserve"> Hello Jane Doe, </w:t><w:t/></w:p><w:p><w:t xml:space="preserve"> Hello Wane Doe, </w:t><w:t/></w:p></w:tr>',
  lexed: [tableRowStart, startParagraph, startText, delimiters.start, content("-w:tr columns"), delimiters.end, content(" Hello "), delimiters.start, content("-w:p users"), delimiters.end, delimiters.start, content("name"), delimiters.end, content(", "), delimiters.start, content("/users"), delimiters.end, endText, startText, delimiters.start, content("/columns"), delimiters.end, endText, endParagraph, tableRowEnd],
  parsed: [tableRowStart, startParagraph, startText, {
    type: "placeholder",
    value: "columns",
    location: "start",
    module: "loop",
    inverted: false,
    expandTo: "w:tr"
  }, content(" Hello "), {
    type: "placeholder",
    value: "users",
    location: "start",
    module: "loop",
    inverted: false,
    expandTo: "w:p"
  }, {
    type: "placeholder",
    value: "name"
  }, content(", "), {
    type: "placeholder",
    value: "users",
    location: "end",
    module: "loop"
  }, endText, startText, {
    type: "placeholder",
    value: "columns",
    location: "end",
    module: "loop"
  }, endText, endParagraph, tableRowEnd],
  postparsed: null
}, {
  it: "should handle selfclose tag",
  content: "<w:t />",
  scope: {
    user: "Foo"
  },
  result: "<w:t />",
  lexed: [{
    type: "tag",
    value: "<w:t />",
    text: true,
    position: "selfclosing",
    tag: "w:t"
  }],
  parsed: [{
    type: "tag",
    position: "selfclosing",
    value: "<w:t />",
    text: true,
    tag: "w:t"
  }],
  postparsed: [{
    type: "tag",
    position: "selfclosing",
    value: "<w:t />",
    text: true,
    tag: "w:t"
  }]
}, {
  it: "should handle {user} with tag with selfclosing",
  content: "<w:t /><w:t>Hi {user}</w:t>",
  scope: {
    user: "Foo"
  },
  result: '<w:t /><w:t xml:space="preserve">Hi Foo</w:t>',
  lexed: [{
    type: "tag",
    value: "<w:t />",
    text: true,
    position: "selfclosing",
    tag: "w:t"
  }, startText, content("Hi "), delimiters.start, content("user"), delimiters.end, endText],
  parsed: [{
    type: "tag",
    position: "selfclosing",
    value: "<w:t />",
    text: true,
    tag: "w:t"
  }, startText, content("Hi "), {
    type: "placeholder",
    value: "user"
  }, endText],
  postparsed: [{
    type: "tag",
    position: "selfclosing",
    value: "<w:t />",
    text: true,
    tag: "w:t"
  }, xmlSpacePreserveTag, content("Hi "), {
    type: "placeholder",
    value: "user"
  }, endText]
}, {
  it: "should be possible to change the delimiters",
  content: "<w:t>Hi {=[[ ]]=}[[user]][[={ }=]] and {user2}</w:t>",
  scope: {
    user: "John",
    user2: "Jane"
  },
  result: '<w:t xml:space="preserve">Hi John and Jane</w:t>',
  lexed: [startText, content("Hi "), delimiters.start, content("user"), delimiters.end, content(" and "), delimiters.start, content("user2"), delimiters.end, endText],
  parsed: [startText, content("Hi "), {
    type: "placeholder",
    value: "user"
  }, content(" and "), {
    type: "placeholder",
    value: "user2"
  }, endText],
  postparsed: [xmlSpacePreserveTag, content("Hi "), {
    type: "placeholder",
    value: "user"
  }, content(" and "), {
    type: "placeholder",
    value: "user2"
  }, endText]
}, {
  it: "should be possible to change the delimiters",
  content: "<w:t>Hi {=a b c=}</w:t>",
  error: {
    name: "TemplateError",
    message: "New Delimiters cannot be parsed",
    properties: {
      id: "change_delimiters_invalid"
    }
  },
  errorType: Errors.XTTemplateError
}, {
  it: "should throw error if delimiters invalid",
  content: "<w:t>Hi {= =}</w:t>",
  error: {
    name: "TemplateError",
    message: "New Delimiters cannot be parsed",
    properties: {
      id: "change_delimiters_invalid"
    }
  },
  errorType: Errors.XTTemplateError
}, {
  it: "should throw error if delimiters invalid (2)",
  content: "<w:t>Hi {=[ =}</w:t>",
  error: {
    name: "TemplateError",
    message: "New Delimiters cannot be parsed",
    properties: {
      id: "change_delimiters_invalid"
    }
  },
  errorType: Errors.XTTemplateError
}, {
  it: "should throw error if delimiters invalid (3)",
  content: "<w:t>Hi {= ]=}</w:t>",
  error: {
    name: "TemplateError",
    message: "New Delimiters cannot be parsed",
    properties: {
      id: "change_delimiters_invalid"
    }
  },
  errorType: Errors.XTTemplateError
}, {
  it: "should be possible to change the delimiters with complex example",
  content: "<w:t>Hi {={{[ ]}}=}{{[user]}}{{[={{ ]=]}} and {{user2]</w:t>",
  scope: {
    user: "John",
    user2: "Jane"
  },
  result: '<w:t xml:space="preserve">Hi John and Jane</w:t>',
  lexed: [startText, content("Hi "), delimiters.start, content("user"), delimiters.end, content(" and "), delimiters.start, content("user2"), delimiters.end, endText],
  parsed: [startText, content("Hi "), {
    type: "placeholder",
    value: "user"
  }, content(" and "), {
    type: "placeholder",
    value: "user2"
  }, endText],
  postparsed: [xmlSpacePreserveTag, content("Hi "), {
    type: "placeholder",
    value: "user"
  }, content(" and "), {
    type: "placeholder",
    value: "user2"
  }, endText]
}, _objectSpread(_objectSpread({
  it: "should resolve the data correctly"
}, noInternals), {}, {
  content: "<w:t>{test}{#test}{label}{/test}{test}</w:t>",
  scope: {
    label: "T1",
    test: true
  },
  resolved: [{
    tag: "test",
    lIndex: 3,
    value: true
  }, {
    tag: "test",
    lIndex: 15,
    value: true
  }, {
    tag: "test",
    lIndex: 6,
    value: [[{
      tag: "label",
      lIndex: 9,
      value: "T1"
    }]]
  }],
  result: '<w:t xml:space="preserve">trueT1true</w:t>'
}), _objectSpread(_objectSpread({
  it: "should resolve 2 the data correctly"
}, noInternals), {}, {
  content: "<w:t>{^a}{label}{/a}</w:t>",
  scope: {
    a: true
  },
  resolved: [{
    tag: "a",
    lIndex: 3,
    value: []
  }],
  result: "<w:t/>"
}), _objectSpread(_objectSpread({
  it: "should resolve 3 the data correctly"
}, noInternals), {}, {
  content: "<w:t>{#frames}{#true}{label}{#false}{label}{/false}{/true}{#false}{label}{/false}{/frames}</w:t>",
  scope: {
    frames: [{
      label: "T1",
      "true": true
    }]
  },
  resolved: [{
    tag: "frames",
    lIndex: 3,
    value: [[{
      tag: "false",
      lIndex: 24,
      value: []
    }, {
      tag: "true",
      lIndex: 6,
      value: [[{
        tag: "label",
        lIndex: 9,
        value: "T1"
      }, {
        tag: "false",
        lIndex: 12,
        value: []
      }]]
    }]]
  }],
  result: '<w:t xml:space="preserve">T1</w:t>'
}), _objectSpread(_objectSpread({
  it: "should resolve truthy data correctly",
  content: "<w:t>{#loop}L{#cond2}{label}{/cond2}{#cond3}{label}{/cond3}{/loop}</w:t>"
}, noInternals), {}, {
  scope: {
    label: "outer",
    loop: [{
      cond2: true,
      label: "inner"
    }]
  },
  resolved: null,
  result: '<w:t xml:space="preserve">Linner</w:t>'
}), _objectSpread(_objectSpread({
  it: "should resolve truthy multi data correctly",
  content: "<w:t>{#loop}L{#cond2}{label}{/cond2}{#cond3}{label}{/cond3}{/loop}</w:t>"
}, noInternals), {}, {
  scope: {
    label: "outer",
    loop: [{
      cond2: true,
      label: "inner"
    }, {
      cond2: true,
      label: "inner"
    }, {
      cond3: true,
      label: "inner"
    }, {
      cond2: true,
      cond3: true
    }]
  },
  resolved: null,
  result: '<w:t xml:space="preserve">LinnerLinnerLinnerLouterouter</w:t>'
}), _objectSpread(_objectSpread({
  it: "should resolve async loop",
  content: "<w:t>{#loop}{#cond1}{label}{/}{#cond2}{label}{/}{/loop}</w:t>"
}, noInternals), {}, {
  scope: {
    label: "outer",
    loop: [{
      cond1: true,
      label: "inner"
    }, {
      cond1: true,
      cond2: true
    }]
  },
  resolved: null,
  result: '<w:t xml:space="preserve">innerouterouter</w:t>'
}), _objectSpread(_objectSpread({
  it: "should work well with inversed loop simple",
  content: "<w:t>{^b}{label}{/}</w:t>"
}, noInternals), {}, {
  scope: {
    b: false,
    label: "hi"
  },
  resolved: null,
  result: '<w:t xml:space="preserve">hi</w:t>'
}), _objectSpread(_objectSpread({
  it: "should work well with nested inversed loop",
  content: "<w:t>{#a}{^b}{label}{/}{/}</w:t>"
}, noInternals), {}, {
  scope: {
    a: [{
      b: false,
      label: "hi"
    }]
  },
  resolved: null,
  result: '<w:t xml:space="preserve">hi</w:t>'
}), _objectSpread(_objectSpread({
  it: "should work well with deeply nested inversed loop nested",
  content: "<w:t>{#a}{^b}{^c}{label}{/}{/}{/}</w:t>"
}, noInternals), {}, {
  scope: {
    a: [{
      b: false,
      label: "hi"
    }]
  },
  resolved: null,
  result: '<w:t xml:space="preserve">hi</w:t>'
}), _objectSpread(_objectSpread({
  it: "should work well with true value for condition",
  content: "<w:t>{#cond}{#product.price &gt; 10}high{/}{#product.price &lt;= 10}low{/}{/cond}</w:t>"
}, noInternals), {}, {
  options: {
    parser: expressionParser
  },
  scope: {
    cond: true,
    product: {
      price: 2
    }
  },
  resolved: null,
  result: '<w:t xml:space="preserve">low</w:t>'
}), _objectSpread(_objectSpread({
  it: "should handle {this+this+this} tag",
  scope: "Foo"
}, noInternals), {}, {
  content: "<w:t>Hi {this+this+this}</w:t>",
  options: {
    parser: expressionParser
  },
  result: '<w:t xml:space="preserve">Hi FooFooFoo</w:t>'
}), _objectSpread(_objectSpread({
  it: "should handle {((.+.+.)*.*0.5)|sum:.} tag",
  scope: 2
}, noInternals), {}, {
  content: "<w:t>Hi {((((.+.+.)*.*0.5)|sum:.)-.)/.}</w:t>",
  // = (((2 + 2 + 2)*2 * 0.5 | sum:2)-2)/2
  // = (((6)*2 * 0.5 | sum:2)-2)/2
  // = ((6 | sum:2)-2)/2
  // = ((8)-2)/2
  // = (6)/2
  // = 3
  options: {
    parser: expressionParser
  },
  result: '<w:t xml:space="preserve">Hi 3</w:t>'
}), _objectSpread(_objectSpread({
  it: "should handle {.['user-name']} tag",
  scope: {
    "user-name": "John"
  }
}, noInternals), {}, {
  content: "<w:t>Hi {.['user-name']}</w:t>",
  options: {
    parser: expressionParser
  },
  result: '<w:t xml:space="preserve">Hi John</w:t>'
}), _objectSpread(_objectSpread({
  it: 'should handle {this["a b"]} tag',
  scope: {
    "a b": "John"
  }
}, noInternals), {}, {
  content: '<w:t>Hi {this["a b"]}</w:t>',
  options: {
    parser: expressionParser
  },
  result: '<w:t xml:space="preserve">Hi John</w:t>'
}), _objectSpread(_objectSpread({
  it: 'should handle {this["length"]} tag',
  scope: "John"
}, noInternals), {}, {
  content: '<w:t>Hi { this["length"]}</w:t>',
  options: {
    parser: expressionParser
  },
  result: '<w:t xml:space="preserve">Hi 4</w:t>'
}), _objectSpread(_objectSpread({
  it: 'should handle {this["split"]} tag',
  scope: "John"
}, noInternals), {}, {
  content: '<w:t>Hi {this["split"]}</w:t>',
  options: {
    parser: expressionParser
  },
  result: '<w:t xml:space="preserve">Hi undefined</w:t>'
}), _objectSpread(_objectSpread({
  it: "should handle {this.split} tag",
  scope: "John"
}, noInternals), {}, {
  content: "<w:t>Hi {this.split}</w:t>",
  options: {
    parser: expressionParser
  },
  result: '<w:t xml:space="preserve">Hi undefined</w:t>'
}), _objectSpread(_objectSpread({
  it: "should handle {(this+this+this)*this} tag",
  scope: 1
}, noInternals), {}, {
  content: "<w:t>Hi {(this+this+this)*(this+this)}</w:t>",
  options: {
    parser: expressionParser
  },
  result: '<w:t xml:space="preserve">Hi 6</w:t>'
}), _objectSpread(_objectSpread({
  it: "should handle {(this+this+this)*(this+this)}, this=0 tag",
  scope: 0
}, noInternals), {}, {
  content: "<w:t>Hi {(   this + this + this)*(this+this)}</w:t>",
  options: {
    parser: expressionParser
  },
  result: '<w:t xml:space="preserve">Hi 0</w:t>'
}), _objectSpread(_objectSpread({
  it: "should handle {#products}{# .  }-{ . }-{/}{/}",
  scope: {
    products: [[1, 2, 3, 4], [4, 5, 6, 7]]
  }
}, noInternals), {}, {
  // The space inside {# . } is important.
  // It tests a regression that was fixed in version 3.37.12
  content: "<w:t>Hi {#products}{# .  }-{ . }-{/}{/}</w:t>",
  options: {
    parser: expressionParser
  },
  result: '<w:t xml:space="preserve">Hi -1--2--3--4--4--5--6--7-</w:t>'
}), _objectSpread(_objectSpread({
  it: "should work well with int value for condition",
  content: "<w:t>{#cond}{#product.price &gt; 10}high{/}{#product.price &lt;= 10}low{/}{/cond}</w:t>"
}, noInternals), {}, {
  options: {
    parser: expressionParser
  },
  scope: {
    cond: 10,
    product: {
      price: 2
    }
  },
  resolved: null,
  result: '<w:t xml:space="preserve">low</w:t>'
}), _objectSpread(_objectSpread({
  it: "should work well with empty string as result",
  content: "<w:t>{foo}</w:t>"
}, noInternals), {}, {
  options: {
    parser: expressionParser
  },
  scope: {
    foo: ""
  },
  resolved: null,
  result: "<w:t/>"
}), _objectSpread(_objectSpread({
  it: "should work well with str value for condition",
  content: "<w:t>{#cond}{#product.price &gt; 10}high{/}{#product.price &lt;= 10}low{/}{/cond}</w:t>"
}, noInternals), {}, {
  options: {
    parser: expressionParser
  },
  scope: {
    cond: "cond",
    product: {
      price: 2
    }
  },
  resolved: null,
  result: '<w:t xml:space="preserve">low</w:t>'
}), _objectSpread(_objectSpread({
  it: "should work well with false value for condition",
  content: "<w:t>{^cond}{#product.price &gt; 10}high{/}{#product.price &lt;= 10}low{/}{/cond}</w:t>"
}, noInternals), {}, {
  options: {
    parser: expressionParser
  },
  scope: {
    cond: false,
    product: {
      price: 2
    }
  },
  resolved: null,
  result: '<w:t xml:space="preserve">low</w:t>'
}), _objectSpread(_objectSpread({
  it: "should work well with multi level angular parser",
  // This tag was designed to match /-([^\s]+)\s(.+)$/ which is the prefix of the dash loop
  content: "<w:t>{#users}{name} {date-age+ offset} {/}</w:t>"
}, noInternals), {}, {
  options: {
    parser: expressionParser
  },
  scope: {
    date: 2019,
    offset: 1,
    users: [{
      name: "John",
      age: 44
    }, {
      name: "Mary",
      age: 22
    }, {
      date: 2100,
      age: 22,
      name: "Walt"
    }]
  },
  resolved: null,
  result: '<w:t xml:space="preserve">John 1976 Mary 1998 Walt 2079 </w:t>'
}), _objectSpread(_objectSpread({
  it: "should work well with $index angular parser",
  content: "<w:t>{#todos}{#$index==0}FIRST {/}{text} {/todos}</w:t>"
}, noInternals), {}, {
  options: {
    parser: expressionParser
  },
  scope: {
    todos: [{
      text: "Hello"
    }, {
      text: "Other todo"
    }]
  },
  result: '<w:t xml:space="preserve">FIRST Hello Other todo </w:t>'
}), _objectSpread(_objectSpread({
  it: "should work well with $index inside condition angular parser",
  content: "<w:t>{#todos}{#important}!!{$index+1}{text}{/}{^important}?{$index+1}{text}{/}{/}</w:t>"
}, noInternals), {}, {
  options: {
    parser: expressionParser
  },
  scope: {
    todos: [{
      important: true,
      text: "Hello"
    }, {
      text: "Other todo"
    }, {
      important: true,
      text: "Bye"
    }]
  },
  result: '<w:t xml:space="preserve">!!1Hello?2Other todo!!3Bye</w:t>'
}), _objectSpread(_objectSpread({
  it: "should work well with $index inside condition angular parser",
  content: "<w:t>{#todos}{#important}!!{$index+1}{text}{/}{^important}?{$index+1}{text}{/}{/}</w:t>"
}, noInternals), {}, {
  options: {
    parser: angularParserIE11
  },
  scope: {
    todos: [{
      important: true,
      text: "Hello"
    }, {
      text: "Other todo"
    }, {
      important: true,
      text: "Bye"
    }]
  },
  result: '<w:t xml:space="preserve">!!1Hello?2Other todo!!3Bye</w:t>'
}), _objectSpread(_objectSpread({
  it: "should work well with -w:tr conditions inside table inside paragraphLoop condition"
}, noInternals), {}, {
  content: "<w:p><w:r><w:t>{#cond}</w:t></w:r></w:p><w:tbl><w:tr><w:tc><w:p><w:r><w:t>{-w:tc cond}{val}{/}</w:t></w:r></w:p></w:tc></w:tr></w:tbl><w:p><w:r><w:t>{/}</w:t></w:r></w:p>",
  options: {
    paragraphLoop: true
  },
  scope: {
    cond: true,
    val: "yep"
  },
  resolved: null,
  result: '<w:tbl><w:tr><w:tc><w:p><w:r><w:t xml:space="preserve">yep</w:t></w:r></w:p></w:tc></w:tr></w:tbl>'
}), _objectSpread(_objectSpread({
  it: "should work well with nested angular expressions",
  content: "<w:t>{v}{#c1}{v}{#c2}{v}{#c3}{v}{/}{/}{/}</w:t>"
}, noInternals), {}, {
  options: {
    parser: expressionParser
  },
  scope: {
    v: "0",
    c1: {
      v: "1",
      c2: {
        v: "2",
        c3: {
          v: "3"
        }
      }
    }
  },
  resolved: null,
  result: '<w:t xml:space="preserve">0123</w:t>'
}), _objectSpread(_objectSpread({
  it: "should work with this with angular expressions",
  content: "<w:t>{#hello}{this}{/hello}</w:t>"
}, noInternals), {}, {
  options: {
    parser: expressionParser
  },
  scope: {
    hello: ["world"]
  },
  resolved: null,
  result: '<w:t xml:space="preserve">world</w:t>'
}), _objectSpread(_objectSpread({
  it: "should be possible to close loops with {/}",
  content: "<w:t>{#products}Product {name}{/}</w:t>"
}, noInternals), {}, {
  scope: {
    products: [{
      name: "Bread"
    }]
  },
  result: '<w:t xml:space="preserve">Product Bread</w:t>'
}), _objectSpread(_objectSpread({
  it: "should get parent prop if child is null",
  content: "<w:t>{#c}{label}{/c}</w:t>"
}, noInternals), {}, {
  options: {
    parser: expressionParser
  },
  scope: {
    c: {
      label: null
    },
    label: "hello"
  },
  resolved: null,
  result: '<w:t xml:space="preserve">hello</w:t>'
}), _objectSpread(_objectSpread({
  it: "should work when using double nested arrays",
  content: "<w:t>{#a}</w:t><w:t>{this}</w:t><w:t>{/}</w:t>"
}, noInternals), {}, {
  options: {
    parser: expressionParser
  },
  scope: {
    a: [["first-part", "other-part"]]
  },
  resolved: null,
  result: '<w:t/><w:t xml:space="preserve">first-part,other-part</w:t><w:t/>'
}), _objectSpread(_objectSpread({
  it: "should work when using accents or numbers in variable names, ...",
  content: "<w:t>{êtreîöò12áeêëẽ}</w:t>"
}, noInternals), {}, {
  options: {
    parser: expressionParser
  },
  scope: {},
  resolved: null,
  result: '<w:t xml:space="preserve">undefined</w:t>'
}), _objectSpread(_objectSpread({
  it: "should fail when using € sign",
  content: "<w:t>{hello€}</w:t>"
}, noInternals), {}, {
  options: {
    parser: expressionParser
  },
  scope: {},
  error: wrapMultiError({
    name: "ScopeParserError",
    message: "Scope parser compilation failed",
    properties: {
      explanation: 'The scope parser for the tag "hello€" failed to compile',
      rootError: {
        message: "[$parse:lexerr] Lexer Error: Unexpected next character  at columns 5-5 [\u20AC] in expression [hello\u20AC].\nhttp://errors.angularjs.org/\"NG_VERSION_FULL\"/$parse/lexerr?p0=Unexpected%20next%20character%20&p1=s%205-5%20%5B%E2%82%AC%5D&p2=hello%E2%82%AC"
      },
      file: "word/document.xml",
      id: "scopeparser_compilation_failed",
      xtag: "hello€",
      offset: 0
    }
  }),
  errorType: Errors.XTTemplateError,
  resolved: null,
  result: '<w:t xml:space="preserve">undefined</w:t>'
}), _objectSpread(_objectSpread({
  it: "should disallow access to internal property",
  content: '<w:t>{"".split.toString()}</w:t>'
}, noInternals), {}, {
  options: {
    parser: expressionParser
  },
  scope: {},
  resolved: null,
  result: '<w:t xml:space="preserve">undefined</w:t>'
}), _objectSpread(_objectSpread({
  it: "should allow filters like | upper",
  content: "<w:t>{name | upper}</w:t>"
}, noInternals), {}, {
  options: {
    parser: expressionParser
  },
  scope: {
    name: "john"
  },
  resolved: null,
  result: '<w:t xml:space="preserve">JOHN</w:t>'
}), _objectSpread(_objectSpread({
  it: "should work when using angular assignment that is already in the scope",
  content: "<w:t>{b=a}{b}</w:t>"
}, noInternals), {}, {
  options: {
    parser: expressionParser
  },
  scope: {
    a: 10,
    b: 5
  },
  resolved: null,
  result: '<w:t xml:space="preserve">10</w:t>'
}), _objectSpread(_objectSpread({
  it: "should work with linebreaks",
  content: "<w:t>{b}</w:t>"
}, noInternals), {}, {
  options: {
    linebreaks: true,
    parser: expressionParser
  },
  scope: {
    b: "Hello\n\nFoo\n\nBar\n\n"
  },
  result: '<w:t xml:space="preserve">Hello</w:t></w:r><w:r><w:br/></w:r><w:r><w:t/></w:r><w:r><w:br/></w:r><w:r><w:t xml:space="preserve">Foo</w:t></w:r><w:r><w:br/></w:r><w:r><w:t/></w:r><w:r><w:br/></w:r><w:r><w:t xml:space="preserve">Bar</w:t></w:r><w:r><w:br/></w:r><w:r><w:t/></w:r><w:r><w:br/></w:r><w:r><w:t/>'
}), _objectSpread(_objectSpread({
  it: "should not fail with no scope on expressionParser",
  content: "<w:t>{b}</w:t>"
}, noInternals), {}, {
  options: {
    linebreaks: true,
    parser: expressionParser
  },
  result: '<w:t xml:space="preserve">undefined</w:t>'
}), _objectSpread(_objectSpread({
  it: "should be possible to add filter for one instance of the expressionParser",
  content: "<w:t>{b|foo}</w:t>"
}, noInternals), {}, {
  options: {
    linebreaks: true,
    parser: expressionParser.configure({
      filters: {
        foo: function foo() {
          return "FOO";
        }
      }
    })
  },
  result: '<w:t xml:space="preserve">FOO</w:t>'
}), _objectSpread(_objectSpread({
  it: "should be possible to add filter for one instance of the ie11 parser",
  content: "<w:t>{b|foo}</w:t>"
}, noInternals), {}, {
  options: {
    linebreaks: true,
    parser: angularParserIE11.configure({
      csp: true,
      filters: {
        foo: function foo() {
          return "FOO";
        }
      }
    })
  },
  result: '<w:t xml:space="preserve">FOO</w:t>'
}), _objectSpread(_objectSpread({
  it: "should not fail with no scope on ie11 parser",
  content: "<w:t>{b}</w:t>"
}, noInternals), {}, {
  options: {
    linebreaks: true,
    parser: angularParserIE11
  },
  result: '<w:t xml:space="preserve">undefined</w:t>'
}), {
  it: "should work for table with nested loops",
  content: "<w:tbl>\n\t\t<w:tr><w:tc><w:p><w:r><w:t>{#c1}A</w:t></w:r></w:p></w:tc></w:tr>\n\t\t<w:tr><w:tc><w:p><w:r><w:t>{/}{#c2}B</w:t></w:r><w:r><w:t>{/}</w:t></w:r></w:p></w:tc></w:tr>\n</w:tbl>",
  error: wrapMultiError({
    name: "TemplateError",
    message: "Unbalanced loop tag",
    properties: {
      explanation: "Unbalanced loop tags {#c1}{/}{#c2}{/}",
      file: "word/document.xml",
      id: "unbalanced_loop_tags",
      lastPair: {
        left: "c1",
        right: ""
      },
      offset: [0, 15],
      pair: {
        left: "c2",
        right: ""
      }
    }
  }),
  errorType: Errors.XTTemplateError
}, {
  it: "should not escape explanation for unclosed tag with &&",
  content: "<w:t>Unclosed tag : {Hi&amp;&amp;Ho</w:t>",
  error: wrapMultiError({
    name: "TemplateError",
    message: "Unclosed tag",
    properties: {
      explanation: 'The tag beginning with "{Hi&&Ho" is unclosed',
      context: "{Hi&&Ho",
      xtag: "Hi&&Ho",
      file: "word/document.xml",
      id: "unclosed_tag",
      offset: 15
    }
  }),
  errorType: Errors.XTTemplateError
}, {
  it: "should not escape explanation for unopened tag with &&",
  content: "<w:t>&&foo}</w:t>",
  error: wrapMultiError({
    name: "TemplateError",
    message: "Unopened tag",
    properties: {
      explanation: 'The tag beginning with "&&foo" is unopened',
      context: "&&foo",
      xtag: "&&foo",
      file: "word/document.xml",
      id: "unopened_tag",
      offset: null
    }
  }),
  errorType: Errors.XTTemplateError
}, {
  it: "should not escape explanation for unclosed loop with &&",
  content: "<w:t>Unclosed tag : {#Hi&amp;&amp;Ho}{/%%>&lt;&&bar}</w:t>",
  error: wrapMultiError({
    name: "TemplateError",
    message: "Closing tag does not match opening tag",
    properties: {
      explanation: 'The tag "Hi&&Ho" is closed by the tag "%%><&&bar"',
      file: "word/document.xml",
      openingtag: "Hi&&Ho",
      closingtag: "%%><&&bar",
      id: "closing_tag_does_not_match_opening_tag",
      offset: [15, 32]
    }
  }),
  errorType: Errors.XTTemplateError
}, {
  it: "should not escape explanation for duplicate opening with &&",
  content: "<w:t>Unclosed tag : {Hi&amp;&amp;{foo</w:t>",
  error: {
    message: "Multi error",
    name: "TemplateError",
    properties: {
      id: "multi_error",
      errors: [{
        name: "TemplateError",
        message: "Unclosed tag",
        properties: {
          context: "{Hi&&",
          xtag: "Hi&&",
          explanation: 'The tag beginning with "{Hi&&" is unclosed',
          file: "word/document.xml",
          id: "unclosed_tag",
          offset: null
        }
      }, {
        name: "TemplateError",
        message: "Unclosed tag",
        properties: {
          context: "{foo",
          xtag: "foo",
          explanation: 'The tag beginning with "{foo" is unclosed',
          file: "word/document.xml",
          id: "unclosed_tag",
          offset: null
        }
      }]
    }
  },
  errorType: Errors.XTTemplateError
}, _objectSpread(_objectSpread({
  it: "should add space=preserve to last tag"
}, noInternals), {}, {
  content: "<w:p>\n      <w:r>\n        <w:t>Hello {firstName} {</w:t>\n      </w:r>\n      <w:r>\n        <w:t>lastName</w:t>\n      </w:r>\n      <w:r>\n        <w:t>} world</w:t>\n      </w:r>\n    </w:p>",
  result: "<w:p>\n      <w:r>\n        <w:t xml:space=\"preserve\">Hello undefined undefined</w:t>\n      </w:r>\n      <w:r>\n        <w:t></w:t>\n      </w:r>\n      <w:r>\n        <w:t xml:space=\"preserve\"> world</w:t>\n      </w:r>\n    </w:p>"
}), _objectSpread(_objectSpread({
  it: "should not fail on SPACED unopened tag if allowUnopenedTag is true"
}, noInternals), {}, {
  content: "<w:p>\n      <w:r>\n        <w:t>Hello firstName} {</w:t>\n      </w:r>\n      <w:r>\n        <w:t>lastName</w:t>\n      </w:r>\n      <w:r>\n        <w:t>} } world} } }</w:t>\n      </w:r>\n    </w:p>",
  options: {
    syntax: {
      allowUnopenedTag: true
    }
  },
  scope: {
    firstName: "John",
    lastName: "Doe"
  },
  result: "<w:p>\n      <w:r>\n        <w:t xml:space=\"preserve\">Hello firstName} Doe</w:t>\n      </w:r>\n      <w:r>\n        <w:t></w:t>\n      </w:r>\n      <w:r>\n        <w:t xml:space=\"preserve\"> } world} } }</w:t>\n      </w:r>\n    </w:p>"
}), _objectSpread(_objectSpread({
  it: "should not fail on unopened tag if allowUnopenedTag is true"
}, noInternals), {}, {
  content: "<w:p>\n      <w:r>\n        <w:t>Hello firstName} {</w:t>\n      </w:r>\n      <w:r>\n        <w:t>lastName</w:t>\n      </w:r>\n      <w:r>\n        <w:t>}} world}}}</w:t>\n      </w:r>\n    </w:p>}",
  options: {
    syntax: {
      allowUnopenedTag: true
    }
  },
  scope: {
    firstName: "John",
    lastName: "Doe"
  },
  result: "<w:p>\n      <w:r>\n        <w:t xml:space=\"preserve\">Hello firstName} Doe</w:t>\n      </w:r>\n      <w:r>\n        <w:t></w:t>\n      </w:r>\n      <w:r>\n        <w:t xml:space=\"preserve\">} world}}}</w:t>\n      </w:r>\n    </w:p>}"
}), _objectSpread(_objectSpread({
  it: "should add space=preserve to last tag when having middle tag"
}, noInternals), {}, {
  content: "<w:p>\n\t\t<w:r>\n\t\t\t<w:t>Hello {</w:t>\n\t\t</w:r>\n\t\t<w:r>\n\t\t\t<w:t>last_name</w:t>\n\t\t</w:r>\n\t\t<w:r>\n\t\t\t<w:t>} {</w:t>\n\t\t</w:r>\n\t\t<w:r>\n\t\t\t<w:t>first_name</w:t>\n\t\t</w:r>\n\t\t<w:r>\n\t\t\t<w:t>} what's up ?</w:t>\n\t\t</w:r>\n    </w:p>",
  result: "<w:p>\n\t\t<w:r>\n\t\t\t<w:t xml:space=\"preserve\">Hello undefined</w:t>\n\t\t</w:r>\n\t\t<w:r>\n\t\t\t<w:t></w:t>\n\t\t</w:r>\n\t\t<w:r>\n\t\t\t<w:t xml:space=\"preserve\"> undefined</w:t>\n\t\t</w:r>\n\t\t<w:r>\n\t\t\t<w:t></w:t>\n\t\t</w:r>\n\t\t<w:r>\n\t\t\t<w:t xml:space=\"preserve\"> what's up ?</w:t>\n\t\t</w:r>\n    </w:p>"
}), _objectSpread(_objectSpread({
  it: "should parse self closing tags",
  content: '<w:pPr><w:spacing w:line="360" w:lineRule="auto"/></w:pPr>'
}, noInternals), {}, {
  result: null,
  xmllexed: [{
    position: "start",
    tag: "w:pPr",
    type: "tag",
    text: false,
    value: "<w:pPr>"
  }, {
    position: "selfclosing",
    tag: "w:spacing",
    type: "tag",
    text: false,
    value: '<w:spacing w:line="360" w:lineRule="auto"/>'
  }, {
    position: "end",
    tag: "w:pPr",
    type: "tag",
    text: false,
    value: "</w:pPr>"
  }]
}), _objectSpread(_objectSpread({
  it: "should not fail with empty loop inside loop",
  content: "<w:p><w:r><w:t>A{#a}</w:t></w:r></w:p>\n\t\t<w:p><w:r><w:t>{#c}{/}{/}</w:t></w:r></w:p>"
}, noInternals), {}, {
  result: '<w:p><w:r><w:t xml:space="preserve">A</w:t></w:r></w:p>'
}), _objectSpread(_objectSpread({
  // The specificity of this input is that it contains : <a:ext uri="{9D8B030D-6E8A-4147-A177-3AD203B41FA5}">
  // So in the algorithm that updates the height of the table, those tags should be ignored
  it: "should work with table pptx nested and empty 'ext' element"
}, noInternals), {}, {
  content: "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<p:sld xmlns:a=\"http://schemas.openxmlformats.org/drawingml/2006/main\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\" xmlns:p=\"http://schemas.openxmlformats.org/presentationml/2006/main\">\n  <p:cSld>\n    <p:spTree>\n      <p:graphicFrame>\n        <p:xfrm>\n          <a:off x=\"3561792\" y=\"1315064\"/>\n          <a:ext cx=\"5853297\" cy=\"713565\"/>\n        </p:xfrm>\n        <a:graphic>\n          <a:graphicData uri=\"http://schemas.openxmlformats.org/drawingml/2006/table\">\n            <a:tbl>\n              <a:tblGrid>\n                <a:gridCol w=\"3275655\">\n                  <a:extLst>\n                    <a:ext uri=\"{9D8B030D-6E8A-4147-A177-3AD203B41FA5}\">\n                      <a16:colId xmlns:a16=\"http://schemas.microsoft.com/office/drawing/2014/main\" val=\"3066261218\"/>\n                    </a:ext>\n                  </a:extLst>\n                </a:gridCol>\n                <a:gridCol w=\"2577642\">\n                  <a:extLst>\n                    <a:ext uri=\"{9D8B030D-6E8A-4147-A177-3AD203B41FA5}\">\n                      <a16:colId xmlns:a16=\"http://schemas.microsoft.com/office/drawing/2014/main\" val=\"913921408\"/>\n                    </a:ext>\n                  </a:extLst>\n                </a:gridCol>\n              </a:tblGrid>\n              <a:tr h=\"347805\">\n                <a:tc>\n                  <a:txBody>\n                    <a:bodyPr/>\n                    <a:lstStyle/>\n                    <a:p>\n                      <a:r>\n                        <a:t>ABC</a:t>\n                      </a:r>\n                    </a:p>\n                  </a:txBody>\n                  <a:tcPr/>\n                </a:tc>\n                <a:tc>\n                  <a:txBody>\n                    <a:bodyPr/>\n                    <a:lstStyle/>\n                    <a:p>\n                      <a:r>\n                        <a:t>DEF</a:t>\n                      </a:r>\n                    </a:p>\n                  </a:txBody>\n                  <a:tcPr/>\n                </a:tc>\n                <a:extLst>\n                  <a:ext uri=\"{0D108BD9-81ED-4DB2-BD59-A6C34878D82A}\">\n                    <a16:rowId xmlns:a16=\"http://schemas.microsoft.com/office/drawing/2014/main\" val=\"2223618801\"/>\n                  </a:ext>\n                </a:extLst>\n              </a:tr>\n              <a:tr h=\"347805\">\n                <a:tc>\n                  <a:txBody>\n                    <a:bodyPr/>\n                    <a:lstStyle/>\n                    <a:p>\n                      <a:r>\n                        <a:t>{#loop1}{#loop2}</a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t>{name}</a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t>{/}{#loop3}</a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t>TTT</a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t>{/}</a:t>\n                      </a:r>\n                    </a:p>\n                  </a:txBody>\n                  <a:tcPr/>\n                </a:tc>\n                <a:tc>\n                  <a:txBody>\n                    <a:bodyPr/>\n                    <a:lstStyle/>\n                    <a:p>\n                      <a:r>\n                        <a:t>{#loop3}</a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t>{name}</a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t>{/}{#loop4}</a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t>DEF</a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t>{/}{/loop1}</a:t>\n                      </a:r>\n                    </a:p>\n                  </a:txBody>\n                  <a:tcPr/>\n                </a:tc>\n                <a:extLst>\n                  <a:ext uri=\"{0D108BD9-81ED-4DB2-BD59-A6C34878D82A}\">\n                    <a16:rowId xmlns:a16=\"http://schemas.microsoft.com/office/drawing/2014/main\" val=\"1379104515\"/>\n                  </a:ext>\n                </a:extLst>\n              </a:tr>\n            </a:tbl>\n          </a:graphicData>\n        </a:graphic>\n      </p:graphicFrame>\n    </p:spTree>\n    <p:extLst>\n      <p:ext uri=\"{BB962C8B-B14F-4D97-AF65-F5344CB8AC3E}\">\n        <p14:creationId xmlns:p14=\"http://schemas.microsoft.com/office/powerpoint/2010/main\" val=\"2554173214\"/>\n      </p:ext>\n    </p:extLst>\n  </p:cSld>\n  <p:clrMapOvr>\n    <a:masterClrMapping/>\n  </p:clrMapOvr>\n</p:sld>",
  scope: {
    loop1: [1, 2, 3],
    loop2: [1, 2, 3]
  },
  result: "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<p:sld xmlns:a=\"http://schemas.openxmlformats.org/drawingml/2006/main\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\" xmlns:p=\"http://schemas.openxmlformats.org/presentationml/2006/main\">\n  <p:cSld>\n    <p:spTree>\n      <p:graphicFrame>\n        <p:xfrm>\n          <a:off x=\"3561792\" y=\"1315064\"/>\n          <a:ext cx=\"5853297\" cy=\"1409175\"/>\n        </p:xfrm>\n        <a:graphic>\n          <a:graphicData uri=\"http://schemas.openxmlformats.org/drawingml/2006/table\">\n            <a:tbl>\n              <a:tblGrid>\n                <a:gridCol w=\"3275655\">\n                  <a:extLst>\n                    <a:ext uri=\"{9D8B030D-6E8A-4147-A177-3AD203B41FA5}\">\n                      <a16:colId xmlns:a16=\"http://schemas.microsoft.com/office/drawing/2014/main\" val=\"3066261218\"/>\n                    </a:ext>\n                  </a:extLst>\n                </a:gridCol>\n                <a:gridCol w=\"2577642\">\n                  <a:extLst>\n                    <a:ext uri=\"{9D8B030D-6E8A-4147-A177-3AD203B41FA5}\">\n                      <a16:colId xmlns:a16=\"http://schemas.microsoft.com/office/drawing/2014/main\" val=\"913921408\"/>\n                    </a:ext>\n                  </a:extLst>\n                </a:gridCol>\n              </a:tblGrid>\n              <a:tr h=\"347805\">\n                <a:tc>\n                  <a:txBody>\n                    <a:bodyPr/>\n                    <a:lstStyle/>\n                    <a:p>\n                      <a:r>\n                        <a:t>ABC</a:t>\n                      </a:r>\n                    </a:p>\n                  </a:txBody>\n                  <a:tcPr/>\n                </a:tc>\n                <a:tc>\n                  <a:txBody>\n                    <a:bodyPr/>\n                    <a:lstStyle/>\n                    <a:p>\n                      <a:r>\n                        <a:t>DEF</a:t>\n                      </a:r>\n                    </a:p>\n                  </a:txBody>\n                  <a:tcPr/>\n                </a:tc>\n                <a:extLst>\n                  <a:ext uri=\"{0D108BD9-81ED-4DB2-BD59-A6C34878D82A}\">\n                    <a16:rowId xmlns:a16=\"http://schemas.microsoft.com/office/drawing/2014/main\" val=\"2223618801\"/>\n                  </a:ext>\n                </a:extLst>\n              </a:tr>\n              <a:tr h=\"347805\">\n                <a:tc>\n                  <a:txBody>\n                    <a:bodyPr/>\n                    <a:lstStyle/>\n                    <a:p>\n                      <a:r>\n                        <a:t></a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t>undefined</a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t></a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t>undefined</a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t></a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t>undefined</a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t></a:t>\n                      </a:r>\n                    </a:p>\n                  </a:txBody>\n                  <a:tcPr/>\n                </a:tc>\n                <a:tc>\n                  <a:txBody>\n                    <a:bodyPr/>\n                    <a:lstStyle/>\n                    <a:p>\n                      <a:r>\n                        <a:t></a:t>\n                      </a:r>\n                    </a:p>\n                  </a:txBody>\n                  <a:tcPr/>\n                </a:tc>\n                <a:extLst>\n                  <a:ext uri=\"{0D108BD9-81ED-4DB2-BD59-A6C34878D82A}\">\n                    <a16:rowId xmlns:a16=\"http://schemas.microsoft.com/office/drawing/2014/main\" val=\"1379104515\"/>\n                  </a:ext>\n                </a:extLst>\n              </a:tr><a:tr h=\"347805\">\n                <a:tc>\n                  <a:txBody>\n                    <a:bodyPr/>\n                    <a:lstStyle/>\n                    <a:p>\n                      <a:r>\n                        <a:t></a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t>undefined</a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t></a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t>undefined</a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t></a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t>undefined</a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t></a:t>\n                      </a:r>\n                    </a:p>\n                  </a:txBody>\n                  <a:tcPr/>\n                </a:tc>\n                <a:tc>\n                  <a:txBody>\n                    <a:bodyPr/>\n                    <a:lstStyle/>\n                    <a:p>\n                      <a:r>\n                        <a:t></a:t>\n                      </a:r>\n                    </a:p>\n                  </a:txBody>\n                  <a:tcPr/>\n                </a:tc>\n                <a:extLst>\n                  <a:ext uri=\"{0D108BD9-81ED-4DB2-BD59-A6C34878D82A}\">\n                    <a16:rowId xmlns:a16=\"http://schemas.microsoft.com/office/drawing/2014/main\" val=\"1379104516\"/>\n                  </a:ext>\n                </a:extLst>\n              </a:tr><a:tr h=\"347805\">\n                <a:tc>\n                  <a:txBody>\n                    <a:bodyPr/>\n                    <a:lstStyle/>\n                    <a:p>\n                      <a:r>\n                        <a:t></a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t>undefined</a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t></a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t>undefined</a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t></a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t>undefined</a:t>\n                      </a:r>\n                      <a:r>\n                        <a:t></a:t>\n                      </a:r>\n                    </a:p>\n                  </a:txBody>\n                  <a:tcPr/>\n                </a:tc>\n                <a:tc>\n                  <a:txBody>\n                    <a:bodyPr/>\n                    <a:lstStyle/>\n                    <a:p>\n                      <a:r>\n                        <a:t></a:t>\n                      </a:r>\n                    </a:p>\n                  </a:txBody>\n                  <a:tcPr/>\n                </a:tc>\n                <a:extLst>\n                  <a:ext uri=\"{0D108BD9-81ED-4DB2-BD59-A6C34878D82A}\">\n                    <a16:rowId xmlns:a16=\"http://schemas.microsoft.com/office/drawing/2014/main\" val=\"1379104517\"/>\n                  </a:ext>\n                </a:extLst>\n              </a:tr>\n            </a:tbl>\n          </a:graphicData>\n        </a:graphic>\n      </p:graphicFrame>\n    </p:spTree>\n    <p:extLst>\n      <p:ext uri=\"{BB962C8B-B14F-4D97-AF65-F5344CB8AC3E}\">\n        <p14:creationId xmlns:p14=\"http://schemas.microsoft.com/office/powerpoint/2010/main\" val=\"2554173214\"/>\n      </p:ext>\n    </p:extLst>\n  </p:cSld>\n  <p:clrMapOvr>\n    <a:masterClrMapping/>\n  </p:clrMapOvr>\n</p:sld>",
  pptx: true
})];
var rawXmlTest = {
  it: "should work with rawxml",
  content: "BEFORE<w:p><w:t>{@rawxml}</w:t></w:p>AFTER",
  scope: {
    rawxml: '<w:p><w:pPr><w:rPr><w:color w:val="FF0000"/></w:rPr></w:pPr><w:r><w:rPr><w:color w:val="FF0000"/></w:rPr><w:t>My custom</w:t></w:r><w:r><w:rPr><w:color w:val="00FF00"/></w:rPr><w:t>XML</w:t></w:r></w:p>'
  },
  result: 'BEFORE<w:p><w:pPr><w:rPr><w:color w:val="FF0000"/></w:rPr></w:pPr><w:r><w:rPr><w:color w:val="FF0000"/></w:rPr><w:t>My custom</w:t></w:r><w:r><w:rPr><w:color w:val="00FF00"/></w:rPr><w:t>XML</w:t></w:r></w:p>AFTER',
  lexed: [externalContent("BEFORE"), startParagraph, startText, delimiters.start, content("@rawxml"), delimiters.end, endText, endParagraph, externalContent("AFTER")],
  parsed: [externalContent("BEFORE"), startParagraph, startText, {
    type: "placeholder",
    value: "rawxml",
    module: "rawxml"
  }, endText, endParagraph, externalContent("AFTER")],
  postparsed: [externalContent("BEFORE"), {
    type: "placeholder",
    value: "rawxml",
    module: "rawxml",
    expanded: [[startParagraph, xmlSpacePreserveTag], [endText, endParagraph]]
  }, externalContent("AFTER")]
};
fixtures.push(rawXmlTest);
fixtures.push(_objectSpread(_objectSpread({}, rawXmlTest), {}, {
  it: "should work with rawxml with undefined tags",
  scope: {},
  result: "BEFOREAFTER"
}));
fixtures.push(_objectSpread(_objectSpread({}, rawXmlTest), {}, {
  it: "should throw error with rawxml with scope that is an integer",
  scope: {
    rawxml: 11
  },
  error: wrapMultiError({
    name: "RenderingError",
    message: "Non string values are not allowed for rawXML tags",
    properties: {
      explanation: "The value of the raw tag : 'rawxml' is not a string",
      file: "word/document.xml",
      id: "invalid_raw_xml_value",
      value: 11,
      xtag: "rawxml",
      offset: 0
    }
  }),
  errorType: Errors.XTTemplateError
}));
fixtures.forEach(function (fixture) {
  var delimiters = {
    delimiters: fixture.delimiters || {
      start: "{",
      end: "}"
    }
  };
  fixture.options = assign({}, fixture.options, delimiters);
});
module.exports = fixtures;