module.exports = (grunt) ->
  fs = require('fs')

  grunt.initConfig
    pkg: '<json:package.json>'
    connect:
      server:
        options:
          port: 8000
          base: './public'
          keepalive: true

    simplemocha:
      lib:
        src: 'test/lib/**/*.coffee'
        options:
          globals: []
          timeout: 3000
          ui: 'bdd'
          reporter: 'nyan'
          growl: true
          'ignore-leaks': true

    coffee:
      lib:
        expand: true
        cwd: 'src/'
        src: ['*.coffee']
        dest: 'lib/'
        ext: '.js'

    requirejs:
      compile:
        options:
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

  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-requirejs'
  grunt.loadNpmTasks 'grunt-simple-mocha'
  grunt.registerTask 'test', 'simplemocha'
  grunt.registerTask 'build', 'requirejs:compile'
  grunt.registerTask 'server', 'connect:server'
  grunt.registerTask 'default', ['coffee', 'test', 'build']
