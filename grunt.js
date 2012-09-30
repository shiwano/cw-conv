module.exports = function(grunt) {
  fs = require('fs');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    test: {
      lib: {
        files: ['test/lib/**/*.coffee'],
        noCachedFiles: ['test/spec_helper.coffee']
      }
    },
    coffee: {
      lib: {
        src: 'src',
        dest: 'lib'
      }
    },
    build: {
      requirejs: {
        baseUrl: 'lib',
        name: 'main',
        out: 'build/cw-conv.js'
      }
    },
    yagura: {
      coffee: {
        files: ['src/**/*.coffee'],
        noCachedFiles: ['test/spec_helper.coffee'],
        changed: function (filepath, done) {
          destpath = filepath.replace('src', 'lib').replace(/\.coffee$/, '.js');
          grunt.helper('coffee', filepath, destpath);
          specpath = filepath.replace('src', 'test/lib').replace(/\.coffee$/, '_spec.coffee');

          if (fs.existsSync(specpath)) {
            grunt.helper('test', [specpath], done);
          } else {
            done();
          }
        },
        deleted: function (filepath, done) {
          destpath = filepath.replace('src', 'lib').replace(/\.coffee$/, '.js');
          grunt.helper('coffee-delete', destpath);
          done();
        }
      },
      test: {
        files: ['test/lib/**/*.coffee'],
        noCachedFiles: ['test/spec_helper.coffee'],
        changed: function (filepath, done) {
          grunt.helper('test', [filepath], done);
        }
      }
    },
    watch: {
      files: ['grunt.js', 'src/**/*.coffee', 'test/lib/**/*.coffee'],
      tasks: 'yagura'
    },
    options: {
      coffee: {
        bare: true
      },
      mocha: {
        'growl': true,
        'compilers': 'coffee:coffee-script',
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
