import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, updatedBlog) => {
  const response = await axios.put(baseUrl + '/' + id, updatedBlog)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(baseUrl + '/' + id, config)
  return response.data
}

const addComment = async (id, newComment) => {
  console.log('services ', newComment)
  const response = await axios.post(
    baseUrl + '/' + id + '/comments',
    newComment
  )
  return response.data
}

export default { setToken, getAll, create, update, deleteBlog, addComment }
