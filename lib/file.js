var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function(require, exports, module) {
  var Reader, encoding;
  encoding = require('../vendor/encoding');
  Reader = (function() {

    function Reader(buffer) {
      this.position = 0;
      this.buffer = buffer;
      this.view = new DataView(buffer);
    }

    Reader.prototype.seek = function(offset, whence) {
      if (whence == null) {
        whence = this.position;
      }
      return this.position = whence + offset;
    };

    Reader.prototype.readString = function() {
      var buffer, length, string, unicodeArray;
      length = this.readInt32();
      if (!(length > 0)) {
        return '';
      }
      buffer = this.buffer.slice(this.position, this.position + length - 1);
      this.seek(length);
      unicodeArray = encoding.Encoding.convert(buffer, 'UNICODE', 'SJIS');
      string = encoding.Encoding.codeToString(unicodeArray);
      return string.replace(/\r/g, '');
    };

    Reader.prototype.readInt8 = function() {
      var data;
      data = this.view.getInt8(this.position);
      this.seek(1);
      return data;
    };

    Reader.prototype.readInt32 = function() {
      var data;
      data = this.view.getInt32(this.position, true);
      this.seek(4);
      return data;
    };

    Reader.prototype.readBoolean = function() {
      if (this.readInt8()) {
        return true;
      } else {
        return false;
      }
    };

    Reader.prototype.readImage = function() {
      var buffer, length;
      length = this.readInt32();
      if (!(length > 0)) {
        return '';
      }
      buffer = this.buffer.slice(this.position, this.position + length);
      this.seek(length);
      return buffer;
    };

    return Reader;

  })();
  exports.Reader = Reader;
  return exports;
});
