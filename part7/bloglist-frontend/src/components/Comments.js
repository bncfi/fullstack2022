import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlogAction } from '../reducers/blogsReducer'

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const handleComment = async (event) => {
    try {
      event.preventDefault()
      dispatch(commentBlogAction(blog.id, comment))
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div>
        <br />
        <form onSubmit={handleComment}>
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <button id="submit-button" type="submit">
            add comment
          </button>
        </form>
      </div>

      <h2>Comments</h2>
      <ul>
        {blog.comments.map((comment, index) => {
          return <li key={index}> {comment}</li>
        })}
      </ul>
    </div>
  )
}

export default Comments
