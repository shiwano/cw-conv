spec = require '../spec_helper'
{expect} = require 'chai'
fs = require 'fs'

{Area} = spec.require "area.coffee"

describe 'Area', ->
  describe '#parse', ->
    it 'should return the area data', ->
      buffer = fs.readFileSync 'test/fixture/scenario/goblin_cave/Area1.wid'
      data = (new Area null, buffer).parse()
      expect(data).to.have.property('type').and.equal 'scene'
      expect(data).to.have.property('name').and.equal '冒険者の宿'
      expect(data).to.have.property('cardArrangement').and.equal 'auto'
      expect(data).to.have.property('events').and.have.length 1
      expect(data).to.have.property('menuCards').and.have.length 0
      expect(data).to.have.property('backgrounds').and.have.length 2

describe 'MenuCard', ->
  describe '#parse', ->
    it 'should return the menuCard data', ->
      buffer = fs.readFileSync 'test/fixture/scenario/goblin_cave/Area3.wid'
      areaData = (new Area null, buffer).parse()
      data = areaData.menuCards[0]
      expect(data).to.have.property('image').and.equal 'MENU＿移動↓.bmp'
      expect(data).to.have.property('name').and.equal '南へ'
      expect(data).to.have.property('description').and.equal ''
      expect(data).to.have.property('flag').and.equal ''
      expect(data).to.have.property('events').and.have.length 1
      expect(data).to.have.property('scale').and.equal 100
      expect(data).to.have.property('left').and.equal 173
      expect(data).to.have.property('top').and.equal 158
