define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->
  {Reader} = require './reader'

  class Base
    constructor: (parent, buffer = null, isInnData = false) ->
      @reader    = parent?.reader or new Reader(buffer)
      @isInnData = parent?.isInnData or isInnData
      @data      = {}

    seek: (offset)      -> @reader.seek offset
    readString:         -> @reader.readString()
    readInt8:           -> @reader.readInt8()
    readInt32:          -> @reader.readInt32()
    readBoolean:        -> @reader.readBoolean()
    readImageAsDataURI: -> @reader.readImageAsDataURI()

    readArray: (iterator, length) ->
      length = @readInt32() unless length?
      ((do iterator) for i in [0...length])

    toJSON: ->
      JSON.stringify @data

#-------------------------------------------------------------------------------
# データ・タイプ
#-------------------------------------------------------------------------------

    convertScenarioDataType: (i) ->
      switch i
        when 0 then 'scene'
        when 1 then 'battle'
        when 2 then 'characterCard'
        when 3 then 'itemCard'
        when 4 then 'infoCard' # wid に一意に定義されていないので暫定
        when 5 then 'skillCard'
        when 6 then 'beastCard'
        when 7 then 'package'  # wid に一意に定義されていないので暫定
        when 8 then 'summary'  # wsm に type が定義されていないので暫定
        else throw Error "Unknown scenario data type: #{i}"

#-------------------------------------------------------------------------------
# イベントコンテント
#-------------------------------------------------------------------------------

    convertEventElementType: (i) ->
      switch i
        when 0  then 'start'                  # スタート
        when 1  then 'startLink'              # スタートへのリンク
        when 2  then 'battle'                 # バトル開始
        when 3  then 'scenarioEnd'            # シナリオクリア
        when 4  then 'gameOver'               # ゲームオーバー
        when 5  then 'scene'                  # エリア移動
        when 6  then 'message'                # メッセージ
        when 7  then 'music'                  # BGM変更
        when 8  then 'background'             # 背景変更
        when 9  then 'sound'                  # 効果音
        when 10 then 'wait'                   # 空白時間
        when 11 then 'effect'                 # 効果
        when 12 then 'branchByMemberSelect'   # メンバ選択分岐
        when 13 then 'branchByAbility'        # 能力判定分岐
        when 14 then 'branchByRandom'         # ランダム分岐
        when 15 then 'branchByFlag'           # フラグ分岐
        when 16 then 'flag'                   # フラグ変更
        when 17 then 'branchBySteps'          # ステップ多岐分岐
        when 18 then 'steps'                  # ステップ変更
        when 19 then 'branchByFriend'         # キャスト存在分岐
        when 20 then 'branchByItem'           # アイテム所持分岐
        when 21 then 'branchBySkill'          # スキル所持分岐
        when 22 then 'branchByInformation'    # 情報所持分岐
        when 23 then 'branchByBeast'          # 召喚獣存在分岐
        when 24 then 'branchByMoney'          # 所持金分岐
        when 25 then 'branchByAchievement'    # 称号分岐
        when 26 then 'friend'                 # キャスト加入
        when 27 then 'item'                   # アイテム入手
        when 28 then 'skill'                  # スキル入手
        when 29 then 'information'            # 情報入手
        when 30 then 'beast'                  # 召喚獣獲得
        when 31 then 'money'                  # 所持金増加
        when 32 then 'achievement'            # 称号付与
        when 33 then 'friendLoss'             # キャスト離脱
        when 34 then 'itemLoss'               # アイテム喪失
        when 35 then 'skillLoss'              # スキル喪失
        when 36 then 'informationLoss'        # 情報喪失
        when 37 then 'beastLoss'              # 召喚獣喪失
        when 38 then 'moneyLoss'              # 所持金減少
        when 39 then 'achievementLoss'        # 称号剥奪
        when 40 then 'characterMessage'       # セリフ
        when 41 then 'stepUp'                 # ステップ増加
        when 42 then 'stepDown'               # ステップ減少
        when 43 then 'flagReverse'            # フラグ反転
        when 44 then 'branchByCurrentStep'    # ステップ上下分岐
        when 45 then 'timePassage'            # 時間経過
        when 46 then 'branchByLevel'          # レベル分岐
        when 47 then 'branchByCharacterState' # 状態分岐
        when 48 then 'branchByPartyNumber'    # 人数判定分岐
        when 49 then 'partyShow'              # パーティ表示
        when 50 then 'partyHide'              # パーティ隠蔽
        when 51 then 'effectBreak'            # 効果中断
        when 52 then 'startCall'              # スタートのコール
        when 53 then 'packageLink'            # パッケージへのリンク
        when 54 then 'packageCall'            # パッケージのコール
        when 55 then 'branchByScene'          # エリア分岐
        when 56 then 'branchByBattle'         # バトル分岐
        when 57 then 'branchByCompletedStamp' # 終了シナリオ分岐
        when 58 then 'completedStamp'         # 終了シナリオ設定
        when 59 then 'completedStampLoss'     # 終了シナリオ削除
        when 60 then 'branchByGossip'         # ゴシップ分岐
        when 61 then 'gossip'                 # ゴシップ追加
        when 62 then 'gossipLoss'             # ゴシップ削除
        when 63 then 'branchByBattleNow'      # バトル判定分岐
        when 64 then 'backgroundRebuild'      # 画面の再構築
        when 65 then 'flagCheck'              # フラグ判定
        else throw Error "Unknown event element type: #{i}"

