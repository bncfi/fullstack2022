const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({})
    response.json(users)
  } catch (exception) {
    response.status(400).end()
  }
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ username, name, passwordHash })
  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (exception) {
    response.status(400).end()
  }
})

module.exports = usersRouter
