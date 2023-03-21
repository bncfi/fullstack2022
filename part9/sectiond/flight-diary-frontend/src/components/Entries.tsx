import { DiaryEntry } from '../types'

const Entries = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <>
    <h1>Diary entries</h1>
      {diaries.map((entry) => {
        return (
          <div>
            <div>
              <b>{entry.date}</b>
            </div>
            <div>visibility: {entry.visibility}</div>
            <div>weather: {entry.weather}</div>
          </div>
        )
      })}
    </>
  )
}

export default Entries
