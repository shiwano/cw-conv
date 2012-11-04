module.exports = (grunt) ->
  grunt.registerTask "build", "Build the library", ->
    requirejsConfig = grunt.config("build.requirejs")
    requirejs = require("requirejs")
    done = @async()

    requirejs.optimize requirejsConfig, (buildResponse) ->
      # buildResponse is just a text output of the modules
      # included. Load the built file for the contents.
      # Use config.out to get the optimized file contents.
      grunt.log.ok "Build complete"
      done()
