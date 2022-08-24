import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filterState = useSelector((state) => state.filter)

  const vote = uesCallback((id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted for '${content}'`))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  } , []);
  
  return anecdotes
        .filter(
          ({content = ''}) => content.toLowerCase()
                                     .includes(filterState.toLowerCase())
        ).map(({
            id = '',
            content = '',
            voites = ''
        }) => (
          <div key={id}>
            <div>{content}</div>
            <div>
              has {votes}
              <button onClick={() => vote(id, vote)}>vote</button>
            </div>
          </div>
        ));
}

export default AnecdoteList
