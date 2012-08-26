var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function(require, exports, module) {
  var utils;
  utils = require('./utils');
  exports.read = function(filepath, done) {
    var fs, stat;
    fs = require('fs');
    stat = fs.statSync(filepath);
    return fs.open(filepath, 'r', function(status, fd) {
      var buf;
      if (status) {
        return console.warn(status.message);
      }
      buf = new Buffer(stat.size);
      return fs.read(fd, buf, 0, stat.size, 0, function() {
        return done(utils.toArrayBuffer(buf));
      });
    });
  };
  return exports;
});
