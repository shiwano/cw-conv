define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->
  exports.toArrayBuffer = (buf) ->
    arrayBuf = new ArrayBuffer(buf.length)
    view = new Uint8Array(arrayBuf)
    for value, index in buf
      view[index] = value
    arrayBuf

  exports
