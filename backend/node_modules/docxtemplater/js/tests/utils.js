"use strict";

if (typeof process === "undefined") {
  global.process = {};
}
var path = require("path");
var chai = require("chai");
var expect = chai.expect;
var Errors = require("../errors.js");
var PizZip = require("pizzip");
var fs = require("fs");
var _require = require("lodash"),
  get = _require.get,
  unset = _require.unset,
  omit = _require.omit,
  uniq = _require.uniq,
  cloneDeep = _require.cloneDeep;
var errorLogger = require("../error-logger.js");
var diff = require("diff");
var AssertionModule = require("./assertion-module.js");
var Docxtemplater = require("../docxtemplater.js");
var _require2 = require("../utils.js"),
  first = _require2.first;
var xmlPrettify = require("./xml-prettify.js");
var countFiles = 1;
var allStarted = false;
var examplesDirectory;
var snapshotFile;
var documentCache = {};
var imageData = {};
var emptyNamespace = /xmlns:[a-z0-9]+=""/;
function unifiedDiff(actual, expected) {
  var indent = "      ";
  function cleanUp(line) {
    var firstChar = first(line);
    if (firstChar === "+") {
      return indent + line;
    }
    if (firstChar === "-") {
      return indent + line;
    }
    if (line.match(/@@/)) {
      return "--";
    }
    if (line.match(/\\ No newline/)) {
      return null;
    }
    return indent + line;
  }
  function notBlank(line) {
    return typeof line !== "undefined" && line !== null;
  }
  var msg = diff.createPatch("string", actual, expected);
  var lines = msg.split("\n").splice(5);
  return "\n      " + "+ expected" + " " + "- actual" + "\n\n" + lines.map(cleanUp).filter(notBlank).join("\n");
}
function walk(dir) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function (file) {
    if (file.indexOf(".") === 0) {
      return;
    }
    file = dir + "/" + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      Array.prototype.push.apply(results, walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}
function createXmlTemplaterDocxNoRender(content) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var doc = makeDocx(content);
  doc.setOptions(options);
  doc.setData(options.tags);
  return doc;
}
function createXmlTemplaterDocx(content) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var doc = makeDocx(content, options);
  doc.setOptions(options);
  doc.setData(options.tags);
  doc.render();
  return doc;
}
function writeFile(expectedName, zip) {
  if (path.resolve) {
    if (fs.writeFileSync) {
      var _writeFile =
      // eslint-disable-next-line no-process-env
      process.env.UPDATE === "true" ? path.resolve(examplesDirectory, expectedName) : path.resolve(examplesDirectory, "..", expectedName);
      fs.writeFileSync(_writeFile, zip.generate({
        type: "nodebuffer",
        compression: "DEFLATE"
      }));
    }
    if (typeof window !== "undefined" && window.saveAs) {
      var out = zip.generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        compression: "DEFLATE"
      });
      saveAs(out, expectedName); // comment to see the error
    }
  }
}
function unlinkFile(expectedName) {
  if (path.resolve) {
    var _writeFile2 = path.resolve(examplesDirectory, "..", expectedName);
    try {
      fs.unlinkSync(_writeFile2);
    } catch (e) {
      if (e.code !== "ENOENT") {
        throw e;
      }
    }
  }
}
function getText(file) {
  return file.asText().replace(/\n|\t/g, "");
}
function isBinaryFile(file1, file2) {
  return file1.name.indexOf(".xml") === -1 && file1.name.indexOf(".vml") === -1 && file1.name.indexOf(".rels") === -1 && (file1.options.binary || file2.options.binary);
}
function isZip(text) {
  var start = text.substr(0, 9);
  var zipSignature = "PK\x03\x04\n\0\0\0\0";
  return start === zipSignature;
}
function zipCompare(zip, expectedZip, expectedName) {
  uniq(Object.keys(zip.files).concat(Object.keys(expectedZip.files))).map(function (filePath) {
    var suffix = "for \"".concat(filePath, "\"");
    var file = zip.files[filePath];
    var expectedFile = expectedZip.files[filePath];
    expect(expectedFile).to.be.an("object", "The file ".concat(filePath, " doesn't exist on examples/").concat(expectedName));
    expect(file).to.be.an("object", "The file ".concat(filePath, " doesn't exist on ").concat(expectedName));
    expect(file.name).to.be.equal(expectedFile.name, "Name differs ".concat(suffix));
    expect(file.options.dir).to.be.equal(expectedFile.options.dir, "IsDir differs ".concat(suffix));
    if (file.options.dir) {
      return;
    }
    if (isBinaryFile(file, expectedFile)) {
      var actualHash = file._data.crc32;
      var expectedHash = expectedFile._data.crc32;
      var _actualText = file.asBinary();
      if (isZip(_actualText)) {
        var _expectedText = expectedFile.asBinary();
        zipCompare(new PizZip(_actualText), new PizZip(_expectedText), expectedName);
      } else if (actualHash && expectedHash) {
        expect(actualHash).to.be.a("number");
        expect(actualHash).to.be.equal(expectedHash, "Content differs for " + suffix);
      } else {
        var _expectedText2 = expectedFile.asBinary();
        expect(_actualText).to.equal(_expectedText2, "Binary file ".concat(filePath, " differs"));
      }
      return;
    }
    var actualText = getText(file);
    var expectedText = getText(expectedFile);
    expect(actualText).to.not.match(emptyNamespace, "The file ".concat(filePath, " has empty namespaces"));
    expect(expectedText).to.not.match(emptyNamespace, "The file ".concat(filePath, " has empty namespaces"));
    if (actualText === expectedText) {
      return;
    }
    var prettyActualText = xmlPrettify(actualText);
    var prettyExpectedText = xmlPrettify(expectedText);
    if (prettyActualText !== prettyExpectedText) {
      var prettyDiff = unifiedDiff(prettyActualText, prettyExpectedText);
      expect(prettyActualText).to.be.equal(prettyExpectedText, "Content differs \n" + suffix + "\n" + prettyDiff);
    }
  });
}

