import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [showAll, setShowAll] = useState(false)

  const toggleShow = () => {
    setShowAll(!showAll)
  }

  const showWhenTrue = { display: showAll ? '' : 'none' }
  const hideWhenTrue = { display: showAll ? 'none' : '' }

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
    console.log(blog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button style={hideWhenTrue} onClick={toggleShow}>
          show
        </button>
        <button style={showWhenTrue} onClick={toggleShow}>
          hide
        </button>
      </div>
      <div style={showWhenTrue}>{blog.author}</div>
      <div style={showWhenTrue}>{blog.url}</div>
      <div style={showWhenTrue}>
        {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>
      <div style={showWhenTrue}>{blog.user.name}</div>
    </div>
  )
}

export default Blog
