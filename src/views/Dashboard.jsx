import React, { useEffect, useRef, useState } from "react";
import SidebarNav from "../components/SidebarNav";
import QuestsContainer from "../containers/QuestsContainer";
import { Outlet } from "react-router-dom";
import "../styles/dashboard.css";
import AdventureNotesContainer from "../containers/AdventureNotesContainer";
import PomodoroContainer from "../containers/PomodoroContainer";
import JourneysContainer from "../containers/JourneysContainer";
import axios from "axios";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default function Dashboard({ isNewUser, setNewUser }) {
  const currentUserId = localStorage.userId;
  const [xpPercentage, setXpPercentage] = useState(0);
  const xpBarRef = useRef(null);

  useEffect(() => {
    getXPPercentage();
    startUserTour();
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

  const startUserTour = () => {
    if (isNewUser) {
      const driverObj = driver({
        steps: [
          {
            element: ".quests-root",
            popover: {
              title: "Quests",
              description:
                "This is where you can see all your tasks aka quests. You can create one by using the + button, type a title and give it a corresponding difficulty.",
              side: "top",
              align: "start",
            },
          },
          {
            element: ".adventure-notes-root",
            popover: {
              title: "Adventure Notes",
              description:
                "Have you ever wanted to have a place where you can store nice memories but also keep your darkest secrets? Well....there you have it.",
              side: "top",
              align: "end",
            },
          },
          {
            element: ".journeys-root",
            popover: {
              title: "Journeys",
              description:
                "You can think of these as goals, what I mean is that you can split a journey into different stages so that you create a clear path!",
            },
          },
          {
            element: ".create-journey",
            popover: {
              title: "How to use",
              description: "Just give your journey a title, and start selecting the learning game you need for each stage."
            }
          }
        ],
      });
      driverObj.drive();
      setNewUser(!isNewUser);
    } else {
      return;
    }
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
            id="quest-container"
          ></QuestsContainer>
          <PomodoroContainer />
          <AdventureNotesContainer
            userId={currentUserId}
            id="notes-container"
          ></AdventureNotesContainer>
        </div>
        <div className="bottom-component">
          <JourneysContainer
            userId={currentUserId}
            modifyExperience={getXPPercentage}
            id="journey-container"
          />
        </div>
        <Outlet context={currentUserId} />
      </div>
    </div>
  );
}
