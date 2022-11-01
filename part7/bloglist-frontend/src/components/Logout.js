import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/usersReducer'
import { Button } from '../styles/Styles'

const Logout = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }
  return (
    <>
      <Button onClick={handleLogout}>Log out</Button>
    </>
  )
}

export default Logout
