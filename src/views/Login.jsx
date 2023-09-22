import React, { Component } from 'react';
import Background from '../assets/frame_bg.svg';

class Login extends Component {
    render() {
        return (
            <div className='login-root' style={{backgroundImage: `url(${Background})`}}>
                <div className="login-container">
                    <div className="left-side">
                        <h2>Welcome Back!</h2>
                        <form action="">
                            <label htmlFor="username">Username</label><br/>
                            <input type="text" name="username" id="username"/>
                            <label htmlFor="password">Password</label><br/>
                            <input type="password" name="password" id="password"/>
                        </form>
                        <button type="submit">Log In</button>
                        <p>No account? <a href="www.google.com">Sign Here</a></p>
                    </div>
                    <div className="right-side">
                        <img src="../assets/logo_sign_login.svg" alt="Nexa logo" />
                        <h1>I hope you have a humanly day!<br/>or something like that...<br/>my data mixed up again</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;