module.exports = function(grunt) {
  var path = require('path'),
      fs = require('fs'),
      Mocha = require('mocha');

  grunt.registerMultiTask('test', 'Run specs with mocha.', function() {
    var filepaths = grunt.file.expandFiles(this.data.files);
    var nonCachedFiles = grunt.file.expandFiles(this.data.nonCached);
    grunt.file.clearRequireCache(filepaths);
    grunt.file.clearRequireCache(nonCachedFiles);
    var done = this.async();
    grunt.helper('test', filepaths, done);
  });

  grunt.registerHelper('test', function (filepaths, done) {
    options = grunt.config.get('options.mocha') || {};
    var mocha = new Mocha(options);
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
