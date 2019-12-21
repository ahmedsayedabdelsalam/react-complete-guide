import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = props => {
  return (
    <header className={classes.toolbar}>
      <DrawerToggle clicked={props.toggleDrawer} />
      <div className={classes.logo}>
        <Logo />
      </div>
      <nav className={classes.desktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  )
}

export default toolbar
