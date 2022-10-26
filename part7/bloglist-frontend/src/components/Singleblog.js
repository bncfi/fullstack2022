import { useDispatch } from 'react-redux'
import { updateBlogAction } from '../reducers/blogsReducer'
import { errorSetter } from '../reducers/errorReducer'

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
  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes}
        <button className="like-button" onClick={handleLike}>
          like
        </button>
      </div>
      <div>Added by {blog.user.username}</div>
    </div>
  )
}

export default Singleblog
