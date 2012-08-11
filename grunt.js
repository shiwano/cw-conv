module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    test: {
      lib: {
        srcDir: 'src',
        testDir: 'test/lib',
        suffix: '_spec'
      }
    },
    coffee: {
      lib: {
        srcDir: 'src',
        destDir: 'lib',
        options: {
          // bare: true
          bare: false
        }
      }
    },
    watch: {
      files: ['grunt.js', 'src/**/*.coffee', 'test/lib/**/*.coffee'],
      tasks: 'default'
    },
    mocha: {
      options: {
        'growl': true,
        'compilers': 'coffee:coffee-script',
        'require': 'should',
        'reporter': 'spec',
        'timeout': 8000,
        'ignore-leaks': true
      }
    }
  });

  // tasks
  grunt.loadTasks('tasks');
  grunt.registerTask('default', 'coffee test');
};
