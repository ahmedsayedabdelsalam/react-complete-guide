import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import classes from './ContactData.module.css'
import Button from '../../components/UI/Button/Button'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from '../../axios-orders'
import Spinner from "../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = () => {
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            customer: {
                name: 'Ahmed Sayed Abdelsalam',
                address: {
                    street: 'my street 1',
                    zipCode: '12345',
                    country: 'Egypt'
                }
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                console.log(response)
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({ loading: false })
                console.log(error)
            })
    }

    render() {
        let form = (
            <form>
                <input className={classes.block} type="text" name="name" placeholder="Your Name"/>
                <input className={classes.block} type="text" name="email" placeholder="Your Email"/>
                <input className={classes.block} type="text" name="street" placeholder="street"/>
                <input className={classes.block} type="text" name="postal" placeholder="Postal Code"/>
                <Button clicked={this.orderHandler} type="success">ORDER</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.contactData}>
                <h3>Enter Contact Data</h3>
                {form}
            </div>
        )
    }
}

export default withErrorHandler(withRouter(ContactData), axios)