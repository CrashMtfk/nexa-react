import React, { useState } from "react";
import * as AiIcons from "react-icons/ai";
import '../styles/quest.css';

export default function Quest({currentQuest}){

    const [questStatus, setQuestStatus] = useState(false);

    return (
        <div className="quest-card">
            <button className="complete-button" onClick={() => setQuestStatus(!questStatus)}>{questStatus ? <AiIcons.AiOutlineCheckCircle />: null}</button>
            <h3>{currentQuest.title}</h3>
            <div className="buttons-container">
                <button className="more-details-button"><AiIcons.AiOutlineArrowLeft/></button>
                <button className="delete-button"><AiIcons.AiOutlineDelete/></button>
            </div>
        </div>
    )
}