import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo_sign_login.svg';
import '../styles/login.css';

export default function Login(){

        const [userData, setUserData] = useState({
            username: '',
            password: ''
        });

        const loginUser = (event) => {
            event.preventDefault();
            axios.post('http://localhost:8080/api/auth/authenticate', {
                username : userData.username,
                password : userData.password
            })
            .then(resp => {
                console.log(resp.data);
            });
        };

        return (
            <div className='login-root'>
                <div className="login-container">
                    <div className="left-side-login">
                        <h2>Welcome Back!</h2>
                        <form action="" onSubmit={loginUser} className='form-login'>
                            <label htmlFor="username">Username</label>
                            <input type="text" onChange={e => setUserData({...userData, username : e.target.value})} name="username" id="username"/>
                            <label htmlFor="password">Password</label>
                            <input type="password" onChange={e => setUserData({...userData, password : e.target.value})} name="password" id="password"/>
                            <button type="submit" className='submit-login'>Log In</button>
                        </form>
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