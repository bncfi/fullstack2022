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
      passwordhash: passwordHash,
    })

    await user.save()
  })
  test('adding user succeeds and returns 201', async () => {
    const user = {
      username: 'kirmo',
      name: 'kirmo kinuski',
      password: 'salainen',
    }

    const usersAtStart = await api.get('/api/users')

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api.get('/api/users')

    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length + 1)
  })

  test('adding already existing username returns 400', async () => {
    const existingUser = {
      username: 'root',
      name: 'perus nortti',
      password: 'tosisalainen',
    }
    await api.post('/api/users').send(existingUser).expect(400)
  })

  test('adding user with too short password returns 400', async () => {
    const newUserTooShortPw = {
      username: 'Joku bloggaaja',
      name: 'Pirkko Hamalainen',
      password: 'jo',
    }

    await api.post('/api/users').send(newUserTooShortPw).expect(400)
  })

  test('adding user with no name returns 400', async () => {
    const userWithNoName = {
      name: 'Pirkko Kekkuli',
      password: 'juu',
    }

    await api.post('/api/users').send(userWithNoName).expect(400)
  })

  test('adding user with no passwordreturns 400', async () => {
    const userWithNoPassword = {
      username: 'pirre',
      name: 'Pirkko Kekkuli',
    }

    await api.post('/api/users').send(userWithNoPassword).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
