import React, { Component } from 'react';
import classes from './App.module.css';
import Person from './Person/Person'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'

class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'ahmed', age: 26 },
      { id: 2, name: 'ali', age: 10 },
      { id: 3, name: 'omar', age: 8 }
    ],
    showPersons: false
  }

  changeNameHandler = (event, personId) => {
    const persons = [...this.state.persons]
    const person = persons.find(person => person.id === personId)
    person.name = event.target.value
    this.setState({ persons })
  }

  deletePersonHandler = personId => {
    const persons = [...this.state.persons]
    const personIndex = persons.findIndex(person => person.id === personId)
    persons.splice(personIndex, 1)
    this.setState({ persons })
  }

  togglePersonsHandler = () => {
    this.setState({ showPersons: !this.state.showPersons })
  }

  render() {
    let btnClasses = ''
    let persons = null
    if (this.state.showPersons) {
      persons = this.state.persons.map(
        person =>
          <Person
            key={person.id}
            name={person.name}
            age={person.age}
            changeName={(event) => this.changeNameHandler(event, person.id)}
            deletePerson={() => this.deletePersonHandler(person.id)} />
      )
      btnClasses = classes.Red
    }

    const paragraphClasse = []
    if (this.state.persons.length <= 2) paragraphClasse.push(classes.red)
    if (this.state.persons.length <= 1) paragraphClasse.push(classes.bold)

    return (
      <ErrorBoundary>
        <div className={classes.App}>
          <h1>Hi I'm a React App</h1>
          <p className={paragraphClasse.join(' ')}>This is really working!</p>
          <button className={btnClasses} onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