/* eslint-disable no-console */
function shouldBeSame(_ref) {
  var doc = _ref.doc,
    expectedName = _ref.expectedName;
  var zip = doc.getZip();
  if (!documentCache[expectedName]) {
    writeFile(expectedName, zip);
    console.log(JSON.stringify({
      msg: "Expected file does not exists",
      expectedName: expectedName
    }));
    throw new Error("File ".concat(expectedName, " does not exist in examples directory"));
  }
  var expectedZip = documentCache[expectedName].zip;
  try {
    zipCompare(zip, expectedZip, expectedName);
  } catch (e) {
    writeFile(expectedName, zip);
    console.log(JSON.stringify({
      msg: "Expected file differs from actual file",
      expectedName: expectedName
    }));
    throw e;
  }
  unlinkFile(expectedName);
}
/* eslint-enable no-console */

function checkLength(e, expectedError, propertyPath) {
  var propertyPathLength = propertyPath + "Length";
  var property = get(e, propertyPath);
  var expectedPropertyLength = get(expectedError, propertyPathLength);
  if (property && expectedPropertyLength) {
    expect(expectedPropertyLength).to.be.a("number", JSON.stringify(expectedError.properties));
    expect(expectedPropertyLength).to.equal(property.length);
    unset(e, propertyPath);
    unset(expectedError, propertyPathLength);
  }
}
function cleanRecursive(arr) {
  if (arr.lexed) {
    cleanRecursive(arr.lexed);
    cleanRecursive(arr.parsed);
    cleanRecursive(arr.postparsed);
    return;
  }
  arr.forEach(function (p) {
    delete p.lIndex;
    delete p.endLindex;
    delete p.offset;
    delete p.raw;
    if (p.lastParagrapSectPr === "") {
      delete p.lastParagrapSectPr;
    }
    if (p.subparsed) {
      cleanRecursive(p.subparsed);
    }
    if (p.value && p.value.forEach) {
      p.value.forEach(cleanRecursive);
    }
    if (p.expanded) {
      p.expanded.forEach(cleanRecursive);
    }
  });
}

