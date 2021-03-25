import React, {useContext, useState} from 'react';
import './Header.css';
import logo from '../../images/alt-logo-3.png';
import logo1 from '../../images/main-logo.png';
import {Link, useHistory} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LogOutBtn from "../auth/LogOutBtn";
import axios from "axios";

const Header = () => {
    const { loggedIn } = useContext(AuthContext);
//from Navbar
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { getLoggedIn } = useContext(AuthContext);
    const history = useHistory();
//from Register
    const [passwordVerify, setPasswordVerify] = useState("");


    async function register(e) {
        e.preventDefault();

        try {
            const registerData = {
                email,
                password,
                passwordVerify,
            };

            // await axios.post("http://localhost:3000/auth/", registerData);
            await axios.post("http://localhost:5000/auth/",
                registerData);

            await getLoggedIn();
            history.push("/");
        } catch (err) {
            console.error(err);
        }
    }

    async function login(e) {
        e.preventDefault();

        try {
            const loginData = {
                email,
                password,
            };

            // await axios.post("http://localhost:5000/auth/login", loginData);
            await axios.post(
                "http://localhost:5000/auth/login",
                loginData
            );
            await getLoggedIn();
            history.push("/");
        } catch (err) {
            console.error(err);
        }
    }

    function openForm() {
        document.getElementById("signup-form").style.display = "block";
    }
    function closeForm() {
        document.getElementById("signup-form").style.display = "none";
    }


    return (
        <div className="body">
        <div className='header'>
            <div className='form-bg' id="signup-form">
            <div className="form-popup">
                <h1>Register a new account!</h1>
                <form onSubmit={register}>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <input
                        type="password"
                        placeholder="Verify your password"
                        onChange={(e) => setPasswordVerify(e.target.value)}
                        value={passwordVerify}
                    />
                    <div className="register-btn">
                    <button className="signup-btn-color" onClick={closeForm} type="submit">Register</button>
                    </div>
                </form>
            </div>
            </div>

            <div className="header_left">
                <img src={logo} alt="main logo"/>
            </div>

            <div className="header_right">
                {loggedIn === false && (
                    <>
                        <img src={logo1} alt="main logo"/>

                        <div className="header_form">

                            <form onSubmit={login}>

                                <input
                                    type="email"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                <div className="login-btn">
                                <button className="login-btn-color" type="submit">Log in</button>
                                </div>
                            </form>

                                <div className="signup-btn">
                                <button className="signup-btn-color" type="submit" onClick={openForm}>Sign Up</button>
                                </div>
                        </div>
                    </>
                )}
                {loggedIn === true && (
                    <>
                        <Link to="/customer">Customers</Link>
                        <LogOutBtn />
                    </>
                )}
            </div>
        </div>
        <div className="footer">
            <p>&#169; 2021 Ballotr</p>
        </div>
        </div>
    );
}

export default Header;
