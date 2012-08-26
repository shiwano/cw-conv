if (typeof define !== 'function') {
  define = require('amdefine')(module);
}
define(function(require, exports, module) {
  exports.toArrayBuffer = function(buf) {
    var arrayBuf, index, value, view, _i, _len;
    arrayBuf = new ArrayBuffer(buf.length);
    view = new Uint8Array(arrayBuf);
    for (index = _i = 0, _len = buf.length; _i < _len; index = ++_i) {
      value = buf[index];
      view[index] = value;
    }
    return arrayBuf;
  };
  return exports;
});