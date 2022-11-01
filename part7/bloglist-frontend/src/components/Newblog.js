import { useState } from 'react'
import { Button } from '../styles/Styles'

const Newblog = ({ createBlog }) => {
  const [newBlog, setNewblog] = useState({
    title: null,
    author: null,
    url: null,
  })

  const handleNewblog = async (event) => {
    event.preventDefault()
    createBlog(newBlog)
    event.target.reset()
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
            id="title"
            placeholder="title"
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
            id="author"
            placeholder="author"
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
            id="url"
            placeholder="url"
            onChange={({ target }) =>
              setNewblog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <Button id="submit-button" type="submit">
          save
        </Button>
      </form>
    </div>
  )
}

export default Newblog
