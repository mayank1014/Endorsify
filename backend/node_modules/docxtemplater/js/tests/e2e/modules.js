"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var _require = require("../utils.js"),
  expectToThrow = _require.expectToThrow,
  createDoc = _require.createDoc,
  shouldBeSame = _require.shouldBeSame,
  createDocV4 = _require.createDocV4,
  captureLogs = _require.captureLogs,
  expect = _require.expect,
  getZip = _require.getZip;
var angularParser = require("../../expressions.js");
var proofStateModule = require("../../proof-state-module.js");
var inspectModule = require("../../inspect-module.js");
var Docxtemplater = require("../../docxtemplater.js");
var Errors = require("../../errors.js");
var _require2 = require("../../doc-utils.js"),
  traits = _require2.traits,
  uniq = _require2.uniq;
var fixDocPrCorruption = require("../../modules/fix-doc-pr-corruption.js");
describe("Verify apiversion", function () {
  it("should work with valid api version", function () {
    var module = {
      requiredAPIVersion: "3.23.0",
      render: function render(part) {
        return part.value;
      }
    };
    var doc = createDoc("loop-valid.docx");
    doc.attachModule(module);
  });
  it("should fail with invalid api version", function () {
    var module = {
      requiredAPIVersion: "3.92.0",
      render: function render(part) {
        return part.value;
      }
    };
    var doc = createDoc("loop-valid.docx");
    expectToThrow(function () {
      return doc.attachModule(module);
    }, Errors.XTAPIVersionError, {
      message: "The minor api version is not uptodate, you probably have to update docxtemplater with npm install --save docxtemplater",
      name: "APIVersionError",
      properties: {
        id: "api_version_error",
        currentModuleApiVersion: [3, 38, 0],
        neededVersion: [3, 92, 0]
      }
    });
  });
  it("should fail when trying to attach null module", function () {
    expectToThrow(function () {
      return new Docxtemplater(getZip("loop-valid.docx"), {
        modules: [null]
      });
    }, Error, {
      message: "Cannot attachModule with a falsy value",
      name: "InternalError",
      properties: {}
    });
  });
});
describe("Module attachment", function () {
  it("should not allow to attach the same module twice", function () {
    var module = {
      name: "TestModule",
      requiredAPIVersion: "3.0.0",
      render: function render(part) {
        return part.value;
      }
    };
    var doc1 = createDoc("loop-valid.docx");
    doc1.attachModule(module);
    var doc2 = createDoc("tag-example.docx");
    var errMessage = null;
    try {
      doc2.attachModule(module);
    } catch (e) {
      errMessage = e.message;
    }
    expect(errMessage).to.equal('Cannot attach a module that was already attached : "TestModule". The most likely cause is that you are instantiating the module at the root level, and using it for multiple instances of Docxtemplater');
  });
  it("should allow to attach the same module twice if it has a clone method", function () {
    var module = {
      name: "TestModule",
      requiredAPIVersion: "3.0.0",
      render: function render(part) {
        return part.value;
      },
      clone: function clone() {
        return this;
      }
    };
    var doc1 = createDoc("loop-valid.docx");
    doc1.attachModule(module);
    var doc2 = createDoc("tag-example.docx");
    doc2.attachModule(module);
    var doc3 = createDoc("tag-example.docx");
    doc3.attachModule(module);
  });
  it("should automatically detach inspect module", function () {
    var imodule = inspectModule();
    createDocV4("loop-valid.docx", {
      modules: [imodule]
    }).render();
    createDocV4("loop-valid.docx", {
      modules: [imodule]
    }).render();
  });
});
describe("Module xml parse", function () {
  it("should not mutate options (regression for issue #526)", function () {
    var module = {
      name: "FooModule",
      requiredAPIVersion: "3.0.0",
      optionsTransformer: function optionsTransformer(options, docxtemplater) {
        var relsFiles = docxtemplater.zip.file(/document.xml.rels/).map(function (file) {
          return file.name;
        });
        options.xmlFileNames = options.xmlFileNames.concat(relsFiles);
        return options;
      }
    };
    var doc = createDoc("tag-example.docx");
    var opts = {};
    doc.setOptions(opts);
    doc.attachModule(module);
    doc.compile();
    expect(opts).to.deep.equal({});
  });
  it("should be possible to parse xml files", function () {
    var xmlDocuments;
    var module = {
      name: "ParseXMLModule",
      requiredAPIVersion: "3.0.0",
      optionsTransformer: function optionsTransformer(options, docxtemplater) {
        var relsFiles = docxtemplater.zip.file(/document.xml.rels/).map(function (file) {
          return file.name;
        });
        options.xmlFileNames = options.xmlFileNames.concat(relsFiles);
        return options;
      },
      set: function set(options) {
        if (options.xmlDocuments) {
          xmlDocuments = options.xmlDocuments;
        }
      }
    };
    var doc = createDoc("tag-example.docx");
    doc.attachModule(module);
    doc.compile();
    var xmlKeys = Object.keys(xmlDocuments);
    expect(xmlKeys).to.deep.equal(["[Content_Types].xml", "word/_rels/document.xml.rels"]);
    var rels = xmlDocuments["word/_rels/document.xml.rels"].getElementsByTagName("Relationship");
    expect(rels.length).to.equal(10);
    rels[5].setAttribute("Foobar", "Baz");
    doc.render();
    shouldBeSame({
      doc: doc,
      expectedName: "expected-module-change-rels.docx"
    });
  });
});
describe("Module unique tags xml", function () {
  it("should not cause an issue if tagsXmlLexedArray contains duplicates", function () {
    var module = {
      name: "FooModule",
      requiredAPIVersion: "3.0.0",
      optionsTransformer: function optionsTransformer(options, docxtemplater) {
        docxtemplater.fileTypeConfig.tagsXmlLexedArray.push("w:p", "w:r", "w:p");
        return options;
      }
    };
    var doc = createDoc("tag-example.docx");
    doc.attachModule(module);
    doc.setData({
      first_name: "Hipp",
      last_name: "Edgar",
      phone: "0652455478",
      description: "New Website"
    });
    doc.compile();
    doc.render();
    shouldBeSame({
      doc: doc,
      expectedName: "expected-tag-example.docx"
    });
  });
});
describe("Module traits", function () {
  it("should not cause an issue if using traits.expandTo containing loop", function () {
    var moduleName = "comment-module";
    function getInner(_ref) {
      var part = _ref.part,
        leftParts = _ref.leftParts,
        rightParts = _ref.rightParts,
        postparse = _ref.postparse;
      part.subparsed = postparse([].concat(leftParts).concat(rightParts), {
        basePart: part
      });
      return part;
    }
    var module = {
      name: "Test module",
      requiredAPIVersion: "3.0.0",
      parse: function parse(placeHolderContent) {
        if (placeHolderContent[0] === "£") {
          var type = "placeholder";
          return {
            type: type,
            value: placeHolderContent.substr(1),
            module: moduleName
          };
        }
      },
      postparse: function postparse(parsed, _ref2) {
        var postparse = _ref2.postparse;
        parsed = traits.expandToOne(parsed, {
          moduleName: moduleName,
          getInner: getInner,
          expandTo: ["w:p"],
          postparse: postparse
        });
        return parsed;
      },
      render: function render(part) {
        if (part.module === moduleName) {
          return {
            value: ""
          };
        }
      }
    };
    var doc = createDoc("comment-with-loop.docx");
    doc.attachModule(module);
    doc.setData({}).compile().render();
    shouldBeSame({
      doc: doc,
      expectedName: "expected-comment-example.docx"
    });
  });
});
describe("Module errors", function () {
  it("should pass the errors to errorsTransformer", function () {
    var moduleName = "ErrorModule";
    var catched = null;
    var myErrors = [];
    var module = {
      name: "Error module",
      requiredAPIVersion: "3.0.0",
      parse: function parse(placeHolderContent) {
        var type = "placeholder";
        return {
          type: type,
          value: placeHolderContent,
          module: moduleName
        };
      },
      render: function render(part) {
        if (part.module === moduleName) {
          return {
            errors: [new Error("foobar ".concat(part.value))]
          };
        }
      },
      errorsTransformer: function errorsTransformer(errors) {
        myErrors.push.apply(myErrors, _toConsumableArray(errors));
        return errors.map(function (e) {
          e.xyz = "xxx";
          return e;
        });
      }
    };
    var doc = createDocV4("tag-example.docx", {
      modules: [module]
    });
    var capture = captureLogs();
    try {
      doc.render();
    } catch (e) {
      catched = e;
    }
    capture.stop();
    expect(catched.properties.errors[0].xyz).to.equal("xxx");
    expect(myErrors.length).to.equal(9);
    expect(myErrors[0].message).to.equal("foobar last_name");
  });
  it("should log the error that is returned from render", function () {
    var moduleName = "ErrorModule";
    var module = {
      name: "Error module",
      requiredAPIVersion: "3.0.0",
      parse: function parse(placeHolderContent) {
        var type = "placeholder";
        return {
          type: type,
          value: placeHolderContent,
          module: moduleName
        };
      },
      render: function render(part) {
        if (part.module === moduleName) {
          return {
            errors: [new Error("foobar ".concat(part.value))]
          };
        }
      }
    };
    var error = null;
    var doc = createDoc("tag-example.docx");
    doc.attachModule(module);
    doc.setData({}).compile();
    var capture = captureLogs();
    try {
      doc.render();
    } catch (e) {
      error = e;
    }
    capture.stop();
    expect(error).to.be.an("object");
    expect(error.message).to.equal("Multi error");
    expect(error.properties.errors.length).to.equal(9);
    expect(error.properties.errors[4].properties.file).to.equal("word/document.xml");
    expect(error.properties.errors[4].message).to.equal("foobar last_name");
    expect(error.properties.errors[5].message).to.equal("foobar first_name");
    // expect(error.properties.errors[2].message).to.equal("foobar phone");

    var logs = capture.logs();
    expect(logs.length).to.equal(1, "Incorrect logs count");
    expect(logs[0]).to.contain("foobar last_name");
    expect(logs[0]).to.contain("foobar first_name");
    expect(logs[0]).to.contain("foobar phone");
    expect(logs[0]).to.satisfy(function (log) {
      return (
        // for chrome
        log.indexOf(".render") !== -1 ||
        // for firefox
        log.indexOf("render@") !== -1 ||
        // for bun (https://bun.sh/)
        log.indexOf("render (") !== -1
      );
    });
    var parsedLog = JSON.parse(logs[0]);
    expect(parsedLog.error.length).to.equal(9);
    expect(error.properties.errors[0].properties.file).to.equal("word/header1.xml");
    expect(error.properties.errors[0].message).to.equal("foobar last_name");
    expect(error.properties.errors[1].message).to.equal("foobar first_name");
    expect(error.properties.errors[2].message).to.equal("foobar phone");
    expect(error.properties.errors[6].properties.file).to.equal("word/footer1.xml");
    expect(error.properties.errors[6].message).to.equal("foobar last_name");
  });
  it("should throw specific error if adding same module twice", function () {
    var mod1 = {
      name: "TestModule",
      set: function set() {
        return null;
      }
    };
    var mod2 = {
      name: "TestModule",
      set: function set() {
        return null;
      }
    };

    // This test will test the case where the fixDocPrCorruption is used on two different instances of the docxtemplater library
    expectToThrow(function () {
      return createDocV4("loop-image-footer.docx", {
        modules: [mod1, mod2]
      });
    }, Error, {
      message: 'Detected duplicate module "TestModule"',
      name: "InternalError",
      properties: {}
    });
  });
});
describe("Module should pass options to module.parse, module.postparse, module.render, module.postrender", function () {
  it("should pass filePath and contentType options", function () {
    var doc = createDoc("tag-example.docx");
    var filePaths = [];
    var relsType = [];
    var renderFP = "",
      renderCT = "",
      postrenderFP = "",
      postrenderCT = "",
      postparseFP = "",
      postparseCT = "";
    var ct = [];
    var module = {
      name: "Test module",
      requiredAPIVersion: "3.0.0",
      parse: function parse(a, options) {
        filePaths.push(options.filePath);
        ct.push(options.contentType);
        relsType.push(options.relsType);
      },
      postparse: function postparse(a, options) {
        postparseFP = options.filePath;
        postparseCT = options.contentType;
        return a;
      },
      render: function render(a, options) {
        renderFP = options.filePath;
        renderCT = options.contentType;
      },
      postrender: function postrender(a, options) {
        postrenderFP = options.filePath;
        postrenderCT = options.contentType;
        return a;
      }
    };
    doc.attachModule(module);
    doc.setData({}).compile();
    doc.render();
    expect(renderFP).to.equal("word/footnotes.xml");
    expect(renderCT).to.equal("application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml");
    expect(postparseFP).to.equal("word/footnotes.xml");
    expect(postparseCT).to.equal("application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml");
    expect(postrenderFP).to.equal("word/footnotes.xml");
    expect(postrenderCT).to.equal("application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml");

    // The order of the filePaths here is important, this has been fixed in version 3.37.8 : First headers are templated, than the document, than the footers.
    expect(filePaths).to.deep.equal([
    // Header appears 4 times because there are 4 tags in the header
    "word/header1.xml", "word/header1.xml", "word/header1.xml", "word/header1.xml",
    // Document appears 2 times because there are 2 tags in the header
    "word/document.xml", "word/document.xml",
    // Footer appears 3 times because there are 3 tags in the header
    "word/footer1.xml", "word/footer1.xml", "word/footer1.xml"]);
    expect(ct).to.deep.equal(["application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml", "application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml", "application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml", "application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml", "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml", "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml", "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml", "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml", "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"]);
    expect([relsType[3], relsType[4], relsType[5]]).to.deep.equal([undefined, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument"]);
  });
});
describe("Module detachment", function () {
  it("should detach the module when the module does not support the document filetype", function () {
    var isModuleCalled = false;
    var isDetachedCalled = false;
    var module = {
      optionsTransformer: function optionsTransformer(options) {
        isModuleCalled = true;
        return options;
      },
      on: function on(eventName) {
        if (eventName === "detached") {
          isDetachedCalled = true;
        }
      },
      supportedFileTypes: ["pptx"]
    };
    createDocV4("tag-example.docx", {
      modules: [module]
    });
    expect(isDetachedCalled).to.equal(true);
    expect(isModuleCalled).to.equal(false);
  });
});
describe("Module Matcher API", function () {
  it("should call onMatch function", function () {
    function module1() {
      var myVal = "";
      return {
        name: "module1",
        matchers: function matchers() {
          return [["l", "module-m1", {
            onMatch: function onMatch(part) {
              myVal = part.prefix + part.lIndex + "!!";
            }
          }]];
        },
        render: function render(part) {
          if (part.module === "module-m1") {
            return {
              value: myVal
            };
          }
        }
      };
    }
    expect(this.renderV4({
      name: "tag-example.docx",
      options: {
        modules: [module1()]
      },
      data: {
        first_name: "John"
      },
      expectedText: "l28!! John"
    }));
  });
  it("should automatically choose module with longest value", function () {
    function module1() {
      return {
        name: "module1",
        matchers: function matchers() {
          return [["l", "module-m1"]];
        },
        render: function render(part) {
          if (part.module === "module-m1") {
            return {
              value: part.value
            };
          }
        }
      };
    }
    function module2() {
      return {
        name: "module2",
        matchers: function matchers() {
          return [[/last_(.*)/, "module-m2"]];
        },
        render: function render(part) {
          if (part.module === "module-m2") {
            return {
              value: part.value
            };
          }
        }
      };
    }
    function module3() {
      return {
        name: "module3",
        matchers: function matchers() {
          return [["last", "module-m3"]];
        },
        render: function render(part) {
          if (part.module === "module-m3") {
            return {
              value: part.value
            };
          }
        }
      };
    }
    expect(createDocV4("tag-example.docx", {
      modules: [module1(), module2(), module3()]
    }).render({
      first_name: "John"
    }).getFullText()).to.equal("name John");
    expect(createDocV4("tag-example.docx", {
      modules: [module3(), module2(), module1()]
    }).render({
      first_name: "John"
    }).getFullText()).to.equal("name John");
  });
});
describe("Fix doc pr corruption module", function () {
  it("should work on multiple instances in parallel", function () {
    var doc = createDocV4("loop-image-footer.docx", {
      modules: [fixDocPrCorruption]
    });
    // This test will test the case where the fixDocPrCorruption is used on two different instances of the docxtemplater library
    createDocV4("tag-example.docx", {
      modules: [fixDocPrCorruption]
    });
    return doc.renderAsync({
      loop: [1, 2, 3, 4]
    }).then(function () {
      shouldBeSame({
        doc: doc,
        expectedName: "expected-loop-images-footer.docx"
      });
    });
  });
});
describe("Proofstate module", function () {
  it("should work with angular parser with proofstate module", function () {
    shouldBeSame({
      doc: createDoc("angular-example.docx").setOptions({
        parser: angularParser
      }).attachModule(proofStateModule).render({
        person: {
          first_name: "Hipp",
          last_name: "Edgar",
          birth_year: 1955,
          age: 59
        }
      }),
      expectedName: "expected-proofstate-removed.docx"
    });
  });
});
describe("Module call order", function () {
  var expectedCallOrder = ["on", "set", "getFileType", "optionsTransformer", "preparse", "getTraits", "postparse", "errorsTransformer", "matchers", "getRenderedMap", "render", "postrender"];
  it("should work with v4", function () {
    var calls = [];
    var mod = {
      name: "TestModule",
      set: function set() {
        calls.push("set");
        return null;
      },
      matchers: function matchers() {
        calls.push("matchers");
        return [];
      },
      render: function render() {
        calls.push("render");
        return null;
      },
      optionsTransformer: function optionsTransformer(options) {
        calls.push("optionsTransformer");
        return options;
      },
      preparse: function preparse() {
        calls.push("preparse");
        return null;
      },
      parse: function parse() {
        calls.push("parse");
        return null;
      },
      postparse: function postparse() {
        calls.push("postparse");
        return null;
      },
      getTraits: function getTraits() {
        calls.push("getTraits");
      },
      getFileType: function getFileType() {
        calls.push("getFileType");
      },
      nullGetter: function nullGetter() {
        calls.push("nullGetter");
      },
      postrender: function postrender() {
        calls.push("postrender");
        return [];
      },
      errorsTransformer: function errorsTransformer() {
        calls.push("errorsTransformer");
      },
      getRenderedMap: function getRenderedMap(obj) {
        calls.push("getRenderedMap");
        return obj;
      },
      on: function on() {
        calls.push("on");
      },
      resolve: function resolve() {
        calls.push("on");
      }
    };
    var doc = createDocV4("loop-image-footer.docx", {
      modules: [mod]
    });
    // This test will test the case where the fixDocPrCorruption is used on two different instances of the docxtemplater library
    doc.render({
      loop: [1, 2, 3, 4]
    });
    expect(uniq(calls)).to.deep.equal(expectedCallOrder);
  });
  it("should work with v3", function () {
    var calls = [];
    var mod = {
      name: "TestModule",
      set: function set() {
        calls.push("set");
        return null;
      },
      matchers: function matchers() {
        calls.push("matchers");
        return [];
      },
      render: function render() {
        calls.push("render");
        return null;
      },
      optionsTransformer: function optionsTransformer(options) {
        calls.push("optionsTransformer");
        return options;
      },
      preparse: function preparse() {
        calls.push("preparse");
        return null;
      },
      parse: function parse() {
        calls.push("parse");
        return null;
      },
      postparse: function postparse() {
        calls.push("postparse");
        return null;
      },
      getTraits: function getTraits() {
        calls.push("getTraits");
      },
      getFileType: function getFileType() {
        calls.push("getFileType");
      },
      nullGetter: function nullGetter() {
        calls.push("nullGetter");
      },
      postrender: function postrender() {
        calls.push("postrender");
        return [];
      },
      errorsTransformer: function errorsTransformer() {
        calls.push("errorsTransformer");
      },
      getRenderedMap: function getRenderedMap(obj) {
        calls.push("getRenderedMap");
        return obj;
      },
      on: function on() {
        calls.push("on");
      },
      resolve: function resolve() {
        calls.push("on");
      }
    };

    // This test will test the case where the fixDocPrCorruption is used on two different instances of the docxtemplater library
    this.render({
      name: "loop-image-footer.docx",
      options: {
        modules: [mod]
      },
      data: {
        loop: [1, 2, 3, 4]
      }
    });
    expect(uniq(calls)).to.deep.equal(expectedCallOrder);
  });
});
describe("Module priority", function () {
  it("should reorder modules", function () {
    var m1 = {
      priority: 4,
      name: "M1",
      parse: function parse(parsed) {
        return parsed;
      }
    };
    var m2 = {
      priority: -1,
      name: "M2",
      parse: function parse(parsed) {
        return parsed;
      }
    };
    var m3 = {
      priority: 5,
      name: "M3",
      parse: function parse(parsed) {
        return parsed;
      }
    };
    var m4 = {
      priority: 5,
      name: "M4",
      parse: function parse(parsed) {
        return parsed;
      }
    };
    var m5 = {
      priority: 5,
      name: "M5",
      parse: function parse(parsed) {
        return parsed;
      }
    };
    var doc = createDocV4("loop-image-footer.docx", {
      modules: [m1, m2, m3, m4, m5]
    });
    var orderedNames = doc.modules.map(function (_ref3) {
      var name = _ref3.name;
      return name;
    });
    expect(orderedNames).to.deep.equal(["M3", "M4", "M5", "M1", "LoopModule", "SpacePreserveModule", "ExpandPairTrait", "RawXmlModule", "Render", "Common", "AssertionModule", "M2"]);
  });
});