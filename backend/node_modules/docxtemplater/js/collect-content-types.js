"use strict";

var ctXML = "[Content_Types].xml";
function collectContentTypes(overrides, defaults, zip) {
  var partNames = {};
  for (var i = 0, len = overrides.length; i < len; i++) {
    var override = overrides[i];
    var contentType = override.getAttribute("ContentType");
    var partName = override.getAttribute("PartName").substr(1);
    partNames[partName] = contentType;
  }
  var _loop = function _loop() {
    var def = defaults[_i];
    var contentType = def.getAttribute("ContentType");
    var extension = def.getAttribute("Extension");
    // eslint-disable-next-line no-loop-func
    zip.file(/./).map(function (_ref) {
      var name = _ref.name;
      if (name.slice(name.length - extension.length) === extension && !partNames[name] && name !== ctXML) {
        partNames[name] = contentType;
      }
    });
  };
  for (var _i = 0, _len = defaults.length; _i < _len; _i++) {
    _loop();
  }
  return partNames;
}
module.exports = collectContentTypes;