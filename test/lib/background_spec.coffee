spec = require '../spec_helper'
{expect} = require 'chai'
fs = require 'fs'

{Area} = spec.require "area.coffee"

describe 'BackgroundImage', ->
  describe '#parse', ->
    it 'should return the area data', ->
      buffer = fs.readFileSync 'test/fixture/scenario/goblin_cave/Area1.wid'
      area = new Area null, buffer
      areaData = area.parse()
      data = areaData.backgrounds[0]
      expect(data).to.have.property('top').and.equal 0
      expect(data).to.have.property('left').and.equal 0
      expect(data).to.have.property('width').and.equal 632
      expect(data).to.have.property('height').and.equal 420
      expect(data).to.have.property('image').and.equal 'MapOfWirth.bmp'
      expect(data).to.have.property('mask').and.be.false
      expect(data).to.have.property('flag').and.equal ''