// eslint-disable-next-line complexity
function cleanError(e, expectedError) {
  var message = e.message;
  e = omit(e, ["line", "sourceURL", "stack"]);
  e.message = message;
  if (expectedError.properties && e.properties) {
    if (!e.properties.explanation) {
      throw new Error("No explanation for this error");
    }
    if (expectedError.properties.explanation != null) {
      var e1 = e.properties.explanation;
      var e2 = expectedError.properties.explanation;
      expect(e1).to.be.deep.equal(e2, "Explanations differ '".concat(e1, "' != '").concat(e2, "': for ").concat(JSON.stringify(expectedError)));
    }
    delete e.properties.explanation;
    delete expectedError.properties.explanation;
    if (e.properties.postparsed) {
      e.properties.postparsed.forEach(function (p) {
        delete p.lIndex;
        delete p.endLindex;
        delete p.offset;
      });
    }
    if (e.properties.rootError) {
      expect(e.properties.rootError, JSON.stringify(e.properties)).to.be.instanceOf(Error, "rootError doesn't have correct type");
      expect(expectedError.properties.rootError, JSON.stringify(expectedError.properties)).to.be.instanceOf(Object, "expectedError doesn't have a rootError");
      if (expectedError) {
        expect(e.properties.rootError.message).to.equal(expectedError.properties.rootError.message, "rootError.message");
      }
      delete e.properties.rootError;
      delete expectedError.properties.rootError;
    }
    if (expectedError.properties.offset != null) {
      var o1 = e.properties.offset;
      var o2 = expectedError.properties.offset;
      // offset can be arrays, so deep compare
      expect(o1).to.be.deep.equal(o2, "Offset differ ".concat(o1, " != ").concat(o2, ": for ").concat(JSON.stringify(expectedError)));
    }
    delete expectedError.properties.offset;
    delete e.properties.offset;
    checkLength(e, expectedError, "properties.paragraphParts");
    checkLength(e, expectedError, "properties.postparsed");
    checkLength(e, expectedError, "properties.parsed");
  }
  if (e.stack && expectedError) {
    expect(e.stack).to.contain("Error: " + expectedError.message);
  }
  delete e.stack;
  return e;
}
function wrapMultiError(error) {
  var type = Object.prototype.toString.call(error);
  var errors;
  if (type === "[object Array]") {
    errors = error;
  } else {
    errors = [error];
  }
  return {
    name: "TemplateError",
    message: "Multi error",
    properties: {
      id: "multi_error",
      errors: errors
    }
  };
}
function jsonifyError(e) {
  return JSON.parse(JSON.stringify(e, function (key, value) {
    if (value instanceof Promise) {
      return {};
    }
    return value;
  }));
}
function errorVerifier(e, type, expectedError) {
  var toShowOnFail = e.stack;
  expect(e, "No error has been thrown").not.to.be.equal(null);
  expect(e, toShowOnFail).to.be.instanceOf(Error, "error is not a Javascript error");
  expect(e, toShowOnFail).to.be.instanceOf(type, "error doesn't have the correct type");
  e = cloneDeep(e);
  expectedError = cloneDeep(expectedError);
  expect(e, toShowOnFail).to.be.an("object");
  expect(e, toShowOnFail).to.have.property("properties");
  expect(e.properties, toShowOnFail).to.be.an("object");
  if (type.name && type.name !== "XTInternalError") {
    expect(e.properties, toShowOnFail).to.have.property("explanation");
    expect(e.properties.explanation, toShowOnFail).to.be.a("string");
    expect(e.properties.explanation, toShowOnFail).to.be.a("string");
  }
  if (e.properties.id) {
    expect(e.properties.id, toShowOnFail).to.be.a("string");
  }
  e = cleanError(e, expectedError);
  if (e.properties.errors) {
    var msg = "expected : \n" + JSON.stringify(expectedError.properties.errors) + "\nactual : \n" + JSON.stringify(e.properties.errors);
    expect(expectedError.properties.errors).to.be.an("array", msg);
    var l1 = e.properties.errors.length;
    var l2 = expectedError.properties.errors.length;
    expect(l1).to.equal(l2, "Expected to have the same amount of e.properties.errors ".concat(l1, " !== ").concat(l2, " ") + msg);
    e.properties.errors = e.properties.errors.map(function (suberror, i) {
      var cleaned = cleanError(suberror, expectedError.properties.errors[i]);
      var jsonified = jsonifyError(cleaned);
      return jsonified;
    });
  }
  var realError = jsonifyError(e);
  expect(realError).to.be.deep.equal(expectedError);
}
function expectToThrow(fn, type, expectedError) {
  var err = null;
  try {
    fn();
  } catch (e) {
    err = e;
  }
  if (!type) {
    expect(err).to.satisfy(function (err) {
      return !!err;
    });
    return;
  }
  errorVerifier(err, type, expectedError);
}
function expectToThrowAsync(fn, type, expectedError) {
  return Promise.resolve(null).then(function () {
    var r = fn();
    return r.then(function () {
      return null;
    });
  })["catch"](function (error) {
    return error;
  }).then(function (err) {
    if (!type) {
      expect(err).to.satisfy(function (err) {
        return !!err;
      });
      return;
    }
    errorVerifier(err, type, expectedError);
  });
}
function expectToThrowSnapshot(fn, update) {
  var err = null;
  try {
    fn();
  } catch (e) {
    err = e;
  }
  if (!err) {
    throw new Error("No error was thrown in this expectToThrowSnapshot");
  }
  expect(errToObject(err)).to.matchSnapshot(update);
}
function expectToThrowAsyncSnapshot(fn, update) {
  var myErr = null;
  return Promise.resolve(null).then(function () {
    var r = fn();
    return r.then(function () {
      return null;
    });
  })["catch"](function (error) {
    myErr = error;
  }).then(function () {
    if (!myErr) {
      throw new Error("No error was thrown in this expectToThrowSnapshot");
    }
    expect(errToObject(myErr)).to.matchSnapshot(update);
  });
}
function errToObject(err) {
  var obj = {};
  if (err instanceof Errors.XTTemplateError) {
    obj._type = "XTTemplateError";
  } else if (err instanceof Errors.XTAPIVersionError) {
    obj._type = "XTAPIVersionError";
  } else if (err instanceof Errors.XTRenderingError) {
    obj._type = "XTRenderingError";
  } else if (err instanceof Errors.XTScopeParserError) {
    obj._type = "XTScopeParserError";
  } else if (err instanceof Errors.XTInternalError) {
    obj._type = "XTInternalError";
  } else if (err instanceof Errors.XTAPIVersionError) {
    obj._type = "XTAPIVersionError";
  }
  if (err.name) {
    obj.name = err.name;
  }
  if (err.message) {
    obj.message = err.message;
  }
  if (err.properties) {
    obj.properties = {};
    Object.keys(err.properties).forEach(function (key) {
      var value = err.properties[key];
      if (value instanceof Error) {
        obj.properties[key] = errToObject(value);
        return;
      }
      if (value instanceof Array) {
        obj.properties[key] = value.map(function (value) {
          if (value instanceof Error) {
            return errToObject(value);
          }
          return value;
        });
        return;
      }
      obj.properties[key] = value;
    });
  }
  return obj;
}
function load(name, content, cache) {
  var zip = new PizZip(content);
  var doc = new Docxtemplater();
  doc.attachModule(new AssertionModule());
  doc.loadZip(zip);
  doc.loadedName = name;
  doc.loadedContent = content;
  cache[name] = doc;
  return doc;
}
function loadDocument(name, content) {
  return load(name, content, documentCache);
}
function cacheDocument(name, content) {
  var zip = new PizZip(content);
  documentCache[name] = {
    loadedName: name,
    loadedContent: content,
    zip: zip
  };
  return documentCache[name];
}
function loadImage(name, content) {
  imageData[name] = content;
}
function loadFile(name, callback) {
  if (fs.readFileSync) {
    var _path = require("path");
    var buffer = fs.readFileSync(_path.join(examplesDirectory, name));
    return callback(null, name, buffer);
  }
  return PizZipUtils.getBinaryContent("../examples/" + name, function (err, data) {
    if (err) {
      return callback(err);
    }
    return callback(null, name, data);
  });
}
function unhandledRejectionHandler(reason) {
  throw reason;
}
var writeSnapshots = typeof process !== "undefined" &&
// eslint-disable-next-line no-process-env
process.env &&
// eslint-disable-next-line no-process-env
process.env.WRITE_SNAPSHOTS === "true";
var startFunction;
function setStartFunction(sf) {
  var snapshots = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  allStarted = false;
  countFiles = 1;
  startFunction = sf;
  var runnedSnapshots = {};
  var fullTestName = "";
  function matchSnapshot() {
    var ftn = fullTestName;
    var i = 0;
    while (runnedSnapshots[ftn]) {
      i++;
      ftn = fullTestName + "-" + i;
    }
    runnedSnapshots[ftn] = true;
    var obj = JSON.parse(JSON.stringify(this.__flags.object));
    if (!snapshots[ftn]) {
      snapshots[ftn] = obj;
      if (!writeSnapshots) {
        throw new Error("Snapshot not found for '".concat(ftn, "'"));
      }
      return;
    }
    try {
      expect(obj).to.deep.equal(snapshots[ftn]);
    } catch (e) {
      if (writeSnapshots) {
        snapshots[ftn] = obj;
        return;
      }
      throw e;
    }
  }
  beforeEach(function () {
    function getParentsTitle(a) {
      if (a.parent) {
        return "".concat(a.parent.title, " ").concat(getParentsTitle(a.parent));
      }
      return "";
    }
    fullTestName = getParentsTitle(this.currentTest) + this.currentTest.title;
    fullTestName = fullTestName.trim().replace(/\s+/g, " ");
  });
  after(function () {
    if (writeSnapshots) {
      var sortedKeys = Object.keys(snapshots).sort();
      var output = "/***************** This file is autogenerated *****************************\n\n" + "   Please don't modify it manually !\n" + "   Instead, to update the file, run :\n\n" + "   npm run test:es6:update-snapshots\n*/\n\n" + sortedKeys.map(function (key) {
        var snap = snapshots[key];
        if (typeof snap === "string") {
          return "exports[`" + key + "`] = `" + snap + "`";
        }
        return "exports[`" + key + "`] = " + JSON.stringify(snap, null, 2);
      }).join("\n\n") + "\n\n";
      fs.writeFileSync(snapshotFile, output);
    }
  });
  chai.use(function () {
    chai.Assertion.addMethod("matchSnapshot", matchSnapshot);
  });
  if (typeof window !== "undefined" && window.addEventListener) {
    window.addEventListener("unhandledrejection", unhandledRejectionHandler);
  } else {
    process.on("unhandledRejection", unhandledRejectionHandler);
  }
}
function endLoadFile(change) {
  change = change || 0;
  countFiles += change;
  if (countFiles === 0 && allStarted === true) {
    var result = startFunction();
    if (typeof window !== "undefined") {
      return window.mocha.run(function () {
        var elemDiv = window.document.getElementById("status");
        elemDiv.textContent = "FINISHED";
        document.body.appendChild(elemDiv);
      });
    }
    return result;
  }
}
function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
function endsWithOne(str, suffixes) {
  return suffixes.some(function (suffix) {
    return endsWith(str, suffix);
  });
}
function startsWith(str, prefix) {
  return str.indexOf(prefix) === 0;
}

