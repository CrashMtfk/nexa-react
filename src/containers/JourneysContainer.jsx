import React, { useEffect, useState } from "react";
import '../styles/journeys_container.css'
import axios from "axios";
import Journey from "../components/Journey";

export default function JourneysContainer({userId}){

    const [journeys, setJourneys] = useState([]);

    useEffect(() => {
        getJourneys();
    },[])

    const getJourneys = () => {
        axios.get(`http://localhost:8080/user/journeys/${userId}`, {
            headers:{
                Authorization: 'Bearer ' + localStorage.token
            }
        })
        .then(resp => {
            console.log(resp.data);
            setJourneys(resp.data);
        })
    }

    return (
        <div>
            <div className="journeys-header">
                <span className="first-line"></span>
                <h2>Journeys</h2>
                <span className="second-line"></span>
                <button className="create-journey">Create</button>
                <span className="third-line"></span>
            </div>
            <div className="journeys-container">
                {journeys.map((journey) => {
                    return <Journey journey={journey} key={journey.id} className={journey.id}/>
                })}
            </div>
        </div>
    )
}