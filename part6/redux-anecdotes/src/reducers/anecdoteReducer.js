import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      return state
        .map((anecdote) => {
          if (anecdote.id === action.payload) {
            return { ...anecdote, votes: anecdote.votes + 1 }
          }
          return anecdote
        })
        .sort((a, b) => b.votes - a.votes)
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { addAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(content)
    dispatch(addAnecdote(anecdote))
  }
}

export const updateAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.update(anecdote.id, anecdote)
    dispatch(voteAnecdote(anecdote.id))
  }
}

export default anecdoteSlice.reducer
