import { ALL_BOOKS } from '../queries/queries'
import { useQuery } from '@apollo/client'
import { useState } from 'react'

const Books = (props) => {
  const booksQuery = useQuery(ALL_BOOKS)
  const [selectedGenre, setGenre] = useState('all genres')

  if (booksQuery.loading) {
    return null
  }

  if (!props.show) {
    return null
  }

  const books = booksQuery.data.allBooks
  const genres = booksQuery.data.allBooks.map((book) => book.genres)

  const uniqueGenres = [...new Set(genres.flat())]
  uniqueGenres.push('all genres')

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre <b>{selectedGenre}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => {
              if (selectedGenre === 'all genres') {
                return book
              }
              return book.genres.includes(selectedGenre)
            })
            .map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {uniqueGenres.map((genre) => {
          return (
            <button key={genre} onClick={() => setGenre(genre)}>
              {genre}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Books
