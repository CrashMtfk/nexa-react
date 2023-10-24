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
            setUsers(resp.data);
            console.log(resp.data);
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
                        <table className="leaderboard-table-content">
                            <thead>
                                <tr className="leaderboard-table-header">
                                    <th>Player Name</th>
                                    <th>Level</th>
                                    <th>Coins</th>
                                    <th>Experience</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                users.map(user => {
                                    return <tr key={user.id} className={"user-" + user.id}>
                                        <td>{user.playerName}</td>
                                        <td>{user.level}</td>
                                        <td>{user.coins}</td>
                                        <td>{user.experience+ " / " + user.requiredExperience}</td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}