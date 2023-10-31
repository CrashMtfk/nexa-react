import React from "react";
import Logo from '../assets/logo_sign_login.svg';
import * as AiIcons from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import '../styles/post_register.css';

export default function PostRegister(){

    const navigate = useNavigate();

    return(
        <div className="introduction-background">
            <div className="introduction-root">
                <div className="header">
                    <img src={Logo} alt="Logo of the program"/>
                </div>
                <div className="introduction-text">
                    <TypeAnimation
                        sequence={['Hi user, I’m Nexa! I’ve been waiting for you to take this step. In order to have a great journey I generated a dashboard for you.', 'Hi user, I’m Nexa! I’ve been waiting for you to take this step. In order to have a great journey I generated a dashboard for you.']}
                        wrapper="span"
                        speed={50}
                        className="animation-text"
                        />
                </div>
                <div className="continue-button" onClick={() => navigate("/dashboard/main-panel")}>
                    <span>Click to start</span>
                    <AiIcons.AiOutlineArrowRight/>
                </div>
            </div>
            
        </div>
    )
}