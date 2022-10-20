/*const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')*/
const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const logger = require('./utils/logger.js')
const config = require('./utils/config.js')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
