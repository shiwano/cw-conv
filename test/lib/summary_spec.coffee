spec = require '../spec_helper'
require 'should'
fs = require 'fs'

{Summary} = spec.require "summary.coffee"
{Reader} = spec.require "reader.coffee"

describe 'summary', ->
  describe 'Summary', ->
    describe 'parse', ->
      it 'should return the Summary data', ->
        buffer = fs.readFileSync 'test/fixture/Summary.wsm'
        reader = new Reader buffer
        s = new Summary(reader)
        data = s.parse()
        s.type.should.equal -1
        s.version.should.equal 4
        data.title.should.equal 'ゴブリンの洞窟'
        data.description.should.match /とを決定した…$/
        data.author.should.equal '齋藤 洋'
        data.prerequisite.coupons.should.include '総理大臣'
        data.prerequisite.couponsNumber.should.equal 3
        data.startSceneId.should.equal 1
        steps = data.defnitions.stepsList[0]
        steps.name.should.equal '見張兵の気持ち'
        steps.default.should.equal 0
        steps.valueNames.should.include '平和だな'
        flag = data.defnitions.flags[0]
        flag.name.should.equal '敵に見つかった！'
        flag.default.should.be.false
        flag.valueNameOnTrue.should.equal 'ＴＲＵＥ'
        flag.valueNameOnFalse.should.equal 'ＦＡＬＳＥ'
        data.recommendedLevel.min.should.equal 1
        data.recommendedLevel.max.should.equal 3
