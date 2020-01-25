import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { withRouter } from 'react-router-dom'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        fetchingIngredients: false,
        error: false
    }

    getIngredients = () => {
        this.setState({ fetchingIngredients: true })
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data, fetchingIngredients: false })
            })
            .catch(error => {
                this.setState({ error: true, fetchingIngredients: false })
                console.log(error)
            })
    }

    purchasingHandler = () => {
        this.setState({ purchasing: true })
    }

    purchasingCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchasingContinueHandler = () => {
        let queryParams = []
        for (let ingredient in this.state.ingredients) {
            queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.state.ingredients[ingredient]))
        }
        queryParams.push(encodeURIComponent('price') + '=' + this.state.totalPrice)
        queryParams = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: queryParams
        })
    }

    updatepurchasable = ingredients => {
        const ingredientsCount = Object.keys(ingredients)
            .map(ingKey => ingredients[ingKey])
            .reduce((sum, el) => sum + el, 0)

        this.setState({ purchasable: ingredientsCount > 0 })
    }

    addIngredientHandler = type => {
        this.ingredientHandler(type, 1)
    }

    removeIngredientHandler = type => {
        this.ingredientHandler(type, -1)
    }

    ingredientHandler = (type, incPercentage) => {
        const ingredients = { ...this.state.ingredients }
        if (ingredients[type] <= 0 && incPercentage < 0) {
            return
        }
        ingredients[type] = ingredients[type] + incPercentage
        const totalPrice = this.state.totalPrice + (incPercentage * INGREDIENT_PRICES[type])
        this.setState({ ingredients, totalPrice: parseFloat(parseFloat(totalPrice).toFixed(2)) })
        this.updatepurchasable(ingredients)
    }

    componentDidMount() {
        this.getIngredients()
    }

    render() {
        const disabledInfo = { ...this.state.ingredients }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        let burger = this.state.error ? <p>Ingredients can not be loaded!</p> : <Spinner/>
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        purchase={this.purchasingHandler}
                    />
                </Aux>
            )

            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchasingCancelHandler}
                purchaseContinued={this.purchasingContinueHandler}
            />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} hide={this.purchasingCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(withRouter(BurgerBuilder), axios)