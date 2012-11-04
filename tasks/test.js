module.exports = function(grunt) {
  var path = require('path'),
      fs = require('fs'),
      Mocha = require('mocha');

  grunt.registerMultiTask('test', 'Run specs with mocha.', function() {
    var filepaths = grunt.file.expandFiles(this.data.files);
    grunt.file.clearRequireCache(filepaths);
    var done = this.async();
    grunt.helper('test', filepaths, done);
  });

  grunt.registerHelper('test', function (filepaths, done) {
    options = grunt.config.get('options.mocha') || {};
    var mocha = new Mocha(options);
    grunt.file.clearRequireCache(filepaths);
    filepaths.map(mocha.addFile.bind(mocha));

    try {
      mocha.run(function (status) {
        done((status === 0));
      });
    } catch (error) {
      grunt.log.error(error.stack);
      done(false);
    }
  });
};
