import React from "react"

const PersonForm = ({addContact, newName, inputHandleName, newNumber, inputHandleNumber}) => {
    return(
        <form onSubmit={addContact}>
            <div>
            name: <input value={newName} onChange={inputHandleName}/>
            </div>
            <div>
            number: <input value={newNumber} onChange={inputHandleNumber}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
