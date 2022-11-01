import { useEffect } from 'react'
import Login from './components/Login'
import Logout from './components/Logout'
import NotificationError from './components/NotificationError'
import NotificationSuccess from './components/NotificationSuccess'
import Allusers from './components/Allusers'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/usersReducer'
import { Routes, Route, useMatch, Link, Navigate } from 'react-router-dom'
import User from './components/User'
import Singleblog from './components/Singleblog'
import Bloglist from './components/Bloglist'
import Home from './components/Home'

const App = () => {
  const padding = {
    padding: 5,
  }

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const loggedInUser = useSelector((state) => state.loggedInUser)
  const users = useSelector((state) => state.allUsers)
  console.log('blogs length', blogs.length)

  const matchUser = useMatch('/users/:id')
  const user = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <NotificationError />
      <NotificationSuccess />
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/blogs">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {loggedInUser ? (
          <>
            <em>{loggedInUser.username} logged in</em> <Logout />{' '}
          </>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </div>

      <Routes>
        <Route path="/users/:id" element={<User userinfo={user} />} />
        <Route path="/blogs/:id" element={<Singleblog blog={blog} />} />
        <Route path="/blogs/" element={<Bloglist blogs={blogs} />} />
        <Route path="/users/" element={<Allusers />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/login/"
          element={loggedInUser ? <Navigate replace to="/" /> : <Login />}
        />
      </Routes>
    </div>
  )
}

export default App
