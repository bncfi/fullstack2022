import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries/queries'
import Setyear from './Setyear'

const Authors = (props) => {
  const authorsQuery = useQuery(ALL_AUTHORS)

  if (authorsQuery.loading) {
    return null
  }

  if (!props.show) {
    return null
  }

  const authors = authorsQuery.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Setyear show={props.token != null} authors={authors} />
    </div>
  )
}

export default Authors
