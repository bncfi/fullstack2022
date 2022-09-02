import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const newAnecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const update = async (id, anecdote) => {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
}

const anecdoteService = {
  getAll,
  create,
  update,
}

export default anecdoteService
