const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  })
  response.json(users)
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
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
