import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Leaderboard from "./views/Leaderboard";
import JourneyAdd from "./components/journey_component/JourneyAdd";
import JourneyEdit from "./components/journey_component/JourneyEdit";
import AdventureNoteEdit from "./components/adv_note_component/AdventureNoteEdit";
import AdventureNoteAdd from "./components/adv_note_component/AdventureNoteAdd";
import PostRegister from "./authentication/PostRegister";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isNewUser = currentPath === '/introduction' || currentPath;
  console.log(currentPath);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="introduction" element={<PostRegister />} />
      <Route path="dashboard">
        <Route path="main-panel" element={<Dashboard isNewUser={isNewUser}/>} />
        <Route path="edit-adventure-note" element={<AdventureNoteEdit />} />
        <Route path="add-adventure-note" element={<AdventureNoteAdd />} />
        <Route path="add-journey" element={<JourneyAdd />} />
        <Route path="edit-journey" element={<JourneyEdit />} />
      </Route>
      <Route path="profile" element={<Profile />} />
      <Route path="leaderboard" element={<Leaderboard />} />
    </Routes>
  );
}

export default App;
