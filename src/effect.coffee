define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->
  {Base} = require './base'

  class Effect extends Base
    parse: ->
      categoryType = @reader.readInt8()
      @reader.seek 5 # skip the unknown data
      @data.element = @convertEffectElementType @reader.readInt8()
      # 大分類が召喚の場合は、byte 列は読み込まない
      effectType = if categoryType is 8 then 0 else @reader.readInt8()
      @data.type = @convertEffectType categoryType, effectType

      switch categoryType
        # 生命力, 肉体
        when 0, 1
          @data.damageType = @convertEffectDamageType @reader.readInt8()
          @data.value - @reader.readInt32()
        # 精神, 魔法
        when 3, 4
          @data.duration = @reader.readInt32()
        # 能力
        when 5
          @data.value - @reader.readInt32()
          @data.duration = @reader.readInt32()
        # 技能(2), 消滅(6), カード(7)はパス
        # 召喚
        when 8
          beastsLength = @reader.readInt32()
          {BeastCard} = require './beast_card' # lazy require
          @data.beasts = (new BeastCard(@).parse() for i in [0...beastsLength])

      @data

  exports.Effect = Effect
  exports
