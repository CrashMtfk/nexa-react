import React, {Component} from "react";
import Logo from '../assets/logo_sign_login.svg';
import { Link } from "react-router-dom";
import '../styles/register.css'

class Register extends Component {
    render(){
        return (
            <div className="register-root">
                <div className="register-container">
                    <div className="left-side-register">
                        <h2>I am excited to begin this<br/>journey with you!</h2>
                        <img src={Logo} alt="Nexa logo"/>
                        <h2>Let's start with making<br/>an account.</h2>
                    </div>
                    <div className="right-side-register">
                        <h1>Register</h1>
                        <form action="" className="form-register">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" id="username"/>
                            <label htmlFor="playerName">Player Name</label>
                            <input type="text" name="playerName" id="playerName"/>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password"/>
                        </form>
                        <button type="submit" className="submit-register">Register</button>
                        <p>Already registered?<Link to="/">Log in</Link></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;