module.exports = (grunt) ->
  path = require('path')
  fs = require('fs')
  coffee = require('coffee-script')

  grunt.registerMultiTask 'coffee', 'Compile CoffeeScript files', ->
    src = @data.src
    dest = @data.dest

    filepaths = grunt.file.expandFiles(path.join(src, '/**/*.coffee'))
    grunt.file.clearRequireCache filepaths
    grunt.file.expandFiles(path.join(dest, '/**/*.js')).forEach (filepath) ->
      srcpath = filepath.replace(dest, src).replace(/\.js$/, '.coffee')
      grunt.helper 'coffee-delete', filepath unless fs.existsSync(srcpath)

    filepaths.forEach (filepath) ->
      destpath = filepath.replace(src, dest).replace(/\.coffee$/, '.js')
      grunt.helper 'coffee', filepath, destpath

    return false if grunt.task.current.errorCount
    grunt.log.ok 'Compiling complete'

  grunt.registerHelper 'coffee-delete', (filepath) ->
    if fs.existsSync(filepath)
      fs.unlinkSync filepath
      grunt.log.writeln 'Deleted \'' + filepath + '\''

  grunt.registerHelper 'coffee', (src, dest) ->
    options = grunt.config.get('options.coffee') or {}
    options.filename = src

    try
      js = coffee.compile(grunt.file.read(src), options)
      grunt.file.write dest, js
      grunt.log.writeln "Compiled '#{src}' -> '#{dest}'"
    catch e
      grunt.log.error "Error in #{src}:\n #{e}"
      return false
