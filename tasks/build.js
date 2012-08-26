module.exports = function (grunt) {
  grunt.registerTask('build', 'Build the library', function () {
    var requirejsConfig = grunt.config('build.requirejs');
    var requirejs = require('requirejs');

    var done = this.async();
    requirejs.optimize(requirejsConfig, function (buildResponse) {
      //buildResponse is just a text output of the modules
      //included. Load the built file for the contents.
      //Use config.out to get the optimized file contents.
      grunt.log.ok('Build complete');
      done();
    });
  });
};
