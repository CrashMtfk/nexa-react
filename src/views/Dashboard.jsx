import React, { useEffect, useRef, useState } from "react";
import SidebarNav from "../components/SidebarNav";
import QuestsContainer from "../containers/QuestsContainer";
import { Outlet } from "react-router-dom";
import "../styles/dashboard.css";
import AdventureNotesContainer from "../containers/AdventureNotesContainer";
import PomodoroContainer from "../containers/PomodoroContainer";
import JourneysContainer from "../containers/JourneysContainer";
import axios from "axios";

export default function Dashboard() {
  const currentUserId = localStorage.userId;
  const [xpPercentage, setXpPercentage] = useState(0);
  const xpBarRef = useRef(null);

  useEffect(() => {
    getXPPercentage();
  }, []);

  const getXPPercentage = () => {
    axios
      .get(`http://localhost:8080/user/current/${currentUserId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then((resp) => {
        const user = resp.data;
        const currentXp = Math.min(user.experience, user.requiredExperience);
        const percentage = (currentXp / user.requiredExperience) * 100;
        setXpPercentage(percentage);
        if (xpBarRef.current) {
          xpBarRef.current.style.width = `${percentage}%`;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="dashboard-root">
      <div>
        <SidebarNav />
      </div>
      <div className="components">
        <div className="xp-bar">
          <div className="progress" ref={xpBarRef}></div>
        </div>
        <div className="top-components">
          <QuestsContainer
            userId={currentUserId}
            modifyExperience={getXPPercentage}
          ></QuestsContainer>
          <PomodoroContainer />
          <AdventureNotesContainer
            userId={currentUserId}
          ></AdventureNotesContainer>
        </div>
        <div className="bottom-component">
          <JourneysContainer
            userId={currentUserId}
            modifyExperience={getXPPercentage}
          />
        </div>
        <Outlet context={currentUserId} />
      </div>
    </div>
  );
}
