import { ALL_BOOKS, USER } from '../queries/queries'
import { useQuery, useLazyQuery } from '@apollo/client'
import { useState, useEffect } from 'react'

const Recommendations = (props) => {
  const userQuery = useQuery(USER)
  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState([])
  const [booksQuery, { booksloading, error, booksdata }] =
    useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (!userQuery.loading) {
      setGenre(userQuery.data.me.favoriteGenre)
    }
  }, [setGenre, userQuery])

  const bookFetch = async () => {
    const kirjat = await booksQuery({ variables: { genre: genre } })
    setBooks(kirjat.data.allBooks)
  }

  useEffect(() => {
    if (genre) {
      bookFetch()
    }
  }, [genre, setBooks, booksQuery]) //eslint-disable-line

  if (userQuery.loading && booksQuery.loading) {
    return null
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        in genre <b>{genre}</b>
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
    </div>
  )
}

export default Recommendations
