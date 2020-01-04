import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
  }

  purchasingHandler = () => {
    this.setState({ purchasing: true })
  }

  purchasingCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchasingContinueHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
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
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  updatepurchaseable = ingredients => {
    const ingredientsCount = Object.keys(ingredients)
      .map(ingKey => ingredients[ingKey])
      .reduce((sum, el) => sum + el, 0)

    this.setState({ purchaseable: ingredientsCount > 0 })
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
    this.setState({ ingredients, totalPrice })
    this.updatepurchaseable(ingredients)
  }

  render() {
    const disabledInfo = { ...this.state.ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} hide={this.purchasingCancelHandler}>
          <OrderSummary
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchasingCancelHandler}
            purchaseContinued={this.purchasingContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          purchase={this.purchasingHandler}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder