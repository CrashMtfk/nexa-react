import React from "react";
import SidebarNav from "../components/SidebarNav";
import QuestsContainer from "../containers/QuestsContainer";
import { useLocation } from "react-router-dom";
import '../styles/dashboard.css'
import AdventureNotesContainer from "../containers/AdventureNotesContainer";

export default function Dashboard(){
    const location = useLocation();

    return (
        <div className="dashboard-root">
            <div>
                <SidebarNav/>
            </div>
            <div className="components">
                <QuestsContainer userId={location.state}></QuestsContainer>
                <AdventureNotesContainer userId={location.state}></AdventureNotesContainer>
            </div>
        </div>
    );
}