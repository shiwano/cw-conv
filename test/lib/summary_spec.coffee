spec = require '../spec_helper'
{expect} = require 'chai'
fs = require 'fs'

{Summary} = spec.require "summary.coffee"
buffer = fs.readFileSync 'test/fixture/Summary.wsm'

describe 'Summary', ->
  describe '#parse', ->
    it 'should set the version', ->
      summary = new Summary null, buffer
      summary.parse()
      expect(summary).to.have.property('version').and.equal 4

    it 'should return the summary data', ->
      summary = new Summary null, buffer
      data = summary.parse()
      expect(data).to.have.property('type').and.equal 'summary'
      expect(data).to.have.property('title').and.equal 'ゴブリンの洞窟'
      expect(data).to.have.property('description').and.match /とを決定した…$/
      expect(data).to.have.property('author').and.equal '齋藤 洋'
      expect(data).to.have.deep.property('prerequisite.achievements').and.include '総理大臣'
      expect(data).to.have.deep.property('prerequisite.achievementsNumber').and.equal 3
      expect(data).to.have.deep.property('startSceneId').and.equal 1
      expect(data).to.have.deep.property('recommendedLevel.min').and.equal 1
      expect(data).to.have.deep.property('recommendedLevel.max').and.equal 3

describe 'Flag', ->
  describe '#parse', ->
    it 'should return the flag data', ->
      summary = new Summary null, buffer
      summaryData = summary.parse()
      data = summaryData.defnitions.flags[0]
      expect(data).to.have.property('name').and.equal '敵に見つかった！'
      expect(data).to.have.property('default').and.be.false
      expect(data).to.have.property('valueNameOnTrue').and.equal 'ＴＲＵＥ'
      expect(data).to.have.property('valueNameOnFalse').and.equal 'ＦＡＬＳＥ'

describe 'Steps', ->
  describe '#parse', ->
    it 'should return the steps data', ->
      summary = new Summary null, buffer
      summaryData = summary.parse()
      data = summaryData.defnitions.stepsList[0]
      expect(data).to.have.property('name').and.equal '見張兵の気持ち'
      expect(data).to.have.property('default').and.equal 0
      expect(data).to.have.property('valueNames').and.include '平和だな'
