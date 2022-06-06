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

test('three blogs are returned as json', () => {
  const request = api
    .get('/api/blogs')
    .then((response) => expect(response.body).toHaveLength(initialBlogs.length))
    .catch((error) => console.log(error))
  return request
})

afterAll(() => {
  mongoose.connection.close()
})
