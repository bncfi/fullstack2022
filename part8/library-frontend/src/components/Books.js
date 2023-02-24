import { ALL_BOOKS } from '../queries/queries'
import { useQuery, useLazyQuery } from '@apollo/client'
import { useState, useEffect } from 'react'

const Books = (props) => {
  const booksQuery = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [selectedGenre, setGenre] = useState('all genres')
  const [booksLazyQuery, { booksloading, error, booksdata }] =
    useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    const bookFetch = async () => {
      console.log('genre: ', selectedGenre)
      if (selectedGenre !== 'all genres') {
        const kirjat = await booksLazyQuery({
          variables: { genre: selectedGenre },
        })
        setBooks(kirjat.data.allBooks)
      }
      if (selectedGenre === 'all genres') {
        const kirjat = await booksLazyQuery()
        setBooks(kirjat.data.allBooks)
      }
    }
    if (!booksQuery.loading) {
      bookFetch()
    }
  }, [selectedGenre, booksLazyQuery, booksQuery, setGenre])

  if (booksQuery.loading) {
    return null
  }

  if (!props.show) {
    return null
  }

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
          {books.map((book) => (
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
