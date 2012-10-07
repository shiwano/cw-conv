spec = require '../spec_helper'
{expect} = require 'chai'

{Summary} = spec.require "summary.coffee"
spec.registerSchema 'summary', 'flag', 'steps'
buffer = spec.readFixtureFile 'Summary.wsm'

describe 'Summary', ->
  describe '#parse', ->
    it 'should set the version', ->
      summary = new Summary null, buffer
      summary.parse()
      expect(summary).to.have.property('version').and.equal 4

    it 'should return the summary data', ->
      summary = new Summary null, buffer
      data = summary.parse()
      expect(spec.validateJSON data, 'summary').to.be.true

describe 'Flag', ->
  describe '#parse', ->
    it 'should return the flag data', ->
      summary = new Summary null, buffer
      summaryData = summary.parse()
      data = summaryData.defnitions.flags[0]
      expect(spec.validateJSON data, 'flag').to.be.true

describe 'Steps', ->
  describe '#parse', ->
    it 'should return the steps data', ->
      summary = new Summary null, buffer
      summaryData = summary.parse()
      data = summaryData.defnitions.stepsList[0]
      expect(spec.validateJSON data, 'steps').to.be.true
