import { Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import Profile from './views/Profile';
import Leaderboard from './views/Leaderboard';

function App() {
  return <Routes>
    <Route path='/' element={<Login />}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/leaderboard' element={<Leaderboard/>}/>
  </Routes>
}

export default App;
