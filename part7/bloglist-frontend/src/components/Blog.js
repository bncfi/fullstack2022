import { useState } from 'react'

const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
  const [showAll, setShowAll] = useState(false)

  console.log('bloggis ', user.username)

  const toggleShow = () => {
    setShowAll(!showAll)
  }
  const showWhenTrue = { display: showAll ? '' : 'none' }
  const hideWhenTrue = { display: showAll ? 'none' : '' }
  console.log(user.username)
  console.log(blog)

  const whenLogged = {
    display: blog.user.username === user.username ? '' : 'none',
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = () => {
    const updatedBlog = {
      author: blog.author,
      title: blog.title,
      id: blog.id,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    updateBlog(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    deleteBlog(blog.id)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>{blog.title}</div>
      <div>{blog.author}</div>
      <div>
        <button style={hideWhenTrue} onClick={toggleShow}>
          show
        </button>
        <button style={showWhenTrue} onClick={toggleShow}>
          hide
        </button>
      </div>

      <div style={showWhenTrue}>{blog.url}</div>
      <div style={showWhenTrue}>
        {blog.likes}
        <button className="like-button" onClick={handleLike}>
          like
        </button>
      </div>
      <div style={showWhenTrue}>{blog.user.name}</div>
      <div style={showWhenTrue}>
        <button style={whenLogged} onClick={handleDelete}>
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
