import React from "react";
import SidebarNav from "../components/SidebarNav";
import QuestsContainer from "../containers/QuestsContainer";
import { Outlet } from "react-router-dom";
import "../styles/dashboard.css";
import AdventureNotesContainer from "../containers/AdventureNotesContainer";
import PomodoroContainer from "../containers/PomodoroContainer";
import JourneysContainer from "../containers/JourneysContainer";

export default function Dashboard() {
  const currentUserId = localStorage.userId;

  return (
    <div className="dashboard-root">
      <div>
        <SidebarNav />
      </div>
      <div className="components">
        <div className="xp-bar"></div>
        <div className="top-components">
          <QuestsContainer userId={currentUserId}></QuestsContainer>
          <PomodoroContainer />
          <AdventureNotesContainer
            userId={currentUserId}
          ></AdventureNotesContainer>
        </div>
        <div className="bottom-component">
          <JourneysContainer userId={currentUserId} />
        </div>
        <Outlet context={currentUserId} />
      </div>
    </div>
  );
}
