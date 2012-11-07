define = @define or require('amdefine')(module)

define (require, exports, module) ->
  {Base} = require './base'

  class Effect extends Base
    parse: ->
      categoryType = @readInt8()
      @seek 5 # skip the unknown data
      @data.element = @convertEffectElementType @readInt8()
      # 大分類が召喚の場合は、byte 列は読み込まない
      effectType = if categoryType is 8 then 0 else @readInt8()
      @data.type = @convertEffectType categoryType, effectType

      switch categoryType
        # 生命力, 肉体
        when 0, 1
          @data.damageType = @convertEffectDamageType @readInt8()
          @data.value = @readInt32()
        # 精神, 魔法
        when 3, 4
          @data.duration = @readInt32()
        # 能力
        when 5
          @data.value = @readInt32()
          @data.duration = @readInt32()
        # 技能(2), 消滅(6), カード(7)はパス
        # 召喚
        when 8
          {BeastCard} = require './beast_card' # lazy require
          @data.beastCards = @readArray => new BeastCard(@).parse()

      @data

  exports.Effect = Effect
  exports
