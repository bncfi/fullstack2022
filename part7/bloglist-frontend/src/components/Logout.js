import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/usersReducer'

const Logout = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }
  return (
    <>
      <button onClick={handleLogout}>Log out</button>
    </>
  )
}

export default Logout
