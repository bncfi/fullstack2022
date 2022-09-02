import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { notificationSetter } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filterState = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(updateAnecdote(anecdote))
    dispatch(
      notificationSetter({
        message: `You voted for '${anecdote.content}'`,
        time: 5,
      })
    )
  }

  return (
    <div>
      {anecdotes
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filterState.toLowerCase())
        )
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
