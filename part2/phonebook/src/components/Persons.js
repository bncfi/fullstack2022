import React from "react"
import Person from "./Person"

const Persons = ({persons,searchWord, deleteHandle}) => {
    return(
        persons
            .filter((person)=>person.name.toLowerCase().includes(searchWord.toLowerCase()))
            .map((person) => <Person key={person.id} name={person.name} number={person.number} id={person.id} deleteHandle={deleteHandle}/>)
            )
}

export default Persons