#-------------------------------------------------------------------------------
# 適用メンバ・適用範囲
#-------------------------------------------------------------------------------

    convertTargetType: (i, isEffectElement = false) ->
      # 効果コンテントの適用メンバには"選択中以外のメンバ"は存在しない。
      # 代わりに"パーティ全体"となる。
      i = 6 if isEffectElement and i is 2

      switch i
        when 0 then 'selected'            # 現在選択中のメンバ
        when 1 then 'random'              # ランダムメンバ
        when 2 then 'unselected'          # 現在選択中以外のメンバ
        when 3 then 'selectedIgnoreSleep' # 現在選択中のメンバ・睡眠有効
        when 4 then 'randomIgnoreSleep'   # ランダムメンバ・睡眠有効
        when 5 then 'partyIgnoreSleep'    # パーティ全員・睡眠有効
        when 6 then 'party'               # パーティ全員（効果コンテント用）
        else throw Error "Unknown target type: #{i}"

    convertTargetScopeType: (i) ->
      switch i
        when 0 then 'selected'          # 現在選択中のメンバ
        when 1 then 'random'            # ランダムメンバ
        when 2 then 'party'             # パーティ全員
        when 3 then 'inventory'         # 荷物袋
        when 4 then 'partyAndInventory' # 全体・荷物袋含む
        when 5 then 'all'               # フィールド全体
        else throw Error "Unknown target scope type: #{i}"

#-------------------------------------------------------------------------------
# コンテント系
#-------------------------------------------------------------------------------

    convertCardArrangementType: (i) ->
      switch i
        when 0 then 'auto'   # 自動配置
        when 1 then 'custom' # 指定配置
        else throw Error "Unknown card arrangement type: #{i}"

    convertCharacterStateType: (i) ->
      switch i
        when 0  then 'active'       # 行動可能
        when 1  then 'inactive'     # 行動不可
        when 2  then 'alive'        # 生存
        when 3  then 'dead'         # 非生存
        when 4  then 'fine'         # 健康
        when 5  then 'injured'      # 負傷
        when 6  then 'heavyInjured' # 重症
        when 7  then 'unconscious'  # 意識不明
        when 8  then 'poison'       # 毒
        when 9  then 'sleep'        # 睡眠
        when 10 then 'bind'         # 呪縛
        when 11 then 'paralyzed'    # 麻痺・石化
        else throw Error "Unknown character state type: #{i}"

