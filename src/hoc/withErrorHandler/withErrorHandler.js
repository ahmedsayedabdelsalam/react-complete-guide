import React, { Component } from "react"
import Aux from "../Aux/Aux"
import Modal from "../../components/UI/Modal/Modal"

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentWillMount() {
      axios.interceptors.request.use(request => {
        this.setState({ error: null })
        return request
      })

      axios.interceptors.response.use(response => response, error => {
        this.setState({ error: error })
        return Promise.reject(error)
      })
    }

    errorCancelHandler = () => {
      this.setState({ error: null })
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} hide={this.errorCancelHandler}>
            Something didn't work!
          </Modal>
          <WrappedComponent />
        </Aux>
      )
    }
  }
}

export default withErrorHandler