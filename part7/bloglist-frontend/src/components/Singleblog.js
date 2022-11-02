import { useDispatch } from 'react-redux'
import { updateBlogAction } from '../reducers/blogsReducer'
import { errorSetter } from '../reducers/errorReducer'
import Comments from './Comments'
import { Button, Title } from '../styles/Styles'

const Singleblog = ({ blog }) => {
  const dispatch = useDispatch()
  const updateBlog = async (id, updatedBlog) => {
    try {
      dispatch(updateBlogAction(id, updatedBlog))
    } catch (error) {
      dispatch(errorSetter({ message: error.messsage, time: 5 }))
    }
  }

  const handleLike = () => {
    const updatedBlog = {
      author: blog.author,
      title: blog.title,
      id: blog.id,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    updateBlog(blog.id, updatedBlog)
  }
  if (!blog) {
    return <></>
  }
  return (
    <div>
      <Title>
        {blog.title} by {blog.author}
      </Title>
      <div>{blog.url}</div>
      <div>Added by {blog.user.username}</div>
      <div>{blog.likes} likes</div>
      <div>
        <Button onClick={handleLike}>like</Button>
      </div>
      <Comments blog={blog} />
    </div>
  )
}

export default Singleblog
