import Bloglist from './Bloglist'

const User = ({ userinfo }) => {
  if (!userinfo) {
    return null
  }
  console.log('blogs for user', userinfo.username, ' ', userinfo.blogs.length)
  return (
    <div>
      <h2>{userinfo.username}</h2>
      <h4>added blogs:</h4>
      <Bloglist blogs={[...userinfo.blogs].sort((a, b) => b.likes - a.likes)} />
    </div>
  )
}

export default User
