import React from 'react'
import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/usersReducer'
import { errorSetter } from '../reducers/errorReducer'

const Login = () => {
  /*
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
  */

  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const dispatch = useDispatch()

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

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="username"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default Login
