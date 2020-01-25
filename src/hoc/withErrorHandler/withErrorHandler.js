import React, { Component } from "react"
import Aux from "../Aux/Aux"
import Modal from "../../components/UI/Modal/Modal"

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterseptor = axios.interceptors.request.use(request => {
                this.setState({ error: null })
                return request
            })

            this.resInterseptor = axios.interceptors.response.use(response => response, error => {
                this.setState({ error: error })
                return Promise.reject(error)
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterseptor)
            axios.interceptors.response.eject(this.resInterseptor)
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
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler