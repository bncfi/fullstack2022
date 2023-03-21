import React from 'react';
import './App.css';
import { DiaryEntry, NewDiaryEntry, Weather, Visibility} from './types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Entries from './components/Entries';

function App() {

  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>();
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>();
  const [visibility, setVisibility] = useState<Visibility>();
  const [comment, setComment] = useState('');


  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd : NewDiaryEntry = {
      date: date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment: comment
    }
    setNewDiary(diaryToAdd);

  };

  useEffect(() => {
    axios.post('http://localhost:3001/api/diaries').then(response => {
      // response.body is of type any
      console.log(response.data)
      setDiaries(diaries.concat(response.data));
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDiary])

  useEffect(() => {
    axios.get('http://localhost:3001/api/diaries').then(response => {
      // response.body is of type any
      console.log(response.data)
      setDiaries(response.data as DiaryEntry[])
    })
  }, [])

  return (
    <div className="App">
        <form onSubmit={diaryCreation}>
        <div>date: <input value={date} onChange={(event) => setDate(event.target.value)} /></div>
        <div>weather: <input value={weather} onChange={(event) => setWeather(event.target.value as Weather)} /></div>
        <div>visibility: <input value={visibility} onChange={(event) => setVisibility(event.target.value as Visibility)} /></div>
        <div>comment: <input value={comment} onChange={(event) => setComment(event.target.value)} /></div>
        <div><button type='submit'>add</button></div>
      </form>
      <Entries diaries={diaries}/>
    </div>
  );
}

export default App;
