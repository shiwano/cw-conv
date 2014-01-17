(function() {
  exports.toBase64 = function(buffer) {
    var string;
    string = String.fromCharCode.apply(null, new Uint8Array(buffer));
    return btoa(string);
  };

  exports.detectDataType = function(buffer, filename) {
    var Base, file, typeId;
    if (filename === 'Summary.wsm') {
      return 'summary';
    }
    Base = require('./base').Base;
    file = new Base(null, buffer);
    typeId = file.reader.readInt8();
    if (typeId === 4 && filename.indexOf('Package') === 0) {
      return 'package';
    }
    return file.convertScenarioDataType(typeId);
  };

  exports.toUpperCamelCase = function(string) {
    return string.replace(/^./, function(s) {
      return s.toUpperCase();
    });
  };

}).call(this);
