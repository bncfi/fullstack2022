import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import Newblog from './components/Newblog'
import Togglable from './components/Togglable'
import NotificationError from './components/NotificationError'
import NotificationSuccess from './components/NotificationSuccess'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

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
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
      setSuccessMessage(
        `New blog ${response.title} by ${response.author} was added`
      )
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log(error.message)
    }
  }

  const updateBlog = async (id, updatedBlog) => {
    try {
      await blogService.update(id, updatedBlog)
      //setBlogs(blogs.map((blog) => (blog.id !== id ? blog : response)))
      setBlogs(
        blogs.map((blog) =>
          blog.id !== id ? blog : { ...blog, likes: blog.likes + 1 }
        )
      )
      //const newBlogs = await blogService.getAll()
      //setBlogs(newBlogs)
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log(error.message)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log(error.message)
    }
  }

  return (
    <div>
      <NotificationError message={errorMessage} />
      <NotificationSuccess message={successMessage} />

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
          <Togglable
            buttonLabelToShow="create new blog"
            buttonLabelToHide="cancel"
            ref={blogFormRef}
          >
            <Newblog createBlog={createBlog} />
          </Togglable>
          <h2>blogs</h2>

          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((filteredBlog) => (
              <Blog
                key={filteredBlog.id}
                blog={filteredBlog}
                updateBlog={updateBlog}
                user={user}
                deleteBlog={deleteBlog}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
