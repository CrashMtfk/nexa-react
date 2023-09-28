import React, { useEffect, useState } from "react";
import Quest from '../components/Quest';
import '../styles/quests_container.css';
import axios from "axios";

export default function QuestsContainer({userId}){

    const [quests, setQuests] = useState([]);

    useEffect(() => {
        getQuests();
    });

    const getQuests = () => {
        axios.get(`http://localhost:8080/user/quests/${userId}`,{
            headers:{
                Authorization: `Bearer ${localStorage.token}`,
            }
        })
        .then(resp => {
            setQuests(resp.data);
        })
        .catch(error => {
            console.error(error);
          });
    }


    return (
        <div className="quests-root">
            <div className="quests-header">
                <h2>Quests</h2>
                <button className="add-quest">+</button>
            </div>
            <div className="quest-container">
                <div className="quests-box">
                    {quests.map((quest) => {
                        return (
                            <Quest currentQuest={quest} className={quest.id} key={quest.id}/>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}