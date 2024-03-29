import { useState } from 'react'
import { Button, Forminput } from '../styles/Styles'

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
        <table>
          <tbody>
            <tr>
              <td>Title</td>
              <td>
                <Forminput
                  type="text"
                  name="title"
                  id="title"
                  placeholder="title"
                  onChange={({ target }) =>
                    setNewblog({ ...newBlog, title: target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>Author</td>
              <td>
                <Forminput
                  type="text"
                  name="author"
                  id="author"
                  placeholder="author"
                  onChange={({ target }) =>
                    setNewblog({ ...newBlog, author: target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>Url</td>
              <td>
                <Forminput
                  type="text"
                  name="url"
                  id="url"
                  placeholder="url"
                  onChange={({ target }) =>
                    setNewblog({ ...newBlog, url: target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <Button id="submit-button" type="submit">
                  save
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default Newblog
