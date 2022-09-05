import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const AnecdoteFilter = (props) => {
  const handleChange = (event) => {
    const filter = event.target.value
    props.setFilter(filter)
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter,
}

const connectedFilter = connect(null, mapDispatchToProps)(AnecdoteFilter)

export default connectedFilter
