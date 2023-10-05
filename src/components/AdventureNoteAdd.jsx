import axios from "axios";
import React, { useState } from "react";

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
        <div>
            <h2>Add Adventure Note</h2>
            <button onClick={e => setIsAddingAdvNote(false)}>x</button>
            <form action="" onSubmit={addAdventureNote}>
                <input type="text" onChange={e => setTitle(e.target.value)} name="title" id="title" />
                <input type="text" onChange={e => setAccomplishment(e.target.value)} name="accomplishment" id="accomplishment" />
                <input type="text" onChange={e => setImprovement(e.target.value)} name="improvement" id="improvement" />
                <input type="text" onChange={e => setThought(e.target.value)} name="thought" id="thought" />
                <button type="submit">Add Note</button>
            </form>
        </div>
    );
}