import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../store/action";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasRemember, setHasRemember] = useState(false);
    const { loading, userInfo, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const userCode = {
        email: email,
        password: password,
    };

    const toggleRemember = () => {
        setHasRemember((current) => !current);
    };

    const navigate = useNavigate();

    // If user is authenticate, redirect to profile page
    useEffect(() => {
        if (userInfo) {
            console.log('userInfo', userInfo)
            navigate("/user");
        }
    }, [navigate, userInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { userCode, hasRemember };
        console.log('userData', userData)
        dispatch(userLogin(userData));
    };
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" value={hasRemember} onChange={toggleRemember}/>
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button" disabled={loading}>Sign In</button>
                </form>
            </section>
        </main>
    )
}
