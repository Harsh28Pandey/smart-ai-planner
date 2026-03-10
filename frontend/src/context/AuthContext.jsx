import React, { createContext, useState, useContext } from "react";

export const UserContext = createContext(null);

export const useAuth = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    // LOGIN / SIGNUP SUCCESS
    const updateUser = (data) => {

        if (!data?.accessToken) {
            console.error("Token missing in updateUser");
            return;
        }

        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));

        setUser(data.user);
    };

    // LOGOUT
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    const isAuthenticated = !!user;

    return (
        <UserContext.Provider
            value={{
                user,
                isAuthenticated,
                updateUser,
                logout
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;