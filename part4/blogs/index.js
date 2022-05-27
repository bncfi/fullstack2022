const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger.js')
const config = require('./utils/config.js')
const blogsRouter = require('./controllers/blogs')

app.use('/api/blogs', blogsRouter)

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
