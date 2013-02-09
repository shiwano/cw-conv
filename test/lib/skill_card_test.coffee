helper = require '../test_helper'
{expect} = require 'chai'

{SkillCard} = helper.require "skill_card.coffee"
helper.registerSchema 'skill_card'

describe 'SkillCard', ->
  describe '#parse', ->
    it 'should return the SkillCard data', ->
      buffer = helper.readFixtureFile 'scenario/ryune/Skill100.wid'
      skillCard = new SkillCard null, buffer
      data = skillCard.parse()
      expect(helper.validateJSON data, 'skill_card').to.be.true
