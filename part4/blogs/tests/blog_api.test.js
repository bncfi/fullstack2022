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

describe('api get', () => {
  test('three blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('returned ids are correct', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('addition of a blog', () => {
  test('new blog can be added', async () => {
    const newBlog = {
      title: 'testi tokenin kanssa',
      author: 'Mestari Kirjailija',
      url: 'dfas',
      likes: 7,
    }

    const userRoot = { username: 'root', password: 'sekret' }
    const userRootLogin = await api.post('/api/login').send(userRoot)

    await api
      .post('/api/blogs')
      .set('authorization', 'bearer ' + userRootLogin.body.token)
      .send(newBlog)

    const getResponse = await api.get('/api/blogs')

    expect(getResponse.body).toHaveLength(initialBlogs.length + 1)
    expect(getResponse.body.map((blog) => blog.title)).toContain(
      'testi tokenin kanssa'
    )
  })

  test('new blog without likes default to zero', async () => {
    const newBlog = {
      title: 'Neljas Liketon',
      author: 'Mika Waltari',
      url: 'eee',
    }
    const userRoot = { username: 'root', password: 'sekret' }
    const userRootLogin = await api.post('/api/login').send(userRoot)

    const postResponse = await api
      .post('/api/blogs')
      .set('authorization', 'bearer ' + userRootLogin.body.token)
      .send(newBlog)
    expect(postResponse.body.likes).toBe(0)
  })

  test('new blog without title or url returns 400', async () => {
    const newBlogWithoutTitle = {
      author: 'Mika Waltari',
      url: 'eee',
    }
    const newBlogWithoutUrl = {
      title: 'Neljas Liketon',
      author: 'Mika Waltari',
    }

    const userRoot = { username: 'root', password: 'sekret' }
    const userRootLogin = await api.post('/api/login').send(userRoot)

    await api
      .post('/api/blogs')
      .set('authorization', 'bearer ' + userRootLogin.body.token)
      .send(newBlogWithoutTitle)
      .expect(400)
    await api
      .post('/api/blogs')
      .set('authorization', 'bearer ' + userRootLogin.body.token)
      .send(newBlogWithoutUrl)
      .expect(400)
  })
  test('new blog without token returns 401', async () => {
    const newBlog = {
      title: 'testi ilman token',
      author: 'Mestari Kirjailija',
      url: 'dfas',
      likes: 7,
    }

    await api
      .post('/api/blogs')
      .set('authorization', 'bearer ')
      .send(newBlog)
      .expect(401)
  })
})

describe('deletion of a blog', () => {
  test('deletion of a single blog returns 204', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    //const blogToDelete = blogsAtStart.body[0]

    const newBlog = {
      title: 'testi tokenin kanssa',
      author: 'Mestari Kirjailija',
      url: 'dfas',
      likes: 7,
    }

    const userRoot = { username: 'root', password: 'sekret' }
    const userRootLogin = await api.post('/api/login').send(userRoot)

    const postResponse = await api
      .post('/api/blogs')
      .set('authorization', 'bearer ' + userRootLogin.body.token)
      .send(newBlog)

    const blogToDelete = postResponse.body

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', 'bearer ' + userRootLogin.body.token)
      .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length)
  })

  test('deletion of a wrong id returns 400', async () => {
    const newBlog = {
      title: 'testi tokenin kanssa',
      author: 'Mestari Kirjailija',
      url: 'dfas',
      likes: 7,
    }

    const userRoot = { username: 'root', password: 'sekret' }
    const userRootLogin = await api.post('/api/login').send(userRoot)

    const postResponse = await api
      .post('/api/blogs')
      .set('authorization', 'bearer ' + userRootLogin.body.token)
      .send(newBlog)

    const blogToDelete = postResponse.body

    await api
      .delete('/api/blogs/300')
      .set('authorization', 'bearer ' + userRootLogin.body.token)
      .expect(400)
  })

  test('deletion without authorization returns 401', async () => {
    await api
      .delete('/api/blogs/300')
      .set('authorization', 'bearer ')
      .expect(401)
  })
})

describe('update of a blog', () => {
  test('update of likes returns 200 and likes are correct', async () => {
    const blogs = await api.get('/api/blogs')
    const blogToUpdate = blogs.body[0]
    const updatedLikes = { likes: blogToUpdate.likes + 1 }

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedLikes)
      .expect(200)
    expect(updatedBlog.body.likes).toBe(updatedLikes.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
