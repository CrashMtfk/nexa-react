import React, { useEffect, useState } from "react";
import Quest from "../components/quest_component/Quest";
import "../styles/quests_container.css";
import axios from "axios";

export default function QuestsContainer({ userId, modifyExperience }) {
  const [quests, setQuests] = useState([]);
  const [isAddingQuest, setIsAddingQuest] = useState(false);
  const [questTitle, setQuestTitle] = useState(null);
  const [difficulty, setDifficulty] = useState(0);

  useEffect(() => {
    getQuests();
  }, []);

  const getQuests = () => {
    axios
      .get(`http://localhost:8080/user/quests/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then((resp) => {
        setQuests(resp.data);
        modifyExperience();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createQuest = (event) => {
    event.preventDefault();
    if (questTitle.length > 0) {
      axios
        .post(
          `http://localhost:8080/user/quest/${userId}`,
          {
            difficulty: {
              id: difficulty,
            },
            title: questTitle,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          }
        )
        .then((resp) => {
          getQuests();
          setQuestTitle("");
          setIsAddingQuest(!isAddingQuest);
          setDifficulty(0);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const questErrorMessage = document.getElementById("quest-error-message");
      questErrorMessage.innerHTML = "Please enter a quest title";
    }
  };

  return (
    <div className="quests-root">
      {isAddingQuest ? (
        <div className="quest-add-root">
          <div className="quests-header">
            <h2>Add Quest</h2>
            <button
              className="add-cancel"
              onClick={() => setIsAddingQuest(!isAddingQuest)}
            >
              x
            </button>
          </div>
          <div className="quest-form">
            <form action="" onSubmit={createQuest}>
              <input
                type="text"
                placeholder="Title"
                onChange={(e) => setQuestTitle(e.target.value)}
                name="title"
                id="title"
              />
              <select
                name="difficulty"
                id="difficulty"
                placeholder="Difficulty"
                defaultValue={""}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="" disabled>
                  Difficulty level
                </option>
                <option value="0">S</option>
                <option value="1">A</option>
                <option value="2">B</option>
                <option value="3">C</option>
              </select>{" "}
              <br />
              <button type="submit" className="submit-add">
                Submit
              </button>
            </form>
            <div
              className="quest-error-message error-message"
              id="quest-error-message"
            ></div>
          </div>
        </div>
      ) : (
        <div>
          <div className="quests-header">
            <h2>Quests</h2>
            <button
              className="add-quest"
              onClick={() => setIsAddingQuest(!isAddingQuest)}
            >
              +
            </button>
          </div>
          <div className="quest-container">
            <div className="quests-box">
              {quests.map((quest) => {
                return (
                  <Quest
                    currentQuest={quest}
                    getQuests={getQuests}
                    className={quest.id}
                    key={quest.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
