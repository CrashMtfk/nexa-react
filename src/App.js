import { Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import Profile from './views/Profile';
import Leaderboard from './views/Leaderboard';
import JourneyAdd from './components/JourneyAdd';
import JourneyEdit from './components/JourneyEdit';

function App() {
  return <Routes>
    <Route path='/' element={<Login />}/>
    <Route path='register' element={<Register/>}/>
    <Route path='dashboard'>
      <Route path='main-panel' element={<Dashboard/>}/>
      <Route path='add-journey' element={<JourneyAdd/>}/>
      <Route path='edit-journey' element={<JourneyEdit/>}/>
    </Route>
    <Route path='profile' element={<Profile/>}/>
    <Route path='leaderboard' element={<Leaderboard/>}/>
  </Routes>
}

export default App;
