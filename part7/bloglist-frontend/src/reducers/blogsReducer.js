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
  },
})

export const { setBlogs, appendBlog, likeBlog, deleteBlog } = blogsSlice.actions

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
  }
}

export const deleteBlogAction = (id) => {
  return async (dispatch) => {
    await blogsService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export default blogsSlice.reducer
