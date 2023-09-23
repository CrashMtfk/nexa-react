import { Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';

function App() {
  return <Routes>
    <Route path='/login' element={<Login />}/>
    <Route path='/register' element={<Register/>}/>
  </Routes>
}

export default App;
