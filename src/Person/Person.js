import React from 'react'
import classes from './Person.module.css'

const Person = (props) => {
  const rnd = Math.random()

  if (rnd > 0.7) {
    throw new Error('something went wrong')
  }

  return (
    <div className={classes.Person}>
      <p onClick={props.deletePerson}>My Name is {props.name}, and I am {props.age} years old.</p>
      <input onChange={props.changeName} value={props.name} />
    </div>
  );
}

export default Person