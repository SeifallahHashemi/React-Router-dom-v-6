import React from 'react'
import classes from './Navigation.module.css';
import NavigationMenu from './NavigationMenu.js';

const Navigation = () => {
  return (
    <header className={classes.navigation}>
      <section className={classes.logo}>
        <h1>Logo</h1>
      </section>
      <NavigationMenu />
    </header>
  )
}

export default Navigation
