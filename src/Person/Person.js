import React from 'react'
import './Person.css'
import Radium from 'radium'

const Person = (props) => {
  const style = {
    '@media (min-width: 500px)': {
      width: '450px'
    }
  }

  return (
    <div className="Person" style={style}>
      <p onClick={props.deletePerson}>My Name is {props.name}, and I am {props.age} years old.</p>
      <input onChange={props.changeName} value={props.name} />
    </div>
  );
}

export default Radium(Person)