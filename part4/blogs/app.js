const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger.js')
const config = require('./utils/config.js')
const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
app.use('/api/blogs', blogsRouter)

module.exports = app
