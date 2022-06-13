const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((error) => {
      response.status(400).end()
    })
})

/*
blogsRouter.delete('/:id', (request, response) => {
  
  Blog.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => {
      response.status(404).end()
    })
})
*/

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    response.status(400).end()
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
  } catch (exception) {
    response.status(400).end()
  }
})

module.exports = blogsRouter
