(function() {
  var define;

  if (typeof define !== 'function') {
    define = require('amdefine')(module);
  }

  define(function(require, exports, module) {
    exports.awesome = function() {
      return 'awesome';
    };
    return exports;
  });

}).call(this);
