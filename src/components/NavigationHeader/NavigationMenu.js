import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context.js";
import AvatarContext from "../../store/avatar-context.js";
import { storage } from "../Utilities/firebase.jsx";
import tinyColor from 'tinycolor2';
import classes from "./NavigationMenu.module.css";

const NavigationMenu = (props) => {
  const [avatarImage, setAvatarImage] = useState([]);
  const avtCtx = useContext(AvatarContext);
  const profileName = avtCtx.avatarUniqueToken;
  const imageListRef = ref(storage, `image${avtCtx.avatarUniqueToken}/`);
  const obd = imageListRef._location.path_;
  useEffect(() => {
    console.log(obd);
    setAvatarImage([]);
      listAll(imageListRef).then(response => {
        console.log(response.items.length);
        response.items.forEach(item => {
          getDownloadURL(item).then(url => {
            setAvatarImage(url);
          })
        })
      })
    }, [obd])
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const logoutHandler = () => {
    authCtx.logout()
  }
  const color = tinyColor(`${Math.floor(Math.random()*16777215).toString(16)}`).monochromatic();
  console.log(profileName);
  const existAvatar = avatarImage.length > 0 ? <img src={avatarImage} alt="" /> : <span className={classes['avatarContainer__default']} style={{ backgroundColor: color[color.length-1].toHexString(),color: color[0].toHexString()}}>{profileName?.slice(0, 1).toUpperCase() ?? "A"}</span>;
  return (
    <nav className={classes.navigationMenu}>
      <ul>
        {isLoggedIn && (<li className={classes.avatarContainer}>{existAvatar}</li>)}
        {props.items.map((item) => (
          <li key={item.id}>
            <NavLink
              end
              to={item.path}
              className={({ isActive }) =>
                isActive ? classes.active : classes.inActive
              }
            >
              {item.title}
            </NavLink>
          </li>
        ))}
        {!isLoggedIn && (
          <li>
            <NavLink
              end
              to={"login"}
              className={({ isActive }) =>
                isActive ? classes.active : classes.inActive
              }
            >
              ورود
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink
              end
              to={"profile"}
              className={({ isActive }) =>
                isActive ? classes.active : classes.inActive
              }
            >
              پروفایل
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink
              end
              to={"userProfile"}
              className={({ isActive }) =>
                isActive ? classes.active : classes.inActive
              }
            >
              تغییر رمزعبور
            </NavLink>
          </li>
        )}
        {isLoggedIn && <button onClick={logoutHandler}>خروج</button>}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
