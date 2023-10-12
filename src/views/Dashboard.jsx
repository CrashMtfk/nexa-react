import React, { useState } from "react";
import SidebarNav from "../components/SidebarNav";
import QuestsContainer from "../containers/QuestsContainer";
import { Outlet } from "react-router-dom";
import '../styles/dashboard.css'
import AdventureNotesContainer from "../containers/AdventureNotesContainer";
import AdventureNoteAdd from "../components/AdventureNoteAdd";
import PomodoroContainer from "../containers/PomodoroContainer";
import JourneysContainer from "../containers/JourneysContainer";

export default function Dashboard(){
    const currentUserId = localStorage.userId;
    const [isAddingAdvNote, setIsAddingAdvNote] = useState(false);
     

    return (
        <div className="dashboard-root">
            <div>
                <SidebarNav/>
            </div>
            {
                isAddingAdvNote ?
                <div className="adventure-note-add-component">
                    <AdventureNoteAdd userId={currentUserId} setIsAddingAdvNote={setIsAddingAdvNote}/>
                </div>
                :
                <div className="components">
                    <div className="top-components">
                        <QuestsContainer userId={currentUserId}></QuestsContainer>
                        <PomodoroContainer/>
                        <AdventureNotesContainer userId={currentUserId} setIsAddingAdvNote = {setIsAddingAdvNote}></AdventureNotesContainer>
                    </div>
                    <div className="bottom-component">
                        <JourneysContainer userId={currentUserId}/>
                    </div>
                    <Outlet context={currentUserId}/>
                </div>
            }
        </div>
    );
}