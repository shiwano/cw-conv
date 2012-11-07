define = @define or require('amdefine')(module)

define (require, exports, module) ->
  utils = require './utils'
  encoding = require '../vendor/encoding'

  class Reader
    constructor: (buffer) ->
      @position = 0
      @buffer = buffer
      @view = new DataView(buffer)

    seek: (offset, whence = @position) ->
      @position = whence + offset

    readString: ->
      length = @readInt32()
      return '' unless length > 0
      buffer = @buffer.slice(@position, @position + length - 1) # ignore a byte of the end
      @seek length
      uint8array = new Uint8Array buffer
      string = encoding.TextDecoder('shift_jis').decode(uint8array)
      string.replace /\r/g, ''

    readInt8: ->
      data = @view.getInt8(@position)
      @seek 1
      data

    readInt32: ->
      data = @view.getInt32(@position, true)
      @seek 4
      data

    readBoolean: ->
      if @readInt8() then true else false

    readImageAsDataURI: ->
      buffer = @readImage()
      return '' unless buffer
      base64 = utils.toBase64 buffer
      "data:application/octet-stream;base64,#{base64}"

    readImage: ->
      length = @readInt32()
      return null unless length > 0
      buffer = @buffer.slice(@position, @position + length)
      @seek length
      buffer

  exports.Reader = Reader
  exports
