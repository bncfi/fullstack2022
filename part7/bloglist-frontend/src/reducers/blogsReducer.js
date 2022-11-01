import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    likeBlog(state, action) {
      return state.map((blog) => {
        if (blog.id === action.payload.id) {
          return { ...blog, likes: action.payload.likes }
        }
        return blog
      })
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    commentBlog(state, action) {
      console.log(action.payload)
      /*
      return state.map((blog) => {
        if (blog.id === action.payload.id) {
          return { ...blog, comments: action.payload.comments }
        }
        return blog
      })*/
    },
  },
})

export const { setBlogs, appendBlog, likeBlog, deleteBlog, commentBlog } =
  blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlogAction = (blog) => {
  return async (dispatch) => {
    const createdBlog = await blogsService.create(blog)
    dispatch(appendBlog(createdBlog))
  }
}

export const updateBlogAction = (id, updatedBlog) => {
  return async (dispatch) => {
    await blogsService.update(id, updatedBlog)
    dispatch(likeBlog(updatedBlog))
    console.log('action: ', updatedBlog)
  }
}

export const deleteBlogAction = (id) => {
  return async (dispatch) => {
    await blogsService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export const commentBlogAction = (id, newComment) => {
  console.log('toimiiko')
  return async (dispatch) => {
    const updatedBlog = await blogsService.addComment(id, newComment)
    dispatch(commentBlog(updatedBlog))
  }
}

export default blogsSlice.reducer
