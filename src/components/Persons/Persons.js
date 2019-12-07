import React from 'react'
import Person from './Person/Person'

const Persons = (props) => {
  return props.persons.map(
    person =>
      <Person
        key={person.id}
        name={person.name}
        age={person.age}
        changeName={(event) => props.changeName(event, person.id)}
        deletePerson={() => props.deletePerson(person.id)} />
  )
}

export default Persons