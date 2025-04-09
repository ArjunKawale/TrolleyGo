import App from './Pages/App';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from 'react';
import Admin from './Pages/Admin';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import ProtectedRoute from './Components/ProtectedRoute';

const Main = () => {
  function Logout() {
    localStorage.clear()
    return <Navigate to="/login" />
  }
  
  function RegisterAndLogout() {
    localStorage.clear()
    return <Register />
  }
  return (
    
    <BrowserRouter>
     <Routes>
     <Route path="/user/*" element={<ProtectedRoute><App /></ProtectedRoute>} />
     <Route path="/admin/*" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      
      <Route path='/login' element={<Login/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/register' element={<RegisterAndLogout/>}/>
      <Route path='*' element={<Login/>}/>

     </Routes>
    </BrowserRouter>
  )
}

export default Main