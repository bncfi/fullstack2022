import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonsAxios from './services/PersonsAxios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWord, setSearchWord] = useState('')

  const hook = () => {
    PersonsAxios.getAll()
    .then(data => setPersons(data))
  }

  useEffect(hook,[])

  const inputHandleName = (event) => {
    setNewName(event.target.value)
  }
  const inputHandleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const inputHandleSearch = (event) => {
    setSearchWord(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber,
    }
    const personArray = persons.filter(person => person.name === contactObject.name)
    if(personArray.length > 0) {
      if(window.confirm(`${contactObject.name} is already added to phonebook, replace the old number with the new one?`)) {
        PersonsAxios.updatePerson(contactObject, personArray[0].id)
        setPersons(persons.map(person => {
          if(person.name === contactObject.name) {
            return contactObject
          }else {
            return person
          }
        }))
      }
    }else{
      setPersons(persons.concat(contactObject))
      PersonsAxios.createPerson(contactObject)
      setNewName('')
      setNewNumber('')
    }
  }

  const deleteHandle = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      PersonsAxios.deletePerson(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
      searchWord={searchWord} 
      inputHandleSearch={inputHandleSearch} 
      />
      <PersonForm 
        addContact={addContact}
        newName={newName}
        newNumber={newNumber}
        inputHandleName={inputHandleName} 
        inputHandleNumber={inputHandleNumber} 
      />
      <h2>Numbers</h2>
      <Persons persons={persons} searchWord={searchWord} deleteHandle={deleteHandle}/>
    </div>
  )
}

export default App