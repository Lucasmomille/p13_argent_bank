import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";


export default function ProtectedRoute({ children }) {
    const { token } = useSelector((state) => state.user);
    let location = useLocation();
    
    if (token) {
        return React.cloneElement(children, { token });
    }

    return (
        <Navigate
            to='/'
            state= {{ from: location }}
            replace
        />
    );
}