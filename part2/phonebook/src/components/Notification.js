

const NotificationError = ({message}) => {

    const ErrorStyle = {
        color:"red",
        background: "lightgrey",
        fontSize: 20,
        borderRadius: 5,
        borderStyle: "solid",
        borderColor: "red",
        borderWidth: 5,
        padding: 10,
        marginBottom: 10
    }

    if(message === null) {
        return(null)
    }else{
        return(
            <div style={ErrorStyle}>
                {message}
            </div>
        )
    }
}

export default NotificationError