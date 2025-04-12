import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar.jsx'
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
import Verify from './Components/Verify.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Welcome from './Components/Welcome.jsx'

function App() {
  const location = useLocation();

  const hideNavbarRoutes = ['/welcome']; // Routes where navbar shouldn't appear
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
  return (
    <>
      <header>
        {shouldShowNavbar && <Navbar />}
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/welcome' element={<Welcome />} />
        </Routes>
      </header>
      <ToastContainer position='top-center' autoClose={3000} />
    </>
  )
}

export default App
