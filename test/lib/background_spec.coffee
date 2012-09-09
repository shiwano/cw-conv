spec = require '../spec_helper'
should = require 'should'
fs = require 'fs'

{Area} = spec.require "area.coffee"

describe 'BackgroundImage', ->
  describe '#parse', ->
    it 'should return the area data', ->
      buffer = fs.readFileSync 'test/fixture/scenario/goblin_cave/Area1.wid'
      a = new Area null, buffer
      data = a.parse()
      b = data.backgrounds[0]
      b.top.should.equal 0
      b.left.should.equal 0
      b.width.should.equal 632
      b.height.should.equal 420
      b.image.should.equal 'MapOfWirth.bmp'
      b.mask.should.equal false
      b.flag.should.equal ''
