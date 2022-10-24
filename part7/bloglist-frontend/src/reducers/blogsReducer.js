import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  state: [],
  reducers: {
    setBlogs(state, action) {
      state = action.payload
      return state
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setBlogs, appendBlog } = blogsSlice.actions

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

export default blogsSlice.reducer
