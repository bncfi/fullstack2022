import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.clickHandler}>
    {props.text}
  </button>
  )

const StatisticLine = (props) => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const Statistics = (props) => {
  const totalFeedback = props.good+props.bad+props.neutral
  const positiveFeeback = (props.good/totalFeedback)*100+"%"
  const avarageFeedback = (props.good-props.bad)/totalFeedback
  if(props.good+props.bad+props.neutral > 0) {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text={"Good"} value={props.good}/>
            <StatisticLine text={"Neutral"} value={props.neutral}/>
            <StatisticLine text={"Bad"} value={props.bad}/>
            <StatisticLine text={"All"} value={totalFeedback}/>
            <StatisticLine text={"Avarage"} value={avarageFeedback}/>
            <StatisticLine text={"Positive"} value={positiveFeeback}/>
          </tbody>
        </table>
      </div>
    )
  }else{
    return(
      <p>No feedback given</p>
    )
  }

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  /*statehookin (use)Statea ei saa muuttaa suoraan vaan sitä pitää muuttaa
  state modifierin kautta seuraavasti:
  */

  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)
  

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text={"good"} clickHandler={handleGood}/>
      <Button text={"neutral"} clickHandler={handleNeutral}/>
      <Button text={"bad"} clickHandler={handleBad}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
