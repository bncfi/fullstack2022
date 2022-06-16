const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({}).populate('blogs')
    response.json(users)
  } catch (error) {
    response.status(400).json(error.message).end()
  }
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const users = await User.find({})

  if (users.find((user) => user.username === username) != undefined) {
    return response.status(400).json({ error: 'username exists already' }).end()
  }

  if (password === undefined) {
    return response.status(400).json({ error: 'no password given' }).end()
  }

  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: 'password too short, must be at least 3 in length' })
      .end()
  }

  const saltRounds = 10
  const passwordhash = await bcrypt.hash(password, saltRounds)

  const user = new User({ username, name, passwordhash })
  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    response.status(400).json(error.message).end()
  }
})

module.exports = usersRouter
