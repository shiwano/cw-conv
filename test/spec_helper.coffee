global.p = console.log

module.exports.require = (path) =>
  require "#{__dirname}/../src/#{path}"
