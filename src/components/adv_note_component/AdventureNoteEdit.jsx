import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./adventure_note_edit.css";
import {
  processTitle,
  processSingularNoteData,
} from "../../utils/commonValidation";

export default function AdventureNoteEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const adventureNote = location.state.adventureNote;

  useEffect(() => {
    initializeFormWithExistingData();
  }, []);

  const editAdventureNote = (e) => {
    e.preventDefault();
    if (processTitle(adventureNote.title)) {
      const processedAccomplishment = processSingularNoteData(
        adventureNote.accomplishment
      );
      const processedImprovement = processSingularNoteData(
        adventureNote.improvement
      );
      const processedThought = processSingularNoteData(adventureNote.thought);
      axios
        .patch(
          "http://localhost:8080/user/adventure_note",
          {
            id: adventureNote.id,
            title: adventureNote.title,
            accomplishment: processedAccomplishment,
            improvement: processedImprovement,
            thought: processedThought,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((resp) => {
          navigate("/dashboard/main-panel");
        })
        .catch((err) => console.log(err));
    }
  };

  const initializeFormWithExistingData = () => {
    document.getElementById("title-" + adventureNote.id).value =
      adventureNote.title === undefined
        ? "Do you want to add something here?"
        : adventureNote.title;
    document.getElementById("accomplishment-" + adventureNote.id).value =
      adventureNote.accomplishment === undefined
        ? "Do you want to add something here?"
        : adventureNote.accomplishment;
    document.getElementById("improvement-" + adventureNote.id).value =
      adventureNote.improvement === undefined
        ? "Do you want to add something here?"
        : adventureNote.improvement;
    document.getElementById("though-" + adventureNote.id).value =
      adventureNote.thought === undefined
        ? "Do you want to add something here?"
        : adventureNote.thought;
  };

  return (
    <div className="edit-adv-note-root">
      <div className="edit-adv-note-content">
        <div className="cancel-container">
          <button
            className="cancel-journey-edit add-cancel"
            onClick={() => navigate("/dashboard/main-panel")}
          >
            x
          </button>
        </div>
        <form
          className="edit-adv-note-form"
          action=""
          onSubmit={(e) => editAdventureNote(e)}
        >
          <div className="input-container">
            <input
              className="adventure-title"
              type="text"
              id={"title-" + adventureNote.id}
              onChange={(e) => (adventureNote.title = e.target.value)}
            />
            <span className="sub-line"></span>
          </div>
          <div className="input-container">
            <textarea
              cols={40}
              rows={5}
              type="text"
              id={"accomplishment-" + adventureNote.id}
              onChange={(e) => (adventureNote.accomplishment = e.target.value)}
            />
          </div>
          <div className="input-container">
            <textarea
              cols={40}
              rows={5}
              type="text"
              id={"improvement-" + adventureNote.id}
              onChange={(e) => (adventureNote.improvement = e.target.value)}
            />
          </div>
          <div className="input-container">
            <textarea
              cols={40}
              rows={5}
              type="text"
              id={"though-" + adventureNote.id}
              onChange={(e) => (adventureNote.thought = e.target.value)}
            />
          </div>
          <button type="submit" className="edit-note-button-confirm">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
