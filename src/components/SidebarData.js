import React from "react";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
  {
    title: "Profile",
    path: "/profile",
    icon: <AiIcons.AiOutlineUser />,
    cName: "nav-text",
  },
  {
    title: "Dashboard",
    path: "/dashboard/main-panel",
    icon: <AiIcons.AiOutlineAim />,
    cName: "nav-text",
  },
  {
    title: "Leaderboard",
    path: "/leaderboard",
    icon: <AiIcons.AiOutlineTrophy />,
    cName: "nav-text",
  },
];
