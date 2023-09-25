import { Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/Dashboard';

function App() {
  return <Routes>
    <Route path='/' element={<Login />}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
  </Routes>
}

export default App;
