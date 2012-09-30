module.exports = function (grunt) {
  async = require('async');

  grunt.registerMultiTask('yagura', 'Run callbacks when a file changes', function() {
    if (!grunt.file.watchFiles) {
      grunt.log.error('grunt.file.watchFiles not found.');
      return false;
    }

    var changedCallback = this.data.changed,
        deletedCallback = this.data.deleted,
        files = this.data.files,
        taskResult = true;
        taskDone = this.async();

    if (this.data.noCachedFiles) {
      var noCachedFiles = grunt.file.expandFiles(this.data.noCachedFiles);
      grunt.file.clearRequireCache(noCachedFiles);
    }

    var wrapDone = function (done) {
      return function (result) {
        if (typeof result !== 'undefined' && !result) {
          taskResult = result;
        }
        done();
      };
    };

    async.forEach(grunt.file.watchFiles.changed, function (filepath, done) {
      if (changedCallback && grunt.file.isMatch(files, filepath)) {
        changedCallback(filepath, wrapDone(done));
        return;
      }
      done();
    }, function (changedError) {
      async.forEach(grunt.file.watchFiles.deleted, function (filepath, done) {
        if (deletedCallback && grunt.file.isMatch(files, filepath)) {
          deletedCallback(filepath, wrapDone(done));
          return;
        }
        done();
      }, function (deletedError) {
        if (taskResult && !changedError && !deletedError && !grunt.task.current.errorCount) {
          grunt.log.ok("Now it's all quiet.");
          taskDone();
        } else {
          grunt.log.error("Enemy attack!");
          taskDone(false);
        }
      });
    });
  });
};
