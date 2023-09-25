import React from "react";
import { useLocation } from "react-router-dom";
import SidebarNav from "../components/Sidebar";

export default function Dashboard(){
    const location = useLocation();

    return (
        <div className="dashboard-root">
            <SidebarNav/>
        </div>
    );
}