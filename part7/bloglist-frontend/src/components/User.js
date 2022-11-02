import { Title } from '../styles/Styles'
import Bloglist from './Bloglist'

const User = ({ userinfo }) => {
  if (!userinfo) {
    return null
  }
  return (
    <div>
      <Title>{userinfo.username}</Title>
      <h4>Added blogs:</h4>
      <Bloglist blogs={[...userinfo.blogs].sort((a, b) => b.likes - a.likes)} />
    </div>
  )
}

export default User
