import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";

import App from './App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Activate from './auth/Activate';
import Private from './core/Private';
import Admin from './core/Admin';
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import Forgot from './auth/Forgot'
import Reset from './auth/Reset'
const Routers = () =>{
    return (
        <>
        <Router>
            <Routes>
            <Route exact path="/" element={<App />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/auth/activate/:token" element={<Activate />} />
            <Route exact path="/private" element={<PrivateRoute><Private /></PrivateRoute>} />
            <Route exact path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
            <Route exact path="/auth/password/forgot" element={<Forgot />} />
            <Route exact path="/auth/password/reset/:token" element={<Reset />} />
            </Routes>
        </Router>
       </>
    )
}

export default Routers;