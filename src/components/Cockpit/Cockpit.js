import React from 'react'
import classes from './Cockpit.module.css'

const Cockpit = (props) => {
  let btnClasses = ''
  if (props.showPersons) btnClasses = classes.Red
  const paragraphClasse = []
  if (props.persons.length <= 2) paragraphClasse.push(classes.red)
  if (props.persons.length <= 1) paragraphClasse.push(classes.bold)

  return (
    <div className={classes.Cockpit}>
      <h1>Hi I'm a React App</h1>
      <p className={paragraphClasse.join(' ')}>This is really working!</p>
      <button className={btnClasses} onClick={props.click}>Toggle Persons</button>
    </div>
  )
}

export default Cockpit