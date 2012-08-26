(function() {
  var define;

  if (typeof define !== 'function') {
    define = require('amdefine')(module);
  }

  define(function(require, exports, module) {
    var main;
    main = require('./main');
    exports.read = function() {
      return main.awesome();
    };
    return exports;
  });

}).call(this);
