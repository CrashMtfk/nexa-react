import React, { useState } from "react";
import * as AiIcons from "react-icons/ai";
import '../styles/quest.css';
import axios from "axios";

export default function Quest({currentQuest, getQuests}){

    const [questStatus, setQuestStatus] = useState(false);

    const deleteQuest = () => {
        axios.delete(`http://localhost:8080/user/quest/${currentQuest.id}`,{
            headers: {
                Authorization: 'Bearer ' + localStorage.token
            }
        })
        .then(resp => {
            getQuests();
        })
    }

    return (
        <div className="quest-card">
            <button className="complete-button" onClick={() => setQuestStatus(!questStatus)}>{questStatus ? <AiIcons.AiOutlineCheckCircle />: null}</button>
            <h3>{currentQuest.title}</h3>
            <div className="buttons-container">
                <button className="more-details-button"><AiIcons.AiOutlineArrowLeft/></button>
                <button className="delete-button" onClick={deleteQuest}><AiIcons.AiOutlineDelete/></button>
            </div>
        </div>
    )
}