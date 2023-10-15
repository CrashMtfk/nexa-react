import axios from "axios";
import React from "react";
import * as AiIcons from 'react-icons/ai';
import { useNavigate } from "react-router-dom";

export default function AdventureNote({currentNote, getAdventureNotes}){

    const navigate = useNavigate();

    const deleteAdventureNote = () => {
        axios.delete(`http://localhost:8080/user/adventure_note/${currentNote.id}`,{
            headers: {
                Authorization: 'Bearer ' + localStorage.token
            }
        })
        .then(resp => {
            getAdventureNotes();
        })
    }

    return (
        <div className="quest-card">
            <AiIcons.AiOutlineConsoleSql/>
            <h3>{currentNote.title}</h3>
            <div className="buttons-container">
                <button className="more-details-button" onClick={() => navigate("/dashboard/edit-adventure-note", {state: { adventureNote:currentNote}})}><AiIcons.AiOutlineEdit/></button>
                <button className="delete-button" onClick={deleteAdventureNote}><AiIcons.AiOutlineDelete/></button>
            </div>
        </div>
    )
}