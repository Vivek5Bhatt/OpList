"use strict"

const app = require("./")
const serverless = require("serverless-http")

module.exports.hello = serverless(app)
