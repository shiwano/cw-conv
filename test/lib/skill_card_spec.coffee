spec = require '../spec_helper'
require 'should'
fs = require 'fs'

{SkillCard} = spec.require "skill_card.coffee"

describe 'SkillCard', ->
  describe '#parse', ->
    it 'should return the SkillCard data', ->
      buffer = fs.readFileSync 'test/fixture/scenario/ryune/Skill100.wid'
      s = new SkillCard null, buffer
      data = s.parse()
      p data
      data.type.should.equal 'skillCard'
      data.name.should.equal '居合斬り'
      data.id.should.equal 100
      data.description.should.match /正統派剣士向けの剣技。\n$/
      data.aptitude.physical.should.equal 'str'
      data.aptitude.mental.should.equal 'brave'
      data.ignoreSilence.should.equal true
      data.targetAll.should.equal false
      data.target.should.equal 'selectedIgnoreSleep'
      data.phenomenonType.should.equal 'magicalPhysical'
      data.reactionType.should.equal 'evasion'
      data.successRate.should.equal 2
      data.animationType.should.equal 'lateralVibration'
      data.effects.should.have.length 2
      data.evasionBonus.should.equal 0
      data.resistanceBonus.should.equal 0
      data.defenceBonus.should.equal 0
      data.soundBefore.should.equal '素振り（会心）.wav'
      data.soundAfter.should.equal '効果（会心）.wav'
      data.keycodes.should.have.length 2
      data.keycodes.should.include '攻撃'
      data.keycodes.should.include '魔法による攻撃'
      data.rarity.should.equal 'common'
      data.scenario.should.equal '交易都市リューン'
      data.author.should.equal '斎藤 洋'
      data.events.should.have.length 1
      data.reserved.should.equal false
      data.level.should.equal 3
      data.usageLimit.should.equal 0
