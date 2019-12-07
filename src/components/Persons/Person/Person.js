import React, { Component } from 'react'
import classes from './Person.module.css'
import PropTypes from 'prop-types'

class Person extends Component {
  componentDidMount() {
    if (this.props.index === 0) {
      this.inputElement.focus()
    }
  }
  render() {
    return (
      <div className={classes.Person}>
        <p onClick={this.props.deletePerson}>My Name is {this.props.name}, and I am {this.props.age} years old.</p>
        <input ref={(input) => this.inputElement = input} onChange={this.props.changeName} value={this.props.name} />
      </div>
    );
  }
}

Person.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  deletePerson: PropTypes.func,
  changeName: PropTypes.func,
  index: PropTypes.number
}

export default Person