/* eslint-disable no-console */
function start() {
  afterEach(function () {
    if (this.currentTest.state === "failed" && this.currentTest.err.properties) {
      errorLogger(this.currentTest.err, "jsonl");
    }
  });
  var fileNames;
  if (typeof global !== "undefined" && global.fileNames) {
    fileNames = global.fileNames;
  } else {
    fileNames = require("./filenames.js");
  }
  /* eslint-disable import/no-unresolved */
  /* eslint-enable import/no-unresolved */
  fileNames.forEach(function (fullFileName) {
    var fileName = fullFileName.replace(examplesDirectory + "/", "");
    var callback;
    if (startsWith(fileName, ".") || startsWith(fileName, "~")) {
      return;
    }
    if (endsWithOne(fileName, [".docm", ".docx", ".dotm", ".dotx", ".potm", ".potx", ".pptm", ".pptx", ".xlsm", ".xlsx", ".xltm", ".xltx"])) {
      callback = cacheDocument;
    }
    if (!callback) {
      callback = loadImage;
    }
    countFiles++;
    loadFile(fileName, function (e, name, buffer) {
      if (e) {
        console.log(e);
        throw e;
      }
      endLoadFile(-1);
      callback(name, buffer);
    });
  });
  allStarted = true;
  endLoadFile(-1);
}
/* eslint-disable no-console */

