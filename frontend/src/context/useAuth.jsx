import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const initialUserState =  localStorage.getItem("Chatify");
    // parse the user data if it exists
    let parsedUser;
    try {
        parsedUser = initialUserState ? JSON.parse(initialUserState) : undefined;
    } catch (error) {
        parsedUser = undefined;
    }

    const [authUser, setAuthUser] = useState(parsedUser);

    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