#-------------------------------------------------------------------------------
# 効果モーション関連
#-------------------------------------------------------------------------------

    convertEffectElementType: (i) ->
      switch i
        when 0 then 'non'   # 全属性
        when 1 then 'body'  # 肉体属性
        when 2 then 'mind'  # 精神属性
        when 3 then 'holy'  # 神聖属性
        when 4 then 'spell' # 魔力属性
        when 5 then 'fire'  # 炎属性
        when 6 then 'cold'  # 冷属性
        else throw Error "Unknown effect element type: #{i}"

    convertEffectType: (categoryType, effectType) ->
      switch categoryType
        when  0
          switch effectType
            when 0 then 'heal'   # 回復
            when 1 then 'damage' # ダメージ
            when 2 then 'absorb' # 吸収
            else throw Error "Unknown effect type: #{categoryType}, #{effectType}"
        when 1
          switch effectType
            when 0 then 'paralyze'    # 麻痺状態
            when 1 then 'disParalyze' # 麻痺解除
            when 2 then 'poison'      # 中毒状態
            when 3 then 'disPoison'   # 中毒解除
            else throw Error "Unknown effect type: #{categoryType}, #{effectType}"
        when 2
          switch effectType
            when 0 then 'recoverSkillPoint' # 精神力回復
            when 1 then 'loseSkillPoint'    # 精神力不能
            else throw Error "Unknown effect type: #{categoryType}, #{effectType}"
        when 3
          switch effectType
            when 0 then 'sleep'     # 睡眠状態
            when 1 then 'confuse'   # 混乱状態
            when 2 then 'overheat'  # 激昂状態
            when 3 then 'encourage' # 勇敢状態
            when 4 then 'panic'     # 恐慌状態
            when 5 then 'relaxMind' # 正常状態
            else throw Error "Unknown effect type: #{categoryType}, #{effectType}"
        when 4
          switch effectType
            when 0 then 'bind'              # 束縛状態
            when 1 then 'disBind'           # 束縛解除
            when 2 then 'silence'           # 沈黙状態
            when 3 then 'disSilence'        # 沈黙解除
            when 4 then 'reveal'            # 暴露状態
            when 5 then 'conceal'           # 暴露解除
            when 6 then 'enableMagicproof'  # 魔法無効化状態
            when 7 then 'disableMagicproof' # 魔法無効化解除
            else throw Error "Unknown effect type: #{categoryType}, #{effectType}"
        when 5
          switch effectType
            when 0 then 'enhanceActionLevel' # 行動力変化
            when 1 then 'enhanceEvasion'     # 回避力変化
            when 2 then 'enhanceResistance'  # 抵抗力変化
            when 3 then 'enhanceDefense'     # 防御力変化
            else throw Error "Unknown effect type: #{categoryType}, #{effectType}"
        when 6
          switch effectType
            when 0 then 'vanishTarget' # 対象消去
            when 1 then 'vanishCards'  # カード消去
            when 2 then 'vanishBeasts' # 召喚獣消去
            else throw Error "Unknown effect type: #{categoryType}, #{effectType}"
        when 7
          switch effectType
            when 0 then 'dealAttackCard'           # 通常攻撃
            when 1 then 'dealPowerfulAttackCard'   # 渾身の一撃
            when 2 then 'dealCriticalAttackCard'   # 会心の一撃
            when 3 then 'dealFeintCard'            # フェイント
            when 4 then 'dealDefenseCard'          # 防御
            when 5 then 'dealDistanceCard'         # 見切り
            when 6 then 'dealConfuseCard'          # 混乱
            when 7 then 'dealSkillCard'            # 特殊技能
            else throw Error "Unknown effect type: #{categoryType}, #{effectType}"
        when 8
          switch effectType
            when 0 then 'summonBeast'              # 召喚獣召喚
            else throw Error "Unknown effect type: #{categoryType}, #{effectType}"
        else throw Error "Unknown effect type: #{categoryType}, #{effectType}"

    convertEffectDamageType: (i) ->
      switch i
        when 0 then 'levelRatio' # レベル比
        when 1 then 'default'    # 効果値
        when 2 then 'max'        # 最大値
        else throw Error "Unknown effect damage type: #{i}"

