import React, { Component } from 'react'
import Order from "../../components/Order/Order";
import axios from '../../axios-orders'
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
    state = {
        orders: [],
        loading: false
    }

    componentDidMount = () => {
        this.setState({ loading: true })
        axios.get('orders.json')
            .then(response => {
                const orders = []
                for (let key in response.data) {
                    orders.push({ ...response.data[key], id: key })
                }
                this.setState({ orders, loading: false })
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false })
            })
    }

    render() {
        let orders = <Spinner/>
        if (!this.state.loading) {
            orders = []
            if (this.state.orders.length > 0) {
                for (let order of this.state.orders) {
                    orders.push(<Order key={order.id} ingredients={order.ingredients} price={order.totalPrice}/>)
                }
            } else {
                orders = <p>No Items Found!</p>
            }
        }

        return (
            <div>
                {orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)