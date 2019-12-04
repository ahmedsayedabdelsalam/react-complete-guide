import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'
import Radium, { StyleRoot } from 'radium'

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
    const buttonStyle = {
      backgroundColor: 'green',
      color: 'white',
      margin: '10px',
      padding: '10px',
      border: '1px solid blue',
      cursor: 'pointer',
      font: 'inherit',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

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

      buttonStyle.backgroundColor = 'red'
      buttonStyle[':hover'].backgroundColor = 'salmon'
    }

    const paragraphClassed = []
    if (this.state.persons.length <= 2) paragraphClassed.push('red')
    if (this.state.persons.length <= 1) paragraphClassed.push('bold')

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi I'm a React App</h1>
          <p className={paragraphClassed.join(' ')}>This is really working!</p>
          <button onClick={this.togglePersonsHandler} style={buttonStyle}>Toggle Persons</button>
          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
