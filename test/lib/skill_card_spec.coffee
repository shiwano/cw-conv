spec = require '../spec_helper'
{expect} = require 'chai'
fs = require 'fs'

{SkillCard} = spec.require "skill_card.coffee"

describe 'SkillCard', ->
  describe '#parse', ->
    it 'should return the SkillCard data', ->
      buffer = fs.readFileSync 'test/fixture/scenario/ryune/Skill100.wid'
      skillCard = new SkillCard null, buffer
      data = skillCard.parse()
      expect(data).to.have.property('type').and.equal 'skillCard'
      expect(data).to.have.property('name').and.equal '居合斬り'
      expect(data).to.have.property('id').and.equal 100
      expect(data).to.have.property('description').and.match /正統派剣士向けの剣技。\n$/
      expect(data).to.have.deep.property('aptitude.physical').and.equal 'str'
      expect(data).to.have.deep.property('aptitude.mental').and.equal 'brave'
      expect(data).to.have.property('ignoreSilence').and.be.true
      expect(data).to.have.property('targetAll').and.be.false
      expect(data).to.have.property('target').and.equal 'selectedIgnoreSleep'
      expect(data).to.have.property('phenomenonType').and.equal 'magicalPhysical'
      expect(data).to.have.property('reactionType').and.equal 'evasion'
      expect(data).to.have.property('successRate').and.equal 2
      expect(data).to.have.property('animationType').and.equal 'lateralVibration'
      expect(data).to.have.property('animationType').and.equal 'lateralVibration'
      expect(data).to.have.property('effects').and.have.length 2
      expect(data).to.have.property('evasionBonus').and.equal 0
      expect(data).to.have.property('resistanceBonus').and.equal 0
      expect(data).to.have.property('defenseBonus').and.equal 0
      expect(data).to.have.property('soundBefore').and.equal '素振り（会心）.wav'
      expect(data).to.have.property('soundAfter').and.equal '効果（会心）.wav'
      expect(data).to.have.property('keycodes').and.have.length 2
      expect(data).to.have.property('keycodes').and.include '攻撃'
      expect(data).to.have.property('keycodes').and.include '魔法による攻撃'
      expect(data).to.have.property('rarity').and.include 'common'
      expect(data).to.have.property('scenario').and.include '交易都市リューン'
      expect(data).to.have.property('author').and.include '斎藤 洋'
      expect(data).to.have.property('events').and.have.length 1
      expect(data).to.have.property('reserved').and.equal false
      expect(data).to.have.property('level').and.equal 3
      expect(data).to.have.property('usageLimit').and.equal 0
