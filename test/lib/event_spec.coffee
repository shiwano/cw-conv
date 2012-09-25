spec = require '../spec_helper'
{expect} = require 'chai'
fs = require 'fs'

{Area} = spec.require "area.coffee"

describe 'Event', ->
  describe '#parse', ->
    it 'should return the event data', ->
      buffer = fs.readFileSync 'test/fixture/scenario/goblin_cave/Area2.wid'
      area = new Area null, buffer
      areaData = area.parse()
      data = areaData.events[0]
      expect(data).to.have.property('children').and.have.length 1
      expect(data).to.have.deep.property('triggers.ids').and.have.length 1
      expect(data).to.have.deep.property('triggers.ids').and.include 1

      data = areaData.menuCards[0].events[1]
      expect(data).to.have.deep.property('triggers.keycodes').and.have.length 2
      expect(data).to.have.deep.property('triggers.keycodes').and.include '遠距離攻撃'
      expect(data).to.have.deep.property('triggers.keycodes').and.include '暗殺'
