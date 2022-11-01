import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import Newblog from './Newblog'
import { useDispatch, useSelector } from 'react-redux'
import { successSetter } from '../reducers/successReducer'
import { createBlogAction } from '../reducers/blogsReducer'
import { errorSetter } from '../reducers/errorReducer'
import { useRef } from 'react'
import { Tablediv } from '../styles/Styles'

const Bloglist = ({ blogs }) => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.loggedInUser)
  const createBlog = async (newBlog) => {
    try {
      dispatch(createBlogAction(newBlog))
      dispatch(
        successSetter({
          message: `New blog ${newBlog.title} by ${newBlog.author} was added`,
          time: 5,
        })
      )
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      dispatch(errorSetter({ message: error.messsage, time: 5 }))
    }
  }
  return (
    <div>
      {loggedInUser === null ? (
        <></>
      ) : (
        <div>
          <Togglable
            buttonLabelToShow="create new blog"
            buttonLabelToHide="cancel"
            ref={blogFormRef}
          >
            <Newblog createBlog={createBlog} />
          </Togglable>
        </div>
      )}
      <div>Number of blogs: {blogs.length}</div>
      {blogs.map((blog) => (
        <Tablediv key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </Tablediv>
      ))}
    </div>
  )
}

export default Bloglist