#-------------------------------------------------------------------------------
# スキル・アイテム・召喚獣・効果コンテント関連
#-------------------------------------------------------------------------------

    convertEffectPhenomenonType: (i) ->
      switch i
        when 0 then 'physical'        # 物理属性
        when 1 then 'magical'         # 魔法属性
        when 2 then 'magicalPhysical' # 魔法的物理属性
        when 3 then 'physicalMagical' # 物理的魔法属性
        when 4 then 'non'             # 無属性
        else throw Error "Unknown card effect element type: #{i}"

    convertEffectReactionType: (i) ->
      switch i
        when 0 then 'evasion'        # 物理属性
        when 1 then 'resistance'     # 抵抗属性
        when 2 then 'ineluctability' # 必中属性
        else throw Error "Unknown card response type: #{i}"

    convertEffectAnimationType: (i) ->
      switch i
        when 0 then 'none'                  # 無し
        when 1 then 'turnover'              # 反転
        when 2 then 'lateralVibration'      # 横振動
        when 3 then 'longitudinalVibration' # 縦振動
        else throw Error "Unknown card effect animation type: #{i}"

    convertPhysicalAptitudeType: (i) ->
      switch i
        when 0 then 'dex' # 器用
        when 1 then 'agl' # 素早さ
        when 2 then 'int' # 知力
        when 3 then 'str' # 筋力
        when 4 then 'vit' # 生命
        when 5 then 'min' # 精神
        else throw Error "Unknown card physical aptitude type: #{i}"

    convertMentalAptitudeType: (i) ->
      switch i
        when  1 then 'aggressiveness' # 好戦
        when -1 then 'gentleness'     # 平和
        when  2 then 'cheerfulness'   # 社交
        when -2 then 'depressiveness' # 内向
        when  3 then 'braveness'      # 勇敢
        when -3 then 'timidness'      # 臆病
        when  4 then 'carefulness'    # 慎重
        when -4 then 'boldness'       # 大胆
        when  5 then 'craftiness'     # 狡猾
        when -5 then 'truthfulness'   # 正直
        else throw Error "Unknown card mental aptitude type: #{i}"

    convertCardTargetType: (i) ->
      switch i
        when 0 then 'none'            # 対象なし
        when 1 then 'user'            # 使用者
        when 2 then 'party'           # 味方
        when 3 then 'enemies'         # 敵
        when 4 then 'partyAndEnemies' # 敵・味方両方
        else throw Error "Unknown card target type: #{i}"

    convertCardRarityType: (i) ->
      # 一時的に所持しているだけのF9でなくなるカードの場合は+3されている。
      switch i
        when 0 then 'common'  # 通常
        when 1 then 'rare'    # レア
        when 2 then 'premium' # プレミア
        else throw Error "Unknown card rarity type: #{i}"

#-------------------------------------------------------------------------------
# キャラクター関連
#-------------------------------------------------------------------------------

    convertCharacterMentalityType: (i) ->
      # 0==正常状態 以外の判別は適当
      switch i
        when 0 then 'normal'    # 正常状態
        when 1 then 'panic'     # 恐慌状態
        when 2 then 'brave'     # 勇敢状態
        when 3 then 'overheat'  # 激昂状態
        when 4 then 'confusion' # 混乱状態
        when 5 then 'sleep'     # 睡眠状態
        else throw Error "Unknown character mentarity type: #{i}"

#-------------------------------------------------------------------------------
# 宿データ関連
#-------------------------------------------------------------------------------

    convertInnType: (i) ->
      switch i
        when 1 then 'normal'    # ノーマル宿
        when 2 then 'debug'     # デバッグ宿
        else throw Error "Unknown inn type: #{i}"

    convertInnSummarySettingType: (i) ->
      switch i
        when 0 then 'hideHiddenAndCompletedScenarios' # 隠蔽シナリオ・終了済みシナリオを非表示
        when 1 then "hideHiddenScenarios"             # 隠蔽シナリオを非表示
        when 2 then "showAllScenarios"                # すべてのシナリオを表示
        when 3 then "showSuitableScenarios"           # 適応レベルのシナリオのみを表示
        else throw Error "Unknown inn summary setting type: #{i}"

    convertInnBackgroundSettingType: (i) ->
      switch i
        when 0 then 'noAnimation' # アニメーションなし
        when 1 then 'reedShape'   # 短冊式
        when 2 then 'colorShades' # 色変換式
        when 3 then 'replaceDots' # ドット置換式
        else throw Error "Unknown inn background setting type: #{i}"

  exports.Base = Base
  exports
