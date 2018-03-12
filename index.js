#!/usr/bin/env node
global.require = require
process.env.NODE_PATH = process.env.NODE_PATH + ":" + require("path").join(__dirname, "bin")
require("module").Module._initPaths();
lumen = require("./bin/lumen.js")
module.exports = lumen
if (require.main === module)
  return lumen.main();
