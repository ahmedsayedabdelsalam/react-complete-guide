import React from 'react'
import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'

const Logo = () => {
  return (
    <div className={classes.logo}>
      <img src={burgerLogo} alt="My Burger" />
    </div>
  )
}

export default Logo
