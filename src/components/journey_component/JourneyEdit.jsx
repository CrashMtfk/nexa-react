import axios from "axios";
import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { processTitle} from "../../utils/commonValidation";
import "./journey_edit.css";

export default function JourneyEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const journey = location.state.journey;
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

  const modifyJourney = (e) => {
    e.preventDefault();
    if (processTitle(journey.title)) {
      let isDataValid = true;
      if (isDataValid) {
        axios
          .patch(
            `http://localhost:8080/user/journey`,
            {
              id: journey.id,
              title: journey.title,
              stageDTOSet: journey.stageDTOSet,
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
      <div className="edit-journey-root">
        <div className="cancel-container">
          <button
            className="cancel-journey-edit add-cancel"
            onClick={() => navigate("/dashboard/main-panel")}
          >
            x
          </button>
        </div>
        <form
          className="journey-edit-form"
          action=""
          onSubmit={(e) => modifyJourney(e)}
        >
          <div className="input-container">
            <input
              type="text"
              id="journeyTitle"
              placeholder={journey.title}
              onChange={(e) => (journey.title = e.target.value)}
            />
          </div>

          {journey.stageDTOSet.map((stage) => {
            return (
              <div
                key={stage.id}
                id={`stage-${stage.id}`}
                className="stage-input-container"
              >
              <select
               name="games" 
               id={`game-${stage.game.id}`}
               onChange={(e) => stage.game.id = e.target.value}
               >
                {games.map(gameList => {
                    return (
                        stage.game.id === gameList.id ?
                        <option key={gameList.id} value={gameList.id} selected>{gameList.title}</option>
                        :
                        <option key={gameList.id} value={gameList.id}>{gameList.title}</option>
                    );
                })}
              </select>
              </div>
            );
          })}
          <button type="submit" className="next-button">
            Confirm Changes
          </button>
        </form>
      </div>
    </div>
  );
}
