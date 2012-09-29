spec = require '../spec_helper'
{expect} = require 'chai'
fs = require 'fs'

{Area} = spec.require "area.coffee"
spec.registerSchema 'background'

describe 'BackgroundImage', ->
  describe '#parse', ->
    it 'should return the area data', ->
      buffer = fs.readFileSync 'test/fixture/scenario/goblin_cave/Area1.wid'
      area = new Area null, buffer
      areaData = area.parse()
      data = areaData.backgrounds[0]
      expect(spec.validateJSON data, 'background').to.be.true
