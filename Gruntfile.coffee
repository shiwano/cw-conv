module.exports = (grunt) ->
  fs = require('fs')

  # Project configuration.
  grunt.initConfig
    pkg: '<json:package.json>'
    connect:
      port: 8000
      base: './public'

    test:
      lib:
        files: 'test/lib/**/*.coffee'

    coffee:
      lib:
        src: 'src'
        dest: 'lib'

    build:
      requirejs:
        baseUrl: 'lib'
        name: 'main'
        out: 'public/javascripts/main.js'
        wrap:
          start: '(function(define) {'
          end: '})(define);'
        onBuildRead: (moduleName, path, contents) ->
          """
          define(function(require, exports, module) {
            #{contents}
            return exports;
          });
          """

    watch:
      files: ['grunt.js', 'src/**/*.coffee', 'test/lib/**/*.coffee']
      tasks: ['coffee', 'test']

    options:
      mocha:
        growl: true
        compilers: 'coffee:coffee-script'
        reporter: 'spec'
        timeout: 8000
        'ignore-leaks': true

  # tasks
  grunt.loadTasks 'tasks'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.registerTask 'default', ['coffee', 'test', 'build']
