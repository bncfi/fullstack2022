const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    response.status(400).json({ error: 'tittle or url missing' })
  }

  const user = await User.findOne()
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
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

module.exports = blogsRouter
