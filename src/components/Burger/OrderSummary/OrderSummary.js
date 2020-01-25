import React from 'react'
import Button from '../../UI/Button/Button'

const orderSummary = props => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(ingKey => <li key={ingKey}>
            <span style={{ textTransform: 'capitalize' }}>{ingKey}: </span>
            {props.ingredients[ingKey]}
        </li>)
    return (
        <div>
            <h3>Order Summary</h3>
            <p>A Delicious Burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue to checkout ?</p>
            <Button type='danger' clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button type='success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </div>
    )
}

export default orderSummary
