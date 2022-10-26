const User = ({ userinfo }) => {
  console.log(userinfo)
  return (
    <div>
      {userinfo.blogs.map((blog) => {
        return <div key={blog.id}>{blog.title}</div>
      })}
    </div>
  )
}

export default User
