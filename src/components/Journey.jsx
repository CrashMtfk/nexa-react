import React, { useState } from "react";
import '../styles/journey.css';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
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
                    <BiIcons.BiEdit
                        className="j-edit-button"
                        onClick={() => 
                            navigate("/dashboard/edit-journey", {state:{journey:journey}})} />
                    <span className="j-buttons-line"></span>
                    <AiIcons.AiTwotoneDelete className="delete-button" onClick={deleteJourney}/>
                </div>
                <span className="j-third-line"></span>
            </div>
            <div className="journey-middle">
                <div className="stages-container">
                    {
                        stages.map((stage) => {
                            return (
                                <div key={stage.id}>
                                    {stage.status ?
                                        <AiIcons.AiFillCheckCircle className="j-complete-button"/>
                                        :
                                        <BsIcons.BsCircle className="j-complete-button"/>
                                    }
                                    <span className="stage-connect-line"></span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="finish-stage-container">
                    <AiIcons.AiFillCheckCircle className="finish-stage"/>
                </div>
            </div>
            
        </div>
    )
}