import React from 'react'
import { Fragment } from 'react'
import Navigation from './../NavigationHeader/Navigation';

const ITEMS = [
    {id: 'home',path: '/', title: 'خانه'},
    // {id: 'profile',path: '/profile', title: 'پروفایل'},
    // {id: 'login',path: '/login', title: 'ورود'},
]
const Layout = (props) => {
  return (
    <Fragment>
        <Navigation menuItems={ITEMS}/>
        <main>{props.children}</main>
    </Fragment>
  )
}

export default Layout
