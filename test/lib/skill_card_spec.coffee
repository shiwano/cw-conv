spec = require '../spec_helper'
{expect} = require 'chai'

{SkillCard} = spec.require "skill_card.coffee"
spec.registerSchemas ['skill_card', 'simple_event', 'core']

describe 'SkillCard', ->
  describe '#parse', ->
    it 'should return the SkillCard data', ->
      buffer = spec.readFixtureFile 'scenario/ryune/Skill100.wid'
      skillCard = new SkillCard null, buffer
      data = skillCard.parse()
      expect(spec.validateJSON data, 'skill_card').to.be.true
