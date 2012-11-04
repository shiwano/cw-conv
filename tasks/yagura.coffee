module.exports = (grunt) ->
  async = require('async')

  grunt.registerMultiTask 'yagura', 'Run callbacks when a file changes', ->
    unless grunt.file.watchFiles.changed and grunt.file.watchFiles.deleted
      grunt.log.error 'Not found file changes.'
      return false

    changedCallback = @data.changed
    deletedCallback = @data.deleted
    files = @data.files

    taskResult = true
    taskDone = @async()

    if @data.noCachedFiles
      noCachedFiles = grunt.file.expandFiles(@data.noCachedFiles)
      grunt.file.clearRequireCache noCachedFiles

    wrapDone = (done) ->
      (result) ->
        taskResult = result  if typeof result isnt 'undefined' and not result
        done()

    async.forEach grunt.file.watchFiles.changed, ((filepath, done) ->
      if changedCallback and grunt.file.isMatch(files, filepath)
        changedCallback filepath, wrapDone(done)
        return
      done()
    ), (changedError) ->
      async.forEach grunt.file.watchFiles.deleted, ((filepath, done) ->
        if deletedCallback and grunt.file.isMatch(files, filepath)
          deletedCallback filepath, wrapDone(done)
          return
        done()
      ), (deletedError) ->
        if taskResult and not changedError and not deletedError and not grunt.task.current.errorCount
          grunt.log.ok "Now it's all quiet."
          taskDone()
        else
          grunt.log.error 'Enemy attack!'
          taskDone false
