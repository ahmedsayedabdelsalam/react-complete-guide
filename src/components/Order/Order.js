import React from 'react'

import classes from './Order.module.css'

const order = (props) => {
    const ingredients = []
    for (let ingredient in props.ingredients) {
        ingredients.push(<span style={{
            margin: '0 5px',
            border: '1px solid #ccc',
            padding: '5px',
            display: 'inline-block',
            textTransform: 'capitalize'
        }}
                               key={ingredient}>{ingredient} ({props.ingredients[ingredient]})</span>)
    }
    return (
        <div className={classes.order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>{props.price} USD</strong></p>
        </div>
    )
}

export default order