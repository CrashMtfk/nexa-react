import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo_sign_login.svg';
import '../styles/login.css';

class Login extends Component {
    render() {
        return (
            <div className='login-root'>
                <div className="login-container">
                    <div className="left-side-login">
                        <h2>Welcome Back!</h2>
                        <form action="" className='form-login'>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" id="username"/>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password"/>
                        </form>
                        <button type="submit" className='submit-login'>Log In</button>
                        <p>No account? <Link to="/register">Sign here</Link></p>
                    </div>
                    <div className="right-side-login">
                        <img src={Logo} alt="Nexa logo" />
                        <h1>I hope you have a humanly day!<br/>or something like that...<br/>my data mixed up again</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;