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
        out: 'build/main.js'
        wrap:
          start: '(function(define) {'
          end: '})(define);'

    yagura:
      coffee:
        files: 'src/**/*.coffee'
        noCachedFiles: ['test/spec_helper.coffee']
        changed: (filepath, done) ->
          destpath = filepath.replace('src', 'lib').replace(/\.coffee$/, '.js')
          grunt.helper 'coffee', filepath, destpath
          specpath = filepath.replace('src', 'test/lib').replace(/\.coffee$/, '_spec.coffee')
          return done() unless fs.existsSync(specpath)
          grunt.helper 'test', [specpath], done

        deleted: (filepath, done) ->
          destpath = filepath.replace('src', 'lib').replace(/\.coffee$/, '.js')
          grunt.helper 'coffee-delete', destpath
          done()

      test:
        files: 'test/lib/**/*.coffee'
        noCachedFiles: ['test/spec_helper.coffee']
        changed: (filepath, done) ->
          grunt.helper 'test', [filepath], done

    watch:
      files: ['grunt.js', 'src/**/*.coffee', 'test/lib/**/*.coffee']
      tasks: 'yagura'

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
  grunt.registerTask 'default', 'coffee test build'
