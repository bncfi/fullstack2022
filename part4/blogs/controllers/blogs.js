const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })
    response.status(200).json(blogs)
  } catch (error) {
    response.status(404).json(error.message).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  try {
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
  } catch (error) {
    response.status(400).json(error.message).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    response.status(400).json(error.message).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedData = request.body
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedData,
      { new: true }
    )
    response.json(updatedBlog).status(200).end()
  } catch (error) {
    response.status(400).json(error.message).end()
  }
})

module.exports = blogsRouter
