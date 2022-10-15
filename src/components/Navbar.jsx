import React, { useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfos } from "../store/action";
import { logout } from '../store/reducer'

export default function Navbar() {
    const { token, userInfo } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            dispatch(getUserInfos());
        }
    }, [token, dispatch]);
    return (
        <nav className="main-nav">
            <NavLink className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src="./img/argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            { userInfo ? (<div>
                <NavLink className="main-nav-item" to="/user">
                    <i className="fa fa-user-circle"></i>
                    {userInfo?.firstName}
                </NavLink>
                <NavLink className="main-nav-item" to="/login" onClick={() => dispatch(logout())}>
                    <i className="fa fa-sign-out"></i>
                    Sign Out
                </NavLink>
            </div>): (
                <div>
                    <NavLink className="main-nav-item" to="/login">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </NavLink>
                </div>
            )}
        </nav>
    )
}
