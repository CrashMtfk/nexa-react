import React, { useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import "./quest.css";
import axios from "axios";
import handleExperienceDistribution from "./experienceAllocation";

export default function Quest({ currentQuest, getQuests }) {
  const [questStatus, setQuestStatus] = useState(currentQuest.status);
  const [isMoreDetailsExpanded, setIsMoreDetailsExpanded] = useState(false);

  const toggleQuestStatus = () => {
    axios
      .patch(
        `http://localhost:8080/user/quest/${currentQuest.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      )
      .then((resp) => {
        setQuestStatus(!questStatus);
        if (!questStatus === true) {
          handleExperienceDistribution(currentQuest);
          deleteQuest();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteQuest = () => {
    axios
      .delete(`http://localhost:8080/user/quest/${currentQuest.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then((resp) => {
        getQuests();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      className={isMoreDetailsExpanded ? "quest-card-expanded" : "quest-card"}
    >
      {questStatus ? (
        <AiIcons.AiOutlineCheckCircle
          className="complete-button"
          onClick={toggleQuestStatus}
        />
      ) : (
        <BsIcons.BsCircle
          className="complete-button"
          onClick={toggleQuestStatus}
        />
      )}
      <div className="quest-content-container">
        <h3 className="quest-title">{currentQuest.title}</h3>
        {isMoreDetailsExpanded ? (
          <div className="quest-details">
            <span className="divider"></span>
            <p>Rank: {currentQuest.difficulty.grade}</p>
            <p>Experience: {currentQuest.difficulty.experience}</p>
            <p>Coins: {currentQuest.difficulty.coins}</p>
          </div>
        ) : null}
      </div>
      <div className="buttons-container">
        {isMoreDetailsExpanded ? (
          <AiIcons.AiOutlineArrowDown
            className="more-details-button-extended"
            onClick={() => setIsMoreDetailsExpanded(!isMoreDetailsExpanded)}
          />
        ) : (
          <AiIcons.AiOutlineArrowLeft
            className="more-details-button"
            onClick={() => setIsMoreDetailsExpanded(!isMoreDetailsExpanded)}
          />
        )}
        <AiIcons.AiOutlineDelete
          className="delete-button"
          onClick={deleteQuest}
        />
      </div>
    </div>
  );
}
