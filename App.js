import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';
import Description from './pages/Description';
// import Manual from './pages/Manual';
import Ai from './pages/Ai';
import TrafficSignalTimer from './pages/TrafficSignalTimer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        <Route path='/desc' element={<PrivateRoute element={<Description/>}/>}/>
        <Route path='/man' element={<PrivateRoute element={<TrafficSignalTimer/>}/>}/>
        <Route path='/ai' element={<PrivateRoute element={<Ai/>}/>}/>
      </Routes>
    </div>
  );
}

export default App;
