module.exports = function (grunt) {
  async = require('async');

  grunt.registerMultiTask('yagura', 'Run callbacks when a file changes', function() {
    if (!grunt.file.watchFiles) {
      grunt.log.error('grunt.file.watchFiles not found.');
      return;
    }

    var changedCallback = this.data.changed,
        deletedCallback = this.data.deleted,
        pattern = new RegExp(this.data.match),
        taskResult = true;
        taskDone = this.async();

    var wrapDone = function (done) {
      return function (result) {
        if (typeof result !== 'undefined' && !result) {
          taskResult = result;
        }
        done();
      };
    };

    async.forEach(grunt.file.watchFiles.changed, function (filepath, done) {
      if (changedCallback && pattern.test(filepath)) {
        changedCallback(filepath, wrapDone(done));
        return;
      }
      done();
    }, function (changedError) {
      async.forEach(grunt.file.watchFiles.deleted, function (filepath, done) {
        if (deletedCallback && pattern.test(filepath)) {
          deletedCallback(filepath, wrapDone(done));
          return;
        }
        done();
      }, function (deletedError) {
        if (taskResult && !changedError && !deletedError) {
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
