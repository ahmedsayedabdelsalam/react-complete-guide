import React from 'react'

import Button from '../../UI/Button/Button'
import Burger from '../../Burger/Burger'
import classes from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {
    return (
        <div className={classes.checkoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <p>{props.totalPrice} USD</p>
            <Button clicked={props.checkoutCanceled} type="danger">CANCEL</Button>
            <Button clicked={props.checkoutContinued} type="success">CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary