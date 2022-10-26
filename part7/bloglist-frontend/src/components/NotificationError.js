import { useSelector } from 'react-redux'

const NotificationError = () => {
  const notification = useSelector((state) => state.error)

  const ErrorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (notification) {
    return <div style={ErrorStyle}>{notification}</div>
  }
  return <div></div>
}

export default NotificationError
