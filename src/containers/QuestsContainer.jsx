import React, { useEffect, useState } from "react";
import Quest from '../components/Quest';
import '../styles/quests_container.css';
import axios from "axios";

export default function QuestsContainer({userId}){

    const [quests, setQuests] = useState([]);
    const [isAddingQuest, setIsAddingQuest] = useState(false);
    const [questTitle, setQuestTitle] = useState('');
    const [difficulty, setDifficulty] = useState(0);

    useEffect(() => {
        getQuests();
    },[]);

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

    const createQuest = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8080/user/quest/${userId}`, {
                    difficulty : {
                        id : difficulty
                    },
                    title: questTitle
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.token}`
                    }
                }
        )
        .then(resp => {
            getQuests();
            setIsAddingQuest(!isAddingQuest);
        })
        .catch(error => {
            console.error(error);
        });
    }


    return (
        <div className="quests-root">
            {
                isAddingQuest ?
                <div>
                    <div className="quest-add">
                        <h2>Add Quest</h2>
                        <button className="add-cancel" onClick={() => setIsAddingQuest(!isAddingQuest)}>x</button>
                    </div>
                    <div className="quest-form">
                        <form action="" onSubmit={createQuest}>
                            <input type="text" onChange={e => setQuestTitle(e.target.value)} name="title" id="title"/>
                            <input type="number" onChange={e => setDifficulty(e.target.value)} name="difficulty" id="difficulty"/><br/>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
                :
                <div>
                    <div className="quests-header">
                        <h2>Quests</h2>
                        <button className="add-quest" onClick={() => setIsAddingQuest(!isAddingQuest)}>+</button>
                    </div>
                    <div className="quest-container">
                        <div className="quests-box">
                            {quests.map((quest) => {
                                return (
                                    <Quest currentQuest={quest} getQuests={getQuests} className={quest.id} key={quest.id}/>
                                );
                            })}
                        </div>
                    </div>
                </div> 
            }
        </div>
    )
}