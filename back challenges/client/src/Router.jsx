import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Verify from './pages/Verify';
import Main from './pages/Main';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="/" element={<Home />} />
            <Route path="/auth">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path='reset-password' element={<ResetPassword/>} />
                <Route path='forget-password' element={<ForgetPassword />} />
            </Route>
            <Route path="/verify-email" element={<Verify />} />
            
            <Route path='/main' element={<Main/>} />
        </Route>
    )
);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
