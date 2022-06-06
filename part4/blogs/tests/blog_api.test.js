const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Eka',
    author: 'Aleksis Kivi',
    url: 'buu',
    likes: 3,
  },
  {
    title: 'Toka postaus',
    author: 'Iso H',
    url: 'jee',
    likes: 0,
  },
  {
    title: 'Kolmas postaus',
    author: 'Tommy Tabermann',
    url: 'runoja',
    likes: 1,
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

/*
  const request = api
    .get('/api/blogs')
    .then((response) => expect(response.body).toHaveLength(initialBlogs.length))
    .catch((error) => console.log(error))
  return request
  */

test('three blogs are returned as json', async () => {
  const response = await api.get('api/blogs')
  response.expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
