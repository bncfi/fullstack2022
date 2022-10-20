const NotificationSuccess = ({ message }) => {
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
  if (message === null) {
    return null
  } else {
    return <div style={SuccessStyle}>{message}</div>
  }
}

export default NotificationSuccess
