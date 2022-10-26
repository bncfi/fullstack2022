import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/allusersReducer'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Allusers = () => {
  const users = useSelector((state) => state.allUsers)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeUsers())
    console.log('dispatch users: ', users)
  }, [dispatch])
  return (
    <div>
      <h1>Users</h1>
      <tbody>
        <tr>
          <td></td>
          <td>blogs created</td>
        </tr>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>
                {user.id}
                <Link to={`/users/${user.id}`}> {user.username} </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )
        })}
      </tbody>
    </div>
  )
}

export default Allusers
