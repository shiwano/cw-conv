module.exports = (grunt) ->
  path = require('path')
  fs = require('fs')
  Mocha = require('mocha')

  grunt.registerMultiTask 'test', 'Run specs with mocha.', ->
    filepaths = grunt.file.expandFiles(@data.files)
    grunt.file.clearRequireCache filepaths
    done = @async()
    grunt.config.get('helper.test')(filepaths, done)

  grunt.config 'helper.test', (filepaths, done) ->
    options = grunt.config.get('options.mocha') or {}
    mocha = new Mocha(options)
    grunt.file.clearRequireCache filepaths
    filepaths.map mocha.addFile.bind(mocha)

    try
      mocha.run (status) ->
        done (status is 0)
    catch error
      grunt.log.error error.stack
      done false
