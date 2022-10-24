import { useSelector } from 'react-redux'

const NotificationSuccess = () => {
  const notification = useSelector((state) => state.notification)
  const SuccessStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: 'green',
    borderWidth: 5,
    padding: '10',
    marginBottom: 10,
  }

  if (notification) {
    return <div style={SuccessStyle}>{notification}</div>
  }
  return <div></div>
}

export default NotificationSuccess
