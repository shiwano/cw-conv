(function() {
  var define;

  if (typeof window.define !== 'function') {
    define = require('amdefine')(module);
  }

  define(function(require, exports, module) {
    var reader;
    reader = require('./reader');
    return exports;
  });

}).call(this);
