import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../store/auth-context.js';
import PopupBox from '../components/UI/PopupBox.jsx';

const Redirect = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div className="redirect">
      {!authCtx.isLoggedIn && <Link to={'/login'} >ابتدا وارد شوید</Link>}
      {authCtx.isLoggedIn && <p>به وبسایت ما خوش آمدید</p>}
      {authCtx.isLoggedIn && <PopupBox />}
    </div>
  )
}

export default Redirect
