import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import Newblog from './components/Newblog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [newBlog, setNewblog] = useState({
    title: null,
    author: null,
    url: null,
  })

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    console.log('logging in with', username)
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleNewblog = async (event) => {
    event.preventDefault()

    try {
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      setNewblog({
        title: null,
        author: null,
        url: null,
      })
      console.log(response)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <Notification message={errorMessage} />

      {user === null ? (
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <p>Logged in as {user.name}</p>
          <Logout handleLogout={handleLogout} />
          <Newblog
            handleNewblog={handleNewblog}
            newBlog={newBlog}
            setNewblog={setNewblog}
          />
          <h2>blogs</h2>
          {blogs.map((blog) => {
            if (blog.user.username === user.username) {
              return <Blog key={blog.id} blog={blog} />
            }
          })}
        </div>
      )}
    </div>
  )
}

export default App
