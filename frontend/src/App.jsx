import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/pages/Navbar.jsx";
import Home from "./components/pages/Home.jsx";
import About from "./components/pages/About.jsx";
import Features from "./components/pages/Features.jsx";
import Contact from "./components/pages/Contact.jsx";
import Login from "./Auth/Login.jsx";
import Signup from "./Auth/Signup.jsx";
import ForgotPassword from "./Auth/ForgotPassword.jsx";

import VerifyOTP from "./Auth/VerifyOTP.jsx";
import ChangePassword from "./Auth/ChangePassword.jsx";
import VerifyEmail from "./Auth/VerifyEmail.jsx";
import Verify from "./Auth/Verify.jsx";

import UserProvider from "./context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoutes.jsx";

const AppLayout = () => {
    const location = useLocation();

    const hideNavbarRoutes = [
        "/login",
        "/signup",
        "/forgot-password",
        "/verify",
        "/verify-otp",
        "/change-password",
    ];

    const shouldHideNavbar = hideNavbarRoutes.some((route) =>
        location.pathname.startsWith(route)
    );

    return (
        <>
            {!shouldHideNavbar && <Navbar />}

            <Routes>
                {/* home, about, features and contact routes without login */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/contact" element={<Contact />} />

                {/* login, signup and forgot password routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Verify Email Pages */}
                <Route path="/verify" element={<VerifyEmail />} />
                <Route path="/verify/:token" element={<Verify />} />

                {/* OTP & Reset Password Flow */}
                <Route path="/verify-otp/:email" element={<VerifyOTP />} />
                <Route path="/change-password/:email" element={<ChangePassword />} />

                {/* Protected Page */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            {/* <Dashboard /> */}
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
};

const App = () => {
    return (
        <Router>
            <UserProvider>
                <AppLayout />
            </UserProvider>
        </Router>
    );
};

export default App;