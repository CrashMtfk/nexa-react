import React, {Component} from "react";
import Logo from '../assets/logo_sign_login.svg';
import { Link } from "react-router-dom";

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
                        <form action="">
                            <label htmlFor="username">Username</label><br/>
                            <input type="text" name="username" id="username"/><br/>
                            <label htmlFor="playerName">Player Name</label><br/>
                            <input type="text" name="playerName" id="playerName"/><br/>
                            <label htmlFor="password">Password</label><br/>
                            <input type="password" name="password" id="password"/>
                        </form>
                        <button type="submit">Register</button>
                        <p>Already registered?<Link to="/login">Log in</Link></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;