import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const buildControls = props => {
  return (
    <div className={classes.buildControls}>
      {controls.map(control => <BuildControl added={() => props.ingredientAdded(control.type)} key={control.label} label={control.label} />)}
    </div>
  )
}

export default buildControls
