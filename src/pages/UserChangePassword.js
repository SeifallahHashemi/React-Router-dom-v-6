import React from 'react'
import classes from '../styles/UserChangePassword.module.css';
import { useRef } from 'react';
import { useContext } from 'react';
import AuthContext from '../store/auth-context.js';
import { useNavigate } from 'react-router-dom';
const UserChangePassword = () => {
  const navigate = useNavigate();
    const inputRef = useRef();
    const authCtx = useContext(AuthContext);
    const submitHandler = event => {
        event.preventDefault();
        const enteredNewPassword = inputRef.current.value;
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCi5_j_ULybQcRRED4wAPWtPH7RIfKzuRA';
        const req = new Request(url)
        fetch(req, {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
                password: enteredNewPassword,
                returnSecureToken: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
          navigate('/');
          return res.json()
        })
    }
  return (
    <form className={classes.changePasswordForm} onSubmit={submitHandler}>
      <h2>تغییر رمز عبور</h2>
      <div className={classes['changePasswordForm__input']}>
        <label htmlFor="changePassword">رمزعبور جدید</label>
        <input type="password" name='changePassword' id='changePassword' minLength={'7'} ref={inputRef}/>
      </div>
      <div className={classes['changePasswordForm__button']}>
        <button type="submit">اعمال تغییرات</button>
      </div>
    </form>
  )
}

export default UserChangePassword;
