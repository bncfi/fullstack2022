import { useState } from 'react'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries/queries'
import { useMutation } from '@apollo/client'

const Setyear = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, born } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h1>Set birthyear</h1>
      <div>
        <form onSubmit={submit}>
          <div>
            author
            <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(parseInt(target.value))}
            />
          </div>

          <button type="submit">edit author</button>
        </form>
      </div>
    </div>
  )
}

export default Setyear
