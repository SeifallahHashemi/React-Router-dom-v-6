import { useState } from 'react';
import React from 'react';

const AvatarContext = React.createContext({
    avatarUniqueToken : "",
    generateToken: (token) => {},
    removeToken: () => {}
})

export const AvatarContextProvider = props => {
    const initialToken = localStorage.getItem('avatar');
    const [token, setToken] = useState(initialToken);

    const generateTokenHandler = (token) => {
        setToken(token);
        localStorage.setItem('avatar', token);
    }

    const removeAvatarHandler = () => {
        setToken(null);
        localStorage.removeItem('avatar');
    }
    const contextValue = {
        avatarUniqueToken: token,
        generateToken: generateTokenHandler,
        removeToken: removeAvatarHandler
    }
    return (
        <AvatarContext.Provider value={contextValue}>
            {props.children}
        </AvatarContext.Provider>
    )
}
export default AvatarContext;