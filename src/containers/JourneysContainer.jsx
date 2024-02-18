import React, { useEffect, useState } from "react";
import "../styles/journeys_container.css";
import axios from "axios";
import Journey from "../components/journey_component/Journey";
import { useNavigate } from "react-router-dom";

export default function JourneysContainer({ userId, modifyExperience }) {
  const [journeys, setJourneys] = useState([]);
  const navigate = useNavigate();

  const getJourneys = () => {
    axios
      .get(`http://localhost:8080/user/journeys/${userId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((resp) => {
        setJourneys(resp.data); 
        modifyExperience();
      });
  };

  useEffect(() => {
    getJourneys();
  },[]);

  return (
    <div className="journeys-root">
      <div className="journeys-header">
        <span className="first-line"></span>
        <h2>Journeys</h2>
        <span className="second-line"></span>
        <button
          className="create-journey"
          onClick={() => navigate("/dashboard/add-journey")}
        >
          Create
        </button>
        <span className="third-line"></span>
      </div>
      <div className="journeys-container">
        {journeys.map((journey) => {
          return (
            <Journey
              journey={journey}
              getJourneys={getJourneys}
              key={journey.id}
              className={journey.id}
            />
          );
        })}
      </div>
    </div>
  );
}
