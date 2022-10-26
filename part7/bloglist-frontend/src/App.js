import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import Newblog from './components/Newblog'
import Togglable from './components/Togglable'
import NotificationError from './components/NotificationError'
import NotificationSuccess from './components/NotificationSuccess'
import Allusers from './components/Allusers'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { successSetter } from './reducers/successReducer'
import { errorSetter } from './reducers/errorReducer'
import {
  initializeBlogs,
  createBlogAction,
  updateBlogAction,
  deleteBlogAction,
} from './reducers/blogsReducer'
import { setUser } from './reducers/usersReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import User from './components/User'

const App = () => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const blogFormRef = useRef()

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.allUsers)

  console.log(users)

  const match = useMatch('/users/:id')
  const user = match
    ? users.find((user) => user.id === Number(match.params.id))
    : null

  console.log('appis', user)
  useEffect(() => {
    dispatch(initializeBlogs())
    console.log('dispatch: ', blogs)
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    console.log('logging in with', username)
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(errorSetter({ message: 'Wrong username or password', time: 5 }))
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  const createBlog = async (newBlog) => {
    try {
      dispatch(createBlogAction(newBlog))
      dispatch(
        successSetter({
          message: `New blog ${newBlog.title} by ${newBlog.author} was added`,
          time: 5,
        })
      )
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      dispatch(errorSetter({ message: error.messsage, time: 5 }))
    }
  }

  const updateBlog = async (id, updatedBlog) => {
    try {
      dispatch(updateBlogAction(id, updatedBlog))
    } catch (error) {
      dispatch(errorSetter({ message: error.messsage, time: 5 }))
    }
  }

  const deleteBlog = async (id) => {
    try {
      dispatch(deleteBlogAction(id))
    } catch (error) {
      dispatch(errorSetter({ message: error.messsage, time: 5 }))
    }

    /*
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((filteredBlog) => (
              <Blog
                key={filteredBlog.id}
                blog={filteredBlog}
                user={users}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
              />
            ))}
  */
  }
  return (
    <div>
      <NotificationError />
      <NotificationSuccess />

      {users === null ? (
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <p>Logged in as {users.username}</p>
          <Logout handleLogout={handleLogout} />
          <Togglable
            buttonLabelToShow="create new blog"
            buttonLabelToHide="cancel"
            ref={blogFormRef}
          >
            <Newblog createBlog={createBlog} />
          </Togglable>
          <h2>blogs</h2>

          <Allusers />
        </div>
      )}
      <Routes>
        <Route path="/users/:id" element={<User userinfo={user} />} />
      </Routes>
    </div>
  )
}

export default App
