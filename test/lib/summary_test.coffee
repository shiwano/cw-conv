helper = require '../test_helper'
{expect} = require 'chai'

{Summary} = helper.require "summary.coffee"
helper.registerSchema 'summary'
buffer = helper.readFixtureFile 'Summary.wsm'

describe 'Summary', ->
  describe '#parse', ->
    it 'should set the version', ->
      summary = new Summary null, buffer
      summary.parse()
      expect(summary).to.have.property('version').and.equal 4

    it 'should return the summary data', ->
      summary = new Summary null, buffer
      data = summary.parse()
      expect(helper.validateJSON data, 'summary').to.be.true

describe 'Flag', ->
  describe '#parse', ->
    it 'should return the flag data', ->
      summary = new Summary null, buffer
      summaryData = summary.parse()
      data = summaryData.defnitions.flags[0]
      expect(helper.validateJSON data, 'summary#flag').to.be.true

describe 'Steps', ->
  describe '#parse', ->
    it 'should return the steps data', ->
      summary = new Summary null, buffer
      summaryData = summary.parse()
      data = summaryData.defnitions.stepsList[0]
      expect(helper.validateJSON data, 'summary#steps').to.be.true
