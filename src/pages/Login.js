import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../store/action";
import NavBar from '../components/Navbar'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasRemember, setHasRemember] = useState(false);
    const { loading, userInfo } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userCode = {
        email: email,
        password: password,
    };

    const toggleRemember = () => {
        setHasRemember((current) => !current);
    };

    // Redirect to profile page
    useEffect(() => {
        if (userInfo) {
            navigate("/user");
        }
    }, [navigate, userInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { userCode, hasRemember };
        dispatch(userLogin(userData));
    };
    return (
        <main className="main bg-dark">
        <NavBar></NavBar>
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
