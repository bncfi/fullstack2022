const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blogs) => sum + blogs.likes, 0)
}

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((current, blogs) => {
    return Math.max(current, blogs.likes)
  }, -Infinity)
  const blogMostLiked = blogs.find((blog) => blog.likes === mostLikes)
  return {
    title: blogMostLiked.title,
    author: blogMostLiked.author,
    likes: blogMostLiked.likes,
  }
}

const mostBlogs = (blogs) => {
  const authors = _.chain(blogs)
    .groupBy((blog) => blog.author)
    .keys()
    .value()

  const authorsWithBlogs = authors.map((author) => {
    return {
      author: author,
      blogs: blogs.filter((blog) => blog.author === author).length,
    }
  })

  return _.maxBy(authorsWithBlogs, (authorsWithBlogs) => authorsWithBlogs.blogs)
}

const mostLikes = (blogs) => {
  const authors = _.chain(blogs)
    .groupBy((blog) => blog.author)
    .keys()
    .value()

  const authorsWithLikes = authors.map((author) => {
    return {
      author: author,
      likes: blogs
        .filter((blog) => blog.author === author)
        .reduce((sum, blog) => {
          return sum + blog.likes
        }, 0),
    }
  })
  return _.maxBy(authorsWithLikes, (authorsWithLikes) => authorsWithLikes.likes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
