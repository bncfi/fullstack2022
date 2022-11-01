const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.status(200).json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'tittle or url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: request.user.id,
  })

  const savedBlog = await blog.save()
  request.user.blogs = request.user.blogs.concat(savedBlog.id)
  await request.user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(400).json({ error: 'blog does not exist' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (blog.user.toString() != request.user.id) {
    return response.status(401).json({ error: 'wrong user' })
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedData = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedData,
    { new: true }
  )
  response.json(updatedBlog).status(200).end()
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const updatedComments = request.body
  console.log('blogsRouter ', updatedComments)
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { $push: { comments: updatedComments.comment } },
    { new: true }
  )
  response.json(updatedBlog).status(200).end()
})

module.exports = blogsRouter
