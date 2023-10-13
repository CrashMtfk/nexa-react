import React from "react";
import '../styles/journey.css';
import * as AiIcons from 'react-icons/ai';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Journey({journey, getJourneys}){

    const stages = journey.stageDTOSet;
    const navigate = useNavigate();

    const deleteJourney = () => {
        axios.delete(`http://localhost:8080/user/journey/${journey.id}`,
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.token,
            }
        })
        .then(resp => {
            getJourneys();
        })
    }

    return(
        <div className="j-root">
            <div className="journey-top">
                <span className="j-first-line"></span>
                <h2>{journey.title}</h2>
                <span className="j-second-line"></span>
                <div className="controls-container">
                    <button 
                        className="edit-button"
                        onClick={() => 
                            navigate("/dashboard/edit-journey", {state:{journey:journey}})}>
                        <AiIcons.AiOutlineEdit/>
                    </button>
                    <span className="j-buttons-line"></span>
                    <button className="delete-button" onClick={deleteJourney}><AiIcons.AiOutlineDelete/></button>
                </div>
                <span className="j-third-line"></span>
            </div>
            <div className="journey-middle">
                <span className="jm-left"></span>
                <div className="stages-container">
                    {
                        stages.map((stage) => {
                            return (
                                <div key={stage.id}>
                                    {stage.status ?
                                        <AiIcons.AiFillCheckCircle/>
                                        :
                                        <button className="j-complete-button"></button>
                                    }
                                    <span className="stage-connect-line"></span>
                                </div>
                            )
                        })
                    }
                    <div className="finish-stage">
                        <AiIcons.AiFillCheckCircle className="finish-stage"/>
                    </div>
                </div>
                <span className="jm-right"></span>
            </div>
            
        </div>
    )
}