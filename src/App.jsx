
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { useState } from 'react';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('user')
  }

  return (
   <Router>
    <Routes>
    <Route path='/signup' element={<Signup onLogin={handleLogin}/>}/>
    <Route path='/home' 
    element={isLoggedIn ? <Home onLogout={handleLogout}/> : <Navigate to="/login" />}  />
    <Route path='/login' 
    element={isLoggedIn ? <Navigate to='/home'/> : <Login onLogin={handleLogin}/>}/>
    <Route path='*' 
    element={<Navigate to='/login'/> } />
    </Routes>
   </Router>
  )
}

export default App
