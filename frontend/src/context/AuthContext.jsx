import React, { createContext, useState } from "react";
// import axiosInstance from "../utils/axiosInstance.js";
// import { API_PATHS } from "../utils/constants";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true);

    // const token = localStorage.getItem("token");

    // 🔹 Fetch Logged In User
    // const fetchUser = useCallback(async () => {
    //     try {
    //         const res = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
    //         setUser(res.data);
    //     } catch (error) {
    //         console.error("Authentication Failed:", error);
    //         clearUser();
    //     } finally {
    //         setLoading(false);
    //     }
    // }, []);

    // 🔹 On Mount
    // useEffect(() => {
    //     if (!token) {
    //         setLoading(false);
    //         return;
    //     }
    //     fetchUser();
    // }, [token, fetchUser]);

    // 🔹 Login / Signup Success
    const updateUser = (data) => {
        if (!data?.token) {
            console.error("Token missing in updateUser");
            return;
        }

        localStorage.setItem("token", data.token);
        setUser(data.user); // assuming backend sends { user, token }
    };

    // 🔹 Logout
    const clearUser = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const isAuthenticated = !!user;

    return (
        <UserContext.Provider
            value={{
                user,
                // loading,
                isAuthenticated,
                updateUser,
                clearUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;