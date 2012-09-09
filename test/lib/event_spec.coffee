spec = require '../spec_helper'
should = require 'should'
fs = require 'fs'

{Area} = spec.require "area.coffee"

describe 'Event', ->
  describe '#parse', ->
    it 'should return the event data', ->
      buffer = fs.readFileSync 'test/fixture/scenario/goblin_cave/Area2.wid'
      a = new Area null, buffer
      data = a.parse()
      e = data.events[0]
      e.children.should.have.length 1
      e.triggers.ids.should.have.length 1
      e.triggers.ids[0].should.equal 1

      e = data.menuCards[0].events[1]
      e.triggers.keycodes.should.have.length 2
      e.triggers.keycodes[0].should.equal '遠距離攻撃'
      e.triggers.keycodes[1].should.equal '暗殺'
