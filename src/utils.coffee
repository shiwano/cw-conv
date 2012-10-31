define = require('amdefine')(module) if typeof window.define isnt 'function'

define (require, exports, module) ->
  {Base} = require './base'

  exports.toBase64 = (buffer) ->
    string = String.fromCharCode.apply null, new Uint8Array(buffer)
    window.btoa string

  exports.detectDataType = (buffer, filename) ->
    return 'summary' if filename is 'Summary.wsm'
    file = (new Base null, buffer)
    file.convertScenarioDataType file.reader.readInt8()

  exports
