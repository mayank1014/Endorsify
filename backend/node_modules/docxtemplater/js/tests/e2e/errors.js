"use strict";

var _require = require("../utils.js"),
  loadFile = _require.loadFile,
  loadDocument = _require.loadDocument,
  rejectSoon = _require.rejectSoon,
  expect = _require.expect;
var Errors = require("../../errors.js");
var _require2 = require("../utils.js"),
  makeDocx = _require2.makeDocx,
  makeDocxV4 = _require2.makeDocxV4,
  wrapMultiError = _require2.wrapMultiError,
  expectToThrow = _require2.expectToThrow,
  expectToThrowSnapshot = _require2.expectToThrowSnapshot,
  expectToThrowAsync = _require2.expectToThrowAsync,
  captureLogs = _require2.captureLogs;
var angularParser = require("../../expressions.js");
describe("Compilation errors", function () {
  it("should fail when parsing invalid xml (1)", function () {
    var content = "<w:t";
    var expectedError = {
      name: "TemplateError",
      message: "An XML file has invalid xml",
      properties: {
        content: content,
        offset: 0,
        id: "file_has_invalid_xml"
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content);
    }, Errors.XTTemplateError, expectedError);
  });
  it("should fail when parsing invalid xml (2)", function () {
    var content = "<w:t>Foobar </w:t><w:t>Foobar </w:t><w:t>Foobar </w:t> <w:t John Jane Mary Doe</w:t>";
    var expectedError = {
      name: "TemplateError",
      message: "An XML file has invalid xml",
      properties: {
        content: content,
        offset: 55,
        id: "file_has_invalid_xml"
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content);
    }, Errors.XTTemplateError, expectedError);
  });
  it("should fail when tag unclosed at end of document", function () {
    var content = "<w:t>{unclosedtag my text</w:t>";
    var expectedError = {
      name: "TemplateError",
      message: "Unclosed tag",
      properties: {
        context: "{unclosedtag my text",
        file: "word/document.xml",
        id: "unclosed_tag",
        xtag: "unclosedtag",
        offset: 0
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    }, Errors.XTTemplateError, wrapMultiError(expectedError));
  });
  it("should be possible to not log error message", function () {
    var content = "<w:t>{unclosedtag my text</w:t>";
    var expectedError = {
      name: "TemplateError",
      message: "Unclosed tag",
      properties: {
        context: "{unclosedtag my text",
        file: "word/document.xml",
        id: "unclosed_tag",
        xtag: "unclosedtag",
        offset: 0
      }
    };
    var capture = captureLogs();
    expectToThrow(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    }, Errors.XTTemplateError, wrapMultiError(expectedError));
    capture.stop();
    var logs = capture.logs();
    expect(logs.length).to.equal(0);
  });
  it("should fail when tag unclosed", function () {
    var content = "<w:t>{user {name}</w:t>";
    var expectedError = {
      name: "TemplateError",
      message: "Unclosed tag",
      properties: {
        file: "word/document.xml",
        id: "unclosed_tag",
        context: "{user ",
        xtag: "user",
        offset: 0
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    }, Errors.XTTemplateError, wrapMultiError(expectedError));
  });
  it("should fail when tag unopened", function () {
    var content = "<w:t>foobar}age</w:t>";
    var expectedError = {
      name: "TemplateError",
      message: "Unopened tag",
      properties: {
        file: "word/document.xml",
        id: "unopened_tag",
        context: "foobar",
        offset: 6,
        xtag: "foobar"
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    }, Errors.XTTemplateError, wrapMultiError(expectedError));
  });
  it("should fail when closing {#users} with {/foo}", function () {
    var content = "<w:t>{#users}User {name}{/foo}</w:t>";
    var expectedError = {
      name: "TemplateError",
      message: "Closing tag does not match opening tag",
      properties: {
        file: "word/document.xml",
        id: "closing_tag_does_not_match_opening_tag",
        openingtag: "users",
        closingtag: "foo"
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    }, Errors.XTTemplateError, wrapMultiError(expectedError));
  });
  it("should fail when closing an unopened loop", function () {
    var content = "<w:t>{/loop} {foobar}</w:t>";
    var expectedError = {
      name: "TemplateError",
      message: "Unopened loop",
      properties: {
        file: "word/document.xml",
        id: "unopened_loop",
        xtag: "loop",
        offset: 0
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    }, Errors.XTTemplateError, wrapMultiError(expectedError));
  });
  it("should fail when a loop is never closed", function () {
    var content = "<w:t>{#loop} {foobar}</w:t>";
    var expectedError = {
      name: "TemplateError",
      message: "Unclosed loop",
      properties: {
        file: "word/document.xml",
        id: "unclosed_loop",
        xtag: "loop",
        offset: 0
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    }, Errors.XTTemplateError, wrapMultiError(expectedError));
  });
  it("should fail early when a loop closes the wrong loop", function () {
    var content = "<w:t>{#loop1}{#loop2}{/loop3}{/loop3}{/loop2}{/loop1}</w:t>";
    expectToThrowSnapshot(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    });
  });
  it("should fail when rawtag is not in paragraph", function () {
    var content = "<w:t>{@myrawtag}</w:t>";
    expectToThrowSnapshot(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    });
  });
  it("should fail when rawtag is in table without paragraph", function () {
    var content = "<w:tbl><w:t>{@myrawtag}</w:t></w:p></w:tbl>";
    expectToThrowSnapshot(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    });
  });
  it("should fail when rawtag is not only text in paragraph", function () {
    var content = "<w:p><w:t> {@myrawtag}</w:t><w:t>foobar</w:t></w:p>";
    var expectedError = {
      name: "TemplateError",
      message: "Raw tag should be the only text in paragraph",
      properties: {
        file: "word/document.xml",
        id: "raw_xml_tag_should_be_only_text_in_paragraph",
        xtag: "myrawtag",
        offset: 1,
        paragraphPartsLength: 7
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    }, Errors.XTTemplateError, wrapMultiError(expectedError));
  });
  it("should count 3 errors when having rawxml and two other errors", function () {
    var content = "<w:p><w:r><w:t>foo} {@bang} bar}</w:t></w:r></w:p>";
    expectToThrowSnapshot(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    });
  });
  it("should fail when customparser fails to compile", function () {
    var content = "<w:t>{name++}</w:t>";
    var expectedError = {
      name: "ScopeParserError",
      message: "Scope parser compilation failed",
      properties: {
        file: "word/document.xml",
        id: "scopeparser_compilation_failed",
        xtag: "name++",
        rootError: {
          message: "[$parse:ueoe] Unexpected end of expression: name++\nhttp://errors.angularjs.org/\"NG_VERSION_FULL\"/$parse/ueoe?p0=name%2B%2B"
        }
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        parser: angularParser,
        errorLogging: false
      });
    }, Errors.XTTemplateError, wrapMultiError(expectedError));
  });
});
describe("Runtime errors", function () {
  it("should fail when customparser fails to execute", function () {
    var content = "<w:t> {name|upper}</w:t>";
    function errorParser() {
      return {
        get: function get() {
          throw new Error("foo bar");
        }
      };
    }
    var expectedError = {
      name: "TemplateError",
      message: "Multi error",
      properties: {
        errors: [{
          name: "ScopeParserError",
          message: "Scope parser execution failed",
          properties: {
            file: "word/document.xml",
            id: "scopeparser_execution_failed",
            xtag: "name|upper",
            offset: 1,
            rootError: {
              message: "foo bar"
            }
          }
        }],
        id: "multi_error"
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        parser: errorParser,
        errorLogging: false
      }).render();
    }, Errors.XTTemplateError, expectedError);
  });
  it("should be possible to log the error", function () {
    var errorStringified = "";
    var content = "<w:t> {name|upper}</w:t>";
    function errorParser() {
      return {
        get: function get() {
          throw new Error("foo bar 6aaef652-8525-4442-b9b8-5ab942b2c476");
        }
      };
    }
    function replaceErrors(key, value) {
      if (value instanceof Error) {
        return Object.getOwnPropertyNames(value).reduce(function (error, key) {
          error[key] = value[key];
          return error;
        }, {});
      }
      return value;
    }
    var capture = captureLogs();
    try {
      makeDocxV4(content, {
        parser: errorParser
      }).render();
      capture.stop();
    } catch (e) {
      capture.stop();
      errorStringified = JSON.stringify(e, replaceErrors, 2);
    }
    expect(errorStringified).to.contain("foo bar 6aaef652-8525-4442-b9b8-5ab942b2c476");
  });
  it("should fail with multi-error when customparser fails to execute on multiple raw tags", function () {
    var content = "\n\t\t<w:p><w:r><w:t>{@raw|isfalse}</w:t></w:r></w:p>\n\t\t<w:p><w:r><w:t>{@raw|istrue}</w:t></w:r></w:p>\n\t\t";
    var count = 0;
    function errorParser() {
      return {
        get: function get() {
          count++;
          throw new Error("foo ".concat(count));
        }
      };
    }
    var expectedError = {
      name: "TemplateError",
      message: "Multi error",
      properties: {
        errors: [{
          name: "ScopeParserError",
          message: "Scope parser execution failed",
          properties: {
            id: "scopeparser_execution_failed",
            file: "word/document.xml",
            xtag: "raw|isfalse",
            rootError: {
              message: "foo 1"
            },
            offset: 0
          }
        }, {
          name: "ScopeParserError",
          message: "Scope parser execution failed",
          properties: {
            file: "word/document.xml",
            id: "scopeparser_execution_failed",
            xtag: "raw|istrue",
            rootError: {
              message: "foo 2"
            },
            offset: 14
          }
        }],
        id: "multi_error"
      }
    };
    var doc = makeDocxV4(content, {
      parser: errorParser,
      errorLogging: false
    });
    expectToThrow(function () {
      return doc.render();
    }, Errors.XTTemplateError, expectedError);
  });
});
describe("Internal errors", function () {
  it("should fail if using odt format", function (done) {
    var expectedError = {
      name: "InternalError",
      message: 'The filetype "odt" is not handled by docxtemplater',
      properties: {
        id: "filetype_not_handled",
        fileType: "odt"
      }
    };
    loadFile("test.odt", function (e, name, buffer) {
      expectToThrow(function () {
        return loadDocument(name, buffer);
      }, Errors.XTInternalError, expectedError);
      done();
    });
  });
  it("should fail if using zip file", function (done) {
    var expectedError = {
      name: "InternalError",
      message: "The filetype for this file could not be identified, is this file corrupted ?",
      properties: {
        id: "filetype_not_identified"
      }
    };
    loadFile("simple-zip.zip", function (e, name, buffer) {
      expectToThrow(function () {
        return loadDocument(name, buffer);
      }, Errors.XTInternalError, expectedError);
      done();
    });
  });
});
describe("Multi errors", function () {
  it("should work with multiple errors simple", function () {
    var content = "<w:t>foo} Hello {user, my age is {bar}</w:t>";
    var expectedError = {
      name: "TemplateError",
      message: "Multi error",
      properties: {
        id: "multi_error",
        errors: [{
          message: "Unopened tag",
          name: "TemplateError",
          properties: {
            offset: 3,
            context: "foo",
            id: "unopened_tag",
            xtag: "foo",
            file: "word/document.xml"
          }
        }, {
          message: "Unclosed tag",
          name: "TemplateError",
          properties: {
            offset: 11,
            context: "{user, my age is ",
            id: "unclosed_tag",
            xtag: "user,",
            file: "word/document.xml"
          }
        }]
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    }, Errors.XTTemplateError, expectedError);
  });
  it("should work with multiple errors complex", function () {
    var content = "<w:t>foo}\n\t\tHello {user, my age is {bar}\n\t\t\tHi bang}, my name is {user2}\n\t\t\tHey {user}, my age is {bar}\n\t\t\tHola {bang}, my name is {user2}\n\t\t\t{user, my age is {bar\n\t\t\t\t</w:t>".replace(/\t/g, "").split("\n").join("!");
    expectToThrowSnapshot(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    });
  });
  it("should work with wrongly nested loops", function () {
    var content = "\n\t\t<w:t>\n\t\t\t{#users}.........{/companies}\n\t\t\t{#companies}.....{/users}\n\t\t</w:t>\n\t\t";
    var expectedError = {
      name: "TemplateError",
      message: "Multi error",
      properties: {
        errors: [{
          name: "TemplateError",
          message: "Unopened loop",
          properties: {
            file: "word/document.xml",
            id: "unopened_loop",
            xtag: "companies"
          }
        }, {
          name: "TemplateError",
          message: "Unclosed loop",
          properties: {
            file: "word/document.xml",
            id: "unclosed_loop",
            xtag: "companies"
          }
        }],
        id: "multi_error"
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    }, Errors.XTTemplateError, expectedError);
  });
  it("should work with loops", function () {
    var content = "\n\t\t<w:t>{#users}User name{/foo}\n\t\t{#bang}User name{/baz}\n\t\t</w:t>\n\t\t";
    var expectedError = {
      name: "TemplateError",
      message: "Multi error",
      properties: {
        errors: [{
          name: "TemplateError",
          message: "Closing tag does not match opening tag",
          properties: {
            file: "word/document.xml",
            id: "closing_tag_does_not_match_opening_tag",
            openingtag: "users",
            closingtag: "foo"
          }
        }, {
          name: "TemplateError",
          message: "Closing tag does not match opening tag",
          properties: {
            file: "word/document.xml",
            id: "closing_tag_does_not_match_opening_tag",
            openingtag: "bang",
            closingtag: "baz"
          }
        }],
        id: "multi_error"
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    }, Errors.XTTemplateError, expectedError);
  });
  it("should work with loops unopened", function () {
    var content = "\n\t\t<w:t>{/loop} {#users}User name{/foo}\n\t\t{#bang}User name{/baz}\n\t\t{/fff}\n\t\t{#yum}\n\t\t</w:t>\n\t\t";
    expectToThrowSnapshot(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    });
  });
  it("should fail when having multiple rawtags without a surrounding paragraph", function () {
    var content = "<w:t>{@first}</w:t><w:p><w:t>foo{@second}</w:t></w:p>";
    var expectedError = {
      name: "TemplateError",
      message: "Multi error",
      properties: {
        errors: [{
          name: "TemplateError",
          message: "Raw tag not in paragraph",
          properties: {
            file: "word/document.xml",
            id: "raw_tag_outerxml_invalid",
            xtag: "first",
            rootError: {
              message: 'No tag "w:p" was found at the left'
            },
            postparsedLength: 9,
            expandTo: "w:p",
            offset: 0,
            index: 1
          }
        }, {
          name: "TemplateError",
          message: "Raw tag should be the only text in paragraph",
          properties: {
            file: "word/document.xml",
            id: "raw_xml_tag_should_be_only_text_in_paragraph",
            paragraphPartsLength: 4,
            xtag: "second",
            offset: 11
          }
        }],
        id: "multi_error"
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    }, Errors.XTTemplateError, expectedError);
  });
  it("should fail when customparser fails to compile", function () {
    var content = "<w:t>{name++} {foo|||bang}</w:t>";
    var expectedError = {
      message: "Multi error",
      name: "TemplateError",
      properties: {
        errors: [{
          name: "ScopeParserError",
          message: "Scope parser compilation failed",
          properties: {
            file: "word/document.xml",
            offset: 0,
            id: "scopeparser_compilation_failed",
            xtag: "name++",
            rootError: {
              message: "[$parse:ueoe] Unexpected end of expression: name++\nhttp://errors.angularjs.org/\"NG_VERSION_FULL\"/$parse/ueoe?p0=name%2B%2B"
            }
          }
        }, {
          name: "ScopeParserError",
          message: "Scope parser compilation failed",
          properties: {
            file: "word/document.xml",
            offset: 9,
            id: "scopeparser_compilation_failed",
            xtag: "foo|||bang",
            rootError: {
              message: "[$parse:syntax] Syntax Error: Token '|' not a primary expression at column 6 of the expression [foo|||bang] starting at [|bang].\nhttp://errors.angularjs.org/\"NG_VERSION_FULL\"/$parse/syntax?p0=%7C&p1=not%20a%20primary%20expression&p2=6&p3=foo%7C%7C%7Cbang&p4=%7Cbang"
            }
          }
        }],
        id: "multi_error"
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        parser: angularParser,
        errorLogging: false
      });
    }, Errors.XTTemplateError, expectedError);
  });
  it("should fail when customparser fails to compile 2", function () {
    var content = "<w:t>{name++} {foo|||bang}</w:t>";
    var expectedError = {
      message: "Multi error",
      name: "TemplateError",
      properties: {
        errors: [{
          name: "ScopeParserError",
          message: "Scope parser compilation failed",
          properties: {
            file: "word/document.xml",
            id: "scopeparser_compilation_failed",
            xtag: "name++",
            rootError: {
              message: "[$parse:ueoe] Unexpected end of expression: name++\nhttp://errors.angularjs.org/\"NG_VERSION_FULL\"/$parse/ueoe?p0=name%2B%2B"
            }
          }
        }, {
          name: "ScopeParserError",
          message: "Scope parser compilation failed",
          properties: {
            file: "word/document.xml",
            id: "scopeparser_compilation_failed",
            xtag: "foo|||bang",
            rootError: {
              message: "[$parse:syntax] Syntax Error: Token '|' not a primary expression at column 6 of the expression [foo|||bang] starting at [|bang].\nhttp://errors.angularjs.org/\"NG_VERSION_FULL\"/$parse/syntax?p0=%7C&p1=not%20a%20primary%20expression&p2=6&p3=foo%7C%7C%7Cbang&p4=%7Cbang"
            }
          }
        }],
        id: "multi_error"
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        parser: angularParser,
        errorLogging: false
      });
    }, Errors.XTTemplateError, expectedError);
  });
  it("should work with lexer and customparser", function () {
    var content = "<w:t>foo} Hello {name++}</w:t>";
    var expectedError = {
      name: "TemplateError",
      message: "Multi error",
      properties: {
        id: "multi_error",
        errors: [{
          message: "Unopened tag",
          name: "TemplateError",
          properties: {
            context: "foo",
            id: "unopened_tag",
            xtag: "foo",
            file: "word/document.xml"
          }
        }, {
          message: "Scope parser compilation failed",
          name: "ScopeParserError",
          properties: {
            id: "scopeparser_compilation_failed",
            xtag: "name++",
            rootError: {
              message: "[$parse:ueoe] Unexpected end of expression: name++\nhttp://errors.angularjs.org/\"NG_VERSION_FULL\"/$parse/ueoe?p0=name%2B%2B"
            },
            file: "word/document.xml"
          }
        }]
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        parser: angularParser,
        errorLogging: false
      });
    }, Errors.XTTemplateError, expectedError);
  });
  it("should work with lexer and loop", function () {
    var content = "<w:t>foo} The users are {#users}{/bar}</w:t>";
    var expectedError = {
      name: "TemplateError",
      message: "Multi error",
      properties: {
        id: "multi_error",
        errors: [{
          message: "Unopened tag",
          name: "TemplateError",
          properties: {
            context: "foo",
            id: "unopened_tag",
            xtag: "foo",
            file: "word/document.xml"
          }
        }, {
          name: "TemplateError",
          message: "Closing tag does not match opening tag",
          properties: {
            id: "closing_tag_does_not_match_opening_tag",
            openingtag: "users",
            closingtag: "bar",
            file: "word/document.xml"
          }
        }]
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        parser: angularParser,
        errorLogging: false
      });
    }, Errors.XTTemplateError, expectedError);
  });
  it("should work with multiple errors", function () {
    var content = "<w:t>foo</w:t><w:t>} The users are {#users}{/bar} {@bang} </w:t>";
    var expectedError = {
      name: "TemplateError",
      message: "Multi error",
      properties: {
        id: "multi_error",
        errors: [{
          message: "Unopened tag",
          name: "TemplateError",
          properties: {
            context: "foo",
            id: "unopened_tag",
            xtag: "foo",
            file: "word/document.xml"
          }
        }, {
          name: "TemplateError",
          message: "Closing tag does not match opening tag",
          properties: {
            id: "closing_tag_does_not_match_opening_tag",
            openingtag: "users",
            closingtag: "bar",
            offset: [19, 27],
            file: "word/document.xml"
          }
        }, {
          name: "TemplateError",
          message: "Raw tag not in paragraph",
          properties: {
            id: "raw_tag_outerxml_invalid",
            xtag: "bang",
            rootError: {
              message: 'No tag "w:p" was found at the left'
            },
            postparsedLength: 12,
            expandTo: "w:p",
            index: 9,
            file: "word/document.xml"
          }
        }]
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        parser: angularParser,
        errorLogging: false
      });
    }, Errors.XTTemplateError, expectedError);
  });
  it("should work with multiple unclosed", function () {
    var content = "<w:t>foo</w:t>\n\t\t<w:t>{city, {state {zip </w:t>";
    var expectedError = {
      name: "TemplateError",
      message: "Multi error",
      properties: {
        errors: [{
          name: "TemplateError",
          message: "Unclosed tag",
          properties: {
            offset: 3,
            xtag: "city,",
            id: "unclosed_tag",
            context: "{city, ",
            file: "word/document.xml"
          }
        }, {
          name: "TemplateError",
          message: "Unclosed tag",
          properties: {
            offset: 10,
            xtag: "state",
            id: "unclosed_tag",
            context: "{state ",
            file: "word/document.xml"
          }
        }, {
          name: "TemplateError",
          message: "Unclosed tag",
          properties: {
            offset: 17,
            xtag: "zip",
            id: "unclosed_tag",
            context: "{zip ",
            file: "word/document.xml"
          }
        }],
        id: "multi_error"
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        parser: angularParser,
        errorLogging: false
      });
    }, Errors.XTTemplateError, expectedError);
  });
  it("should work with multiple unopened", function () {
    var content = "<w:t>foo</w:t>\n\t\t\t<w:t> city}, state} zip}</w:t>";
    var expectedError = {
      name: "TemplateError",
      message: "Multi error",
      properties: {
        errors: [{
          name: "TemplateError",
          message: "Unopened tag",
          properties: {
            xtag: "city",
            id: "unopened_tag",
            context: "foo city",
            file: "word/document.xml"
          }
        }, {
          name: "TemplateError",
          message: "Unopened tag",
          properties: {
            xtag: "state",
            id: "unopened_tag",
            context: "}, state",
            file: "word/document.xml"
          }
        }, {
          name: "TemplateError",
          message: "Unopened tag",
          properties: {
            xtag: "zip",
            id: "unopened_tag",
            context: "} zip",
            file: "word/document.xml"
          }
        }],
        id: "multi_error"
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        parser: angularParser,
        errorLogging: false
      });
    }, Errors.XTTemplateError, expectedError);
  });
  it("should show an error when loop tag are badly used (xml open count !== xml close count)", function () {
    var content = "<w:tbl>\n\t\t<w:tr>\n\t\t<w:tc>\n\t\t<w:p> <w:r> <w:t>{#users}</w:t> </w:r> <w:r> <w:t>test</w:t> </w:r> </w:p>\n\t\t</w:tc>\n\t\t<w:tc>\n\t\t<w:p> <w:r> <w:t>test2</w:t> </w:r> </w:p>\n\t\t</w:tc>\n\t\t</w:tr>\n\t\t</w:tbl>\n\t\t<w:p>\n\t\t<w:r> <w:t>{/users}</w:t> </w:r>\n\t\t</w:p>";
    var expectedError = {
      name: "TemplateError",
      message: "Multi error",
      properties: {
        errors: [{
          name: "TemplateError",
          message: 'The position of the loop tags "users" would produce invalid XML',
          properties: {
            xtag: "users",
            offset: [0, 17],
            id: "loop_position_invalid",
            file: "word/document.xml"
          }
        }],
        id: "multi_error"
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        parser: angularParser,
        errorLogging: false
      });
    }, Errors.XTTemplateError, expectedError);
  });
  it("should show clean error message when using {{ with single delimiter", function () {
    var content = "\n\t\t\t\t<w:p><w:r><w:t>{{name}}</w:t></w:r></w:p>\n\t\t\t\t";
    var expectedError = {
      name: "TemplateError",
      message: "Multi error",
      properties: {
        errors: [{
          name: "TemplateError",
          message: "Duplicate open tag, expected one open tag",
          properties: {
            context: "{{name",
            file: "word/document.xml",
            id: "duplicate_open_tag",
            offset: 0,
            xtag: "{{name"
          }
        }, {
          name: "TemplateError",
          message: "Duplicate close tag, expected one close tag",
          properties: {
            context: "name}}",
            file: "word/document.xml",
            id: "duplicate_close_tag",
            xtag: "name}}"
          }
        }],
        id: "multi_error"
      }
    };
    expectToThrow(function () {
      return makeDocxV4(content, {
        errorLogging: false
      });
    }, Errors.XTTemplateError, expectedError);
  });
});
describe("Rendering error", function () {
  it("should show an error when calling render twice", function () {
    var content = "<w:t>{user}</w:t>";
    var expectedError = {
      name: "InternalError",
      message: "You should not call .render twice on the same docxtemplater instance",
      properties: {
        id: "render_twice"
      }
    };
    var doc = makeDocxV4(content);
    doc.render();
    expectToThrow(function () {
      doc.render();
    }, Errors.XTInternalError, expectedError);
  });
  it("should show an error when using corrupt characters", function () {
    var content = "<w:t> {user}</w:t>";
    var expectedError = {
      name: "RenderingError",
      message: "There are some XML corrupt characters",
      properties: {
        id: "invalid_xml_characters",
        value: "\x1C",
        xtag: "user",
        offset: 1,
        file: "word/document.xml"
      }
    };
    expectToThrow(function () {
      makeDocxV4(content, {
        parser: angularParser,
        errorLogging: false
      }).render({
        user: String.fromCharCode(28)
      });
    }, Errors.XTTemplateError, wrapMultiError(expectedError));
  });
});
describe("Async errors", function () {
  it("should show error when having async promise", function () {
    var content = "<w:t>{user}</w:t>";
    var expectedError = {
      name: "ScopeParserError",
      message: "Scope parser execution failed",
      properties: {
        file: "word/document.xml",
        id: "scopeparser_execution_failed",
        xtag: "user",
        scope: {
          user: {}
        },
        rootError: {
          message: "Foobar"
        }
      }
    };
    var doc = makeDocxV4(content, {
      errorLogging: false
    });
    function create() {
      return doc.renderAsync({
        user: rejectSoon(new Error("Foobar"))
      });
    }
    return expectToThrowAsync(create, Errors.XTTemplateError, wrapMultiError(expectedError));
  });
  it("should show error when having async reject within loop", function () {
    var content = "<w:t>{#users}{user}{/}</w:t>";
    var expectedError = {
      name: "TemplateError",
      message: "Multi error",
      properties: {
        errors: [{
          name: "ScopeParserError",
          message: "Scope parser execution failed",
          properties: {
            file: "word/document.xml",
            id: "scopeparser_execution_failed",
            scope: 1,
            xtag: "user",
            rootError: {
              message: "foo 1"
            }
          }
        }, {
          name: "ScopeParserError",
          message: "Scope parser execution failed",
          properties: {
            file: "word/document.xml",
            id: "scopeparser_execution_failed",
            scope: 2,
            xtag: "user",
            rootError: {
              message: "foo 2"
            }
          }
        }, {
          name: "ScopeParserError",
          message: "Scope parser execution failed",
          properties: {
            file: "word/document.xml",
            id: "scopeparser_execution_failed",
            scope: 3,
            xtag: "user",
            rootError: {
              message: "foo 3"
            }
          }
        }],
        id: "multi_error"
      }
    };
    var count = 0;
    function errorParser(tag) {
      return {
        get: function get() {
          if (tag === "users") {
            return [1, 2, 3];
          }
          count++;
          throw new Error("foo ".concat(count));
        }
      };
    }
    var doc = makeDocxV4(content, {
      parser: errorParser,
      errorLogging: false
    });
    return expectToThrowAsync(function () {
      return doc.resolveData({});
    }, Errors.XTTemplateError, expectedError);
  });
  it("should show error when running resolveData before compile", function () {
    var content = "<w:t>{#users}{user}{/}</w:t>";
    var expectedError = {
      name: "InternalError",
      message: "You must run `.compile()` before running `.resolveData()`",
      properties: {
        id: "resolve_before_compile"
      }
    };
    var doc = makeDocx(content);
    return expectToThrowAsync(function () {
      return doc.resolveData();
    }, Errors.XTInternalError, expectedError);
  });
  it("should fail when customparser fails to execute on multiple tags", function () {
    var content = "<w:t>{#name|istrue}Name{/} {name|upper} {othername|upper}</w:t>";
    var count = 0;
    function errorParser() {
      return {
        get: function get() {
          count++;
          throw new Error("foo ".concat(count));
        }
      };
    }
    var expectedError = {
      name: "TemplateError",
      message: "Multi error",
      properties: {
        errors: [{
          name: "ScopeParserError",
          message: "Scope parser execution failed",
          properties: {
            id: "scopeparser_execution_failed",
            file: "word/document.xml",
            xtag: "name|istrue",
            rootError: {
              message: "foo 1"
            },
            offset: 0
          }
        }, {
          name: "ScopeParserError",
          message: "Scope parser execution failed",
          properties: {
            id: "scopeparser_execution_failed",
            file: "word/document.xml",
            xtag: "name|upper",
            rootError: {
              message: "foo 2"
            },
            offset: 22
          }
        }, {
          name: "ScopeParserError",
          message: "Scope parser execution failed",
          properties: {
            id: "scopeparser_execution_failed",
            file: "word/document.xml",
            xtag: "othername|upper",
            rootError: {
              message: "foo 3"
            },
            offset: 35
          }
        }],
        id: "multi_error"
      }
    };
    var doc = makeDocxV4(content, {
      parser: errorParser,
      errorLogging: false
    });
    function create() {
      return doc.resolveData().then(function () {
        return doc.render();
      });
    }
    return expectToThrowAsync(create, Errors.XTTemplateError, expectedError);
  });
  it("should fail when customparser fails to execute on multiple raw tags", function () {
    var content = "\n\t\t\t\t<w:p><w:r><w:t>{@raw|isfalse}</w:t></w:r></w:p>\n\t\t\t\t<w:p><w:r><w:t>{@raw|istrue}</w:t></w:r></w:p>\n\t\t\t\t";
    var count = 0;
    function errorParser() {
      return {
        get: function get() {
          count++;
          throw new Error("foo ".concat(count));
        }
      };
    }
    var expectedError = {
      name: "TemplateError",
      message: "Multi error",
      properties: {
        errors: [{
          name: "ScopeParserError",
          message: "Scope parser execution failed",
          properties: {
            id: "scopeparser_execution_failed",
            file: "word/document.xml",
            scope: {
              abc: true
            },
            xtag: "raw|isfalse",
            rootError: {
              message: "foo 1"
            },
            offset: 0
          }
        }, {
          name: "ScopeParserError",
          message: "Scope parser execution failed",
          properties: {
            id: "scopeparser_execution_failed",
            file: "word/document.xml",
            scope: {
              abc: true
            },
            xtag: "raw|istrue",
            rootError: {
              message: "foo 2"
            },
            offset: 14
          }
        }],
        id: "multi_error"
      }
    };
    var doc = makeDocxV4(content, {
      parser: errorParser,
      errorLogging: false
    });
    return expectToThrowAsync(function () {
      return doc.renderAsync({
        abc: true
      });
    }, Errors.XTTemplateError, expectedError);
  });
});
describe("Syntax option", function () {
  it("should be possible to allow unopened tag if syntax.allowUnopenedTag is true", function () {
    return this.renderV4({
      name: "bug-closing-placeholder-orphan.docx",
      data: {
        first_name: "John",
        last_name: "Doe"
      },
      options: {
        delimiters: {
          start: "$(",
          end: ")"
        },
        syntax: {
          allowUnopenedTag: true
        }
      },
      expectedName: "expected-bug-closing-placeholder-orphan.docx"
    });
  });
});