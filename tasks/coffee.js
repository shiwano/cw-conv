module.exports = function (grunt) {
  var path = require('path');
  var fs = require('fs');
  var coffee = require('coffee-script');

  grunt.registerMultiTask('coffee', 'Compile CoffeeScript files', function () {
    var src = this.data.src,
        dest = this.data.dest;

    var filepaths = grunt.file.expandFiles(path.join(src, '/**/*.coffee'));
    grunt.file.clearRequireCache(filepaths);

    grunt.file.expandFiles(path.join(dest, '/**/*.js')).forEach(function (filepath) {
      srcpath = filepath.replace(dest, src).replace(/\.js$/, '.coffee');

      if (!fs.existsSync(srcpath)) {
        grunt.helper('coffee-delete', filepath);
      }
    });

    filepaths.forEach(function (filepath) {
      destpath = filepath.replace(src, dest).replace(/\.coffee$/, '.js');
      grunt.helper('coffee', filepath, destpath);
    });

    if (grunt.task.current.errorCount) {
      return false;
    }

    grunt.log.ok('Compiling complete');
  });

  grunt.registerHelper('coffee-delete', function (filepath) {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      grunt.log.writeln('Deleted "' + filepath + '"');
    }
  });

  grunt.registerHelper('coffee', function (src, dest) {
    options = grunt.config.get('options.coffee') || {};
    options.filename = src;

    try {
      var js = coffee.compile(grunt.file.read(src), options);
      grunt.file.write(dest, js);
      grunt.log.writeln('Compiled "' + src + '" -> "' + dest + '"');
    } catch (e) {
      grunt.log.error("Error in " + src + ":\n" + e);
      return false;
    }
  });
};
