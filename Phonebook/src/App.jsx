import { useState,useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

let nextId=0

const App = () => {

   const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]=useState('')
  const [searchTerm, setSearchTerm]=useState('')
  const [notification, setNotification]=useState(null)



  useEffect(()=>{
    personService.getAll().then(data=>setPersons( data))
  },[])


const handleNameChange=(e)=>{setNewName(e.target.value)}
const handleNumberChange=(e)=>{setNewNumber(e.target.value)}
const handleSearchChange=(e)=>{setSearchTerm(e.target.value)}

const handleSubmit=(e)=>{
  e.preventDefault()

  const existing=persons.find(person=>person.name.toLowerCase()===newName.trim().toLowerCase())

  const newPerson={
  name:newName.trim(),
  number:newNumber.trim()
}


  if(existing){
    const confirmUpdate=window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    )

    if(confirmUpdate){
      personService
      .update(existing.id,newPerson)
      .then(returnedPerson=>{
        setPersons(persons.map(person=>person.id===existing.id?returnedPerson:person))
        setNewName('')
        setNewNumber('')
         setNotification({message:`Updated ${returnedPerson.name}`, type:'success'})
        setTimeout(()=>setNotification(null),3000)

      })

      .catch(error=>{
        setNotification({
          message:` ${newPerson.name} has already been removed from server`,
          type:'error'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
    return

  }

  personService
  .create(newPerson)
  .then(returnedPerson=>{
    setPersons([...persons, returnedPerson])
    setNewName('')
    setNewNumber('')
     setNotification({message:`Added ${returnedPerson.name}`, type:'success'})
        setTimeout(()=>setNotification(null),3000)
  })
  .catch(error=>{
    let errorMessage="Something went wrong"

    if(error.response && error.response.data&&error.reponse.data){
      errorMessage=`validation Error: ${error.response.data.error}`
    }else if(error.message){
      errorMessage=`Error: ${error.message}`
    }


    setNotification({
      message:errorMessage,
      type:'error'
    })
    setTimeout(()=>setNotification(null),5000)
  })

}

const handleDelete=(id,name)=>{
  const confirm=window.confirm(`Are you Sure you want to delete ${name}`)
  if(confirm){
    personService
    .remove(id)
    .then(()=>{
      setPersons(persons.filter(person=>person.id!==id))
       setNotification({message:`Deleted ${name}`, type:'success'})
        setTimeout(()=>setNotification(null),3000)
    })
    .catch(error=>{
      alert(`The person '${name}' was already deleted from server`)
      setPersons(persons.filter(person=>person.id !==id))


    })
  }
}


const filteredPersons=searchTerm ? persons.filter(person=>person.name.includes(searchTerm)):[];

  return (
    <div>
      <Notification notification={notification} />
      <h2>Phonebook</h2>

     <Filter value={searchTerm} onChange={handleSearchChange} filteredPersons={filteredPersons} />

     <h3>Add a new</h3>
     <PersonForm

     onSubmit={handleSubmit}
     newName={newName}
     newNumber={newNumber}
     handleNameChange={handleNameChange}
     handleNumberChange={handleNumberChange}
     />

     <h3>Numbers</h3>
     <Persons persons={ persons} handleDelete={handleDelete} />

</div>
  )
}

export default App
