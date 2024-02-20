import React, { useEffect, useState } from "react";
import "./journey.css";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Stage from "./Stage";
import { verifyCompletion } from "./completion_mechanism";

export default function Journey({ journey, getJourneys }) {
  const [stages, setStages] = useState(journey.stageDTOSet);
  const navigate = useNavigate();
  const location = useLocation();
  let isStageChanged = location.state ? location.state.isChanged : false;

  useEffect(() => {
    if (isStageChanged) {
      toggleStageStatus(location.state.stage.id);
      isStageChanged = false;
    }
  }, [isStageChanged, location.state])

  useEffect(() => {
    const modifyStages = () => {
      axios
        .patch(
          `http://localhost:8080/user/journey`,
          {
            id: journey.id,
            title: journey.title,
            stageDTOSet: stages,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((resp) => {
          if (verifyCompletion(stages, journey)) {
            deleteJourney();
            getJourneys();
          }
        })
        .catch((err) => console.log(err));
    };
    modifyStages();
  }, [stages]);

  const deleteJourney = () => {
    axios
      .delete(`http://localhost:8080/user/journey/${journey.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((resp) => {
        getJourneys();
      });
  };

  const toggleStageStatus = (stageId) => {
    setStages((prevStages) =>
      prevStages.map((stage) =>
        stage.id === stageId ? { ...stage, status: !stage.status } : stage
      )
    );
  };

  return (
    <div className="j-root">
      <div className="journey-top">
        <span className="j-first-line"></span>
        <h2>{journey.title}</h2>
        <span className="j-second-line"></span>
        <div className="controls-container">
          <BiIcons.BiEdit
            className="j-edit-button"
            onClick={() =>
              navigate("/dashboard/edit-journey", {
                state: { journey: journey },
              })
            }
          />
          <span className="j-buttons-line"></span>
          <AiIcons.AiTwotoneDelete
            className="delete-button"
            onClick={deleteJourney}
          />
        </div>
        <span className="j-third-line"></span>
      </div>
      <div className="journey-middle">
        <div className="stages-container">
          {stages.map((stage) => {
            return (
              <Stage
                key={stage.id}
                stage={stage}
              />
            );
          })}
        </div>
        <div className="finish-stage-container">
          <AiIcons.AiFillCheckCircle className="finish-stage" />
        </div>
      </div>
    </div>
  );
}
