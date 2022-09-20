import React from 'react'
import { NavLink } from 'react-router-dom';
import classes from './NavigationMenu.module.css'

const NavigationMenu = () => {
  return (
    <nav className={classes.navigationMenu}>
        <ul>
            <li>
                <NavLink end to={"/"} className={({ isActive }) => isActive ? classes.active : classes.inActive}>خانه</NavLink>
            </li>
            <li>
                <NavLink end to={"contact"} className={({ isActive }) => isActive ? classes.active : classes.inActive}>ارتباط با ما</NavLink>
            </li>
            <li>
                <NavLink end to={"books"} className={({ isActive }) => isActive ? classes.active : classes.inActive}>لیست کتاب</NavLink>
            </li>
            <li>
                <NavLink end to={"books/p1"} className={({ isActive }) => isActive ? classes.active : classes.inActive}>کتاب</NavLink>
            </li>
            <li>
                <NavLink end to={"about"} className={({ isActive }) => isActive ? classes.active : classes.inActive}>درباره ما</NavLink>
            </li>
            <li>
                <NavLink end to={"books/newBook"} className={({ isActive }) => isActive ? classes.active : classes.inActive}>کتاب جدید</NavLink>
            </li>
        </ul>
      </nav>
  )
}

export default NavigationMenu
