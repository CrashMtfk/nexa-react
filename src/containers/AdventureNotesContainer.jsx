import React, { useEffect, useState } from "react";
import AdventureNote from '../components/AdventureNote';
import '../styles/adventure_notes_container.css';
import axios from "axios";

export default function AdventureNotesContainer({userId}){

    const [adventureNotes, setAdventureNotes] = useState([]);

    useEffect(() => {
     getAdventureNotes();   
    },[])

    const getAdventureNotes = () => {
        axios.get(`http://localhost:8080/user/adventure_notes/${userId}`, {
            headers:{
                Authorization:'Bearer ' + localStorage.token,
            }
        })
        .then(resp => {
            console.log(resp.data);
            setAdventureNotes(resp.data);
        })
    }

    return (
        <div className="adventure-notes-root">
            <div className="adventure-notes-header">
                <h2>Adventure Notes</h2>
                <button className="add-adventure-note">+</button>
            </div>
            <div className="adventure-note-container">
                <div className="adventure-notes-box">
                    {adventureNotes.map((note) => {
                        return <AdventureNote currentNote={note} className={note.id} key={note.id}/>
                    })}
                </div>
            </div>
        </div>
    )
}