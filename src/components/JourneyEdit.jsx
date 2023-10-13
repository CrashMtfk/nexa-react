import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function JourneyEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const journey = location.state.journey;
    
    const modifyJourney = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8080/user/journey`, {
            id: journey.id,
            title: journey.title,
            stageDTOSet: journey.stageDTOSet
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.token,
            }
        })
        .then(resp => {
            console.log(resp.data);
            navigate("/dashboard/main-panel");
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="edit-journey-root">
            <div className="cancel-container">
                <button className="cancel-journey-edit" onClick={() => navigate("/dashboard/main-panel")}>x</button>
            </div> 
            <form className="journey-edit-form" action="" onSubmit={e => modifyJourney(e)}>
                <input 
                    type="text"
                    id="journeyTitle" 
                    placeholder={journey.title}
                    onChange={e => journey.title = e.target.value}/>
                {(journey.stageDTOSet).map((stage) => {
                    return (
                        <div key={stage.id} id={`stage-${stage.id}`}>
                            <input 
                                type="text" 
                                id="stageTitle"
                                placeholder={stage.title}
                                onChange={e => stage.title = e.target.value}/>
                            <input 
                                type="text" 
                                id="stageDescription"
                                placeholder={stage.description}
                                onChange={e => stage.description = e.target.value} />
                        </div>
                    )
                })}
                <button type="submit">Confirm Changes</button>
            </form>
        </div>
    )
}