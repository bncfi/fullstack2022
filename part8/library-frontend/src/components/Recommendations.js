import { ALL_BOOKS, USER } from '../queries/queries'
import { useQuery, useLazyQuery } from '@apollo/client'
import { useState, useEffect } from 'react'

const Recommendations = (props) => {
  const userQuery = useQuery(USER)
  const [genre, setGenre] = useState(null)
  const [booksQuery, { booksloading, error, booksdata }] =
    useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    booksQuery({ variables: { genre: genre } })
  }, [genre, booksQuery])

  if (userQuery.loading && booksQuery.loading) {
    return null
  }

  if (!props.show) {
    return null
  }
  console.log('favorite ', userQuery.data.me.favoriteGenre)
  setGenre(userQuery.data.me.favoriteGenre)

  //, { variables: { genre }, skip: !genre }
  /*
            {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
  */
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
