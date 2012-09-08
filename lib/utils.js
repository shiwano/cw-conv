if (typeof define !== 'function') {
  define = require('amdefine')(module);
}
define(function(require, exports, module) {
  exports.toBase64 = function(buffer) {
    var string;
    string = String.fromCharCode.apply(null, new Uint8Array(buffer));
    return window.btoa(string);
  };
  return exports;
});