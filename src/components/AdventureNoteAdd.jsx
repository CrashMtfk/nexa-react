import axios from "axios";
import React, { useState } from "react";
import '../styles/adventure_note_add.css';

export default function AdventureNoteAdd ({userId, setIsAddingAdvNote}) {

    const [title, setTitle] = useState('');
    const [accomplishment, setAccomplishment] = useState('');
    const [improvement, setImprovement] = useState('');
    const [thought, setThought] = useState('');

    const addAdventureNote = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8080/user/adventure_note/${userId}`, {
            title: title,
            accomplishment: accomplishment,
            improvement: improvement,
            thought: thought
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
        .then(resp => {
            setIsAddingAdvNote(false);
            console.log(resp.data);
        })
    }

    return (
        <div className="add-adv-note-root">
            <div className="add-adv-note-header">
                <h2>How was today journey?</h2>
                <button className="add-cancel" onClick={e => setIsAddingAdvNote(false)}>x</button>
            </div>
            <form className="add-adv-note-form" action="" onSubmit={addAdventureNote}>
                <div className="input-container">
                    <input type="text" className="adventure-title" placeholder="Title of the adventure..." onChange={e => setTitle(e.target.value)} name="title" id="title" />
                    <span className="sub-line"></span>
                </div>
                <div className="input-container">
                    <div className="input-header">
                        <span className="sub-line-f"></span>
                        <h3>Today accomplishments</h3>
                        <span className="sub-line"></span>
                    </div>
                    <textarea cols={40} rows={5} onChange={e => setAccomplishment(e.target.value)} name="accomplishment" id="accomplishment" />
                </div>
                <div className="input-container">
                    <div className="input-header">
                        <span className="sub-line-f"></span>
                        <h3>What could you do better?</h3>
                        <span className="sub-line"></span>
                    </div>
                    <textarea cols={40} rows={5} onChange={e => setImprovement(e.target.value)} name="improvement" id="improvement" />
                </div>
                <div className="input-container">
                    <div className="input-header">
                        <span className="sub-line-f"></span>
                        <h3>Any thoughts stuck in your mind?</h3>
                        <span className="sub-line"></span>
                    </div>
                    <textarea cols={40} rows={5} onChange={e => setThought(e.target.value)} name="thought" id="thought" />
                </div>
                <button type="submit" className="add-note-button">Add Note</button>
            </form>
        </div>
    );
}