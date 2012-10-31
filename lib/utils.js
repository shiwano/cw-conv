(function() {
  var define;

  if (typeof window.define !== 'function') {
    define = require('amdefine')(module);
  }

  define(function(require, exports, module) {
    var Base;
    Base = require('./base').Base;
    exports.toBase64 = function(buffer) {
      var string;
      string = String.fromCharCode.apply(null, new Uint8Array(buffer));
      return window.btoa(string);
    };
    exports.detectDataType = function(buffer, filename) {
      var file;
      if (filename === 'Summary.wsm') {
        return 'summary';
      }
      file = new Base(null, buffer);
      return file.convertScenarioDataType(file.reader.readInt8());
    };
    return exports;
  });

}).call(this);
