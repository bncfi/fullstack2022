import { useState } from 'react'

const Newblog = ({ createBlog }) => {
  const [newBlog, setNewblog] = useState({
    title: null,
    author: null,
    url: null,
  })

  const handleNewblog = async (event) => {
    event.preventDefault()
    createBlog(newBlog)
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleNewblog}>
        <div>
          title
          <input
            type="text"
            name="title"
            onChange={({ target }) =>
              setNewblog({ ...newBlog, title: target.value })
            }
          />
        </div>
        <div>
          author
          <input
            type="text"
            name="author"
            onChange={({ target }) =>
              setNewblog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="url"
            onChange={({ target }) =>
              setNewblog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default Newblog
