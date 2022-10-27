import React, { useContext, useEffect, useState } from "react";
import AvatarContext from "../../store/avatar-context.js";
import classes from './PopupBox.module.css';

let isFirst;
const PopupBox = () => {
  const [userName, setUserName] = useState('');
  const [popupShowing, setPopupShowing] = useState(false);
  const avtCtx = useContext(AvatarContext);
  const avtUId = avtCtx.avatarUniqueToken.split(".com");
  useEffect(() => {
    const requestData = async () => {
      const response = await fetch(
        `https://authentication-user-541a0-default-rtdb.firebaseio.com/${avtUId[0]}.json`
      );
      const data = await response.json();
      setUserName(data.userId);
    };
    requestData().catch((error) => console.log(error.message));
  }, []);
  useEffect(() => {
    if (!isFirst) {
      console.log('yes');
      isFirst = true;
    } else {
      return
    }
    setPopupShowing(true);
    const timer = setTimeout(() => {
      setPopupShowing(false);
    }, 4000)
    return () => clearTimeout(timer)
  }, [])
  const popupStyles = `${classes.popupBox} ${popupShowing ? classes.show : ''}`;
  return <div className={popupStyles}>
    <p>welcome to homePage <span>{userName || ''}</span></p>
  </div>;
};

export default PopupBox;
