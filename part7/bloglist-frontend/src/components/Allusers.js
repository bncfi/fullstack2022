import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/allusersReducer'
import { useEffect } from 'react'
import { TabledivLink } from '../styles/Styles'

const Allusers = () => {
  const users = useSelector((state) => state.allUsers)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])
  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <TabledivLink to={`/users/${user.id}`}>
                    {' '}
                    {user.username}{' '}
                  </TabledivLink>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Allusers
