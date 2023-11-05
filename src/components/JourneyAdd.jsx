import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/journey_add.css";
import axios from "axios";
import { processTitle, verifyEmptyData } from "../utils/commonValidation";

export default function JourneyAdd() {
  const navigate = useNavigate();
  const [journeyTitle, setJourneyTitle] = useState("");
  const [currentStage, setCurrentStage] = useState(0);
  const [numOfStages, setNumOfStages] = useState(1);
  const [stageConfigurations, setStageConfigurations] = useState([]);

  const handleNextStage = (e) => {
    if (currentStage < numOfStages) {
      e.preventDefault();
      const stageTitle = document.getElementById(
        `stageTitle${currentStage}`,
      ).value;
      const stageDescription = document.getElementById(
        `stageDescription${currentStage}`,
      ).value;
      if (processTitle(stageTitle) && !verifyEmptyData(stageDescription)) {
        setStageConfigurations([
          ...stageConfigurations,
          { title: stageTitle, description: stageDescription },
        ]);
        setCurrentStage(currentStage + 1);
        document.getElementById(`stageTitle${currentStage}`).value = "";
        document.getElementById(`stageDescription${currentStage}`).value = "";
      }
    } else {
      const numOfCoins = numOfStages * 100;
      const experience = numOfStages * 75;
      if (processTitle(journeyTitle)) {
        axios
          .post(
            `http://localhost:8080/user/journey/${localStorage.userId}`,
            {
              title: journeyTitle,
              coins: numOfCoins,
              experience: experience,
              stageDTOSet: stageConfigurations,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.token,
              },
            },
          )
          .then((resp) => {
            console.log(resp.data);
            navigate("/dashboard/main-panel");
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div className="add-journey-background">
      <div className="add-journey-root">
        <div className="cancel-container">
          <button
            className="cancel-journey-add add-cancel"
            onClick={() => navigate("/dashboard/main-panel")}
          >
            x
          </button>
        </div>
        <form className="journey-form-add-header" action="">
          <class className="input-container">
            <input
              type="text"
              onChange={(e) => setJourneyTitle(e.target.value)}
              id="journeyTitle"
              className="journeyTitle"
              placeholder="Journey Title"
            />
            <span className="sub-line"></span>
          </class>
          <div className="input-container numOfStages-container">
            <input
              type="number"
              onChange={(e) => setNumOfStages(e.target.value)}
              name="numOfStages"
              id="numOfStages"
              className="numOfStages"
              placeholder="How many stages?"
            />
            <div className="sub-line"></div>
          </div>
        </form>
        {currentStage < numOfStages ? (
          <form className="stage-form-add">
            <h3 className="current-stage">Stage {currentStage + 1}</h3>
            <div className="input-container stage-input-container">
              <input
                type="text"
                id={`stageTitle${currentStage}`}
                placeholder={`Title...`}
              />
            </div>
            <div className="input-container ">
              <textarea
                type="text"
                cols={40}
                rows={5}
                id={`stageDescription${currentStage}`}
                placeholder={`Description...`}
              />
            </div>
            <button className="next-button" onClick={(e) => handleNextStage(e)}>
              Next
            </button>
          </form>
        ) : (
          <button className="next-button" onClick={(e) => handleNextStage(e)}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
