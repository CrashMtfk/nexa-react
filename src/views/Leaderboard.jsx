import React, { useEffect, useState } from "react";
import SidebarNav from "../components/SidebarNav";
import axios from "axios";
import '../styles/leaderboard.css';

export default function Leaderboard(){

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getLeaderboard();
    }, []);

    const getLeaderboard = () => {
        axios.get('http://localhost:8080/users/leaderboard', {
            headers: {
                Authorization: 'Bearer ' + localStorage.token
            }
        })
        .then(resp => {
            console.log(resp.data);
            setUsers(resp.data);
        })
    }

    return (
        <div>
            <div>
                <SidebarNav/>
            </div>
            <div className="leaderboard-background">
                <div className="leaderboard-root">
                    <div className="leaderboard-header">
                        <h1>Leaderboard</h1>
                    </div>
                    <div className="leaderboard-table">
                        <div className="table-header">
                            <div className="th-cell">
                                <h2>Player Name</h2>
                            </div>
                            <div className="th-cell">
                                <h2>Level</h2>
                            </div>
                            <div className="th-cell">
                                <h2>Experience</h2>
                            </div>
                            <div className="th-cell">
                                <h2>Coins</h2>
                            </div>
                        </div>
                        <div className="table-content">
                            {
                                users.map((user) => {
                                    return (
                                        <div className="row" key={user.id}>
                                            <div className="tc-name ">
                                                {user.playerName}
                                            </div>
                                            <div className="tc-level ">
                                                {user.level}
                                            </div>
                                            <div className="tc-experience ">
                                                {user.experience + " / " + user.requiredExperience}
                                            </div>
                                            <div className="tc-coins ">
                                                {user.coins}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}