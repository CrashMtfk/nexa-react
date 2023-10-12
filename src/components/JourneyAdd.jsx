import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/journey_add.css';
import axios from "axios";

export default function JourneyAdd(){

    const navigate = useNavigate();
    const [journeyTitle, setJourneyTitle] = useState("");
    const [currentStage, setCurrentStage] = useState(0);
    const [numOfStages, setNumOfStages] = useState(1);
    const [stageConfigurations, setStageConfigurations] = useState([]);

    const handleNextStage = (e) => {
        if(currentStage < numOfStages){
            e.preventDefault();
            const stageTitle = document.getElementById(`stageTitle${currentStage}`).value;
            const stageDescription = document.getElementById(`stageDescription${currentStage}`).value;

            setStageConfigurations([...stageConfigurations, {title: stageTitle, description: stageDescription}]);
            setCurrentStage(currentStage + 1);
        } else {
            const numOfCoins = numOfStages * 100;
            const experience = numOfStages * 75;

            axios.post(`http://localhost:8080/user/journey/${localStorage.userId}`,{
                title: journeyTitle,
                coins: numOfCoins,
                experience: experience,
                stageDTOSet: stageConfigurations
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.token,
                }
            })
            .then(resp => {
                console.log(resp.data);
                navigate("/dashboard/main-panel");
            })
            .catch(err => console.log(err));
        }
    }

    return (
        <div className="add-journey-root">
            <div className="cancel-container">
                <button className="cancel-journey-add" onClick={() => navigate("/dashboard/main-panel")}>x</button>
            </div> 
            <form className="journey-form" action="">
                <input 
                    type="text"
                    onChange={e => setJourneyTitle(e.target.value)} 
                    id="journeyTitle" 
                    placeholder="Journey Title"/>
                <input 
                    type="number"
                    onChange={e => setNumOfStages(e.target.value)} 
                    name="numOfStages" 
                    id="numOfStages" 
                    placeholder="How many stages?"/>
            </form>
            {
                currentStage < numOfStages ? (
                    <form className="stage-form">
                        <h3>Stage {currentStage + 1}</h3>
                        <input type="text" id={`stageTitle${currentStage}`} placeholder={`Stage ${currentStage + 1} Title`}/>
                        <input type="text" id={`stageDescription${currentStage}`} placeholder={`Stage ${currentStage + 1} Description`} />
                        <button onClick={e => handleNextStage(e)}>Next</button>
                    </form>
                ) : <button onClick={e => handleNextStage(e)}>Submit</button>
            }
        </div>
    )
}