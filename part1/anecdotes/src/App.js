import { useState } from 'react'


const Button = (props) => <button onClick={props.clickHandler}>{props.text}</button>

const Mostvoted = (props) => {

  const getSum = (total,value) => total+value
  const getMax = (a,b) => Math.max(a,b)
 

  const votesSum = props.votes.reduce(getSum,0)
  if(votesSum) {
    const mostVotes =  props.votes.reduce(getMax,-Infinity)
    const mostVotesIndex = props.votes.findIndex((elem) => elem === mostVotes)
    return(
      <div>
        <p>{props.anecdotes[mostVotesIndex]}</p>
        <p>Has {props.votes[mostVotesIndex]} votes</p>
        <p>In total {votesSum} votes casted.</p>
      </div>
    )
  }else {
    return(
    <p>No votes casted</p>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))


  const selectRandom = () => setSelected(Math.floor(Math.random()*anecdotes.length))

  const castVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <Button text="Next anecdote" clickHandler={selectRandom}/>
      <Button text="Vote" clickHandler={castVote}/>
      <h1>Anecdote with most votes</h1>
      <Mostvoted votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App
