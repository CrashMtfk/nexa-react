import React, { useState } from "react";
import SidebarNav from "../components/SidebarNav";
import QuestsContainer from "../containers/QuestsContainer";
import { useLocation } from "react-router-dom";
import '../styles/dashboard.css'
import AdventureNotesContainer from "../containers/AdventureNotesContainer";
import AdventureNoteAdd from "../components/AdventureNoteAdd";
import PomodoroContainer from "../containers/PomodoroContainer";
import JourneysContainer from "../containers/JourneysContainer";

export default function Dashboard(){
    const location = useLocation();
    const [isAddingAdvNote, setIsAddingAdvNote] = useState(false);

    return (
        <div className="dashboard-root">
            <div>
                <SidebarNav/>
            </div>
            {
                isAddingAdvNote ?
                <div className="adventure-note-add-component">
                    <AdventureNoteAdd userId={location.state} setIsAddingAdvNote={setIsAddingAdvNote}/>
                </div>
                :
                <div className="components">
                    <div className="top-components">
                        <QuestsContainer userId={location.state}></QuestsContainer>
                        <PomodoroContainer/>
                        <AdventureNotesContainer userId={location.state} setIsAddingAdvNote = {setIsAddingAdvNote}></AdventureNotesContainer>
                    </div>
                    <div className="bottom-component">
                        <JourneysContainer userId={location.state}/>
                    </div>
                </div>
            }
        </div>
    );
}