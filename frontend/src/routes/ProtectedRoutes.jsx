import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(UserContext);

    if (loading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;