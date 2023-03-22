import React from 'react'
import './App.css'
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Entries from './components/Entries'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Good,
    comment: '',
  })

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    axios
      .post('http://localhost:3001/api/diaries', newDiary)
      .then((response) => {
        console.log(response.data)
        setDiaries(diaries.concat(response.data));
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    let value: string | Weather | Visibility = event.target.value
    if (name === 'weather') {
      value = value as Weather 
    } else if (name === 'visibility') {
      value = value as Visibility 
    }
    setNewDiary({
      ...newDiary,
      [name]: value,
    })
  }

  useEffect(() => {
    axios.get('http://localhost:3001/api/diaries').then((response) => {
      // response.body is of type any
      console.log(response.data)
      setDiaries(response.data as DiaryEntry[])
    })
  }, [newDiary])


  return (
    <div className="App">
      <form onSubmit={diaryCreation}>
        <div>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={newDiary.date}
            onChange={handleChange}
          />
        </label>
        </div>
        <div>
        <label>
          Weather:
          <label>
            <input
              type="radio"
              name="weather"
              value={Weather.Sunny}
              checked={newDiary.weather === Weather.Sunny}
              onChange={handleChange}
            />
            Sunny
          </label>
          
          <label>
            <input
              type="radio"
              name="weather"
              value={Weather.Rainy}
              checked={newDiary.weather === Weather.Rainy}
              onChange={handleChange}
            />
            Rainy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value={Weather.Cloudy}
              checked={newDiary.weather === Weather.Cloudy}
              onChange={handleChange}
            />
            Cloudy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value={Weather.Stormy}
              checked={newDiary.weather === Weather.Stormy}
              onChange={handleChange}
            />
            Stormy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value={Weather.Windy}
              checked={newDiary.weather === Weather.Windy}
              onChange={handleChange}
            />
            Windy
          </label>
        </label>
        </div>
        <div>
        <label>
          Visibility:
          <label>
            <input
              type="radio"
              name="visibility"
              value={Visibility.Great}
              checked={newDiary.visibility === Visibility.Great}
              onChange={handleChange}
            />
            Great
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value={Visibility.Good}
              checked={newDiary.visibility === Visibility.Good}
              onChange={handleChange}
            />
            Good
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value={Visibility.Ok}
              checked={newDiary.visibility === Visibility.Ok}
              onChange={handleChange}
            />
            OK
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value={Visibility.Poor}
              checked={newDiary.visibility === Visibility.Poor}
              onChange={handleChange}
            />
            POOR
          </label>
        </label>
        </div>
        <label>
          Comment:
          <input
            type="text"
            name="comment"
            value={newDiary.comment}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add Entry</button>
      </form>
      <Entries diaries={diaries} />
    </div>
  )
}

export default App
