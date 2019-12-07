import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'
import Aux from '../hoc/Aux'
// import WithClassesComponent from '../hoc/WithClassesComponent'
import withClasses from '../hoc/withClasses'

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
    let persons = null
    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          changeName={this.changeNameHandler}
          deletePerson={this.deletePersonHandler} />
      )
    }
    return (
      // <div className={classes.App}>
      <Aux>
        {/* <WithClassesComponent classes={classes.App}> */}
        <Cockpit persons={this.state.persons} showPersons={this.state.showPersons} click={this.togglePersonsHandler} />
        {persons}
        {/* </WithClassesComponent> */}
      </Aux>
      // </div>
    );
  }
}

export default withClasses(App, classes.App);
