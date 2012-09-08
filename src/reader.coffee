define = require('amdefine')(module) if typeof define isnt 'function'

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
      unicodeArray = encoding.Encoding.convert buffer, 'UNICODE', 'SJIS'
      string = encoding.Encoding.codeToString unicodeArray
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
      base64 = utils.toBase64 buffer
      "data:image/x-bmp;base64,#{base64}"

    readImage: ->
      length = @readInt32()
      return '' unless length > 0
      buffer = @buffer.slice(@position, @position + length)
      @seek length
      buffer

  exports.Reader = Reader
  exports
