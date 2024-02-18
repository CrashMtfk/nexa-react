import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./journey_add.css";
import axios from "axios";
import { processTitle} from "../../utils/commonValidation";

export default function JourneyAdd() {
  const navigate = useNavigate();
  const [journeyTitle, setJourneyTitle] = useState("");
  const [currentStage, setCurrentStage] = useState(0);
  const [numOfStages, setNumOfStages] = useState(1);
  const [stageConfigurations, setStageConfigurations] = useState([]);
  const [games, setGames] = useState([]);

  const getGames = () => {
    axios.get(`http://localhost:8080/games`, {
      headers: {
        Authorization: "Bearer " + localStorage.token,
      }
    })
    .then((resp) => {
      setGames(resp.data);
    });
  };

  useEffect(() => {
    getGames();
  },[]);

  const handleNextStage = (e) => {
    if (currentStage < numOfStages) {
      e.preventDefault();
      const gameId = document.getElementById("games").value;
      setStageConfigurations([
        ...stageConfigurations,
        { game: {
          id: gameId
        }},
      ]);
      setCurrentStage(currentStage + 1);
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
            }
          )
          .then((resp) => {
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
          <div className="input-container">
            <input
              type="text"
              onChange={(e) => setJourneyTitle(e.target.value)}
              id="journeyTitle"
              className="journeyTitle"
              placeholder="Journey Title"
            />
            <span className="sub-line"></span>
          </div>
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
            <div className="input-container ">
              <label htmlFor="games">Choose a game:</label>
              <select name="games" id="games">
                {games.map(game => {
                  return (
                    <option key={game.id} value={game.id}>{game.title}</option>
                  );
                })}
              </select>
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
