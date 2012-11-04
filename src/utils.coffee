define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->

  exports.toBase64 = (buffer) ->
    string = String.fromCharCode.apply null, new Uint8Array(buffer)
    window.btoa string

  exports.detectDataType = (buffer, filename) ->
    return 'summary' if filename is 'Summary.wsm'
    {Base} = require './base'
    file = new Base null, buffer
    typeId = file.reader.readInt8()
    return 'package' if typeId is 4 and filename.indexOf('Package') is 0
    file.convertScenarioDataType typeId

  exports.toUpperCamelCase = (string) ->
    string.replace /^./, (s) -> s.toUpperCase()

  exports
