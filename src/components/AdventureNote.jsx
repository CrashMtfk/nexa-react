import React from "react";
import * as AiIcons from 'react-icons/ai';

export default function AdventureNote({currentNote}){
    return (
        <div className="quest-card">
            <AiIcons.AiOutlineConsoleSql/>
            <h3>{currentNote.title}</h3>
            <div className="buttons-container">
                <button className="more-details-button"><AiIcons.AiOutlineEdit/></button>
                <button className="delete-button"><AiIcons.AiOutlineDelete/></button>
            </div>
        </div>
    )
}