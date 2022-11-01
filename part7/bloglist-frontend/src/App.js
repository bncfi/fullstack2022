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
import { Routes, Route, useMatch, Navigate } from 'react-router-dom'
import User from './components/User'
import Singleblog from './components/Singleblog'
import Bloglist from './components/Bloglist'
import Home from './components/Home'
import { Navbar, NavbarLink } from './styles/Styles'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const loggedInUser = useSelector((state) => state.loggedInUser)
  const users = useSelector((state) => state.allUsers)

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
      <Navbar>
        <NavbarLink to="/">home</NavbarLink>
        <NavbarLink to="/blogs">blogs</NavbarLink>
        <NavbarLink to="/users">users</NavbarLink>
        {loggedInUser ? (
          <>
            <em>{loggedInUser.username} logged in</em> <Logout />{' '}
          </>
        ) : (
          <NavbarLink to="/login">login</NavbarLink>
        )}
      </Navbar>

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
