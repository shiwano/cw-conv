spec = require '../spec_helper'
should = require 'should'
fs = require 'fs'

{Area} = spec.require "area.coffee"

describe 'Area', ->
  describe '#parse', ->
    it 'should return the area data', ->
      buffer = fs.readFileSync 'test/fixture/scenario/goblin_cave/Area1.wid'
      data = (new Area null, buffer).parse()
      data.type.should.equal 'scene'
      data.name.should.equal '冒険者の宿'
      data.cardArrangement.should.equal 'auto'
      data.events.should.have.length 1
      data.menuCards.should.have.length 0
      data.backgrounds.should.have.length 2

describe 'MenuCard', ->
  describe '#parse', ->
    it 'should return the menuCard data', ->
      buffer = fs.readFileSync 'test/fixture/scenario/goblin_cave/Area3.wid'
      data = (new Area null, buffer).parse()
      m = data.menuCards[0]
      m.image.should.equal 'MENU＿移動↓.bmp'
      m.name.should.equal '南へ'
      m.description.should.equal ''
      m.flag.should.equal ''
      m.events.should.have.length 1
      m.scale.should.equal 100
      m.left.should.equal 173
      m.top.should.equal 158
