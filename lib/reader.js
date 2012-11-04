(function() {
  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  define(function(require, exports, module) {
    var Reader, encoding, utils;
    utils = require('./utils');
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
        var buffer, length, string, uint8array;
        length = this.readInt32();
        if (!(length > 0)) {
          return '';
        }
        buffer = this.buffer.slice(this.position, this.position + length - 1);
        this.seek(length);
        uint8array = new Uint8Array(buffer);
        string = encoding.TextDecoder('shift_jis').decode(uint8array);
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

      Reader.prototype.readImageAsDataURI = function() {
        var base64, buffer;
        buffer = this.readImage();
        if (!buffer) {
          return '';
        }
        base64 = utils.toBase64(buffer);
        return "data:application/octet-stream;base64," + base64;
      };

      Reader.prototype.readImage = function() {
        var buffer, length;
        length = this.readInt32();
        if (!(length > 0)) {
          return null;
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

}).call(this);
