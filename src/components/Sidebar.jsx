import React from "react";
import Logo from '../assets/logo_sidebar.svg';
import ProfileIcon from '../assets/profile_icon.svg';
import DashboardIcon from '../assets/dashboard_icon.svg';
import LeaderboardIcon from '../assets/leaderboard_icon.svg';

export default function SidebarNav(){
    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img src={Logo} alt="" />
                    <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                        
                    </button>
                </div>
                <ul className="flex-1 px-3">{}</ul>
                <div className="border-t flex p-3">
                    
                </div>
            </nav>
        </aside>
    );
}