import React, { useEffect, useState, useContext } from "react";
import classes from "./LogInOut.module.css";
import { RiUser3Line } from "react-icons/ri";
import { MdLockOutline } from "react-icons/md";
import { IoQrCodeOutline } from "react-icons/io5";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import AuthContext from "../../store/auth-context.js";
import { useNavigate } from "react-router-dom";
import AvatarContext from "../../store/avatar-context.js";

const LogInOut = () => {
  const [isTouched, setIsTouched] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [typeInput, setTypeInput] = useState("password");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showingNotification, setShowingNotification] = useState(false);
  const navigate = useNavigate();
  const authCTX = useContext(AuthContext);
  const avtCtx = useContext(AvatarContext);

  const inputFocusHandler = (e) => {
    if (e.target.value.trim().length > 0) {
      setIsTouched(true);
    } else {
      setIsTouched(false);
    }
  };
  const inputBlurHandler = (e) => {
    if (e.target.value.trim().length === 0) setIsTouched(false);
  };
  const toggleShowingHandler = () => {
    setIsShow((prevState) => !prevState);
    setTypeInput((prevState) =>
      prevState === "password" ? "text" : "password"
    );
  };
  const switchSignUp = (e) => {
    setIsLogin(false);
  };
  const switchLogin = () => {
    setIsLogin(true);
  };
  console.log(isLogin);
  const submitFormHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const fd = new FormData(event.target);
    const enteredEmail = fd.get("email_signup");
    const enteredPassword = fd.get("password_signup");
    const checkEmail = fd.get("email");
    const checkPassword = fd.get("password");
    const bodyJson = {
      email: !isLogin ? enteredEmail : checkEmail,
      password: !isLogin ? enteredPassword : checkPassword,
      returnSecureToken: true,
    };
    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCi5_j_ULybQcRRED4wAPWtPH7RIfKzuRA";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCi5_j_ULybQcRRED4wAPWtPH7RIfKzuRA";
    }
    let h = new Headers({
      "Content-Type": "application/json",
    });
    let req = new Request(url, {
      headers: h,
      method: "POST",
      body: JSON.stringify(bodyJson),
    });
    fetch(req)
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            const errorSplit = data.error.message.split(" ");
            console.log(errorSplit);
            // let isWeakPassword = errorSplit[0] === 'WEAK_PASSWORD' ? 'Yes' : 'No';
            console.log(errorSplit[0] === "WEAK_PASSWORD");
            if (errorSplit[0] === "WEAK_PASSWORD") {
              setErrorMessage({
                title: "رمزعبور ضعیف است",
                message: "رمزعبور باید حداقل 6 رقم باشد",
              });
            } else if (errorSplit[0] === "EMAIL_EXISTS") {
              setErrorMessage({
                title: "ایمیل قبلا ثبت شده است",
                message:
                  "نام کاربری با این ایمیل قبلا ایجاد شده است لطفا از بخش ورود به سایت استفاده کنید",
              });
            } else if (errorSplit[0] === "INVALID_PASSWORD") {
              setErrorMessage({
                title: "رمزعبور نامعتبر است",
                message: "لطفا رمزعبور را درست وارد نمائید",
              });
            }
            throw new Response("something went wrong!", { status: 400 });
            // setErrorMessage(data.error.message || 'failed send data !')
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        console.log(data);
        authCTX.login(data.idToken, expirationTime.toISOString());
        const isExistAvatarToken =
          localStorage.getItem("avatar") === data.email;
        if (!isExistAvatarToken) {
          avtCtx.generateToken(data.email);
        }
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        // alert(error.message)
      });
  };
  /* Classes */
  const switchClassName = `${classes.form} ${classes["form--login"]} ${
    isLogin ? classes.switchStateTwo : classes.switchState
  }`;
  const switchClassNameTwo = `${classes.form} ${classes["form--logout"]} ${
    !isLogin ? classes.switchStateTwo : classes.switchState
  }`;
  let addAnimation = `${classes.notification} ${
    showingNotification ? classes.notificationShow : ""
  }`;
  useEffect(() => {
    if (errorMessage === null) {
      return;
    }
    setShowingNotification(true);
    const timer = setTimeout(() => {
      setShowingNotification(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage]);
  return (
    <div className={classes["form__container"]}>
      <form
        className={switchClassName}
        onSubmit={submitFormHandler}
        autoComplete={"off"}
      >
        <input
          autoComplete="false"
          name="hidden"
          type="text"
          style={{ display: "none" }}
        />
        {isLoading && (
          <>
            <div className={classes.backdrop}></div>
            <span className={classes.loadingSpinner}></span>
          </>
        )}
        <h2>ورود</h2>
        <div className={classes.userInputContainer}>
          <div className={classes.userInput}>
            <label htmlFor="email">
              <RiUser3Line />
            </label>
            <input type="email" name="email" id="email" placeholder="ایمیل" />
          </div>
          <div className={classes.userInput}>
            <label htmlFor="password">
              <MdLockOutline />
            </label>
            {isTouched && (
              <>
                <span
                  className={`${
                    isShow ? classes.animationOne : classes.animationTwo
                  }`}
                >
                  <BsFillEyeSlashFill onClick={toggleShowingHandler} />
                </span>
                <span
                  className={`${
                    isShow ? classes.animationTwo : classes.animationOne
                  }`}
                >
                  <BsFillEyeFill onClick={toggleShowingHandler} />
                </span>
              </>
            )}
            <input
              type={typeInput}
              name="password"
              id="password"
              placeholder="رمزعبور"
              onFocus={(e) =>
                e.target.value.trim().length > 0 ? setIsTouched(true) : null
              }
              onChange={inputFocusHandler}
              onBlur={inputBlurHandler}
            />
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <button
            className={`${classes.btn} ${classes["btn--submit"]}`}
            type="submit"
          >
            ورود
          </button>
          <button
            className={`${classes.btn} ${classes["btn--toggleState"]}`}
            type="button"
            onClick={switchSignUp}
          >
            عضویت
          </button>
        </div>
      </form>
      <form
        className={switchClassNameTwo}
        onSubmit={submitFormHandler}
        autoComplete={"off"}
      >
        <input
          autoComplete="false"
          name="hidden"
          type="text"
          style={{ display: "none" }}
        />
        {isLoading && (
          <>
            <div className={classes.backdrop}></div>
            <span className={classes.loadingSpinner}></span>
          </>
        )}
        <h2>ثبت نام</h2>
        <div className={classes.userInputContainer}>
          <div
            className={`${classes.userInput} ${classes["userInput--signUp"]}`}
          >
            <label htmlFor="uniqueId">
              <IoQrCodeOutline />
            </label>
            <input
              type="text"
              name="uniqueId"
              id="uniqueId"
              placeholder="نام کاربری"
            />
          </div>
          <div
            className={`${classes.userInput} ${classes["userInput--signUp"]}`}
          >
            <label htmlFor="email_signup">
              <RiUser3Line />
            </label>
            <input
              type="email"
              name="email_signup"
              id="email_signup"
              placeholder="ایمیل"
            />
          </div>
          <div
            className={`${classes.userInput} ${classes["userInput--signUp"]}`}
          >
            <label htmlFor="password_signup">
              <MdLockOutline />
            </label>
            <input
              type="password"
              name="password_signup"
              id="password_signup"
              placeholder="رمزعبور"
            />
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <button
            className={`${classes.btn} ${classes["btn--submit"]}`}
            type="submit"
          >
            ثبت نام
          </button>
          <button
            className={`${classes.btn} ${classes["btn--toggleState"]}`}
            type="button"
            onClick={switchLogin}
          >
            ورود
          </button>
        </div>
      </form>
      <div className={classes.illustrationContainer}></div>
      <div className={addAnimation}>
        <span>{errorMessage?.title}</span>
        <span>{errorMessage?.message}</span>
      </div>
    </div>
  );
};

export default LogInOut;
