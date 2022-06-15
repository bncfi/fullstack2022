const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

describe('adding user to database', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      name: 'mestari koodaaja',
      passwordHash,
    })

    await user.save()
  })
  test('adding user succeeds and returns 201', async () => {
    const user = new User({
      username: 'kirmo',
      name: 'kirmo kinuski',
      password: 'salainen',
    })

    const usersAtStart = await api.get('/api/users').body

    const savedUser = await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api.get('/api/users').body
    console.log(usersAtEnd, usersAtStart)
    expect(usersAtEnd).toHaveLenth(usersAtStart.length + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
