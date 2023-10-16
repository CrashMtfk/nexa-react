import axios from "axios";
import React from "react";
import * as GiIcons from 'react-icons/gi';
import * as AiIcons from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import '../styles/adventure_note.css';

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
        <div className="adventure-note-card">
            <GiIcons.GiBurningBook className="adv-note-logo"/>
            <h3 className="adv-note-title">{currentNote.title}</h3>
            <div className="buttons-container-note">
                <AiIcons.AiOutlineEdit className="edit-note-button" onClick={() => navigate("/dashboard/edit-adventure-note", {state: { adventureNote:currentNote}})}/>
                <AiIcons.AiOutlineDelete className="delete-note-button" onClick={deleteAdventureNote}/>
            </div>
        </div>
    )
}