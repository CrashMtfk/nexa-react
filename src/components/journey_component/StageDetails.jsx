import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./stage_details.css";

export default function StageDetails(){
    const [isDetailsShown, setIsDetailsShown] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const stage = location.state.stage;
    const [game, setGame] = useState([]);

    const getStageGame = () => {
        axios.get(`http://localhost:8080/games/${stage.game.id}`,
        {
            headers: {
                Authorization: "Bearer " + localStorage.token,
              },
        })
        .then(resp => {
            setGame(resp.data);
        })
    }

    useEffect(() => {
        getStageGame();
    }, []);

    const handleQuizzFinish = () => {
        let correctAnswers = 0;
        const REQUIRED_PERCENTAGE = 75;
        const totalQuestions = game.questionDTOList.length;
        for(let i = 0; i < totalQuestions; i++){
            const question = game.questionDTOList[i];
            for (let j = 0; j < question.answerList.length; j++) {
                let currentAnswer = document.getElementById(`answer${question.answerList[j].id}`);
                if(currentAnswer.checked && question.answerList[j].correct){
                    correctAnswers++;
                }
            }
        }
        const completionPercentage = (correctAnswers / totalQuestions) * 100;
        if(completionPercentage >= REQUIRED_PERCENTAGE){
            navigate("/dashboard/main-panel",{
                state: {
                    stage: stage,
                    isChanged: true
                }
            });
        } else {
            navigate("/dashboard/main-panel");
        }
    }

    return (
        isDetailsShown ?
        <div className="add-journey-background">
            <div className="cancel-container">
                <button
                    className="cancel-journey-add add-cancel"
                    onClick={() => navigate("/dashboard/main-panel")}
                >
                x
                </button>
            </div>
            <h2>{stage.game.title}</h2>
            <p>{stage.game.description}</p>
            <div>
                <p>Difficulty: {stage.game.difficulty.grade}</p>
                <p>Experience: {stage.game.difficulty.experience}</p>
                <p>Coins: {stage.game.difficulty.coins}</p>
            </div>
            <button onClick={e => setIsDetailsShown(!isDetailsShown)}>Start Stage</button>
        </div>
        :
        <div className="quizz-container">
            {
                game.questionDTOList.map(question => {
                    return (
                        <div key={question.id} className="question-container">
                            <h2 className="question">{question.questionText}</h2>
                            {
                                question.answerList.map(answer => {
                                    return (
                                        <div 
                                            key={answer.id} 
                                            className="answer-container"
                                        >
                                            <input 
                                                id={`answer${answer.id}`}
                                                type="radio" 
                                                name={`answer-${question.id}`} 
                                                value={answer.correct} 
                                            />
                                            <p>{answer.answerText}</p>
                                            <br />                                    
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
            <button onClick={e => handleQuizzFinish()}>Finish</button>
        </div>
    )
}