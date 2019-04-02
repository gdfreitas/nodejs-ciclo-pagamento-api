const bodyParser = require('body-parser')
const express = require('express')
const queryParser = require('express-query-int')

const cors = require('./cors')

const Server = express()

Server.use(bodyParser.urlencoded({ extended: true }))
Server.use(bodyParser.json())
Server.use(cors)
Server.use(queryParser())

module.exports = Server