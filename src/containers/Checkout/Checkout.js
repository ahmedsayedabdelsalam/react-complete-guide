import React, { Component } from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from "../ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: {},
        totalPrice: 0
    }

    componentWillMount = () => {
        const query = new URLSearchParams(this.props.history.location.search)
        const ingredients = {}
        let totalPrice = 0

        for (let param of query.entries()) {
            if (param[0] === 'price') {
                totalPrice = +param[1]
            } else {
                ingredients[param[0]] = +param[1]
            }
        }

        this.setState({ ingredients, totalPrice })
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary checkoutCanceled={this.checkoutCanceledHandler}
                                 checkoutContinued={this.checkoutContinuedHandler}
                                 ingredients={this.state.ingredients}
                                 totalPrice={this.state.totalPrice}/>
                <Route path={this.props.match.path + '/contact-data'}
                       render={() => <ContactData ingredients={this.state.ingredients}
                                                  totalPrice={this.state.totalPrice}/>}/>
            </div>
        )
    }
}

export default Checkout