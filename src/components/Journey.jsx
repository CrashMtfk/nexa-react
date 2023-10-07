import React from "react";
import '../styles/journey.css';
import * as AiIcons from 'react-icons/ai';

export default function Journey({journey}){

    const stages = journey.stageDTOSet;

    return(
        <div className="j-root">
            <div className="journey-top">
                <span className="j-first-line"></span>
                <h2>{journey.title}</h2>
                <span className="j-second-line"></span>
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