function setExamplesDirectory(ed) {
  examplesDirectory = ed;
  if (fs && fs.writeFileSync) {
    var fileNames = walk(examplesDirectory).map(function (f) {
      return f.replace(examplesDirectory + "/", "");
    });
    fs.writeFileSync(path.resolve(__dirname, "filenames.js"), "module.exports=" + JSON.stringify(fileNames));
    global.fileNames = fileNames;
  }
}
function setSnapshotFile(file) {
  snapshotFile = file;
}
function removeSpaces(text) {
  return text.replace(/\n|\t/g, "");
}
var docxContentTypeContent = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Types xmlns=\"http://schemas.openxmlformats.org/package/2006/content-types\">\n  <Default Extension=\"rels\" ContentType=\"application/vnd.openxmlformats-package.relationships+xml\"/>\n  <Default Extension=\"xml\" ContentType=\"application/xml\"/>\n  <Override PartName=\"/word/document.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml\"/>\n</Types>";
var docxRelsContent = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\">\n  <Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties\" Target=\"docProps/core.xml\"/>\n  <Relationship Id=\"rId2\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties\" Target=\"docProps/app.xml\"/>\n  <Relationship Id=\"rId3\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties\" Target=\"docProps/custom.xml\"/>\n  <Relationship Id=\"rId4\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument\" Target=\"word/document.xml\"/>\n</Relationships>\n";
var pptxRelsContent = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\">\n  <Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties\" Target=\"docProps/core.xml\"/>\n  <Relationship Id=\"rId2\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties\" Target=\"docProps/app.xml\"/>\n  <Relationship Id=\"rId3\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument\" Target=\"ppt/presentation.xml\"/>\n</Relationships>\n";
function makeDocx(content) {
  var zip = new PizZip();
  zip.file("word/document.xml", content, {
    createFolders: true
  });
  zip.file("[Content_Types].xml", docxContentTypeContent);
  zip.file("_rels/.rels", docxRelsContent);
  var doc = new Docxtemplater();
  doc.loadZip(zip);
  return doc;
}
function makeDocxV4(content) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var zip = new PizZip();
  zip.file("word/document.xml", content, {
    createFolders: true
  });
  zip.file("[Content_Types].xml", docxContentTypeContent);
  zip.file("_rels/.rels", docxRelsContent);
  return new Docxtemplater(zip, options);
}
var pptxContentTypeContent = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Types xmlns=\"http://schemas.openxmlformats.org/package/2006/content-types\">\n  <Default Extension=\"rels\" ContentType=\"application/vnd.openxmlformats-package.relationships+xml\"/>\n  <Default Extension=\"xml\" ContentType=\"application/xml\"/>\n  <Override PartName=\"/ppt/slides/slide1.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.presentationml.slide+xml\"/>\n</Types>";
function makePptx(name, content) {
  var zip = new PizZip();
  zip.file("ppt/slides/slide1.xml", content, {
    createFolders: true
  });
  zip.file("[Content_Types].xml", pptxContentTypeContent);
  zip.file("_rels/.rels", pptxRelsContent);
  return load(name, zip.generate({
    type: "string"
  }), documentCache);
}
function makePptxV4(content) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var zip = new PizZip();
  zip.file("ppt/slides/slide1.xml", content, {
    createFolders: true
  });
  zip.file("[Content_Types].xml", pptxContentTypeContent);
  zip.file("_rels/.rels", pptxRelsContent);
  return new Docxtemplater(zip, options);
}
function createDoc(name) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!documentCache[name]) {
    throw new Error("File \"examples/".concat(name, "\" does not exist, please create the file"));
  }
  var doc = loadDocument(name, documentCache[name].loadedContent);
  if (options.modules) {
    options.modules.forEach(function (module) {
      doc.attachModule(module);
    });
  }
  doc.setOptions(options);
  return doc;
}
function createDocV4(name, options) {
  var zip = getZip(name);
  options = options || {};
  options.modules = options.modules || [];
  var moduleNames = options.modules.map(function (_ref2) {
    var name = _ref2.name;
    return name;
  });
  if (moduleNames.indexOf("AssertionModule") === -1) {
    options.modules.push(new AssertionModule());
  }
  return new Docxtemplater(zip, options);
}
function getZip(name) {
  if (documentCache[name] === undefined || documentCache[name].loadedContent === undefined) {
    throw new Error("The file examples/" + name + " doesn't exist");
  }
  return new PizZip(documentCache[name].loadedContent);
}
function getLoadedContent(name) {
  return documentCache[name].loadedContent;
}
function getContent(doc) {
  return doc.getZip().files["word/document.xml"].asText();
}
function resolveSoon(data) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(data);
    }, time);
  });
}
function rejectSoon(data) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(data);
    }, time);
  });
}
function getParameterByName(name) {
  if (typeof window === "undefined") {
    return null;
  }
  var url = window.location.href;
  name = name.replace(/[[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function browserMatches(regex) {
  var currentBrowser = getParameterByName("browser");
  if (currentBrowser === null) {
    return false;
  }
  return regex.test(currentBrowser);
}
function getLength(obj) {
  if (obj instanceof ArrayBuffer) {
    return obj.byteLength;
  }
  return obj.length;
}
function captureLogs() {
  var oldLog = console.log;
  var collected = [];
  console.log = function (a) {
    // oldLog(a);
    collected.push(a);
  };
  return {
    logs: function logs() {
      return collected;
    },
    stop: function stop() {
      console.log = oldLog;
    }
  };
}
module.exports = {
  chai: chai,
  cleanError: cleanError,
  cleanRecursive: cleanRecursive,
  createDoc: createDoc,
  getLoadedContent: getLoadedContent,
  createXmlTemplaterDocx: createXmlTemplaterDocx,
  createXmlTemplaterDocxNoRender: createXmlTemplaterDocxNoRender,
  expect: expect,
  expectToThrow: expectToThrow,
  expectToThrowSnapshot: expectToThrowSnapshot,
  expectToThrowAsync: expectToThrowAsync,
  expectToThrowAsyncSnapshot: expectToThrowAsyncSnapshot,
  getContent: getContent,
  imageData: imageData,
  loadDocument: loadDocument,
  loadFile: loadFile,
  loadImage: loadImage,
  makeDocx: makeDocx,
  makeDocxV4: makeDocxV4,
  makePptx: makePptx,
  makePptxV4: makePptxV4,
  removeSpaces: removeSpaces,
  setExamplesDirectory: setExamplesDirectory,
  setSnapshotFile: setSnapshotFile,
  setStartFunction: setStartFunction,
  shouldBeSame: shouldBeSame,
  resolveSoon: resolveSoon,
  rejectSoon: rejectSoon,
  start: start,
  wrapMultiError: wrapMultiError,
  createDocV4: createDocV4,
  getZip: getZip,
  getParameterByName: getParameterByName,
  browserMatches: browserMatches,
  errorVerifier: errorVerifier,
  getLength: getLength,
  captureLogs: captureLogs
};