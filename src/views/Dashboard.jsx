import React from "react";
import SidebarNav from "../components/SidebarNav";

export default function Dashboard(){

    return (
        <div className="dashboard-root">
            <div className="">
                <SidebarNav/>
            </div>
            <div>
                <h1>Dashboard</h1>
            </div>
        </div>
    );
}