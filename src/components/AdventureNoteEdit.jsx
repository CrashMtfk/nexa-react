import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdventureNoteEdit(){

    const navigate = useNavigate();
    const location = useLocation();
    const adventureNote = location.state.adventureNote;

    const editAdventureNote = (e) => {
        e.preventDefault();
        axios.patch("http://localhost:8080/user/adventure_note", {
            id : adventureNote.id,
            title : adventureNote.title,
            accomplishment : adventureNote.accomplishment,
            thought : adventureNote.though
        }, {
            headers : {
                Authorization: 'Bearer ' + localStorage.token
            }
        })
        .then(resp => {
            navigate("/dashboard/main-panel")
        })
    }

    return (
        <div>
            <div className="cancel-container">
                <button className="cancel-journey-edit" onClick={() => navigate("/dashboard/main-panel")}>x</button>
            </div> 
            <div className="edit-form">
                <form action="" onSubmit={e => editAdventureNote(e)}>
                    <input 
                        type="text" 
                        id={"title-" + adventureNote.id}
                        placeholder={adventureNote.title}
                        onChange={e => adventureNote.title = e.target.value}
                        />
                    <input 
                        type="text" 
                        id={"accomplishment-" + adventureNote.id} 
                        placeholder={adventureNote.accomplishment}
                        onChange={e => adventureNote.accomplishment = e.target.value}
                        />
                    <input 
                        type="text" 
                        id={"improvement-" + adventureNote.id} 
                        placeholder={adventureNote.improvement}
                        onChange={e => adventureNote.improvement = e.target.value}
                        />
                    <input 
                        type="text" 
                        id={"though-"+ adventureNote.id} 
                        placeholder={adventureNote.though}
                        onChange={e => adventureNote.though = e.target.value}
                        />
                    <button type="submit">Confirm</button>
                </form>
            </div>
        </div>
    )
}