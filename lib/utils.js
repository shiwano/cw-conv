if (typeof define !== 'function') {
  define = require('amdefine')(module);
}
define(function(require, exports, module) {
  exports.toBase64 = function(buffer) {
    var fs, string;
    string = String.fromCharCode.apply(null, new Uint8Array(buffer));
    fs = require('fs');
    return window.btoa(string);
  };
  return exports;
});