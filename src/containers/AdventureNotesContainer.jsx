import React, { useEffect, useState } from "react";
import AdventureNote from "../components/AdventureNote";
import "../styles/adventure_notes_container.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdventureNotesContainer({ userId }) {
  const [adventureNotes, setAdventureNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAdventureNotes();
  }, []);

  const getAdventureNotes = () => {
    axios
      .get(`http://localhost:8080/user/adventure_notes/${userId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((resp) => {
        setAdventureNotes(resp.data);
      });
  };

  return (
    <div className="adventure-notes-root">
      <div className="adventure-notes-header">
        <h2>Adventure Notes</h2>
        <button
          className="add-adventure-note"
          onClick={() => navigate("/dashboard/add-adventure-note")}
        >
          +
        </button>
      </div>
      <div className="adventure-note-container">
        <div className="adventure-notes-box">
          {adventureNotes.map((note) => {
            return (
              <AdventureNote
                currentNote={note}
                getAdventureNotes={getAdventureNotes}
                className={note.id}
                key={note.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
